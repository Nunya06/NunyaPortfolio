
import logo from "./logo.png";
import profile from "./passport-pic.jpg"
import photoshop from "./photoshop.png"
import laravel from "./laravel.png"
import reactjs from "./reactjs.png"
import reactNative from "./reactNative.png"
import superbase from "./superbase.png"
import github from "./github.png"
import lightroom from "./lightroom.png"
import capcut from "./capcut.png"
import illustrator from "./illustrator.png"
import loginImage from "./lg-image.jpg";


export const assets = {

    logo,
    profile,
    photoshop,
    laravel,
    reactjs,
    reactNative,
    superbase,
    github,
    lightroom,
    capcut,
    illustrator,
    loginImage,
};

export const skills = [
    { name: "ReactJs", level: 90 },
    { name: "React Native", level: 80 },
    { name: "TypeScript", level: 85 },
    { name: "Node.js", level: 80 },
    { name: "Tailwind CSS", level: 90 },
    { name: "Figma", level: 75 },
    { name: "Photography", level: 80 },
    { name: "UI/UX Design", level: 75 },
    { name: "Videography", level: 80 },
    { name: "Laravel", level: 75 },
    // { name: "UI/UX Design", level: 75 },
];

export const experience = [
    {
        year: "2024 - Present",
        role: "Full Stack Developer",
        company: "Freelance",
        description: "Building web applications and providing design solutions for clients across various industries."
    },
    {
        year: "2022 - 2024",
        role: "Software Developer",
        company: "Tech Company",
        description: "Developed and maintained web applications, collaborated with design teams, and implemented new features."
    },
    {
        year: "2020 - 2022",
        role: "Junior Developer",
        company: "Startup",
        description: "Started my journey in web development, learning modern frameworks and best practices."
    },
];

export const projects = [
    {
        id: 1,
        images: [
            "https://images.unsplash.com/photo-1543269865-0a740d43b90c?q=80&w=800&h=400&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800&h=400&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1714976326351-0ecf0244f0fc?q=80&w=800&h=400&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&h=400&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1714976326351-0ecf0244f0fc?q=80&w=800&h=400&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&h=400&auto=format&fit=crop"
        ],
        category: "Web Development",
        title: "E-Commerce Platform",
        description: "A full-stack e-commerce solution with React, Node.js, and MongoDB featuring real-time inventory management.",
        technologies: ["React", "Node.js", "MongoDB", "Stripe"],
        link: "#"
    },
    {
        id: 2,
        images: [
            "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800&h=400&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=800&h=400&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&h=400&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=800&h=400&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&h=400&auto=format&fit=crop"
        ],
        category: "UI/UX Design",
        title: "Mobile Banking App",
        description: "Modern banking application design with focus on accessibility and seamless user experience.",
        technologies: ["Figma", "Prototyping", "User Research"],
        link: "#"
    },
    {
        id: 3,
        images: [
            "https://images.unsplash.com/photo-1543269865-0a740d43b90c?q=80&w=800&h=400&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&h=400&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1543269865-0a740d43b90c?q=80&w=800&h=400&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&h=400&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&h=400&auto=format&fit=crop"
        ],
        category: "Photography",
        title: "Portrait Series",
        description: "A collection of professional portrait photography showcasing natural lighting and authentic expressions.",
        technologies: ["Photography", "Lightroom", "Photoshop"],
        link: "#"
    },
    {
        id: 4,
        images: [
            "https://images.unsplash.com/photo-1714976326351-0ecf0244f0fc?q=80&w=800&h=400&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&h=400&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1714976326351-0ecf0244f0fc?q=80&w=800&h=400&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&h=400&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&h=400&auto=format&fit=crop"
        ],
        category: "Web Development",
        title: "SaaS Dashboard",
        description: "Analytics dashboard with data visualization, real-time updates, and customizable widgets.",
        technologies: ["Next.js", "TypeScript", "D3.js", "PostgreSQL"],
        link: "#"
    },
    {
        id: 5,
        images: [
            "https://images.unsplash.com/photo-1543269865-0a740d43b90c?q=80&w=800&h=400&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=800&h=400&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1558655146-9f40138edfeb?q=80&w=800&h=400&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=800&h=400&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1558655146-9f40138edfeb?q=80&w=800&h=400&auto=format&fit=crop",
        ],
        category: "Graphic Design",
        title: "Brand Identity",
        description: "Complete brand identity design including logo, color palette, typography, and marketing materials.",
        technologies: ["Illustrator", "Photoshop", "Brand Strategy"],
        link: "#"
    },
    {
        id: 6,
        images: [
            "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800&h=400&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=800&h=400&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&h=400&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=800&h=400&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&h=400&auto=format&fit=crop",
        ],
        category: "Web Development",
        title: "Portfolio Website",
        description: "Personal portfolio website with smooth animations, responsive design, and optimized performance.",
        technologies: ["React", "Tailwind CSS", "Framer Motion"],
        link: "#"
    },
    {
        id: 7,
        images: [
            "https://images.unsplash.com/photo-1714976326351-0ecf0244f0fc?q=80&w=800&h=400&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&h=400&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1714976326351-0ecf0244f0fc?q=80&w=800&h=400&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&h=400&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&h=400&auto=format&fit=crop",
        ],
        category: "Web Development",
        title: "SaaS Dashboard",
        description: "Analytics dashboard with data visualization, real-time updates, and customizable widgets.",
        technologies: ["Next.js", "TypeScript", "D3.js", "PostgreSQL"],
        link: "#"
    },
];

export const services = [
    {
        title: "Software Development",
        description: "Building responsive, accessible, and reliable websites that turn ideas into useful experiences.",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800&h=400&auto=format&fit=crop"
    },
    {
        title: "Graphic Design",
        description: "Shaping visual identities and digital experiences with thoughtful composition and intentional detail.",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800&h=400&auto=format&fit=crop"
    },
    {
        title: "Photography & Videography",
        description: "Capturing people, places, and moments through images that feel natural, expressive, and memorable.",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800&h=400&auto=format&fit=crop"
    },
    {
        title: "UI/UX Design",
        description: "Creating intuitive interfaces and seamless user experiences that delight and engage.",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800&h=400&auto=format&fit=crop"
    }
];

export const faqs = [
    {
        question: "Are there any other components available?",
        answer: "Yes, there are many other components available in this library. You can find them in the 'Components' section of the website.",
    },
    {
        question: "Are components responsive?",
        answer: "Yes, all components are responsive and can be used on different screen sizes.",
    },
    {
        question: "Software with intention",
        answer: "Clean, useful interfaces and reliable experiences shaped around real people.",
    },
    {
        question: "A creative perspective",
        answer: "A photographer's eye for composition, atmosphere, and the details others miss.",
    },
    {
        question: "Made to connect",
        answer: "Open communication, thoughtful collaboration, and work that earns trust.",
    },
    {
        question: "Software with intention",
        answer: "Clean, useful interfaces and reliable experiences shaped around real people.",
    },
];

export const stacks = [
    { image: photoshop, id: "001" },
    { image: reactjs, id: "002" },
    { image: laravel, id: "003" },
    { image: reactNative, id: "004" },
    { image: github, id: "005" },
    { image: superbase, id: "006" },
    { image: lightroom, id: "007" },
    { image: capcut, id: "008" },
    { image: illustrator, id: "009" },

];

export const testimonials = [
    { text: "Exceptional work on our e-commerce platform. The code was clean, well-documented, and delivered ahead of schedule. A true professional.", name: "Sarah Johnson", role: "Product Manager", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200" },
    { text: "The photography for our brand campaign was stunning. The attention to lighting and composition brought our vision to life perfectly.", name: "Michael Chen", role: "Marketing Director", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200" },
    { text: "Outstanding UI/UX design work. The user experience improved significantly after the redesign, and our conversion rates increased by 40%.", name: "Emily Rodriguez", role: "Startup Founder", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200" },
    { text: "Exceptional work on our e-commerce platform. The code was clean, well-documented, and delivered ahead of schedule. A true professional.", name: "Sarah Johnson", role: "Product Manager", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200" },
    { text: "The photography for our brand campaign was stunning. The attention to lighting and composition brought our vision to life perfectly.", name: "Michael Chen", role: "Marketing Director", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200" },
    { text: "Outstanding UI/UX design work. The user experience improved significantly after the redesign, and our conversion rates increased by 40%.", name: "Emily Rodriguez", role: "Startup Founder", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200" },
];

