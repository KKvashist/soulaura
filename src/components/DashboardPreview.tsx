import { Link } from 'react-router-dom'
import { Flame, Activity, Brain, ArrowRight } from 'lucide-react'
import { useEvents, upcomingEvents } from '../context/EventsContext'

export default function DashboardPreview() {
  const { events } = useEvents()
  const registered = upcomingEvents(events).find((e) => e.registered)

  return (
    <section className="mx-auto max-w-7xl px-6 py-28 lg:px-10 lg:py-40">
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-20">
        <div>
          <p className="mb-4 flex items-center gap-3 text-sm uppercase tracking-[0.25em] text-secondary">
            <span className="h-px w-8 bg-secondary" /> Your Dashboard
          </p>
          <h2 className="font-display text-5xl leading-[1.02] text-primary-dark sm:text-6xl">
            Your wellness, <span className="italic text-secondary">at a glance</span>
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
            A single view of your workouts, mindfulness practice, and recovery — so progress is something you can see.
          </p>
          <Link
            to="/dashboard"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-white hover:bg-primary-dark"
          >
            View Full Dashboard <ArrowRight size={16} />
          </Link>
        </div>

        <div className="rounded-4xl bg-surface p-6 ring-1 ring-line sm:p-8">
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-2xl bg-bg p-4 text-center">
              <Flame className="mx-auto text-accent" size={22} />
              <p className="mt-2 font-display text-2xl text-primary-dark">24</p>
              <p className="text-xs text-muted">Day streak</p>
            </div>
            <div className="rounded-2xl bg-bg p-4 text-center">
              <Activity className="mx-auto text-secondary" size={22} />
              <p className="mt-2 font-display text-2xl text-primary-dark">420</p>
              <p className="text-xs text-muted">Calories today</p>
            </div>
            <div className="rounded-2xl bg-bg p-4 text-center">
              <Brain className="mx-auto text-water" size={22} />
              <p className="mt-2 font-display text-2xl text-primary-dark">10</p>
              <p className="text-xs text-muted">Mindful minutes</p>
            </div>
          </div>

          {registered && (
            <div className="mt-6 flex items-center justify-between rounded-2xl bg-bg p-5">
              <div>
                <p className="text-xs uppercase tracking-wide text-muted">Upcoming</p>
                <p className="mt-1 font-display text-lg text-primary-dark">{registered.title}</p>
                <p className="text-sm text-muted">{registered.date} · {registered.time}</p>
              </div>
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">✓ Registered</span>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
