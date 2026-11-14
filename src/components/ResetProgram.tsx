import { motion } from 'framer-motion'
import { Brain, Dumbbell, Apple, Flower2 } from 'lucide-react'
import { useEnquiry } from '../ctx'

const weeks = [
  { n: 1, who: 'Psychologist', icon: Brain, text: 'Understand what is underneath the pattern.' },
  { n: 2, who: 'Trainer', icon: Dumbbell, text: 'Rebuild movement as capability.' },
  { n: 3, who: 'Nutritionist', icon: Apple, text: 'Repair your relationship with food.' },
  { n: 4, who: 'Yoga instructor', icon: Flower2, text: 'Bring it all together.' },
]

export default function ResetProgram() {
  const { open } = useEnquiry()
  return (
    <section id="reset" className="bg-primary-dark py-24 text-white lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <p className="mb-4 flex items-center gap-3 text-sm uppercase tracking-[0.25em] text-accent">
          <span className="h-px w-8 bg-accent" /> Our flagship program
        </p>
        <h2 className="max-w-3xl font-display text-5xl leading-[1.02] sm:text-6xl">
          4-Week Reset Program
        </h2>
        <p className="mt-5 max-w-3xl font-display text-2xl italic text-dawn sm:text-3xl">
          Four weeks. Four disciplines. One version of you that finally sticks.
        </p>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75">
          This isn't a generic plan. Each week is built around a real intervention, sequenced on purpose, not bundled by accident.
        </p>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {weeks.map((w, i) => (
            <motion.div
              key={w.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-3xl border border-white/15 bg-white/5 p-6"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm uppercase tracking-widest text-accent">Week {w.n}</span>
                <w.icon size={22} className="text-dawn" />
              </div>
              <h3 className="mt-4 font-display text-2xl">With a {w.who.toLowerCase()}</h3>
              <p className="mt-2 text-white/75">{w.text}</p>
            </motion.div>
          ))}
        </div>
        <button
          onClick={() => open('4-Week Reset Program')}
          className="mt-10 inline-flex min-h-[52px] items-center rounded-full bg-white px-9 text-primary-dark transition-colors hover:bg-dawn"
        >
          Enquire about the 4-Week Reset
        </button>
      </div>
    </section>
  )
}
