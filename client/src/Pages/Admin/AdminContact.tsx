import { useState } from "react";
import { Plus, Trash2, Mail, Phone, MapPin } from "lucide-react";

const AdminContact = () => {
  const [contactInfo, setContactInfo] = useState({
    email: "wisdomxorse928@gmail.com",
    phone: "+233 (0) 545-327-593",
    location: "Burma Camp, Ghana",
  });

  const [socialLinks, setSocialLinks] = useState([
    { name: "GitHub", url: "#", image: "" },
    { name: "LinkedIn", url: "#", image: "" },
    { name: "Twitter", url: "#", image: "" },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact info saved:", contactInfo);
    alert("Contact information updated successfully!");
    // TODO: Save to Supabase
  };

  const handleSocialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Social links saved:", socialLinks);
    alert("Social links updated successfully!");
    // TODO: Save to Supabase
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-white mb-2">Contact Information</h1>
          <p className="text-slate-400">Manage your contact details and social links</p>
        </div>
      </div>

      {/* Contact Info Form */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Contact Details</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="bg-neutral-800 p-3 rounded-lg border border-neutral-700">
              <Mail className="w-5 h-5 text-orange-900" />
            </div>
            <div className="flex-1">
              <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={contactInfo.email}
                onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-orange-900 transition-colors"
                placeholder="your@email.com"
              />
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-neutral-800 p-3 rounded-lg border border-neutral-700">
              <Phone className="w-5 h-5 text-orange-900" />
            </div>
            <div className="flex-1">
              <label htmlFor="phone" className="block text-sm font-medium text-white mb-2">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                value={contactInfo.phone}
                onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-orange-900 transition-colors"
                placeholder="+1 (555) 000-0000"
              />
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-neutral-800 p-3 rounded-lg border border-neutral-700">
              <MapPin className="w-5 h-5 text-orange-900" />
            </div>
            <div className="flex-1">
              <label htmlFor="location" className="block text-sm font-medium text-white mb-2">
                Location
              </label>
              <input
                type="text"
                id="location"
                value={contactInfo.location}
                onChange={(e) => setContactInfo({ ...contactInfo, location: e.target.value })}
                className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-orange-900 transition-colors"
                placeholder="City, Country"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 bg-orange-900 hover:bg-orange-800 text-white rounded-lg font-medium transition-colors"
            >
              Save Contact Info
            </button>
          </div>
        </form>
      </div>

      {/* Social Links */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Social Links</h2>
          <button
            onClick={() => setSocialLinks([...socialLinks, { name: "", url: "", image: "" }])}
            className="bg-orange-900 hover:bg-orange-800 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Link</span>
          </button>
        </div>

        <form onSubmit={handleSocialSubmit} className="space-y-4">
          {socialLinks.map((social, index) => (
            <div key={index} className="space-y-3">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    value={social.name}
                    onChange={(e) => {
                      const updated = [...socialLinks];
                      updated[index].name = e.target.value;
                      setSocialLinks(updated);
                    }}
                    className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-orange-900 transition-colors"
                    placeholder="Platform name (e.g., GitHub)"
                  />
                </div>
                <div className="flex-1">
                  <input
                    type="url"
                    value={social.url}
                    onChange={(e) => {
                      const updated = [...socialLinks];
                      updated[index].url = e.target.value;
                      setSocialLinks(updated);
                    }}
                    className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-orange-900 transition-colors"
                    placeholder="https://..."
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setSocialLinks(socialLinks.filter((_, i) => i !== index))}
                  className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div>
                <input
                  type="url"
                  value={social.image}
                  onChange={(e) => {
                    const updated = [...socialLinks];
                    updated[index].image = e.target.value;
                    setSocialLinks(updated);
                  }}
                  className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-orange-900 transition-colors"
                  placeholder="Icon image URL (optional)"
                />
              </div>
            </div>
          ))}

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="px-6 py-2.5 bg-orange-900 hover:bg-orange-800 text-white rounded-lg font-medium transition-colors"
            >
              Save Social Links
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminContact;
