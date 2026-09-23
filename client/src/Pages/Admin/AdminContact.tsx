import { useState, useEffect } from "react";
import { Plus, Trash2, Mail, Phone, MapPin } from "lucide-react";
import { contactAPI, socialLinksAPI, uploadAPI } from "../../config/apiService";
import type { Contact, SocialLink } from "../../types";
import toast from "react-hot-toast";

const AdminContact = () => {
  const [contactInfo, setContactInfo] = useState<Contact | null>(null);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [contactData, socialLinksData] = await Promise.all([
          contactAPI.getContact(),
          socialLinksAPI.getAllSocialLinks()
        ]);
        setContactInfo(contactData);
        setSocialLinks(socialLinksData);
      } catch (err) {
        console.error("Failed to fetch contact data:", err);
        toast.error("Failed to load contact data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactInfo) return;
    setIsSaving(true);

    try {
      await contactAPI.updateContact(contactInfo);
      toast.success("Contact information updated successfully!");
    } catch (err) {
      console.error("Failed to save contact info:", err);
      toast.error("Failed to update contact information");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSocialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      // Delete all existing social links and create new ones
      for (const link of socialLinks) {
        if (link.id) {
          await socialLinksAPI.updateSocialLink(link.id, link);
        } else if (link.name && link.url) {
          await socialLinksAPI.createSocialLink(link);
        }
      }
      toast.success("Social links updated successfully!");
    } catch (err) {
      console.error("Failed to save social links:", err);
      toast.error("Failed to update social links");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSocialImageUpload = async (index: number, file: File) => {
    setIsUploading(index);
    try {
      const result = await uploadAPI.uploadSingle(file);
      const updated = [...socialLinks];
      updated[index].image = result.url;
      setSocialLinks(updated);
      toast.success("Image uploaded successfully");
    } catch (err) {
      console.error("Failed to upload image:", err);
      toast.error("Failed to upload image");
    } finally {
      setIsUploading(null);
    }
  };

  const handleDeleteSocialLink = async (id: string) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-2">
          <p className="text-white">Are you sure you want to delete this social link?</p>
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-3 py-1.5 bg-neutral-700 hover:bg-neutral-600 text-white rounded-lg text-sm transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={async () => {
                toast.dismiss(t.id);
                try {
                  await socialLinksAPI.deleteSocialLink(id);
                  setSocialLinks(socialLinks.filter(s => s.id !== id));
                  toast.success("Social link deleted successfully");
                } catch (err) {
                  console.error("Failed to delete social link:", err);
                  toast.error("Failed to delete social link");
                }
              }}
              className="px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white rounded-lg text-sm transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      ),
      {
        duration: Infinity,
        style: {
          background: '#1a1a1a',
          border: '1px solid #333',
          borderRadius: '12px',
          padding: '16px',
        },
      }
    );
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
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="inline-block w-8 h-8 border-2 border-orange-700 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : contactInfo ? (
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
                disabled={isSaving}
                className="px-6 py-2.5 bg-orange-900 hover:bg-orange-800 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? "Saving..." : "Save Contact Info"}
              </button>
            </div>
          </form>
        ) : null}
      </div>

      {/* Social Links */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Social Links</h2>
          <button
            onClick={() => setSocialLinks([...socialLinks, { id: "", name: "", url: "", image: "", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }])}
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
                  onClick={() => socialLinks[index].id ? handleDeleteSocialLink(socialLinks[index].id!) : setSocialLinks(socialLinks.filter((_, i) => i !== index))}
                  className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleSocialImageUpload(index, file);
                  }}
                  disabled={isUploading === index}
                  className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-orange-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                />
                {isUploading === index && (
                  <p className="text-sm text-orange-900 mt-2">Uploading image...</p>
                )}
                {social.image && (
                  <div className="mt-3">
                    <img
                      src={social.image}
                      alt={`${social.name} icon`}
                      className="w-8 h-8 object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={isSaving || isUploading !== null}
              className="px-6 py-2.5 bg-orange-900 hover:bg-orange-800 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? "Saving..." : isUploading !== null ? "Uploading..." : "Save Social Links"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminContact;
