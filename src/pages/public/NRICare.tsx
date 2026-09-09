import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { 
  Globe, 
  ShieldCheck, 
  Check, 
  Sparkles, 
  PhoneCall, 
  ArrowRight, 
  Stethoscope, 
  UserCheck, 
  Activity, 
  Heart, 
  FileText, 
  Video, 
  MessageSquare, 
  Hospital, 
  Star, 
  CheckCircle2, 
  Clock, 
  Building2,
  Tag,
  Shield,
  Award
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import SEO from "@/src/components/seo/SEO";
import { useAppContent } from "@/src/hooks/useAppContent";
import AutoBookingModal from "@/src/components/shared/AutoBookingModal";

// Motion Tokens
const premiumEase = [0.22, 1, 0.36, 1];

export default function NRICare() {
  const { siteSettings } = useAppContent();
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAnnual, setIsAnnual] = useState(false); // Billing toggle: false = Monthly, true = 1-Year Annual (20% OFF)

  const phone = siteSettings.phone || "+91 80014 80075";
  const rawPhone = phone.replace(/[^0-9+]/g, '');

  const handleBook = (pkgName: string) => {
    const cycle = isAnnual ? "1-Year Annual Plan (20% OFF)" : "Monthly Plan";
    setSelectedPackage(`${pkgName} (${cycle})`);
    setIsModalOpen(true);
  };

  const tableFeatures = [
    { 
      name: "Plan Price", 
      connect: isAnnual ? "₹3,999/mo (₹47,990/yr)" : "₹4,999/mo", 
      plus: isAnnual ? "₹9,599/mo (₹1,15,190/yr)" : "₹11,999/mo", 
      signature: isAnnual ? "₹19,999/mo (₹2,39,990/yr)" : "₹24,999+/mo", 
      highlight: true 
    },
    { 
      name: "20% Annual Discount Savings", 
      connect: isAnnual ? "Save ₹11,998" : "Available on 1-Year Plan", 
      plus: isAnnual ? "Save ₹28,798" : "Available on 1-Year Plan", 
      signature: isAnnual ? "Save ₹59,998" : "Available on 1-Year Plan", 
      highlight: isAnnual 
    },
    { name: "Nurse Home Visit", connect: "1 visit", plus: "2 visits", signature: "4 visits" },
    { name: "Doctor Home Visit", connect: "—", plus: "1/month", signature: "2/month" },
    { name: "BP Monitoring", connect: "✓", plus: "✓", signature: "Unlimited" },
    { name: "Blood Sugar (RBS)", connect: "✓", plus: "✓", signature: "Unlimited" },
    { name: "SpO₂ Monitoring", connect: "✓", plus: "✓", signature: "Unlimited" },
    { name: "Pulse Rate", connect: "✓", plus: "✓", signature: "Unlimited" },
    { name: "Temperature", connect: "✓", plus: "✓", signature: "Unlimited" },
    { name: "Weight & BMI", connect: "Monthly", plus: "Bi-weekly", signature: "Weekly" },
    { name: "Medication Management", connect: "Basic", plus: "Advanced", signature: "Personalized" },
    { name: "Blood Sample Collection", connect: "On request", plus: "1 included", signature: "2 included" },
    { name: "ECG at Home", connect: "Discounted", plus: "1/year", signature: "2/year" },
    { name: "Lab Test Coordination", connect: "✓", plus: "Priority", signature: "Priority + Reports" },
    { name: "Hospital Saathi", connect: "—", plus: "12 hrs/year", signature: "Unlimited coordination" },
    { name: "Family Health Report", connect: "Monthly", plus: "Bi-weekly", signature: "Weekly + Photos" },
    { name: "Care Manager", connect: "Shared", plus: "Dedicated", signature: "Senior Concierge" },
    { name: "Emergency Helpline", connect: "24×7", plus: "24×7", signature: "Priority 24×7" }
  ];

  const wellnessVitals = [
    { title: "Blood Pressure", desc: "Systolic & Diastolic continuous tracking", icon: Activity },
    { title: "Blood Sugar (RBS)", desc: "Glucometer testing & diabetes log", icon: Heart },
    { title: "SpO₂ Saturation", desc: "Oxygen saturation level tracking", icon: Stethoscope },
    { title: "Pulse / Heart Rate", desc: "Cardiac rate & pulse observation", icon: Activity },
    { title: "Body Temperature", desc: "Fever & infection screening", icon: ShieldCheck },
    { title: "Respiratory Rate", desc: "Lung function & breathing check", icon: Stethoscope },
    { title: "Weight & BMI", desc: "Nutritional status & weight monitoring", icon: FileText },
    { title: "Fall Risk & Mobility", desc: "Gait, balance & home hazard audit", icon: CheckCircle2 }
  ];

  const signaturePrivileges = [
    "Two scheduled doctor home visits every month",
    "Priority specialist appointment booking",
    "Blood tests with digital report sharing",
    "Portable ECG & nursing assessment",
    "Hospital admission, discharge & attendant coordination",
    "Weekly WhatsApp updates with photos, vitals & caregiver notes",
    "Monthly family video consultation with Care Manager"
  ];

  return (
    <>
      <SEO 
        title="NRI Signature Eldercare Membership | SilverCare India" 
        description="Luxury Healthcare Concierge for parents in India. Dedicated care manager, daily vitals, doctor visits, hospital saathi & weekly WhatsApp photo updates for NRIs in USA, UK, Canada & worldwide."
      />

      {/* Scoped NRI Care Page Container */}
      <div className="nri-care-page min-h-screen font-sans text-[#F8FAFC] selection:bg-[#C9A45C]/30 selection:text-[#F1D995]" style={{ backgroundColor: "#050A18" }}>

        {/* HERO SECTION */}
        <section 
          className="relative py-20 md:py-28 overflow-hidden border-b"
          style={{
            background: "radial-gradient(circle at 72% 30%, rgba(201,164,92,0.14), transparent 38%), linear-gradient(120deg, #060B1A 0%, #101B30 55%, #17253B 100%)",
            borderColor: "rgba(215, 182, 109, 0.2)"
          }}
        >
          {/* Subtle Golden Glow Overlays & Ambient Light */}
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#C9A45C]/10 blur-[130px] rounded-full pointer-events-none" />
          <div className="absolute -bottom-24 left-10 w-[420px] h-[420px] bg-[#9C7739]/15 blur-[140px] rounded-full pointer-events-none" />
          
          {/* Faint Luxury Radial Grid */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage: "radial-gradient(rgba(215, 182, 109, 0.25) 1px, transparent 1px)",
              backgroundSize: "32px 32px"
            }}
          />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl relative z-10 text-center">
            
            {/* Luxury Translucent Pill Badge */}
            <div 
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-widest mb-8 backdrop-blur-md shadow-sm transition-all"
              style={{
                background: "rgba(201, 164, 92, 0.08)",
                border: "1px solid rgba(215, 182, 109, 0.5)",
                color: "#E7D19A"
              }}
            >
              <Sparkles size={15} style={{ color: "#D7B66D" }} />
              <span>SILVERCARE INDIA CONCIERGE</span>
            </div>

            {/* Main Headline with Brushed Champagne Metallic Gold */}
            <h1 
              className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-4 uppercase leading-[1.15]"
              style={{ textShadow: "0 4px 30px rgba(0,0,0,0.4)" }}
            >
              NRI SIGNATURE <br className="hidden sm:inline" />
              <span 
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(90deg, #F3DEAA 0%, #C99E4E 48%, #F1D995 100%)"
                }}
              >
                ELDERCARE MEMBERSHIP
              </span>
            </h1>

            {/* Subheading */}
            <p 
              className="text-xl sm:text-2xl font-medium mb-6 max-w-3xl mx-auto tracking-wide"
              style={{ color: "#E5CF92" }}
            >
              Luxury Healthcare Concierge for Parents in India
            </p>

            {/* Description Card */}
            <div 
              className="p-5 sm:p-7 rounded-2xl max-w-3xl mx-auto backdrop-blur-md transition-all mb-10"
              style={{
                backgroundColor: "rgba(8, 15, 30, 0.65)",
                border: "1px solid rgba(215, 182, 109, 0.22)",
                boxShadow: "0 18px 50px rgba(0, 0, 0, 0.35)",
                color: "#B6C0D1"
              }}
            >
              <p className="text-sm sm:text-base leading-relaxed">
                Designed around the real concerns of NRIs living in USA, UK, Canada, UAE & worldwide: emergency support, preventive healthcare, transparent photo reporting, and dignified aging at home.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              <Button 
                onClick={() => handleBook("NRI Plus")} 
                size="lg" 
                className="cursor-pointer font-bold text-sm sm:text-base px-9 h-14 rounded-full transition-all duration-300 hover:-translate-y-0.5 active:scale-95 flex items-center gap-2.5"
                style={{
                  background: "linear-gradient(135deg, #B88D43 0%, #E0BD70 45%, #C39749 100%)",
                  color: "#090D16",
                  border: "1px solid rgba(255, 235, 185, 0.55)",
                  boxShadow: "0 10px 30px rgba(201, 164, 92, 0.25)"
                }}
              >
                <span>Book Membership Now</span>
                <ArrowRight size={18} />
              </Button>
              
              <a href={`tel:${rawPhone}`}>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="cursor-pointer font-semibold h-14 px-8 rounded-full transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    backgroundColor: "rgba(201, 164, 92, 0.06)",
                    border: "1px solid rgba(215, 182, 109, 0.60)",
                    color: "#E6CB8A"
                  }}
                >
                  <PhoneCall size={18} className="mr-2" style={{ color: "#D7B66D" }} />
                  <span>Care Line: {phone}</span>
                </Button>
              </a>
            </div>

          </div>
        </section>


        {/* MEMBERSHIP PACKAGES SECTION */}
        <section 
          className="py-20 relative"
          style={{ backgroundColor: "#050918" }}
        >
          {/* Central Subtle Warm Glow */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#C9A45C]/6 blur-[150px] rounded-full pointer-events-none" />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
            
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span 
                className="text-xs font-extrabold uppercase block mb-2"
                style={{ color: "#D7B66D", letterSpacing: "0.14em" }}
              >
                TIERED HEALTHCARE PLANS
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F8FAFC] tracking-tight">
                Membership Packages
              </h2>
              <p className="text-sm sm:text-base mt-2" style={{ color: "#9EABC0" }}>
                Select the level of care and concierge frequency tailored for your parents
              </p>
            </div>

            {/* BILLING CYCLE TOGGLE SWITCH */}
            <div className="flex items-center justify-center mb-14">
              <div 
                className="p-1.5 rounded-full flex items-center shadow-xl backdrop-blur-md"
                style={{
                  backgroundColor: "#10192A",
                  border: "1px solid rgba(215, 182, 109, 0.22)"
                }}
              >
                <button
                  type="button"
                  onClick={() => setIsAnnual(false)}
                  className="px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer"
                  style={
                    !isAnnual 
                      ? {
                          background: "linear-gradient(135deg, #B98A3D 0%, #E0B95E 100%)",
                          color: "#090D16",
                          boxShadow: "0 4px 15px rgba(201, 164, 92, 0.28)",
                          transform: "scale(1.02)"
                        } 
                      : { color: "#AEB8C7" }
                  }
                >
                  Monthly Plan
                </button>
                
                <button
                  type="button"
                  onClick={() => setIsAnnual(true)}
                  className="px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer"
                  style={
                    isAnnual 
                      ? {
                          background: "linear-gradient(135deg, #B98A3D 0%, #E0B95E 100%)",
                          color: "#090D16",
                          boxShadow: "0 4px 15px rgba(201, 164, 92, 0.28)",
                          transform: "scale(1.02)"
                        } 
                      : { color: "#AEB8C7" }
                  }
                >
                  <span>1-Year Annual Plan</span>
                  <span 
                    className="font-black text-[10px] uppercase px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-xs"
                    style={{
                      backgroundColor: "#D4AE58",
                      color: "#0B101A"
                    }}
                  >
                    <Tag size={10} /> 20% OFF
                  </span>
                </button>
              </div>
            </div>

            {/* 3 PRICING CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
              
              {/* CARD 1: NRI CONNECT */}
              <div 
                className="rounded-[20px] p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5"
                style={{
                  background: "linear-gradient(145deg, rgba(18, 29, 49, 0.96), rgba(10, 18, 32, 0.98))",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  boxShadow: "0 20px 55px rgba(0, 0, 0, 0.26)"
                }}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span 
                      className="inline-block px-3 py-1 rounded-full font-bold text-xs"
                      style={{
                        backgroundColor: "rgba(148, 163, 184, 0.12)",
                        border: "1px solid rgba(148, 163, 184, 0.3)",
                        color: "#CBD5E1"
                      }}
                    >
                      NRI CONNECT
                    </span>
                    {isAnnual && (
                      <span 
                        className="font-black text-[10px] px-2.5 py-0.5 rounded-full"
                        style={{
                          backgroundColor: "rgba(201, 164, 92, 0.15)",
                          border: "1px solid rgba(215, 182, 109, 0.4)",
                          color: "#F1D995"
                        }}
                      >
                        20% OFF
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2">Essential Care</h3>
                  
                  {isAnnual ? (
                    <div className="my-4">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs line-through text-slate-500 font-bold">₹4,999/mo</span>
                        <span 
                          className="text-[10px] font-bold px-2 py-0.5 rounded-md"
                          style={{
                            backgroundColor: "rgba(201, 164, 92, 0.15)",
                            color: "#E7D19A"
                          }}
                        >
                          Save ₹11,998/yr
                        </span>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl sm:text-4xl font-black" style={{ color: "#E3BF68" }}>₹3,999</span>
                        <span className="text-xs text-slate-400 font-medium">/month</span>
                      </div>
                      <p className="text-[11px] font-semibold mt-1" style={{ color: "#7EE787" }}>Billed ₹47,990 for 1 Year</p>
                    </div>
                  ) : (
                    <div className="flex items-baseline gap-1 my-4">
                      <span className="text-3xl sm:text-4xl font-black" style={{ color: "#E3BF68" }}>₹4,999</span>
                      <span className="text-xs text-slate-400 font-medium">/month</span>
                    </div>
                  )}

                  <p className="text-xs leading-relaxed mb-6" style={{ color: "#9EABC0" }}>
                    Routine nursing checks, vital monitoring, and monthly health updates for stable seniors.
                  </p>
                  
                  <ul className="space-y-3 text-xs mb-8 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.08)", color: "#CBD5E1" }}>
                    <li className="flex items-center gap-2"><Check size={16} style={{ color: "#D7B66D" }} className="shrink-0" /> 1 Nurse Home Visit per month</li>
                    <li className="flex items-center gap-2"><Check size={16} style={{ color: "#D7B66D" }} className="shrink-0" /> BP, Pulse, SpO₂, Blood Sugar & Temp</li>
                    <li className="flex items-center gap-2"><Check size={16} style={{ color: "#D7B66D" }} className="shrink-0" /> Basic Medication Management</li>
                    <li className="flex items-center gap-2"><Check size={16} style={{ color: "#D7B66D" }} className="shrink-0" /> Monthly Family Health Report</li>
                    <li className="flex items-center gap-2"><Check size={16} style={{ color: "#D7B66D" }} className="shrink-0" /> Shared Care Manager</li>
                    <li className="flex items-center gap-2"><Check size={16} style={{ color: "#D7B66D" }} className="shrink-0" /> 24×7 Emergency Helpline</li>
                  </ul>
                </div>

                <Button 
                  onClick={() => handleBook("NRI Connect")}
                  className="w-full font-bold h-12 rounded-xl transition-all duration-200 cursor-pointer"
                  style={{
                    backgroundColor: "rgba(201, 164, 92, 0.08)",
                    border: "1px solid rgba(215, 182, 109, 0.45)",
                    color: "#E7D19A"
                  }}
                >
                  Select NRI Connect {isAnnual && "(20% OFF)"}
                </Button>
              </div>

              {/* CARD 2: NRI PLUS (MOST POPULAR FEATURED CARD) */}
              <div 
                className="rounded-[20px] p-6 sm:p-8 flex flex-col justify-between relative transition-all duration-300 hover:-translate-y-2 md:-translate-y-2"
                style={{
                  background: "linear-gradient(145deg, rgba(31, 39, 54, 0.98), rgba(13, 21, 35, 0.98))",
                  border: "1.5px solid #C99D4E",
                  boxShadow: "0 24px 65px rgba(201, 164, 92, 0.18)"
                }}
              >
                {/* Featured Badge */}
                <div 
                  className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-[10px] font-black tracking-wider uppercase px-4 py-1 rounded-full shadow-md whitespace-nowrap"
                  style={{
                    background: "linear-gradient(90deg, #B88B3E 0%, #E2BD67 100%)",
                    color: "#0B0F17"
                  }}
                >
                  ★ MOST POPULAR CHOICE
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span 
                      className="inline-block px-3 py-1 rounded-full font-bold text-xs"
                      style={{
                        backgroundColor: "rgba(201, 164, 92, 0.18)",
                        border: "1px solid rgba(215, 182, 109, 0.5)",
                        color: "#F1D995"
                      }}
                    >
                      NRI PLUS
                    </span>
                    {isAnnual && (
                      <span 
                        className="font-black text-[10px] px-2.5 py-0.5 rounded-full"
                        style={{
                          backgroundColor: "#D4AE58",
                          color: "#0B101A"
                        }}
                      >
                        SAVE 20%
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">Advanced Care</h3>
                  
                  {isAnnual ? (
                    <div className="my-4">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs line-through text-slate-400 font-bold">₹11,999/mo</span>
                        <span 
                          className="text-[10px] font-bold px-2 py-0.5 rounded-md"
                          style={{
                            backgroundColor: "rgba(201, 164, 92, 0.22)",
                            border: "1px solid rgba(215, 182, 109, 0.4)",
                            color: "#F3DEAA"
                          }}
                        >
                          Save ₹28,798/yr
                        </span>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl sm:text-4xl font-black" style={{ color: "#E3BF68" }}>₹9,599</span>
                        <span className="text-xs text-slate-400 font-medium">/month</span>
                      </div>
                      <p className="text-[11px] font-semibold mt-1" style={{ color: "#7EE787" }}>Billed ₹1,15,190 for 1 Year</p>
                    </div>
                  ) : (
                    <div className="flex items-baseline gap-1 my-4">
                      <span className="text-3xl sm:text-4xl font-black" style={{ color: "#E3BF68" }}>₹11,999</span>
                      <span className="text-xs text-slate-400 font-medium">/month</span>
                    </div>
                  )}

                  <p className="text-xs leading-relaxed mb-6" style={{ color: "#B6C0D1" }}>
                    Comprehensive care including monthly doctor home visit, bi-weekly nurse visits & Hospital Saathi support.
                  </p>
                  
                  <ul className="space-y-3 text-xs mb-8 pt-6" style={{ borderTop: "1px solid rgba(215, 182, 109, 0.2)", color: "#F1F5F9" }}>
                    <li className="flex items-center gap-2"><Check size={16} style={{ color: "#F1D995" }} className="shrink-0" /> <strong>2 Nurse Home Visits</strong> per month</li>
                    <li className="flex items-center gap-2"><Check size={16} style={{ color: "#F1D995" }} className="shrink-0" /> <strong>1 Doctor Home Visit</strong> per month</li>
                    <li className="flex items-center gap-2"><Check size={16} style={{ color: "#F1D995" }} className="shrink-0" /> 1 Blood Sample Collection included</li>
                    <li className="flex items-center gap-2"><Check size={16} style={{ color: "#F1D995" }} className="shrink-0" /> 1 ECG at Home / year</li>
                    <li className="flex items-center gap-2"><Check size={16} style={{ color: "#F1D995" }} className="shrink-0" /> <strong>12 Hours/year Hospital Saathi</strong></li>
                    <li className="flex items-center gap-2"><Check size={16} style={{ color: "#F1D995" }} className="shrink-0" /> Dedicated Care Manager</li>
                    <li className="flex items-center gap-2"><Check size={16} style={{ color: "#F1D995" }} className="shrink-0" /> Bi-weekly Health Reports</li>
                  </ul>
                </div>

                <Button 
                  onClick={() => handleBook("NRI Plus")}
                  className="w-full font-bold text-sm h-12 rounded-xl shadow-lg transition-all duration-300 hover:brightness-105 active:scale-95 cursor-pointer"
                  style={{
                    background: "linear-gradient(135deg, #B88D43 0%, #E0BD70 45%, #C39749 100%)",
                    color: "#090D16",
                    border: "1px solid rgba(255, 235, 185, 0.45)",
                    boxShadow: "0 8px 25px rgba(201, 164, 92, 0.28)"
                  }}
                >
                  Select NRI Plus {isAnnual && "(20% OFF)"}
                </Button>
              </div>

              {/* CARD 3: NRI SIGNATURE */}
              <div 
                className="rounded-[20px] p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5"
                style={{
                  background: "linear-gradient(145deg, rgba(18, 29, 49, 0.96), rgba(10, 18, 32, 0.98))",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  boxShadow: "0 20px 55px rgba(0, 0, 0, 0.26)"
                }}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span 
                      className="inline-block px-3 py-1 rounded-full font-bold text-xs"
                      style={{
                        backgroundColor: "rgba(107, 33, 168, 0.25)",
                        border: "1px solid rgba(215, 182, 109, 0.35)",
                        color: "#F1D995"
                      }}
                    >
                      NRI SIGNATURE
                    </span>
                    {isAnnual && (
                      <span 
                        className="font-black text-[10px] px-2.5 py-0.5 rounded-full"
                        style={{
                          backgroundColor: "rgba(201, 164, 92, 0.15)",
                          border: "1px solid rgba(215, 182, 109, 0.4)",
                          color: "#F1D995"
                        }}
                      >
                        20% OFF
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">Luxury Concierge</h3>
                  
                  {isAnnual ? (
                    <div className="my-4">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs line-through text-slate-500 font-bold">₹24,999/mo</span>
                        <span 
                          className="text-[10px] font-bold px-2 py-0.5 rounded-md"
                          style={{
                            backgroundColor: "rgba(201, 164, 92, 0.15)",
                            color: "#E7D19A"
                          }}
                        >
                          Save ₹59,998/yr
                        </span>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl sm:text-4xl font-black" style={{ color: "#E3BF68" }}>₹19,999</span>
                        <span className="text-xs text-slate-400 font-medium">/month</span>
                      </div>
                      <p className="text-[11px] font-semibold mt-1" style={{ color: "#7EE787" }}>Billed ₹2,39,990 for 1 Year</p>
                    </div>
                  ) : (
                    <div className="flex items-baseline gap-1 my-4">
                      <span className="text-3xl sm:text-4xl font-black" style={{ color: "#E3BF68" }}>₹24,999+</span>
                      <span className="text-xs text-slate-400 font-medium">/month</span>
                    </div>
                  )}

                  <p className="text-xs leading-relaxed mb-6" style={{ color: "#9EABC0" }}>
                    VIP 24×7 Senior Concierge care with weekly nurse visits, 2 doctor home visits, and unlimited hospital coordination.
                  </p>
                  
                  <ul className="space-y-3 text-xs mb-8 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.08)", color: "#CBD5E1" }}>
                    <li className="flex items-center gap-2"><Check size={16} style={{ color: "#D7B66D" }} className="shrink-0" /> <strong>4 Nurse Home Visits</strong> per month</li>
                    <li className="flex items-center gap-2"><Check size={16} style={{ color: "#D7B66D" }} className="shrink-0" /> <strong>2 Doctor Home Visits</strong> per month</li>
                    <li className="flex items-center gap-2"><Check size={16} style={{ color: "#D7B66D" }} className="shrink-0" /> Unlimited BP, Sugar & Vitals tracking</li>
                    <li className="flex items-center gap-2"><Check size={16} style={{ color: "#D7B66D" }} className="shrink-0" /> 2 Blood Sample Collections included</li>
                    <li className="flex items-center gap-2"><Check size={16} style={{ color: "#D7B66D" }} className="shrink-0" /> 2 ECGs at Home / year</li>
                    <li className="flex items-center gap-2"><Check size={16} style={{ color: "#D7B66D" }} className="shrink-0" /> <strong>Unlimited Hospital Saathi Coordination</strong></li>
                    <li className="flex items-center gap-2"><Check size={16} style={{ color: "#D7B66D" }} className="shrink-0" /> Weekly Health Reports + Photo Logs</li>
                    <li className="flex items-center gap-2"><Check size={16} style={{ color: "#D7B66D" }} className="shrink-0" /> Senior VIP Concierge Manager</li>
                  </ul>
                </div>

                <Button 
                  onClick={() => handleBook("NRI Signature")}
                  className="w-full font-bold h-12 rounded-xl transition-all duration-200 cursor-pointer"
                  style={{
                    backgroundColor: "rgba(201, 164, 92, 0.08)",
                    border: "1px solid rgba(215, 182, 109, 0.45)",
                    color: "#E7D19A"
                  }}
                >
                  Select NRI Signature {isAnnual && "(20% OFF)"}
                </Button>
              </div>

            </div>
          </div>
        </section>


        {/* DETAILED FEATURE COMPARISON TABLE */}
        <section 
          className="py-20 border-t"
          style={{
            backgroundColor: "#0B1426",
            borderColor: "rgba(215, 182, 109, 0.2)"
          }}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span 
                className="text-xs font-extrabold uppercase block mb-2"
                style={{ color: "#D7B66D", letterSpacing: "0.14em" }}
              >
                COMPLETE SIDE-BY-SIDE MATRIX
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F8FAFC]">Full Feature Comparison</h2>
              <p className="text-sm sm:text-base mt-2" style={{ color: "#9EABC0" }}>
                Compare services across NRI Connect, NRI Plus, and NRI Signature packages
              </p>
            </div>

            <div 
              className="overflow-x-auto rounded-3xl shadow-2xl backdrop-blur-md"
              style={{
                backgroundColor: "#050A18",
                border: "1px solid rgba(215, 182, 109, 0.25)"
              }}
            >
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr style={{ backgroundColor: "#111C30", borderBottom: "1px solid rgba(215, 182, 109, 0.25)" }}>
                    <th className="p-4 sm:p-5 text-sm font-extrabold text-white uppercase tracking-wider w-2/5">Services</th>
                    <th className="p-4 sm:p-5 text-sm font-extrabold text-center w-1/5" style={{ color: "#CBD5E1" }}>NRI Connect</th>
                    <th 
                      className="p-4 sm:p-5 text-sm font-extrabold text-center w-1/5" 
                      style={{
                        backgroundColor: "rgba(201, 164, 92, 0.12)",
                        borderLeft: "1px solid rgba(215, 182, 109, 0.3)",
                        borderRight: "1px solid rgba(215, 182, 109, 0.3)",
                        color: "#F1D995"
                      }}
                    >
                      NRI Plus
                    </th>
                    <th className="p-4 sm:p-5 text-sm font-extrabold text-center w-1/5" style={{ color: "#E7D19A" }}>
                      NRI Signature
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y text-xs sm:text-sm" style={{ borderColor: "rgba(255, 255, 255, 0.06)" }}>
                  {tableFeatures.map((row, idx) => (
                    <tr 
                      key={row.name} 
                      className="transition-colors"
                      style={{
                        backgroundColor: row.highlight 
                          ? "rgba(201, 164, 92, 0.08)" 
                          : idx % 2 === 0 ? "#050A18" : "#0A1224"
                      }}
                    >
                      <td className="p-4 sm:p-5 font-bold" style={{ color: row.highlight ? "#F1D995" : "#E2E8F0" }}>
                        {row.name}
                      </td>
                      <td className="p-4 sm:p-5 text-center" style={{ color: "#94A3B8" }}>
                        {row.connect === "✓" ? <Check size={18} style={{ color: "#D7B66D" }} className="mx-auto" /> : row.connect}
                      </td>
                      <td 
                        className="p-4 sm:p-5 text-center font-bold"
                        style={{
                          backgroundColor: "rgba(201, 164, 92, 0.05)",
                          borderLeft: "1px solid rgba(215, 182, 109, 0.15)",
                          borderRight: "1px solid rgba(215, 182, 109, 0.15)",
                          color: "#F1D995"
                        }}
                      >
                        {row.plus === "✓" ? <Check size={18} style={{ color: "#F1D995" }} className="mx-auto" /> : row.plus}
                      </td>
                      <td className="p-4 sm:p-5 text-center font-semibold" style={{ color: "#E7D19A" }}>
                        {row.signature === "✓" ? <Check size={18} style={{ color: "#D7B66D" }} className="mx-auto" /> : row.signature}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </section>


        {/* DETAILED WELLNESS VITALS SECTION */}
        <section 
          className="py-20"
          style={{ backgroundColor: "#050A18" }}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span 
                className="text-xs font-extrabold uppercase block mb-2"
                style={{ color: "#D7B66D", letterSpacing: "0.14em" }}
              >
                CLINICAL PRECISION AT HOME
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F8FAFC]">Detailed Wellness Vitals Included</h2>
              <p className="text-sm sm:text-base mt-2" style={{ color: "#9EABC0" }}>
                Every home visit includes structured monitoring of essential vital parameters
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {wellnessVitals.map(vital => {
                const Icon = vital.icon;
                return (
                  <div 
                    key={vital.title} 
                    className="p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:border-[#D7B66D]"
                    style={{
                      backgroundColor: "#111C30",
                      border: "1px solid rgba(215, 182, 109, 0.22)",
                      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)"
                    }}
                  >
                    <div 
                      className="h-11 w-11 rounded-xl flex items-center justify-center mb-4"
                      style={{
                        backgroundColor: "rgba(201, 164, 92, 0.1)",
                        border: "1px solid rgba(215, 182, 109, 0.3)",
                        color: "#C9A45C"
                      }}
                    >
                      <Icon size={22} />
                    </div>
                    <h3 className="font-bold text-white text-base mb-1.5">{vital.title}</h3>
                    <p className="text-xs leading-relaxed" style={{ color: "#B6C0D1" }}>{vital.desc}</p>
                  </div>
                );
              })}
            </div>

          </div>
        </section>


        {/* PREMIUM SIGNATURE PRIVILEGES SECTION */}
        <section 
          className="py-20 border-t"
          style={{
            backgroundColor: "#0B1426",
            borderColor: "rgba(215, 182, 109, 0.2)"
          }}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            
            <div 
              className="p-8 sm:p-12 rounded-3xl shadow-2xl relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #101B30 0%, #152238 60%, #0B1426 100%)",
                border: "1.5px solid rgba(215, 182, 109, 0.35)",
                boxShadow: "0 24px 60px rgba(0, 0, 0, 0.4)"
              }}
            >
              {/* Subtle Ambient Glow */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#C9A45C]/10 blur-[100px] rounded-full pointer-events-none" />

              <div className="max-w-3xl relative z-10">
                <span 
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-bold text-xs uppercase tracking-wider mb-5"
                  style={{
                    backgroundColor: "rgba(201, 164, 92, 0.12)",
                    border: "1px solid rgba(215, 182, 109, 0.4)",
                    color: "#E7D19A"
                  }}
                >
                  <Star size={14} style={{ color: "#D7B66D", fill: "#D7B66D" }} /> LUXURY CONCIERGE BENEFITS
                </span>
                
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6 tracking-tight">
                  Premium Signature Privileges
                </h2>

                <div className="space-y-3.5 mb-8">
                  {signaturePrivileges.map(privilege => (
                    <div 
                      key={privilege} 
                      className="flex items-start gap-3.5 p-4 rounded-xl transition-all"
                      style={{
                        backgroundColor: "rgba(8, 15, 30, 0.5)",
                        border: "1px solid rgba(215, 182, 109, 0.18)"
                      }}
                    >
                      <CheckCircle2 size={20} style={{ color: "#D7B66D" }} className="shrink-0 mt-0.5" />
                      <span className="text-sm sm:text-base font-semibold" style={{ color: "#E2E8F0" }}>{privilege}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4 pt-6" style={{ borderTop: "1px solid rgba(215, 182, 109, 0.2)" }}>
                  <Button 
                    onClick={() => handleBook("NRI Signature Membership")}
                    size="lg"
                    className="font-bold text-sm sm:text-base h-13 px-8 rounded-xl shadow-lg transition-all duration-300 hover:brightness-105 active:scale-95 cursor-pointer"
                    style={{
                      background: "linear-gradient(135deg, #B88D43 0%, #E0BD70 45%, #C39749 100%)",
                      color: "#090D16",
                      border: "1px solid rgba(255, 235, 185, 0.5)",
                      boxShadow: "0 8px 25px rgba(201, 164, 92, 0.25)"
                    }}
                  >
                    Inquire for Signature Membership
                  </Button>
                  
                  <a href={`tel:${rawPhone}`}>
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="font-semibold h-13 px-7 rounded-xl transition-all duration-300 cursor-pointer"
                      style={{
                        backgroundColor: "rgba(201, 164, 92, 0.05)",
                        border: "1px solid rgba(215, 182, 109, 0.55)",
                        color: "#E6CB8A"
                      }}
                    >
                      Call Care Manager Direct
                    </Button>
                  </a>
                </div>

              </div>
            </div>

          </div>
        </section>


        {/* LOCATION FOOTER BANNER */}
        <section 
          className="py-14 border-t text-center"
          style={{
            backgroundColor: "#050A18",
            borderColor: "rgba(215, 182, 109, 0.2)"
          }}
        >
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <h3 className="text-xl font-bold text-white mb-2">SilverCare India • Trusted Home Healthcare for Seniors</h3>
            <p className="text-sm mb-4 flex items-center justify-center gap-2 flex-wrap" style={{ color: "#B6C0D1" }}>
              <Building2 size={16} style={{ color: "#C9A45C" }} /> Chandigarh • Zirakpur • Delhi NCR • Gurgaon • Noida
            </p>
            <p 
              className="text-xs font-extrabold tracking-widest uppercase"
              style={{ color: "#E7D19A" }}
            >
              24/7 NRI CARE LINE: {phone}
            </p>
          </div>
        </section>

      </div>

      {/* BOOKING MODAL */}
      <AutoBookingModal
        forceOpen={isModalOpen}
        initialService={selectedPackage ? `NRI Care Plan (${selectedPackage})` : "NRI Signature Eldercare Membership"}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
