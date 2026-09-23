import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { X, Plus, Trash2 } from "lucide-react";
import { projects } from "../../assets/assets";

const AdminProjectForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    link: "",
    technologies: [] as string[],
    images: [] as string[],
    status: "Completed",
  });

  const [techInput, setTechInput] = useState("");
  const [imageInput, setImageInput] = useState("");

  const categories = ["Web Development", "Photography", "UI/UX Design"];
  const statuses = ["Completed", "In Progress", "Planned"];

  // Load project data if editing
  useEffect(() => {
    if (isEditing && id) {
      const project = projects.find((p) => p.id === parseInt(id));
      if (project) {
        setFormData({
          title: project.title,
          category: project.category,
          description: project.description,
          link: project.link || "",
          technologies: project.technologies,
          images: project.images,
        });
      }
    }
  }, [isEditing, id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // TODO: Save to Supabase
    alert(isEditing ? "Project updated successfully!" : "Project saved successfully!");
    navigate("/superAdmin/projects");
  };

  const addTechnology = () => {
    if (techInput.trim() && !formData.technologies.includes(techInput.trim())) {
      setFormData({
        ...formData,
        technologies: [...formData.technologies, techInput.trim()],
      });
      setTechInput("");
    }
  };

  const removeTechnology = (index: number) => {
    setFormData({
      ...formData,
      technologies: formData.technologies.filter((_, i) => i !== index),
    });
  };

  const addImage = () => {
    if (imageInput.trim() && formData.images.length < 5) {
      setFormData({
        ...formData,
        images: [...formData.images, imageInput.trim()],
      });
      setImageInput("");
    }
  };

  const removeImage = (index: number) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-white mb-2">
            {isEditing ? "Edit Project" : "Add New Project"}
          </h1>
          <p className="text-slate-400">
            {isEditing ? "Update the project details" : "Fill in the details to create a new project"}
          </p>
        </div>
        <button
          onClick={() => navigate("/superAdmin/projects")}
          className="text-slate-400 hover:text-white transition-colors"
        >
          Cancel
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-white mb-2">
              Project Title *
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-orange-900 transition-colors"
              placeholder="Enter project title"
            />
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-white mb-2">
              Category *
            </label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              required
              className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-orange-900 transition-colors"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
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
              placeholder="Describe your project..."
            />
          </div>

          {/* Link */}
          <div>
            <label htmlFor="link" className="block text-sm font-medium text-white mb-2">
              Project Link (Optional)
            </label>
            <input
              type="url"
              id="link"
              value={formData.link}
              onChange={(e) => setFormData({ ...formData, link: e.target.value })}
              className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-orange-900 transition-colors"
              placeholder="https://example.com"
            />
          </div>

          {/* Status */}
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-white mb-2">
              Status *
            </label>
            <select
              id="status"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              required
              className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-orange-900 transition-colors"
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          {/* Technologies */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Technologies *
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTechnology())}
                className="flex-1 px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-orange-900 transition-colors"
                placeholder="Add technology (e.g., React, Node.js)"
              />
              <button
                type="button"
                onClick={addTechnology}
                className="px-4 py-3 bg-orange-900 hover:bg-orange-800 text-white rounded-lg transition-colors"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="flex items-center gap-2 bg-neutral-800 text-slate-300 px-3 py-1.5 rounded-lg text-sm"
                >
                  {tech}
                  <button
                    type="button"
                    onClick={() => removeTechnology(index)}
                    className="text-slate-500 hover:text-red-400 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Images */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Images * (Max 5)
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="url"
                value={imageInput}
                onChange={(e) => setImageInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addImage())}
                className="flex-1 px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-orange-900 transition-colors"
                placeholder="Add image URL"
                disabled={formData.images.length >= 5}
              />
              <button
                type="button"
                onClick={addImage}
                disabled={formData.images.length >= 5}
                className="px-4 py-3 bg-orange-900 hover:bg-orange-800 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {formData.images.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={image}
                    alt={`Project image ${index + 1}`}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 p-1 bg-red-500/80 hover:bg-red-500 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-500 mt-2">
              {formData.images.length}/5 images added
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate("/superAdmin/projects")}
            className="px-6 py-2.5 border border-neutral-700 text-slate-300 rounded-lg hover:bg-neutral-800 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 bg-orange-900 hover:bg-orange-800 text-white rounded-lg font-medium transition-colors"
          >
            {isEditing ? "Update Project" : "Save Project"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminProjectForm;
