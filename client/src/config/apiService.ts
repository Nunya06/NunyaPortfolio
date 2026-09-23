import api from "./api";
import type {
    User,
    Hero,
    Project,
    Service,
    Testimonial,
    Skill,
    Experience,
    Contact,
    SocialLink,
    Message,
    DashboardStats,
} from "../types";

// Auth
export const authAPI = {
    register: async (data: { name: string; email: string; password: string }) => {
        const response = await api.post<{ user: User; token: string }>("/api/auth/register", data);
        return response.data;
    },
    login: async (data: { email: string; password: string }) => {
        const response = await api.post<{ user: User; token: string }>("/api/auth/login", data);
        return response.data;
    },
};

// Hero
export const heroAPI = {
    getHero: async () => {
        const response = await api.get<Hero>("/api/hero");
        return response.data;
    },
    updateHero: async (data: Partial<Hero>) => {
        const response = await api.put<Hero>("/api/hero", data);
        return response.data;
    },
};

// Projects
export const projectsAPI = {
    getAllProjects: async () => {
        const response = await api.get<Project[]>("/api/projects");
        return response.data;
    },
    getProjectById: async (id: string) => {
        const response = await api.get<Project>(`/api/projects/${id}`);
        return response.data;
    },
    createProject: async (data: Partial<Project>) => {
        const response = await api.post<Project>("/api/projects", data);
        return response.data;
    },
    updateProject: async (id: string, data: Partial<Project>) => {
        const response = await api.put<Project>(`/api/projects/${id}`, data);
        return response.data;
    },
    deleteProject: async (id: string) => {
        const response = await api.delete(`/api/projects/${id}`);
        return response.data;
    },
};

// Services
export const servicesAPI = {
    getAllServices: async () => {
        const response = await api.get<Service[]>("/api/services");
        return response.data;
    },
    getServiceById: async (id: string) => {
        const response = await api.get<Service>(`/api/services/${id}`);
        return response.data;
    },
    createService: async (data: Partial<Service>) => {
        const response = await api.post<Service>("/api/services", data);
        return response.data;
    },
    updateService: async (id: string, data: Partial<Service>) => {
        const response = await api.put<Service>(`/api/services/${id}`, data);
        return response.data;
    },
    deleteService: async (id: string) => {
        const response = await api.delete(`/api/services/${id}`);
        return response.data;
    },
};

// Testimonials
export const testimonialsAPI = {
    getAllTestimonials: async () => {
        const response = await api.get<Testimonial[]>("/api/testimonials");
        return response.data;
    },
    getTestimonialById: async (id: string) => {
        const response = await api.get<Testimonial>(`/api/testimonials/${id}`);
        return response.data;
    },
    createTestimonial: async (data: Partial<Testimonial>) => {
        const response = await api.post<Testimonial>("/api/testimonials", data);
        return response.data;
    },
    updateTestimonial: async (id: string, data: Partial<Testimonial>) => {
        const response = await api.put<Testimonial>(`/api/testimonials/${id}`, data);
        return response.data;
    },
    deleteTestimonial: async (id: string) => {
        const response = await api.delete(`/api/testimonials/${id}`);
        return response.data;
    },
};

// Skills
export const skillsAPI = {
    getAllSkills: async () => {
        const response = await api.get<Skill[]>("/api/skills");
        return response.data;
    },
    getSkillById: async (id: string) => {
        const response = await api.get<Skill>(`/api/skills/${id}`);
        return response.data;
    },
    createSkill: async (data: Partial<Skill>) => {
        const response = await api.post<Skill>("/api/skills", data);
        return response.data;
    },
    updateSkill: async (id: string, data: Partial<Skill>) => {
        const response = await api.put<Skill>(`/api/skills/${id}`, data);
        return response.data;
    },
    deleteSkill: async (id: string) => {
        const response = await api.delete(`/api/skills/${id}`);
        return response.data;
    },
};

// Experience
export const experienceAPI = {
    getAllExperience: async () => {
        const response = await api.get<Experience[]>("/api/experience");
        return response.data;
    },
    getExperienceById: async (id: string) => {
        const response = await api.get<Experience>(`/api/experience/${id}`);
        return response.data;
    },
    createExperience: async (data: Partial<Experience>) => {
        const response = await api.post<Experience>("/api/experience", data);
        return response.data;
    },
    updateExperience: async (id: string, data: Partial<Experience>) => {
        const response = await api.put<Experience>(`/api/experience/${id}`, data);
        return response.data;
    },
    deleteExperience: async (id: string) => {
        const response = await api.delete(`/api/experience/${id}`);
        return response.data;
    },
};

// Contact
export const contactAPI = {
    getContact: async () => {
        const response = await api.get<Contact>("/api/contact");
        return response.data;
    },
    updateContact: async (data: Partial<Contact>) => {
        const response = await api.put<Contact>("/api/contact", data);
        return response.data;
    },
};

// Social Links
export const socialLinksAPI = {
    getAllSocialLinks: async () => {
        const response = await api.get<SocialLink[]>("/api/social-links");
        return response.data;
    },
    getSocialLinkById: async (id: string) => {
        const response = await api.get<SocialLink>(`/api/social-links/${id}`);
        return response.data;
    },
    createSocialLink: async (data: Partial<SocialLink>) => {
        const response = await api.post<SocialLink>("/api/social-links", data);
        return response.data;
    },
    updateSocialLink: async (id: string, data: Partial<SocialLink>) => {
        const response = await api.put<SocialLink>(`/api/social-links/${id}`, data);
        return response.data;
    },
    deleteSocialLink: async (id: string) => {
        const response = await api.delete(`/api/social-links/${id}`);
        return response.data;
    },
};

// Messages
export const messagesAPI = {
    getAllMessages: async () => {
        const response = await api.get<Message[]>("/api/messages");
        return response.data;
    },
    getMessageById: async (id: string) => {
        const response = await api.get<Message>(`/api/messages/${id}`);
        return response.data;
    },
    createMessage: async (data: Partial<Message>) => {
        const response = await api.post<Message>("/api/messages", data);
        return response.data;
    },
    markMessageAsRead: async (id: string) => {
        const response = await api.put<Message>(`/api/messages/${id}/read`);
        return response.data;
    },
    deleteMessage: async (id: string) => {
        const response = await api.delete(`/api/messages/${id}`);
        return response.data;
    },
};

// Admin Dashboard
export const adminDashboardAPI = {
    getDashboardStats: async () => {
        const response = await api.get<DashboardStats>("/api/admin/dashboard");
        return response.data;
    },
    getRecentMessages: async () => {
        const response = await api.get<Message[]>("/api/admin/dashboard/recent-messages");
        return response.data;
    },
    getRecentProjects: async () => {
        const response = await api.get<Project[]>("/api/admin/dashboard/recent-projects");
        return response.data;
    },
};

// Upload
export const uploadAPI = {
    uploadSingle: async (file: File) => {
        const formData = new FormData();
        formData.append("image", file);
        const response = await api.post<{ url: string }>("/api/upload/single", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    },
    uploadMultiple: async (files: File[]) => {
        const formData = new FormData();
        files.forEach((file) => {
            formData.append("images", file);
        });
        const response = await api.post<{ urls: string[] }>("/api/upload/multiple", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    },
};
