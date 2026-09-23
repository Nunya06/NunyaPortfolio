import { prisma } from "./config/prisma.js";
import bcrypt from "bcrypt";

const seedDB = async () => {
    try {
        console.log("Starting seed...");

        // Clear existing data
        await prisma.message.deleteMany({});
        await prisma.socialLink.deleteMany({});
        await prisma.contact.deleteMany({});
        await prisma.experience.deleteMany({});
        await prisma.skill.deleteMany({});
        await prisma.testimonial.deleteMany({});
        await prisma.service.deleteMany({});
        await prisma.project.deleteMany({});
        await prisma.hero.deleteMany({});
        await prisma.user.deleteMany({});
        console.log("Cleared existing data");

        // Create admin user
        // const hashedPassword = await bcrypt.hash("Admin@1234", 10);
        // const adminUser = await prisma.user.create({
        //     data: {
        //         email: "wisdomxorse928@gmail.com",
        //         password: hashedPassword,
        //         name: "Xorse Nunya",
        //     },
        // });
        // console.log("Created admin user");

        // Create hero section
        const hero = await prisma.hero.create({
            data: {
                badgeText: "Full Stack Developer",
                heading: "Building Digital Experiences",
                subheading: "I craft responsive, user-friendly web applications with modern technologies and best practices.",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop",
                primaryButtonText: "View Projects",
                primaryButtonLink: "#projects",
                secondaryButtonText: "Contact Me",
                secondaryButtonLink: "#contact",
                footerText: "Available for freelance work",
            },
        });
        console.log("Created hero section");

        // Create projects
        const projects = await prisma.project.createMany({
            data: [
                {
                    title: "E-Commerce Platform",
                    category: "Web Development",
                    description: "A full-featured e-commerce platform with payment integration, inventory management, and admin dashboard.",
                    technologies: ["React", "Node.js", "PostgreSQL", "Stripe", "TailwindCSS"],
                    images: ["https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800"],
                    link: "https://github.com/example/ecommerce",
                    status: "Completed",
                },
                {
                    title: "Task Management App",
                    category: "Productivity",
                    description: "A collaborative task management application with real-time updates, team features, and progress tracking.",
                    technologies: ["Next.js", "TypeScript", "Prisma", "Socket.io", "shadcn/ui"],
                    images: ["https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800"],
                    link: "https://github.com/example/taskapp",
                    status: "Completed",
                },
                {
                    title: "Portfolio Website",
                    category: "Web Development",
                    description: "A modern, responsive portfolio website showcasing projects and skills with smooth animations.",
                    technologies: ["React", "Framer Motion", "TailwindCSS", "Vercel"],
                    images: ["https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800"],
                    link: "https://github.com/example/portfolio",
                    status: "Completed",
                },
                {
                    title: "Weather Dashboard",
                    category: "API Integration",
                    description: "A weather dashboard with location-based forecasts, historical data, and beautiful visualizations.",
                    technologies: ["Vue.js", "OpenWeather API", "Chart.js", "CSS Grid"],
                    images: ["https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800"],
                    link: "https://github.com/example/weather",
                    status: "In Progress",
                },
            ],
        });
        console.log(`Created ${projects.count} projects`);

        // Create services
        const services = await prisma.service.createMany({
            data: [
                {
                    title: "Web Development",
                    description: "Building responsive, high-performance web applications using modern frameworks and best practices.",
                    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
                },
                {
                    title: "UI/UX Design",
                    description: "Creating intuitive and visually appealing user interfaces that enhance user experience.",
                    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800",
                },
                {
                    title: "API Development",
                    description: "Designing and building robust RESTful APIs with proper authentication and documentation.",
                    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800",
                },
                {
                    title: "Database Design",
                    description: "Designing efficient database schemas and optimizing queries for better performance.",
                    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800",
                },
            ],
        });
        console.log(`Created ${services.count} services`);

        // Create testimonials
        const testimonials = await prisma.testimonial.createMany({
            data: [
                {
                    name: "Sarah Johnson",
                    role: "Product Manager",
                    message: "Exceptional work on our e-commerce platform. The attention to detail and technical expertise exceeded our expectations.",
                    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
                },
                {
                    name: "Michael Chen",
                    role: "CTO, TechStart",
                    message: "Delivered a robust solution that scaled perfectly with our growing user base. Highly recommended for any web development project.",
                    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
                },
                {
                    name: "Emily Davis",
                    role: "Founder, DesignCo",
                    message: "Transformed our vision into a beautiful, functional website. Communication was excellent throughout the project.",
                    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200",
                },
            ],
        });
        console.log(`Created ${testimonials.count} testimonials`);

        // Create skills
        const skills = await prisma.skill.createMany({
            data: [
                { name: "JavaScript", level: 95 },
                { name: "TypeScript", level: 90 },
                { name: "React", level: 92 },
                { name: "Node.js", level: 88 },
                { name: "Next.js", level: 85 },
                { name: "PostgreSQL", level: 82 },
                { name: "MongoDB", level: 80 },
                { name: "TailwindCSS", level: 90 },
                { name: "Git", level: 88 },
                { name: "Docker", level: 75 },
                { name: "AWS", level: 70 },
                { name: "GraphQL", level: 78 },
            ],
        });
        console.log(`Created ${skills.count} skills`);

        // Create experience
        const experiences = await prisma.experience.createMany({
            data: [
                {
                    company: "Tech Solutions Inc.",
                    role: "Senior Full Stack Developer",
                    startDate: new Date("2022-01-01"),
                    endDate: new Date("2024-01-01"),
                    description: "Led development of multiple web applications, mentored junior developers, and implemented CI/CD pipelines.",
                },
                {
                    company: "Digital Agency Co.",
                    role: "Full Stack Developer",
                    startDate: new Date("2020-06-01"),
                    endDate: new Date("2021-12-31"),
                    description: "Developed client websites and web applications using React, Node.js, and various CMS platforms.",
                },
                {
                    company: "StartupXYZ",
                    role: "Junior Developer",
                    startDate: new Date("2019-01-01"),
                    endDate: new Date("2020-05-31"),
                    description: "Built and maintained web applications, participated in code reviews, and collaborated with design team.",
                },
            ],
        });
        console.log(`Created ${experiences.count} experiences`);

        // Create contact info
        const contact = await prisma.contact.create({
            data: {
                email: "wisdomxorse928.com",
                phone: "+233 (0) 545-327-593",
                location: "Burma Camp, Ghana",
            },
        });
        console.log("Created contact info");

        // Create social links
        const socialLinks = await prisma.socialLink.createMany({
            data: [
                {
                    name: "GitHub",
                    url: "https://github.com/yourusername",
                    image: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
                },
                {
                    name: "LinkedIn",
                    url: "https://linkedin.com/in/yourusername",
                    image: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png",
                },
                {
                    name: "Twitter",
                    url: "https://twitter.com/yourusername",
                    image: "https://abs.twimg.com/favicons/twitter.ico",
                },
                {
                    name: "Dribbble",
                    url: "https://dribbble.com/yourusername",
                    image: "https://cdn.dribbble.com/assets/logo-small-2x-9fe0d58e5b1f4c9e9d0456cde9c51cb8a9468537f0d152cd1a3f4e1f4f4f4f4.png",
                },
            ],
        });
        console.log(`Created ${socialLinks.count} social links`);

        // Create sample messages
        const messages = await prisma.message.createMany({
            data: [
                {
                    name: "John Smith",
                    email: "john@example.com",
                    subject: "Project Inquiry",
                    message: "Hi, I'm interested in discussing a potential project. Could we schedule a call?",
                    isRead: false,
                },
                {
                    name: "Alice Brown",
                    email: "alice@example.com",
                    subject: "Collaboration Opportunity",
                    message: "I saw your portfolio and would love to collaborate on an upcoming project.",
                    isRead: true,
                },
            ],
        });
        console.log(`Created ${messages.count} messages`);

        console.log("Seed completed successfully!");
        process.exit(0);
    } catch (error) {
        console.error("Seed error:", error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
};

seedDB();
