import { Request, Response } from "express";
import { prisma } from "../config/prisma.js";

// Get all skills
// GET /api/skills
export const getAllSkills = async (req: Request, res: Response) => {
    try {
        const skills = await prisma.skill.findMany({
            orderBy: { createdAt: "desc" },
        });
        res.json(skills);
    } catch (error: any) {
        console.error("Error fetching skills:", error);
        res.status(500).json({ message: "Error fetching skills" });
    }
};

// Get single skill by ID
// GET /api/skills/:id
export const getSkillById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const idStr = typeof id === 'string' ? id : Array.isArray(id) ? id[0] : id;
        const skill = await prisma.skill.findUnique({
            where: { id: idStr },
        });

        if (!skill) {
            return res.status(404).json({ message: "Skill not found" });
        }

        res.json(skill);
    } catch (error: any) {
        console.error("Error fetching skill:", error);
        res.status(500).json({ message: "Error fetching skill" });
    }
};

// Create new skill
// POST /api/skills
export const createSkill = async (req: Request, res: Response) => {
    try {
        const { name, level } = req.body;

        const nameStr = typeof name === 'string' ? name : Array.isArray(name) ? name[0] : name;
        const levelNum = typeof level === 'number' ? level : typeof level === 'string' ? parseInt(level) : level;

        if (!nameStr || levelNum === undefined) {
            return res.status(400).json({ message: "Please provide name and level" });
        }

        if (levelNum < 0 || levelNum > 100) {
            return res.status(400).json({ message: "Level must be between 0 and 100" });
        }

        const skill = await prisma.skill.create({
            data: { name: nameStr, level: levelNum },
        });

        res.status(201).json(skill);
    } catch (error: any) {
        console.error("Error creating skill:", error);
        res.status(500).json({ message: "Error creating skill" });
    }
};

// Update skill
// PUT /api/skills/:id
export const updateSkill = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const idStr = typeof id === 'string' ? id : Array.isArray(id) ? id[0] : id;
        const { name, level } = req.body;

        const nameStr = name ? (typeof name === 'string' ? name : Array.isArray(name) ? name[0] : name) : undefined;
        const levelNum = level !== undefined ? (typeof level === 'number' ? level : typeof level === 'string' ? parseInt(level) : level) : undefined;

        const existingSkill = await prisma.skill.findUnique({
            where: { id: idStr },
        });

        if (!existingSkill) {
            return res.status(404).json({ message: "Skill not found" });
        }

        if (levelNum !== undefined && (levelNum < 0 || levelNum > 100)) {
            return res.status(400).json({ message: "Level must be between 0 and 100" });
        }

        const skill = await prisma.skill.update({
            where: { id: idStr },
            data: {
                ...(nameStr && { name: nameStr }),
                ...(levelNum !== undefined && { level: levelNum }),
            },
        });

        res.json(skill);
    } catch (error: any) {
        console.error("Error updating skill:", error);
        res.status(500).json({ message: "Error updating skill" });
    }
};

// Delete skill
// DELETE /api/skills/:id
export const deleteSkill = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const idStr = typeof id === 'string' ? id : Array.isArray(id) ? id[0] : id;

        const existingSkill = await prisma.skill.findUnique({
            where: { id: idStr },
        });

        if (!existingSkill) {
            return res.status(404).json({ message: "Skill not found" });
        }

        await prisma.skill.delete({
            where: { id: idStr },
        });

        res.json({ message: "Skill deleted successfully" });
    } catch (error: any) {
        console.error("Error deleting skill:", error);
        res.status(500).json({ message: "Error deleting skill" });
    }
};
