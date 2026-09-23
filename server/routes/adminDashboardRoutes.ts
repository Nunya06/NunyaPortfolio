import express from "express";
import {
    getDashboardStats,
    getRecentMessages,
    getRecentProjects,
} from "../controllers/adminDashboardController.js";
import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";

const adminDashboardRouter = express.Router();

adminDashboardRouter.get("/dashboard", auth, admin, getDashboardStats);
adminDashboardRouter.get("/dashboard/recent-messages", auth, admin, getRecentMessages);
adminDashboardRouter.get("/dashboard/recent-projects", auth, admin, getRecentProjects);

export default adminDashboardRouter;
