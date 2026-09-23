import express from "express";
import {
    getContact,
    updateContact,
} from "../controllers/contactController.js";
import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";

const contactRouter = express.Router();

contactRouter.get("/", getContact);
contactRouter.put("/", auth, admin, updateContact);

export default contactRouter;
