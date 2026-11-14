import { cn } from '../lib/utils'

interface Props {
  items: string[]
  className?: string
  textClassName?: string
}

export default function Marquee({ items, className, textClassName }: Props) {
  const doubled = [...items, ...items]

  return (
    <div className={cn('marquee-mask overflow-hidden whitespace-nowrap', className)}>
      <div className="animate-marquee flex w-max items-center">
        {doubled.map((item, i) => (
          <span key={i} className={cn('mx-6 inline-flex items-center gap-6 font-display text-2xl sm:text-3xl', textClassName)}>
            {item}
            <span aria-hidden className="text-accent">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
