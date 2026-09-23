import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { testimonialsAPI, uploadAPI } from "../../config/apiService";
import toast from "react-hot-toast";

const AdminTestimonialForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    message: "",
    name: "",
    role: "",
    image: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Load testimonial data if editing
  useEffect(() => {
    if (isEditing && id) {
      const fetchTestimonial = async () => {
        setIsLoading(true);
        try {
          const testimonial = await testimonialsAPI.getTestimonialById(id);
          setFormData({
            message: testimonial.message,
            name: testimonial.name,
            role: testimonial.role || "",
            image: testimonial.image,
          });
        } catch (err) {
          console.error("Failed to fetch testimonial:", err);
          toast.error("Failed to load testimonial");
        } finally {
          setIsLoading(false);
        }
      };
      fetchTestimonial();
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
        await testimonialsAPI.updateTestimonial(id, formData);
        toast.success("Testimonial updated successfully!");
      } else {
        await testimonialsAPI.createTestimonial(formData);
        toast.success("Testimonial saved successfully!");
      }
      navigate("/superAdmin/testimonials");
    } catch (err) {
      console.error("Failed to save testimonial:", err);
      toast.error("Failed to save testimonial");
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
            {isEditing ? "Edit Testimonial" : "Add New Testimonial"}
          </h1>
          <p className="text-slate-400">
            {isEditing ? "Update the testimonial details" : "Fill in the details to create a new testimonial"}
          </p>
        </div>
        <button
          onClick={() => navigate("/superAdmin/testimonials")}
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
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                Client Name *
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-orange-900 transition-colors"
                placeholder="Enter client name"
              />
            </div>

            {/* Role */}
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-white mb-2">
                Client Role (Optional)
              </label>
              <input
                type="text"
                id="role"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-orange-900 transition-colors"
                placeholder="Enter client role (e.g., CEO, Product Manager)"
              />
            </div>

            {/* Testimonial Text */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                Testimonial *
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={4}
                className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-orange-900 transition-colors resize-none"
                placeholder="Enter the testimonial text..."
              />
            </div>

            {/* Image */}
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-white mb-2">
                Client Image *
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
                    alt="Client preview"
                    className="w-24 h-24 object-cover rounded-full"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate("/superAdmin/testimonials")}
              className="px-6 py-2.5 border border-neutral-700 text-slate-300 rounded-lg hover:bg-neutral-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || isUploading}
              className="px-6 py-2.5 bg-orange-900 hover:bg-orange-800 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Saving..." : isUploading ? "Uploading..." : isEditing ? "Update Testimonial" : "Save Testimonial"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AdminTestimonialForm;
