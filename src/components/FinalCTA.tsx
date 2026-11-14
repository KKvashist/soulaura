import { useEnquiry } from '../ctx'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import MagneticButton from './MagneticButton'

export default function FinalCTA() {
  const { open } = useEnquiry()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-15%', '15%'])

  return (
    <section ref={ref} className="relative overflow-hidden bg-primary-dark py-32 text-center text-white lg:py-44">
      <motion.div
        aria-hidden
        style={{ y: bgY }}
        className="absolute inset-0 opacity-25"
      >
        <img
          src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1600&auto=format&fit=crop"
          alt=""
          className="h-[130%] w-full object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary-dark/80 to-primary-dark/60" />

      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-72 w-[130%] -translate-x-1/2 rounded-b-[100%] opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle, var(--color-dawn), transparent 70%)' }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto max-w-2xl px-6"
      >
        <p className="mb-5 flex items-center justify-center gap-3 text-sm uppercase tracking-[0.25em] text-dawn">
          <span className="h-px w-8 bg-dawn" /> Begin Today <span className="h-px w-8 bg-dawn" />
        </p>
        <h2 className="font-display text-5xl leading-[1.02] sm:text-6xl">
          Your better rhythm <span className="italic text-accent">starts here.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-md text-lg leading-relaxed text-white/75">
          Build a stronger body, a calmer mind, and a lifestyle that feels good to live.
        </p>
        <MagneticButton onClick={() => open()} className="mt-10 rounded-full bg-white px-9 py-4 text-primary-dark transition-colors hover:bg-dawn">
          Begin Your SoulAura Journey
        </MagneticButton>
      </motion.div>
    </section>
  )
}
