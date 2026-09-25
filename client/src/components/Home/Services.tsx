import { useState, useEffect } from "react";
import { servicesAPI } from "../../config/apiService";
import type { Service } from "../../types";


const Services = () => {
    const [services, setServices] = useState<Service[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const data = await servicesAPI.getAllServices();
                setServices(data);
            } catch (err) {
                console.error("Failed to fetch services:", err);
                setError("Failed to load services");
            } finally {
                setIsLoading(false);
            }
        };

        fetchServices();
    }, []);


    return (
        <section className="w-full bg-black border-t border-dashed border-neutral-800 px-4 sm:px-8 py-16 md:px-16 lg:px-32">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-medium text-white mb-4">What I Do</h1>
                    <p className="text-sm md:text-base text-slate-400 max-w-2xl mx-auto">
                        Thoughtful digital products and photographs created with clarity, purpose, and a creative eye.
                    </p>
                </div>

                {/* Loading State */}
                {isLoading && (
                    <div className="text-center py-12">
                        <div className="inline-block w-8 h-8 border-2 border-orange-700 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-slate-400 mt-4">Loading services...</p>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="text-center py-12">
                        <p className="text-red-400 text-lg">{error}</p>
                    </div>
                )}

                {/* Services Grid */}
                {!isLoading && !error && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {services.map((service) => (
                            <div
                                key={service.id}
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
                                    <div className="text-sm text-slate-400 leading-relaxed prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: service.description }}>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {services.length === 0 && !isLoading && !error && (
                    <div className="text-center py-12">
                        <p className="text-slate-400 text-lg">No services available.</p>
                    </div>
                )}
            </div>
        </section>
    );
}

export default Services
