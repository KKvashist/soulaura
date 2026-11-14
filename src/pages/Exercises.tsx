import { useMemo, useState } from 'react'
import { Search, Play } from 'lucide-react'
import { exercises } from '../data/exercises'
import { cn } from '../lib/utils'
import type { ExerciseCategory } from '../types'

const categories: Array<ExerciseCategory | 'All'> = ['All', 'Strength', 'Cardio', 'Mobility', 'Yoga', 'Core', 'Recovery', 'Breathwork']
const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'] as const

export default function Exercises() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<ExerciseCategory | 'All'>('All')
  const [difficulty, setDifficulty] = useState<(typeof difficulties)[number]>('All')

  const filtered = useMemo(() => {
    return exercises
      .filter((e) => (category === 'All' ? true : e.category === category))
      .filter((e) => (difficulty === 'All' ? true : e.difficulty === difficulty))
      .filter((e) => e.name.toLowerCase().includes(search.toLowerCase()))
  }, [search, category, difficulty])

  return (
    <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
      <p className="mb-4 flex items-center gap-3 text-sm uppercase tracking-[0.25em] text-secondary">
        <span className="h-px w-8 bg-secondary" /> Exercise Library
      </p>
      <h1 className="font-display text-6xl leading-[0.98] text-primary-dark sm:text-7xl">
        Every way to <span className="italic text-secondary">move.</span>
      </h1>
      <p className="mt-6 max-w-lg text-lg text-muted">Search and filter movements across every part of the SoulAura practice.</p>

      <div className="mt-10 space-y-5">
        <div className="relative max-w-md">
          <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search exercises…"
            className="w-full rounded-full border border-line bg-surface py-3 pl-11 pr-4 text-[15px] placeholder:text-muted focus:border-primary"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={cn(
                'rounded-full border px-4 py-1.5 text-sm transition-colors',
                category === c ? 'border-primary bg-primary text-white' : 'border-line bg-surface text-ink/70 hover:border-primary/40',
              )}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {difficulties.map((d) => (
            <button
              key={d}
              onClick={() => setDifficulty(d)}
              className={cn(
                'rounded-full px-3.5 py-1 text-xs transition-colors',
                difficulty === d ? 'bg-secondary text-white' : 'bg-bg text-ink/60 hover:bg-line',
              )}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-14 text-muted">No exercises match — try a different filter.</p>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((ex) => (
            <div key={ex.id} className="rounded-3xl bg-surface p-6 ring-1 ring-line">
              <div className="flex items-start justify-between">
                <h3 className="font-display text-lg text-primary-dark">{ex.name}</h3>
                <button className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white">
                  <Play size={14} />
                </button>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted">{ex.description}</p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs text-ink/70">
                <span className="rounded-full bg-bg px-2.5 py-1">{ex.category}</span>
                <span className="rounded-full bg-bg px-2.5 py-1">{ex.difficulty}</span>
                <span className="rounded-full bg-bg px-2.5 py-1">{ex.duration}</span>
                <span className="rounded-full bg-bg px-2.5 py-1">{ex.targetArea}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
