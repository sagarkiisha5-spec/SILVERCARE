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
  Tag
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

      <div className="bg-slate-900 text-slate-100 min-h-screen font-sans">

        {/* HERO SECTION */}
        <section className="relative bg-[linear-gradient(135deg,#0B132B_0%,#1C2541_50%,#3A506B_100%)] text-white py-16 md:py-24 border-b border-amber-500/20 overflow-hidden">
          {/* Subtle Golden Glow Overlay */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 blur-[120px] rounded-full pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/10 blur-[120px] rounded-full pointer-events-none"></div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl relative z-10 text-center">
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-extrabold uppercase tracking-widest mb-6">
              <Sparkles size={16} className="text-amber-400" /> SILVERCARE INDIA
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white mb-4 uppercase leading-tight">
              NRI SIGNATURE <span className="bg-clip-text text-transparent bg-[linear-gradient(90deg,#F59E0B,#FBBF24,#FDE68A)]">ELDERCARE MEMBERSHIP</span>
            </h1>

            <p className="text-xl sm:text-2xl text-amber-200/90 font-medium mb-6 max-w-3xl mx-auto">
              Luxury Healthcare Concierge for Parents in India
            </p>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto bg-slate-800/60 p-4 sm:p-6 rounded-2xl border border-slate-700/80 backdrop-blur-md">
              Designed around the real concerns of NRIs living in USA, UK, Canada, UAE & worldwide: emergency support, preventive healthcare, transparent photo reporting, and dignified aging at home.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button 
                onClick={() => handleBook("NRI Plus")} 
                size="lg" 
                className="bg-[linear-gradient(90deg,#F59E0B,#D97706)] hover:opacity-95 text-slate-950 font-black text-sm sm:text-base px-8 h-14 rounded-full shadow-lg shadow-amber-500/20 border-0"
              >
                Book Membership Now <ArrowRight size={18} />
              </Button>
              <a href={`tel:${rawPhone}`}>
                <Button variant="outline" size="lg" className="bg-white/5 hover:bg-white/10 text-amber-300 border-amber-500/40 font-bold h-14 px-6 rounded-full">
                  <PhoneCall size={18} className="mr-2" /> Care Line: {phone}
                </Button>
              </a>
            </div>

          </div>
        </section>


        {/* MEMBERSHIP CARDS SECTION */}
        <section className="py-16 bg-slate-950">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            
            <div className="text-center max-w-3xl mx-auto mb-8">
              <span className="text-xs font-extrabold text-amber-400 uppercase tracking-widest block mb-2">TIERED HEALTHCARE PLANS</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Membership Packages</h2>
              <p className="text-slate-400 text-sm sm:text-base mt-2">Select the level of care and concierge frequency tailored for your parents</p>
            </div>

            {/* BILLING CYCLE TOGGLE SWITCH (MONTHLY vs 1-YEAR ANNUAL 20% OFF) */}
            <div className="flex items-center justify-center mb-12">
              <div className="bg-slate-900/90 p-1.5 rounded-full border border-slate-800 flex items-center shadow-xl backdrop-blur-md">
                <button
                  type="button"
                  onClick={() => setIsAnnual(false)}
                  className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-extrabold transition-all duration-300 ${
                    !isAnnual 
                      ? "bg-[linear-gradient(90deg,#F59E0B,#D97706)] text-slate-950 shadow-md scale-105" 
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Monthly Plan
                </button>
                
                <button
                  type="button"
                  onClick={() => setIsAnnual(true)}
                  className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-extrabold transition-all duration-300 flex items-center gap-2 ${
                    isAnnual 
                      ? "bg-[linear-gradient(90deg,#F59E0B,#D97706)] text-slate-950 shadow-md scale-105" 
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <span>1-Year Annual Plan</span>
                  <span className="bg-amber-400 text-slate-950 font-black text-[10px] uppercase px-2.5 py-0.5 rounded-full shadow-xs flex items-center gap-1">
                    <Tag size={10} /> 20% OFF
                  </span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* CARD 1: NRI CONNECT */}
              <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-all shadow-xl">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-block px-3 py-1 rounded-full bg-slate-800 text-slate-300 font-extrabold text-xs">
                      NRI CONNECT
                    </span>
                    {isAnnual && (
                      <span className="bg-amber-500/20 text-amber-300 font-black text-[10px] px-2.5 py-0.5 rounded-full border border-amber-500/30">
                        20% OFF
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2">Essential Care</h3>
                  
                  {isAnnual ? (
                    <div className="my-4">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs line-through text-slate-500 font-bold">₹4,999/mo</span>
                        <span className="text-[10px] text-amber-300 font-extrabold bg-amber-500/10 px-2 py-0.5 rounded-md">Save ₹11,998/yr</span>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl sm:text-4xl font-black text-amber-400">₹3,999</span>
                        <span className="text-xs text-slate-400 font-medium">/month</span>
                      </div>
                      <p className="text-[11px] text-emerald-400 font-bold mt-1">Billed ₹47,990 for 1 Year</p>
                    </div>
                  ) : (
                    <div className="flex items-baseline gap-1 my-4">
                      <span className="text-3xl sm:text-4xl font-black text-amber-400">₹4,999</span>
                      <span className="text-xs text-slate-400 font-medium">/month</span>
                    </div>
                  )}

                  <p className="text-xs text-slate-400 mb-6">Routine nursing checks, vital monitoring, and monthly health updates for stable seniors.</p>
                  
                  <ul className="space-y-3 text-xs text-slate-300 mb-8 border-t border-slate-800 pt-6">
                    <li className="flex items-center gap-2"><Check size={16} className="text-amber-400 shrink-0" /> 1 Nurse Home Visit per month</li>
                    <li className="flex items-center gap-2"><Check size={16} className="text-amber-400 shrink-0" /> BP, Pulse, SpO₂, Blood Sugar & Temp</li>
                    <li className="flex items-center gap-2"><Check size={16} className="text-amber-400 shrink-0" /> Basic Medication Management</li>
                    <li className="flex items-center gap-2"><Check size={16} className="text-amber-400 shrink-0" /> Monthly Family Health Report</li>
                    <li className="flex items-center gap-2"><Check size={16} className="text-amber-400 shrink-0" /> Shared Care Manager</li>
                    <li className="flex items-center gap-2"><Check size={16} className="text-amber-400 shrink-0" /> 24×7 Emergency Helpline</li>
                  </ul>
                </div>

                <Button 
                  onClick={() => handleBook("NRI Connect")}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold h-12 rounded-xl border border-slate-700"
                >
                  Select NRI Connect {isAnnual && "(20% OFF)"}
                </Button>
              </div>

              {/* CARD 2: NRI PLUS (POPULAR) */}
              <div className="bg-[linear-gradient(180deg,#1E293B_0%,#0F172A_100%)] rounded-3xl p-6 sm:p-8 border-2 border-amber-500/80 flex flex-col justify-between relative shadow-2xl scale-105 z-10">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[linear-gradient(90deg,#F59E0B,#D97706)] text-slate-950 text-[10px] font-black tracking-wider uppercase px-4 py-1.5 rounded-full shadow-md whitespace-nowrap">
                  ★ MOST POPULAR CHOICE
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-block px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-extrabold text-xs border border-amber-500/30">
                      NRI PLUS
                    </span>
                    {isAnnual && (
                      <span className="bg-amber-400 text-slate-950 font-black text-[10px] px-2.5 py-0.5 rounded-full shadow-xs">
                        SAVE 20%
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">Advanced Care</h3>
                  
                  {isAnnual ? (
                    <div className="my-4">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs line-through text-slate-400 font-bold">₹11,999/mo</span>
                        <span className="text-[10px] text-amber-300 font-extrabold bg-amber-500/20 px-2 py-0.5 rounded-md border border-amber-500/30">Save ₹28,798/yr</span>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl sm:text-4xl font-black text-amber-400">₹9,599</span>
                        <span className="text-xs text-slate-400 font-medium">/month</span>
                      </div>
                      <p className="text-[11px] text-emerald-400 font-bold mt-1">Billed ₹1,15,190 for 1 Year</p>
                    </div>
                  ) : (
                    <div className="flex items-baseline gap-1 my-4">
                      <span className="text-3xl sm:text-4xl font-black text-amber-400">₹11,999</span>
                      <span className="text-xs text-slate-400 font-medium">/month</span>
                    </div>
                  )}

                  <p className="text-xs text-slate-300 mb-6">Comprehensive care including monthly doctor home visit, bi-weekly nurse visits & Hospital Saathi support.</p>
                  
                  <ul className="space-y-3 text-xs text-slate-200 mb-8 border-t border-slate-700 pt-6">
                    <li className="flex items-center gap-2"><Check size={16} className="text-amber-400 shrink-0" /> <strong>2 Nurse Home Visits</strong> per month</li>
                    <li className="flex items-center gap-2"><Check size={16} className="text-amber-400 shrink-0" /> <strong>1 Doctor Home Visit</strong> per month</li>
                    <li className="flex items-center gap-2"><Check size={16} className="text-amber-400 shrink-0" /> 1 Blood Sample Collection included</li>
                    <li className="flex items-center gap-2"><Check size={16} className="text-amber-400 shrink-0" /> 1 ECG at Home / year</li>
                    <li className="flex items-center gap-2"><Check size={16} className="text-amber-400 shrink-0" /> <strong>12 Hours/year Hospital Saathi</strong></li>
                    <li className="flex items-center gap-2"><Check size={16} className="text-amber-400 shrink-0" /> Dedicated Care Manager</li>
                    <li className="flex items-center gap-2"><Check size={16} className="text-amber-400 shrink-0" /> Bi-weekly Health Reports</li>
                  </ul>
                </div>

                <Button 
                  onClick={() => handleBook("NRI Plus")}
                  className="w-full bg-[linear-gradient(90deg,#F59E0B,#D97706)] text-slate-950 font-black h-12 rounded-xl shadow-lg border-0"
                >
                  Select NRI Plus {isAnnual && "(20% OFF)"}
                </Button>
              </div>

              {/* CARD 3: NRI SIGNATURE */}
              <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-all shadow-xl">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-block px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 font-extrabold text-xs border border-purple-500/30">
                      NRI SIGNATURE
                    </span>
                    {isAnnual && (
                      <span className="bg-purple-500/20 text-purple-300 font-black text-[10px] px-2.5 py-0.5 rounded-full border border-purple-500/30">
                        20% OFF
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">Luxury Concierge</h3>
                  
                  {isAnnual ? (
                    <div className="my-4">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs line-through text-slate-500 font-bold">₹24,999/mo</span>
                        <span className="text-[10px] text-amber-300 font-extrabold bg-amber-500/10 px-2 py-0.5 rounded-md">Save ₹59,998/yr</span>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl sm:text-4xl font-black text-amber-400">₹19,999</span>
                        <span className="text-xs text-slate-400 font-medium">/month</span>
                      </div>
                      <p className="text-[11px] text-emerald-400 font-bold mt-1">Billed ₹2,39,990 for 1 Year</p>
                    </div>
                  ) : (
                    <div className="flex items-baseline gap-1 my-4">
                      <span className="text-3xl sm:text-4xl font-black text-amber-400">₹24,999+</span>
                      <span className="text-xs text-slate-400 font-medium">/month</span>
                    </div>
                  )}

                  <p className="text-xs text-slate-400 mb-6">VIP 24×7 Senior Concierge care with weekly nurse visits, 2 doctor home visits, and unlimited hospital coordination.</p>
                  
                  <ul className="space-y-3 text-xs text-slate-300 mb-8 border-t border-slate-800 pt-6">
                    <li className="flex items-center gap-2"><Check size={16} className="text-amber-400 shrink-0" /> <strong>4 Nurse Home Visits</strong> per month</li>
                    <li className="flex items-center gap-2"><Check size={16} className="text-amber-400 shrink-0" /> <strong>2 Doctor Home Visits</strong> per month</li>
                    <li className="flex items-center gap-2"><Check size={16} className="text-amber-400 shrink-0" /> Unlimited BP, Sugar & Vitals tracking</li>
                    <li className="flex items-center gap-2"><Check size={16} className="text-amber-400 shrink-0" /> 2 Blood Sample Collections included</li>
                    <li className="flex items-center gap-2"><Check size={16} className="text-amber-400 shrink-0" /> 2 ECGs at Home / year</li>
                    <li className="flex items-center gap-2"><Check size={16} className="text-amber-400 shrink-0" /> <strong>Unlimited Hospital Saathi Coordination</strong></li>
                    <li className="flex items-center gap-2"><Check size={16} className="text-amber-400 shrink-0" /> Weekly Health Reports + Photo Logs</li>
                    <li className="flex items-center gap-2"><Check size={16} className="text-amber-400 shrink-0" /> Senior VIP Concierge Manager</li>
                  </ul>
                </div>

                <Button 
                  onClick={() => handleBook("NRI Signature")}
                  className="w-full bg-purple-900/60 hover:bg-purple-800 text-white font-bold h-12 rounded-xl border border-purple-700"
                >
                  Select NRI Signature {isAnnual && "(20% OFF)"}
                </Button>
              </div>

            </div>
          </div>
        </section>


        {/* DETAILED FEATURE COMPARISON TABLE */}
        <section className="py-16 bg-slate-900 border-t border-slate-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-extrabold text-amber-400 uppercase tracking-widest block mb-2">COMPLETE SIDE-BY-SIDE MATRIX</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Full Feature Comparison</h2>
              <p className="text-slate-400 text-sm sm:text-base mt-2">Compare services across NRI Connect, NRI Plus, and NRI Signature packages</p>
            </div>

            <div className="overflow-x-auto rounded-3xl border border-slate-800 bg-slate-950 shadow-2xl">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="bg-slate-900 border-b border-slate-800">
                    <th className="p-4 sm:p-5 text-sm font-extrabold text-white uppercase tracking-wider w-2/5">Services</th>
                    <th className="p-4 sm:p-5 text-sm font-extrabold text-slate-300 text-center w-1/5 bg-slate-900">NRI Connect</th>
                    <th className="p-4 sm:p-5 text-sm font-extrabold text-amber-300 text-center w-1/5 bg-amber-500/10 border-x border-amber-500/20">NRI Plus</th>
                    <th className="p-4 sm:p-5 text-sm font-extrabold text-purple-300 text-center w-1/5 bg-purple-900/20">NRI Signature</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 text-xs sm:text-sm">
                  {tableFeatures.map((row, idx) => (
                    <tr key={row.name} className={row.highlight ? "bg-slate-900/80 font-bold text-amber-300" : idx % 2 === 0 ? "bg-slate-950" : "bg-slate-900/40"}>
                      <td className="p-4 sm:p-5 font-bold text-slate-200 flex items-center gap-2">
                        {row.name}
                      </td>
                      <td className="p-4 sm:p-5 text-center text-slate-300">
                        {row.connect === "✓" ? <Check size={18} className="text-emerald-400 mx-auto" /> : row.connect}
                      </td>
                      <td className="p-4 sm:p-5 text-center text-amber-200 font-semibold bg-amber-500/5 border-x border-amber-500/10">
                        {row.plus === "✓" ? <Check size={18} className="text-emerald-400 mx-auto" /> : row.plus}
                      </td>
                      <td className="p-4 sm:p-5 text-center text-purple-200 font-bold bg-purple-900/10">
                        {row.signature === "✓" ? <Check size={18} className="text-emerald-400 mx-auto" /> : row.signature}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </section>


        {/* DETAILED WELLNESS VITALS SECTION */}
        <section className="py-16 bg-slate-950">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-extrabold text-amber-400 uppercase tracking-widest block mb-2">CLINICAL PRECISION AT HOME</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Detailed Wellness Vitals Included</h2>
              <p className="text-slate-400 text-sm sm:text-base mt-2">Every home visit includes structured monitoring of essential vital parameters</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {wellnessVitals.map(vital => {
                const Icon = vital.icon;
                return (
                  <div key={vital.title} className="bg-slate-900 p-6 rounded-2xl border border-slate-800 hover:border-amber-500/50 transition-colors">
                    <div className="h-10 w-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4">
                      <Icon size={20} />
                    </div>
                    <h3 className="font-bold text-white text-base mb-1">{vital.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{vital.desc}</p>
                  </div>
                );
              })}
            </div>

          </div>
        </section>


        {/* PREMIUM SIGNATURE PRIVILEGES SECTION */}
        <section className="py-16 bg-slate-900 border-t border-slate-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            
            <div className="bg-[linear-gradient(135deg,#1E1B4B_0%,#1C2541_50%,#0F172A_100%)] p-8 sm:p-12 rounded-3xl border border-amber-500/30 shadow-2xl">
              <div className="max-w-3xl">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 font-extrabold text-xs uppercase tracking-wider mb-4 border border-amber-500/30">
                  <Star size={14} className="text-amber-400 fill-amber-400" /> LUXURY CONCIERGE BENEFITS
                </span>
                
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">
                  Premium Signature Privileges
                </h2>

                <div className="space-y-4 mb-8">
                  {signaturePrivileges.map(privilege => (
                    <div key={privilege} className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/10">
                      <CheckCircle2 size={20} className="text-amber-400 shrink-0 mt-0.5" />
                      <span className="text-slate-200 text-sm sm:text-base font-semibold">{privilege}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4 pt-4 border-t border-white/10">
                  <Button 
                    onClick={() => handleBook("NRI Signature Membership")}
                    size="lg"
                    className="bg-[linear-gradient(90deg,#F59E0B,#D97706)] text-slate-950 font-black h-12 px-8 rounded-xl border-0 shadow-lg"
                  >
                    Inquire for Signature Membership
                  </Button>
                  <a href={`tel:${rawPhone}`}>
                    <Button variant="outline" size="lg" className="bg-white/10 hover:bg-white/20 text-white border-white/20 font-bold h-12 px-6 rounded-xl">
                      Call Care Manager Direct
                    </Button>
                  </a>
                </div>

              </div>
            </div>

          </div>
        </section>


        {/* LOCATION FOOTER BANNER */}
        <section className="py-12 bg-slate-950 border-t border-slate-800 text-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <h3 className="text-xl font-bold text-white mb-2">SilverCare India • Trusted Home Healthcare for Seniors</h3>
            <p className="text-sm text-slate-400 mb-4 flex items-center justify-center gap-2 flex-wrap">
              <Building2 size={16} className="text-amber-400" /> Chandigarh • Zirakpur • Delhi NCR • Gurgaon • Noida
            </p>
            <p className="text-xs text-amber-300 font-extrabold tracking-widest uppercase">
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
