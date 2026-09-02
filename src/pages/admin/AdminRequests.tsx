import { useState, useEffect } from "react";
import { Card, CardContent } from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { format } from "date-fns";
import { Trash2, Phone, MapPin, Search, Filter, RefreshCw } from "lucide-react";
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
    setUpdatingId(id);
    try {
      await updateServiceRequestStatus(id, newStatus);
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service request?")) return;
    setUpdatingId(id);
    try {
      await deleteServiceRequest(id);
    } catch (err) {
      console.error(err);
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

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Patient Service Requests</h1>
          <p className="text-sm text-slate-500">Manage real-time call back requests, consultations, and home care bookings.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-3 py-1 bg-purple-100 text-[#7B2CBF] rounded-full">
            Total Requests: {requests.length}
          </span>
        </div>
      </div>

      {/* Filter and Search controls */}
      <div className="flex flex-col md:flex-row gap-3 items-center justify-between bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="relative w-full md:w-80">
          <Search size={16} className="absolute left-3 top-3 text-slate-400" />
          <Input
            placeholder="Search patient, phone, service or city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-10 rounded-xl text-xs"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <Filter size={14} className="text-slate-400 shrink-0" />
          {["All", "New", "Contacted", "In Progress", "Completed", "Cancelled"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                statusFilter === st
                  ? "bg-[#7B2CBF] text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      <Card className="border border-slate-200/80 shadow-xs overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="px-5 py-3.5">Date & Time</th>
                  <th className="px-5 py-3.5">Patient Details</th>
                  <th className="px-5 py-3.5">Requested Care</th>
                  <th className="px-5 py-3.5">City / Location</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-slate-500 font-medium">
                      <div className="flex justify-center items-center gap-2">
                        <RefreshCw size={16} className="animate-spin text-[#7B2CBF]" />
                        <span>Loading patient service requests...</span>
                      </div>
                    </td>
                  </tr>
                ) : filteredRequests.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                      <p className="font-bold text-slate-700">No requests found</p>
                      <p className="text-xs text-slate-400 mt-1">Try clearing filters or search queries.</p>
                    </td>
                  </tr>
                ) : (
                  filteredRequests.map((req) => {
                    const patientName = req.patientName || req.firstName || req.name || "Anonymous Patient";
                    const phone = req.phone || "No Phone Provided";
                    const serviceName = req.serviceName || req.careType || req.service || req.serviceType || "Eldercare Support";
                    const location = req.city || req.location || "Delhi NCR";

                    return (
                      <tr key={req.id} className="hover:bg-purple-50/30 transition-colors">
                        <td className="px-5 py-4 whitespace-nowrap font-medium text-slate-600">
                          {formatDate(req.createdAt)}
                        </td>
                        <td className="px-5 py-4">
                          <div className="font-bold text-slate-900 text-sm">{patientName}</div>
                          <div className="flex items-center gap-1 text-slate-500 text-xs mt-0.5">
                            <Phone size={11} className="text-[#FF4F81]" />
                            <a href={`tel:${phone.replace(/[^0-9+]/g, '')}`} className="hover:underline hover:text-[#7B2CBF]">
                              {phone}
                            </a>
                          </div>
                          {req.email && (
                            <div className="text-slate-400 text-[11px] mt-0.5">{req.email}</div>
                          )}
                        </td>
                        <td className="px-5 py-4">
                          <div className="font-bold text-slate-900">{serviceName}</div>
                          {req.message && (
                            <div className="text-slate-500 text-[11px] mt-0.5 italic max-w-xs truncate">
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
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold border ${getStatusColor(req.status || "New")}`}>
                            {req.status || "New"}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <select 
                              className="text-xs font-semibold border border-slate-300 rounded-lg px-2 py-1 bg-white text-slate-800 focus:ring-1 focus:ring-[#7B2CBF]"
                              value={req.status || "New"}
                              disabled={updatingId === req.id}
                              onChange={(e) => handleStatusChange(req.id, e.target.value)}
                            >
                              <option value="New">New</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Assigned">Assigned</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Completed">Completed</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>

                            <button
                              onClick={() => handleDelete(req.id)}
                              disabled={updatingId === req.id}
                              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete request"
                            >
                              <Trash2 size={15} />
                            </button>
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
