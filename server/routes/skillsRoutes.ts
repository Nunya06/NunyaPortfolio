import express from "express";
import {
    getAllSkills,
    getSkillById,
    createSkill,
    updateSkill,
    deleteSkill,
} from "../controllers/skillsController.js";
import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";

const skillsRouter = express.Router();

skillsRouter.get("/", getAllSkills);
skillsRouter.get("/:id", getSkillById);
skillsRouter.post("/", auth, admin, createSkill);
skillsRouter.put("/:id", auth, admin, updateSkill);
skillsRouter.delete("/:id", auth, admin, deleteSkill);

export default skillsRouter;
