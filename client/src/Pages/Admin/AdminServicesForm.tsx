import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { services } from "../../assets/assets";

const AdminServicesForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
  });

  // Load service data if editing
  useEffect(() => {
    if (isEditing && id) {
      const service = services[parseInt(id)];
      if (service) {
        setFormData({
          title: service.title,
          description: service.description,
          image: service.image,
        });
      }
    }
  }, [isEditing, id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // TODO: Save to Supabase
    alert(isEditing ? "Service updated successfully!" : "Service saved successfully!");
    navigate("/superAdmin/services");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-white mb-2">
            {isEditing ? "Edit Service" : "Add New Service"}
          </h1>
          <p className="text-slate-400">
            {isEditing ? "Update the service details" : "Fill in the details to create a new service"}
          </p>
        </div>
        <button
          onClick={() => navigate("/superAdmin/services")}
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
              Service Title *
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-orange-900 transition-colors"
              placeholder="Enter service title"
            />
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
              placeholder="Describe your service..."
            />
          </div>

          {/* Image */}
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-white mb-2">
              Service Image *
            </label>
            <input
              type="url"
              id="image"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              required
              className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-orange-900 transition-colors"
              placeholder="Enter image URL"
            />
            {formData.image && (
              <div className="mt-3">
                <img
                  src={formData.image}
                  alt="Service preview"
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate("/superAdmin/services")}
            className="px-6 py-2.5 border border-neutral-700 text-slate-300 rounded-lg hover:bg-neutral-800 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 bg-orange-900 hover:bg-orange-800 text-white rounded-lg font-medium transition-colors"
          >
            {isEditing ? "Update Service" : "Save Service"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminServicesForm;
