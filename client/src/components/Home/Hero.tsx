

import { useState, useEffect } from 'react';

import { Code2 } from 'lucide-react';

import { Link } from 'react-router-dom';

import { stacks } from '../../assets/assets';

import { heroAPI } from '../../config/apiService';





const Hero = () => {

    const [heroData, setHeroData] = useState({

        badgeText: "Software Developer & Photographer",

        heading: "I build thoughtful software<br />people trust.",

        subheading: "I create thoughtful software and striking images, blending technical precision with a creative eye.",

        image: "",

        primaryButtonText: "View My Work",

        primaryButtonLink: "/projects",

        secondaryButtonText: "Download Resume",

        secondaryButtonLink: "#",

        resumeUrl: "",

        footerText: "Code, cameras, and a curiosity for better ideas",

    });

    const [isLoading, setIsLoading] = useState(true);



    useEffect(() => {

        const fetchHero = async () => {

            try {

                const data = await heroAPI.getHero();

                setHeroData(data);

            } catch (err) {

                console.error("Failed to fetch hero data:", err);

            } finally {

                setIsLoading(false);

            }

        };

        fetchHero();

    }, []);



    if (isLoading) {

        return (

            <main className="w-full bg-black flex-1">

                <div className="w-full px-4 md:px-24 lg:px-32 xl:px-40 mx-auto h-full">

                    <div className="w-full h-full min-h-[calc(100vh-80px)] flex items-center justify-center border-x border-dashed border-neutral-800">

                        <div className="inline-block w-8 h-8 border-2 border-orange-700 border-t-transparent rounded-full animate-spin"></div>

                    </div>

                </div>

            </main>

        );

    }



    return (

        <>

            {/* <main className="w-full bg-linear-to-br from-white via-orange-50 to-slate-200 flex-1"> */}

            <main className="w-full bg-black flex-1">

                <div className="w-full px-4 md:px-24 lg:px-32 xl:px-40 mx-auto h-full">

                    <div className="w-full h-full min-h-[calc(100vh-80px)] flex flex-col items-center border-x border-dashed border-neutral-800 relative">

                        {/* <div className="w-full h-full min-h-[calc(100vh-80px)] flex flex-col items-center border-x border-dashed border-neutral-800 relative"> */}



                        <div className="flex flex-wrap items-center justify-center gap-2 pl-2.5 pr-4 py-2 mt-32 rounded-lg border border-neutral-800">

                            <div className="relative flex size-3.5 items-center justify-center">

                                <span className="absolute inline-flex h-full w-full rounded-full bg-orange-700 opacity-75 animate-ping duration-300"></span>

                                <span className="relative inline-flex size-2 rounded-full bg-orange-700"></span>

                            </div>

                            <p className="text-sm text-white">{heroData.badgeText}</p>

                        </div>



                        <h1 className="text-4xl sm:text-5xl lg:text-6xl/19 text-center font-medium text-white max-w-[770px] mt-3 mx-auto max-sm:px-4" dangerouslySetInnerHTML={{ __html: heroData.heading }}>

                        </h1>

                        <p className="text-sm/5.5 text-center max-w-[510px] mt-2.5 mx-auto max-sm:px-4 text-neutral-300">

                            {heroData.subheading}

                        </p>



                        <div className='flex flex-col sm:flex-row gap-4 sm:gap-5 mt-8 sm:mt-11 w-full sm:w-auto px-4 sm:px-0'>

                            <Link to={heroData.primaryButtonLink} className="flex items-center justify-center gap-1 bg-orange-700 hover:bg-orange-700 px-5 text-sm py-2.5 text-white rounded-lg cursor-pointer">

                                {heroData.primaryButtonText}

                            </Link>

                            {heroData.resumeUrl ? (

                                <a

                                    href={heroData.resumeUrl}

                                    download="resume.pdf"

                                    className="flex items-center justify-center gap-1 border border-orange-700 hover:bg-orange-700 px-5 text-sm py-2.5 text-white rounded-lg cursor-pointer"

                                >

                                    {heroData.secondaryButtonText}

                                </a>

                            ) : (

                                <a

                                    href={heroData.secondaryButtonLink}

                                    className="flex items-center justify-center gap-1 border border-orange-700 hover:bg-orange-700 px-5 text-sm py-2.5 text-white rounded-lg cursor-pointer"

                                >

                                    {heroData.secondaryButtonText}

                                </a>

                            )}

                        </div>



                        <div className='flex items-center gap-2.5 px-6 mt-9'>

                            <Code2 className="size-7 text-orange-700" aria-hidden="true" />

                            <p className='text-sm text-white'>{heroData.footerText}</p>

                            <Code2 className="size-7 text-orange-700" aria-hidden="true" />

                        </div>



                        <div className='relative border-t border-dashed border-neutral-800 w-full mt-9'>

                            {/* <IntersectionDot className="left-0 top-0" />

                            <IntersectionDot className="left-full top-0" /> */}

                        </div>



                        <div className="w-full overflow-hidden max-w-4xl mt-16 sm:mt-19 mb-8 sm:mb-10">

                            <div className="marquee-inner flex items-center w-max">



                                {stacks.map((cat) => (

                                    <span key={cat.id} className="mx-4 sm:mx-8 md:mx-14 shrink-0">

                                        <img

                                            src={cat.image}

                                            alt={cat.id}

                                            width={120}

                                            height={29}

                                            className=" h-auto object-contain"

                                        />

                                    </span>

                                ))}

                            </div>

                        </div>

                    </div>

                </div>

            </main>

        </>

    )

}



export default Hero

