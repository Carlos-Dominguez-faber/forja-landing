import { Navbar } from '@/features/landing/components/navbar'
import { Hero } from '@/features/landing/components/hero'
import { ScrollStops } from '@/features/landing/components/scroll-stops'
import { About } from '@/features/landing/components/about'
import { Services } from '@/features/landing/components/services'
import { Portfolio } from '@/features/landing/components/portfolio'
import { Process } from '@/features/landing/components/process'
import { LeadMagnet } from '@/features/landing/components/lead-magnet'
import { ImperioDigital } from '@/features/landing/components/imperio'
import { CtaFinal } from '@/features/landing/components/cta-final'
import { Footer } from '@/features/landing/components/footer'

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-clip">
      <Navbar />
      <Hero />
      <ScrollStops />
      <About />
      <Services />
      <Portfolio />
      <Process />
      <LeadMagnet />
      <ImperioDigital />
      <CtaFinal />
      <Footer />
    </main>
  )
}
