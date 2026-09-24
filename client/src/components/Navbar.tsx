import { useState } from 'react'
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';

const Navbar = () => {

    const [mobileOpen, setMobileOpen] = useState(false);


    return (
        <header className="w-full bg-black border-b border-dashed border-neutral-800  sticky top-0 z-50">
            <div className="px-4 md:px-24 lg:px-32 xl:px-40 w-full mx-auto">
                <nav className="relative flex items-center justify-between border-x border-dashed border-neutral-800 p-3 sm:p-4 md:py-4 md:px-6 w-full">



                    <Link to="/" className="flex items-center gap-2 text-[18px] sm:text-[22px] font-medium shrink-0">
                        <img src={assets.logo} alt="NexiCart Logo" className='h-16 sm:h-20 md:h-24 w-auto' width={205} height={48} />
                    </Link>

                    <div id="menu" className={`${mobileOpen ? 'max-md:w-full' : 'max-md:w-0'} max-md:fixed max-md:top-0 max-md:z-50 max-md:left-0 max-md:transition-all max-md:duration-300 max-md:overflow-hidden max-md:h-screen max-md:bg-black/50 max-md:backdrop-blur max-md:flex-col max-md:justify-center flex items-center gap-6 sm:gap-9 text-sm`}>
                        <Link to='/' onClick={() => setMobileOpen(false)} className="text-white hover:text-white/90 text-base sm:text-sm">Home</Link>
                        <Link to='/about-me' onClick={() => setMobileOpen(false)} className="text-white hover:text-white/90 text-base sm:text-sm">About</Link>
                        <Link to='/projects' onClick={() => setMobileOpen(false)} className="text-white hover:text-white/90 text-base sm:text-sm">Projects</Link>
                        <Link to='/contact' onClick={() => setMobileOpen(false)} className="text-white hover:text-white/90 text-base sm:text-sm">Contact</Link>

                        <button id="close-menu" onClick={() => setMobileOpen(false)} className="md:hidden bg-neutral-900 hover:bg-neutral-800 text-white p-2 rounded-md aspect-square font-medium transition z-50">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 6 6 18" /><path d="m6 6 12 12" />
                            </svg>
                        </button>
                    </div>
                    {/* <button className="hidden md:flex bg-neutral-800 hover:bg-neutral-700 px-4 sm:px-6 py-2.5 rounded-lg text-sm text-white transition cursor-pointer group">
                        Hire Me
                    </button> */}
                    <button id="open-menu" onClick={() => setMobileOpen(true)} className="md:hidden bg-neutral-900 hover:bg-neutral-800 text-white p-2 rounded-md aspect-square font-medium transition cursor-pointer z-50 relative">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 12h16" /><path d="M4 18h16" /><path d="M4 6h16" />
                        </svg>
                    </button>
                </nav>
            </div>
        </header>
    )
}

export default Navbar
