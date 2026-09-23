import express from "express";
import {
    getAllExperience,
    getExperienceById,
    createExperience,
    updateExperience,
    deleteExperience,
} from "../controllers/experienceController.js";
import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";

const experienceRouter = express.Router();

experienceRouter.get("/", getAllExperience);
experienceRouter.get("/:id", getExperienceById);
experienceRouter.post("/", auth, admin, createExperience);
experienceRouter.put("/:id", auth, admin, updateExperience);
experienceRouter.delete("/:id", auth, admin, deleteExperience);

export default experienceRouter;
