import React, { useState, useEffect } from "react";
import { Users, UserPlus, Shield, ShieldCheck, Key, Mail, Phone, Lock, Edit2, Trash2, CheckCircle2, AlertCircle, Sparkles, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";

export type AdminRole = "super_admin" | "care_coordinator" | "clinical_supervisor" | "billing_officer" | "content_manager";

export interface SubAdminUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: AdminRole;
  roleTitle: string;
  permissions: string[];
  status: "Active" | "Suspended";
  lastActive: string;
  assignedRegion: string;
  avatarUrl?: string;
}

const INITIAL_TEAM: SubAdminUser[] = [
  {
    id: "admin_1",
    name: "Navin Chauhan",
    email: "navin@silvercareindia.com",
    phone: "+91 800-14-800-75",
    role: "super_admin",
    roleTitle: "CEO & Super Administrator",
    permissions: ["Full System Access", "Manage Financials & Invoices", "Manage All Team Members", "Security & Database Settings", "Delete Records"],
    status: "Active",
    lastActive: "Just now",
    assignedRegion: "All North India Hubs"
  },
  {
    id: "admin_2",
    name: "Pooja Sharma",
    email: "pooja.dispatch@silvercareindia.com",
    phone: "+91 9811223344",
    role: "care_coordinator",
    roleTitle: "Lead Care Coordinator & Dispatcher",
    permissions: ["View & Manage Service Requests", "Assign Doctors & Home Nurses", "WhatsApp Emergency Dispatch", "Patient Follow-Ups"],
    status: "Active",
    lastActive: "10 mins ago",
    assignedRegion: "Gurgaon Hub"
  },
  {
    id: "admin_3",
    name: "Dr. Kirandeep Kaur",
    email: "dr.kirandeep@silvercareindia.com",
    phone: "+91 9955887711",
    role: "clinical_supervisor",
    roleTitle: "Chief Medical Supervisor",
    permissions: ["Manage Healthcare Staff & Doctors", "Verify Nursing Credentials", "Clinical Care Protocols", "Patient Assessment Notes"],
    status: "Active",
    lastActive: "1 hour ago",
    assignedRegion: "Delhi NCR Region"
  },
  {
    id: "admin_4",
    name: "Vikas Malhotra",
    email: "billing@silvercareindia.com",
    phone: "+91 9711445566",
    role: "billing_officer",
    roleTitle: "Billing & Accounts Officer",
    permissions: ["Generate Patient Invoices", "Track Monthly Care Subscriptions", "Payment Confirmations", "Download Financial Reports"],
    status: "Active",
    lastActive: "3 hours ago",
    assignedRegion: "HQ Finance"
  },
  {
    id: "admin_5",
    name: "Ananya Sen",
    email: "ananya.marketing@silvercareindia.com",
    phone: "+91 9899001122",
    role: "content_manager",
    roleTitle: "Content & Patient Stories Editor",
    permissions: ["Publish Blog Articles & Case Studies", "Manage Media & Banners", "Social Media Feed Sync", "SEO & Testimonials"],
    status: "Active",
    lastActive: "Yesterday",
    assignedRegion: "Online Portal"
  }
];

const STORAGE_KEY = "silvercare_team_subadmins";

export default function AdminTeam() {
  const [team, setTeam] = useState<SubAdminUser[]>(() => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : INITIAL_TEAM;
    } catch {
      return INITIAL_TEAM;
    }
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<SubAdminUser | null>(null);
  const [saveMessage, setSaveMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "care_coordinator" as AdminRole,
    assignedRegion: "Gurgaon Hub",
    password: "",
    status: "Active" as "Active" | "Suspended"
  });

  const saveTeamToStorage = (updated: SubAdminUser[]) => {
    setTeam(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn("Error saving team:", e);
    }
  };

  const getRoleBadge = (role: AdminRole) => {
    switch (role) {
      case "super_admin":
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-purple-100 text-[#7B2CBF] border border-purple-200">👑 Super Admin</span>;
      case "care_coordinator":
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800 border border-blue-200">📞 Care Coordinator</span>;
      case "clinical_supervisor":
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-teal-100 text-teal-800 border border-teal-200">🩺 Clinical Supervisor</span>;
      case "billing_officer":
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">💳 Billing Officer</span>;
      case "content_manager":
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-200">✍️ Content Editor</span>;
      default:
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700">Staff</span>;
    }
  };

  const handleOpenAdd = () => {
    setEditingUser(null);
    setFormData({
      name: "",
      email: "",
      phone: "",
      role: "care_coordinator",
      assignedRegion: "Gurgaon Hub",
      password: "",
      status: "Active"
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (u: SubAdminUser) => {
    setEditingUser(u);
    setFormData({
      name: u.name,
      email: u.email,
      phone: u.phone,
      role: u.role,
      assignedRegion: u.assignedRegion,
      password: "••••••••",
      status: u.status
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    let roleTitle = "Team Member";
    let permissions = ["Standard Access"];

    if (formData.role === "super_admin") {
      roleTitle = "Executive Super Administrator";
      permissions = ["Full System Access", "Manage Financials & Invoices", "Manage All Team Members", "Security & Database Settings"];
    } else if (formData.role === "care_coordinator") {
      roleTitle = "Care Coordinator & Dispatcher";
      permissions = ["View & Manage Service Requests", "Assign Doctors & Home Nurses", "WhatsApp Emergency Dispatch"];
    } else if (formData.role === "clinical_supervisor") {
      roleTitle = "Clinical / Medical Supervisor";
      permissions = ["Manage Healthcare Staff & Doctors", "Verify Nursing Credentials", "Clinical Care Protocols"];
    } else if (formData.role === "billing_officer") {
      roleTitle = "Billing & Accounts Specialist";
      permissions = ["Generate Patient Invoices", "Track Monthly Care Subscriptions", "Payment Confirmations"];
    } else if (formData.role === "content_manager") {
      roleTitle = "Content & Marketing Editor";
      permissions = ["Publish Blog Articles & Case Studies", "Manage Media & Banners", "Social Media Feed Sync"];
    }

    if (editingUser) {
      const updated = team.map((u) =>
        u.id === editingUser.id
          ? {
              ...u,
              name: formData.name,
              email: formData.email,
              phone: formData.phone || u.phone,
              role: formData.role,
              roleTitle,
              permissions,
              status: formData.status,
              assignedRegion: formData.assignedRegion
            }
          : u
      );
      saveTeamToStorage(updated);
      setSaveMessage(`Sub-Admin ${formData.name} updated successfully!`);
    } else {
      const newUser: SubAdminUser = {
        id: `admin_${Date.now()}`,
        name: formData.name,
        email: formData.email,
        phone: formData.phone || "+91 800-14-800-75",
        role: formData.role,
        roleTitle,
        permissions,
        status: formData.status,
        lastActive: "Just created",
        assignedRegion: formData.assignedRegion
      };
      saveTeamToStorage([newUser, ...team]);
      setSaveMessage(`New Sub-Admin ${formData.name} created with role ${roleTitle}!`);
    }

    setIsModalOpen(false);
    setTimeout(() => setSaveMessage(""), 3500);
  };

  const handleDelete = (id: string, name: string) => {
    if (team.length <= 1) {
      alert("At least one Super Admin must remain in the system.");
      return;
    }
    if (confirm(`Are you sure you want to remove sub-admin "${name}" from SilverCare Admin access?`)) {
      const updated = team.filter((u) => u.id !== id);
      saveTeamToStorage(updated);
    }
  };

  const filteredTeam = team.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.roleTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.assignedRegion.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRole = roleFilter === "All" || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-8 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Team Sub-Admins & Role Management</h1>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-100 text-[#7B2CBF]">
              RBAC System
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Delegate business operations: dispatch coordinators, medical supervisors, billing officers & marketing managers.
          </p>
        </div>
        <Button
          onClick={handleOpenAdd}
          className="bg-[#7B2CBF] hover:bg-[#6A24A6] text-white font-bold shadow-sm flex items-center gap-2"
        >
          <UserPlus size={18} /> Add New Sub-Admin
        </Button>
      </div>

      {saveMessage && (
        <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-sm text-emerald-800 font-semibold flex items-center gap-2">
          <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
          <span>{saveMessage}</span>
        </div>
      )}

      {/* Role Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <p className="text-[11px] font-bold text-slate-400 uppercase">Super Admins</p>
          <p className="text-2xl font-black text-[#7B2CBF] mt-1">{team.filter((u) => u.role === "super_admin").length}</p>
          <p className="text-[10px] text-slate-500 mt-0.5">Full Authority</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <p className="text-[11px] font-bold text-slate-400 uppercase">Care Coordinators</p>
          <p className="text-2xl font-black text-blue-600 mt-1">{team.filter((u) => u.role === "care_coordinator").length}</p>
          <p className="text-[10px] text-slate-500 mt-0.5">Patient Dispatch</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <p className="text-[11px] font-bold text-slate-400 uppercase">Clinical Supervisors</p>
          <p className="text-2xl font-black text-teal-600 mt-1">{team.filter((u) => u.role === "clinical_supervisor").length}</p>
          <p className="text-[10px] text-slate-500 mt-0.5">Doctors & Nurses</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <p className="text-[11px] font-bold text-slate-400 uppercase">Billing Officers</p>
          <p className="text-2xl font-black text-emerald-600 mt-1">{team.filter((u) => u.role === "billing_officer").length}</p>
          <p className="text-[10px] text-slate-500 mt-0.5">Invoices & Fees</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <p className="text-[11px] font-bold text-slate-400 uppercase">Content Editors</p>
          <p className="text-2xl font-black text-amber-600 mt-1">{team.filter((u) => u.role === "content_manager").length}</p>
          <p className="text-[10px] text-slate-500 mt-0.5">Stories & Media</p>
        </div>
      </div>

      {/* Filter and Search controls */}
      <div className="flex flex-col md:flex-row gap-3 items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="relative w-full md:w-80">
          <Input
            placeholder="Search sub-admin name, email or hub..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-10 text-xs"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <Filter size={14} className="text-slate-400 shrink-0" />
          {[
            { id: "All", label: "All Roles" },
            { id: "super_admin", label: "Super Admin" },
            { id: "care_coordinator", label: "Care Dispatch" },
            { id: "clinical_supervisor", label: "Clinical" },
            { id: "billing_officer", label: "Billing" },
            { id: "content_manager", label: "Content" }
          ].map((r) => (
            <button
              key={r.id}
              onClick={() => setRoleFilter(r.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                roleFilter === r.id
                  ? "bg-[#7B2CBF] text-white shadow-2xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sub-Admins Table */}
      <Card className="border border-slate-200 shadow-2xs overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto w-full">
            <table className="w-full min-w-[900px] text-xs text-left">
              <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="px-5 py-3.5 min-w-[200px]">Sub-Admin Member</th>
                  <th className="px-5 py-3.5 min-w-[170px]">Assigned Role</th>
                  <th className="px-5 py-3.5 min-w-[220px]">Permitted Access Scope</th>
                  <th className="px-5 py-3.5 min-w-[130px]">Hub / Region</th>
                  <th className="px-5 py-3.5 min-w-[100px]">Status</th>
                  <th className="px-5 py-3.5 text-right min-w-[120px]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredTeam.map((u) => (
                  <tr key={u.id} className="hover:bg-purple-50/30 transition-colors">
                    <td className="px-5 py-4">
                      <div className="font-bold text-slate-900 text-sm">{u.name}</div>
                      <div className="text-slate-500 text-xs mt-0.5 flex items-center gap-1.5">
                        <Mail size={12} className="text-slate-400" /> {u.email}
                      </div>
                      <div className="text-slate-400 text-[11px] mt-0.5 flex items-center gap-1.5">
                        <Phone size={11} className="text-[#FF4F81]" /> {u.phone}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div>{getRoleBadge(u.role)}</div>
                      <p className="text-[11px] text-slate-500 font-medium mt-1">{u.roleTitle}</p>
                    </td>
                    <td className="px-5 py-4">
                      <div className="space-y-1">
                        {u.permissions.slice(0, 2).map((perm, idx) => (
                          <div key={idx} className="flex items-center gap-1.5 text-[11px] text-slate-700">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#7B2CBF] shrink-0"></span>
                            <span>{perm}</span>
                          </div>
                        ))}
                        {u.permissions.length > 2 && (
                          <p className="text-[10px] text-slate-400 font-semibold">+{u.permissions.length - 2} additional permissions</p>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-4 text-slate-700 font-semibold">
                      <span>{u.assignedRegion}</span>
                      <p className="text-[10px] text-slate-400 mt-0.5">Active: {u.lastActive}</p>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold border ${
                          u.status === "Active"
                            ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                            : "bg-red-100 text-red-800 border-red-200"
                        }`}
                      >
                        {u.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleOpenEdit(u)}
                          className="h-8 w-8 p-0 text-[#7B2CBF] hover:bg-purple-50"
                        >
                          <Edit2 size={15} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(u.id, u.name)}
                          className="h-8 w-8 p-0 text-red-500 hover:bg-red-50"
                        >
                          <Trash2 size={15} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Role Permission Matrix Guide */}
      <Card className="border border-purple-100 bg-gradient-to-br from-purple-50/40 to-white shadow-2xs">
        <CardHeader>
          <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="text-[#7B2CBF]" size={20} /> Eldercare Role Permission Matrix (RBAC)
          </CardTitle>
          <CardDescription className="text-xs text-slate-500">
            Overview of department utility and access rights across SilverCare operations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-white rounded-xl border border-purple-100 space-y-1.5">
              <p className="font-bold text-[#7B2CBF] text-sm">📞 Care Coordinator (Dispatch)</p>
              <p className="text-slate-600">Takes emergency call-backs, assigns registered nurses to home visits, communicates via WhatsApp dispatch.</p>
            </div>
            <div className="p-4 bg-white rounded-xl border border-purple-100 space-y-1.5">
              <p className="font-bold text-teal-700 text-sm">🩺 Clinical Supervisor (Doctors)</p>
              <p className="text-slate-600">Verifies medical qualifications, adds specialized eldercare packages, reviews clinical procedures.</p>
            </div>
            <div className="p-4 bg-white rounded-xl border border-purple-100 space-y-1.5">
              <p className="font-bold text-emerald-700 text-sm">💳 Billing Officer (Accounts)</p>
              <p className="text-slate-600">Generates custom estimates for ICU beds, 12h/24h nursing, Freedom Plan invoices & tracks fees.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-extrabold text-[#17345E]">
              {editingUser ? `Edit Sub-Admin: ${editingUser.name}` : "Create New Sub-Admin Profile"}
            </h3>
            <p className="text-xs text-slate-500">
              Configure credentials and role permissions for operational staff.
            </p>

            <form onSubmit={handleSave} className="space-y-4 text-xs font-bold text-slate-700">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 uppercase">Full Name *</label>
                  <Input
                    required
                    placeholder="e.g. Rahul Verma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block mb-1 uppercase">Email Address *</label>
                  <Input
                    type="email"
                    required
                    placeholder="e.g. rahul.dispatch@silvercareindia.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block mb-1 uppercase">Phone Number</label>
                  <Input
                    placeholder="+91 98100 00000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block mb-1 uppercase">Assigned Hub / Region</label>
                  <Input
                    placeholder="e.g. Gurgaon Sector 33 Hub"
                    value={formData.assignedRegion}
                    onChange={(e) => setFormData({ ...formData, assignedRegion: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 uppercase">Assigned Role *</label>
                  <select
                    className="w-full p-2.5 border border-slate-200 rounded-xl outline-none focus:border-[#7B2CBF] bg-white font-semibold text-xs"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value as AdminRole })}
                  >
                    <option value="care_coordinator">📞 Care Coordinator (Dispatch)</option>
                    <option value="clinical_supervisor">🩺 Clinical / Medical Supervisor</option>
                    <option value="billing_officer">💳 Billing & Accounts Specialist</option>
                    <option value="content_manager">✍️ Content & Marketing Editor</option>
                    <option value="super_admin">👑 Executive Super Administrator</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1 uppercase">Account Status</label>
                  <select
                    className="w-full p-2.5 border border-slate-200 rounded-xl outline-none focus:border-[#7B2CBF] bg-white font-semibold text-xs"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as "Active" | "Suspended" })}
                  >
                    <option value="Active">Active (Full Access)</option>
                    <option value="Suspended">Suspended (Access Disabled)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block mb-1 uppercase">Login Password</label>
                <Input
                  type="password"
                  placeholder="Enter login password or leave empty to retain"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <Button type="button" onClick={() => setIsModalOpen(false)} variant="outline" className="h-10 px-5 rounded-xl">
                  Cancel
                </Button>
                <Button type="submit" className="bg-[#7B2CBF] text-white font-extrabold h-10 px-6 rounded-xl">
                  {editingUser ? "Update Permissions" : "Create Sub-Admin"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
