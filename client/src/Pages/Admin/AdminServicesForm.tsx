import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { servicesAPI, uploadAPI } from "../../config/apiService";
import toast from "react-hot-toast";

const AdminServicesForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Load service data if editing
  useEffect(() => {
    if (isEditing && id) {
      const fetchService = async () => {
        setIsLoading(true);
        try {
          const service = await servicesAPI.getServiceById(id);
          setFormData({
            title: service.title,
            description: service.description,
            image: service.image,
          });
        } catch (err) {
          console.error("Failed to fetch service:", err);
          toast.error("Failed to load service");
        } finally {
          setIsLoading(false);
        }
      };
      fetchService();
    }
  }, [isEditing, id]);

  const handleImageUpload = async (file: File) => {
    setIsUploading(true);
    try {
      const result = await uploadAPI.uploadSingle(file);
      setFormData({ ...formData, image: result.url });
      toast.success("Image uploaded successfully");
    } catch (err) {
      console.error("Failed to upload image:", err);
      toast.error("Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.image) {
      toast.error("Please add an image");
      return;
    }

    setIsSubmitting(true);

    try {
      if (isEditing && id) {
        await servicesAPI.updateService(id, formData);
        toast.success("Service updated successfully!");
      } else {
        await servicesAPI.createService(formData);
        toast.success("Service saved successfully!");
      }
      navigate("/superAdmin/services");
    } catch (err) {
      console.error("Failed to save service:", err);
      toast.error("Failed to save service");
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
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="inline-block w-8 h-8 border-2 border-orange-700 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
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
                type="file"
                id="image"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleImageUpload(file);
                }}
                disabled={isUploading}
                className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-orange-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              />
              {isUploading && (
                <p className="text-sm text-orange-900 mt-2">Uploading image...</p>
              )}
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
              disabled={isSubmitting || isUploading}
              className="px-6 py-2.5 bg-orange-900 hover:bg-orange-800 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Saving..." : isUploading ? "Uploading..." : isEditing ? "Update Service" : "Save Service"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AdminServicesForm;
