import React, { useState, useEffect } from 'react';
import { db, uploadImageToStorage } from "@/src/lib/firebase";
import { doc, getDoc, setDoc, collection, getDocs, addDoc } from 'firebase/firestore';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/src/components/ui/card';
import { 
  CheckCircle2, 
  AlertCircle, 
  UploadCloud, 
  Image as ImageIcon, 
  Save, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Stethoscope, 
  Sparkles,
  RefreshCw,
  Eye
} from 'lucide-react';
import { SiteSettings, defaultSiteSettings } from '@/src/hooks/useAppContent';
import heroDoctorImg from '@/src/assets/hero-doctor.png';

export default function AdminContentManager() {
  const [settings, setSettings] = useState<SiteSettings>(defaultSiteSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingHero, setUploadingHero] = useState(false);
  const [uploadingDoctor, setUploadingDoctor] = useState(false);
  const [heroUploadProgress, setHeroUploadProgress] = useState(0);
  const [doctorUploadProgress, setDoctorUploadProgress] = useState(0);
  const [activeTab, setActiveTab] = useState<'hero' | 'doctor' | 'contact' | 'stats' | 'seed'>('hero');
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  useEffect(() => {
    async function loadSettings() {
      try {
        const docRef = doc(db, 'siteSettings', 'homepage');
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          setSettings({ ...defaultSiteSettings, ...snap.data() as Partial<SiteSettings> });
        }
      } catch (err) {
        console.error("Error loading site settings:", err);
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setStatus(null);
    try {
      const docRef = doc(db, 'siteSettings', 'homepage');
      await setDoc(docRef, {
        ...settings,
        updatedAt: Date.now()
      }, { merge: true });
      setStatus({ type: 'success', message: 'All website changes and images saved successfully! Live website has been updated.' });
    } catch (error: any) {
      console.error("Save error:", error);
      setStatus({ type: 'error', message: error?.message || 'Failed to save changes.' });
    } finally {
      setSaving(false);
    }
  };

  const handleHeroImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingHero(true);
    setHeroUploadProgress(0);
    setStatus(null);

    try {
      const downloadUrl = await uploadImageToStorage(file, 'hero-banners', (percent) => {
        setHeroUploadProgress(percent);
      });
      setSettings(prev => ({ ...prev, heroImageUrl: downloadUrl }));
      setStatus({ type: 'success', message: 'Hero image uploaded to Firebase Storage! Click "Save Changes" to apply.' });
    } catch (err: any) {
      console.error(err);
      setStatus({ type: 'error', message: 'Failed to upload hero image: ' + (err?.message || 'Unknown error') });
    } finally {
      setUploadingHero(false);
    }
  };

  const handleDoctorImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingDoctor(true);
    setDoctorUploadProgress(0);
    setStatus(null);

    try {
      const downloadUrl = await uploadImageToStorage(file, 'doctor-photos', (percent) => {
        setDoctorUploadProgress(percent);
      });
      setSettings(prev => ({ ...prev, doctorImageUrl: downloadUrl }));
      setStatus({ type: 'success', message: 'Doctor photo uploaded to Firebase Storage! Click "Save Changes" to apply.' });
    } catch (err: any) {
      console.error(err);
      setStatus({ type: 'error', message: 'Failed to upload doctor photo: ' + (err?.message || 'Unknown error') });
    } finally {
      setUploadingDoctor(false);
    }
  };

  const seedDemoData = async () => {
    setSaving(true);
    setStatus(null);
    try {
      const servicesSnap = await getDocs(collection(db, 'services'));
      if (!servicesSnap.empty) {
        setStatus({ type: 'error', message: 'Services collection is already populated. Seeding cancelled to avoid duplicate entries.' });
        setSaving(false);
        return;
      }

      const defaultServices = [
        {
          title: 'Home Nursing',
          slug: 'home-nursing',
          category: 'Clinical Care',
          shortDescription: 'Professional nursing support at home.',
          description: 'Our certified nurses provide comprehensive care at home, including medication administration, vital signs monitoring, and post-operative recovery support.',
          icon: 'heartpulse',
          isActive: true,
          aliases: ['nurse', 'nursing', 'injection', 'wound'],
          createdAt: Date.now(),
          updatedAt: Date.now()
        },
        {
          title: 'Physiotherapy',
          slug: 'physiotherapy',
          category: 'Recovery & Rehabilitation',
          shortDescription: 'Mobility, rehabilitation and recovery support.',
          description: 'Regain mobility, strength, and independence with our in-home physiotherapy.',
          icon: 'activity',
          isActive: true,
          aliases: ['physio', 'physical therapy', 'rehab'],
          createdAt: Date.now(),
          updatedAt: Date.now()
        },
        {
          title: 'Doctor Visit at Home',
          slug: 'doctor-visit',
          category: 'Clinical Care',
          shortDescription: 'Doctor visits/follow-up consultations.',
          description: 'Avoid crowded waiting rooms with our home doctor visits. Ideal for routine checkups and chronic disease management.',
          icon: 'stethoscope',
          isActive: true,
          aliases: ['doctor', 'consultation'],
          createdAt: Date.now(),
          updatedAt: Date.now()
        },
        {
          title: 'Home Sample Collection',
          slug: 'diagnostics',
          category: 'Diagnostics',
          shortDescription: 'Convenient diagnostic sample collection.',
          description: 'Safe, hygienic, and timely diagnostic sample collection from your home.',
          icon: 'usercheck',
          isActive: true,
          aliases: ['blood test', 'lab', 'sample'],
          createdAt: Date.now(),
          updatedAt: Date.now()
        }
      ];

      for (const srv of defaultServices) {
        await addDoc(collection(db, 'services'), srv);
      }

      // Seed Site Settings
      await setDoc(doc(db, 'siteSettings', 'homepage'), {
        ...defaultSiteSettings,
        updatedAt: Date.now()
      });

      setStatus({ type: 'success', message: 'Demo data and website settings successfully initialized in Firebase!' });
    } catch (err: any) {
      console.error(err);
      setStatus({ type: 'error', message: err?.message || 'Failed to seed data.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <RefreshCw className="h-8 w-8 animate-spin text-teal-600" />
          <p className="text-sm font-medium text-slate-500">Loading website settings from Firestore...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 font-sans pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Website Content & Settings</h1>
          <p className="text-slate-500 mt-1">
            Update homepage text, doctor photos, contact numbers, and images stored in Firebase.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <Eye size={16} /> View Live Site
          </a>
          <Button
            onClick={handleSave}
            disabled={saving}
            className="bg-teal-600 hover:bg-teal-700 text-white font-bold px-6 shadow-md shadow-teal-600/20"
          >
            {saving ? (
              <>
                <RefreshCw size={16} className="mr-2 animate-spin" /> Saving...
              </>
            ) : (
              <>
                <Save size={16} className="mr-2" /> Save All Changes
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Status Banner */}
      {status && (
        <div className={`p-4 rounded-xl border flex items-center gap-3 ${status.type === 'success' ? 'bg-teal-50 border-teal-200 text-teal-900' : 'bg-red-50 border-red-200 text-red-900'}`}>
          {status.type === 'success' ? <CheckCircle2 size={22} className="text-teal-600 shrink-0" /> : <AlertCircle size={22} className="text-red-600 shrink-0" />}
          <span className="text-sm font-semibold">{status.message}</span>
        </div>
      )}

      {/* Tabs Navigation */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2">
        {[
          { id: 'hero', label: 'Homepage Hero & Images', icon: Sparkles },
          { id: 'doctor', label: 'Doctor & Specialist Profile', icon: Stethoscope },
          { id: 'contact', label: 'Contact & Clinic Info', icon: Phone },
          { id: 'stats', label: 'Trust & Key Metrics', icon: CheckCircle2 },
          { id: 'seed', label: 'Demo Data Tool', icon: RefreshCw },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all ${
                isActive
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Icon size={16} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: HERO & MAIN IMAGERY */}
      {activeTab === 'hero' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Homepage Hero Content</CardTitle>
                <CardDescription>
                  Modify the main banner headline, sub-headline, trust badge, and image.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Hero Trust Badge</label>
                  <Input
                    value={settings.heroBadge}
                    onChange={(e) => setSettings({ ...settings, heroBadge: e.target.value })}
                    placeholder="e.g. Trusted Healthcare Providers"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Hero Main Headline</label>
                  <Input
                    value={settings.heroTitle}
                    onChange={(e) => setSettings({ ...settings, heroTitle: e.target.value })}
                    placeholder="e.g. Professional care, with compassion."
                  />
                  <p className="text-xs text-slate-400">Use a comma to format the secondary line highlight.</p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Hero Subtitle / Description</label>
                  <textarea
                    rows={3}
                    value={settings.heroSubtitle}
                    onChange={(e) => setSettings({ ...settings, heroSubtitle: e.target.value })}
                    className="w-full rounded-md border border-slate-300 p-3 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                    placeholder="We bring hospital-quality medical support..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Hero Image URL</label>
                  <Input
                    value={settings.heroImageUrl}
                    onChange={(e) => setSettings({ ...settings, heroImageUrl: e.target.value })}
                    placeholder="https://... or /hero-doctor.png"
                  />
                  <p className="text-xs text-slate-400">You can paste any image URL or use the uploader below to upload directly to Firebase Storage.</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UploadCloud size={20} className="text-teal-600" /> Upload New Hero Image to Firebase Storage
                </CardTitle>
                <CardDescription>
                  Upload any JPG, PNG, or WebP photo. It will automatically upload to Firebase Storage with a cache-busting timestamp so changes reflect immediately.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-slate-300 hover:border-teal-500 rounded-xl p-8 text-center transition-colors">
                  <ImageIcon className="mx-auto h-12 w-12 text-slate-400 mb-3" />
                  <div className="text-sm font-medium text-slate-700 mb-1">
                    Select a photo from your computer
                  </div>
                  <p className="text-xs text-slate-500 mb-4">Recommended: 1200x1200px or portrait orientation (PNG, JPG, WebP)</p>
                  
                  <label className="inline-flex cursor-pointer items-center justify-center rounded-lg bg-teal-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-teal-700 transition-colors">
                    {uploadingHero ? `Uploading (${heroUploadProgress}%)...` : 'Choose File to Upload'}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleHeroImageUpload}
                      disabled={uploadingHero}
                      className="hidden"
                    />
                  </label>

                  {uploadingHero && (
                    <div className="mt-4 w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-teal-600 h-2 transition-all duration-300"
                        style={{ width: `${heroUploadProgress}%` }}
                      ></div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Live Preview Side Box */}
          <div>
            <Card className="sticky top-6 border-slate-200 shadow-md overflow-hidden">
              <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 text-xs font-bold text-slate-300 uppercase tracking-wider">
                Hero Image Preview
              </div>
              <CardContent className="p-4 bg-slate-950">
                <div className="relative rounded-xl overflow-hidden border border-slate-800 shadow-lg aspect-[4/5] bg-slate-900 flex items-center justify-center">
                  <img
                    src={settings.heroImageUrl && settings.heroImageUrl.startsWith('http') ? settings.heroImageUrl : heroDoctorImg}
                    alt="Hero Preview"
                    className="w-full h-full object-cover object-top"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-md rounded-lg p-3 border border-slate-700">
                    <p className="text-xs font-bold text-teal-400">{settings.doctorBadge || "Patient-First Approach"}</p>
                    <p className="text-sm font-semibold text-white truncate">{settings.doctorName || "Senior Healthcare Staff"}</p>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <p className="text-xs text-slate-400">Preview of what appears on the homepage.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* TAB 2: DOCTOR & SPECIALIST PROFILE */}
      {activeTab === 'doctor' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Featured Doctor / Specialist Information</CardTitle>
                <CardDescription>
                  Configure the primary physician details displayed across the homepage and trust sections.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Doctor / Physician Name</label>
                    <Input
                      value={settings.doctorName}
                      onChange={(e) => setSettings({ ...settings, doctorName: e.target.value })}
                      placeholder="e.g. Dr. Ananya Sharma"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Designation / Title</label>
                    <Input
                      value={settings.doctorTitle}
                      onChange={(e) => setSettings({ ...settings, doctorTitle: e.target.value })}
                      placeholder="e.g. Chief Medical Officer"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Trust Badge Label</label>
                  <Input
                    value={settings.doctorBadge}
                    onChange={(e) => setSettings({ ...settings, doctorBadge: e.target.value })}
                    placeholder="e.g. Patient-First Approach"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Doctor Photo URL</label>
                  <Input
                    value={settings.doctorImageUrl}
                    onChange={(e) => setSettings({ ...settings, doctorImageUrl: e.target.value })}
                    placeholder="https://... or /hero-doctor.png"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UploadCloud size={20} className="text-teal-600" /> Upload Specialist Photo to Firebase Storage
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-slate-300 hover:border-teal-500 rounded-xl p-8 text-center transition-colors">
                  <ImageIcon className="mx-auto h-12 w-12 text-slate-400 mb-3" />
                  <label className="inline-flex cursor-pointer items-center justify-center rounded-lg bg-teal-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-teal-700 transition-colors">
                    {uploadingDoctor ? `Uploading (${doctorUploadProgress}%)...` : 'Upload Doctor Photo'}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleDoctorImageUpload}
                      disabled={uploadingDoctor}
                      className="hidden"
                    />
                  </label>
                  {uploadingDoctor && (
                    <div className="mt-4 w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-teal-600 h-2 transition-all duration-300"
                        style={{ width: `${doctorUploadProgress}%` }}
                      ></div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="sticky top-6 border-slate-200 shadow-md overflow-hidden">
              <div className="bg-slate-100 px-4 py-3 border-b border-slate-200 text-xs font-bold text-slate-700 uppercase tracking-wider">
                Specialist Card Preview
              </div>
              <CardContent className="p-6 text-center space-y-4">
                <div className="mx-auto h-32 w-32 rounded-full overflow-hidden border-4 border-teal-500/20 shadow-md">
                  <img
                    src={settings.doctorImageUrl && settings.doctorImageUrl.startsWith('http') ? settings.doctorImageUrl : heroDoctorImg}
                    alt="Doctor Preview"
                    className="h-full w-full object-cover object-top"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900">{settings.doctorName || "Physician"}</h4>
                  <p className="text-sm text-teal-600 font-medium">{settings.doctorTitle || "Specialist"}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* TAB 3: CONTACT & CLINIC INFO */}
      {activeTab === 'contact' && (
        <Card>
          <CardHeader>
            <CardTitle>Contact Information & Operating Details</CardTitle>
            <CardDescription>
              These details appear in the header navigation, footer, contact pages, and emergency banners.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <Phone size={16} className="text-teal-600" /> Primary Phone Number
                </label>
                <Input
                  value={settings.phone}
                  onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                  placeholder="+91 800-14-800-75"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <Phone size={16} className="text-red-500" /> 24/7 Emergency Line
                </label>
                <Input
                  value={settings.emergencyPhone}
                  onChange={(e) => setSettings({ ...settings, emergencyPhone: e.target.value })}
                  placeholder="+91 999-90-888-00"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <Mail size={16} className="text-teal-600" /> Official Email Address
                </label>
                <Input
                  type="email"
                  value={settings.email}
                  onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                  placeholder="care@silvercare.com"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <Clock size={16} className="text-teal-600" /> Working Hours / Availability
                </label>
                <Input
                  value={settings.workingHours}
                  onChange={(e) => setSettings({ ...settings, workingHours: e.target.value })}
                  placeholder="24/7 Care & Support"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <MapPin size={16} className="text-teal-600" /> Clinic Address / Head Office
              </label>
              <textarea
                rows={3}
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                className="w-full rounded-md border border-slate-300 p-3 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                placeholder="Flat No-60, SF Sector-33, Gurgaon, Haryana 122001"
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* TAB 4: STATS & TRUST METRICS */}
      {activeTab === 'stats' && (
        <Card>
          <CardHeader>
            <CardTitle>Key Metrics & Social Proof</CardTitle>
            <CardDescription>
              Statistics displayed in the trust bars, hero counters, and about section.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Years of Experience</label>
                <Input
                  value={settings.experienceYears}
                  onChange={(e) => setSettings({ ...settings, experienceYears: e.target.value })}
                  placeholder="15+"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Happy Patients Served</label>
                <Input
                  value={settings.happyPatients}
                  onChange={(e) => setSettings({ ...settings, happyPatients: e.target.value })}
                  placeholder="10,000+"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Verified Healthcare Staff</label>
                <Input
                  value={settings.verifiedStaff}
                  onChange={(e) => setSettings({ ...settings, verifiedStaff: e.target.value })}
                  placeholder="100%"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* TAB 5: DEMO DATA SEEDING */}
      {activeTab === 'seed' && (
        <Card>
          <CardHeader>
            <CardTitle>Database Management & Initialization</CardTitle>
            <CardDescription>
              Populate empty Firestore collections with default services and test data.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-slate-600 leading-relaxed">
              If your database is brand new or services are missing, you can click the button below to initialize default healthcare services, testimonials, and site settings.
            </p>
            <Button
              onClick={seedDemoData}
              disabled={saving}
              className="bg-slate-900 hover:bg-slate-800 text-white font-semibold"
            >
              {saving ? "Seeding..." : "Initialize Default Content"}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

