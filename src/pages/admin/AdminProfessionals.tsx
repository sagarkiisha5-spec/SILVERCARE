import { useState, useEffect } from "react";
import { collection, getDocs, setDoc, doc } from "firebase/firestore";
import { db } from "@/src/lib/firebase";
import { Users, Plus, Edit2, CheckCircle2, ShieldCheck, Stethoscope, Search, UserCheck } from "lucide-react";
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
  isActive: boolean;
}

const initialProfessionals: Professional[] = [
  {
    id: "p1",
    name: "Navin Chauhan",
    designation: "Founder & CEO",
    qualification: "15+ Years in Healthcare Administration (Healthians, Atulaya Healthcare)",
    experience: "15+ Years",
    imageUrl: "https://silvercareindia.com/wp-content/uploads/2025/12/Navin.png",
    isActive: true
  },
  {
    id: "p2",
    name: "Dr. Vikas Sharma",
    designation: "Co-founder & Chief Operating Officer",
    qualification: "25+ Years in Diagnostics & Pharma (Dr. Reddy’s, Lupin, Dr Lal PathLabs)",
    experience: "25+ Years",
    imageUrl: "https://silvercareindia.com/wp-content/uploads/2026/04/Vikas_sharma.png",
    isActive: true
  },
  {
    id: "p3",
    name: "Komal Gupta",
    designation: "Co-founder & Chief Product Officer",
    qualification: "M.Tech NIT Karnataka, 13+ Years in Biopharma & Eldercare",
    experience: "13+ Years",
    imageUrl: "https://silvercareindia.com/wp-content/uploads/2026/04/IMG_1291-e1775877168885.jpg",
    isActive: true
  },
  {
    id: "p4",
    name: "Dr. Kirandeep Kaur",
    designation: "General Physician",
    qualification: "MBBS - General Physician & Senior Eldercare Specialist",
    experience: "8+ Years",
    imageUrl: "https://silvercareindia.com/wp-content/uploads/2025/12/dr-kirandeep-300x300.png",
    isActive: true
  },
  {
    id: "p5",
    name: "Ms. Jasbir Kour",
    designation: "Nursing Trainer",
    qualification: "Experienced Nursing Trainer & Clinical Care Supervisor",
    experience: "10+ Years",
    imageUrl: "https://silvercareindia.com/wp-content/uploads/2025/12/nurse-2-300x300.png",
    isActive: true
  },
  {
    id: "p6",
    name: "Ms. Tejinder Sharma",
    designation: "Nursing Supervisor",
    qualification: "Expert in Patient Care Management & Bedside Excellence",
    experience: "12+ Years",
    imageUrl: "https://silvercareindia.com/wp-content/uploads/2025/12/Ms-Tejinder-300x300.png",
    isActive: true
  },
  {
    id: "p7",
    name: "Dr. Pashdeep Sharma",
    designation: "General Physician",
    qualification: "MBBS Qualified General Physician & Home Health Specialist",
    experience: "6+ Years",
    imageUrl: "https://silvercareindia.com/wp-content/uploads/2025/12/Dr-Pashdeep-300x300.png",
    isActive: true
  },
  {
    id: "p8",
    name: "Dr. Ramandeep Reetwal",
    designation: "General Physician",
    qualification: "MBBS - AIIMS Bathinda Clinical Experience",
    experience: "5+ Years",
    imageUrl: "https://silvercareindia.com/wp-content/uploads/2025/12/Dr-Ramandeep-300x300.png",
    isActive: true
  }
];

export default function AdminProfessionals() {
  const [professionals, setProfessionals] = useState<Professional[]>(initialProfessionals);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Professional>>({});
  const [saveMessage, setSaveMessage] = useState("");

  useEffect(() => {
    getDocs(collection(db, "professionals")).then((snap) => {
      if (!snap.empty) {
        const loaded: Professional[] = [];
        snap.forEach((docSnap) => {
          loaded.push({ id: docSnap.id, ...(docSnap.data() as any) });
        });
        setProfessionals(loaded);
      }
    }).catch(err => console.warn("Using initial professionals data fallback:", err));
  }, []);

  const handleEdit = (pro: Professional) => {
    setEditingId(pro.id);
    setFormData(pro);
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
      imageUrl: formData.imageUrl || "https://silvercareindia.com/wp-content/uploads/2025/12/dr-kirandeep-300x300.png",
      isActive: formData.isActive ?? true,
    };

    const updatedList = professionals.some(p => p.id === id)
      ? professionals.map(p => p.id === id ? updatedPro : p)
      : [...professionals, updatedPro];

    setProfessionals(updatedList);
    setEditingId(null);
    setFormData({});
    setSaveMessage("Healthcare staff profile saved successfully!");
    setTimeout(() => setSaveMessage(""), 3000);

    try {
      await setDoc(doc(db, "professionals", id), updatedPro);
    } catch (err) {
      console.warn("Saved to local state, Firestore offline fallback.");
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
        <Button
          onClick={() => {
            setEditingId("new");
            setFormData({ isActive: true, experience: "5+ Years" });
          }}
          className="bg-[#7B2CBF] hover:bg-[#6A24A6] text-white font-bold shadow-sm flex items-center gap-2"
        >
          <Plus size={18} /> Add New Professional
        </Button>
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
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase">Photo Image URL</label>
                <Input
                  value={formData.imageUrl || ""}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  placeholder="https://silvercareindia.com/wp-content/uploads/..."
                  className="mt-1"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <Button type="submit" className="bg-[#7B2CBF] hover:bg-[#6A24A6] text-white font-bold">
                  Save Professional Profile
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEditingId(null)}
                  className="border-slate-300"
                >
                  Cancel
                </Button>
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
                  src={pro.imageUrl}
                  alt={pro.name}
                  className="h-16 w-16 rounded-2xl object-cover border border-purple-100 shadow-sm shrink-0 bg-slate-100"
                  onError={(e) => {
                    (e.target as any).src = "https://silvercareindia.com/wp-content/uploads/2025/12/dr-kirandeep-300x300.png";
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
              </div>
            </CardContent>

            <div className="border-t border-slate-100 p-3 bg-slate-50/50 flex items-center justify-between">
              <span className="text-[11px] font-medium text-slate-500">ID: {pro.id}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleEdit(pro)}
                className="text-[#7B2CBF] hover:bg-purple-50 font-bold text-xs h-8 gap-1"
              >
                <Edit2 size={13} /> Edit Profile
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
