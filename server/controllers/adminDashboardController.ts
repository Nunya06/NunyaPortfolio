import { Request, Response } from "express";
import { prisma } from "../config/prisma.js";

// Get admin dashboard statistics
// GET /api/admin/dashboard
export const getDashboardStats = async (req: Request, res: Response) => {
    try {
        const [
            projectsCount,
            servicesCount,
            testimonialsCount,
            skillsCount,
            experienceCount,
            unreadMessagesCount,
            totalMessagesCount,
        ] = await Promise.all([
            prisma.project.count(),
            prisma.service.count(),
            prisma.testimonial.count(),
            prisma.skill.count(),
            prisma.experience.count(),
            prisma.message.count({ where: { isRead: false } }),
            prisma.message.count(),
        ]);

        const stats = {
            projects: projectsCount,
            services: servicesCount,
            testimonials: testimonialsCount,
            skills: skillsCount,
            experience: experienceCount,
            messages: {
                unread: unreadMessagesCount,
                total: totalMessagesCount,
            },
        };

        res.json(stats);
    } catch (error: any) {
        console.error("Error fetching dashboard stats:", error);
        res.status(500).json({ message: "Error fetching dashboard stats" });
    }
};

// Get recent messages for dashboard
// GET /api/admin/dashboard/recent-messages
export const getRecentMessages = async (req: Request, res: Response) => {
    try {
        const limit = 5;
        const messages = await prisma.message.findMany({
            orderBy: { createdAt: "desc" },
            take: limit,
        });

        res.json(messages);
    } catch (error: any) {
        console.error("Error fetching recent messages:", error);
        res.status(500).json({ message: "Error fetching recent messages" });
    }
};

// Get recent projects for dashboard
// GET /api/admin/dashboard/recent-projects
export const getRecentProjects = async (req: Request, res: Response) => {
    try {
        const limit = 5;
        const projects = await prisma.project.findMany({
            orderBy: { createdAt: "desc" },
            take: limit,
        });

        res.json(projects);
    } catch (error: any) {
        console.error("Error fetching recent projects:", error);
        res.status(500).json({ message: "Error fetching recent projects" });
    }
};
