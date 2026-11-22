import { MotionConfig } from 'motion/react'
import { LanguageProvider } from './i18n/LanguageContext'
import { projects } from './data/projects'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Stats from './components/Stats'
import Experience from './components/Experience'
import Education from './components/Education'
import FeaturedProjects from './components/FeaturedProjects'
import Services from './components/Services'
import TechStack from './components/TechStack'
import Footer from './components/Footer'
import ScrollProgress from './components/ui/ScrollProgress'
import Preloader from './components/ui/Preloader'
import AndromedaBackground from './components/AndromedaBackground'

function App() {
  return (
    <LanguageProvider>
      {/* reducedMotion="user" disables transform animations when the OS asks for reduced motion */}
      <MotionConfig reducedMotion="user">
        <Preloader />
        <AndromedaBackground />
        <div className="relative z-10 min-h-screen text-text-primary">
          <ScrollProgress />
          <Navbar />
          <main>
            <Hero />
            <About />
            <Stats />
            <Experience />
            <Education />
            <FeaturedProjects projects={projects} />
            <Services />
            <TechStack />
          </main>
          <Footer />
        </div>
      </MotionConfig>
    </LanguageProvider>
  )
}

export default App
