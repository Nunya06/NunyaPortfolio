import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Edit2, Trash2, Eye } from "lucide-react";
import { projectsAPI } from "../../config/apiService";
import type { Project } from "../../types";
import toast from "react-hot-toast";

const AdminProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await projectsAPI.getAllProjects();
        setProjects(data);
      } catch (err) {
        console.error("Failed to fetch projects:", err);
        toast.error("Failed to load projects");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleDelete = async (id: string) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-2">
          <p className="text-white">Are you sure you want to delete this project?</p>
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-3 py-1.5 bg-neutral-700 hover:bg-neutral-600 text-white rounded-lg text-sm transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={async () => {
                toast.dismiss(t.id);
                try {
                  await projectsAPI.deleteProject(id);
                  setProjects(projects.filter(p => p.id !== id));
                  toast.success("Project deleted successfully");
                } catch (err) {
                  console.error("Failed to delete project:", err);
                  toast.error("Failed to delete project");
                }
              }}
              className="px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white rounded-lg text-sm transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      ),
      {
        duration: Infinity,
        style: {
          background: '#1a1a1a',
          border: '1px solid #333',
          borderRadius: '12px',
          padding: '16px',
        },
      }
    );
  };
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-white mb-2">All Projects</h1>
          <p className="text-slate-400">Manage your portfolio projects</p>
        </div>
        <Link
          to="/superAdmin/projects/new"
          className="bg-orange-900 hover:bg-orange-800 text-white px-6 py-2.5 rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          <span>+ Add Project</span>
        </Link>
      </div>

      {/* Projects Table */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="inline-block w-8 h-8 border-2 border-orange-700 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-neutral-800">
                    <th className="text-left text-slate-400 text-sm font-medium px-6 py-4">Project</th>
                    <th className="text-left text-slate-400 text-sm font-medium px-6 py-4">Category</th>
                    <th className="text-left text-slate-400 text-sm font-medium px-6 py-4">Technologies</th>
                    <th className="text-right text-slate-400 text-sm font-medium px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project) => (
                    <tr key={project.id} className="border-b border-neutral-800 hover:bg-neutral-800/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <img
                            src={project.images[0]}
                            alt={project.title}
                            className="w-16 h-12 object-cover rounded-lg"
                          />
                          <div>
                            <p className="text-white font-medium">{project.title}</p>
                            <p className="text-slate-400 text-sm line-clamp-1 max-w-xs">
                              {project.description}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-slate-300 text-sm">{project.category}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {project.technologies.slice(0, 3).map((tech, index) => (
                            <span
                              key={index}
                              className="text-xs text-slate-400 bg-neutral-800 px-2 py-1 rounded"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 3 && (
                            <span className="text-xs text-slate-500">
                              +{project.technologies.length - 3}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            to={`/project/${project.id}`}
                            className="p-2 text-slate-400 hover:text-white hover:bg-neutral-700 rounded-lg transition-colors"
                            title="View"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                          <Link
                            to={`/superAdmin/projects/${project.id}`}
                            className="p-2 text-slate-400 hover:text-white hover:bg-neutral-700 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(project.id)}
                            className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>

      {/* Empty State */}
      {projects.length === 0 && (
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-12 text-center">
          <p className="text-slate-400 mb-4">No projects yet</p>
          <Link
            to="/superAdmin/projects/new"
            className="bg-orange-900 hover:bg-orange-800 text-white px-6 py-2.5 rounded-lg font-medium transition-colors inline-block"
          >
            Create your first project
          </Link>
        </div>
      )}
    </div>
  );
};

export default AdminProjects;
