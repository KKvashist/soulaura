import { Search } from 'lucide-react'
import { eventCategories } from '../context/EventsContext'
import { cn } from '../lib/utils'
import type { SoulEvent } from '../types'

interface Props {
  search: string
  onSearch: (v: string) => void
  category: SoulEvent['category'] | 'All'
  onCategory: (c: SoulEvent['category'] | 'All') => void
}

export default function EventFilters({ search, onSearch, category, onCategory }: Props) {
  return (
    <div className="space-y-5">
      <div className="relative max-w-md">
        <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
        <input
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search events…"
          className="w-full rounded-full border border-line bg-surface py-3 pl-11 pr-4 text-[15px] placeholder:text-muted focus:border-primary"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {eventCategories.map((c) => (
          <button
            key={c}
            onClick={() => onCategory(c)}
            className={cn(
              'rounded-full border px-4 py-1.5 text-sm transition-colors',
              category === c
                ? 'border-primary bg-primary text-white'
                : 'border-line bg-surface text-ink/70 hover:border-primary/40',
            )}
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  )
}
