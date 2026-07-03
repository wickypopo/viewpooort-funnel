import { cn } from '@/lib/cn.js'

export function GridBackground({ as: Component = 'section', className, children, ...props }) {
  return (
    <Component className={cn('grid-background bg-[#081c3c]', className)} {...props}>
      {children}
    </Component>
  )
}
