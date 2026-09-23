import { useState } from "react";
import { Save } from "lucide-react";

const AdminHero = () => {
  const [heroData, setHeroData] = useState({
    badgeText: "Software Developer & Photographer",
    heading: "I build thoughtful software people trust.",
    subheading: "I create thoughtful software and striking images, blending technical precision with a creative eye.",
    image: "",
    primaryButtonText: "View My Work",
    primaryButtonLink: "/projects",
    secondaryButtonText: "Download Resume",
    secondaryButtonLink: "#",
    footerText: "Code, cameras, and a curiosity for better ideas",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Hero data saved:", heroData);
    alert("Hero section updated successfully!");
    // TODO: Save to Supabase
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
                placeholder="e.g., /resume.pdf"
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
              Client Image *
            </label>
            <input
              type="file"
              id="image"
              value={heroData.image}
              onChange={(e) => setHeroData({ ...heroData, image: e.target.value })}
              required
              className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-orange-900 transition-colors"
              placeholder="Upload image"
            />
            {heroData.image && (
              <div className="mt-3">
                <img
                  src={heroData.image}
                  alt="Client preview"
                  className="w-24 h-24 object-cover rounded-full"
                />
              </div>
            )}
          </div>


        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 bg-orange-900 hover:bg-orange-800 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Changes</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminHero;
