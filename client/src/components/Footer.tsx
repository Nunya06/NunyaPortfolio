
import { Link } from "react-router-dom"
import { assets } from '../assets/assets';

const Footer = () => {
    return (
        <section className="w-full bg-black  border-neutral-800 px-4 sm:px-8 py-6 md:px-16 lg:px-32">

            <footer className="flex flex-col items-center justify-center w-full py-12 sm:py-20 bg-black">
                <Link to="/" className="flex items-center gap-2 text-[18px] sm:text-[22px] font-medium shrink-0">
                    <img src={assets.logo} alt="NexiCart Logo" className='h-16 sm:h-20 md:h-24 w-auto' width={205} height={48} />
                </Link>
                {/* <div className="flex items-center gap-3 sm:gap-4 mt-5">
                    <a href="#" className="hover:-translate-y-0.5 transition-all duration-300">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="#">
                            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" stroke="#fff" strokeOpacity=".5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </a>
                </div> */}

                <p className="mt-4 text-center text-white text-sm sm:text-base">Copyright © 2026 <Link to='/'>Niche.Dev</Link>. All rights reservered.</p>

            </footer>
        </section>
    )
}

export default Footer
