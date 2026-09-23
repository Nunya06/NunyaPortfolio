// User
export interface User {
    id: string;
    email: string;
    name: string;
    isAdmin: boolean;
    createdAt: string;
    updatedAt: string;
}

// Hero
export interface Hero {
    id: string;
    badgeText: string;
    heading: string;
    subheading: string;
    image: string | null;
    primaryButtonText: string;
    primaryButtonLink: string;
    secondaryButtonText: string;
    secondaryButtonLink: string;
    resumeUrl: string | null;
    footerText: string;
    createdAt: string;
    updatedAt: string;
}

// Project
export interface Project {
    id: string;
    title: string;
    category: string;
    description: string;
    technologies: string[];
    images: string[];
    link: string | null;
    status: string;
    createdAt: string;
    updatedAt: string;
}

// Service
export interface Service {
    id: string;
    title: string;
    description: string;
    image: string;
    createdAt: string;
    updatedAt: string;
}

// Testimonial
export interface Testimonial {
    id: string;
    name: string;
    role: string | null;
    message: string;
    image: string;
    createdAt: string;
    updatedAt: string;
}

// Skill
export interface Skill {
    id: string;
    name: string;
    level: number;
    createdAt: string;
    updatedAt: string;
}

// Experience
export interface Experience {
    id: string;
    company: string;
    role: string;
    startDate: string;
    endDate: string | null;
    description: string;
    createdAt: string;
    updatedAt: string;
}

// Contact
export interface Contact {
    id: string;
    email: string;
    phone: string;
    location: string;
    createdAt: string;
    updatedAt: string;
}

// SocialLink
export interface SocialLink {
    id: string;
    name: string;
    url: string;
    image: string;
    createdAt: string;
    updatedAt: string;
}

// Message
export interface Message {
    id: string;
    name: string;
    email: string;
    subject: string | null;
    message: string;
    isRead: boolean;
    createdAt: string;
}

// Dashboard Stats
export interface DashboardStats {
    projects: number;
    services: number;
    testimonials: number;
    skills: number;
    experience: number;
    messages: {
        unread: number;
        total: number;
    };
}