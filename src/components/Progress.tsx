import { motion } from 'framer-motion'

const stats = [
  { label: 'Workouts completed', value: '32' },
  { label: 'Hours of mindfulness', value: '12' },
  { label: 'Strength improvement', value: '18%' },
  { label: 'Day consistency streak', value: '24' },
]

const weeklyMinutes = [20, 35, 15, 45, 30, 50, 25]
const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

function RingProgress({ percent, label }: { percent: number; label: string }) {
  const r = 46
  const c = 2 * Math.PI * r
  return (
    <div className="flex flex-col items-center">
      <svg width="120" height="120" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r={r} fill="none" stroke="var(--color-line)" strokeWidth="10" />
        <motion.circle
          cx="60"
          cy="60"
          r={r}
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          whileInView={{ strokeDashoffset: c - (percent / 100) * c }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          transform="rotate(-90 60 60)"
        />
        <text x="60" y="66" textAnchor="middle" className="font-display" fontSize="22" fill="var(--color-primary-dark)">
          {percent}%
        </text>
      </svg>
      <p className="mt-2 text-sm text-muted">{label}</p>
    </div>
  )
}

export default function ProgressSection() {
  const max = Math.max(...weeklyMinutes)
  return (
    <section id="progress" className="mx-auto max-w-7xl px-6 py-28 lg:px-10 lg:py-40">
      <div className="max-w-xl">
        <p className="mb-4 flex items-center gap-3 text-sm uppercase tracking-[0.25em] text-secondary">
          <span className="h-px w-8 bg-secondary" /> Progress
        </p>
        <h2 className="font-display text-5xl leading-[1.02] text-primary-dark sm:text-6xl">
          Small steps.
          <br />
          <span className="italic text-secondary">Meaningful</span> change.
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-muted">A sample of what a member's month can look like.</p>
      </div>

      <div className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-3xl bg-surface p-6 text-center ring-1 ring-line">
            <p className="font-display text-3xl text-primary-dark sm:text-4xl">{s.value}</p>
            <p className="mt-2 text-sm leading-snug text-muted">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_1fr]">
        <div className="rounded-3xl bg-surface p-7 ring-1 ring-line">
          <p className="text-sm text-muted">Mindfulness minutes this week</p>
          <div className="mt-6 flex h-40 items-end gap-3">
            {weeklyMinutes.map((m, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-2">
                <motion.div
                  initial={{ height: 0 }}
                  whileInView={{ height: `${(m / max) * 100}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full rounded-t-lg bg-secondary/70"
                  style={{ minHeight: 4 }}
                />
                <span className="text-xs text-muted">{days[i]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 rounded-3xl bg-surface p-7 ring-1 ring-line">
          <RingProgress percent={78} label="Mobility score" />
          <RingProgress percent={64} label="Recovery status" />
        </div>
      </div>
    </section>
  )
}
