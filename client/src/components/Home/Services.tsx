import { services } from "../../assets/assets";


const Services = () => {
    

    return (
        <section className="w-full bg-black border-t border-dashed border-neutral-800 px-4 sm:px-8 py-16 md:px-16 lg:px-32">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-medium text-white mb-4">What I Do</h1>
                    <p className="text-sm md:text-base text-slate-400 max-w-2xl mx-auto">
                        Thoughtful digital products and photographs created with clarity, purpose, and a creative eye.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="group relative overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/50 hover:border-orange-700/50 transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={service.image}
                                    alt={service.title}
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                            </div>

                            <div className="p-6">
                                
                                <h3 className="text-md font-semibold text-white mb-2 group-hover:text-orange-700 transition-colors">
                                    {service.title}
                                </h3>
                                <p className="text-sm text-slate-400 leading-relaxed">
                                    {service.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Services
