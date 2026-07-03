import { Button } from './Button.jsx'
import { CtaLink } from './CtaLink.jsx'
import { cn } from '@/lib/cn.js'

export function SectionHeader({
  action,
  actionHref,
  actionVariant,
  className,
  eyebrow,
  heading,
  inverse = false,
}) {
  const resolvedActionVariant = actionVariant ?? (inverse ? 'glass' : 'link')
  const resolvedActionHref = actionHref ?? '/contact'

  return (
    <div className={cn('flex w-full flex-col gap-5', className)}>
      {eyebrow ? (
        <p className={cn('type-eyebrow', inverse ? 'text-white' : 'text-black')}>{eyebrow}</p>
      ) : null}
      <div className="flex items-end justify-between gap-8 max-md:flex-col max-md:items-start">
        <h2 className={cn('type-section-heading max-w-[820px]', inverse ? 'text-white' : 'text-black')}>
          {heading}
        </h2>
        {action && resolvedActionVariant === 'glass' ? (
          <Button
            as="a"
            className="shrink-0 max-md:self-start"
            href={resolvedActionHref}
            icon="calendar"
            variant="glass"
          >
            {action}
          </Button>
        ) : null}
        {action && resolvedActionVariant === 'link' ? (
          <CtaLink className={cn('max-md:self-start', inverse && 'text-white')} href={resolvedActionHref}>
            {action}
          </CtaLink>
        ) : null}
      </div>
    </div>
  )
}
