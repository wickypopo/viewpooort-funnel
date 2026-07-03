import { Calendar } from 'lucide-react'
import { cn } from '@/lib/cn.js'

const variants = {
  glass: 'glass-button text-white',
  link: 'text-[#0a6bda] underline underline-offset-2',
  solid: 'bg-[#081c3c] text-white',
}

export function Button({
  as: Component = 'button',
  children,
  className,
  icon,
  type = 'button',
  variant = 'glass',
  ...props
}) {
  const isButton = Component === 'button'
  const Icon = icon === 'calendar' ? Calendar : icon

  return (
    <Component
      className={cn(
        'type-action inline-flex min-h-[66px] max-w-full items-center justify-center gap-2.5 rounded-[5px] px-[18px] py-5 text-center whitespace-normal transition-opacity hover:opacity-85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0a6bda]',
        variants[variant],
        variant === 'link' && 'min-h-0 rounded-none px-0 py-0',
        'disabled:pointer-events-none disabled:opacity-40',
        className,
      )}
      type={isButton ? type : undefined}
      {...props}
    >
      {Icon ? <Icon aria-hidden="true" size={24} strokeWidth={1.8} /> : null}
      {children}
    </Component>
  )
}
