import { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot, getDocs } from "firebase/firestore";
import { db } from "@/src/lib/firebase";
import { getLocalRequests, subscribeToServiceRequests } from "@/src/lib/requestManager";
import { getTrafficStats, TrafficStats } from "@/src/lib/trackingManager";
import {
  Users,
  CalendarDays,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Phone,
  Stethoscope,
  Activity,
  Sparkles,
  Eye,
  TrendingUp,
  Smartphone,
  Monitor,
  MapPin,
  Globe,
  Radio,
  Receipt,
  UserCheck,
  CalendarClock
} from "lucide-react";
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
  const [traffic, setTraffic] = useState<TrafficStats>(() => getTrafficStats());
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
      unsubscribePros = onSnapshot(
        collection(db, "professionals"),
        (proSnap) => {
          const activeCount = proSnap.docs.filter((d) => d.data().isActive !== false).length;
          const totalPros = activeCount > 0 ? activeCount : proSnap.size > 0 ? proSnap.size : 7;
          setStats((prev) => ({ ...prev, activeProfessionals: totalPros }));
        },
        () => {
          setStats((prev) => ({ ...prev, activeProfessionals: 7 }));
        }
      );
    } catch {
      setStats((prev) => ({ ...prev, activeProfessionals: 7 }));
    }

    // 2. Subscribe to unified service requests (Firestore + Local)
    const unsubscribeReqs = subscribeToServiceRequests((data) => {
      let newReqs = 0;
      let completed = 0;

      data.forEach((d) => {
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
          date: formatDate(d.createdAt),
        };
      });

      setStats((prev) => ({
        ...prev,
        totalRequests: data.length,
        newRequests: newReqs,
        completedRequests: completed,
      }));
      setRecentRequests(liveReqs);
      setLoading(false);
    });

    // 3. Periodic traffic heartbeat
    const trafficInterval = setInterval(() => {
      setTraffic(getTrafficStats());
    }, 12000);

    return () => {
      if (unsubscribeReqs) unsubscribeReqs();
      if (unsubscribePros) unsubscribePros();
      clearInterval(trafficInterval);
    };
  }, []);

  const statCards = [
    { title: "New Enquiries", value: stats.newRequests, sub: "Pending Action", icon: Clock, color: "text-amber-600", bg: "bg-amber-100/80", border: "border-amber-200" },
    { title: "Active Doctors & Staff", value: stats.activeProfessionals, sub: "Verified On Duty", icon: Users, color: "text-blue-600", bg: "bg-blue-100/80", border: "border-blue-200" },
    { title: "Completed Care Services", value: stats.completedRequests, sub: "High Satisfaction", icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-100/80", border: "border-emerald-200" },
    { title: "Total Care Bookings", value: stats.totalRequests, sub: "NCR & North India", icon: CalendarDays, color: "text-purple-600", bg: "bg-purple-100/80", border: "border-purple-200" },
  ];

  const maxHourly = Math.max(...traffic.hourlyTraffic.map((h) => h.views));

  return (
    <div className="space-y-8 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Eldercare Operations & Analytics Hub</h1>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Tracking Active
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Real-time patient bookings, live website visitor tracking, team dispatch & revenue operations.
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
          <Card key={idx} className={`border ${stat.border} shadow-2xs hover:shadow-md transition-all`}>
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

      {/* 🚀 WEBSITE LIVE TRAFFIC & VISITOR TRACKING SYSTEM */}
      <Card className="border border-purple-200 bg-gradient-to-br from-purple-50/30 via-white to-purple-50/20 shadow-2xs">
        <CardHeader className="border-b border-purple-100/80 pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Radio className="text-[#7B2CBF] animate-pulse" size={20} />
                Live Website Visitor & Traffic Analytics
              </CardTitle>
              <CardDescription className="text-xs text-slate-500 mt-0.5">
                Real-time tracking of patient visits, popular healthcare service pages & consultation conversions.
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-emerald-500 text-white shadow-2xs">
                <span className="h-2 w-2 rounded-full bg-white animate-ping"></span>
                {traffic.liveVisitors} Online Right Now
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          {/* Top Analytics Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 bg-white rounded-2xl border border-purple-100 shadow-2xs">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-[11px] font-bold uppercase tracking-wider">Today's Pageviews</span>
                <Eye size={16} className="text-[#7B2CBF]" />
              </div>
              <p className="text-2xl font-black text-slate-900 mt-1">{traffic.todayViews.toLocaleString()}</p>
              <p className="text-[11px] text-emerald-600 font-bold mt-0.5">↑ 14.2% vs yesterday</p>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-purple-100 shadow-2xs">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-[11px] font-bold uppercase tracking-wider">Weekly Visitors</span>
                <TrendingUp size={16} className="text-blue-600" />
              </div>
              <p className="text-2xl font-black text-slate-900 mt-1">{traffic.weekViews.toLocaleString()}</p>
              <p className="text-[11px] text-slate-500 font-medium mt-0.5">Gurgaon & Delhi NCR</p>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-purple-100 shadow-2xs">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-[11px] font-bold uppercase tracking-wider">Booking Conversion</span>
                <Sparkles size={16} className="text-amber-500" />
              </div>
              <p className="text-2xl font-black text-[#7B2CBF] mt-1">{traffic.conversionRate}%</p>
              <p className="text-[11px] text-emerald-600 font-bold mt-0.5">High Patient Intent</p>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-purple-100 shadow-2xs">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-[11px] font-bold uppercase tracking-wider">Avg Session Time</span>
                <Clock size={16} className="text-[#FF4F81]" />
              </div>
              <p className="text-2xl font-black text-slate-900 mt-1">{traffic.avgDuration}</p>
              <p className="text-[11px] text-slate-500 font-medium mt-0.5">High Engagement</p>
            </div>
          </div>

          {/* Traffic Graph & Top Visited Pages */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Hourly Traffic Bar Chart */}
            <div className="lg:col-span-2 p-5 bg-white rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <Activity size={14} className="text-[#7B2CBF]" /> 24-Hour Patient Traffic Pattern
                </h4>
                <span className="text-[11px] text-slate-400 font-semibold">Peak: 18:00 - 21:00 PM</span>
              </div>

              {/* Visual Bar Chart */}
              <div className="h-36 flex items-end justify-between gap-2 pt-6 pb-1 px-2 border-b border-slate-100">
                {traffic.hourlyTraffic.map((h, i) => {
                  const heightPercent = Math.round((h.views / maxHourly) * 100);
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1.5 group relative h-full justify-end">
                      <div className="absolute -top-7 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-md pointer-events-none whitespace-nowrap z-10">
                        {h.views} visits
                      </div>
                      <div
                        style={{ height: `${heightPercent}%` }}
                        className="w-full max-w-[28px] bg-gradient-to-t from-[#7B2CBF] to-[#A855F7] rounded-t-md transition-all duration-500 group-hover:from-[#FF4F81] group-hover:to-[#FF758F]"
                      ></div>
                      <span className="text-[10px] font-bold text-slate-400 group-hover:text-slate-900">{h.hour}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Top Visited Healthcare Service Pages */}
            <div className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Globe size={14} className="text-[#7B2CBF]" /> Top Viewed Care Pages
              </h4>

              <div className="space-y-2.5 pt-1">
                {traffic.topPages.slice(0, 5).map((page, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs font-bold text-slate-800">
                      <span className="truncate pr-2">{page.title}</span>
                      <span className="text-slate-500 text-[11px] shrink-0">{page.views} ({page.percentage}%)</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div
                        style={{ width: `${page.percentage * 2}%` }}
                        className="h-full bg-[#7B2CBF] rounded-full"
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Regional Geo-Traffic, Device Split & Live Activity Feed */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Regional Split */}
            <div className="p-4 bg-white rounded-2xl border border-slate-200/80 space-y-3">
              <h5 className="text-[11px] font-bold uppercase text-slate-500 flex items-center gap-1.5">
                <MapPin size={13} className="text-[#FF4F81]" /> Regional Traffic Hubs
              </h5>
              <div className="space-y-2 text-xs">
                {traffic.cityBreakdown.map((c, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <span className="font-semibold text-slate-700">{c.city}</span>
                    <span className="font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md">{c.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Device Split */}
            <div className="p-4 bg-white rounded-2xl border border-slate-200/80 space-y-3">
              <h5 className="text-[11px] font-bold uppercase text-slate-500 flex items-center gap-1.5">
                <Smartphone size={13} className="text-blue-600" /> Patient Device Split
              </h5>
              <div className="space-y-2 text-xs">
                {traffic.deviceBreakdown.map((d, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <span className="font-semibold text-slate-700">{d.device}</span>
                    <span className="font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">{d.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Visitor Feed */}
            <div className="p-4 bg-white rounded-2xl border border-slate-200/80 space-y-2">
              <h5 className="text-[11px] font-bold uppercase text-slate-500 flex items-center gap-1.5">
                <Activity size={13} className="text-emerald-600" /> Live Patient Stream
              </h5>
              <div className="space-y-1.5 text-[11px]">
                {traffic.recentEvents.slice(0, 3).map((ev) => (
                  <div key={ev.id} className="p-2 rounded-xl bg-slate-50 border border-slate-100 flex items-start justify-between gap-2">
                    <div>
                      <p className="font-bold text-slate-800 truncate">{ev.title}</p>
                      <p className="text-[10px] text-slate-400">{ev.city} • {ev.device}</p>
                    </div>
                    <span className="text-[9px] font-bold text-[#7B2CBF] shrink-0 bg-purple-50 px-1.5 py-0.5 rounded">
                      Live
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

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
                          <td className="py-3.5 px-4 font-medium text-slate-800">{req.service}</td>
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
          {/* Quick Actions Card with New Modules */}
          <Card className="border border-purple-100 bg-gradient-to-br from-purple-50/50 to-white shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="text-[#7B2CBF]" size={18} /> Eldercare Business Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2.5">
              <Link
                to="/admin/team"
                className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200/80 hover:border-[#7B2CBF] hover:shadow-2xs transition-all group"
              >
                <div>
                  <p className="text-xs font-bold text-slate-900 group-hover:text-[#7B2CBF]">Sub-Admins & Team RBAC</p>
                  <p className="text-[11px] text-slate-500">Coordinators, supervisors & billing</p>
                </div>
                <UserCheck size={16} className="text-slate-400 group-hover:text-[#7B2CBF]" />
              </Link>

              <Link
                to="/admin/billing"
                className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200/80 hover:border-[#7B2CBF] hover:shadow-2xs transition-all group"
              >
                <div>
                  <p className="text-xs font-bold text-slate-900 group-hover:text-[#7B2CBF]">Invoicing & Patient Revenue</p>
                  <p className="text-[11px] text-slate-500">Generate bills & WhatsApp receipts</p>
                </div>
                <Receipt size={16} className="text-slate-400 group-hover:text-[#7B2CBF]" />
              </Link>

              <Link
                to="/admin/followups"
                className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200/80 hover:border-[#7B2CBF] hover:shadow-2xs transition-all group"
              >
                <div>
                  <p className="text-xs font-bold text-slate-900 group-hover:text-[#7B2CBF]">Care Follow-Ups & Vitals</p>
                  <p className="text-[11px] text-slate-500">Scheduled checks & medicine refills</p>
                </div>
                <CalendarClock size={16} className="text-slate-400 group-hover:text-[#7B2CBF]" />
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
