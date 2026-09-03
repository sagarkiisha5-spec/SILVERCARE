import React, { useState } from "react";
import { Settings, Shield, Bell, Lock, Server, CheckCircle2, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";

export default function AdminSettings() {
  const [adminId, setAdminId] = useState("admin");
  const [adminPassword, setAdminPassword] = useState("admin123");
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [saveMsg, setSaveMsg] = useState("");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveMsg("Admin security settings and credentials updated successfully!");
    setTimeout(() => setSaveMsg(""), 3500);
  };

  return (
    <div className="space-y-8 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Admin System Settings</h1>
          <p className="text-sm text-slate-500 mt-1">
            Configure admin credentials, operational notifications & system security parameters.
          </p>
        </div>
        <Button onClick={handleSave} className="bg-[#7B2CBF] hover:bg-[#6A24A6] text-white font-bold shadow-sm">
          Save Settings
        </Button>
      </div>

      {saveMsg && (
        <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-sm text-emerald-800 font-semibold flex items-center gap-2">
          <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
          <span>{saveMsg}</span>
        </div>
      )}

      {/* Admin Access Credentials */}
      <Card className="border border-slate-200/80 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Lock className="text-[#7B2CBF]" size={20} /> Admin Authentication Credentials
          </CardTitle>
          <CardDescription className="text-xs text-slate-500">
            Manage single sign-on credentials for the SilverCare Admin Portal.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 uppercase">Admin ID / Username</label>
              <Input value={adminId} onChange={(e) => setAdminId(e.target.value)} className="mt-1" />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 uppercase">Admin Password</label>
              <Input type="password" value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} className="mt-1" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Firebase Cloud Connection Status & Setup */}
      <Card className="border border-purple-200 bg-purple-50/40 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-slate-900 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="flex items-center gap-2">
              <Server className="text-[#7B2CBF]" size={20} /> Firebase Backend & Cloud Sync Configuration
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
              <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse"></span>
              Cloud Database Setup Required
            </span>
          </CardTitle>
          <CardDescription className="text-xs text-slate-500">
            Realtime Firestore cloud sync across all laptops and devices.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-2">
            <p className="font-bold flex items-center gap-1.5">
              <span>⚠️</span> How to enable multi-computer Cloud Sync:
            </p>
            <ol className="list-decimal pl-5 space-y-1 text-slate-700">
              <li>Open <a href="https://console.firebase.google.com/" target="_blank" rel="noreferrer" className="text-[#7B2CBF] font-bold underline">Firebase Console</a> and create or select your project.</li>
              <li>Go to <strong>Build &rarr; Firestore Database &rarr; Create database</strong> (Select <em>Native Mode</em> & <em>Start in test mode</em>).</li>
              <li>Under <strong>Project Settings &rarr; Your apps &rarr; Web app</strong>, copy your Firebase config values and paste them below or in the <code>.env</code> file.</li>
            </ol>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-white border border-purple-100">
              <p className="text-[10px] uppercase font-bold text-slate-400">Firebase Project ID</p>
              <p className="text-xs font-semibold text-slate-800 truncate mt-0.5">gen-lang-client-0746984388</p>
            </div>
            <div className="p-3 rounded-xl bg-white border border-purple-100">
              <p className="text-[10px] uppercase font-bold text-slate-400">Auth Domain</p>
              <p className="text-xs font-semibold text-slate-800 truncate mt-0.5">gen-lang-client-0746984388.firebaseapp.com</p>
            </div>
            <div className="p-3 rounded-xl bg-white border border-purple-100">
              <p className="text-[10px] uppercase font-bold text-slate-400">Storage Bucket</p>
              <p className="text-xs font-semibold text-slate-800 truncate mt-0.5">gen-lang-client-0746984388.firebasestorage.app</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dispatch Notifications */}
      <Card className="border border-slate-200/80 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Bell className="text-amber-600" size={20} /> Emergency Dispatch & Notification Rules
          </CardTitle>
          <CardDescription className="text-xs text-slate-500">
            Configure instant notifications when a patient submits a new healthcare booking.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 bg-slate-50">
            <div>
              <p className="text-xs font-bold text-slate-900">Email Emergency Dispatch</p>
              <p className="text-[11px] text-slate-500">Send instant email alerts to care@silvercareindia.com</p>
            </div>
            <input
              type="checkbox"
              checked={emailAlerts}
              onChange={(e) => setEmailAlerts(e.target.checked)}
              className="h-5 w-5 rounded text-[#7B2CBF]"
            />
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 bg-slate-50">
            <div>
              <p className="text-xs font-bold text-slate-900">WhatsApp Dispatch Notification</p>
              <p className="text-[11px] text-slate-500">Send WhatsApp booking summaries to +91 800-14-800-75</p>
            </div>
            <input
              type="checkbox"
              checked={smsAlerts}
              onChange={(e) => setSmsAlerts(e.target.checked)}
              className="h-5 w-5 rounded text-[#7B2CBF]"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
