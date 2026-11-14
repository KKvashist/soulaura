import { motion } from 'framer-motion'

const lines = ['Move with strength.', 'Breathe with intention.', 'Recover with purpose.', 'Live with balance.']

export default function About() {
  return (
    <section id="about" className="py-28 lg:py-40">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-6 lg:grid-cols-2 lg:gap-20 lg:px-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
        >
          <p className="mb-4 flex items-center gap-3 text-sm uppercase tracking-[0.25em] text-secondary">
            <span className="h-px w-8 bg-secondary" /> About SoulAura
          </p>
          <h2 className="font-display text-5xl leading-[1.05] text-primary-dark sm:text-6xl">
            Wellness should <span className="italic text-secondary">feel good</span> to live.
          </h2>
          <div className="mt-9 space-y-2 border-t border-line pt-8">
            {lines.map((l) => (
              <p key={l} className="font-display text-xl text-ink/80 sm:text-2xl">
                {l}
              </p>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="overflow-hidden rounded-4xl"
        >
          <img
            src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1100&auto=format&fit=crop"
            alt="A calm studio space filled with natural light"
            className="aspect-[5/6] w-full object-cover"
          />
        </motion.div>
      </div>
    </section>
  )
}
