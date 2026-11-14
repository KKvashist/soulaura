import { Flame, Activity, Brain, HeartPulse, TrendingUp, Moon } from 'lucide-react'
import { useEvents, upcomingEvents } from '../context/EventsContext'
import { formatDate } from '../lib/utils'

const cards = [
  { icon: Activity, label: "Today's workout", value: 'Mobility & Flexibility', sub: '30 min · not started' },
  { icon: Flame, label: 'Workout streak', value: '24 days', sub: 'Personal best: 31 days' },
  { icon: TrendingUp, label: 'Strength progress', value: '+18%', sub: 'Since your last check-in' },
  { icon: HeartPulse, label: 'Mobility score', value: '78 / 100', sub: 'Up 6 points this month' },
  { icon: Brain, label: 'Mindfulness minutes', value: '146 min', sub: 'This month' },
  { icon: Moon, label: 'Recovery status', value: 'Good', sub: 'Sleep and rest on track' },
]

const weekly = [
  { day: 'Mon', minutes: 32 },
  { day: 'Tue', minutes: 45 },
  { day: 'Wed', minutes: 20 },
  { day: 'Thu', minutes: 50 },
  { day: 'Fri', minutes: 28 },
  { day: 'Sat', minutes: 60 },
  { day: 'Sun', minutes: 15 },
]

export default function Dashboard() {
  const { events } = useEvents()
  const registered = upcomingEvents(events).filter((e) => e.registered)
  const maxMinutes = Math.max(...weekly.map((w) => w.minutes))

  return (
    <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
      <p className="mb-4 flex items-center gap-3 text-sm uppercase tracking-[0.25em] text-secondary">
        <span className="h-px w-8 bg-secondary" /> Dashboard
      </p>
      <h1 className="font-display text-6xl leading-[0.98] text-primary-dark sm:text-7xl">
        Your wellness, <span className="italic text-secondary">tracked.</span>
      </h1>
      <p className="mt-6 max-w-lg text-lg text-muted">Sample data — this is where your real activity will appear once connected to your account.</p>

      <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <div key={c.label} className="rounded-3xl bg-surface p-6 ring-1 ring-line">
            <c.icon className="text-primary" size={22} />
            <p className="mt-4 text-sm text-muted">{c.label}</p>
            <p className="mt-1 font-display text-2xl text-primary-dark">{c.value}</p>
            <p className="mt-1 text-xs text-muted">{c.sub}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-[1.3fr_1fr]">
        <div className="rounded-3xl bg-surface p-7 ring-1 ring-line">
          <p className="text-sm text-muted">Weekly activity</p>
          <div className="mt-6 flex h-44 items-end gap-3">
            {weekly.map((w) => (
              <div key={w.day} className="flex flex-1 flex-col items-center gap-2">
                <div
                  className="w-full rounded-t-lg bg-secondary/70"
                  style={{ height: `${(w.minutes / maxMinutes) * 100}%`, minHeight: 4 }}
                />
                <span className="text-xs text-muted">{w.day}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl bg-surface p-7 ring-1 ring-line">
          <p className="text-sm text-muted">Upcoming registered events</p>
          <div className="mt-5 space-y-4">
            {registered.length === 0 && <p className="text-sm text-muted">No events registered yet.</p>}
            {registered.map((e) => (
              <div key={e.id} className="rounded-2xl bg-bg p-4">
                <p className="font-display text-lg text-primary-dark">{e.title}</p>
                <p className="text-sm text-muted">{formatDate(e.date)} · {e.time}</p>
                <span className="mt-2 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">✓ Registered</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
