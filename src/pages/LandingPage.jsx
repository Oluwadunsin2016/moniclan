import { Footer } from "../components/shared/Footer"
import Hero from "../components/shared/Hero"
import NoAuthNavbar from "../components/shared/NoAuthNavBar"
import Sections from "../components/shared/Sections"


const LandingPage = () => {
  return (
    <div className="mx-auto border-4 border-sky-50 ">
    <div className="mb-20">
      <NoAuthNavbar />
    </div>
    <Hero />
    <Sections />
    <Footer />
  </div>
  )
}

export default LandingPage