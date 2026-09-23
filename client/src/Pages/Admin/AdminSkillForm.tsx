import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { skills } from "../../assets/assets";

const AdminSkillForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    name: "",
    level: 50,
  });

  // Load skill data if editing
  useEffect(() => {
    if (isEditing && id) {
      const skill = skills[parseInt(id)];
      if (skill) {
        setFormData({
          name: skill.name,
          level: skill.level,
        });
      }
    }
  }, [isEditing, id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // TODO: Save to Supabase
    alert(isEditing ? "Skill updated successfully!" : "Skill saved successfully!");
    navigate("/superAdmin/about");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-white mb-2">
            {isEditing ? "Edit Skill" : "Add New Skill"}
          </h1>
          <p className="text-slate-400">
            {isEditing ? "Update the skill details" : "Fill in the details to create a new skill"}
          </p>
        </div>
        <button
          onClick={() => navigate("/superAdmin/about")}
          className="text-slate-400 hover:text-white transition-colors"
        >
          Cancel
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-6">
          {/* Skill Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
              Skill Name *
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-orange-900 transition-colors"
              placeholder="e.g., React, TypeScript, Figma"
            />
          </div>

          {/* Skill Level */}
          <div>
            <label htmlFor="level" className="block text-sm font-medium text-white mb-2">
              Skill Level * (0-100)
            </label>
            <input
              type="number"
              id="level"
              min="0"
              max="100"
              value={formData.level}
              onChange={(e) => setFormData({ ...formData, level: Math.min(100, Math.max(0, parseInt(e.target.value) || 0)) })}
              required
              className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-orange-900 transition-colors"
              placeholder="50"
            />
          </div>

          {/* Level Preview */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">Preview</label>
            <div className="w-full bg-neutral-700 rounded-full h-3">
              <div
                className="bg-orange-900 h-3 rounded-full transition-all duration-300"
                style={{ width: `${formData.level}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate("/superAdmin/about")}
            className="px-6 py-2.5 border border-neutral-700 text-slate-300 rounded-lg hover:bg-neutral-800 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 bg-orange-900 hover:bg-orange-800 text-white rounded-lg font-medium transition-colors"
          >
            {isEditing ? "Update Skill" : "Save Skill"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminSkillForm;
