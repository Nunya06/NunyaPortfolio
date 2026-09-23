import { useState } from "react";
import { BarChart3, LogOut, PackageSearch, Plus, Shield, Menu, X, MessageSquare, User, Mail, Home, Inbox } from "lucide-react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AdminLayout = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { logout } = useAuth();
    const navigate = useNavigate();

    const AdminLinkData = [
        { to: "/superAdmin", label: "Dashboard", icon: BarChart3 },
        { to: "/superAdmin/projects/new", label: "Add Project", icon: Plus },
        { to: "/superAdmin/projects", label: "All Projects", icon: PackageSearch },
        { to: "/superAdmin/services/new", label: "Add Service", icon: Plus },
        { to: "/superAdmin/services", label: "All Services", icon: PackageSearch },
        { to: "/superAdmin/testimonials/new", label: "Add Testimonial", icon: Plus },
        { to: "/superAdmin/testimonials", label: "All Testimonials", icon: MessageSquare },
        { to: "/superAdmin/about", label: "About Me", icon: User },
        { to: "/superAdmin/contact", label: "Contact Info", icon: Mail },
        { to: "/superAdmin/hero", label: "Hero Section", icon: Home },
        { to: "/superAdmin/messages", label: "Messages", icon: Inbox },
        { to: "/", label: "Exit", icon: LogOut, action: () => { logout(); navigate("/") } },
    ];

    return (
        <div className="min-h-screen bg-black">
            <div className="flex max-w-full">
                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsMobileMenuOpen(true)}
                    className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-neutral-900 border border-neutral-800 rounded-lg text-white"
                >
                    <Menu className="w-6 h-6" />
                </button>

                {/* Mobile Overlay */}
                {isMobileMenuOpen && (
                    <div
                        className="lg:hidden fixed inset-0 bg-black/50 z-40"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />
                )}

                {/* Admin Sidebar */}
                <aside className={`fixed lg:sticky lg:top-0 inset-y-0 left-0 z-50 w-64 h-screen bg-neutral-900 border-r border-neutral-800 flex flex-col transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
                    <div className="p-6 border-b border-neutral-800 flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                            <Shield className="size-5 text-orange-900" /> <span>Admin Panel</span>
                        </h2>
                        <button
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="lg:hidden p-1 text-slate-400 hover:text-white"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                    <nav className="flex-1 p-4">
                        <div className="flex flex-col gap-1.5">
                            {AdminLinkData.map((link) => {
                                if (link.action) {
                                    return (
                                        <button
                                            key={link.to}
                                            onClick={() => { link.action(); setIsMobileMenuOpen(false); }}
                                            className="flex items-center gap-3 p-3 rounded-lg text-sm text-slate-400 hover:bg-neutral-800 hover:text-white transition-colors w-full text-left"
                                        >
                                            <link.icon className="size-4" /> <span>{link.label}</span>
                                        </button>
                                    );
                                }
                                return (
                                    <NavLink
                                        key={link.to}
                                        to={link.to}
                                        end={true}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={({ isActive }) => `flex items-center gap-3 p-3 rounded-lg text-sm transition-colors ${isActive ? "bg-orange-900 text-white" : "text-slate-400 hover:bg-neutral-800 hover:text-white"}`}
                                    >
                                        <link.icon className="size-4" /> <span>{link.label}</span>
                                    </NavLink>
                                );
                            })}
                        </div>
                    </nav>
                </aside>
                <main className="flex-1 overflow-y-auto">
                    <div className="p-8 pt-16 lg:pt-8">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    )
}

export default AdminLayout
