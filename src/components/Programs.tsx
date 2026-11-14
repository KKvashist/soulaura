import { motion } from 'framer-motion'
import { Dumbbell, Waves, Flower2, Wind, Activity, Leaf, ArrowUpRight, type LucideIcon } from 'lucide-react'
import { programs } from '../data/programs'

const icons: Record<string, LucideIcon> = { Dumbbell, Waves, Flower2, Wind, Activity, Leaf }

export default function Programs() {
  return (
    <section id="programs" className="bg-surface/60 py-28 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <p className="mb-4 flex items-center gap-3 text-sm uppercase tracking-[0.25em] text-secondary">
              <span className="h-px w-8 bg-secondary" /> Programs
            </p>
            <h2 className="font-display text-5xl leading-[1.02] text-primary-dark sm:text-6xl">
              Six ways to <span className="italic text-secondary">move</span>
            </h2>
          </div>
          <p className="max-w-xs text-[15px] leading-relaxed text-muted">
            Chosen to fit where you are — not where a generic plan assumes you should be.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((program, i) => {
            const Icon = icons[program.icon] ?? Activity
            return (
              <motion.article
                key={program.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="group relative overflow-hidden rounded-4xl bg-surface shadow-sm ring-1 ring-line"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={program.image}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/90 via-primary-dark/10 to-transparent opacity-90 transition-opacity group-hover:opacity-100" />

                  <span className="font-display text-outline absolute left-5 top-5 text-4xl opacity-70" style={{ WebkitTextStroke: '1.2px #fff' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full bg-white/15 text-white backdrop-blur">
                    <Icon size={18} />
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                    <h3 className="font-display text-2xl">{program.title}</h3>
                    <p className="mt-2 max-h-0 overflow-hidden text-[14px] leading-relaxed text-white/80 opacity-0 transition-all duration-500 ease-out group-hover:mt-2 group-hover:max-h-24 group-hover:opacity-100">
                      {program.description}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-white/75">
                        <span className="rounded-full bg-white/15 px-3 py-1">{program.difficulty}</span>
                        <span className="rounded-full bg-white/15 px-3 py-1">{program.duration}</span>
                      </div>
                      <ArrowUpRight
                        size={18}
                        className="shrink-0 translate-x-0 opacity-70 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100"
                      />
                    </div>
                  </div>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
