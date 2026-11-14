import { useState } from 'react'
import { Save, FolderOpen, Plus, Trash2, Download, Upload, CheckCircle2, AlertCircle } from 'lucide-react'
import type { SoulEvent, EventCategory } from '../types'
import { useEvents } from '../context/EventsContext'

const categories: EventCategory[] = ['Fitness', 'Yoga', 'Meditation', 'Workshop', 'Wellness', 'Community', 'Challenge', 'Retreat']

const blankEvent = (): SoulEvent => ({
  id: `event-${Date.now()}`,
  title: 'New Event',
  category: 'Wellness',
  description: '',
  longDescription: '',
  image: '',
  date: new Date().toISOString().slice(0, 10),
  day: '',
  time: '',
  duration: '',
  location: '',
  host: '',
  capacity: 20,
  availableSeats: 20,
  price: 'free',
  status: 'upcoming',
  featured: false,
  registered: false,
  experience: [],
  bring: [],
  whoCanJoin: '',
  faqs: [],
})

// File System Access API — supported in Chrome/Edge, not in Firefox/Safari.
const supportsFileSystemAccess = typeof window !== 'undefined' && 'showOpenFilePicker' in window

export default function Admin() {
  const { refresh } = useEvents()
  const [list, setList] = useState<SoulEvent[] | null>(null)
  const [fileHandle, setFileHandle] = useState<FileSystemFileHandle | null>(null)
  const [status, setStatus] = useState<{ type: 'ok' | 'error'; text: string } | null>(null)
  const [openId, setOpenId] = useState<string | null>(null)

  const openFile = async () => {
    setStatus(null)
    try {
      // @ts-ignore — showOpenFilePicker isn't in the default TS lib yet
      const [handle] = await window.showOpenFilePicker({
        types: [{ description: 'JSON', accept: { 'application/json': ['.json'] } }],
      })
      const file = await handle.getFile()
      const text = await file.text()
      setList(JSON.parse(text))
      setFileHandle(handle)
      setStatus({ type: 'ok', text: `Loaded ${file.name}` })
    } catch (err: any) {
      if (err?.name !== 'AbortError') setStatus({ type: 'error', text: 'Could not open that file.' })
    }
  }

  const importFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    file.text().then((text) => {
      try {
        setList(JSON.parse(text))
        setFileHandle(null)
        setStatus({ type: 'ok', text: `Loaded ${file.name} — remember to download and replace the file when you save.` })
      } catch {
        setStatus({ type: 'error', text: 'That file was not valid JSON.' })
      }
    })
  }

  const save = async () => {
    if (!list) return
    const json = JSON.stringify(list, null, 2)
    try {
      if (fileHandle) {
        // @ts-ignore
        const writable = await fileHandle.createWritable()
        await writable.write(json)
        await writable.close()
        setStatus({ type: 'ok', text: 'Saved to events.json ✓' })
        refresh()
      } else {
        const blob = new Blob([json], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'events.json'
        a.click()
        URL.revokeObjectURL(url)
        setStatus({ type: 'ok', text: 'Downloaded events.json — replace public/data/events.json with this file.' })
      }
    } catch {
      setStatus({ type: 'error', text: 'Could not save. Try again.' })
    }
  }

  const update = (id: string, patch: Partial<SoulEvent>) => {
    setList((prev) => prev!.map((e) => (e.id === id ? { ...e, ...patch } : e)))
  }

  const updateList = (id: string, key: 'experience' | 'bring', value: string) => {
    update(id, { [key]: value.split('\n').filter(Boolean) } as Partial<SoulEvent>)
  }

  const remove = (id: string) => {
    if (!confirm('Delete this event?')) return
    setList((prev) => prev!.filter((e) => e.id !== id))
  }

  const addNew = () => {
    const ev = blankEvent()
    setList((prev) => [ev, ...(prev ?? [])])
    setOpenId(ev.id)
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-16 lg:px-10 lg:py-20">
      <h1 className="font-display text-4xl text-primary-dark sm:text-5xl">Events Admin</h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
        Add, edit, or remove events here — no code required. Changes are saved straight to{' '}
        <code className="rounded bg-surface px-1.5 py-0.5 text-[14px]">public/data/events.json</code>, the file the
        live site reads from.
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-3 rounded-3xl bg-surface p-5 ring-1 ring-line">
        {supportsFileSystemAccess ? (
          <button onClick={openFile} className="flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm text-white hover:bg-primary-dark">
            <FolderOpen size={16} /> Open events.json
          </button>
        ) : (
          <label className="flex cursor-pointer items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm text-white hover:bg-primary-dark">
            <Upload size={16} /> Import events.json
            <input type="file" accept="application/json" onChange={importFile} className="hidden" />
          </label>
        )}

        {list && (
          <>
            <button onClick={addNew} className="flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm text-ink/80 hover:border-primary/40">
              <Plus size={16} /> Add Event
            </button>
            <button onClick={save} className="flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm text-primary-dark hover:brightness-95">
              {fileHandle ? <Save size={16} /> : <Download size={16} />}
              {fileHandle ? 'Save changes' : 'Download events.json'}
            </button>
          </>
        )}

        {status && (
          <span className={`flex items-center gap-1.5 text-sm ${status.type === 'ok' ? 'text-primary' : 'text-red-600'}`}>
            {status.type === 'ok' ? <CheckCircle2 size={15} /> : <AlertCircle size={15} />}
            {status.text}
          </span>
        )}
      </div>

      {!supportsFileSystemAccess && (
        <p className="mt-3 text-sm text-muted">
          Your browser doesn't support direct file editing — this works best in Chrome or Edge. Here, import the
          file, make your changes, then download the result and replace <code>public/data/events.json</code> with it.
        </p>
      )}

      {!list && (
        <p className="mt-10 text-muted">
          {supportsFileSystemAccess ? 'Open' : 'Import'} <code>public/data/events.json</code> from your project folder to start editing.
        </p>
      )}

      {list && (
        <div className="mt-10 space-y-4">
          {list.map((ev) => (
            <div key={ev.id} className="overflow-hidden rounded-3xl bg-surface ring-1 ring-line">
              <button
                onClick={() => setOpenId(openId === ev.id ? null : ev.id)}
                className="flex w-full items-center justify-between gap-4 p-5 text-left"
              >
                <div>
                  <p className="font-display text-xl text-primary-dark">{ev.title || 'Untitled event'}</p>
                  <p className="text-sm text-muted">{ev.category} · {ev.date} · {ev.status}</p>
                </div>
                <span className="text-sm text-primary">{openId === ev.id ? 'Close' : 'Edit'}</span>
              </button>

              {openId === ev.id && (
                <div className="grid grid-cols-1 gap-4 border-t border-line p-6 sm:grid-cols-2">
                  <LabeledInput label="Title" value={ev.title} onChange={(v) => update(ev.id, { title: v })} />
                  <LabeledSelect label="Category" value={ev.category} options={categories} onChange={(v) => update(ev.id, { category: v as EventCategory })} />
                  <LabeledInput label="Short description" value={ev.description} onChange={(v) => update(ev.id, { description: v })} full />
                  <LabeledTextarea label="Long description" value={ev.longDescription} onChange={(v) => update(ev.id, { longDescription: v })} full />
                  <LabeledInput label="Image URL" value={ev.image} onChange={(v) => update(ev.id, { image: v })} full />
                  <LabeledInput label="Date (YYYY-MM-DD)" value={ev.date} onChange={(v) => update(ev.id, { date: v })} />
                  <LabeledInput label="Day" value={ev.day} onChange={(v) => update(ev.id, { day: v })} />
                  <LabeledInput label="Time" value={ev.time} onChange={(v) => update(ev.id, { time: v })} />
                  <LabeledInput label="Duration" value={ev.duration} onChange={(v) => update(ev.id, { duration: v })} />
                  <LabeledInput label="Location" value={ev.location} onChange={(v) => update(ev.id, { location: v })} />
                  <LabeledInput label="Host" value={ev.host} onChange={(v) => update(ev.id, { host: v })} />
                  <LabeledInput
                    label="Capacity"
                    type="number"
                    value={String(ev.capacity)}
                    onChange={(v) => update(ev.id, { capacity: Number(v) || 0 })}
                  />
                  <LabeledInput
                    label="Available seats"
                    type="number"
                    value={String(ev.availableSeats)}
                    onChange={(v) => update(ev.id, { availableSeats: Number(v) || 0 })}
                  />
                  <LabeledInput
                    label="Price ('free' or a number)"
                    value={String(ev.price)}
                    onChange={(v) => update(ev.id, { price: v.toLowerCase() === 'free' ? 'free' : Number(v) || 0 })}
                  />
                  <LabeledSelect
                    label="Status"
                    value={ev.status}
                    options={['upcoming', 'past']}
                    onChange={(v) => update(ev.id, { status: v as SoulEvent['status'] })}
                  />
                  <LabeledTextarea
                    label="What you'll experience (one per line)"
                    value={ev.experience.join('\n')}
                    onChange={(v) => updateList(ev.id, 'experience', v)}
                    full
                  />
                  <LabeledTextarea
                    label="What to bring (one per line)"
                    value={ev.bring.join('\n')}
                    onChange={(v) => updateList(ev.id, 'bring', v)}
                    full
                  />
                  <LabeledInput label="Who can join" value={ev.whoCanJoin} onChange={(v) => update(ev.id, { whoCanJoin: v })} full />

                  <div className="col-span-full flex items-center gap-6">
                    <label className="flex items-center gap-2 text-sm text-ink/75">
                      <input type="checkbox" checked={ev.featured} onChange={(e) => update(ev.id, { featured: e.target.checked })} />
                      Featured
                    </label>
                    <label className="flex items-center gap-2 text-sm text-ink/75">
                      <input type="checkbox" checked={ev.registered} onChange={(e) => update(ev.id, { registered: e.target.checked })} />
                      Mark as registered (demo dashboard)
                    </label>
                  </div>

                  <div className="col-span-full flex justify-end">
                    <button onClick={() => remove(ev.id)} className="flex items-center gap-1.5 text-sm text-red-600 hover:text-red-700">
                      <Trash2 size={15} /> Delete event
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function LabeledInput({
  label,
  value,
  onChange,
  full,
  type = 'text',
}: {
  label: string
  value: string
  onChange: (v: string) => void
  full?: boolean
  type?: string
}) {
  return (
    <div className={full ? 'sm:col-span-2' : ''}>
      <label className="mb-1.5 block text-sm text-ink/70">{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className="input" />
    </div>
  )
}

function LabeledTextarea({
  label,
  value,
  onChange,
  full,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  full?: boolean
}) {
  return (
    <div className={full ? 'sm:col-span-2' : ''}>
      <label className="mb-1.5 block text-sm text-ink/70">{label}</label>
      <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={3} className="input resize-none" />
    </div>
  )
}

function LabeledSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: string
  options: string[]
  onChange: (v: string) => void
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm text-ink/70">{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="input">
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  )
}
