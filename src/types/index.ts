export type EventCategory =
  | 'Fitness'
  | 'Yoga'
  | 'Meditation'
  | 'Workshop'
  | 'Wellness'
  | 'Community'
  | 'Challenge'
  | 'Retreat'

export interface SoulEvent {
  id: string
  title: string
  category: EventCategory
  description: string
  longDescription: string
  image: string
  date: string            // ISO date, e.g. '2026-09-15'
  day: string              // e.g. 'Tuesday'
  time: string              // e.g. '7:00 AM'
  duration: string          // e.g. '60 min'
  location: string
  host: string
  capacity: number
  availableSeats: number
  price: number | 'free'
  status: 'upcoming' | 'past'
  featured: boolean
  registered: boolean
  experience: string[]      // "What you'll experience"
  bring: string[]           // "What to bring"
  whoCanJoin: string
  faqs: { question: string; answer: string }[]
  gallery?: string[]        // for past events
  participants?: number     // for past events
}

export type ProgramDifficulty = 'Beginner' | 'Intermediate' | 'All Levels' | 'Advanced'

export interface Program {
  id: string
  title: string
  description: string
  image: string
  icon: string
  difficulty: ProgramDifficulty
  duration: string
}

export type ExerciseCategory =
  | 'Strength'
  | 'Cardio'
  | 'Mobility'
  | 'Yoga'
  | 'Core'
  | 'Recovery'
  | 'Breathwork'

export interface Exercise {
  id: string
  name: string
  category: ExerciseCategory
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  duration: string
  targetArea: string
  description: string
}
