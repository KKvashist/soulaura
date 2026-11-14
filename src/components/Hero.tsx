import { useEnquiry } from '../ctx'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import MagneticButton from './MagneticButton'

export default function Hero() {
  const { open } = useEnquiry()
  const navigate = useNavigate()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  // subtle parallax: image drifts slower than the scroll, headline fades/lifts out
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-12%'])
  const textOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section ref={ref} className="relative overflow-hidden bg-bg">
      {/* soft drifting light — decorative, non-interactive */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-16 h-72 w-72 rounded-full opacity-40 blur-3xl animate-drift"
        style={{ background: 'radial-gradient(circle, var(--color-dawn), transparent 70%)' }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 bottom-0 h-96 w-96 rounded-full opacity-30 blur-3xl animate-drift"
        style={{ background: 'radial-gradient(circle, var(--color-water), transparent 70%)', animationDelay: '3s' }}
      />

      <div className="relative mx-auto grid min-h-[92vh] max-w-7xl grid-cols-1 items-center gap-10 px-6 pb-16 pt-28 lg:min-h-screen lg:grid-cols-[1.15fr_0.85fr] lg:gap-6 lg:px-10 lg:pt-24">
        <motion.div style={{ y: textY, opacity: textOpacity }} className="relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4 flex items-center gap-3 text-sm uppercase tracking-[0.25em] text-secondary"
          >
            <span className="h-px w-8 bg-secondary" /> Mindful Fitness
          </motion.p>

          <h1 className="font-display text-[16vw] font-medium leading-[0.92] tracking-tight text-primary-dark sm:text-7xl lg:text-8xl xl:text-[7.2rem]">
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              Move Better.
            </motion.span>
            <motion.span
              className="ml-[6vw] block italic text-secondary lg:ml-16"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              Feel Deeper.
            </motion.span>
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
            >
              Live Fully.
            </motion.span>
          </h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-9 flex flex-wrap items-end justify-between gap-8"
          >
            <p className="max-w-xs text-lg leading-relaxed text-muted">
              SoulAura brings mindful movement, fitness, recovery, and wellness together into one balanced journey.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <MagneticButton
                onClick={() => open()}
                className="group flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-white transition-colors hover:bg-primary-dark"
              >
                Start Your Journey
                <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </MagneticButton>
              <button
                onClick={() => document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth' })}
                className="rounded-full border border-primary/25 px-8 py-3.5 text-primary-dark transition-colors hover:border-primary"
              >
                Explore Programs
              </button>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="relative lg:justify-self-end"
        >
          <div className="organic-edge relative aspect-[4/5] w-full max-w-md overflow-hidden lg:max-w-none">
            <motion.img
              style={{ y: imageY }}
              src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200&auto=format&fit=crop"
              alt="A person moving mindfully through a stretch in soft golden-hour light"
              className="absolute inset-0 h-[120%] w-full object-cover"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9, type: 'spring', stiffness: 90 }}
            className="absolute -bottom-6 -left-6 hidden rounded-3xl bg-surface px-6 py-4 shadow-xl sm:block"
          >
            <p className="font-display text-2xl text-primary-dark">4.9 / 5</p>
            <p className="text-sm text-muted">from 1,200+ members</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.1, type: 'spring', stiffness: 120 }}
            className="absolute -top-5 -right-5 hidden h-20 w-20 place-items-center rounded-full bg-accent text-center font-display text-sm leading-tight text-primary-dark shadow-lg sm:grid"
          >
            6 years<br />running
          </motion.div>
        </motion.div>
      </div>

      <div className="relative hidden justify-center pb-6 lg:flex">
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}>
          <ArrowDown className="text-primary/40" size={20} />
        </motion.div>
      </div>
    </section>
  )
}
