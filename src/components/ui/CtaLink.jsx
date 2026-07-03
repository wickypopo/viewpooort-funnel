import { cn } from '@/lib/cn.js'

export function CtaLink({ children, className, href = '/contact', ...props }) {
  return (
    <a
      className={cn(
        'type-action inline p-0 text-[#0a6bda] underline underline-offset-2 transition-opacity hover:opacity-85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0a6bda]',
        className,
      )}
      href={href}
      {...props}
    >
      {children}
    </a>
  )
}
