import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import { useAuth } from "@/src/lib/AuthContext";
import { Menu, X, HeartPulse } from "lucide-react";

export default function AdminLayout() {
  const { user, loading, isAdmin } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-slate-500 font-bold animate-pulse">Loading secure admin environment...</div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans flex-col md:flex-row">
      {/* Mobile Admin Header */}
      <div className="md:hidden flex items-center justify-between px-4 h-16 bg-white border-b border-slate-200 shrink-0 z-40">
        <div className="flex items-center gap-2">
          <img
            src="/silvercare-logo.png"
            alt="SilverCare Logo"
            className="h-8 w-auto object-contain"
            onError={(e) => {
              (e.target as any).src = "https://silvercareindia.com/wp-content/uploads/2025/12/logo.png";
            }}
          />
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg text-slate-600 hover:bg-slate-100"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Desktop Sidebar / Mobile Overlay Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white transition-transform duration-300 transform md:static md:translate-x-0 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <AdminSidebar onCloseMobile={() => setMobileMenuOpen(false)} />
      </div>

      {/* Mobile Backdrop Overlay */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-40 bg-slate-900/50 md:hidden backdrop-blur-xs"
        />
      )}

      {/* Main Admin Area */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-6xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

