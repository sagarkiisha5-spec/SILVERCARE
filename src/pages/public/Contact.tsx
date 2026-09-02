import React, { useState } from "react";
import { Mail, MapPin, Phone, Clock, Send, CheckCircle2, MessageSquare, PhoneCall, Sparkles } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import SEO from "@/src/components/seo/SEO";
import { useAppContent } from "@/src/hooks/useAppContent";

import { submitServiceRequest } from "@/src/lib/requestManager";

export default function Contact() {
  const { siteSettings } = useAppContent();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "Nursing & Attendant Care",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    try {
      await submitServiceRequest({
        patientName: formData.name,
        phone: formData.phone,
        email: formData.email,
        city: "Delhi NCR",
        careType: formData.service,
        message: formData.message,
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setError("Failed to submit request. Please try again or call hotline.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const phone = siteSettings.phone || "+91 800-14-800-75";
  const rawPhone = phone.replace(/[^0-9+]/g, '');
  const email = siteSettings.email || "care@silvercareindia.com";
  const address = siteSettings.address || "Flat No-60, SF Sector-33, Gurgaon, Haryana, India 122001";
  const whatsappNumber = "918001480075";

  return (
    <>
      <SEO 
        title="Contact Us | SilverCare India" 
        description="Get in touch with SilverCare India for home nursing, doctor visits, physiotherapy, lab tests, and senior companionship across North India."
      />

      <div className="bg-slate-50 min-h-screen font-sans">
        
        {/* HERO HEADER */}
        <section className="relative bg-[linear-gradient(135deg,#0F172A_0%,#1E1B4B_50%,#3B0764_100%)] text-white py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1.5px, transparent 1.5px)', backgroundSize: '28px 28px' }}></div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 text-xs sm:text-sm font-semibold text-purple-200 mb-6">
              <Sparkles size={14} className="text-[#D946EF]" />
              24/7 Home Healthcare Coordination
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tight">
              Contact <span className="bg-clip-text text-transparent bg-[linear-gradient(90deg,#FF6B9B,#D946EF,#9D4EDD)]">SilverCare</span> India
            </h1>

            <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto">
              Have questions about home healthcare or eldercare services? Our clinical coordinators are available 24/7 to assist you.
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
            
            {/* CONTACT INFO CARDS */}
            <div className="lg:col-span-1 space-y-6">
              
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="h-12 w-12 rounded-2xl bg-purple-100 flex items-center justify-center text-[#7B2CBF] mb-4">
                  <Phone size={24} />
                </div>
                <h3 className="font-extrabold text-slate-900 text-lg mb-1">Direct Phone Contact</h3>

                <a href={`tel:${rawPhone}`} className="text-[#7B2CBF] font-extrabold text-lg hover:underline block mb-1">{phone}</a>
                <span className="text-xs text-slate-500 font-medium block">Available 24 Hours / 7 Days a week</span>
              </div>

              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="h-12 w-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600 mb-4">
                  <MessageSquare size={24} />
                </div>
                <h3 className="font-extrabold text-slate-900 text-lg mb-1">WhatsApp Chat</h3>
                <p className="text-slate-500 text-xs mb-4">Instant chat with our care team.</p>
                <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer">
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-11 rounded-xl text-xs flex items-center justify-center gap-2">
                    <MessageSquare size={16} /> Open WhatsApp Chat
                  </Button>
                </a>
              </div>

              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="h-12 w-12 rounded-2xl bg-purple-100 flex items-center justify-center text-[#7B2CBF] mb-4">
                  <Mail size={24} />
                </div>
                <h3 className="font-extrabold text-slate-900 text-lg mb-1">Email Us</h3>
                <a href={`mailto:${email}`} className="text-[#7B2CBF] font-bold hover:underline block text-sm mb-1">{email}</a>
                <span className="text-xs text-slate-500 font-medium block">Fast response within 1 hour</span>
              </div>

              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="h-12 w-12 rounded-2xl bg-purple-100 flex items-center justify-center text-[#7B2CBF] mb-4">
                  <MapPin size={24} />
                </div>
                <h3 className="font-extrabold text-slate-900 text-lg mb-1">Gurgaon Office</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{address}</p>
              </div>

            </div>

            {/* CONTACT FORM */}
            <div className="lg:col-span-2">
              <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-md">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17345E] mb-2">Request a Call Back</h2>
                <p className="text-slate-600 mb-8 text-sm">Fill in your details below. Our senior healthcare manager will call you back within 15 minutes.</p>

                {submitted ? (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-8 sm:p-12 text-center">
                    <div className="h-16 w-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
                      <CheckCircle2 size={36} />
                    </div>
                    <h3 className="text-2xl font-extrabold text-slate-900 mb-2">Thank You!</h3>
                    <p className="text-slate-600 text-base leading-relaxed">
                      Your callback request has been received. Our SilverCare clinical manager will contact you shortly on <strong className="text-slate-900">{formData.phone}</strong>.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Your Name *</label>
                        <Input 
                          required 
                          type="text" 
                          placeholder="e.g. Rajesh Sharma" 
                          value={formData.name}
                          onChange={e => setFormData({ ...formData, name: e.target.value })}
                          className="h-12 border-slate-200 rounded-xl text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Phone Number *</label>
                        <Input 
                          required 
                          type="tel" 
                          placeholder="e.g. +91 98765 43210" 
                          value={formData.phone}
                          onChange={e => setFormData({ ...formData, phone: e.target.value })}
                          className="h-12 border-slate-200 rounded-xl text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Email Address</label>
                        <Input 
                          type="email" 
                          placeholder="your.email@example.com" 
                          value={formData.email}
                          onChange={e => setFormData({ ...formData, email: e.target.value })}
                          className="h-12 border-slate-200 rounded-xl text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Service Needed</label>
                        <select 
                          value={formData.service}
                          onChange={e => setFormData({ ...formData, service: e.target.value })}
                          className="w-full h-12 border border-slate-200 rounded-xl px-3 bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#7B2CBF]"
                        >
                          <option value="Nursing & Attendant Care">Nursing & Attendant Care</option>
                          <option value="Doctor Visit at Home">Doctor Visit at Home</option>
                          <option value="Physiotherapy at Home">Physiotherapy at Home</option>
                          <option value="Pathology & Diagnostics">Pathology & Diagnostics</option>
                          <option value="Telemedicine">Telemedicine</option>
                          <option value="Medical Equipment">Medical Equipment Rental</option>
                          <option value="Daycare & Companionship">Daycare & Companionship</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Message or Care Requirements</label>
                      <textarea 
                        rows={4}
                        placeholder="Tell us about the patient's condition or specific needs..."
                        value={formData.message}
                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                        className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#7B2CBF]"
                      />
                    </div>

                    {error && (
                      <p className="text-xs font-semibold text-red-500">{error}</p>
                    )}

                    <Button type="submit" disabled={isSubmitting} size="lg" className="w-full bg-[linear-gradient(90deg,#7B2CBF,#9D4EDD)] hover:opacity-95 text-white font-extrabold h-14 text-base rounded-xl shadow-xl border-0 flex items-center justify-center gap-2">
                      <Send size={18} /> {isSubmitting ? "Submitting..." : "Request Call Back Now"}
                    </Button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>

      </div>
    </>
  );
}
