import { Request, Response } from "express";
import { prisma } from "../config/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Generate JWT token
const generateToken = (id: string) => {
    return jwt.sign({ id }, process.env.JWT_SECRET as string, { expiresIn: "5h" });
};

// Check if user is admin
const getAdminStatus = (email: string | null | undefined): boolean => {
    if (!email) return false;
    const adminEmails = process.env.ADMIN_EMAILS ? process.env.ADMIN_EMAILS.split(",").map((e) => e.trim().toLowerCase()) : [];
    return adminEmails.includes(email.toLowerCase());
};

// Password validation
const validatePassword = (password: string): { valid: boolean; message?: string } => {
    if (password.length < 8) {
        return { valid: false, message: "Password must be at least 8 characters long" };
    }

    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (!hasLetter) {
        return { valid: false, message: "Password must contain at least one letter" };
    }
    if (!hasNumber) {
        return { valid: false, message: "Password must contain at least one number" };
    }
    if (!hasSpecialChar) {
        return { valid: false, message: "Password must contain at least one special character" };
    }

    return { valid: true };
};

// Register
// POST /api/auth/register
export const register = async (req: Request, res: Response) => {
    console.log("Register request received:", req.body);
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        console.log("Missing fields");
        return res.status(400).json({ message: "Please provide all fields" });
    }

    // Validate password
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
        console.log("Password validation failed:", passwordValidation.message);
        return res.status(400).json({ message: passwordValidation.message });
    }

    try {
        const existingUser = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });

        if (existingUser) {
            console.log("User already exists:", email);
            return res.status(400).json({ message: "User already exists with this email" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: { name, email: email.toLowerCase(), password: hashedPassword },
        });

        const token = generateToken(user.id);

        const userData: any = { ...user };
        delete userData.password;
        userData.isAdmin = getAdminStatus(userData.email);

        console.log("User registered successfully:", userData.email);
        res.status(201).json({ user: userData, token });
    } catch (error: any) {
        console.error("Registration error:", error);
        res.status(500).json({ message: error.message || "Registration failed" });
    }
};

// Login
// POST /api/auth/login
export const login = async (req: Request, res: Response) => {
    console.log("Login request received:", { email: req.body.email });
    const { email, password } = req.body;

    if (!email || !password) {
        console.log("Missing fields");
        return res.status(400).json({ message: "Please provide email and password" });
    }

    try {
        const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });

        if (!user) {
            console.log("User not found:", email);
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log("Password mismatch for:", email);
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = generateToken(user.id);

        const userData: any = { ...user };
        delete userData.password;
        userData.isAdmin = getAdminStatus(userData.email);

        console.log("Login successful:", userData.email);
        res.json({ user: userData, token });
    } catch (error: any) {
        console.error("Login error:", error);
        res.status(500).json({ message: error.message || "Login failed" });
    }
};
