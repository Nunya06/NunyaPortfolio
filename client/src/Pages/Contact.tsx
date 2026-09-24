import { useState, useEffect } from "react";

import { Mail, Phone, MapPin } from "lucide-react";

import { contactAPI, socialLinksAPI, messagesAPI } from "../config/apiService";

import type { Contact, SocialLink } from "../types";

import toast from "react-hot-toast";



const Contact = () => {

  const [formData, setFormData] = useState({

    name: "",

    email: "",

    subject: "",

    message: "",

  });

  const [contact, setContact] = useState<Contact | null>(null);

  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);

  const [isSubmitting, setIsSubmitting] = useState(false);



  useEffect(() => {

    const fetchData = async () => {

      try {

        const [contactData, socialLinksData] = await Promise.all([

          contactAPI.getContact(),

          socialLinksAPI.getAllSocialLinks()

        ]);

        setContact(contactData);

        setSocialLinks(socialLinksData);

      } catch (err) {

        console.error("Failed to fetch contact data:", err);

      }

    };



    fetchData();

  }, []);



  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

    setIsSubmitting(true);



    try {

      await messagesAPI.createMessage(formData);

      toast.success("Message sent successfully!");

      setFormData({ name: "", email: "", subject: "", message: "" });

    } catch (err) {

      console.error("Failed to send message:", err);

      toast.error("Failed to send message. Please try again.");

    } finally {

      setIsSubmitting(false);

    }

  };



  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });

  };



  return (

    <div className="min-h-screen bg-black">

      {/* Hero Section */}

      <div className="relative px-4 md:px-24 lg:px-32 xl:px-40 py-3 md:py-5">

        <div className="w-full h-full min-h-[20vh] flex flex-col items-center justify-center border-x border-dashed border-neutral-800">

          <div className="text-center">

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium text-white mb-6">

              Get In Touch

            </h1>

            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto">

              Have a project in mind or just want to say hello? I'd love to hear from you.

            </p>

          </div>

        </div>

      </div>



      {/* Contact Section */}

      <div className="px-4 md:px-24 lg:px-32 xl:px-40 py-16 border-t border-dashed border-neutral-800">

        <div className="max-w-6xl mx-auto">

          <div className="flex flex-col lg:flex-row gap-12">

            {/* Contact Form */}

            <div className="w-full lg:w-2/3">

              <h2 className="text-3xl font-semibold text-white mb-6">Send a Message</h2>

              <form onSubmit={handleSubmit} className="space-y-6">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  <div>

                    <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">

                      Name

                    </label>

                    <input

                      type="text"

                      id="name"

                      name="name"

                      value={formData.name}

                      onChange={handleChange}

                      required

                      className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-orange-700 transition-colors"

                      placeholder="Your name"

                    />

                  </div>

                  <div>

                    <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">

                      Email

                    </label>

                    <input

                      type="email"

                      id="email"

                      name="email"

                      value={formData.email}

                      onChange={handleChange}

                      required

                      className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-orange-700 transition-colors"

                      placeholder="your@email.com"

                    />

                  </div>

                </div>

                <div>

                  <label htmlFor="subject" className="block text-sm font-medium text-slate-300 mb-2">

                    Subject

                  </label>

                  <input

                    type="text"

                    id="subject"

                    name="subject"

                    value={formData.subject}

                    onChange={handleChange}

                    required

                    className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-orange-700 transition-colors"

                    placeholder="Project inquiry"

                  />

                </div>

                <div>

                  <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">

                    Message

                  </label>

                  <textarea

                    id="message"

                    name="message"

                    value={formData.message}

                    onChange={handleChange}

                    required

                    rows={6}

                    className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-orange-700 transition-colors resize-none"

                    placeholder="Tell me about your project..."

                  />

                </div>

                <button

                  type="submit"

                  disabled={isSubmitting}

                  className="w-full bg-orange-700 hover:bg-orange-800 text-white py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"

                >

                  {isSubmitting ? "Sending..." : "Send Message"}

                </button>

              </form>

            </div>



            {/* Contact Info */}

            <div className="w-full lg:w-1/3">

              <h2 className="text-3xl font-semibold text-white mb-6">Contact Info</h2>

              <div className="space-y-6">

                <div className="flex items-start gap-4">

                  <div className="bg-neutral-900 p-3 rounded-lg border border-neutral-800">

                    <Mail className="w-5 h-5 text-orange-700" />

                  </div>

                  <div>

                    <h3 className="text-white font-medium mb-1">Email</h3>

                    <p className="text-slate-400 text-sm">{contact?.email || "wisdomxorse928@gmail.com"}</p>

                  </div>

                </div>

                <div className="flex items-start gap-4">

                  <div className="bg-neutral-900 p-3 rounded-lg border border-neutral-800">

                    <Phone className="w-5 h-5 text-orange-700" />

                  </div>

                  <div>

                    <h3 className="text-white font-medium mb-1">Phone</h3>

                    <p className="text-slate-400 text-sm">{contact?.phone || "+233 (0) 545-327-593"}</p>

                  </div>

                </div>

                <div className="flex items-start gap-4">

                  <div className="bg-neutral-900 p-3 rounded-lg border border-neutral-800">

                    <MapPin className="w-5 h-5 text-orange-700" />

                  </div>

                  <div>

                    <h3 className="text-white font-medium mb-1">Location</h3>

                    <p className="text-slate-400 text-sm">{contact?.location || "Burma Camp, Ghana"}</p>

                  </div>

                </div>

              </div>



              {/* Social Links */}

              <div className="mt-8">

                <h3 className="text-white font-medium mb-4">Follow Me</h3>

                <div className="flex gap-4">

                  {socialLinks.map((social) => (

                    <a

                      key={social.id}

                      href={social.url}

                      target="_blank"

                      rel="noopener noreferrer"

                      className="bg-neutral-900 p-3 rounded-lg border border-neutral-800 hover:border-orange-700 transition-colors"

                      aria-label={social.name}

                    >

                      <img src={social.image} alt={social.name} className="w-5 h-5" />

                    </a>

                  ))}

                  {socialLinks.length === 0 && (

                    <>

                      <a

                        href="#"

                        className="bg-neutral-900 p-3 rounded-lg border border-neutral-800 hover:border-orange-700 transition-colors"

                        aria-label="GitHub"

                      >

                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">

                          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />

                          <path d="M9 18c-4.51 2-5-2-7-2" />

                        </svg>

                      </a>

                      <a

                        href="#"

                        className="bg-neutral-900 p-3 rounded-lg border border-neutral-800 hover:border-orange-700 transition-colors"

                        aria-label="LinkedIn"

                      >

                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">

                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />

                          <rect width="4" height="12" x="2" y="9" />

                          <circle cx="4" cy="4" r="2" />

                        </svg>

                      </a>

                      <a

                        href="#"

                        className="bg-neutral-900 p-3 rounded-lg border border-neutral-800 hover:border-orange-700 transition-colors"

                        aria-label="Twitter"

                      >

                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">

                          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9-1.5 2 2 2.5 4.5 4 6.5 6 6c-2.8 1.6-2.8 4.5 0 6-1.3 0-2.6-.4-3.7-1.1.1 3.4 2.9 6.1 6.3 6.1-2.6 2-5.8 3.1-9.1 3 2.8 1.8 6 2.8 9.4 2.8 11.4 0 17.6-9.4 17.6-17.6 0-.3 0-.5-.1-.8 2.4-1.7 4.3-3.9 5.6-6.4" />

                        </svg>

                      </a>

                    </>

                  )}

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

};



export default Contact;

