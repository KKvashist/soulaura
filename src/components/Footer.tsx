import { useEnquiry } from '../ctx'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Instagram, Youtube, Linkedin } from 'lucide-react'
import { postToSheet, SCRIPT_URL, COMMUNITY_URL } from '../lib/config'

const nav = ['Home', 'Programs', 'Exercises', 'Mindfulness', 'Events', 'Progress', 'About', 'Contact']

export default function Footer() {
  const { open } = useEnquiry()
  const [status, setStatus] = useState<'idle' | 'loading' | 'fail'>('idle')
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <Link to="/" aria-label="Soulaura — home" className="inline-flex items-center">
              <img
                src="/assets/soulaura-logo.png"
                alt="Soulaura"
                width={900}
                height={457}
                className="h-14 w-auto"
              />
            </Link>
            <p className="mt-3 text-muted">Strength begins within</p>
            <div className="mt-4 flex flex-wrap gap-4 text-[15px]">
              <button onClick={() => open()} className="text-primary underline">Send an enquiry</button>
              <a href={COMMUNITY_URL} target="_blank" rel="noreferrer" className="text-primary underline">Join the WhatsApp community</a>
            </div>
            <div className="mt-6 flex gap-3">
              {[Instagram, Youtube, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="grid h-10 w-10 place-items-center rounded-full bg-bg text-primary-dark transition-colors hover:bg-primary hover:text-white"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          <nav>
            <p className="text-sm font-medium text-ink/60">Explore</p>
            <ul className="mt-4 space-y-2.5">
              {nav.map((n) => (
                <li key={n}>
                  <a href="#" className="text-[15px] text-ink/75 hover:text-primary">{n}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-sm font-medium text-ink/60">Stay in rhythm</p>
            <p className="mt-4 text-[15px] text-ink/75">Occasional notes on events, programs, and practice.</p>
            {subscribed ? (
              <p className="mt-4 text-[15px] text-primary">You're subscribed — welcome in.</p>
            ) : (
              <form
                onSubmit={async (e) => {
                  e.preventDefault()
                  setStatus('loading')
                  try { await postToSheet({ type: 'newsletter', email }); setSubscribed(true) } catch { setStatus('fail') }
                }}
                className="mt-4 flex gap-2"
              >
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="w-full rounded-full border border-line bg-bg px-4 py-2.5 text-sm placeholder:text-muted focus:border-primary"
                />
                <button disabled={status === 'loading' || !SCRIPT_URL} className="shrink-0 rounded-full bg-primary px-5 py-2.5 text-sm text-white hover:bg-primary-dark disabled:opacity-50">
                  Join
                </button>
              </form>
            )}
            {!SCRIPT_URL && <p className="mt-2 text-xs text-muted">Sign-up is not connected yet.</p>}
            {status === 'fail' && !subscribed && <p className="mt-2 text-xs text-red-700">Could not subscribe. Check your email and try again.</p>}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 text-sm text-muted sm:flex-row">
          <p>© {new Date().getFullYear()} SoulAura. All rights reserved.</p>
          <p className="flex items-center gap-4">
            Built with care, for calmer, stronger days.
            <Link to="/admin" className="text-ink/40 hover:text-primary">Site Admin</Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
