import { motion } from 'framer-motion'
import { Users } from 'lucide-react'
import { useEvents, pastEvents } from '../context/EventsContext'
import { formatDate } from '../lib/utils'

export default function PastEvents() {
  const { events } = useEvents()
  const past = pastEvents(events)

  if (past.length === 0) return null

  return (
    <section className="bg-surface/60 py-28 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-xl">
          <p className="mb-4 flex items-center gap-3 text-sm uppercase tracking-[0.25em] text-secondary">
            <span className="h-px w-8 bg-secondary" /> Community
          </p>
          <h2 className="font-display text-5xl leading-[1.02] text-primary-dark sm:text-6xl">
            Moments we've <span className="italic text-secondary">shared</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted">A look back at the people and practices that make this community.</p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          {past.map((ev, i) => (
            <motion.article
              key={ev.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className="overflow-hidden rounded-3xl bg-surface ring-1 ring-line"
            >
              <div className="grid grid-cols-3 gap-0.5">
                {(ev.gallery ?? [ev.image]).slice(0, 3).map((src, idx) => (
                  <img key={idx} src={src} alt="" className="aspect-square w-full object-cover" />
                ))}
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-xl text-primary-dark">{ev.title}</h3>
                  <span className="flex items-center gap-1.5 text-sm text-muted">
                    <Users size={14} /> {ev.participants}
                  </span>
                </div>
                <p className="mt-1.5 text-sm text-muted">{formatDate(ev.date)}</p>
                <p className="mt-3 text-[15px] leading-relaxed text-ink/75">{ev.description}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
