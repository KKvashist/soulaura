import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { useEvents, upcomingEvents } from '../context/EventsContext'
import EventCard from './EventCard'
import EventApplicationModal from './EventApplicationModal'
import type { SoulEvent } from '../types'

export default function EventsPreview() {
  const [applying, setApplying] = useState<SoulEvent | null>(null)
  const { events, loading } = useEvents()
  const next3 = upcomingEvents(events)
    .slice()
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 3)

  if (loading && events.length === 0) return null

  return (
    <section id="events" className="mx-auto max-w-7xl px-6 py-28 lg:px-10 lg:py-40">
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <p className="mb-4 flex items-center gap-3 text-sm uppercase tracking-[0.25em] text-secondary">
            <span className="h-px w-8 bg-secondary" /> Events
          </p>
          <h2 className="font-display text-5xl leading-[1.02] text-primary-dark sm:text-6xl">
            What's happening <span className="italic text-secondary">at SoulAura</span>
          </h2>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">
            Move together, grow together — join a session, workshop, or gathering near you.
          </p>
        </div>
        <Link
          to="/events"
          className="flex shrink-0 items-center gap-2 text-[15px] font-medium text-primary hover:text-primary-dark"
        >
          View All Events <ArrowRight size={16} />
        </Link>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {next3.map((ev, i) => (
          <motion.div
            key={ev.id}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <EventCard event={ev} onApply={setApplying} />
          </motion.div>
        ))}
      </div>

      <EventApplicationModal event={applying} onClose={() => setApplying(null)} />
    </section>
  )
}
