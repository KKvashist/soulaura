import { Link } from 'react-router-dom'
import { CalendarDays, Clock, MapPin, Users } from 'lucide-react'
import type { SoulEvent } from '../types'
import { formatDate } from '../lib/utils'

interface Props {
  event: SoulEvent
  onApply: (event: SoulEvent) => void
}

export default function EventCard({ event, onApply }: Props) {
  const seatsLow = event.availableSeats <= Math.max(3, Math.round(event.capacity * 0.15))

  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl bg-surface shadow-sm ring-1 ring-line">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={event.image}
          alt=""
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-surface/90 px-3 py-1 text-xs font-medium text-primary-dark">
          {event.category}
        </span>
        {event.registered && (
          <span className="absolute right-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-medium text-white">
            Registered
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl text-primary-dark">{event.title}</h3>
        <p className="mt-2 text-[15px] leading-relaxed text-muted">{event.description}</p>

        <dl className="mt-5 space-y-2 text-sm text-ink/75">
          <div className="flex items-center gap-2">
            <CalendarDays size={15} className="text-secondary" />
            <span>{formatDate(event.date)} · {event.day}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={15} className="text-secondary" />
            <span>{event.time} · {event.duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={15} className="text-secondary" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users size={15} className="text-secondary" />
            <span className={seatsLow ? 'text-accent' : ''}>{event.availableSeats} seats remaining</span>
          </div>
        </dl>

        <div className="mt-6 flex items-center justify-between gap-3">
          <span className="font-display text-lg text-primary-dark">
            {event.price === 'free' ? 'Free' : `$${event.price}`}
          </span>
          <div className="flex items-center gap-3">
            <Link to={`/events/${event.id}`} className="text-sm font-medium text-primary hover:text-primary-dark">
              View Details
            </Link>
            <button
              onClick={() => onApply(event)}
              disabled={event.availableSeats === 0}
              className="rounded-full bg-primary px-5 py-2 text-sm text-white transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:bg-muted"
            >
              {event.availableSeats === 0 ? 'Full' : event.category === 'Community' ? 'Join Event' : 'Apply Now'}
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}
