import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { skillsAPI, experienceAPI, heroAPI } from "../config/apiService";
import type { Skill, Experience } from "../types";

const AboutMe = () => {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [experience, setExperience] = useState<Experience[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [heroData, setHeroData] = useState({
        badgeText: "",
        heading: "",
        subheading: "",
        image: "",
        primaryButtonText: "",
        primaryButtonLink: "",
        secondaryButtonText: "",
        secondaryButtonLink: "",
        footerText: "",
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [skillsData, experienceData] = await Promise.all([
                    skillsAPI.getAllSkills(),
                    experienceAPI.getAllExperience()
                ]);
                const data = await heroAPI.getHero();

                setHeroData({
                    badgeText: data.badgeText,
                    heading: data.heading,
                    subheading: data.subheading,
                    image: data.image || "",
                    primaryButtonText: data.primaryButtonText,
                    primaryButtonLink: data.primaryButtonLink,
                    secondaryButtonText: data.secondaryButtonText,
                    secondaryButtonLink: data.secondaryButtonLink,
                    footerText: data.footerText,
                });

                setSkills(skillsData);
                setExperience(experienceData);
            } catch (err) {
                console.error("Failed to fetch data:", err);
                setError("Failed to load data");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const getYearRange = (startDate: string, endDate: string | null) => {
        const start = new Date(startDate).getFullYear();
        const end = endDate ? new Date(endDate).getFullYear() : "Present";
        return `${start} - ${end}`;
    };

    return (
        <div className="min-h-screen bg-black">
            {/* Hero Section */}
            <div className="relative px-4 md:px-24 lg:px-32 xl:px-40 py-3 md:py-5">
                <div className="w-full h-full min-h-[20vh] flex flex-col items-center justify-center border-x border-dashed border-neutral-800">
                    <div className="text-center">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium text-white mb-6">
                            About Me
                        </h1>
                        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto">
                            Software Developer & Photographer creating meaningful digital experiences and capturing authentic moments.
                        </p>
                    </div>
                </div>
            </div>

            {/* About Section */}
            <div className="px-4 md:px-24 lg:px-32 xl:px-40 py-16 border-t border-dashed border-neutral-800">
                <div className="max-w-4xl mx-auto">
                    <div className="flex flex-col md:flex-row gap-12 items-center">
                        <div className="w-full md:w-1/2">
                            <img
                                src={heroData.image}
                                alt="Profile"
                                className="rounded-2xl border border-neutral-800 w-full max-w-md mx-auto"
                            />
                        </div>
                        <div className="w-full md:w-1/2">

                            {isLoading && (
                                <h2 className="text-3xl font-semibold text-orange-700 mb-4">{heroData.badgeText}</h2>
                            )}

                            <p className="text-slate-400 leading-relaxed mb-6">
                                I'm a passionate software developer and photographer based in the digital world. With a unique blend of technical expertise and creative vision, I bring ideas to life through code and imagery.
                            </p>
                            <p className="text-slate-400 leading-relaxed mb-6">
                                My journey in technology started with curiosity and has evolved into a career focused on building user-centric applications. Alongside development, I've cultivated a deep appreciation for photography, using it to document stories and capture the beauty in everyday moments.
                            </p>
                            <p className="text-slate-400 leading-relaxed">
                                Whether I'm crafting clean code or composing the perfect shot, I approach every project with attention to detail, creativity, and a commitment to excellence.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Skills Section */}
            <div className="px-4 md:px-24 lg:px-32 xl:px-40 py-16 border-t border-dashed border-neutral-800">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-semibold text-white mb-8 text-center">Skills & Expertise</h2>

                    {/* Loading State */}
                    {isLoading && (
                        <div className="text-center py-12">
                            <div className="inline-block w-8 h-8 border-2 border-orange-700 border-t-transparent rounded-full animate-spin"></div>
                            <p className="text-slate-400 mt-4">Loading skills...</p>
                        </div>
                    )}

                    {/* Error State */}
                    {error && (
                        <div className="text-center py-12">
                            <p className="text-red-400 text-lg">{error}</p>
                        </div>
                    )}

                    {/* Skills Grid */}
                    {!isLoading && !error && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {skills.map((skill) => (
                                <div key={skill.id} className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-white font-medium">{skill.name}</span>
                                        <span className="text-slate-400">{skill.level}%</span>
                                    </div>
                                    <div className="w-full bg-neutral-800 rounded-full h-2">
                                        <div
                                            className="bg-orange-700 h-2 rounded-full transition-all duration-500"
                                            style={{ width: `${skill.level}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {skills.length === 0 && !isLoading && !error && (
                        <div className="text-center py-12">
                            <p className="text-slate-400 text-lg">No skills available.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Experience Section */}
            <div className="px-4 md:px-24 lg:px-32 xl:px-40 py-16 border-t border-dashed border-neutral-800">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-semibold text-white mb-8 text-center">Experience</h2>

                    {/* Loading State */}
                    {isLoading && (
                        <div className="text-center py-12">
                            <div className="inline-block w-8 h-8 border-2 border-orange-700 border-t-transparent rounded-full animate-spin"></div>
                            <p className="text-slate-400 mt-4">Loading experience...</p>
                        </div>
                    )}

                    {/* Error State */}
                    {error && (
                        <div className="text-center py-12">
                            <p className="text-red-400 text-lg">{error}</p>
                        </div>
                    )}

                    {/* Experience List */}
                    {!isLoading && !error && (
                        <div className="space-y-8">
                            {experience.map((exp) => (
                                <div key={exp.id} className="border-l-2 border-orange-700 pl-6 relative">
                                    <div className="absolute left-0 top-0 w-4 h-4 bg-orange-700 rounded-full -translate-x-1/2"></div>
                                    <span className="text-orange-700 text-sm font-medium">{getYearRange(exp.startDate, exp.endDate)}</span>
                                    <h3 className="text-xl font-semibold text-white mt-1">{exp.role}</h3>
                                    <p className="text-slate-400 font-medium">{exp.company}</p>
                                    <div className="text-slate-500 mt-2 prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: exp.description }}></div>
                                </div>
                            ))}
                        </div>
                    )}

                    {experience.length === 0 && !isLoading && !error && (
                        <div className="text-center py-12">
                            <p className="text-slate-400 text-lg">No experience available.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* CTA Section */}
            <div className="px-4 md:px-24 lg:px-32 xl:px-40 py-16 border-t border-dashed border-neutral-800">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-semibold text-white mb-4">Let's Work Together</h2>
                    <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
                        Have a project in mind? I'd love to hear about it. Let's create something amazing together.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/projects" className="flex items-center justify-center gap-1 bg-orange-700 hover:bg-orange-700 px-5 text-sm py-2.5 text-white rounded-lg cursor-pointer">
                            View My Work
                        </Link>
                        <Link to="/contact" className="flex items-center justify-center gap-1  border border-orange-700 hover:bg-orange-700 px-5 text-sm py-2.5 text-white rounded-lg cursor-pointer">
                            Contact Me
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutMe
