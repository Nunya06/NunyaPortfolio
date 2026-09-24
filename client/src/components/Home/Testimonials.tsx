

import { useState, useEffect } from "react";

import { testimonialsAPI } from "../../config/apiService";

import type { Testimonial } from "../../types";



const Testimonials = () => {

    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

    const [isLoading, setIsLoading] = useState(true);

    const [error, setError] = useState<string | null>(null);



    useEffect(() => {

        const fetchTestimonials = async () => {

            try {

                const data = await testimonialsAPI.getAllTestimonials();

                setTestimonials(data);

            } catch (err) {

                console.error("Failed to fetch testimonials:", err);

                setError("Failed to load testimonials");

            } finally {

                setIsLoading(false);

            }

        };



        fetchTestimonials();

    }, []);





    const rows = [

        { start: 0, end: 3, className: "animate-scroll" },

        // { start: 3, end: 6, className: "animate-scroll-reverse" }

    ];



    const renderCard = (testimonial: Testimonial, index: number) => (

        <div key={index} className="bg-neutral-900 border border-neutral-800 hover:border-neutral-700 rounded-xl p-6 shrink-0 w-[350px]">

            <div className="flex mb-4">

                {Array(5).fill(0).map((_, i) => (

                    <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star text-orange-700" aria-hidden="true"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path></svg>

                ))}

            </div>

            <p className="text-slate-300 text-sm mb-6">{testimonial.message}</p>

            <div className="flex items-center gap-3">

                <img src={testimonial.image} alt={testimonial.name} className="w-11 h-11 rounded-full object-cover" />

                <div>

                    <p className="font-medium text-white text-sm">{testimonial.name}</p>

                    <p className="text-slate-400 text-sm">{testimonial.role}</p>

                </div>

            </div>

        </div>

    );



    return (

        <>

            <section className="bg-black border-t border-dashed border-neutral-800 py-16 px-4">

                <div className="max-w-6xl mx-auto">



                    <div className="text-center mb-12">

                        <div className="flex flex-wrap items-center justify-center gap-2 pl-2.5 pr-4 py-2">

                            <div className="relative flex size-3.5 items-center justify-center">

                                <span className="absolute inline-flex h-full w-full rounded-full bg-orange-700 opacity-75 animate-ping duration-300"></span>

                                <span className="relative inline-flex size-2 rounded-full bg-orange-700"></span>

                            </div>

                            <p className="text-sm text-white">Testimonials</p>

                        </div>

                        <h2 className="text-4xl md:text-5xl font-medium text-white mb-4">

                            What clients say

                        </h2>

                        <p className="text-slate-400 text-sm max-w-2xl mx-auto">

                            Real feedback from clients I've worked with on web development, design, and photography projects.

                        </p>

                    </div>



                    {/* Loading State */}

                    {isLoading && (

                        <div className="text-center py-12">

                            <div className="inline-block w-8 h-8 border-2 border-orange-700 border-t-transparent rounded-full animate-spin"></div>

                            <p className="text-slate-400 mt-4">Loading testimonials...</p>

                        </div>

                    )}



                    {/* Error State */}

                    {error && (

                        <div className="text-center py-12">

                            <p className="text-red-400 text-lg">{error}</p>

                        </div>

                    )}



                    {/* Testimonials */}

                    {!isLoading && !error && (

                        <div className="space-y-6">

                            {rows.map((row, rowIndex) => (

                                <div key={rowIndex} className="relative overflow-hidden">

                                    <div className={`flex gap-6 ${row.className}`}>

                                        {testimonials.map((testimonial, index) =>

                                            renderCard(testimonial, index)

                                        )}

                                    </div>

                                </div>

                            ))}

                        </div>

                    )}



                    {testimonials.length === 0 && !isLoading && !error && (

                        <div className="text-center py-12">

                            <p className="text-slate-400 text-lg">No testimonials available.</p>

                        </div>

                    )}

                </div>

            </section>

        </>

    )

}



export default Testimonials

