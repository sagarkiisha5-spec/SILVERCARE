export interface PageViewEvent {
  id: string;
  page: string;
  title: string;
  city: string;
  device: "Mobile" | "Desktop" | "Tablet";
  source: string;
  timestamp: number;
}

export interface TrafficStats {
  liveVisitors: number;
  todayViews: number;
  weekViews: number;
  conversionRate: number;
  avgDuration: string;
  topPages: { path: string; title: string; views: number; percentage: number }[];
  cityBreakdown: { city: string; visits: number; percentage: number }[];
  deviceBreakdown: { device: string; percentage: number }[];
  hourlyTraffic: { hour: string; views: number }[];
  recentEvents: PageViewEvent[];
}

const TRACKING_STORAGE_KEY = "silvercare_website_traffic";

const INITIAL_EVENTS: PageViewEvent[] = [
  { id: "ev_1", page: "/services/doctor-visit-at-home", title: "Doctor Visit at Home", city: "Gurgaon Sector 54", device: "Mobile", source: "Google Search", timestamp: Date.now() - 1000 * 45 },
  { id: "ev_2", page: "/book", title: "Book Care Consultation", city: "South Delhi (GK 2)", device: "Mobile", source: "Direct Link", timestamp: Date.now() - 1000 * 120 },
  { id: "ev_3", page: "/services/nursing-attendant-care", title: "Nursing & Attendant Care", city: "Gurgaon DLF Phase 5", device: "Desktop", source: "Google Ads", timestamp: Date.now() - 1000 * 240 },
  { id: "ev_4", page: "/plans", title: "Freedom Eldercare Plans", city: "Noida Sector 62", device: "Mobile", source: "WhatsApp Share", timestamp: Date.now() - 1000 * 380 },
  { id: "ev_5", page: "/", title: "SilverCare India Homepage", city: "Faridabad", device: "Desktop", source: "Organic Search", timestamp: Date.now() - 1000 * 600 },
  { id: "ev_6", page: "/services/physiotherapy-at-home", title: "Physiotherapy at Home", city: "Gurgaon Sector 48", device: "Mobile", source: "Google Search", timestamp: Date.now() - 1000 * 950 }
];

export function getTrafficStats(): TrafficStats {
  const baseLive = Math.floor(Math.random() * 4) + 8; // 8 - 11 live visitors
  const todayViews = 1428 + Math.floor(Math.random() * 25);
  
  return {
    liveVisitors: baseLive,
    todayViews: todayViews,
    weekViews: 9840,
    conversionRate: 6.8,
    avgDuration: "3m 48s",
    topPages: [
      { path: "/", title: "Homepage (SilverCare India)", views: 612, percentage: 42 },
      { path: "/services/doctor-visit-at-home", title: "Doctor Visit at Home", views: 284, percentage: 20 },
      { path: "/services/nursing-attendant-care", title: "Home Nursing & Attendants", views: 245, percentage: 17 },
      { path: "/plans", title: "Freedom Eldercare Plans", views: 156, percentage: 11 },
      { path: "/services/physiotherapy-at-home", title: "Physiotherapy at Home", views: 88, percentage: 6 },
      { path: "/contact", title: "Emergency Helpline & Contact", views: 58, percentage: 4 },
    ],
    cityBreakdown: [
      { city: "Gurgaon (NCR Hub)", visits: 685, percentage: 48 },
      { city: "South & Central Delhi", visits: 399, percentage: 28 },
      { city: "Noida & Greater Noida", visits: 228, percentage: 16 },
      { city: "Faridabad & Others", visits: 114, percentage: 8 },
    ],
    deviceBreakdown: [
      { device: "Mobile Phones", percentage: 68 },
      { device: "Desktop / Laptops", percentage: 28 },
      { device: "Tablets / iPads", percentage: 4 },
    ],
    hourlyTraffic: [
      { hour: "06:00", views: 18 },
      { hour: "08:00", views: 54 },
      { hour: "10:00", views: 142 },
      { hour: "12:00", views: 186 },
      { hour: "14:00", views: 135 },
      { hour: "16:00", views: 198 },
      { hour: "18:00", views: 245 },
      { hour: "20:00", views: 268 },
      { hour: "22:00", views: 182 },
    ],
    recentEvents: INITIAL_EVENTS
  };
}

export function logPageView(page: string, title: string) {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(TRACKING_STORAGE_KEY);
    const events: PageViewEvent[] = raw ? JSON.parse(raw) : INITIAL_EVENTS;
    
    const cities = ["Gurgaon Sector 54", "South Delhi (GK 2)", "Noida Sector 62", "Gurgaon DLF Phase 5", "Faridabad"];
    const randomCity = cities[Math.floor(Math.random() * cities.length)];
    const isMobile = window.innerWidth < 768;

    const newEvent: PageViewEvent = {
      id: `ev_${Date.now()}`,
      page,
      title,
      city: randomCity,
      device: isMobile ? "Mobile" : "Desktop",
      source: "Direct / Search",
      timestamp: Date.now()
    };

    const updated = [newEvent, ...events.slice(0, 19)];
    localStorage.setItem(TRACKING_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.warn("Tracking error:", e);
  }
}
