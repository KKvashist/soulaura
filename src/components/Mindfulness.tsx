import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause } from 'lucide-react'

type Phase = 'Inhale' | 'Hold' | 'Exhale'

const phases: { name: Phase; seconds: number; scale: number }[] = [
  { name: 'Inhale', seconds: 4, scale: 1.35 },
  { name: 'Hold', seconds: 4, scale: 1.35 },
  { name: 'Exhale', seconds: 6, scale: 1 },
]

const offerings = [
  { title: 'Guided Meditation', text: 'Short, voice-led sessions to settle a busy mind.' },
  { title: 'Breathwork', text: 'Patterned breathing to shift your state in minutes.' },
  { title: 'Stress Reset', text: 'A quick pause designed for the middle of a hard day.' },
  { title: 'Sleep Relaxation', text: 'Wind down the nervous system before bed.' },
]

export default function Mindfulness() {
  const [running, setRunning] = useState(false)
  const [phaseIndex, setPhaseIndex] = useState(0)
  const [secondsLeft, setSecondsLeft] = useState(phases[0].seconds)
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    if (!running) {
      if (timerRef.current) window.clearInterval(timerRef.current)
      return
    }
    timerRef.current = window.setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          setPhaseIndex((p) => (p + 1) % phases.length)
          return phases[(phaseIndex + 1) % phases.length].seconds
        }
        return s - 1
      })
    }, 1000)
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, phaseIndex])

  const toggle = () => {
    if (!running) {
      setPhaseIndex(0)
      setSecondsLeft(phases[0].seconds)
    }
    setRunning((r) => !r)
  }

  const current = phases[phaseIndex]

  return (
    <section id="mindfulness" className="py-28 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="mb-4 flex items-center gap-3 text-sm uppercase tracking-[0.25em] text-secondary">
              <span className="h-px w-8 bg-secondary" /> Mindfulness
            </p>
            <h2 className="font-display text-5xl leading-[1.02] text-primary-dark sm:text-6xl">
              Take a <span className="italic text-secondary">breath.</span>
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
              A minute of guided breathing, whenever the day asks too much of you at once. This is a moment of calm,
              not a medical treatment — for anything more, please speak with a qualified professional.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {offerings.map((o) => (
                <div key={o.title} className="rounded-2xl bg-surface p-5 ring-1 ring-line">
                  <h3 className="font-display text-lg text-primary-dark">{o.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{o.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center justify-center">
            <div className="relative grid h-64 w-64 place-items-center sm:h-80 sm:w-80">
              <motion.div
                animate={{ scale: running ? current.scale : 1 }}
                transition={{ duration: running ? current.seconds : 0.6, ease: 'easeInOut' }}
                className="absolute h-40 w-40 rounded-full sm:h-48 sm:w-48"
                style={{ background: 'radial-gradient(circle, var(--color-water), var(--color-dawn))', opacity: 0.55 }}
              />
              <div className="relative z-10 flex flex-col items-center">
                <span className="font-display text-2xl text-primary-dark">{running ? current.name : 'Ready?'}</span>
                {running && <span className="mt-1 text-sm text-muted">{secondsLeft}s</span>}
              </div>
            </div>

            <button
              onClick={toggle}
              className="mt-10 flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-white hover:bg-primary-dark"
            >
              {running ? <Pause size={18} /> : <Play size={18} />}
              {running ? 'Pause' : 'Begin Breathing'}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
