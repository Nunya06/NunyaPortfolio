import { useState } from "react";
import { Link } from "react-router-dom";
import { Edit2, Plus, Trash2 } from "lucide-react";
import { skills, experience } from "../../assets/assets";

const AdminAbout = () => {
  const [activeTab, setActiveTab] = useState<"skills" | "experience">("skills");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-white mb-2">About Me</h1>
          <p className="text-slate-400">Manage your skills and experience</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab("skills")}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === "skills"
              ? "bg-orange-900 text-white"
              : "bg-neutral-800 text-slate-400 hover:text-white"
            }`}
        >
          Skills
        </button>
        <button
          onClick={() => setActiveTab("experience")}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === "experience"
              ? "bg-orange-900 text-white"
              : "bg-neutral-800 text-slate-400 hover:text-white"
            }`}
        >
          Experience
        </button>
      </div>

      {/* Skills Tab */}
      {activeTab === "skills" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Skills ({skills.length})</h2>
            <Link
              to="/superAdmin/about/skills/new"
              className="bg-orange-900 hover:bg-orange-800 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Skill</span>
            </Link>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-neutral-800">
                    <th className="text-left text-slate-400 text-sm font-medium px-6 py-4">Skill</th>
                    <th className="text-left text-slate-400 text-sm font-medium px-6 py-4">Level</th>
                    <th className="text-right text-slate-400 text-sm font-medium px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {skills.map((skill, index) => (
                    <tr key={index} className="border-b border-neutral-800 hover:bg-neutral-800/50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="text-white font-medium">{skill.name}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-32 bg-neutral-700 rounded-full h-2">
                            <div
                              className="bg-orange-900 h-2 rounded-full"
                              style={{ width: `${skill.level}%` }}
                            ></div>
                          </div>
                          <span className="text-slate-400 text-sm">{skill.level}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            to={`/superAdmin/about/skills/${index}`}
                            className="p-2 text-slate-400 hover:text-white hover:bg-neutral-700 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4" />
                          </Link>
                          <button
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
          </div>
        </div>
      )}

      {/* Experience Tab */}
      {activeTab === "experience" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Experience ({experience.length})</h2>
            <Link
              to="/superAdmin/about/experience/new"
              className="bg-orange-900 hover:bg-orange-800 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Experience</span>
            </Link>
          </div>

          <div className="space-y-4">
            {experience.map((exp, index) => (
              <div key={index} className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-orange-900 text-sm font-medium">{exp.year}</span>
                      <h3 className="text-xl font-semibold text-white">{exp.role}</h3>
                    </div>
                    <p className="text-slate-400 font-medium mb-2">{exp.company}</p>
                    <p className="text-slate-500">{exp.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      to={`/superAdmin/about/experience/${index}`}
                      className="p-2 text-slate-400 hover:text-white hover:bg-neutral-700 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </Link>
                    <button
                      className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAbout;
