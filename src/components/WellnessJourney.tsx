import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const steps = [
  { n: '01', title: 'Discover', text: 'Understand your body, goals, lifestyle, and current fitness level.' },
  { n: '02', title: 'Personalize', text: 'Create a wellness routine designed around your goals.' },
  { n: '03', title: 'Practice', text: 'Follow workouts, mobility sessions, mindfulness exercises, and recovery routines.' },
  { n: '04', title: 'Transform', text: 'Track progress and build sustainable habits.' },
]

export default function WellnessJourney() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 60%'] })
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section className="mx-auto max-w-7xl px-6 py-28 lg:px-10 lg:py-40">
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div className="max-w-xl">
          <p className="mb-4 flex items-center gap-3 text-sm uppercase tracking-[0.25em] text-secondary">
            <span className="h-px w-8 bg-secondary" /> The Process
          </p>
          <h2 className="font-display text-5xl leading-[1.02] text-primary-dark sm:text-6xl">
            Your wellness <span className="italic text-secondary">journey</span>
          </h2>
        </div>
        <p className="max-w-xs text-[15px] leading-relaxed text-muted">Four steps, repeated for as long as it takes.</p>
      </div>

      <div ref={ref} className="relative mt-20">
        <div aria-hidden className="absolute left-0 right-0 top-7 hidden h-px bg-line lg:block" />
        <motion.div
          aria-hidden
          style={{ scaleX: lineScale }}
          className="absolute left-0 right-0 top-7 hidden h-px origin-left bg-accent lg:block"
        />
        <div className="grid grid-cols-1 gap-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.55, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <span
                aria-hidden
                className="font-display text-outline pointer-events-none absolute -top-8 left-0 text-7xl leading-none opacity-60 sm:text-8xl"
              >
                {step.n}
              </span>
              <div className="relative z-10 grid h-14 w-14 place-items-center rounded-full bg-primary font-display text-lg text-white shadow-lg">
                {step.n}
              </div>
              <h3 className="mt-6 font-display text-3xl text-primary-dark">{step.title}</h3>
              <p className="mt-2 max-w-[26ch] text-[15px] leading-relaxed text-muted">{step.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
