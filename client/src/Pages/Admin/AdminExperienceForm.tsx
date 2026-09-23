import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { experience } from "../../assets/assets";

const AdminExperienceForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    company: "",
    role: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  // Load experience data if editing
  useEffect(() => {
    if (isEditing && id) {
      const exp = experience[parseInt(id)];
      if (exp) {
        setFormData({
          company: exp.company,
          role: exp.role,
          startDate: "",
          endDate: "",
          description: exp.description,
        });
      }
    }
  }, [isEditing, id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // TODO: Save to Supabase
    alert(isEditing ? "Experience updated successfully!" : "Experience saved successfully!");
    navigate("/superAdmin/about");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-white mb-2">
            {isEditing ? "Edit Experience" : "Add New Experience"}
          </h1>
          <p className="text-slate-400">
            {isEditing ? "Update the experience details" : "Fill in the details to create a new experience entry"}
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
          {/* Company */}
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-white mb-2">
              Company / Organization *
            </label>
            <input
              type="text"
              id="company"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              required
              className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-orange-900 transition-colors"
              placeholder="e.g., Tech Company, Startup, Freelance"
            />
          </div>

          {/* Role */}
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-white mb-2">
              Role / Position *
            </label>
            <input
              type="text"
              id="role"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              required
              className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-orange-900 transition-colors"
              placeholder="e.g., Full Stack Developer, Software Engineer"
            />
          </div>

          {/* Start Date */}
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-white mb-2">
              Start Date *
            </label>
            <input
              type="date"
              id="startDate"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              required
              className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-orange-900 transition-colors"
            />
          </div>

          {/* End Date */}
          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-white mb-2">
              End Date (Optional)
            </label>
            <input
              type="date"
              id="endDate"
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-orange-900 transition-colors"
            />
            <p className="text-xs text-slate-500 mt-1">Leave empty if currently working here</p>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-white mb-2">
              Description *
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              rows={4}
              className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-orange-900 transition-colors resize-none"
              placeholder="Describe your responsibilities and achievements..."
            />
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
            {isEditing ? "Update Experience" : "Save Experience"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminExperienceForm;
