import { useState, useEffect } from "react";
import { Save } from "lucide-react";
import { heroAPI, uploadAPI } from "../../config/apiService";
import toast from "react-hot-toast";

const AdminHero = () => {
  const [heroData, setHeroData] = useState({
    badgeText: "",
    heading: "",
    subheading: "",
    image: "",
    primaryButtonText: "",
    primaryButtonLink: "",
    secondaryButtonText: "",
    secondaryButtonLink: "",
    footerText: "",
  });

  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const fetchHero = async () => {
      setIsLoading(true);
      try {
        const data = await heroAPI.getHero();
        setHeroData({
          badgeText: data.badgeText,
          heading: data.heading,
          subheading: data.subheading,
          image: data.image || "",
          primaryButtonText: data.primaryButtonText,
          primaryButtonLink: data.primaryButtonLink,
          secondaryButtonText: data.secondaryButtonText,
          secondaryButtonLink: data.secondaryButtonLink,
          footerText: data.footerText,
        });
      } catch (err) {
        console.error("Failed to fetch hero data:", err);
        toast.error("Failed to load hero data");
      } finally {
        setIsLoading(false);
      }
    };
    fetchHero();
  }, []);

  const handleImageUpload = async (file: File) => {
    setIsUploading(true);
    try {
      const result = await uploadAPI.uploadSingle(file);
      setHeroData({ ...heroData, image: result.url });
      toast.success("Image uploaded successfully");
    } catch (err) {
      console.error("Failed to upload image:", err);
      toast.error("Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  // const handleResumeUpload = async (file: File) => {
  //   setIsUploadingResume(true);
  //   try {
  //     const result = await uploadAPI.uploadSingle(file);
  //     setHeroData({ ...heroData, resumeUrl: result.url });
  //     toast.success("Resume uploaded successfully");
  //   } catch (err) {
  //     console.error("Failed to upload resume:", err);
  //     toast.error("Failed to upload resume");
  //   } finally {
  //     setIsUploadingResume(false);
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      await heroAPI.updateHero(heroData);
      toast.success("Hero section updated successfully!");
    } catch (err) {
      console.error("Failed to save hero data:", err);
      toast.error("Failed to update hero section");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-white mb-2">Hero Section</h1>
          <p className="text-slate-400">Manage your landing page hero content</p>
        </div>
      </div>

      {/* Form */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="inline-block w-8 h-8 border-2 border-orange-700 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-6">
            {/* Badge Text */}
            <div>
              <label htmlFor="badgeText" className="block text-sm font-medium text-white mb-2">
                Badge Text
              </label>
              <input
                type="text"
                id="badgeText"
                value={heroData.badgeText}
                onChange={(e) => setHeroData({ ...heroData, badgeText: e.target.value })}
                className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-orange-900 transition-colors"
                placeholder="e.g., Software Developer & Photographer"
              />
            </div>

            {/* Heading */}
            <div>
              <label htmlFor="heading" className="block text-sm font-medium text-white mb-2">
                Main Heading
              </label>
              <textarea
                id="heading"
                value={heroData.heading}
                onChange={(e) => setHeroData({ ...heroData, heading: e.target.value })}
                rows={2}
                className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-orange-900 transition-colors resize-none"
                placeholder="Use \n for line breaks"
              />
            </div>

            {/* Subheading */}
            <div>
              <label htmlFor="subheading" className="block text-sm font-medium text-white mb-2">
                Subheading
              </label>
              <textarea
                id="subheading"
                value={heroData.subheading}
                onChange={(e) => setHeroData({ ...heroData, subheading: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-orange-900 transition-colors resize-none"
                placeholder="A brief description of what you do"
              />
            </div>

            {/* Primary Button */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="primaryButtonText" className="block text-sm font-medium text-white mb-2">
                  Primary Button Text
                </label>
                <input
                  type="text"
                  id="primaryButtonText"
                  value={heroData.primaryButtonText}
                  onChange={(e) => setHeroData({ ...heroData, primaryButtonText: e.target.value })}
                  className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-orange-900 transition-colors"
                  placeholder="e.g., View My Work"
                />
              </div>
              <div>
                <label htmlFor="primaryButtonLink" className="block text-sm font-medium text-white mb-2">
                  Primary Button Link
                </label>
                <input
                  type="text"
                  id="primaryButtonLink"
                  value={heroData.primaryButtonLink}
                  onChange={(e) => setHeroData({ ...heroData, primaryButtonLink: e.target.value })}
                  className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-orange-900 transition-colors"
                  placeholder="e.g., /projects"
                />
              </div>
            </div>

            {/* Secondary Button */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="secondaryButtonText" className="block text-sm font-medium text-white mb-2">
                  Secondary Button Text
                </label>
                <input
                  type="text"
                  id="secondaryButtonText"
                  value={heroData.secondaryButtonText}
                  onChange={(e) => setHeroData({ ...heroData, secondaryButtonText: e.target.value })}
                  className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-orange-900 transition-colors"
                  placeholder="e.g., Download Resume"
                />
              </div>
              <div>
                <label htmlFor="secondaryButtonLink" className="block text-sm font-medium text-white mb-2">
                  Secondary Button Link
                </label>
                <input
                  type="text"
                  id="secondaryButtonLink"
                  value={heroData.secondaryButtonLink}
                  onChange={(e) => setHeroData({ ...heroData, secondaryButtonLink: e.target.value })}
                  className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-orange-900 transition-colors"
                  placeholder="e.g., /contact"
                />
              </div>
            </div>

            {/* Footer Text */}
            <div>
              <label htmlFor="footerText" className="block text-sm font-medium text-white mb-2">
                Footer Text
              </label>
              <input
                type="text"
                id="footerText"
                value={heroData.footerText}
                onChange={(e) => setHeroData({ ...heroData, footerText: e.target.value })}
                className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-orange-900 transition-colors"
                placeholder="e.g., Code, cameras, and a curiosity for better ideas"
              />
            </div>

            <div>
              <label htmlFor="image" className="block text-sm font-medium text-white mb-2">
                Hero Image *
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
              {heroData.image && (
                <div className="mt-3">
                  <img
                    src={heroData.image}
                    alt="Hero preview"
                    className="w-48 h-48 object-cover rounded-lg"
                  />
                </div>
              )}
            </div>


          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSaving || isUploading}
              className="px-6 py-2.5 bg-orange-900 hover:bg-orange-800 text-white rounded-lg font-medium transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? "Saving..." : isUploading ? "Uploading..." : "Save Changes"}</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AdminHero;
