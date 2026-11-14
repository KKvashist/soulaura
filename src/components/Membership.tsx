import { useEnquiry } from '../ctx'
import { motion } from 'framer-motion'
import { Check, Sparkles } from 'lucide-react'
import { cn } from '../lib/utils'

const plans = [
  {
    name: 'Soul Start',
    tagline: 'For beginners',
    price: 39,
    features: ['2 studio sessions / week', 'Exercise library access', 'Guided breathing sessions', 'Community events'],
    highlighted: false,
  },
  {
    name: 'Soul Balance',
    tagline: 'For building consistency',
    price: 69,
    features: ['Unlimited studio sessions', 'Full program library', 'Monthly progress check-in', 'Priority event registration', 'Recovery & mobility sessions'],
    highlighted: true,
  },
  {
    name: 'Soul Elevate',
    tagline: 'For advanced, personalized wellness',
    price: 119,
    features: ['Everything in Soul Balance', '1:1 coaching sessions', 'Personalized wellness plan', 'Retreat & workshop discounts', 'Dedicated recovery planning'],
    highlighted: false,
  },
]

export default function Membership() {
  const { open } = useEnquiry()
  return (
    <section id="membership" className="mx-auto max-w-7xl px-6 py-28 lg:px-10 lg:py-40">
      <div className="max-w-xl">
        <p className="mb-4 flex items-center gap-3 text-sm uppercase tracking-[0.25em] text-secondary">
          <span className="h-px w-8 bg-secondary" /> Membership
        </p>
        <h2 className="font-display text-5xl leading-[1.02] text-primary-dark sm:text-6xl">
          Find your <span className="italic text-secondary">rhythm</span>
        </h2>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-start">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -8 }}
            className={cn(
              'relative flex flex-col rounded-4xl p-8 transition-shadow duration-300',
              plan.highlighted
                ? 'bg-primary-dark text-white shadow-2xl shadow-primary-dark/30 lg:scale-105 lg:py-10'
                : 'bg-surface shadow-sm ring-1 ring-line hover:shadow-xl',
            )}
          >
            {plan.highlighted && (
              <span className="absolute -top-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-accent px-4 py-1.5 text-xs font-medium text-primary-dark shadow-md">
                <Sparkles size={12} /> Most popular
              </span>
            )}

            <h3 className="font-display text-2xl">{plan.name}</h3>
            <p className={cn('mt-1 text-sm', plan.highlighted ? 'text-white/70' : 'text-muted')}>{plan.tagline}</p>
            <p className="mt-6 font-display text-5xl">
              ${plan.price}
              <span className={cn('text-base font-normal', plan.highlighted ? 'text-white/60' : 'text-muted')}> / month</span>
            </p>

            <ul className="mt-7 flex-1 space-y-3">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-[15px]">
                  <Check size={17} className={cn('mt-0.5 shrink-0', plan.highlighted ? 'text-dawn' : 'text-secondary')} />
                  <span className={plan.highlighted ? 'text-white/90' : 'text-ink/80'}>{f}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => open(plan.name)}
              className={cn(
                'mt-8 rounded-full py-3 transition-colors',
                plan.highlighted
                  ? 'bg-white text-primary-dark hover:bg-dawn'
                  : 'bg-primary text-white hover:bg-primary-dark',
              )}
            >
              Choose {plan.name}
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
