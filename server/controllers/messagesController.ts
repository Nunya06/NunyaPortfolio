import { Request, Response } from "express";
import { prisma } from "../config/prisma.js";

// Get all messages
// GET /api/messages
export const getAllMessages = async (req: Request, res: Response) => {
    try {
        const messages = await prisma.message.findMany({
            orderBy: { createdAt: "desc" },
        });
        res.json(messages);
    } catch (error: any) {
        console.error("Error fetching messages:", error);
        res.status(500).json({ message: "Error fetching messages" });
    }
};

// Get single message by ID
// GET /api/messages/:id
export const getMessageById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const idStr = typeof id === 'string' ? id : Array.isArray(id) ? id[0] : id;
        const message = await prisma.message.findUnique({
            where: { id: idStr },
        });

        if (!message) {
            return res.status(404).json({ message: "Message not found" });
        }

        res.json(message);
    } catch (error: any) {
        console.error("Error fetching message:", error);
        res.status(500).json({ message: "Error fetching message" });
    }
};

// Create new message (from contact form)
// POST /api/messages
export const createMessage = async (req: Request, res: Response) => {
    try {
        const { name, email, subject, message } = req.body;

        const nameStr = typeof name === 'string' ? name : Array.isArray(name) ? name[0] : name;
        const emailStr = typeof email === 'string' ? email : Array.isArray(email) ? email[0] : email;
        const subjectStr = subject ? (typeof subject === 'string' ? subject : Array.isArray(subject) ? subject[0] : subject) : undefined;
        const messageStr = typeof message === 'string' ? message : Array.isArray(message) ? message[0] : message;

        if (!nameStr || !emailStr || !messageStr) {
            return res.status(400).json({ message: "Please provide name, email, and message" });
        }

        const newMessage = await prisma.message.create({
            data: { name: nameStr, email: emailStr, subject: subjectStr || null, message: messageStr },
        });

        res.status(201).json(newMessage);
    } catch (error: any) {
        console.error("Error creating message:", error);
        res.status(500).json({ message: "Error creating message" });
    }
};

// Mark message as read
// PUT /api/messages/:id/read
export const markMessageAsRead = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const idStr = typeof id === 'string' ? id : Array.isArray(id) ? id[0] : id;

        const existingMessage = await prisma.message.findUnique({
            where: { id: idStr },
        });

        if (!existingMessage) {
            return res.status(404).json({ message: "Message not found" });
        }

        const message = await prisma.message.update({
            where: { id: idStr },
            data: { isRead: true },
        });

        res.json(message);
    } catch (error: any) {
        console.error("Error marking message as read:", error);
        res.status(500).json({ message: "Error marking message as read" });
    }
};

// Delete message
// DELETE /api/messages/:id
export const deleteMessage = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const idStr = typeof id === 'string' ? id : Array.isArray(id) ? id[0] : id;

        const existingMessage = await prisma.message.findUnique({
            where: { id: idStr },
        });

        if (!existingMessage) {
            return res.status(404).json({ message: "Message not found" });
        }

        await prisma.message.delete({
            where: { id: idStr },
        });

        res.json({ message: "Message deleted successfully" });
    } catch (error: any) {
        console.error("Error deleting message:", error);
        res.status(500).json({ message: "Error deleting message" });
    }
};
