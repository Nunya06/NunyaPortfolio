import { Request, Response } from "express";
import { prisma } from "../config/prisma.js";

// Get all testimonials
// GET /api/testimonials
export const getAllTestimonials = async (req: Request, res: Response) => {
    try {
        const testimonials = await prisma.testimonial.findMany({
            orderBy: { createdAt: "desc" },
        });
        res.json(testimonials);
    } catch (error: any) {
        console.error("Error fetching testimonials:", error);
        res.status(500).json({ message: "Error fetching testimonials" });
    }
};

// Get single testimonial by ID
// GET /api/testimonials/:id
export const getTestimonialById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const idStr = typeof id === 'string' ? id : Array.isArray(id) ? id[0] : id;
        const testimonial = await prisma.testimonial.findUnique({
            where: { id: idStr },
        });

        if (!testimonial) {
            return res.status(404).json({ message: "Testimonial not found" });
        }

        res.json(testimonial);
    } catch (error: any) {
        console.error("Error fetching testimonial:", error);
        res.status(500).json({ message: "Error fetching testimonial" });
    }
};

// Create new testimonial
// POST /api/testimonials
export const createTestimonial = async (req: Request, res: Response) => {
    try {
        const { name, role, message, image } = req.body;

        const nameStr = typeof name === 'string' ? name : Array.isArray(name) ? name[0] : name;
        const roleStr = role ? (typeof role === 'string' ? role : Array.isArray(role) ? role[0] : role) : null;
        const messageStr = typeof message === 'string' ? message : Array.isArray(message) ? message[0] : message;
        const imageStr = typeof image === 'string' ? image : Array.isArray(image) ? image[0] : image;

        if (!nameStr || !messageStr || !imageStr) {
            return res.status(400).json({ message: "Please provide name, message, and image" });
        }

        const testimonial = await prisma.testimonial.create({
            data: { name: nameStr, role: roleStr, message: messageStr, image: imageStr },
        });

        res.status(201).json(testimonial);
    } catch (error: any) {
        console.error("Error creating testimonial:", error);
        res.status(500).json({ message: "Error creating testimonial" });
    }
};

// Update testimonial
// PUT /api/testimonials/:id
export const updateTestimonial = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const idStr = typeof id === 'string' ? id : Array.isArray(id) ? id[0] : id;
        const { name, role, message, image } = req.body;

        const nameStr = name ? (typeof name === 'string' ? name : Array.isArray(name) ? name[0] : name) : undefined;
        const roleStr = role !== undefined ? (typeof role === 'string' ? role : Array.isArray(role) ? role[0] : role) : undefined;
        const messageStr = message ? (typeof message === 'string' ? message : Array.isArray(message) ? message[0] : message) : undefined;
        const imageStr = image ? (typeof image === 'string' ? image : Array.isArray(image) ? image[0] : image) : undefined;

        const existingTestimonial = await prisma.testimonial.findUnique({
            where: { id: idStr },
        });

        if (!existingTestimonial) {
            return res.status(404).json({ message: "Testimonial not found" });
        }

        const testimonial = await prisma.testimonial.update({
            where: { id: idStr },
            data: {
                ...(nameStr && { name: nameStr }),
                ...(roleStr !== undefined && { role: roleStr || null }),
                ...(messageStr && { message: messageStr }),
                ...(imageStr && { image: imageStr }),
            },
        });

        res.json(testimonial);
    } catch (error: any) {
        console.error("Error updating testimonial:", error);
        res.status(500).json({ message: "Error updating testimonial" });
    }
};

// Delete testimonial
// DELETE /api/testimonials/:id
export const deleteTestimonial = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const idStr = typeof id === 'string' ? id : Array.isArray(id) ? id[0] : id;

        const existingTestimonial = await prisma.testimonial.findUnique({
            where: { id: idStr },
        });

        if (!existingTestimonial) {
            return res.status(404).json({ message: "Testimonial not found" });
        }

        await prisma.testimonial.delete({
            where: { id: idStr },
        });

        res.json({ message: "Testimonial deleted successfully" });
    } catch (error: any) {
        console.error("Error deleting testimonial:", error);
        res.status(500).json({ message: "Error deleting testimonial" });
    }
};
