import { motion } from 'framer-motion'
import { useEnquiry } from '../ctx'

// Draft copy. Edit the text and specialist tags here.
const offers = [
  { title: '1:1 Sessions', by: 'Psychologist · Trainer · Nutritionist · Yoga instructor', text: 'Private sessions with the specialist you choose, built around your goals and schedule.' },
  { title: 'Digital Guides', by: 'Nutritionist · Trainer', text: 'Self-paced guides you can follow at home, with clear routines and habits to start with.' },
  { title: 'Group Workshops', by: 'Psychologist · Yoga instructor', text: 'Small-group sessions to learn, practise and reflect together.' },
  { title: 'Collaborations', by: 'Across specialists', text: 'Partnerships with studios, workplaces and communities to bring Soulaura to your people.' },
  { title: 'Group Yoga Class', by: 'Yoga instructor', text: 'A guided class for all levels, with basic asanas, breath and relaxation.' },
  { title: 'Online Yoga', by: 'Yoga instructor', text: 'Basic yoga and poses taught live online, so you can practise from home.' },
]

export default function Offers() {
  const { open } = useEnquiry()
  return (
    <section id="offers" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <p className="mb-4 flex items-center gap-3 text-sm uppercase tracking-[0.25em] text-secondary">
          <span className="h-px w-8 bg-secondary" /> More ways to work with us
        </p>
        <h2 className="font-display text-5xl leading-[1.02] text-primary-dark sm:text-6xl">
          Our <span className="italic text-secondary">offers</span>
        </h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {offers.map((o, i) => (
            <motion.article
              key={o.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              className="flex flex-col rounded-4xl bg-surface p-7 shadow-sm ring-1 ring-line"
            >
              <span className="self-start rounded-full bg-dawn px-3 py-1 text-xs text-primary-dark">{o.by}</span>
              <h3 className="mt-4 font-display text-3xl text-primary-dark">{o.title}</h3>
              <p className="mt-2 flex-1 text-muted">{o.text}</p>
              <button onClick={() => open(o.title)} className="btn-o mt-6 self-start">Enquire</button>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
