import express from "express";
import {
    getAllTestimonials,
    getTestimonialById,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial,
} from "../controllers/testimonialsController.js";
import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";

const testimonialsRouter = express.Router();

testimonialsRouter.get("/", getAllTestimonials);
testimonialsRouter.get("/:id", getTestimonialById);
testimonialsRouter.post("/", auth, admin, createTestimonial);
testimonialsRouter.put("/:id", auth, admin, updateTestimonial);
testimonialsRouter.delete("/:id", auth, admin, deleteTestimonial);

export default testimonialsRouter;
