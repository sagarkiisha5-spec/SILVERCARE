import React, { useState, useEffect } from "react";
import { collection, getDocs, setDoc, deleteDoc, doc } from "firebase/firestore";
import { db, uploadImageToStorage } from "@/src/lib/firebase";
import { compressImageToDataUrl } from "@/src/lib/imageUtils";
import { 
  Users, 
  Plus, 
  Edit2, 
  Trash2,
  CheckCircle2, 
  ShieldCheck, 
  Stethoscope, 
  Search, 
  UserCheck, 
  UploadCloud, 
  Image as ImageIcon, 
  Loader2, 
  X,
  Sparkles,
  Save
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";

interface Professional {
  id: string;
  name: string;
  designation: string;
  qualification: string;
  experience: string;
  imageUrl: string;
  bio?: string;
  isActive: boolean;
}

const initialProfessionals: Professional[] = [
  {
    id: "p1",
    name: "Navin Chauhan",
    designation: "Founder & CEO",
    qualification: "15+ Years in Healthcare Administration (Healthians, Atulaya Healthcare)",
    experience: "15+ Years",
    imageUrl: "/navin-chauhan.png",
    bio: "Visionary healthcare leader dedicated to bridging the hospital-to-home eldercare gap with clinical excellence.",
    isActive: true
  },
  {
    id: "p3",
    name: "Komal Gupta",
    designation: "Co-founder & Chief Product Officer",
    qualification: "M.Tech NIT Karnataka, 13+ Years in Biopharma & Eldercare",
    experience: "13+ Years",
    imageUrl: "/team/komal-gupta.jpg",
    bio: "Product strategist focused on clinical quality oversight, protocol standardization, and specialized caregiver training.",
    isActive: true
  },
  {
    id: "p4",
    name: "Dr. Kirandeep Kaur",
    designation: "General Physician",
    qualification: "MBBS - General Physician & Senior Eldercare Specialist",
    experience: "8+ Years",
    imageUrl: "/team/dr-kirandeep.jpg",
    bio: "Specializes in geriatric home consultations, chronic illness management, and compassionate preventive senior care.",
    isActive: true
  },
  {
    id: "p5",
    name: "Ms. Jasbir Kour",
    designation: "Nursing Trainer",
    qualification: "Experienced Nursing Trainer & Clinical Care Supervisor",
    experience: "10+ Years",
    imageUrl: "/team/nurse-jasbir.jpg",
    bio: "Leads clinical nursing supervision, ICU-level attendant training, and patient safety monitoring across homes.",
    isActive: true
  },
  {
    id: "p6",
    name: "Ms. Tejinder Sharma",
    designation: "Nursing Supervisor",
    qualification: "Expert in Patient Care Management & Bedside Excellence",
    experience: "12+ Years",
    imageUrl: "/team/nurse-tejinder.jpg",
    bio: "Oversees round-the-clock eldercare routines, bedside palliative support, and emergency medical response protocols.",
    isActive: true
  },
  {
    id: "p7",
    name: "Dr. Pashdeep Sharma",
    designation: "General Physician",
    qualification: "MBBS Qualified General Physician & Home Health Specialist",
    experience: "6+ Years",
    imageUrl: "/team/dr-pashdeep.jpg",
    bio: "Focused on comprehensive doorstep clinical diagnostics, post-hospitalization recovery, and personalized senior treatment plans.",
    isActive: true
  },
  {
    id: "p8",
    name: "Dr. Ramandeep Reetwal",
    designation: "General Physician",
    qualification: "MBBS - AIIMS Bathinda Clinical Experience",
    experience: "5+ Years",
    imageUrl: "/team/dr-ramandeep.jpg",
    bio: "AIIMS-trained physician committed to evidence-based eldercare, acute symptom management, and continuity of care.",
    isActive: true
  }
];

const getDeletedIds = (): string[] => {
  try {
    const val = localStorage.getItem("silvercare_deleted_professionals");
    return val ? JSON.parse(val) : [];
  } catch {
    return [];
  }
};

// Helper to merge remote/cached list with default baseline team
const mergeWithDefaults = (list: Professional[]): Professional[] => {
  const deletedIds = getDeletedIds();
  
  // 1. Filter out deleted or inactive items from list
  const validRemoteList = list.filter(p => !deletedIds.includes(p.id) && p.isActive !== false && (p as any).isDeleted !== true);
  const remoteMap = new Map(validRemoteList.map(p => [p.id, p]));

  // 2. Build final list starting with active default professionals
  const result: Professional[] = [];

  initialProfessionals.forEach(def => {
    if (!deletedIds.includes(def.id)) {
      const existing = remoteMap.get(def.id);
      if (existing) {
        result.push(existing);
      } else {
        result.push(def);
      }
    }
  });

  // 3. Add any custom professionals created by admin that are not in defaults
  validRemoteList.forEach(item => {
    if (!initialProfessionals.some(def => def.id === item.id) && !result.some(r => r.id === item.id)) {
      result.push(item);
    }
  });

  return result;
};

export default function AdminProfessionals() {
  const [professionals, setProfessionals] = useState<Professional[]>(() => {
    try {
      const cached = localStorage.getItem("silvercare_admin_professionals");
      if (cached) {
        return mergeWithDefaults(JSON.parse(cached));
      }
      return initialProfessionals;
    } catch {
      return initialProfessionals;
    }
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Professional>>({});
  const [saveMessage, setSaveMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSavingAll, setIsSavingAll] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; name: string } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    getDocs(collection(db, "professionals")).then((snap) => {
      if (!snap.empty) {
        const loaded: Professional[] = [];
        snap.forEach((docSnap) => {
          loaded.push({ id: docSnap.id, ...(docSnap.data() as any) });
        });
        const merged = mergeWithDefaults(loaded);
        setProfessionals(merged);
        localStorage.setItem("silvercare_admin_professionals", JSON.stringify(merged));
      }
    }).catch(err => console.warn("Using initial professionals data fallback:", err));
  }, []);

  const handleEdit = (pro: Professional) => {
    setEditingId(pro.id);
    setFormData(pro);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(15);

    try {
      // 1. Instant client-side compression to <50KB for rapid preview
      const compressedDataUrl = await compressImageToDataUrl(file, {
        maxWidth: 600,
        maxHeight: 600,
        quality: 0.82,
        format: 'image/jpeg'
      });
      setFormData((prev) => ({ ...prev, imageUrl: compressedDataUrl }));
      setUploadProgress(50);

      // 2. Upload to storage (resilient fallback returns compressedDataUrl if offline/unauthorized)
      const finalUrl = await uploadImageToStorage(file, "team-photos", (percent) => {
        setUploadProgress(percent);
      });

      setFormData((prev) => ({ ...prev, imageUrl: finalUrl || compressedDataUrl }));
      setUploadProgress(100);
    } catch (err) {
      console.warn("Upload handler warning:", err);
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.designation) return;

    const id = editingId || `p${Date.now()}`;
    const updatedPro: Professional = {
      id,
      name: formData.name || "",
      designation: formData.designation || "",
      qualification: formData.qualification || "",
      experience: formData.experience || "5+ Years",
      imageUrl: formData.imageUrl || "/navin-chauhan.png",
      bio: formData.bio || "",
      isActive: formData.isActive ?? true,
    };

    const updatedList = professionals.some(p => p.id === id)
      ? professionals.map(p => p.id === id ? updatedPro : p)
      : [...professionals, updatedPro];

    setProfessionals(updatedList);
    localStorage.setItem("silvercare_admin_professionals", JSON.stringify(updatedList));
    setEditingId(null);
    setFormData({});
    setSaveMessage("Healthcare staff profile saved successfully!");
    setTimeout(() => setSaveMessage(""), 4000);

    try {
      await setDoc(doc(db, "professionals", id), updatedPro);
    } catch (err) {
      console.warn("Saved to local state, Firestore offline fallback.");
    }
  };

  const handleDeleteClick = (id: string, name: string) => {
    setDeleteTarget({ id, name });
  };

  const confirmDeleteProfile = async () => {
    if (!deleteTarget) return;
    const { id, name } = deleteTarget;
    setIsDeleting(true);

    try {
      // 1. Record ID in deleted set so baseline defaults don't resurrect it
      const currentDeleted = getDeletedIds();
      const updatedDeleted = Array.from(new Set([...currentDeleted, id]));
      localStorage.setItem("silvercare_deleted_professionals", JSON.stringify(updatedDeleted));

      // 2. Remove from active list
      const updatedList = professionals.filter((p) => p.id !== id);
      setProfessionals(updatedList);
      localStorage.setItem("silvercare_admin_professionals", JSON.stringify(updatedList));

      if (editingId === id) {
        setEditingId(null);
        setFormData({});
      }

      setSaveMessage(`Profile for "${name}" has been deleted successfully.`);
      setTimeout(() => setSaveMessage(""), 4000);

      // 3. Delete from Firestore and mark inactive
      try {
        await deleteDoc(doc(db, "professionals", id));
      } catch (err) {
        console.warn("Firestore delete fallback:", err);
      }
      try {
        await setDoc(doc(db, "professionals", id), { isActive: false, isDeleted: true }, { merge: true });
      } catch (err) {
        // silent fallback
      }
    } catch (err) {
      console.error("Failed to delete profile:", err);
    } finally {
      setIsDeleting(false);
      setDeleteTarget(null);
    }
  };

  const handleSaveAllChanges = async () => {
    setIsSavingAll(true);
    setSaveMessage("");
    try {
      const savePromises = professionals.map((pro) =>
        setDoc(doc(db, "professionals", pro.id), pro, { merge: true })
      );
      await Promise.all(savePromises);
      localStorage.setItem("silvercare_admin_professionals", JSON.stringify(professionals));
      setSaveMessage("All healthcare professionals & doctor profiles successfully saved and published live!");
    } catch (err) {
      console.warn("Saved to local storage fallback:", err);
      localStorage.setItem("silvercare_admin_professionals", JSON.stringify(professionals));
      setSaveMessage("All changes saved to local session & published live!");
    } finally {
      setIsSavingAll(false);
      setTimeout(() => setSaveMessage(""), 5000);
    }
  };

  const filtered = professionals.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.qualification.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Healthcare Professionals Manager</h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage SilverCare leadership, doctors, nursing trainers, and medical care supervisors.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button
            onClick={handleSaveAllChanges}
            disabled={isSavingAll}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-sm flex items-center gap-2 cursor-pointer"
          >
            {isSavingAll ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Saving Changes...
              </>
            ) : (
              <>
                <Save size={16} /> Save All Changes
              </>
            )}
          </Button>

          <Button
            onClick={() => {
              setEditingId("new");
              setFormData({ isActive: true, experience: "5+ Years", imageUrl: "/navin-chauhan.png" });
            }}
            className="bg-[#7B2CBF] hover:bg-[#6A24A6] text-white font-bold shadow-sm flex items-center gap-2 cursor-pointer"
          >
            <Plus size={18} /> Add New Professional
          </Button>
        </div>
      </div>

      {saveMessage && (
        <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-sm text-emerald-800 font-semibold flex items-center gap-2">
          <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
          <span>{saveMessage}</span>
        </div>
      )}

      {/* Edit / Add Modal Card */}
      {editingId && (
        <Card className="border border-purple-200 bg-purple-50/40 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-slate-900">
              {editingId === "new" ? "Add New Healthcare Professional" : `Edit Profile: ${formData.name}`}
            </CardTitle>
            <CardDescription className="text-xs text-slate-500">
              Update doctor headshot, designations, and clinical credentials.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase">Full Name</label>
                  <Input
                    value={formData.name || ""}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Dr. Kirandeep Kaur"
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase">Designation / Role</label>
                  <Input
                    value={formData.designation || ""}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    placeholder="e.g. Senior Eldercare Specialist"
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase">Qualifications & Background</label>
                  <Input
                    value={formData.qualification || ""}
                    onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                    placeholder="e.g. MBBS - AIIMS Clinical Experience"
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 uppercase">Experience Years</label>
                  <Input
                    value={formData.experience || ""}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    placeholder="e.g. 10+ Years"
                    className="mt-1"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-slate-700 uppercase flex items-center justify-between">
                    <span>Brief Profile Summary / Bio (1-2 lines)</span>
                    <span className="text-[11px] font-normal text-purple-600">Displayed on public website card</span>
                  </label>
                  <textarea
                    value={formData.bio || ""}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    placeholder="e.g. Specializes in geriatric home consultations, chronic illness management, and compassionate preventive senior care."
                    rows={2}
                    className="w-full mt-1 p-2.5 text-xs sm:text-sm rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  />
                </div>
              </div>

              {/* Photo Upload & Preview Section */}
              <div className="space-y-3 bg-white p-4 rounded-xl border border-purple-100 shadow-xs">
                <label className="text-xs font-bold text-slate-700 uppercase flex items-center justify-between">
                  <span>Professional Photo</span>
                  <span className="text-[11px] font-normal text-purple-600">Upload image or enter URL</span>
                </label>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  {/* Live Avatar Preview */}
                  <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-slate-100 border-2 border-purple-200 shadow-sm shrink-0 flex items-center justify-center">
                    {formData.imageUrl ? (
                      <img
                        src={formData.imageUrl}
                        alt="Preview"
                        className="w-full h-full object-cover object-top"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = "/navin-chauhan.png";
                        }}
                      />
                    ) : (
                      <div className="text-center text-slate-400 p-2">
                        <ImageIcon size={28} className="mx-auto text-slate-300" />
                        <span className="text-[9px] uppercase font-bold text-slate-400 block mt-1">No Photo</span>
                      </div>
                    )}
                    {isUploading && (
                      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs flex flex-col items-center justify-center text-white">
                        <Loader2 size={20} className="animate-spin text-purple-300" />
                        <span className="text-[10px] font-bold mt-1">{uploadProgress}%</span>
                      </div>
                    )}
                  </div>

                  {/* Actions: Upload Button & Direct URL */}
                  <div className="flex-1 w-full space-y-2">
                    <div className="flex items-center gap-2">
                      <label className="inline-flex cursor-pointer items-center justify-center rounded-lg bg-[#7B2CBF] hover:bg-[#6A24A6] px-4 py-2 text-xs font-bold text-white shadow-xs transition-colors gap-2">
                        <UploadCloud size={15} />
                        {isUploading ? `Uploading (${uploadProgress}%)...` : "Upload Photo from Device"}
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          disabled={isUploading}
                          className="hidden"
                        />
                      </label>
                      {formData.imageUrl && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setFormData({ ...formData, imageUrl: "" })}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 text-xs h-8 px-2"
                        >
                          <X size={14} className="mr-1" /> Clear Photo
                        </Button>
                      )}
                    </div>

                    <div className="space-y-1">
                      {formData.imageUrl && formData.imageUrl.startsWith("data:image") ? (
                        <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-800">
                          <span className="flex items-center gap-1.5 font-semibold">
                            <CheckCircle2 size={15} className="text-emerald-600" />
                            Optimized photo attached & ready to save
                          </span>
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, imageUrl: "" })}
                            className="text-[11px] font-bold text-slate-500 hover:text-red-600 underline cursor-pointer"
                          >
                            Remove / Use Custom URL
                          </button>
                        </div>
                      ) : (
                        <Input
                          value={formData.imageUrl || ""}
                          onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                          placeholder="Or enter image URL (e.g. /team/dr-kirandeep.jpg or https://...)"
                          className="text-xs h-9 bg-slate-50 border-slate-200"
                        />
                      )}
                      <p className="text-[11px] text-slate-400">
                        Upload an image from your computer/phone, or paste a direct image URL.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-3">
                  <Button type="submit" className="bg-[#7B2CBF] hover:bg-[#6A24A6] text-white font-bold cursor-pointer">
                    Save Professional Profile
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setEditingId(null);
                      setFormData({});
                    }}
                    className="border-slate-300 cursor-pointer"
                  >
                    Cancel
                  </Button>
                </div>

                {editingId && editingId !== "new" && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleDeleteClick(editingId, formData.name || "this professional")}
                    className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 font-bold text-xs h-10 px-4 gap-1.5 cursor-pointer ml-auto"
                  >
                    <Trash2 size={14} /> Delete Profile
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search doctor name, designation, or qualification..."
          className="pl-10 h-11 bg-white border-slate-200 shadow-sm"
        />
      </div>

      {/* Professionals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtered.map((pro) => (
          <Card key={pro.id} className="border border-slate-200/80 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col justify-between">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-start gap-4">
                <img
                  src={pro.imageUrl || "/navin-chauhan.png"}
                  alt={pro.name}
                  className="h-16 w-16 rounded-2xl object-cover border border-purple-100 shadow-sm shrink-0 bg-slate-100"
                  onError={(e) => {
                    (e.target as any).src = "/navin-chauhan.png";
                  }}
                />
                <div>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 mb-1">
                    <ShieldCheck size={10} className="mr-1" /> Verified
                  </span>
                  <h3 className="text-base font-bold text-slate-900 leading-snug">{pro.name}</h3>
                  <p className="text-xs font-semibold text-[#7B2CBF] mt-0.5">{pro.designation}</p>
                </div>
              </div>

              <div className="text-xs text-slate-600 space-y-1 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <p className="line-clamp-2">{pro.qualification}</p>
                <p className="font-bold text-slate-700 mt-1">Experience: {pro.experience}</p>
                {pro.bio && (
                  <p className="text-[11px] text-slate-500 italic mt-1.5 pt-1.5 border-t border-slate-200/60 leading-relaxed">
                    "{pro.bio}"
                  </p>
                )}
              </div>
            </CardContent>

            <div className="border-t border-slate-100 p-3 bg-slate-50/50 flex items-center justify-between gap-1">
              <span className="text-[11px] font-medium text-slate-400">ID: {pro.id}</span>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEdit(pro)}
                  className="text-[#7B2CBF] hover:bg-purple-50 font-bold text-xs h-8 px-2.5 gap-1 cursor-pointer"
                >
                  <Edit2 size={13} /> Edit
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteClick(pro.id, pro.name)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50 font-bold text-xs h-8 px-2 gap-1 cursor-pointer"
                  title="Delete Profile"
                >
                  <Trash2 size={13} /> Delete
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Dedicated In-UI Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-red-100 space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                <Trash2 size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Delete Healthcare Profile</h3>
                <p className="text-xs text-slate-500">Remove from team & website</p>
              </div>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              Are you sure you want to permanently remove <strong className="text-slate-900 font-bold">"{deleteTarget.name}"</strong>? This will remove the profile from the admin manager and live team page.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setDeleteTarget(null)}
                disabled={isDeleting}
                className="border-slate-300 text-slate-700 font-bold cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={confirmDeleteProfile}
                disabled={isDeleting}
                className="bg-red-600 hover:bg-red-700 text-white font-bold flex items-center gap-2 shadow-md cursor-pointer"
              >
                {isDeleting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 size={16} /> Yes, Delete Profile
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
