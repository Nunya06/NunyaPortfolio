import { Request, Response } from "express";
import { prisma } from "../config/prisma.js";

// Get all projects
// GET /api/projects
export const getAllProjects = async (req: Request, res: Response) => {
    try {
        const projects = await prisma.project.findMany({
            orderBy: { createdAt: "desc" },
        });
        res.json(projects);
    } catch (error: any) {
        console.error("Error fetching projects:", error);
        res.status(500).json({ message: "Error fetching projects" });
    }
};

// Get single project by ID
// GET /api/projects/:id
export const getProjectById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const project = await prisma.project.findUnique({
            where: { id },
        });

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        res.json(project);
    } catch (error: any) {
        console.error("Error fetching project:", error);
        res.status(500).json({ message: "Error fetching project" });
    }
};

// Create new project
// POST /api/projects
export const createProject = async (req: Request, res: Response) => {
    try {
        const { title, category, description, technologies, images, link, status } = req.body;

        if (!title || !category || !description) {
            return res.status(400).json({ message: "Please provide title, category, and description" });
        }

        const project = await prisma.project.create({
            data: {
                title,
                category,
                description,
                technologies: technologies || [],
                images: images || [],
                link: link || null,
                status: status || "Completed",
            },
        });

        res.status(201).json(project);
    } catch (error: any) {
        console.error("Error creating project:", error);
        res.status(500).json({ message: "Error creating project" });
    }
};

// Update project
// PUT /api/projects/:id
export const updateProject = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title, category, description, technologies, images, link, status } = req.body;

        const existingProject = await prisma.project.findUnique({
            where: { id },
        });

        if (!existingProject) {
            return res.status(404).json({ message: "Project not found" });
        }

        const project = await prisma.project.update({
            where: { id },
            data: {
                ...(title && { title }),
                ...(category && { category }),
                ...(description && { description }),
                ...(technologies && { technologies }),
                ...(images && { images }),
                ...(link !== undefined && { link: link || null }),
                ...(status && { status }),
            },
        });

        res.json(project);
    } catch (error: any) {
        console.error("Error updating project:", error);
        res.status(500).json({ message: "Error updating project" });
    }
};

// Delete project
// DELETE /api/projects/:id
export const deleteProject = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const existingProject = await prisma.project.findUnique({
            where: { id },
        });

        if (!existingProject) {
            return res.status(404).json({ message: "Project not found" });
        }

        await prisma.project.delete({
            where: { id },
        });

        res.json({ message: "Project deleted successfully" });
    } catch (error: any) {
        console.error("Error deleting project:", error);
        res.status(500).json({ message: "Error deleting project" });
    }
};
