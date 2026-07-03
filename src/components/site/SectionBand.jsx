import { cn } from '@/lib/cn.js'

const variants = {
  light: 'bg-[rgba(9,73,146,0.02)] text-black',
  dark: 'grid-background bg-[#081c3c] text-white',
  white: 'bg-white text-black',
}

export function SectionBand({
  as: Component = 'section',
  children,
  className,
  variant = 'light',
  ...props
}) {
  return (
    <Component className={cn('py-[100px] max-md:py-16', variants[variant], className)} {...props}>
      {children}
    </Component>
  )
}
