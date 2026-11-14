import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react'

const testimonials = [
  {
    name: 'Elena R.',
    role: 'Member since 2025',
    quote:
      'I came in looking for a workout plan and stayed for how much steadier I feel day to day — my energy is more even and my sleep has improved.',
  },
  {
    name: 'Marcus T.',
    role: 'Soul Balance member',
    quote:
      'The mobility and breathwork sessions changed how my body feels after long workdays. I finally look forward to moving instead of dreading it.',
  },
  {
    name: 'Priya K.',
    role: 'Member since 2024',
    quote:
      'What kept me consistent was that nothing here feels like punishment. I have built a routine I actually want to keep.',
  },
  {
    name: 'Jonah B.',
    role: 'Soul Elevate member',
    quote:
      'Strength training paired with real recovery guidance made progress feel sustainable for the first time in years.',
  },
]

export default function Testimonials() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 6000)
    return () => clearInterval(id)
  }, [])

  const go = (dir: 1 | -1) => setIndex((i) => (i + dir + testimonials.length) % testimonials.length)
  const current = testimonials[index]

  return (
    <section className="bg-primary-dark py-28 text-white lg:py-40">
      <div className="mx-auto max-w-4xl px-6 text-center lg:px-10">
        <p className="mb-6 flex items-center justify-center gap-3 text-sm uppercase tracking-[0.25em] text-dawn">
          <span className="h-px w-8 bg-dawn" /> Told in their own words <span className="h-px w-8 bg-dawn" />
        </p>

        <Quote className="mx-auto text-accent" size={34} strokeWidth={1.2} />

        <div className="relative mt-6 min-h-[220px] sm:min-h-[180px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <blockquote className="font-display text-3xl leading-snug sm:text-4xl">"{current.quote}"</blockquote>
              <p className="mt-6 text-sm text-white/60">
                {current.name} · {current.role}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex items-center justify-center gap-6">
          <button onClick={() => go(-1)} aria-label="Previous testimonial" className="grid h-10 w-10 place-items-center rounded-full border border-white/20 hover:bg-white/10">
            <ChevronLeft size={18} />
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Show testimonial ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${i === index ? 'w-6 bg-accent' : 'w-1.5 bg-white/25'}`}
              />
            ))}
          </div>
          <button onClick={() => go(1)} aria-label="Next testimonial" className="grid h-10 w-10 place-items-center rounded-full border border-white/20 hover:bg-white/10">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  )
}
