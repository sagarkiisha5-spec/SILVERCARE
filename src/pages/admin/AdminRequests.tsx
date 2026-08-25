import { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { db, handleFirestoreError, OperationType } from "@/src/lib/firebase";
import { Card, CardContent } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { format } from "date-fns";

export default function AdminRequests() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db, "serviceRequests"), orderBy("createdAt", "desc"));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data: any[] = [];
      snapshot.forEach(doc => {
        data.push({ id: doc.id, ...doc.data() });
      });
      setRequests(data);
      setLoading(false);
    }, (error) => handleFirestoreError(error, OperationType.GET, "serviceRequests"));

    return () => unsubscribe();
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    try {
      await updateDoc(doc(db, "serviceRequests", id), {
        status: newStatus,
        updatedAt: Date.now()
      });
    } catch (err) {
      console.error(err);
      alert("Failed to update status.");
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'New': return 'bg-amber-100 text-amber-800';
      case 'Contacted': return 'bg-blue-100 text-blue-800';
      case 'Assigned': return 'bg-purple-100 text-purple-800';
      case 'In Progress': return 'bg-indigo-100 text-indigo-800';
      case 'Completed': return 'bg-teal-100 text-teal-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Service Requests</h1>
          <p className="text-slate-500">Manage patient bookings and inquiries.</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-500 font-medium border-b">
                <tr>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Patient</th>
                  <th className="px-6 py-4">Service</th>
                  <th className="px-6 py-4">Location</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-slate-500">Loading requests...</td>
                  </tr>
                ) : requests.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-slate-500">No requests found.</td>
                  </tr>
                ) : (
                  requests.map((req) => (
                    <tr key={req.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        {format(req.createdAt, "MMM d, yyyy")}
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-slate-900">{req.patientName}</div>
                        <div className="text-slate-500 text-xs">{req.phone}</div>
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-900">
                        {req.serviceName}
                      </td>
                      <td className="px-6 py-4 text-slate-500 max-w-[200px] truncate">
                        {req.location}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(req.status)}`}>
                          {req.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <select 
                          className="text-xs border rounded p-1 bg-white"
                          value={req.status}
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
  );
}
