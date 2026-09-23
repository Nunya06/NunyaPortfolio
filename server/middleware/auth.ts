import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../config/prisma.js";

// Extend Express Request type to include user
declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                email: string;
                name: string;
                isAdmin: boolean;
            };
        }
    }
}

const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "No token provided, authorization denied" });
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };

        // Fetch user details
        const user = await prisma.user.findUnique({
            where: { id: decoded.id },
            select: {
                id: true,
                email: true,
                name: true,
            },
        });

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        // Check admin status
        const adminEmails = process.env.ADMIN_EMAILS ? process.env.ADMIN_EMAILS.split(",").map((e) => e.trim().toLowerCase()) : [];
        const isAdmin = adminEmails.includes(user.email.toLowerCase());

        req.user = {
            id: user.id,
            email: user.email,
            name: user.name,
            isAdmin,
        };

        next();
    } catch (error) {
        return res.status(401).json({ message: "Token is not valid" });
    }
};

export default auth;
