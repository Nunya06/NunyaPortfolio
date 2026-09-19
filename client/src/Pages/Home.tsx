import About from '../components/Home/About'
// import Cta from '../components/Home/Cta'
import Hero from '../components/Home/Hero'
import Services from '../components/Home/Services'
import Testimonials from '../components/Home/Testimonials'


const Home = () => {
  return (
    <div className='bg-black'>
      <Hero />
      <About />
      {/* <Cta/> */}
      <Services />
      <Testimonials />
    </div>
  )
}

export default Home
