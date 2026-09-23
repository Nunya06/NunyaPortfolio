import { Request, Response } from "express";
import { prisma } from "../config/prisma.js";

// Get contact information
// GET /api/contact
export const getContact = async (req: Request, res: Response) => {
    try {
        const contact = await prisma.contact.findFirst();
        
        if (!contact) {
            return res.status(404).json({ message: "Contact information not found" });
        }

        res.json(contact);
    } catch (error: any) {
        console.error("Error fetching contact information:", error);
        res.status(500).json({ message: "Error fetching contact information" });
    }
};

// Update contact information
// PUT /api/contact
export const updateContact = async (req: Request, res: Response) => {
    try {
        const { email, phone, location } = req.body;

        const existingContact = await prisma.contact.findFirst();

        let contact;
        if (existingContact) {
            contact = await prisma.contact.update({
                where: { id: existingContact.id },
                data: {
                    ...(email && { email }),
                    ...(phone && { phone }),
                    ...(location && { location }),
                },
            });
        } else {
            if (!email || !phone || !location) {
                return res.status(400).json({ message: "Please provide email, phone, and location" });
            }
            contact = await prisma.contact.create({
                data: { email, phone, location },
            });
        }

        res.json(contact);
    } catch (error: any) {
        console.error("Error updating contact information:", error);
        res.status(500).json({ message: "Error updating contact information" });
    }
};
