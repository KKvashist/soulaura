import Hero from '../components/Hero'
import Marquee from '../components/Marquee'
import ResetProgram from '../components/ResetProgram'
import Offers from '../components/Offers'
import Philosophy from '../components/Philosophy'
import Programs from '../components/Programs'
import WellnessJourney from '../components/WellnessJourney'
import DailySoulAura from '../components/DailySoulAura'
import EventsPreview from '../components/EventsPreview'
import PastEvents from '../components/PastEvents'
import DashboardPreview from '../components/DashboardPreview'
import Mindfulness from '../components/Mindfulness'
import ProgressSection from '../components/Progress'
import Testimonials from '../components/Testimonials'
import Membership from '../components/Membership'
import About from '../components/About'
import FinalCTA from '../components/FinalCTA'

const brandWords = ['Strength', 'Balance', 'Recovery', 'Mindfulness', 'Community', 'Movement']

export default function Home() {
  return (
    <>
      <Hero />
      <div className="border-y border-line bg-surface/60 py-5">
        <Marquee items={brandWords} textClassName="text-primary-dark/70" />
      </div>
      <ResetProgram />
      <Philosophy />
      <Programs />
      <Offers />
      <WellnessJourney />
      <DailySoulAura />
      <EventsPreview />
      <PastEvents />
      <DashboardPreview />
      <Mindfulness />
      <ProgressSection />
      <Testimonials />
      <Membership />
      <About />
      <FinalCTA />
    </>
  )
}
