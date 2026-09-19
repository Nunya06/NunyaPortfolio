import { projects } from "../../assets/assets";
import { FolderOpen, Code, Camera, Palette, TrendingUp, Clock, Plus } from "lucide-react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  // Calculate statistics
  const totalProjects = projects.length;

  const categoryStats = projects.reduce((acc, project) => {
    acc[project.category] = (acc[project.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const categoryIcons: Record<string, any> = {
    "Web Development": Code,
    "Photography": Camera,
    "UI/UX Design": Palette,
  };

  const categoryColors: Record<string, string> = {
    "Web Development": "from-blue-500 to-blue-600",
    "Photography": "from-purple-500 to-purple-600",
    "UI/UX Design": "from-pink-500 to-pink-600",
  };

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
              <p className="text-4xl font-bold text-white">{totalProjects}</p>
            </div>
            <div className="bg-orange-700/20 p-3 rounded-xl">
              <FolderOpen className="w-6 h-6 text-orange-900" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <span className="text-green-400">+12%</span>
            <span className="text-slate-500">from last month</span>
          </div>
        </div>

        {/* Category Stats */}
        {Object.entries(categoryStats).map(([category, count]) => {
          const Icon = categoryIcons[category] || FolderOpen;
          const gradient = categoryColors[category] || "from-gray-500 to-gray-600";
          return (
            <div key={category} className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 hover:border-neutral-700 transition-all hover:shadow-lg">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-slate-400 text-sm mb-1">{category}</p>
                  <p className="text-4xl font-bold text-white">{count}</p>
                </div>
                <div className={`bg-gradient-to-br ${gradient} p-3 rounded-xl`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-sm">
                <span className="text-slate-500">
                  {Math.round((count / totalProjects) * 100)}% of total
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Projects with new design */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-orange-900" />
            <h2 className="text-xl font-semibold text-white">Recent Projects</h2>
          </div>
          <span className="text-sm text-slate-400">{projects.slice(0, 5).length} projects</span>
        </div>
        <div className="divide-y divide-neutral-800">
          {projects.slice(0, 5).map((project) => (
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
