import { motion } from 'framer-motion'

const pillars = ['Strength', 'Mobility', 'Energy', 'Confidence', 'Recovery', 'Mental clarity', 'Consistency', 'Inner balance']

export default function Philosophy() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-28 lg:px-10 lg:py-40">
      <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
        {/* overlapping editorial image pair */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="aspect-[4/5] w-[78%] overflow-hidden rounded-4xl">
            <img
              src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1100&auto=format&fit=crop"
              alt="A calm outdoor mobility session in natural light"
              className="h-full w-full object-cover"
            />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -right-2 bottom-0 aspect-[3/4] w-[52%] overflow-hidden rounded-3xl shadow-2xl ring-8 ring-bg sm:-right-6"
          >
            <img
              src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop"
              alt="A quiet moment of breathwork"
              className="h-full w-full object-cover"
            />
          </motion.div>
          <span aria-hidden className="font-display text-outline pointer-events-none absolute -left-6 -top-10 text-[7rem] leading-none sm:text-[9rem]">
            01
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="lg:pl-6"
        >
          <p className="mb-4 flex items-center gap-3 text-sm uppercase tracking-[0.25em] text-secondary">
            <span className="h-px w-8 bg-secondary" /> Our Philosophy
          </p>
          <h2 className="font-display text-5xl leading-[1.02] text-primary-dark sm:text-6xl">
            Fitness for the body.
            <br />
            <span className="italic text-secondary">Balance</span> for the soul.
          </h2>
          <p className="mt-7 max-w-prose text-lg leading-relaxed text-muted">
            Fitness isn't only about how you look. At SoulAura, it's a practice that touches every part of how you
            feel — the strength in your body, the clarity in your mind, and the steadiness you carry through your day.
          </p>
          <ul className="mt-9 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-line pt-8 sm:grid-cols-2">
            {pillars.map((p, i) => (
              <motion.li
                key={p}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="flex items-center gap-3 text-ink/85"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {p}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
