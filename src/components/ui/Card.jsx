import { cn } from '@/lib/cn.js'

export function Card({ as: Component = 'div', className, children, ...props }) {
  return (
    <Component
      className={cn('min-w-0 rounded-[8px] bg-[#e6ecf4] p-[30px]', className)}
      {...props}
    >
      {children}
    </Component>
  )
}
