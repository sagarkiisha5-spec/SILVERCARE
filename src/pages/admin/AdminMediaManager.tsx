import { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/src/lib/firebase";
import { Image, Upload, CheckCircle2, Phone, Mail, MapPin, Sparkles, Globe, RefreshCw, Save } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";

export default function AdminMediaManager() {
  const [settings, setSettings] = useState({
    logoUrl: "/logo.svg",
    brandName: "SilverCare India",
    hindiTagline: "Rakhe Aapke Apno Ka Khyal",
    mainTagline: "Professional care, with compassion.",
    subTagline: "Professional eldercare services delivered at home across North India. From nursing care to doctor visits, we bring comprehensive healthcare to your loved ones.",
    heroDoctorImageUrl: "/hero-doctor.png",
    ceoName: "Navin Chauhan",
    ceoTitle: "CEO & Founder, SilverCare India",
    ceoPhotoUrl: "https://silvercareindia.com/wp-content/uploads/2025/12/Navin.png",
    helplinePhone: "+91 800-14-800-75",
    whatsappNumber: "+918001480075",
    supportEmail: "care@silvercareindia.com",
    gurgaonAddress: "Flat No-60, SF Sector-33, Gurgaon, Haryana, India 122001",
  });

  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  useEffect(() => {
    getDoc(doc(db, "settings", "site_settings")).then((snap) => {
      if (snap.exists()) {
        setSettings((prev) => ({ ...prev, ...(snap.data() as any) }));
      }
    }).catch((err) => console.warn("Using local settings state fallback:", err));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaveMessage("");

    try {
      await setDoc(doc(db, "settings", "site_settings"), {
        ...settings,
        updatedAt: Date.now(),
      });
      setSaveMessage("Website Media, Logo & Branding Settings saved successfully!");
    } catch (err) {
      console.warn("Saved settings to local memory fallback:", err);
      setSaveMessage("Settings updated in local session!");
    } finally {
      setSaving(false);
      setTimeout(() => setSaveMessage(""), 4000);
    }
  };

  return (
    <div className="space-y-8 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Logo, Media & Branding Asset Manager</h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage company logo, doctor photo URLs, hero banners, 24/7 helpline & contact details.
          </p>
        </div>
        <Button
          onClick={handleSave}
          disabled={saving}
          className="bg-[#7B2CBF] hover:bg-[#6A24A6] text-white font-bold shadow-sm flex items-center gap-2"
        >
          <Save size={18} /> {saving ? "Saving Changes..." : "Save All Media Settings"}
        </Button>
      </div>

      {saveMessage && (
        <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-sm text-emerald-800 font-semibold flex items-center gap-2">
          <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
          <span>{saveMessage}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        {/* Section 1: Logo & Brand Identity */}
        <Card className="border border-slate-200/80 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Globe className="text-[#7B2CBF]" size={20} /> Brand Identity & Logo Settings
            </CardTitle>
            <CardDescription className="text-xs text-slate-500">
              Configure company name, slogan in Hindi/English, and main logo graphic.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase">Company Name</label>
                <Input
                  value={settings.brandName}
                  onChange={(e) => setSettings({ ...settings, brandName: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase">Hindi Motto / Tagline</label>
                <Input
                  value={settings.hindiTagline}
                  onChange={(e) => setSettings({ ...settings, hindiTagline: e.target.value })}
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 uppercase">Main English Hero Headline</label>
              <Input
                value={settings.mainTagline}
                onChange={(e) => setSettings({ ...settings, mainTagline: e.target.value })}
                className="mt-1"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 uppercase">Hero Subtitle Paragraph</label>
              <textarea
                value={settings.subTagline}
                onChange={(e) => setSettings({ ...settings, subTagline: e.target.value })}
                rows={2}
                className="w-full mt-1 rounded-md border border-slate-200 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#7B2CBF]"
              />
            </div>
          </CardContent>
        </Card>

        {/* Section 2: Media Assets & Photo URLs */}
        <Card className="border border-slate-200/80 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Image className="text-[#7B2CBF]" size={20} /> Website Photos & Media Assets
            </CardTitle>
            <CardDescription className="text-xs text-slate-500">
              Manage hero banner image URLs and CEO leadership photo graphics.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Hero Doctor Graphic */}
              <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-slate-700">Hero Doctor Photo</span>
                  <span className="text-[11px] font-semibold text-[#7B2CBF]">Active Graphic</span>
                </div>
                <div className="flex items-center gap-4">
                  <img
                    src={settings.heroDoctorImageUrl}
                    alt="Hero Preview"
                    className="h-20 w-20 rounded-xl object-cover border border-purple-100 shadow-sm bg-white"
                    onError={(e) => { (e.target as any).src = "/hero-doctor.png"; }}
                  />
                  <div className="flex-1">
                    <label className="text-[11px] font-bold text-slate-600 uppercase">Image Path / URL</label>
                    <Input
                      value={settings.heroDoctorImageUrl}
                      onChange={(e) => setSettings({ ...settings, heroDoctorImageUrl: e.target.value })}
                      className="mt-1 text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* CEO Photo Graphic */}
              <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-slate-700">CEO & Founder Photo</span>
                  <span className="text-[11px] font-semibold text-emerald-600">Verified</span>
                </div>
                <div className="flex items-center gap-4">
                  <img
                    src={settings.ceoPhotoUrl}
                    alt="CEO Preview"
                    className="h-20 w-20 rounded-xl object-cover border border-purple-100 shadow-sm bg-white"
                    onError={(e) => { (e.target as any).src = "https://silvercareindia.com/wp-content/uploads/2025/12/Navin.png"; }}
                  />
                  <div className="flex-1 space-y-2">
                    <div>
                      <label className="text-[11px] font-bold text-slate-600 uppercase">CEO Photo URL</label>
                      <Input
                        value={settings.ceoPhotoUrl}
                        onChange={(e) => setSettings({ ...settings, ceoPhotoUrl: e.target.value })}
                        className="mt-0.5 text-xs"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section 3: Contact & 24/7 Helpline Settings */}
        <Card className="border border-slate-200/80 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Phone className="text-emerald-600" size={20} /> 24/7 Emergency Helpline & Contact Info
            </CardTitle>
            <CardDescription className="text-xs text-slate-500">
              Update phone numbers, WhatsApp dispatch, support email, and office location.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase flex items-center gap-1.5">
                  <Phone size={13} className="text-purple-600" /> 24/7 Helpline Phone
                </label>
                <Input
                  value={settings.helplinePhone}
                  onChange={(e) => setSettings({ ...settings, helplinePhone: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase flex items-center gap-1.5">
                  <Phone size={13} className="text-emerald-600" /> WhatsApp Number
                </label>
                <Input
                  value={settings.whatsappNumber}
                  onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase flex items-center gap-1.5">
                  <Mail size={13} className="text-blue-600" /> Support Email
                </label>
                <Input
                  value={settings.supportEmail}
                  onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 uppercase flex items-center gap-1.5">
                <MapPin size={13} className="text-red-500" /> Gurgaon HQ Office Address
              </label>
              <Input
                value={settings.gurgaonAddress}
                onChange={(e) => setSettings({ ...settings, gurgaonAddress: e.target.value })}
                className="mt-1"
              />
            </div>
          </CardContent>
        </Card>

        {/* Submit Bar */}
        <div className="flex items-center justify-end gap-4 pt-2">
          <Button
            type="submit"
            disabled={saving}
            className="bg-[#7B2CBF] hover:bg-[#6A24A6] text-white font-bold h-11 px-8 shadow-md"
          >
            <Save size={18} className="mr-2" /> {saving ? "Saving Changes..." : "Save Website Media & Content"}
          </Button>
        </div>
      </form>
    </div>
  );
}
