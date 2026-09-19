import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const AppLayout = () => {
  return (
    <>
    <Navbar/>
      <main className="min-h-screen" >
        <Outlet />
      </main>
      <Footer/>
    </>
  )
}

export default AppLayout
