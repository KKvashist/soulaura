import { motion } from 'framer-motion'
import { Sunrise, Activity, BrainCircuit, Droplets, Moon } from 'lucide-react'

const ritual = [
  { icon: Sunrise, time: 'Morning', title: '5-minute breathing', text: 'Wake the body gently before the day asks anything of it.' },
  { icon: Activity, time: 'Movement', title: '20-minute workout', text: 'Strength, mobility, or flow — whichever your body needs today.' },
  { icon: BrainCircuit, time: 'Mind', title: '10-minute meditation', text: 'A pause to settle the noise and return to yourself.' },
  { icon: Droplets, time: 'Recovery', title: 'Hydration + stretching', text: 'Small, consistent care that adds up over weeks.' },
  { icon: Moon, time: 'Evening', title: 'Relaxation + sleep prep', text: 'Wind the day down so tomorrow starts from rest.' },
]

export default function DailySoulAura() {
  return (
    <section className="bg-primary-dark py-28 text-white lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-xl">
          <p className="mb-4 flex items-center gap-3 text-sm uppercase tracking-[0.25em] text-dawn">
            <span className="h-px w-8 bg-dawn" /> The Ritual
          </p>
          <h2 className="font-display text-5xl leading-[1.02] sm:text-6xl">
            Daily <span className="italic text-accent">SoulAura</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-white/70">
            Not a checklist — a rhythm. Five small moments that carry you through the day.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-4xl bg-white/10 sm:grid-cols-2 lg:grid-cols-5">
          {ritual.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="bg-primary-dark p-7"
            >
              <r.icon className="text-dawn" size={26} strokeWidth={1.5} />
              <p className="mt-6 text-sm text-white/60">{r.time}</p>
              <h3 className="mt-1 font-display text-xl">{r.title}</h3>
              <p className="mt-3 text-[14px] leading-relaxed text-white/70">{r.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
