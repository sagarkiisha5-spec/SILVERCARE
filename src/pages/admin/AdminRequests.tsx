import { useState, useEffect } from "react";
import { Card, CardContent } from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { format } from "date-fns";
import { Trash2, Phone, MapPin, Search, Filter, RefreshCw, Send, Download, Stethoscope } from "lucide-react";
import { 
  subscribeToServiceRequests, 
  updateServiceRequestStatus, 
  deleteServiceRequest 
} from "@/src/lib/requestManager";

export default function AdminRequests() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const exportToCSV = () => {
    if (requests.length === 0) return;
    const headers = ["ID", "Patient Name", "Phone", "Email", "Service Required", "Location", "Status", "Date"];
    const rows = requests.map(r => [
      r.id || "",
      `"${(r.patientName || r.firstName || "Patient").replace(/"/g, '""')}"`,
      `"${(r.phone || "").replace(/"/g, '""')}"`,
      `"${(r.email || "").replace(/"/g, '""')}"`,
      `"${(r.serviceName || r.careType || "Eldercare").replace(/"/g, '""')}"`,
      `"${(r.city || r.location || "Delhi NCR").replace(/"/g, '""')}"`,
      r.status || "New",
      new Date(r.createdAt || Date.now()).toLocaleDateString()
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `silvercare_enquiries_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePatientWhatsApp = (req: any) => {
    const cleanPhone = (req.phone || "").replace(/[^0-9]/g, "");
    const patientName = req.patientName || req.firstName || "Sir/Ma'am";
    const service = req.serviceName || req.careType || "Eldercare Support";
    const isFranchise = service.toLowerCase().includes("franchise") || service.toLowerCase().includes("partner");

    let msg = "";
    if (isFranchise) {
      msg = encodeURIComponent(
        `*Namaste ${patientName}!* Greetings from *SilverCare India*.\n\n` +
        `Thank you for your interest in the *SilverCare Franchise Partnership* (${req.city || 'India'}).\n` +
        `Our Franchise Development Director has received your application and is reviewing your request.\n\n` +
        `When would be a good time to schedule an initial consultation call with our team?\n\n` +
        `Warm Regards,\n*Franchise Expansion Team*\n*SilverCare India*`
      );
    } else {
      msg = encodeURIComponent(
        `*Namaste ${patientName}!* Greetings from *SilverCare India*.\n\n` +
        `We have received your enquiry for *${service}*.\n` +
        `Our Senior Care Coordinator is reviewing your request and a verified doctor/attendant is on standby for your area.\n\n` +
        `How can we best assist you today? You can also reach our 24/7 Helpline directly at +91 800-14-800-75.\n\n` +
        `Warm Regards,\n*SilverCare India Eldercare Services*`
      );
    }
    window.open(`https://wa.me/${cleanPhone}?text=${msg}`, "_blank");
  };

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
        return "N/A";
      }
      if (isNaN(dateObj.getTime())) return "N/A";
      return format(dateObj, "MMM d, yyyy, h:mm a");
    } catch {
      return "N/A";
    }
  };

  useEffect(() => {
    setLoading(true);
    const unsubscribe = subscribeToServiceRequests((data) => {
      setRequests(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: newStatus, updatedAt: Date.now() } : r));
    setUpdatingId(id);
    try {
      await updateServiceRequestStatus(id, newStatus);
    } catch (err) {
      console.error("Status update error:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this request?")) return;
    setRequests(prev => prev.filter(r => r.id !== id));
    setUpdatingId(id);
    try {
      await deleteServiceRequest(id);
    } catch (err) {
      console.error("Delete request error:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Contacted': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Assigned': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'In Progress': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'Completed': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const filteredRequests = requests.filter((req) => {
    const pName = (req.patientName || req.firstName || req.name || "").toLowerCase();
    const phone = (req.phone || "").toLowerCase();
    const service = (req.serviceName || req.careType || req.service || "").toLowerCase();
    const city = (req.city || req.location || "").toLowerCase();

    const matchesSearch =
      !searchQuery.trim() ||
      pName.includes(searchQuery.toLowerCase()) ||
      phone.includes(searchQuery.toLowerCase()) ||
      service.includes(searchQuery.toLowerCase()) ||
      city.includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "All" || req.status === statusFilter;

    let matchesCategory = true;
    if (categoryFilter === "Franchise") {
      matchesCategory = service.includes("franchise") || service.includes("partner");
    } else if (categoryFilter === "MotherBaby") {
      matchesCategory = service.includes("mother") || service.includes("baby");
    } else if (categoryFilter === "Eldercare") {
      matchesCategory = !service.includes("franchise") && !service.includes("partner") && !service.includes("mother") && !service.includes("baby");
    }

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const franchiseCount = requests.filter(r => (r.careType || r.serviceName || "").toLowerCase().includes("franchise")).length;

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Service Requests & Franchise Leads</h1>
          <p className="text-sm text-slate-500">Manage real-time call back requests, eldercare bookings, and franchise partner inquiries.</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Button
            onClick={exportToCSV}
            variant="outline"
            className="text-xs font-bold border-slate-200 hover:bg-purple-50 hover:text-[#7B2CBF] shadow-2xs h-9 px-3 rounded-xl flex items-center gap-1.5"
          >
            <Download size={14} /> Export CSV
          </Button>
          <span className="text-xs font-bold px-3 py-1.5 bg-purple-100 text-[#7B2CBF] rounded-full border border-purple-200">
            Total Requests: {requests.length}
          </span>
          {franchiseCount > 0 && (
            <span className="text-xs font-bold px-3 py-1.5 bg-pink-100 text-[#E91E63] rounded-full border border-pink-200">
              Franchise Leads: {franchiseCount}
            </span>
          )}
        </div>
      </div>

      {/* Filter and Search controls */}
      <div className="flex flex-col md:flex-row gap-3 items-center justify-between bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
        <div className="relative w-full md:w-72">
          <Search size={16} className="absolute left-3 top-3 text-slate-400" />
          <Input
            placeholder="Search patient, phone, service or city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-10 rounded-xl text-xs"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {[
              { id: "All", label: "All Enquiries" },
              { id: "Franchise", label: "🤝 Franchise Leads" },
              { id: "MotherBaby", label: "🤱 Mother & Baby Care" },
              { id: "Eldercare", label: "🩺 Eldercare" }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setCategoryFilter(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  categoryFilter === cat.id
                    ? "bg-[#7B2CBF] text-white shadow-2xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
            {["All", "New", "Contacted", "In Progress", "Completed"].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  statusFilter === st
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      <Card className="border border-slate-200/80 shadow-2xs overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto w-full">
            <table className="w-full min-w-[950px] text-xs text-left">
              <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="px-5 py-3.5 min-w-[150px]">Date & Time</th>
                  <th className="px-5 py-3.5 min-w-[200px]">Candidate / Patient Details</th>
                  <th className="px-5 py-3.5 min-w-[200px]">Requested Service / Franchise</th>
                  <th className="px-5 py-3.5 min-w-[140px]">City / Location</th>
                  <th className="px-5 py-3.5 min-w-[120px]">Status</th>
                  <th className="px-5 py-3.5 text-right min-w-[170px]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-slate-500 font-medium">
                      <div className="flex justify-center items-center gap-2">
                        <RefreshCw size={16} className="animate-spin text-[#7B2CBF]" />
                        <span>Loading enquiries...</span>
                      </div>
                    </td>
                  </tr>
                ) : filteredRequests.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                      <p className="font-bold text-slate-700">No matching requests found</p>
                      <p className="text-xs text-slate-400 mt-1">Try switching category tabs or clearing search filter.</p>
                    </td>
                  </tr>
                ) : (
                  filteredRequests.map((req) => {
                    const patientName = req.patientName || req.firstName || req.name || "Anonymous Patient";
                    const phone = req.phone || "No Phone Provided";
                    const serviceName = req.serviceName || req.careType || req.service || req.serviceType || "Eldercare Support";
                    const location = req.city || req.location || "Delhi NCR";
                    const isFranchise = serviceName.toLowerCase().includes("franchise") || serviceName.toLowerCase().includes("partner");

                    return (
                      <tr key={req.id} className={`hover:bg-purple-50/30 transition-colors ${isFranchise ? 'bg-purple-50/20' : ''}`}>
                        <td className="px-5 py-4 whitespace-nowrap font-medium text-slate-600">
                          {formatDate(req.createdAt)}
                        </td>
                        <td className="px-5 py-4">
                          <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                            {patientName}
                            {isFranchise && (
                              <span className="bg-pink-100 text-[#E91E63] text-[10px] font-black uppercase px-2 py-0.5 rounded-md border border-pink-200">
                                Franchise Applicant
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-1 text-slate-500 text-xs mt-0.5">
                            <Phone size={11} className="text-[#FF4F81]" />
                            <a href={`tel:${phone.replace(/[^0-9+]/g, '')}`} className="hover:underline hover:text-[#7B2CBF]">
                              {phone}
                            </a>
                          </div>
                          {req.email && (
                            <div className="text-slate-500 text-[11px] mt-0.5 font-medium">{req.email}</div>
                          )}
                        </td>
                        <td className="px-5 py-4">
                          <div className="font-bold text-slate-900">{serviceName}</div>
                          {req.message && (
                            <div className="text-slate-600 text-[11px] mt-0.5 italic max-w-xs truncate bg-slate-50 p-1.5 rounded-md border border-slate-100">
                              "{req.message}"
                            </div>
                          )}
                        </td>
                        <td className="px-5 py-4 text-slate-700 font-semibold">
                          <div className="flex items-center gap-1">
                            <MapPin size={12} className="text-slate-400" />
                            <span>{location}</span>
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <select
                            value={req.status || "New"}
                            onChange={(e) => handleStatusChange(req.id, e.target.value)}
                            disabled={updatingId === req.id}
                            className={`text-[11px] font-extrabold px-2.5 py-1 rounded-full border cursor-pointer ${getStatusColor(req.status || "New")}`}
                          >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Assigned">Assigned</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="px-5 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              size="sm"
                              onClick={() => handlePatientWhatsApp(req)}
                              className="h-8 px-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs shadow-2xs rounded-xl shrink-0"
                              title="Send WhatsApp message"
                            >
                              <Send size={13} className="mr-1" /> WhatsApp
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDelete(req.id)}
                              className="h-8 w-8 p-0 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl"
                              title="Delete request"
                            >
                              <Trash2 size={14} />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
