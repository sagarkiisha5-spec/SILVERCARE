import { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot, getDocs } from "firebase/firestore";
import { db, handleFirestoreError, OperationType } from "@/src/lib/firebase";
import { getLocalRequests, subscribeToServiceRequests } from "@/src/lib/requestManager";
import { Users, CalendarDays, CheckCircle2, Clock, ArrowUpRight, Phone, Stethoscope, AlertCircle, Sparkles, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Link } from "react-router-dom";

interface RecentRequest {
  id: string;
  patientName: string;
  phone: string;
  service: string;
  city: string;
  doctor: string;
  status: "New" | "In Progress" | "Completed" | "Pending" | string;
  date: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState(() => {
    const initialReqs = getLocalRequests();
    let newCount = 0;
    let completedCount = 0;
    initialReqs.forEach((r) => {
      const st = String(r.status || "New").trim().toLowerCase();
      if (st === "new") newCount++;
      if (st === "completed") completedCount++;
    });
    return {
      totalRequests: initialReqs.length,
      newRequests: newCount,
      completedRequests: completedCount,
      activeProfessionals: 7,
    };
  });
  
  const [loading, setLoading] = useState(false);
  const [recentRequests, setRecentRequests] = useState<RecentRequest[]>(() => {
    const initialReqs = getLocalRequests();
    return initialReqs.slice(0, 5).map((d) => ({
      id: d.id || `req_${Math.random()}`,
      patientName: d.patientName || d.firstName || "Patient",
      phone: d.phone || "+91 800-14-800-75",
      service: d.serviceName || d.careType || d.service || "Home Eldercare",
      city: d.city || d.location || "Delhi NCR",
      doctor: "Assigned Specialist",
      status: String(d.status || "New").trim(),
      date: "Just now",
    }));
  });

  const formatDate = (rawDate: any): string => {
    if (!rawDate) return "Just now";
    try {
      let dateObj: Date;
      if (typeof rawDate?.toDate === "function") {
        dateObj = rawDate.toDate();
      } else if (typeof rawDate === "number") {
        dateObj = new Date(rawDate);
      } else if (typeof rawDate === "string") {
        dateObj = new Date(rawDate);
      } else if (rawDate?.seconds) {
        dateObj = new Date(rawDate.seconds * 1000);
      } else {
        return "Just now";
      }
      if (isNaN(dateObj.getTime())) return "Just now";
      return dateObj.toLocaleDateString();
    } catch {
      return "Just now";
    }
  };

  useEffect(() => {
    let unsubscribePros: (() => void) | undefined;

    // 1. Fetch active professionals count with clean fallback
    try {
      unsubscribePros = onSnapshot(collection(db, "professionals"), (proSnap) => {
        const activeCount = proSnap.docs.filter(d => d.data().isActive !== false).length;
        const totalPros = activeCount > 0 ? activeCount : (proSnap.size > 0 ? proSnap.size : 7);
        setStats(prev => ({ ...prev, activeProfessionals: totalPros }));
      }, (e) => {
        console.warn("Professionals snapshot fallback:", e);
        setStats(prev => ({ ...prev, activeProfessionals: 7 }));
      });
    } catch (e) {
      console.warn("Could not fetch professionals count:", e);
      setStats(prev => ({ ...prev, activeProfessionals: 7 }));
    }

    // 2. Subscribe to unified service requests (Firestore + Local)
    const unsubscribeReqs = subscribeToServiceRequests((data) => {
      let newReqs = 0;
      let completed = 0;
      
      data.forEach(d => {
        const st = String(d.status || "New").trim().toLowerCase();
        if (st === "new") newReqs++;
        if (st === "completed") completed++;
      });

      const liveReqs: RecentRequest[] = data.slice(0, 5).map((d) => {
        const rawSt = d.status || "New";
        const cleanSt = String(rawSt).trim();
        return {
          id: d.id || `req_${Math.random()}`,
          patientName: d.patientName || d.firstName || "Patient",
          phone: d.phone || "+91 800-14-800-75",
          service: d.serviceName || d.careType || d.service || "Home Eldercare",
          city: d.city || d.location || "Delhi NCR",
          doctor: "Assigned Specialist",
          status: cleanSt,
          date: formatDate(d.createdAt)
        };
      });

      setStats(prev => ({
        ...prev,
        totalRequests: data.length,
        newRequests: newReqs,
        completedRequests: completed
      }));
      setRecentRequests(liveReqs);
      setLoading(false);
    });

    return () => {
      if (unsubscribeReqs) unsubscribeReqs();
      if (unsubscribePros) unsubscribePros();
    };
  }, []);

  const statCards = [
    { title: "New Enquiries", value: stats.newRequests, sub: "Pending Action", icon: Clock, color: "text-amber-600", bg: "bg-amber-100/80", border: "border-amber-200" },
    { title: "Active Doctors & Staff", value: stats.activeProfessionals, sub: "Verified On Duty", icon: Users, color: "text-blue-600", bg: "bg-blue-100/80", border: "border-blue-200" },
    { title: "Completed Care Services", value: stats.completedRequests, sub: "High Satisfaction", icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-100/80", border: "border-emerald-200" },
    { title: "Total Care Bookings", value: stats.totalRequests, sub: "Gurgaon & North India", icon: CalendarDays, color: "text-purple-600", bg: "bg-purple-100/80", border: "border-purple-200" },
  ];

  return (
    <div className="space-y-8 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Eldercare Operations Dashboard</h1>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-100 text-[#7B2CBF]">
              Live Admin System
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Real-time management of SilverCare India patient bookings, healthcare professionals & website assets.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/admin/requests">
            <Button className="bg-[#7B2CBF] hover:bg-[#6A24A6] text-white font-bold shadow-sm flex items-center gap-2">
              View All Patient Requests <ArrowUpRight size={16} />
            </Button>
          </Link>
        </div>
      </div>

      {/* Operational Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((stat, idx) => (
          <Card key={idx} className={`border ${stat.border} shadow-sm hover:shadow-md transition-all`}>
            <CardContent className="p-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">{stat.title}</p>
                <h3 className="text-3xl font-black text-slate-900 mt-1">{stat.value}</h3>
                <p className="text-xs font-medium text-slate-500 mt-1">{stat.sub}</p>
              </div>
              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${stat.bg} ${stat.color}`}>
                <stat.icon size={24} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid: Recent Requests & Quick Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recent Service Bookings Table */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="border border-slate-200/80 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <div>
                <CardTitle className="text-lg font-bold text-slate-900">Recent Patient Booking Requests</CardTitle>
                <CardDescription className="text-xs text-slate-500">
                  Latest eldercare consultations and home care assignments requiring attention.
                </CardDescription>
              </div>
              <Link to="/admin/requests" className="text-xs font-bold text-[#7B2CBF] hover:underline">
                View All →
              </Link>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-y border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Patient & Location</th>
                      <th className="py-3 px-4">Required Care</th>
                      <th className="py-3 px-4">Assigned Specialist</th>
                      <th className="py-3 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {loading ? (
                      <tr>
                        <td colSpan={4} className="py-8 px-4 text-center text-slate-500 font-medium">
                          Loading real-time patient requests...
                        </td>
                      </tr>
                    ) : recentRequests.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="py-8 px-4 text-center text-slate-500 font-medium">
                          No patient requests received yet. Submissions from website forms will appear here live.
                        </td>
                      </tr>
                    ) : (
                      recentRequests.map((req) => (
                        <tr key={req.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3.5 px-4">
                            <p className="font-bold text-slate-900">{req.patientName}</p>
                            <div className="flex items-center gap-1.5 text-slate-500 text-[11px] mt-0.5">
                              <Phone size={10} /> {req.phone} • {req.city}
                            </div>
                          </td>
                          <td className="py-3.5 px-4 font-medium text-slate-800">
                            {req.service}
                          </td>
                          <td className="py-3.5 px-4 font-semibold text-slate-700">
                            <div className="flex items-center gap-1.5">
                              <Stethoscope size={13} className="text-[#7B2CBF]" />
                              {req.doctor}
                            </div>
                          </td>
                          <td className="py-3.5 px-4">
                            <span
                              className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold ${
                                req.status === "New"
                                  ? "bg-amber-100 text-amber-800 border border-amber-200"
                                  : req.status === "In Progress"
                                  ? "bg-blue-100 text-blue-800 border border-blue-200"
                                  : "bg-emerald-100 text-emerald-800 border border-emerald-200"
                              }`}
                            >
                              {req.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Management Tools */}
        <div className="space-y-5">
          {/* Quick Actions Card */}
          <Card className="border border-purple-100 bg-gradient-to-br from-purple-50/50 to-white shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="text-[#7B2CBF]" size={18} /> Admin Operational Shortcuts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link
                to="/admin/professionals"
                className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200/80 hover:border-[#7B2CBF] hover:shadow-sm transition-all group"
              >
                <div>
                  <p className="text-xs font-bold text-slate-900 group-hover:text-[#7B2CBF]">Manage Healthcare Staff</p>
                  <p className="text-[11px] text-slate-500">Edit 8 doctors & nursing trainers</p>
                </div>
                <Users size={16} className="text-slate-400 group-hover:text-[#7B2CBF]" />
              </Link>

              <Link
                to="/admin/content"
                className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200/80 hover:border-[#7B2CBF] hover:shadow-sm transition-all group"
              >
                <div>
                  <p className="text-xs font-bold text-slate-900 group-hover:text-[#7B2CBF]">Logo & Media Library</p>
                  <p className="text-[11px] text-slate-500">Update logo, hero photos & helpline</p>
                </div>
                <Sparkles size={16} className="text-slate-400 group-hover:text-[#7B2CBF]" />
              </Link>

              <Link
                to="/admin/social-sync"
                className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200/80 hover:border-[#7B2CBF] hover:shadow-sm transition-all group"
              >
                <div>
                  <p className="text-xs font-bold text-slate-900 group-hover:text-[#7B2CBF]">Instagram & Facebook Sync</p>
                  <p className="text-[11px] text-slate-500">Sync posts & patient reviews</p>
                </div>
                <Activity size={16} className="text-slate-400 group-hover:text-[#7B2CBF]" />
              </Link>
            </CardContent>
          </Card>

          {/* 24/7 Helpline Status */}
          <Card className="bg-[#17345E] text-white border-0 shadow-md">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500 text-white">
                  24/7 Dispatch Active
                </span>
                <Phone size={16} className="text-emerald-400" />
              </div>
              <h4 className="text-lg font-bold mt-3">+91 800-14-800-75</h4>
              <p className="text-xs text-slate-300 mt-1">Gurgaon HQ Central Eldercare Helpline</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
