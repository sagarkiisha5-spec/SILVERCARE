import React, { useState } from "react";
import { Receipt, Plus, Download, Printer, Send, CheckCircle2, Clock, IndianRupee, FileText, Search, User, Phone, MapPin, Calendar, Heart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";

export interface InvoiceItem {
  id: string;
  invoiceNo: string;
  patientName: string;
  phone: string;
  service: string;
  careType: string;
  amount: number;
  duration: string;
  status: "Paid" | "Pending" | "Partially Paid";
  date: string;
  dueDate: string;
}

const INITIAL_INVOICES: InvoiceItem[] = [
  {
    id: "inv_1",
    invoiceNo: "SC-2026-0891",
    patientName: "Rameshwar Sharma",
    phone: "+91 9810234567",
    service: "24x7 Critical Home Nursing Care",
    careType: "Nursing",
    amount: 32000,
    duration: "15 Days (24x7 Shift)",
    status: "Paid",
    date: "01 Sep 2026",
    dueDate: "01 Sep 2026"
  },
  {
    id: "inv_2",
    invoiceNo: "SC-2026-0892",
    patientName: "Kamla Devi",
    phone: "+91 9871122334",
    service: "Freedom Silver Monthly Eldercare Plan",
    careType: "Care Plan",
    amount: 14999,
    duration: "Monthly Subscription",
    status: "Paid",
    date: "28 Aug 2026",
    dueDate: "28 Aug 2026"
  },
  {
    id: "inv_3",
    invoiceNo: "SC-2026-0893",
    patientName: "Ayush Mathur",
    phone: "+91 67089835693",
    service: "Senior Telemedicine & Doctor Consultation",
    careType: "Doctor Visit",
    amount: 1800,
    duration: "Single Consultation",
    status: "Pending",
    date: "03 Sep 2026",
    dueDate: "05 Sep 2026"
  },
  {
    id: "inv_4",
    invoiceNo: "SC-2026-0894",
    patientName: "Col. H. S. Bakshi",
    phone: "+91 9911002233",
    service: "Post-Stroke Rehabilitation & Physiotherapy",
    careType: "Physiotherapy",
    amount: 12500,
    duration: "10 Sessions Package",
    status: "Partially Paid",
    date: "02 Sep 2026",
    dueDate: "07 Sep 2026"
  }
];

const STORAGE_KEY = "silvercare_billing_invoices";

export default function AdminBilling() {
  const [invoices, setInvoices] = useState<InvoiceItem[]>(() => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : INITIAL_INVOICES;
    } catch {
      return INITIAL_INVOICES;
    }
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceItem | null>(null);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");

  const [form, setForm] = useState({
    patientName: "",
    phone: "",
    service: "12h Dedicated Home Nursing",
    amount: 18000,
    duration: "15 Days",
    status: "Pending" as "Paid" | "Pending" | "Partially Paid",
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
  });

  const saveInvoices = (updated: InvoiceItem[]) => {
    setInvoices(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn("Storage error:", e);
    }
  };

  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.patientName || !form.amount) return;

    const newInv: InvoiceItem = {
      id: `inv_${Date.now()}`,
      invoiceNo: `SC-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      patientName: form.patientName,
      phone: form.phone.startsWith("+91") ? form.phone : `+91 ${form.phone}`,
      service: form.service,
      careType: "Healthcare Service",
      amount: Number(form.amount),
      duration: form.duration,
      status: form.status,
      date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      dueDate: form.dueDate
    };

    saveInvoices([newInv, ...invoices]);
    setSaveMsg(`Invoice ${newInv.invoiceNo} generated for ${newInv.patientName}!`);
    setIsModalOpen(false);
    setTimeout(() => setSaveMsg(""), 3500);
  };

  const handleSendWhatsApp = (inv: InvoiceItem) => {
    const cleanPhone = inv.phone.replace(/[^0-9]/g, "");
    const msg = encodeURIComponent(
      `*SilverCare India - Eldercare Invoice Summary*\n\n` +
      `Dear ${inv.patientName},\n` +
      `Thank you for trusting SilverCare for your eldercare needs.\n\n` +
      `📄 *Invoice No:* ${inv.invoiceNo}\n` +
      `🩺 *Care Service:* ${inv.service} (${inv.duration})\n` +
      `💰 *Amount Due:* ₹${inv.amount.toLocaleString("en-IN")}\n` +
      `📅 *Status:* ${inv.status}\n\n` +
      `For payment & bank transfer details, please call 24/7 Helpline: +91 800-14-800-75\n` +
      `SilverCare India - Compassionate Care for Elders.`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${msg}`, "_blank");
  };

  const totalBilled = invoices.reduce((acc, i) => acc + i.amount, 0);
  const totalPaid = invoices.filter((i) => i.status === "Paid").reduce((acc, i) => acc + i.amount, 0);
  const totalPending = invoices.filter((i) => i.status !== "Paid").reduce((acc, i) => acc + i.amount, 0);

  const filteredInvoices = invoices.filter((i) => {
    const matchesSearch =
      i.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.invoiceNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      i.phone.includes(searchQuery);
    const matchesStatus = statusFilter === "All" || i.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Patient Care Invoicing & Revenue</h1>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
              Billing Hub
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Generate eldercare invoices, track package fees, send WhatsApp bills & print tax receipts.
          </p>
        </div>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#7B2CBF] hover:bg-[#6A24A6] text-white font-bold shadow-sm flex items-center gap-2"
        >
          <Plus size={18} /> Create New Invoice
        </Button>
      </div>

      {saveMsg && (
        <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-sm text-emerald-800 font-semibold flex items-center gap-2">
          <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
          <span>{saveMsg}</span>
        </div>
      )}

      {/* Revenue Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <p className="text-xs font-bold text-slate-400 uppercase">Total Billed Revenue</p>
          <p className="text-2xl font-black text-slate-900 mt-1">₹{totalBilled.toLocaleString("en-IN")}</p>
          <p className="text-[11px] text-slate-500 mt-0.5">{invoices.length} Invoices Generated</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-emerald-200 bg-emerald-50/30 shadow-2xs">
          <p className="text-xs font-bold text-emerald-700 uppercase">Collected Payments</p>
          <p className="text-2xl font-black text-emerald-700 mt-1">₹{totalPaid.toLocaleString("en-IN")}</p>
          <p className="text-[11px] text-emerald-600 mt-0.5">Verified Collections</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-amber-200 bg-amber-50/30 shadow-2xs">
          <p className="text-xs font-bold text-amber-700 uppercase">Pending Invoices</p>
          <p className="text-2xl font-black text-amber-700 mt-1">₹{totalPending.toLocaleString("en-IN")}</p>
          <p className="text-[11px] text-amber-600 mt-0.5">Due for follow-up</p>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col md:flex-row gap-3 items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="relative w-full md:w-80">
          <Input
            placeholder="Search invoice number, patient or service..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-10 text-xs"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          {["All", "Paid", "Pending", "Partially Paid"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                statusFilter === st
                  ? "bg-[#7B2CBF] text-white shadow-2xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Invoices Table */}
      <Card className="border border-slate-200 shadow-2xs overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto w-full">
            <table className="w-full min-w-[900px] text-xs text-left">
              <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="px-5 py-3.5 min-w-[130px]">Invoice #</th>
                  <th className="px-5 py-3.5 min-w-[200px]">Patient & Family</th>
                  <th className="px-5 py-3.5 min-w-[230px]">Eldercare Service</th>
                  <th className="px-5 py-3.5 min-w-[130px]">Amount</th>
                  <th className="px-5 py-3.5 min-w-[110px]">Status</th>
                  <th className="px-5 py-3.5 text-right min-w-[170px]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredInvoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-purple-50/30 transition-colors">
                    <td className="px-5 py-4 font-mono font-bold text-[#7B2CBF]">
                      {inv.invoiceNo}
                      <p className="text-[10px] text-slate-400 font-sans font-normal mt-0.5">{inv.date}</p>
                    </td>
                    <td className="px-5 py-4">
                      <div className="font-bold text-slate-900 text-sm">{inv.patientName}</div>
                      <div className="text-slate-500 text-xs mt-0.5 flex items-center gap-1">
                        <Phone size={11} className="text-[#FF4F81]" /> {inv.phone}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="font-bold text-slate-800">{inv.service}</div>
                      <p className="text-[11px] text-slate-500 mt-0.5">{inv.duration}</p>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-sm font-black text-slate-900">₹{inv.amount.toLocaleString("en-IN")}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold border ${
                          inv.status === "Paid"
                            ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                            : inv.status === "Pending"
                            ? "bg-amber-100 text-amber-800 border-amber-200"
                            : "bg-blue-100 text-blue-800 border-blue-200"
                        }`}
                      >
                        {inv.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setSelectedInvoice(inv);
                            setIsPrintModalOpen(true);
                          }}
                          className="h-8 text-xs font-bold border-slate-200 hover:bg-purple-50 hover:text-[#7B2CBF]"
                        >
                          <Printer size={13} className="mr-1" /> View / Print
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleSendWhatsApp(inv)}
                          className="h-8 text-xs font-bold bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-2xs"
                        >
                          <Send size={13} className="mr-1" /> WhatsApp
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

      {/* Create Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-4">
            <h3 className="text-xl font-extrabold text-[#17345E]">Create Patient Care Invoice</h3>
            <p className="text-xs text-slate-500">
              Generate official billing invoice for eldercare, nursing shifts or consultation packages.
            </p>

            <form onSubmit={handleCreateInvoice} className="space-y-4 text-xs font-bold text-slate-700">
              <div>
                <label className="block mb-1 uppercase">Patient Name *</label>
                <Input
                  required
                  placeholder="e.g. Smt. Gayatri Devi"
                  value={form.patientName}
                  onChange={(e) => setForm({ ...form, patientName: e.target.value })}
                />
              </div>

              <div>
                <label className="block mb-1 uppercase">Patient / Family Phone *</label>
                <Input
                  required
                  placeholder="+91 98100 00000"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 uppercase">Care Service *</label>
                  <select
                    className="w-full p-2.5 border border-slate-200 rounded-xl outline-none focus:border-[#7B2CBF] bg-white text-xs font-semibold"
                    value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                  >
                    <option value="12h Dedicated Home Nursing">12h Dedicated Home Nursing</option>
                    <option value="24x7 Critical Home Care">24x7 Critical Home Care</option>
                    <option value="Doctor Visit at Home">Doctor Visit at Home</option>
                    <option value="Freedom Silver Monthly Plan">Freedom Silver Monthly Plan</option>
                    <option value="Freedom Gold Annual Plan">Freedom Gold Annual Plan</option>
                    <option value="Physiotherapy Rehabilitation Package">Physiotherapy Package</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1 uppercase">Care Duration</label>
                  <Input
                    placeholder="e.g. 15 Days / Monthly"
                    value={form.duration}
                    onChange={(e) => setForm({ ...form, duration: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 uppercase">Total Amount (₹ INR) *</label>
                  <Input
                    type="number"
                    required
                    placeholder="18000"
                    value={form.amount}
                    onChange={(e) => setForm({ ...form, amount: Number(e.target.value) })}
                  />
                </div>

                <div>
                  <label className="block mb-1 uppercase">Payment Status</label>
                  <select
                    className="w-full p-2.5 border border-slate-200 rounded-xl outline-none focus:border-[#7B2CBF] bg-white text-xs font-semibold"
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value as any })}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Paid">Paid</option>
                    <option value="Partially Paid">Partially Paid</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <Button type="button" onClick={() => setIsModalOpen(false)} variant="outline" className="h-10 px-5 rounded-xl">
                  Cancel
                </Button>
                <Button type="submit" className="bg-[#7B2CBF] text-white font-extrabold h-10 px-6 rounded-xl">
                  Generate Invoice
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Print / View Modal */}
      {isPrintModalOpen && selectedInvoice && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto print:p-0">
            {/* Invoice Header */}
            <div className="flex justify-between items-start border-b border-slate-200 pb-6">
              <div>
                <img src="/silvercare-logo.png" alt="SilverCare" className="h-10 w-auto object-contain mb-2" />
                <p className="text-xs text-slate-500">SilverCare India Healthcare Services Pvt. Ltd.</p>
                <p className="text-xs text-slate-500">DLF Phase 5 & Golf Course Ext, Gurgaon, NCR</p>
                <p className="text-xs text-slate-500">24/7 Helpline: +91 800-14-800-75 | care@silvercareindia.com</p>
              </div>
              <div className="text-right">
                <h2 className="text-2xl font-black text-[#17345E]">TAX INVOICE</h2>
                <p className="text-xs font-mono font-bold text-[#7B2CBF] mt-1">{selectedInvoice.invoiceNo}</p>
                <p className="text-xs text-slate-500 mt-0.5">Date: {selectedInvoice.date}</p>
              </div>
            </div>

            {/* Bill To */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs space-y-1">
              <p className="font-bold text-slate-400 uppercase text-[10px]">Patient & Family Details</p>
              <p className="text-base font-bold text-slate-900">{selectedInvoice.patientName}</p>
              <p className="text-slate-600">Contact: {selectedInvoice.phone}</p>
            </div>

            {/* Line Items */}
            <div className="border border-slate-200 rounded-2xl overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-slate-100 text-slate-700 font-bold">
                  <tr>
                    <th className="p-3">Service Description</th>
                    <th className="p-3">Duration / Shifts</th>
                    <th className="p-3 text-right">Amount (₹)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="p-3 font-bold text-slate-800">{selectedInvoice.service}</td>
                    <td className="p-3 text-slate-600">{selectedInvoice.duration}</td>
                    <td className="p-3 text-right font-black text-slate-900">₹{selectedInvoice.amount.toLocaleString("en-IN")}</td>
                  </tr>
                </tbody>
                <tfoot className="bg-purple-50/50 font-bold border-t border-slate-200">
                  <tr>
                    <td colSpan={2} className="p-3 text-right text-slate-700">Total Net Amount:</td>
                    <td className="p-3 text-right text-base font-black text-[#7B2CBF]">
                      ₹{selectedInvoice.amount.toLocaleString("en-IN")}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-slate-100">
              <Button onClick={() => setIsPrintModalOpen(false)} variant="outline" className="h-10 px-6 rounded-xl">
                Close
              </Button>
              <div className="flex gap-2">
                <Button onClick={() => handleSendWhatsApp(selectedInvoice)} className="bg-[#25D366] text-white font-bold h-10 px-5 rounded-xl">
                  <Send size={15} className="mr-1.5" /> Send to WhatsApp
                </Button>
                <Button onClick={() => window.print()} className="bg-[#7B2CBF] text-white font-bold h-10 px-6 rounded-xl">
                  <Printer size={15} className="mr-1.5" /> Print Receipt
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
