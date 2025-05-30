import './App.css'
import ResponsiveHeader from './components/header/Header'
import HeroSection from './components/hero-section/HeroSection'
import CardGrid from './components/card-grid/CardGrid'
import Footer from './components/footer/Footer'
import { useTheme } from './theme/ThemeContext'
import OurJourney from './components/our-journey/OurJourney'
import Testimonials from './components/testimonials/Testimonials'
import OurTeam from './components/our-team/OurTeam'
import TeamMembers from './components/team-member/TeamMember'

function App() {
  const { theme } = useTheme() // Access the current theme
  return (
    <div className={`app ${theme}-theme`}>
      <ResponsiveHeader />
      <main>
        <HeroSection />
        <OurJourney />
        <CardGrid />
        <Testimonials />
        <OurTeam />
        <TeamMembers />
      </main>
      <Footer />
    </div>
  )
}

export default App
