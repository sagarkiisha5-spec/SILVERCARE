import { useState, useEffect } from "react";
import { collection, query, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/src/lib/firebase";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Plus, Edit2, Trash2, Save, X } from "lucide-react";
import { Service } from "@/src/hooks/useAppContent";

export default function AdminServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState<Partial<Service>>({});

  useEffect(() => {
    fetchServices();
  }, []);

  async function fetchServices() {
    try {
      const snap = await getDocs(query(collection(db, 'services')));
      setServices(snap.docs.map(d => ({ id: d.id, ...d.data() } as Service)));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const handleSave = async () => {
    try {
      // Basic slugification if not provided
      const slug = formData.slug || formData.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || '';
      
      const aliasesArray = typeof formData.aliases === 'string' 
        ? (formData.aliases as string).split(',').map((s: string) => s.trim()).filter(Boolean)
        : formData.aliases || [];

      const dataToSave = {
        title: formData.title || '',
        slug,
        category: formData.category || '',
        shortDescription: formData.shortDescription || '',
        description: formData.description || '',
        icon: formData.icon || 'stethoscope',
        isActive: formData.isActive !== false,
        aliases: aliasesArray
      };

      if (isEditing) {
        await updateDoc(doc(db, 'services', isEditing), dataToSave);
      } else {
        await addDoc(collection(db, 'services'), dataToSave);
      }
      
      setFormData({});
      setIsEditing(null);
      setIsCreating(false);
      fetchServices();
    } catch (error) {
      console.error(error);
      alert("Failed to save service");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    try {
      await deleteDoc(doc(db, 'services', id));
      fetchServices();
    } catch (error) {
      console.error(error);
      alert("Failed to delete service");
    }
  };

  const startEdit = (srv: Service) => {
    setFormData({
      ...srv,
      aliases: srv.aliases?.join(', ') as any // Temporary store as string for input
    });
    setIsEditing(srv.id);
    setIsCreating(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900">Manage Services</h1>
        <Button onClick={() => { setIsCreating(true); setIsEditing(null); setFormData({}); }} className="bg-teal-600 hover:bg-teal-700">
          <Plus className="mr-2" size={16} /> Add New Service
        </Button>
      </div>

      {(isCreating || isEditing) && (
        <Card className="border-teal-200 shadow-md">
          <CardHeader className="bg-teal-50/50 border-b border-teal-100">
            <CardTitle>{isEditing ? 'Edit Service' : 'Create New Service'}</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Service Title</label>
                <Input value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="e.g. Home Nursing" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Slug / URL Path</label>
                <Input value={formData.slug || ''} onChange={e => setFormData({...formData, slug: e.target.value})} placeholder="e.g. home-nursing" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <Input value={formData.category || ''} onChange={e => setFormData({...formData, category: e.target.value})} placeholder="e.g. Clinical Care" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Icon Name</label>
                <select 
                  className="flex h-10 w-full rounded-md border border-slate-300 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-teal-500"
                  value={formData.icon || 'stethoscope'}
                  onChange={e => setFormData({...formData, icon: e.target.value})}
                >
                  <option value="heartpulse">Heart Pulse</option>
                  <option value="stethoscope">Stethoscope</option>
                  <option value="activity">Activity (Physio)</option>
                  <option value="usercheck">User Check (Lab)</option>
                </select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Search Keywords / Aliases (Comma separated)</label>
                <Input value={formData.aliases as any || ''} onChange={e => setFormData({...formData, aliases: e.target.value as any})} placeholder="e.g. nurse, nursing, injection" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Short Description (For cards)</label>
                <Input value={formData.shortDescription || ''} onChange={e => setFormData({...formData, shortDescription: e.target.value})} placeholder="Brief 1-liner" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Full Description (For service detail page)</label>
                <textarea 
                  className="flex min-h-[100px] w-full rounded-md border border-slate-300 bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-teal-500"
                  value={formData.description || ''} 
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  placeholder="Detailed explanation of the service..."
                />
              </div>
              <div className="space-y-2 flex items-center gap-2">
                <input 
                  type="checkbox" 
                  id="isActive"
                  checked={formData.isActive !== false} 
                  onChange={e => setFormData({...formData, isActive: e.target.checked})}
                  className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                />
                <label htmlFor="isActive" className="text-sm font-medium cursor-pointer">Active (Visible on website)</label>
              </div>
            </div>
            
            <div className="mt-6 flex gap-3">
              <Button onClick={handleSave} className="bg-teal-600 hover:bg-teal-700"><Save className="mr-2" size={16} /> Save Service</Button>
              <Button onClick={() => { setIsCreating(false); setIsEditing(null); }} variant="outline"><X className="mr-2" size={16} /> Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {loading ? (
        <div className="p-8 text-center text-slate-500">Loading...</div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 font-bold">Service Title</th>
                  <th className="px-6 py-4 font-bold">Category</th>
                  <th className="px-6 py-4 font-bold">Keywords</th>
                  <th className="px-6 py-4 font-bold">Status</th>
                  <th className="px-6 py-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.length === 0 ? (
                  <tr><td colSpan={5} className="px-6 py-8 text-center text-slate-500">No services found in database. Create one to get started, or use Content Manager to seed defaults.</td></tr>
                ) : services.map(srv => (
                  <tr key={srv.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                    <td className="px-6 py-4 font-medium text-slate-900">{srv.title}</td>
                    <td className="px-6 py-4 text-slate-500">{srv.category || '-'}</td>
                    <td className="px-6 py-4 text-slate-500 truncate max-w-[200px]">{srv.aliases?.join(', ') || '-'}</td>
                    <td className="px-6 py-4">
                      {srv.isActive 
                        ? <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">Active</span>
                        : <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">Inactive</span>
                      }
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="outline" size="sm" onClick={() => startEdit(srv)} className="h-8 px-2"><Edit2 size={14} /></Button>
                        <Button variant="outline" size="sm" onClick={() => handleDelete(srv.id)} className="h-8 px-2 text-red-600 hover:bg-red-50 hover:text-red-700"><Trash2 size={14} /></Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}