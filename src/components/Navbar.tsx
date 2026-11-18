import { useEnquiry } from '../ctx'
import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { cn } from '../lib/utils'
import MagneticButton from './MagneticButton'

const links = [
  { label: 'Home', href: '/' },
  { label: '4-Week Reset', href: '/#reset' },
  { label: 'Programs', href: '/#programs' },
  { label: 'Exercises', href: '/exercises' },
  { label: 'Mindfulness', href: '/#mindfulness' },
  { label: 'Events', href: '/events' },
  { label: 'Progress', href: '/#progress' },
  { label: 'About', href: '/#about' },
]

export default function Navbar() {
  const { open: openEnquiry } = useEnquiry()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [location.pathname])

  const goTo = (href: string) => {
    setOpen(false)
    if (href.startsWith('/#')) {
      const id = href.slice(2)
      if (location.pathname !== '/') {
        navigate('/')
        setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 60)
      } else {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      navigate(href)
    }
  }

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-colors duration-300',
        scrolled ? 'bg-surface/90 backdrop-blur-md shadow-[0_1px_0_0_var(--color-line)]' : 'bg-transparent',
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <Link to="/" aria-label="Soulaura — home" className="flex items-center">
          <img
            src="/assets/soulaura-logo.png"
            alt="Soulaura"
            width={900}
            height={457}
            className="h-11 w-auto sm:h-12 lg:h-14"
          />
        </Link>

        <ul className="hidden items-center gap-9 lg:flex">
          {links.map((l) => (
            <li key={l.label}>
              <button
                onClick={() => goTo(l.href)}
                className="text-[15px] text-ink/80 transition-colors hover:text-primary"
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <MagneticButton
            onClick={() => openEnquiry()}
            className="rounded-full bg-primary px-6 py-2.5 text-[15px] text-white transition-colors hover:bg-primary-dark"
          >
            Start Your Journey
          </MagneticButton>
        </div>

        <button
          className="grid h-10 w-10 place-items-center rounded-full text-ink lg:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <motion.div
        aria-hidden
        className="h-[2px] origin-left bg-accent"
        style={{ scaleX: progress }}
      />

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden bg-surface lg:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 pb-6">
              {links.map((l) => (
                <li key={l.label}>
                  <button
                    onClick={() => goTo(l.href)}
                    className="w-full py-3 text-left text-lg text-ink/85"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
              <li className="pt-2">
                <button
                  onClick={() => openEnquiry()}
                  className="w-full rounded-full bg-primary px-6 py-3 text-white"
                >
                  Start Your Journey
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
