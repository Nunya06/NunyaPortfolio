import { useState, useEffect } from "react";
import { FolderOpen, Palette, TrendingUp, Clock, Plus, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { adminDashboardAPI } from "../../config/apiService";
import type { DashboardStats, Project } from "../../types";
import toast from "react-hot-toast";

const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentProjects, setRecentProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsData, projectsData] = await Promise.all([
          adminDashboardAPI.getDashboardStats(),
          adminDashboardAPI.getRecentProjects()
        ]);
        setStats(statsData);
        setRecentProjects(projectsData);
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
        toast.error("Failed to load dashboard data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="inline-block w-8 h-8 border-2 border-orange-700 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header with gradient */}
      <div className="relative overflow-hidden rounded-2xl bg-orange-900 p-8">
        <div className="relative z-10">
          <h1 className="text-4xl font-bold text-white mb-2">Welcome Back!</h1>
          <p className="text-orange-100 text-lg">Here's what's happening with your projects</p>
        </div>
        <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-20">
          <TrendingUp className="w-32 h-32 text-white" />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Projects */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 hover:border-orange-700/50 transition-all hover:shadow-lg hover:shadow-orange-700/10">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-slate-400 text-sm mb-1">Total Projects</p>
              <p className="text-4xl font-bold text-white">{stats?.projects || 0}</p>
            </div>
            <div className="bg-orange-700/20 p-3 rounded-xl">
              <FolderOpen className="w-6 h-6 text-orange-900" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <span className="text-green-400">Portfolio</span>
            <span className="text-slate-500">Total count</span>
          </div>
        </div>

        {/* Services */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 hover:border-orange-700/50 transition-all hover:shadow-lg hover:shadow-orange-700/10">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-slate-400 text-sm mb-1">Services</p>
              <p className="text-4xl font-bold text-white">{stats?.services || 0}</p>
            </div>
            <div className="bg-blue-700/20 p-3 rounded-xl">
              <Palette className="w-6 h-6 text-blue-500" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <span className="text-green-400">Active</span>
            <span className="text-slate-500">Services offered</span>
          </div>
        </div>

        {/* Testimonials */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 hover:border-orange-700/50 transition-all hover:shadow-lg hover:shadow-orange-700/10">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-slate-400 text-sm mb-1">Testimonials</p>
              <p className="text-4xl font-bold text-white">{stats?.testimonials || 0}</p>
            </div>
            <div className="bg-purple-700/20 p-3 rounded-xl">
              <MessageSquare className="w-6 h-6 text-purple-500" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <span className="text-green-400">Reviews</span>
            <span className="text-slate-500">Client feedback</span>
          </div>
        </div>

        {/* Messages */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 hover:border-orange-700/50 transition-all hover:shadow-lg hover:shadow-orange-700/10">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-slate-400 text-sm mb-1">Messages</p>
              <p className="text-4xl font-bold text-white">{stats?.messages.unread || 0}</p>
            </div>
            <div className="bg-green-700/20 p-3 rounded-xl">
              <Clock className="w-6 h-6 text-green-500" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <span className="text-orange-400">Unread</span>
            <span className="text-slate-500">of {stats?.messages.total || 0} total</span>
          </div>
        </div>
      </div>

      {/* Recent Projects with new design */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-orange-900" />
            <h2 className="text-xl font-semibold text-white">Recent Projects</h2>
          </div>
          <span className="text-sm text-slate-400">{recentProjects.length} projects</span>
        </div>
        <div className="divide-y divide-neutral-800">
          {recentProjects.map((project) => (
            <div key={project.id} className="flex items-center gap-4 p-6 hover:bg-neutral-800/50 transition-colors">
              <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0">
                <img
                  src={project.images[0]}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium truncate">{project.title}</p>
                <p className="text-slate-400 text-sm">{project.category}</p>
              </div>
              <div className="flex flex-wrap gap-1.5 justify-end">
                {project.technologies.slice(0, 3).map((tech) => (
                  <span key={tech} className="text-xs text-slate-300 bg-neutral-800 px-2 py-1 rounded">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link to="/superAdmin/projects/new" className="bg-orange-900 rounded-2xl p-6 cursor-pointer hover:shadow-lg hover:shadow-orange-700/20 transition-all">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-xl">
              <Plus className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-white font-semibold text-lg">Add New Project</p>
              <p className="text-orange-100 text-sm">Create a new portfolio project</p>
            </div>
          </div>
        </Link>
        <Link to="/superAdmin/projects" className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 cursor-pointer hover:border-orange-700/50 transition-all">
          <div className="flex items-center gap-4">
            <div className="bg-orange-700/20 p-3 rounded-xl">
              <FolderOpen className="w-6 h-6 text-orange-900" />
            </div>
            <div>
              <p className="text-white font-semibold text-lg">View All Projects</p>
              <p className="text-slate-400 text-sm">Manage your portfolio</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
