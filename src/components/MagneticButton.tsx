import { useRef, useState, type ReactNode, type ButtonHTMLAttributes } from 'react'
import { motion } from 'framer-motion'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  strength?: number
}

// A gentle "magnetic" pull toward the cursor — the button nudges a few
// pixels toward wherever you're hovering, then springs back on leave.
// Kept subtle (small strength, soft spring) to stay calm rather than gimmicky.
export default function MagneticButton({ children, strength = 14, className, ...rest }: Props) {
  const ref = useRef<HTMLButtonElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  const onMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * strength
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * strength
    setPos({ x, y })
  }

  return (
    <motion.button
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 12, mass: 0.4 }}
      className={className}
      {...(rest as Record<string, unknown>)}
    >
      {children}
    </motion.button>
  )
}
