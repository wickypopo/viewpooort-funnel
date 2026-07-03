import { cn } from '@/lib/cn.js'

export function Container({ as: Component = 'div', className, children, ...props }) {
  return (
    <Component className={cn('mx-auto min-w-0 w-full max-w-[1200px]', className)} {...props}>
      {children}
    </Component>
  )
}
