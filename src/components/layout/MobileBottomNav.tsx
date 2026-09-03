import { Link, useLocation } from "react-router-dom";
import { Home, Stethoscope, CalendarPlus, ShieldCheck, PhoneCall } from "lucide-react";
import { cn } from "@/src/lib/utils";

export default function MobileBottomNav() {
  const location = useLocation();
  const path = location.pathname;

  // Don't show bottom nav inside admin pages
  if (path.startsWith("/admin")) {
    return null;
  }

  const items = [
    { name: "Home", href: "/", icon: Home },
    { name: "Services", href: "/services", icon: Stethoscope },
    { name: "Book Care", href: "/book", icon: CalendarPlus, isCenter: true },
    { name: "Plans", href: "/plans", icon: ShieldCheck },
    { name: "Call 24/7", href: "tel:+918001480075", icon: PhoneCall, isExternal: true },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200/80 md:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.06)] pb-[env(safe-area-inset-bottom,8px)]">
      <div className="flex items-center justify-around px-2 py-1.5">
        {items.map((item) => {
          const isActive = path === item.href;

          if (item.isCenter) {
            return (
              <Link
                key={item.name}
                to={item.href}
                className="relative -top-4 flex flex-col items-center group"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-tr from-[#7B2CBF] to-[#FF4F81] text-white shadow-lg shadow-purple-500/30 transform active:scale-95 transition-all">
                  <item.icon size={22} className="stroke-[2.5]" />
                </div>
                <span className="text-[10px] font-extrabold text-[#7B2CBF] mt-0.5">
                  {item.name}
                </span>
              </Link>
            );
          }

          if (item.isExternal) {
            return (
              <a
                key={item.name}
                href={item.href}
                className="flex flex-col items-center justify-center py-1 px-2 text-slate-500 hover:text-emerald-600 active:scale-95 transition-all"
              >
                <div className="h-6 flex items-center justify-center">
                  <item.icon size={19} className="text-emerald-600 animate-pulse" />
                </div>
                <span className="text-[10px] font-bold text-emerald-600 mt-0.5">
                  {item.name}
                </span>
              </a>
            );
          }

          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex flex-col items-center justify-center py-1 px-2 transition-all active:scale-95",
                isActive ? "text-[#7B2CBF]" : "text-slate-500 hover:text-slate-900"
              )}
            >
              <div className="h-6 flex items-center justify-center">
                <item.icon size={19} className={isActive ? "stroke-[2.5]" : "stroke-[1.8]"} />
              </div>
              <span className={cn("text-[10px] mt-0.5", isActive ? "font-extrabold" : "font-medium")}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
