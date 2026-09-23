import express from "express";
import {
    getAllMessages,
    getMessageById,
    createMessage,
    markMessageAsRead,
    deleteMessage,
} from "../controllers/messagesController.js";
import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";

const messagesRouter = express.Router();

messagesRouter.get("/", auth, admin, getAllMessages);
messagesRouter.get("/:id", auth, admin, getMessageById);
messagesRouter.post("/", createMessage);
messagesRouter.put("/:id/read", auth, admin, markMessageAsRead);
messagesRouter.delete("/:id", auth, admin, deleteMessage);

export default messagesRouter;
