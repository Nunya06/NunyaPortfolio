import express from "express";
import {
    getAllSocialLinks,
    getSocialLinkById,
    createSocialLink,
    updateSocialLink,
    deleteSocialLink,
} from "../controllers/socialLinksController.js";
import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";

const socialLinksRouter = express.Router();

socialLinksRouter.get("/", getAllSocialLinks);
socialLinksRouter.get("/:id", getSocialLinkById);
socialLinksRouter.post("/", auth, admin, createSocialLink);
socialLinksRouter.put("/:id", auth, admin, updateSocialLink);
socialLinksRouter.delete("/:id", auth, admin, deleteSocialLink);

export default socialLinksRouter;
