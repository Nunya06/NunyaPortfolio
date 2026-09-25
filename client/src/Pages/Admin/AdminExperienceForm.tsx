import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { experienceAPI } from "../../config/apiService";
import toast from "react-hot-toast";
import TipTapEditor from "../../components/TipTapEditor";

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

  const [isCurrentlyWorking, setIsCurrentlyWorking] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Load experience data if editing
  useEffect(() => {
    if (isEditing && id) {
      const fetchExperience = async () => {
        setIsLoading(true);
        try {
          const exp = await experienceAPI.getExperienceById(id);
          setFormData({
            company: exp.company,
            role: exp.role,
            startDate: exp.startDate,
            endDate: exp.endDate || "",
            description: exp.description,
          });
          setIsCurrentlyWorking(!exp.endDate);
        } catch (err) {
          console.error("Failed to fetch experience:", err);
          toast.error("Failed to load experience");
        } finally {
          setIsLoading(false);
        }
      };
      fetchExperience();
    }
  }, [isEditing, id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const submitData = {
        ...formData,
        endDate: isCurrentlyWorking ? null : formData.endDate,
      };

      if (isEditing && id) {
        await experienceAPI.updateExperience(id, submitData);
        toast.success("Experience updated successfully!");
      } else {
        await experienceAPI.createExperience(submitData);
        toast.success("Experience saved successfully!");
      }
      navigate("/superAdmin/about");
    } catch (err) {
      console.error("Failed to save experience:", err);
      toast.error("Failed to save experience");
    } finally {
      setIsSubmitting(false);
    }
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
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="inline-block w-8 h-8 border-2 border-orange-700 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
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
              <div className="flex items-center gap-3 mb-2">
                <input
                  type="checkbox"
                  id="currentlyWorking"
                  checked={isCurrentlyWorking}
                  onChange={(e) => {
                    setIsCurrentlyWorking(e.target.checked);
                    if (e.target.checked) {
                      setFormData({ ...formData, endDate: "" });
                    }
                  }}
                  className="w-4 h-4 rounded border-neutral-700 bg-neutral-800 text-orange-900 focus:ring-orange-900 focus:ring-offset-0"
                />
                <label htmlFor="currentlyWorking" className="text-sm font-medium text-white">
                  Currently working here
                </label>
              </div>
              {!isCurrentlyWorking && (
                <>
                  <input
                    type="date"
                    id="endDate"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-orange-900 transition-colors"
                  />
                  <p className="text-xs text-slate-500 mt-1">When did you leave this position?</p>
                </>
              )}
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-white mb-2">
                Description *
              </label>
              <TipTapEditor
                content={formData.description}
                onChange={(content) => setFormData({ ...formData, description: content })}
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
              disabled={isSubmitting}
              className="px-6 py-2.5 bg-orange-900 hover:bg-orange-800 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Saving..." : isEditing ? "Update Experience" : "Save Experience"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AdminExperienceForm;
