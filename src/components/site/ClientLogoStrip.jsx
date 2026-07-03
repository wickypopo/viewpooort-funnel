import { cn } from '@/lib/cn.js'

const logoStyles = [
  'client-logo-wordmark--serif',
  'client-logo-wordmark--stacked',
  'client-logo-wordmark--compact',
  'client-logo-wordmark--script',
  'client-logo-wordmark--light',
  'client-logo-wordmark--boxed',
  'client-logo-wordmark--wide',
  'client-logo-wordmark--heavy',
  'client-logo-wordmark--serif-small',
  'client-logo-wordmark--mono',
]

function LogoName({ client, index }) {
  return (
    <span className={cn('client-logo-wordmark', logoStyles[index % logoStyles.length])}>
      {client.split(' ').map((word, wordIndex, words) => (
        <span key={`${client}-${word}-${wordIndex}`}>
          {word}
          {wordIndex < words.length - 1 ? <br /> : null}
        </span>
      ))}
    </span>
  )
}

function LogoGroup({ clients }) {
  return (
    <ul className="client-logo-group">
      {clients.map((client, index) => (
        <li className="client-logo-item" key={`${client}-${index}`}>
          <LogoName client={client} index={index} />
        </li>
      ))}
    </ul>
  )
}

export function ClientLogoStrip({ clients = [], className }) {
  if (clients.length === 0) {
    return null
  }

  return (
    <div className={cn('client-logo-marquee', className)} aria-label="Kundenlogos">
      <div className="client-logo-track">
        <LogoGroup clients={clients} />
        <div aria-hidden="true">
          <LogoGroup clients={clients} />
        </div>
      </div>
    </div>
  )
}
