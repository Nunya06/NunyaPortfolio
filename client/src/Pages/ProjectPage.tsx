import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { projectsAPI } from "../config/apiService";
import type { Project } from "../types";


const ProjectPage = () => {
    const { id } = useParams();
    const [project, setProject] = useState<Project | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedImage, setSelectedImage] = useState(0);

    useEffect(() => {
        const fetchProject = async () => {
            if (!id) return;
            try {
                const data = await projectsAPI.getProjectById(id);
                setProject(data);
            } catch (err) {
                console.error("Failed to fetch project:", err);
                setError("Failed to load project");
            } finally {
                setIsLoading(false);
            }
        };

        fetchProject();
    }, [id]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block w-8 h-8 border-2 border-orange-700 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-slate-400 mt-4">Loading project...</p>
                </div>
            </div>
        );
    }

    if (error || !project) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <p className="text-white text-xl">{error || "Project not found"}</p>
            </div>
        );
    }

    return (
        <div className="w-full bg-black min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-slate-400 mb-8">
                    <Link to="/" className="hover:text-white transition-colors">Home</Link>
                    <span>/</span>
                    <Link to="/projects" className="hover:text-white transition-colors">Projects</Link>
                    <span>/</span>
                    <span className="text-orange-700">{project.title}</span>
                </div>

                <div className="flex flex-col xl:flex-row gap-8 lg:gap-12">
                    {/* Image Gallery */}
                    <div className="w-full xl:w-1/2">
                        <div className="border border-neutral-800 rounded-2xl overflow-hidden bg-neutral-900/50">
                            <img
                                src={project.images[selectedImage]}
                                alt={`${project.title} - Image ${selectedImage + 1}`}
                                className="w-full h-auto object-cover min-h-[400px] lg:min-h-[500px]"
                            />
                        </div>

                        {/* Thumbnail Gallery */}
                        {project.images.length > 1 && (
                            <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
                                {project.images.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`flex-shrink-0 border rounded-lg overflow-hidden transition-all ${selectedImage === index
                                            ? 'border-orange-700 ring-2 ring-orange-700/50'
                                            : 'border-neutral-800 hover:border-neutral-700'
                                            }`}
                                    >
                                        <img
                                            src={image}
                                            alt={`Thumbnail ${index + 1}`}
                                            className="w-20 h-20 object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Project Details */}
                    <div className="w-full xl:w-1/2 flex flex-col">
                        <span className="inline-block border border-orange-700 text-orange-700 text-xs font-medium px-3 py-1 rounded-full mb-4 w-fit">
                            {project.category}
                        </span>

                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-white mb-4">
                            {project.title}
                        </h1>

                        <p className="text-slate-400 text-base sm:text-lg leading-relaxed mb-8">
                            {project.description}
                        </p>

                        <div className="mb-8">
                            <h3 className="text-white font-medium mb-4 text-lg">Technologies Used</h3>
                            <div className="flex flex-wrap gap-2">
                                {project.technologies.map((tech, index) => (
                                    <span key={index} className="bg-neutral-800 text-slate-300 text-sm px-4 py-2 rounded-full border border-neutral-700 hover:border-orange-700/50 transition-colors">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 mt-auto">


                            <a
                                href={project.link}
                                className="flex-1 bg-orange-700 hover:bg-orange-800 text-white text-center py-3 sm:py-4 rounded-lg font-medium transition-colors"
                            >
                                View Live Project
                            </a>



                        </div>

                        {/* <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                            {(project.category === "Web Development" || project.category === "UI/UX Design") ? (
                                <>
                                    <a
                                        href={project.link}
                                        className="flex-1 bg-orange-700 hover:bg-orange-800 text-white text-center py-3 sm:py-4 rounded-lg font-medium transition-colors"
                                    >
                                        View Live Project
                                    </a>
                                    
                                </>
                            ) : (
                                ""
                                // <button className="w-full border border-neutral-800 hover:border-neutral-700 text-white py-3 sm:py-4 rounded-lg font-medium transition-colors">
                                //     View Code
                                // </button>
                            )}
                        </div> */}

                        <div className="mt-8 pt-8 border-t border-neutral-800">
                            <h3 className="text-white font-medium mb-4 text-lg">Project Overview</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-4">
                                    <p className="text-slate-400 text-sm mb-1">Category</p>
                                    <p className="text-white font-medium">{project.category}</p>
                                </div>
                                <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-4">
                                    <p className="text-slate-400 text-sm mb-1">Technologies</p>
                                    <p className="text-white font-medium">{project.technologies.length} used</p>
                                </div>
                                <div className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-4">
                                    <p className="text-slate-400 text-sm mb-1">Status</p>
                                    <p className={`font-medium ${project.status === "Completed" ? "text-green-500" : "text-orange-500"}`}>{project.status}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProjectPage
