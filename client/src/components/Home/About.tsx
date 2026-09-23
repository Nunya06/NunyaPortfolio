// import { Aperture, Code2, Users } from 'lucide-react'
import { useState } from 'react'
import { assets } from '../../assets/assets';
import { ArrowDown } from 'lucide-react';

const About = () => {

    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const aboutFaqs = [
        {
            question: "What technologies do you work with?",
            answer: "I specialize in React, Next.js, TypeScript, Node.js, and modern CSS frameworks like Tailwind. I'm also experienced with design tools like Figma and Adobe Creative Suite.",
        },
        {
            question: "Do you handle both development and design?",
            answer: "Yes! I offer end-to-end solutions from concept to deployment. Whether you need a complete website built from scratch or design improvements for an existing project, I can help.",
        },
        {
            question: "What's your approach to projects?",
            answer: "I believe in clean, maintainable code and thoughtful design. Every project starts with understanding your goals, followed by strategic planning, iterative development, and thorough testing.",
        },
        {
            question: "Can you help with photography too?",
            answer: "Absolutely. Photography is a passion of mine, and I offer professional photography services including portraits, events, and product photography that complement my design work.",
        },
    ];

    return (
        <section className="w-full bg-black border-t border-dashed border-neutral-800 px-8 py-10 md:px-16 lg:px-32">
            <div className="mx-auto max-w-5xl">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-700">About Me</p>
                <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-white md:text-5xl">
                    Building digital experiences, capturing moments.
                </h2>
                <p className="mt-5 max-w-2xl text-sm leading-6 text-slate-300 md:text-base">
                    I'm a software developer and photographer passionate about creating meaningful digital experiences and capturing authentic moments. With expertise in web development, UI/UX design, and photography, I bring a unique perspective to every project.
                </p>

                <div className="w-full mx-auto flex flex-col md:flex-row items-start justify-center gap-8 px-4 md:px-0 mt-16">
                    <div className="w-full md:w-1/2">
                        <p className="text-orange-600 text-sm font-medium">Frequently Asked Questions</p>
                        <h1 className="text-white text-2xl md:text-3xl font-semibold">Common questions</h1>
                        <p className="text-sm text-slate-500 mt-2 pb-4">
                            Here are answers to some common questions about my work and process.
                        </p>
                        {aboutFaqs.map((faq, index) => (
                            <div className="border-b border-neutral-800 py-4 cursor-pointer" key={index} onClick={() => setOpenIndex(openIndex === index ? null : index)}>
                                <div className="flex items-center justify-between">
                                    <h3 className="text-white font-medium text-sm md:text-base">
                                        {faq.question}
                                    </h3>
                                    <ArrowDown className={`${openIndex === index ? "rotate-180" : ""} transition-all size-4 text-white duration-500 ease-in-out shrink-0`} aria-hidden="true" />
                                </div>
                                <p className={`text-sm text-slate-400 transition-all duration-500 ease-in-out max-w-full md:max-w-md ${openIndex === index ? "opacity-100 max-h-[300px] translate-y-0 pt-4" : "opacity-0 max-h-0 -translate-y-2"}`} >
                                    {faq.answer}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="w-full md:w-auto flex justify-center md:justify-start">
                        <img
                            className="max-w-sm w-full rounded-xl h-auto border border-neutral-800"
                            src={assets.profile}
                            alt="Profile"
                        />
                    </div>

                </div>

            </div>
        </section>
    )
}

export default About
