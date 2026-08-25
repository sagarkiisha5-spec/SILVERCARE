import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, CalendarDays, Users, Stethoscope, FileText, Settings, LogOut, HeartPulse, Share2, Image, BookOpen } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { useAuth } from "@/src/lib/AuthContext";

interface AdminSidebarProps {
  onCloseMobile?: () => void;
}

export default function AdminSidebar({ onCloseMobile }: AdminSidebarProps) {
  const location = useLocation();
  const path = location.pathname;
  const { logout } = useAuth();

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Service Requests", href: "/admin/requests", icon: CalendarDays },
    { name: "Healthcare Staff", href: "/admin/professionals", icon: Users },
    { name: "Eldercare Services", href: "/admin/services", icon: Stethoscope },
    { name: "Blog & Stories", href: "/admin/blog", icon: BookOpen },
    { name: "Media & Branding", href: "/admin/content", icon: Image },
    { name: "Social Media Sync", href: "/admin/social-sync", icon: Share2 },
    { name: "System Settings", href: "/admin/settings", icon: Settings },
  ];

  const handleLinkClick = () => {
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <div className="flex h-full w-64 flex-col border-r border-slate-200/80 bg-white font-sans shadow-sm">
      {/* Brand Header */}
      <div className="flex h-20 items-center px-5 border-b border-slate-100 justify-between">
        <Link to="/admin" onClick={handleLinkClick} className="flex items-center gap-2">
          <img
            src="/silvercare-logo.png"
            alt="SilverCare Logo"
            className="h-10 w-auto object-contain"
            onError={(e) => {
              (e.target as any).src = "https://silvercareindia.com/wp-content/uploads/2025/12/logo.png";
            }}
          />
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-1.5 px-3 py-6 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = path === item.href || (item.href !== "/admin" && path.startsWith(item.href));
          return (
            <Link
              key={item.name}
              to={item.href}
              onClick={handleLinkClick}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3.5 py-3 text-xs font-bold transition-all",
                isActive
                  ? "bg-purple-50 text-[#7B2CBF] shadow-sm border border-purple-100/80"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <item.icon size={18} className={isActive ? "text-[#7B2CBF]" : "text-slate-400"} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Footer & Logout */}
      <div className="border-t border-slate-100 p-4 space-y-3">
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-[11px] text-slate-500">
          <p className="font-bold text-slate-700">Logged in as Admin</p>
          <p className="text-[10px] text-slate-400">ID: admin</p>
        </div>
        <button
          onClick={() => logout()}
          className="flex w-full items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors border border-slate-200"
        >
          <LogOut size={16} /> Sign Out
        </button>
      </div>
    </div>
  );
}
