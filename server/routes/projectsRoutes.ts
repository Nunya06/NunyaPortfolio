import express from "express";
import {
    getAllProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
} from "../controllers/projectsController.js";
import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";

const projectsRouter = express.Router();

projectsRouter.get("/", getAllProjects);
projectsRouter.get("/:id", getProjectById);
projectsRouter.post("/", auth, admin, createProject);
projectsRouter.put("/:id", auth, admin, updateProject);
projectsRouter.delete("/:id", auth, admin, deleteProject);

export default projectsRouter;
