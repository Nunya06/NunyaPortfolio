import express from "express";
import {
    getHero,
    updateHero,
} from "../controllers/heroController.js";
import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";

const heroRouter = express.Router();

heroRouter.get("/", getHero);
heroRouter.put("/", auth, admin, updateHero);

export default heroRouter;
