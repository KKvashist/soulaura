import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CalendarDays, MapPin, ArrowRight } from 'lucide-react'
import EventFilters from '../components/EventFilters'
import EventCard from '../components/EventCard'
import EventApplicationModal from '../components/EventApplicationModal'
import PastEvents from '../components/PastEvents'
import { useEvents, upcomingEvents, featuredEvent } from '../context/EventsContext'
import { formatDate } from '../lib/utils'
import type { SoulEvent } from '../types'

export default function Events() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<SoulEvent['category'] | 'All'>('All')
  const [applying, setApplying] = useState<SoulEvent | null>(null)

  const { events } = useEvents()
  const featured = featuredEvent(events)

  const filtered = useMemo(() => {
    return upcomingEvents(events)
      .filter((e) => (category === 'All' ? true : e.category === category))
      .filter((e) => e.title.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => a.date.localeCompare(b.date))
  }, [events, search, category])

  return (
    <div>
      <section className="mx-auto max-w-7xl px-6 pb-16 pt-20 lg:px-10 lg:pt-28">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 flex items-center gap-3 text-sm uppercase tracking-[0.25em] text-secondary"
        >
          <span className="h-px w-8 bg-secondary" /> Events & Experiences
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-6xl leading-[0.98] text-primary-dark sm:text-7xl"
        >
          Experiences that <span className="italic text-secondary">move you.</span>
        </motion.h1>
        <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
          Join mindful fitness experiences, workshops, challenges, and community events designed to bring people
          together.
        </p>
      </section>

      {featured && (
        <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-10">
          <div className="grid grid-cols-1 overflow-hidden rounded-4xl bg-primary-dark text-white md:grid-cols-2">
            <img src={featured.image} alt="" className="h-64 w-full object-cover md:h-full" />
            <div className="flex flex-col justify-center p-8 sm:p-10">
              <span className="w-fit rounded-full bg-white/15 px-3 py-1 text-xs">Featured Event</span>
              <h2 className="mt-4 font-display text-3xl">{featured.title}</h2>
              <p className="mt-3 text-white/75">{featured.description}</p>
              <div className="mt-5 flex flex-wrap gap-4 text-sm text-white/70">
                <span className="flex items-center gap-1.5"><CalendarDays size={15} /> {formatDate(featured.date)}</span>
                <span className="flex items-center gap-1.5"><MapPin size={15} /> {featured.location}</span>
              </div>
              <div className="mt-7 flex gap-3">
                <Link to={`/events/${featured.id}`} className="rounded-full border border-white/30 px-6 py-2.5 text-sm hover:bg-white/10">
                  View Details
                </Link>
                <button onClick={() => setApplying(featured)} className="rounded-full bg-white px-6 py-2.5 text-sm text-primary-dark hover:bg-dawn">
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-10">
        <EventFilters search={search} onSearch={setSearch} category={category} onCategory={setCategory} />

        {filtered.length === 0 ? (
          <p className="mt-14 text-muted">No events match your search yet — try a different category or keyword.</p>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((ev) => (
              <EventCard key={ev.id} event={ev} onApply={setApplying} />
            ))}
          </div>
        )}
      </section>

      <PastEvents />

      <section className="mx-auto flex max-w-7xl justify-center px-6 py-16 lg:px-10">
        <Link to="/" className="flex items-center gap-2 text-primary hover:text-primary-dark">
          Back to home <ArrowRight size={16} />
        </Link>
      </section>

      <EventApplicationModal event={applying} onClose={() => setApplying(null)} />
    </div>
  )
}
