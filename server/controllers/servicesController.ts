import { Request, Response } from "express";
import { prisma } from "../config/prisma.js";

// Get all services
// GET /api/services
export const getAllServices = async (req: Request, res: Response) => {
    try {
        const services = await prisma.service.findMany({
            orderBy: { createdAt: "desc" },
        });
        res.json(services);
    } catch (error: any) {
        console.error("Error fetching services:", error);
        res.status(500).json({ message: "Error fetching services" });
    }
};

// Get single service by ID
// GET /api/services/:id
export const getServiceById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const idStr = typeof id === 'string' ? id : Array.isArray(id) ? id[0] : id;
        const service = await prisma.service.findUnique({
            where: { id: idStr },
        });

        if (!service) {
            return res.status(404).json({ message: "Service not found" });
        }

        res.json(service);
    } catch (error: any) {
        console.error("Error fetching service:", error);
        res.status(500).json({ message: "Error fetching service" });
    }
};

// Create new service
// POST /api/services
export const createService = async (req: Request, res: Response) => {
    try {
        const { title, description, image } = req.body;

        const titleStr = typeof title === 'string' ? title : Array.isArray(title) ? title[0] : title;
        const descriptionStr = typeof description === 'string' ? description : Array.isArray(description) ? description[0] : description;
        const imageStr = typeof image === 'string' ? image : Array.isArray(image) ? image[0] : image;

        if (!titleStr || !descriptionStr || !imageStr) {
            return res.status(400).json({ message: "Please provide title, description, and image" });
        }

        const service = await prisma.service.create({
            data: { title: titleStr, description: descriptionStr, image: imageStr },
        });

        res.status(201).json(service);
    } catch (error: any) {
        console.error("Error creating service:", error);
        res.status(500).json({ message: "Error creating service" });
    }
};

// Update service
// PUT /api/services/:id
export const updateService = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const idStr = typeof id === 'string' ? id : Array.isArray(id) ? id[0] : id;
        const { title, description, image } = req.body;

        const titleStr = title ? (typeof title === 'string' ? title : Array.isArray(title) ? title[0] : title) : undefined;
        const descriptionStr = description ? (typeof description === 'string' ? description : Array.isArray(description) ? description[0] : description) : undefined;
        const imageStr = image ? (typeof image === 'string' ? image : Array.isArray(image) ? image[0] : image) : undefined;

        const existingService = await prisma.service.findUnique({
            where: { id: idStr },
        });

        if (!existingService) {
            return res.status(404).json({ message: "Service not found" });
        }

        const service = await prisma.service.update({
            where: { id: idStr },
            data: {
                ...(titleStr && { title: titleStr }),
                ...(descriptionStr && { description: descriptionStr }),
                ...(imageStr && { image: imageStr }),
            },
        });

        res.json(service);
    } catch (error: any) {
        console.error("Error updating service:", error);
        res.status(500).json({ message: "Error updating service" });
    }
};

// Delete service
// DELETE /api/services/:id
export const deleteService = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const idStr = typeof id === 'string' ? id : Array.isArray(id) ? id[0] : id;

        const existingService = await prisma.service.findUnique({
            where: { id: idStr },
        });

        if (!existingService) {
            return res.status(404).json({ message: "Service not found" });
        }

        await prisma.service.delete({
            where: { id: idStr },
        });

        res.json({ message: "Service deleted successfully" });
    } catch (error: any) {
        console.error("Error deleting service:", error);
        res.status(500).json({ message: "Error deleting service" });
    }
};
