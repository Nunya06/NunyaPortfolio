import { NextFunction, Request, Response } from "express";

const admin = (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized - No user found" });
        }

        if (!req.user.isAdmin) {
            return res.status(403).json({ message: "Admin access required" });
        }

        next();
    } catch (error: any) {
        console.error("Admin middleware error:", error);
        res.status(500).json({ message: "Admin verification failed", error: error.message });
    }
};

export default admin;
