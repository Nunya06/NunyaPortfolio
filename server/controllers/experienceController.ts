import { Request, Response } from "express";
import { prisma } from "../config/prisma.js";

// Get all experience
// GET /api/experience
export const getAllExperience = async (req: Request, res: Response) => {
    try {
        const experience = await prisma.experience.findMany({
            orderBy: { startDate: "desc" },
        });
        res.json(experience);
    } catch (error: any) {
        console.error("Error fetching experience:", error);
        res.status(500).json({ message: "Error fetching experience" });
    }
};

// Get single experience by ID
// GET /api/experience/:id
export const getExperienceById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const idStr = typeof id === 'string' ? id : Array.isArray(id) ? id[0] : id;
        const experience = await prisma.experience.findUnique({
            where: { id: idStr },
        });

        if (!experience) {
            return res.status(404).json({ message: "Experience not found" });
        }

        res.json(experience);
    } catch (error: any) {
        console.error("Error fetching experience:", error);
        res.status(500).json({ message: "Error fetching experience" });
    }
};

// Create new experience
// POST /api/experience
export const createExperience = async (req: Request, res: Response) => {
    try {
        const { company, role, startDate, endDate, description } = req.body;

        const companyStr = typeof company === 'string' ? company : Array.isArray(company) ? company[0] : company;
        const roleStr = typeof role === 'string' ? role : Array.isArray(role) ? role[0] : role;
        const startDateStr = typeof startDate === 'string' ? startDate : Array.isArray(startDate) ? startDate[0] : startDate;
        const endDateStr = endDate ? (typeof endDate === 'string' ? endDate : Array.isArray(endDate) ? endDate[0] : endDate) : undefined;
        const descriptionStr = typeof description === 'string' ? description : Array.isArray(description) ? description[0] : description;

        if (!companyStr || !roleStr || !startDateStr || !descriptionStr) {
            return res.status(400).json({ message: "Please provide company, role, startDate, and description" });
        }

        const experience = await prisma.experience.create({
            data: {
                company: companyStr,
                role: roleStr,
                startDate: new Date(startDateStr),
                endDate: endDateStr ? new Date(endDateStr) : null,
                description: descriptionStr,
            },
        });

        res.status(201).json(experience);
    } catch (error: any) {
        console.error("Error creating experience:", error);
        res.status(500).json({ message: "Error creating experience" });
    }
};

// Update experience
// PUT /api/experience/:id
export const updateExperience = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const idStr = typeof id === 'string' ? id : Array.isArray(id) ? id[0] : id;
        const { company, role, startDate, endDate, description } = req.body;

        const companyStr = company ? (typeof company === 'string' ? company : Array.isArray(company) ? company[0] : company) : undefined;
        const roleStr = role ? (typeof role === 'string' ? role : Array.isArray(role) ? role[0] : role) : undefined;
        const startDateStr = startDate ? (typeof startDate === 'string' ? startDate : Array.isArray(startDate) ? startDate[0] : startDate) : undefined;
        const endDateStr = endDate !== undefined ? (typeof endDate === 'string' ? endDate : Array.isArray(endDate) ? endDate[0] : endDate) : undefined;
        const descriptionStr = description ? (typeof description === 'string' ? description : Array.isArray(description) ? description[0] : description) : undefined;

        const existingExperience = await prisma.experience.findUnique({
            where: { id: idStr },
        });

        if (!existingExperience) {
            return res.status(404).json({ message: "Experience not found" });
        }

        const experience = await prisma.experience.update({
            where: { id: idStr },
            data: {
                ...(companyStr && { company: companyStr }),
                ...(roleStr && { role: roleStr }),
                ...(startDateStr && { startDate: new Date(startDateStr) }),
                ...(endDateStr !== undefined && { endDate: endDateStr ? new Date(endDateStr) : null }),
                ...(descriptionStr && { description: descriptionStr }),
            },
        });

        res.json(experience);
    } catch (error: any) {
        console.error("Error updating experience:", error);
        res.status(500).json({ message: "Error updating experience" });
    }
};

// Delete experience
// DELETE /api/experience/:id
export const deleteExperience = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const idStr = typeof id === 'string' ? id : Array.isArray(id) ? id[0] : id;

        const existingExperience = await prisma.experience.findUnique({
            where: { id: idStr },
        });

        if (!existingExperience) {
            return res.status(404).json({ message: "Experience not found" });
        }

        await prisma.experience.delete({
            where: { id: idStr },
        });

        res.json({ message: "Experience deleted successfully" });
    } catch (error: any) {
        console.error("Error deleting experience:", error);
        res.status(500).json({ message: "Error deleting experience" });
    }
};
