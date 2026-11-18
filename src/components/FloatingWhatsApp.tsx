import { useState } from 'react'
import { X } from 'lucide-react'
import WhatsAppIcon from './WhatsAppIcon'
import { COMMUNITY_URL } from '../lib/config'

export default function FloatingWhatsApp() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button onClick={() => setOpen(true)} aria-label="Join the Soulaura community on WhatsApp"
        className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105">
        <WhatsAppIcon size={30} />
      </button>
      {open && (
        <div className="fixed inset-0 z-[70] grid place-items-center bg-[rgba(16,28,32,0.6)] p-4" onClick={() => setOpen(false)}>
          <div role="dialog" aria-modal="true" aria-labelledby="wa-t" onClick={(e) => e.stopPropagation()} className="relative w-full max-w-md rounded-3xl bg-bg p-7 text-center">
            <button aria-label="Close" onClick={() => setOpen(false)} className="absolute right-3 top-3 grid h-11 w-11 place-items-center rounded-full hover:bg-[rgba(23,38,43,0.1)]"><X /></button>
            <WhatsAppIcon className="mx-auto text-[#25D366]" size={44} />
            <h2 id="wa-t" className="mt-3 font-display text-3xl">Join the Soulaura Community</h2>
            <p className="mt-2 text-muted">Connect with people interested in fitness, wellness, and mindful living.</p>
            <a className="btn mt-6 w-full" href={COMMUNITY_URL} target="_blank" rel="noreferrer">JOIN WHATSAPP GROUP</a>
          </div>
        </div>
      )}
    </>
  )
}
