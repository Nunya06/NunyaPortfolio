import express from "express";
import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";
import multer from "multer";
import { supabase } from "../config/supabase.js";

const uploadRouter = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

// Single image upload
uploadRouter.post("/single", auth, admin, upload.single("image"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No image file provided" });
        }

        const fileName = `${Date.now()}-${req.file.originalname}`;
        const filePath = `portfolio/${fileName}`;

        const { data, error } = await supabase.storage
            .from("portfolio")
            .upload(filePath, req.file.buffer, {
                contentType: req.file.mimetype,
                upsert: true,
            });

        if (error) {
            throw error;
        }

        const { data: { publicUrl } } = supabase.storage
            .from("portfolio")
            .getPublicUrl(filePath);

        res.json({ url: publicUrl });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

// Multiple images upload
uploadRouter.post("/multiple", auth, admin, upload.array("images", 7), async (req, res) => {
    try {
        const files = req.files as Express.Multer.File[];

        if (!files || files.length === 0) {
            return res.status(400).json({ message: "No image files provided" });
        }

        const uploadPromises = files.map(async (file) => {
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}-${file.originalname}`;
            const filePath = `portfolio/${fileName}`;

            const { data, error } = await supabase.storage
                .from("portfolio")
                .upload(filePath, file.buffer, {
                    contentType: file.mimetype,
                    upsert: true,
                });

            if (error) {
                throw error;
            }

            const { data: { publicUrl } } = supabase.storage
                .from("portfolio")
                .getPublicUrl(filePath);

            return publicUrl;
        });

        const urls = await Promise.all(uploadPromises);

        res.json({ urls });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
});

export default uploadRouter;
