import { Request, Response } from "express";
import { prisma } from "../config/prisma.js";

// Get all social links
// GET /api/social-links
export const getAllSocialLinks = async (req: Request, res: Response) => {
    try {
        const socialLinks = await prisma.socialLink.findMany({
            orderBy: { createdAt: "desc" },
        });
        res.json(socialLinks);
    } catch (error: any) {
        console.error("Error fetching social links:", error);
        res.status(500).json({ message: "Error fetching social links" });
    }
};

// Get single social link by ID
// GET /api/social-links/:id
export const getSocialLinkById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const idStr = typeof id === 'string' ? id : Array.isArray(id) ? id[0] : id;
        const socialLink = await prisma.socialLink.findUnique({
            where: { id: idStr },
        });

        if (!socialLink) {
            return res.status(404).json({ message: "Social link not found" });
        }

        res.json(socialLink);
    } catch (error: any) {
        console.error("Error fetching social link:", error);
        res.status(500).json({ message: "Error fetching social link" });
    }
};

// Create new social link
// POST /api/social-links
export const createSocialLink = async (req: Request, res: Response) => {
    try {
        const { name, url, image } = req.body;

        const nameStr = typeof name === 'string' ? name : Array.isArray(name) ? name[0] : name;
        const urlStr = typeof url === 'string' ? url : Array.isArray(url) ? url[0] : url;
        const imageStr = image ? (typeof image === 'string' ? image : Array.isArray(image) ? image[0] : image) : "";

        if (!nameStr || !urlStr) {
            return res.status(400).json({ message: "Please provide name and url" });
        }

        const socialLink = await prisma.socialLink.create({
            data: { name: nameStr, url: urlStr, image: imageStr },
        });

        res.status(201).json(socialLink);
    } catch (error: any) {
        console.error("Error creating social link:", error);
        res.status(500).json({ message: "Error creating social link" });
    }
};

// Update social link
// PUT /api/social-links/:id
export const updateSocialLink = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const idStr = typeof id === 'string' ? id : Array.isArray(id) ? id[0] : id;
        const { name, url, image } = req.body;

        const nameStr = name ? (typeof name === 'string' ? name : Array.isArray(name) ? name[0] : name) : undefined;
        const urlStr = url ? (typeof url === 'string' ? url : Array.isArray(url) ? url[0] : url) : undefined;
        const imageStr = image !== undefined ? (typeof image === 'string' ? image : Array.isArray(image) ? image[0] : image) : undefined;

        const existingSocialLink = await prisma.socialLink.findUnique({
            where: { id: idStr },
        });

        if (!existingSocialLink) {
            return res.status(404).json({ message: "Social link not found" });
        }

        const socialLink = await prisma.socialLink.update({
            where: { id: idStr },
            data: {
                ...(nameStr && { name: nameStr }),
                ...(urlStr && { url: urlStr }),
                ...(imageStr !== undefined && { image: imageStr || "" }),
            },
        });

        res.json(socialLink);
    } catch (error: any) {
        console.error("Error updating social link:", error);
        res.status(500).json({ message: "Error updating social link" });
    }
};

// Delete social link
// DELETE /api/social-links/:id
export const deleteSocialLink = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const idStr = typeof id === 'string' ? id : Array.isArray(id) ? id[0] : id;

        const existingSocialLink = await prisma.socialLink.findUnique({
            where: { id: idStr },
        });

        if (!existingSocialLink) {
            return res.status(404).json({ message: "Social link not found" });
        }

        await prisma.socialLink.delete({
            where: { id: idStr },
        });

        res.json({ message: "Social link deleted successfully" });
    } catch (error: any) {
        console.error("Error deleting social link:", error);
        res.status(500).json({ message: "Error deleting social link" });
    }
};
