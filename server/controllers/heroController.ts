import { Request, Response } from "express";
import { prisma } from "../config/prisma.js";

// Get hero content
// GET /api/hero
export const getHero = async (req: Request, res: Response) => {
    try {
        const hero = await prisma.hero.findFirst();
        
        if (!hero) {
            return res.status(404).json({ message: "Hero content not found" });
        }

        res.json(hero);
    } catch (error: any) {
        console.error("Error fetching hero content:", error);
        res.status(500).json({ message: "Error fetching hero content" });
    }
};

// Update hero content
// PUT /api/hero
export const updateHero = async (req: Request, res: Response) => {
    try {
        const { badgeText, heading, subheading, image, primaryButtonText, primaryButtonLink, secondaryButtonText, secondaryButtonLink, footerText } = req.body;

        const existingHero = await prisma.hero.findFirst();

        let hero;
        if (existingHero) {
            hero = await prisma.hero.update({
                where: { id: existingHero.id },
                data: {
                    ...(badgeText && { badgeText }),
                    ...(heading && { heading }),
                    ...(subheading && { subheading }),
                    ...(image !== undefined && { image: image || null }),
                    ...(primaryButtonText && { primaryButtonText }),
                    ...(primaryButtonLink && { primaryButtonLink }),
                    ...(secondaryButtonText && { secondaryButtonText }),
                    ...(secondaryButtonLink && { secondaryButtonLink }),
                    ...(footerText && { footerText }),
                },
            });
        } else {
            hero = await prisma.hero.create({
                data: {
                    badgeText,
                    heading,
                    subheading,
                    image: image || null,
                    primaryButtonText,
                    primaryButtonLink,
                    secondaryButtonText,
                    secondaryButtonLink,
                    footerText,
                },
            });
        }

        res.json(hero);
    } catch (error: any) {
        console.error("Error updating hero content:", error);
        res.status(500).json({ message: "Error updating hero content" });
    }
};
