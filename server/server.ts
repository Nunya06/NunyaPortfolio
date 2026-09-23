import "dotenv/config";
import express, { NextFunction, Request, Response } from 'express';
import cors from "cors";
import authRouter from "./routes/authRoutes.js";
import projectsRouter from "./routes/projectsRoutes.js";
import servicesRouter from "./routes/servicesRoutes.js";
import testimonialsRouter from "./routes/testimonialsRoutes.js";
import heroRouter from "./routes/heroRoutes.js";
import skillsRouter from "./routes/skillsRoutes.js";
import experienceRouter from "./routes/experienceRoutes.js";
import contactRouter from "./routes/contactRoutes.js";
import socialLinksRouter from "./routes/socialLinksRoutes.js";
import messagesRouter from "./routes/messagesRoutes.js";
import adminDashboardRouter from "./routes/adminDashboardRoutes.js";
import uploadRouter from "./routes/uploadRoutes.js";

const app = express();

// Middleware
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    credentials: true
}));
app.use(express.json());

const port = process.env.PORT || 5000;

app.get('/', (req: Request, res: Response) => {
    res.send('Server is Live!');
});

app.use("/api/auth", authRouter);
app.use("/api/projects", projectsRouter);
app.use("/api/services", servicesRouter);
app.use("/api/testimonials", testimonialsRouter);
app.use("/api/hero", heroRouter);
app.use("/api/skills", skillsRouter);
app.use("/api/experience", experienceRouter);
app.use("/api/contact", contactRouter);
app.use("/api/social-links", socialLinksRouter);
app.use("/api/messages", messagesRouter);
app.use("/api/admin", adminDashboardRouter);
app.use("/api/upload", uploadRouter);

// Error handling
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    res.status(500).json({ message: error.message });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});