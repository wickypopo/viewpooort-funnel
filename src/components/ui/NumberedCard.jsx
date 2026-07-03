import { Card } from './Card.jsx'
import { cn } from '@/lib/cn.js'

export function NumberedCard({ number, title, copy, className }) {
  return (
    <Card className={cn('flex flex-col justify-center', className)}>
      <p className="type-card-title text-[#1f75d8]">{number}</p>
      <h3 className="type-card-title mt-5 break-words text-black">{title}</h3>
      <p className="type-body mt-5 break-words text-black/60">{copy}</p>
    </Card>
  )
}
