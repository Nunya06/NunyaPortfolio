import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { projectsAPI } from "../config/apiService"
import type { Project } from "../types"


const Projects = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const stripHtml = (html: string) => {
        const tmp = document.createElement('div');
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || '';
    };

    // Fetch projects from database
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const data = await projectsAPI.getAllProjects();
                setProjects(data);
            } catch (err) {
                console.error("Failed to fetch projects:", err);
                setError("Failed to load projects");
            } finally {
                setIsLoading(false);
            }
        };

        fetchProjects();
    }, []);

    // Get unique categories
    const categories = ["All", ...Array.from(new Set(projects.map(p => p.category)))];

    // Filter projects based on selected category
    const filteredProjects = selectedCategory === "All"
        ? projects
        : projects.filter(project => project.category === selectedCategory);


    return (
        <div className="min-h-screen bg-black">
            <div className="bg-black py-16 px-4 flex flex-col items-center">
                <div className="flex flex-col items-center text-center mb-14 space-y-4">
                    <span className="border border-zinc-800 rounded-full px-5 py-1 text-sm text-orange-700">
                        Projects
                    </span>
                    <h1 className="text-[40px] font-medium text-white leading-tight">
                        Featured work & creative projects
                    </h1>
                    <p className="text-sm text-white max-w-[540px] leading-relaxed">
                        Explore a collection of my recent projects showcasing web development, design, and photography work built with modern technologies.
                    </p>
                </div>

                {/* Category Filter */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === category
                                ? "bg-orange-700 text-white"
                                : "bg-neutral-800 text-slate-300 hover:bg-neutral-700"
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Loading State */}
                {isLoading && (
                    <div className="text-center py-12">
                        <div className="inline-block w-8 h-8 border-2 border-orange-700 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-slate-400 mt-4">Loading projects...</p>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="text-center py-12">
                        <p className="text-red-400 text-lg">{error}</p>
                    </div>
                )}

                {/* Projects Grid */}
                {!isLoading && !error && (
                    <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7.5">
                        {filteredProjects.map((project) => (
                            <Link key={project.id} to={`/project/${project.id}`} className="border border-zinc-800 rounded-2xl flex flex-col group overflow-hidden transition duration-300 hover:-translate-y-1 hover:border-zinc-700">
                                <img src={project.images[0]} alt={project.title} className="w-full h-64 object-cover rounded-t-2xl rounded-b-none" />
                                <div className="p-6 flex flex-col flex-1">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="text-xs text-orange-700 font-medium">{project.category}</span>
                                    </div>
                                    <h3 className="text-lg font-semibold text-white mb-2">
                                        {project.title}
                                    </h3>
                                    <p className="text-sm text-slate-400 mb-4 flex-1">
                                        {stripHtml(project.description).length > 50
                                            ? `${stripHtml(project.description).substring(0, 50)}...`
                                            : stripHtml(project.description)}
                                    </p>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.technologies.map((tech, index) => (
                                            <span key={index} className="text-xs bg-neutral-800 text-slate-300 px-2 py-1 rounded-full">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                    <div>
                                        <span className="border border-neutral-800 rounded-full px-5 py-2 text-xs text-white hover:bg-neutral-900 transition-colors cursor-pointer group-hover:border-zinc-700 inline-block text-center">
                                            View Project
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

                {filteredProjects.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-slate-400 text-lg">No projects found in this category.</p>
                    </div>
                )}

                {/* <div className="mt-14">
                    <button className="border border-neutral-800 rounded-full px-6 py-2.5 text-sm text-slate-50 hover:bg-neutral-900 transition-colors cursor-pointer">
                        Explore more
                    </button>
                </div> */}
            </div>
        </div>
    )
}

export default Projects
