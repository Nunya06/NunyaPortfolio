import express from "express";
import {
    getAllServices,
    getServiceById,
    createService,
    updateService,
    deleteService,
} from "../controllers/servicesController.js";
import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";

const servicesRouter = express.Router();

servicesRouter.get("/", getAllServices);
servicesRouter.get("/:id", getServiceById);
servicesRouter.post("/", auth, admin, createService);
servicesRouter.put("/:id", auth, admin, updateService);
servicesRouter.delete("/:id", auth, admin, deleteService);

export default servicesRouter;
