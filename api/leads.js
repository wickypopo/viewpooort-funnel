const requiredFields = ['name', 'email', 'phone']
const web3FormsEndpoint = 'https://api.web3forms.com/submit'

function sanitizeString(value) {
  return typeof value === 'string' ? value.trim() : ''
}

function sanitizePayload(body) {
  return {
    problems: Array.isArray(body.problems)
      ? body.problems.map(sanitizeString).filter(Boolean)
      : [],
    budget: sanitizeString(body.budget),
    name: sanitizeString(body.name),
    email: sanitizeString(body.email),
    phone: sanitizeString(body.phone),
    website: sanitizeString(body.website),
    page: sanitizeString(body.page),
    referrer: sanitizeString(body.referrer),
    submittedAt: new Date().toISOString(),
    consent: body.consent && typeof body.consent === 'object' ? body.consent : null,
    tracking: body.tracking && typeof body.tracking === 'object' ? body.tracking : {},
  }
}

function validateLead(lead) {
  const missingFields = requiredFields.filter((field) => !lead[field])

  if (missingFields.length > 0) {
    return `Missing required fields: ${missingFields.join(', ')}`
  }

  if (!lead.email.includes('@')) {
    return 'Invalid email address'
  }

  return null
}

function formatConsent(consent) {
  if (!consent?.categories) {
    return 'Keine Consent-Daten vorhanden'
  }

  return [
    `Notwendig: ${consent.categories.necessary ? 'ja' : 'nein'}`,
    `Analytics: ${consent.categories.analytics ? 'ja' : 'nein'}`,
    `Marketing: ${consent.categories.marketing ? 'ja' : 'nein'}`,
    consent.savedAt ? `Gespeichert am: ${consent.savedAt}` : null,
  ]
    .filter(Boolean)
    .join('\n')
}

function formatTracking(tracking) {
  const entries = Object.entries(tracking)

  if (entries.length === 0) {
    return 'Keine Tracking-Parameter vorhanden'
  }

  return entries.map(([key, value]) => `${key}: ${value}`).join('\n')
}

function createWeb3FormsPayload(lead) {
  return {
    access_key: process.env.FORM_ACCESS_KEY,
    subject: 'Neue Projektanfrage über Viewpooort',
    from_name: lead.name,
    name: lead.name,
    email: lead.email,
    phone: lead.phone,
    website: lead.website || 'Nicht angegeben',
    budget: lead.budget || 'Nicht angegeben',
    problems: lead.problems.length > 0 ? lead.problems.join(', ') : 'Nicht angegeben',
    page: lead.page || 'Nicht angegeben',
    referrer: lead.referrer || 'Nicht angegeben',
    submitted_at: lead.submittedAt,
    consent: formatConsent(lead.consent),
    tracking: formatTracking(lead.tracking),
    message: [
      `Name: ${lead.name}`,
      `E-Mail: ${lead.email}`,
      `Telefon: ${lead.phone}`,
      `Website: ${lead.website || 'Nicht angegeben'}`,
      `Budget: ${lead.budget || 'Nicht angegeben'}`,
      '',
      'Probleme:',
      lead.problems.length > 0 ? lead.problems.map((problem) => `- ${problem}`).join('\n') : 'Nicht angegeben',
      '',
      'Consent:',
      formatConsent(lead.consent),
      '',
      'Tracking:',
      formatTracking(lead.tracking),
      '',
      `Seite: ${lead.page || 'Nicht angegeben'}`,
      `Referrer: ${lead.referrer || 'Nicht angegeben'}`,
      `Gesendet am: ${lead.submittedAt}`,
    ].join('\n'),
  }
}

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST')
    return response.status(405).json({ error: 'Method not allowed' })
  }

  const lead = sanitizePayload(request.body ?? {})
  const validationError = validateLead(lead)

  if (validationError) {
    return response.status(400).json({ error: validationError })
  }

  if (!process.env.FORM_ACCESS_KEY) {
    return response.status(500).json({
      error: 'FORM_ACCESS_KEY is not configured',
    })
  }

  const web3FormsResponse = await fetch(web3FormsEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(createWeb3FormsPayload(lead)),
  })

  const result = await web3FormsResponse.json().catch(() => null)

  if (!web3FormsResponse.ok || result?.success === false) {
    return response.status(502).json({
      error: result?.message || result?.body?.message || 'Web3Forms request failed',
    })
  }

  return response.status(200).json({ ok: true })
}
