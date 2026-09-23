import { useState } from 'react'
import { assets } from '../../assets/assets';


const Cta = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const faqs = [
        {
            question: "How to use this component?",
            answer: "To use this component, you need to import it in your project and use it in your JSX code. Here's an example of how to use it:",
        },
        {
            question: "Are there any other components available?",
            answer: "Yes, there are many other components available in this library. You can find them in the 'Components' section of the website.",
        },
        {
            question: "Are components responsive?",
            answer: "Yes, all components are responsive and can be used on different screen sizes.",
        },
        {
            question: "Can I customize the components?",
            answer: "Yes, you can customize the components by passing props to them. You can find more information about customizing components in the 'Customization' section of the website.",
        },
    ];
    return (
        <section className="w-full bg-black px-8 py-10 md:px-16 lg:px-32">

            <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-start justify-center gap-8 px-4 md:px-0">


                {/* <div className="text-center mb-8">
                    <div className="flex flex-wrap items-center justify-center gap-2 pl-2.5 pr-4 py-2 mt-10">
                        <div className="relative flex size-3.5 items-center justify-center">
                            <span className="absolute inline-flex h-full w-full rounded-full bg-orange-700 opacity-75 animate-ping duration-300"></span>
                            <span className="relative inline-flex size-2 rounded-full bg-orange-700"></span>
                        </div>
                        <p className="text-sm text-white">Software Developer & Photographer</p>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-medium text-white mb-4">
                        What people are saying
                    </h2>
                    <p className="text-neutral-600 text-sm max-w-96 mx-auto">
                        Real feedback from founders, developers and teams building production-ready products.
                    </p>
                </div> */}

                <div>
                    <p className="text-orange-600 text-sm font-medium">Why Choose Me</p>
                    <h1 className="text-white text-3xl font-semibold">Looking for answer?</h1>
                    <p className="text-sm text-slate-500 mt-2 pb-4">
                        Ship Beautiful Frontends Without the Overhead — Customizable, Scalable and Developer-Friendly UI Components.
                    </p>
                    {faqs.map((faq, index) => (
                        <div className="border-b border-slate-200 py-4 cursor-pointer" key={index} onClick={() => setOpenIndex(openIndex === index ? null : index)}>
                            <div className="flex items-center justify-between">
                                <h3 className="text-white font-medium">
                                    {faq.question}
                                </h3>
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${openIndex === index ? "rotate-180" : ""} transition-all duration-500 ease-in-out`}>
                                    <path d="m4.5 7.2 3.793 3.793a1 1 0 0 0 1.414 0L13.5 7.2" stroke="#1D293D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <p className={`text-sm text-slate-500 transition-all duration-500 ease-in-out max-w-md ${openIndex === index ? "opacity-100 max-h-[300px] translate-y-0 pt-4" : "opacity-0 max-h-0 -translate-y-2"}`} >
                                {faq.answer}
                            </p>
                        </div>
                    ))}
                </div>

                <img
                    className="max-w-sm w-full rounded-xl h-auto"
                    src={assets.profile}
                    alt=""
                />
            </div>
        </section>
    );
}

export default Cta
