import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/cn.js'

export function ProjectCard({ className, image, imageAlt = '', title }) {
  return (
    <article className={cn('flex flex-col gap-[9px]', className)}>
      <div className="h-[350px] overflow-hidden border border-black/15 max-md:h-[240px]">
        {image ? <img alt={imageAlt} className="size-full object-cover" src={image} /> : null}
      </div>
      <h3 className="type-card-title flex items-center gap-1.5 pt-[15px] pb-[30px] text-black">
        {title}
        <ArrowUpRight aria-hidden="true" size={24} strokeWidth={1.8} />
      </h3>
    </article>
  )
}
