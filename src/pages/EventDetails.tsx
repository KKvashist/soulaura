import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { CalendarDays, Clock, MapPin, Users, ChevronLeft } from 'lucide-react'
import { useEvents, eventById } from '../context/EventsContext'
import { formatDate } from '../lib/utils'
import EventApplicationModal from '../components/EventApplicationModal'

export default function EventDetails() {
  const { id } = useParams()
  const { events } = useEvents()
  const event = id ? eventById(events, id) : undefined
  const [applying, setApplying] = useState(false)

  if (!event) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-32 text-center">
        <h1 className="font-display text-3xl text-primary-dark">Event not found</h1>
        <p className="mt-3 text-muted">This event may have already passed or the link is out of date.</p>
        <Link to="/events" className="mt-8 inline-block rounded-full bg-primary px-7 py-3 text-white">
          Back to Events
        </Link>
      </div>
    )
  }

  return (
    <div>
      <div className="relative h-[46vh] min-h-[320px] w-full overflow-hidden">
        <img src={event.image} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/10 to-transparent" />
        <Link
          to="/events"
          className="absolute left-6 top-6 flex items-center gap-1.5 rounded-full bg-surface/90 px-4 py-2 text-sm text-primary-dark lg:left-10"
        >
          <ChevronLeft size={16} /> All Events
        </Link>
      </div>

      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 px-6 py-14 lg:grid-cols-[1.4fr_1fr] lg:px-10">
        <div>
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">{event.category}</span>
          <h1 className="mt-4 font-display text-4xl text-primary-dark sm:text-5xl">{event.title}</h1>
          <p className="mt-5 text-lg leading-relaxed text-muted">{event.longDescription || event.description}</p>

          {event.experience.length > 0 && (
            <div className="mt-10">
              <h2 className="font-display text-2xl text-primary-dark">What you'll experience</h2>
              <ul className="mt-4 space-y-2.5">
                {event.experience.map((e) => (
                  <li key={e} className="flex items-start gap-2.5 text-[15px] text-ink/80">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {e}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {event.bring.length > 0 && (
            <div className="mt-8">
              <h2 className="font-display text-2xl text-primary-dark">What to bring</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-ink/80">{event.bring.join(' · ')}</p>
            </div>
          )}

          {event.whoCanJoin && (
            <div className="mt-8">
              <h2 className="font-display text-2xl text-primary-dark">Who can join</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-ink/80">{event.whoCanJoin}</p>
            </div>
          )}

          {event.faqs.length > 0 && (
            <div className="mt-8">
              <h2 className="font-display text-2xl text-primary-dark">FAQs</h2>
              <div className="mt-4 space-y-4">
                {event.faqs.map((f) => (
                  <div key={f.question} className="rounded-2xl bg-surface p-5 ring-1 ring-line">
                    <p className="font-medium text-ink">{f.question}</p>
                    <p className="mt-1.5 text-[15px] text-muted">{f.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <aside className="h-fit rounded-4xl bg-surface p-7 ring-1 ring-line lg:sticky lg:top-28">
          <p className="font-display text-3xl text-primary-dark">{event.price === 'free' ? 'Free' : `$${event.price}`}</p>
          <dl className="mt-6 space-y-3 text-[15px] text-ink/80">
            <div className="flex items-center gap-2.5"><CalendarDays size={16} className="text-secondary" /> {formatDate(event.date)} · {event.day}</div>
            <div className="flex items-center gap-2.5"><Clock size={16} className="text-secondary" /> {event.time} · {event.duration}</div>
            <div className="flex items-center gap-2.5"><MapPin size={16} className="text-secondary" /> {event.location}</div>
            <div className="flex items-center gap-2.5"><Users size={16} className="text-secondary" /> {event.availableSeats} of {event.capacity} seats left</div>
          </dl>
          <p className="mt-5 text-sm text-muted">Hosted by {event.host}</p>
          <button
            onClick={() => setApplying(true)}
            disabled={event.availableSeats === 0}
            className="mt-7 w-full rounded-full bg-primary py-3.5 text-white hover:bg-primary-dark disabled:bg-muted"
          >
            {event.availableSeats === 0 ? 'Fully Booked' : 'Apply / Register Now'}
          </button>
        </aside>
      </div>

      <EventApplicationModal event={applying ? event : null} onClose={() => setApplying(false)} />
    </div>
  )
}
