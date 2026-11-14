import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import type { SoulEvent } from '../types'

interface EventsContextValue {
  events: SoulEvent[]
  loading: boolean
  error: string | null
  refresh: () => void
}

const EventsContext = createContext<EventsContextValue | null>(null)

const DATA_URL = '/data/events.json'

export function EventsProvider({ children }: { children: React.ReactNode }) {
  const [events, setEvents] = useState<SoulEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(() => {
    setLoading(true)
    // cache: 'no-store' so edits made through /admin show up on refresh
    // without needing a hard reload or a rebuild.
    fetch(`${DATA_URL}?t=${Date.now()}`, { cache: 'no-store' })
      .then((res) => {
        if (!res.ok) throw new Error('Could not load events.json')
        return res.json()
      })
      .then((data: SoulEvent[]) => {
        setEvents(data)
        setError(null)
      })
      .catch((err) => setError(err.message ?? 'Failed to load events'))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    load()
  }, [load])

  return (
    <EventsContext.Provider value={{ events, loading, error, refresh: load }}>
      {children}
    </EventsContext.Provider>
  )
}

export function useEvents() {
  const ctx = useContext(EventsContext)
  if (!ctx) throw new Error('useEvents must be used within an EventsProvider')
  return ctx
}

// Pure helpers that operate on an already-loaded events array — used by
// both the site and the Admin page so filtering logic stays in one place.
export const upcomingEvents = (events: SoulEvent[]) => events.filter((e) => e.status === 'upcoming')
export const pastEvents = (events: SoulEvent[]) => events.filter((e) => e.status === 'past')
export const featuredEvent = (events: SoulEvent[]) => events.find((e) => e.status === 'upcoming' && e.featured)
export const eventById = (events: SoulEvent[], id: string) => events.find((e) => e.id === id)

export const eventCategories: Array<SoulEvent['category'] | 'All'> = [
  'All',
  'Fitness',
  'Yoga',
  'Meditation',
  'Workshop',
  'Wellness',
  'Community',
  'Challenge',
  'Retreat',
]
