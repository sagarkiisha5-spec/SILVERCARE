import React, { useState } from "react";
import { CalendarClock, Plus, Send, CheckCircle2, Clock, AlertTriangle, Activity, Stethoscope, Pill, HeartPulse, Search, Phone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";

export interface FollowUpItem {
  id: string;
  patientName: string;
  phone: string;
  careType: "Doctor Follow-Up" | "Vitals & BP Monitoring" | "Medicine Refill Alert" | "Physiotherapy Session" | "General Well-being Call";
  assignedSpecialist: string;
  scheduledDate: string;
  scheduledTime: string;
  status: "Due Today" | "Upcoming" | "Overdue" | "Completed";
  notes: string;
}

const INITIAL_FOLLOWUPS: FollowUpItem[] = [
  {
    id: "fup_1",
    patientName: "Smt. Pushpa Singhal (Age: 79)",
    phone: "+91 9811224455",
    careType: "Vitals & BP Monitoring",
    assignedSpecialist: "Sister Anjali (Registered Nurse)",
    scheduledDate: "Today",
    scheduledTime: "11:00 AM",
    status: "Due Today",
    notes: "Daily morning fasting blood sugar & BP charting for cardiac history."
  },
  {
    id: "fup_2",
    patientName: "Shri Om Prakash Gupta (Age: 84)",
    phone: "+91 9871144556",
    careType: "Doctor Follow-Up",
    assignedSpecialist: "Dr. Kirandeep Kaur",
    scheduledDate: "Tomorrow",
    scheduledTime: "04:30 PM",
    status: "Upcoming",
    notes: "Post-discharge geriatric review and medication adjustment."
  },
  {
    id: "fup_3",
    patientName: "Col. H. S. Bakshi (Age: 76)",
    phone: "+91 9911002233",
    careType: "Physiotherapy Session",
    assignedSpecialist: "Dr. Rahul Verma (PT)",
    scheduledDate: "05 Sep 2026",
    scheduledTime: "10:00 AM",
    status: "Upcoming",
    notes: "Mobility gait training and shoulder exercise (Session 4/10)."
  },
  {
    id: "fup_4",
    patientName: "Kamla Devi (Age: 81)",
    phone: "+91 9871122334",
    careType: "Medicine Refill Alert",
    assignedSpecialist: "Care Coordinator",
    scheduledDate: "02 Sep 2026",
    scheduledTime: "02:00 PM",
    status: "Overdue",
    notes: "Monthly diabetic & hypertensive prescription refill reminder."
  }
];

const STORAGE_KEY = "silvercare_patient_followups";

export default function AdminFollowUps() {
  const [followUps, setFollowUps] = useState<FollowUpItem[]>(() => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : INITIAL_FOLLOWUPS;
    } catch {
      return INITIAL_FOLLOWUPS;
    }
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");

  const [formData, setFormData] = useState({
    patientName: "",
    phone: "",
    careType: "Doctor Follow-Up" as FollowUpItem["careType"],
    assignedSpecialist: "Dr. Kirandeep Kaur",
    scheduledDate: "Tomorrow",
    scheduledTime: "11:00 AM",
    notes: ""
  });

  const saveToStorage = (updated: FollowUpItem[]) => {
    setFollowUps(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn("Storage error:", e);
    }
  };

  const handleAddFollowUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.patientName) return;

    const newItem: FollowUpItem = {
      id: `fup_${Date.now()}`,
      patientName: formData.patientName,
      phone: formData.phone.startsWith("+91") ? formData.phone : `+91 ${formData.phone}`,
      careType: formData.careType,
      assignedSpecialist: formData.assignedSpecialist,
      scheduledDate: formData.scheduledDate,
      scheduledTime: formData.scheduledTime,
      status: "Upcoming",
      notes: formData.notes || "Routine scheduled follow-up"
    };

    saveToStorage([newItem, ...followUps]);
    setSaveMsg(`Follow-up scheduled for ${newItem.patientName}!`);
    setIsModalOpen(false);
    setTimeout(() => setSaveMsg(""), 3500);
  };

  const handleToggleComplete = (id: string) => {
    const updated = followUps.map((item) =>
      item.id === id ? { ...item, status: (item.status === "Completed" ? "Upcoming" : "Completed") as any } : item
    );
    saveToStorage(updated);
  };

  const handleSendReminderWhatsApp = (item: FollowUpItem) => {
    const cleanPhone = item.phone.replace(/[^0-9]/g, "");
    const msg = encodeURIComponent(
      `*SilverCare India - Eldercare Scheduled Reminder*\n\n` +
      `Dear Family / Caregiver of ${item.patientName},\n\n` +
      `This is a gentle reminder regarding your upcoming eldercare schedule with SilverCare:\n` +
      `🩺 *Care Focus:* ${item.careType}\n` +
      `👨‍⚕️ *Assigned Specialist:* ${item.assignedSpecialist}\n` +
      `📅 *Date & Time:* ${item.scheduledDate} at ${item.scheduledTime}\n` +
      `📝 *Notes:* ${item.notes}\n\n` +
      `For any rescheduling or emergency support, call 24/7 Helpline: +91 800-14-800-75\n` +
      `SilverCare India - Care You Can Trust.`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${msg}`, "_blank");
  };

  const filtered = followUps.filter((f) => {
    const matchesSearch =
      f.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.assignedSpecialist.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.careType.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === "All" || f.status === filterType || f.careType === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-8 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Patient Care & Routine Follow-Ups</h1>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
              Care Monitoring
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Schedule routine home vitals checks, doctor visits, prescription refills & send WhatsApp reminders to families.
          </p>
        </div>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#7B2CBF] hover:bg-[#6A24A6] text-white font-bold shadow-sm flex items-center gap-2"
        >
          <Plus size={18} /> Schedule Follow-Up
        </Button>
      </div>

      {saveMsg && (
        <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-sm text-emerald-800 font-semibold flex items-center gap-2">
          <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
          <span>{saveMsg}</span>
        </div>
      )}

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-amber-200 bg-amber-50/20 shadow-2xs">
          <p className="text-xs font-bold text-amber-700 uppercase">Due Today</p>
          <p className="text-2xl font-black text-amber-700 mt-1">{followUps.filter((f) => f.status === "Due Today").length}</p>
          <p className="text-[11px] text-slate-500 mt-0.5">Vitals & Visits</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-blue-200 bg-blue-50/20 shadow-2xs">
          <p className="text-xs font-bold text-blue-700 uppercase">Upcoming Visits</p>
          <p className="text-2xl font-black text-blue-700 mt-1">{followUps.filter((f) => f.status === "Upcoming").length}</p>
          <p className="text-[11px] text-slate-500 mt-0.5">Scheduled this week</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-red-200 bg-red-50/20 shadow-2xs">
          <p className="text-xs font-bold text-red-700 uppercase">Overdue Refills</p>
          <p className="text-2xl font-black text-red-700 mt-1">{followUps.filter((f) => f.status === "Overdue").length}</p>
          <p className="text-[11px] text-slate-500 mt-0.5">Needs immediate call</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-emerald-200 bg-emerald-50/20 shadow-2xs">
          <p className="text-xs font-bold text-emerald-700 uppercase">Completed This Month</p>
          <p className="text-2xl font-black text-emerald-700 mt-1">{followUps.filter((f) => f.status === "Completed").length}</p>
          <p className="text-[11px] text-slate-500 mt-0.5">Satisfied Families</p>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col md:flex-row gap-3 items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="relative w-full md:w-80">
          <Input
            placeholder="Search patient, doctor or care type..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-10 text-xs"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          {["All", "Due Today", "Upcoming", "Overdue", "Completed"].map((st) => (
            <button
              key={st}
              onClick={() => setFilterType(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                filterType === st
                  ? "bg-[#7B2CBF] text-white shadow-2xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Follow-up Cards / List */}
      <div className="space-y-3">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-purple-200 transition-all shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="space-y-1.5 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-extrabold text-slate-900 text-sm">{item.patientName}</span>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                    item.status === "Due Today"
                      ? "bg-amber-100 text-amber-800 border-amber-200 animate-pulse"
                      : item.status === "Overdue"
                      ? "bg-red-100 text-red-800 border-red-200"
                      : item.status === "Completed"
                      ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                      : "bg-blue-100 text-blue-800 border-blue-200"
                  }`}
                >
                  {item.status}
                </span>
                <span className="text-[11px] font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-100">
                  {item.careType}
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">{item.notes}</p>

              <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-500 pt-1">
                <span className="flex items-center gap-1 font-semibold text-slate-700">
                  <Stethoscope size={13} className="text-[#7B2CBF]" /> {item.assignedSpecialist}
                </span>
                <span className="flex items-center gap-1 font-semibold text-slate-700">
                  <Clock size={13} className="text-[#FF4F81]" /> {item.scheduledDate} ({item.scheduledTime})
                </span>
                <span className="flex items-center gap-1">
                  <Phone size={12} className="text-slate-400" /> {item.phone}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end md:self-center shrink-0">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleToggleComplete(item.id)}
                className={`h-9 text-xs font-bold ${
                  item.status === "Completed" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "border-slate-200"
                }`}
              >
                <CheckCircle2 size={14} className="mr-1" />
                {item.status === "Completed" ? "Completed" : "Mark Done"}
              </Button>
              <Button
                size="sm"
                onClick={() => handleSendReminderWhatsApp(item)}
                className="h-9 text-xs font-bold bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-2xs"
              >
                <Send size={14} className="mr-1.5" /> WhatsApp Reminder
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Schedule Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-4">
            <h3 className="text-xl font-extrabold text-[#17345E]">Schedule Patient Follow-Up</h3>
            <p className="text-xs text-slate-500">
              Set routine checkups, blood sugar monitoring, medicine refills or physiotherapist visits.
            </p>

            <form onSubmit={handleAddFollowUp} className="space-y-4 text-xs font-bold text-slate-700">
              <div>
                <label className="block mb-1 uppercase">Patient Name & Age *</label>
                <Input
                  required
                  placeholder="e.g. Smt. Pushpa Singhal (Age: 79)"
                  value={formData.patientName}
                  onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                />
              </div>

              <div>
                <label className="block mb-1 uppercase">Phone Number *</label>
                <Input
                  required
                  placeholder="+91 98100 00000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 uppercase">Care Purpose *</label>
                  <select
                    className="w-full p-2.5 border border-slate-200 rounded-xl outline-none focus:border-[#7B2CBF] bg-white text-xs font-semibold"
                    value={formData.careType}
                    onChange={(e) => setFormData({ ...formData, careType: e.target.value as any })}
                  >
                    <option value="Doctor Follow-Up">Doctor Follow-Up</option>
                    <option value="Vitals & BP Monitoring">Vitals & BP Monitoring</option>
                    <option value="Medicine Refill Alert">Medicine Refill Alert</option>
                    <option value="Physiotherapy Session">Physiotherapy Session</option>
                    <option value="General Well-being Call">General Well-being Call</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1 uppercase">Assigned Staff</label>
                  <Input
                    placeholder="e.g. Sister Anjali / Dr. Kirandeep"
                    value={formData.assignedSpecialist}
                    onChange={(e) => setFormData({ ...formData, assignedSpecialist: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 uppercase">Scheduled Day / Date</label>
                  <Input
                    placeholder="e.g. Tomorrow / 06 Sep 2026"
                    value={formData.scheduledDate}
                    onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block mb-1 uppercase">Scheduled Time</label>
                  <Input
                    placeholder="e.g. 11:30 AM"
                    value={formData.scheduledTime}
                    onChange={(e) => setFormData({ ...formData, scheduledTime: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1 uppercase">Clinical Notes</label>
                <textarea
                  className="w-full p-3 border border-slate-200 rounded-xl outline-none focus:border-[#7B2CBF] text-xs h-20"
                  placeholder="e.g. Check fasting sugar, BP recording, assess limb mobility..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                ></textarea>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <Button type="button" onClick={() => setIsModalOpen(false)} variant="outline" className="h-10 px-5 rounded-xl">
                  Cancel
                </Button>
                <Button type="submit" className="bg-[#7B2CBF] text-white font-extrabold h-10 px-6 rounded-xl">
                  Save Schedule
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
