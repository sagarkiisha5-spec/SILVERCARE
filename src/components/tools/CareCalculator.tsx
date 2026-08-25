import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Calculator, ShieldCheck, Clock, ArrowRight, Sparkles, Check, Heart, Stethoscope, UserCheck } from "lucide-react";
import { Button } from "@/src/components/ui/button";

export default function CareCalculator() {
  const [careType, setCareType] = useState<string>("nursing");
  const [duration, setDuration] = useState<number>(12); // hours per day
  const [city, setCity] = useState<string>("Gurgaon");

  // Dynamic estimate calculations
  const calculateEstimate = () => {
    let baseRate = 0;
    if (careType === "nursing") {
      baseRate = duration === 24 ? 3500 : duration === 12 ? 1800 : 1200;
    } else if (careType === "attendant") {
      baseRate = duration === 24 ? 2200 : duration === 12 ? 1200 : 800;
    } else if (careType === "doctor") {
      return { perVisit: "₹1,500 - ₹2,000", monthly: "Pay per visit", recommend: "Experienced MBBS Physician Visit" };
    } else if (careType === "physio") {
      return { perVisit: "₹800 - ₹1,200", monthly: "₹18,000 / 15 sessions", recommend: "Certified Physiotherapist at Home" };
    } else {
      return { perVisit: "Custom Package", monthly: "Tailored Plan", recommend: "Dedicated Eldercare Companion" };
    }

    const estimatedMonthly = baseRate * 30;
    return {
      daily: `₹${baseRate.toLocaleString('en-IN')}`,
      monthly: `₹${(estimatedMonthly).toLocaleString('en-IN')}`,
      recommend: duration === 24 ? "24/7 Live-In Certified Nurse / Attendant" : `${duration} Hours Daily Dedicated Care Specialist`
    };
  };

  const estimate = calculateEstimate();

  return (
    <div className="bg-white rounded-3xl border border-purple-100 shadow-2xl p-6 sm:p-10 relative overflow-hidden">
      <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-purple-100 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
      
      <div className="flex flex-col lg:flex-row gap-8 items-stretch relative z-10">
        
        {/* Left Inputs */}
        <div className="lg:w-7/12 space-y-6">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-[#7B2CBF] font-extrabold text-xs uppercase tracking-wider mb-2">
              <Calculator size={14} /> Instant Plan Estimator
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#17345E] tracking-tight">
              Estimate Your Care Plan
            </h3>
            <p className="text-slate-500 text-xs sm:text-sm mt-1">
              Select care requirements to view recommended support & estimated costs.
            </p>
          </div>

          {/* Care Type Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">1. Select Service Type</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { id: "nursing", label: "Registered Nursing", icon: Stethoscope },
                { id: "attendant", label: "Care Attendant", icon: Heart },
                { id: "doctor", label: "Doctor Visit", icon: UserCheck },
                { id: "physio", label: "Physiotherapy", icon: Sparkles },
                { id: "other", label: "Companionship", icon: Clock },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setCareType(item.id)}
                  className={`p-3 rounded-2xl border-2 text-left font-bold text-xs flex items-center gap-2 transition-all ${
                    careType === item.id 
                      ? 'border-[#7B2CBF] bg-purple-50 text-[#7B2CBF] shadow-sm' 
                      : 'border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <item.icon size={16} className={careType === item.id ? "text-[#7B2CBF]" : "text-slate-400"} />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Duration Slider if daily care */}
          {(careType === "nursing" || careType === "attendant") && (
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">2. Care Duration Per Day</label>
                <span className="text-sm font-extrabold text-[#7B2CBF] bg-purple-50 px-3 py-0.5 rounded-full">
                  {duration === 24 ? "24 Hours (Full Live-In)" : `${duration} Hours / Day`}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[8, 12, 24].map((hrs) => (
                  <button
                    key={hrs}
                    type="button"
                    onClick={() => setDuration(hrs)}
                    className={`py-2.5 rounded-xl border-2 font-extrabold text-xs transition-all ${
                      duration === hrs 
                        ? 'border-[#7B2CBF] bg-[#7B2CBF] text-white' 
                        : 'border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    {hrs === 24 ? "24 Hours Live-In" : `${hrs} Hours`}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* City Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">3. Select Location</label>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full h-11 border border-slate-200 rounded-xl px-3 bg-white text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#7B2CBF]"
            >
              <option value="Gurgaon">Gurgaon (DLF, Sec 33, Golf Course Rd)</option>
              <option value="Delhi NCR">Delhi NCR (South Delhi, Noida, Faridabad)</option>
              <option value="Chandigarh">Chandigarh (Sec 17, Sec 34, Sec 35)</option>
              <option value="Mohali">Mohali (Phase 7, Aerocity, Sec 70)</option>
              <option value="Panchkula">Panchkula (Sec 8, Sec 20)</option>
              <option value="Ludhiana">Ludhiana (Sarabha Nagar, Model Town)</option>
            </select>
          </div>
        </div>

        {/* Right Output Card */}
        <div className="lg:w-5/12 bg-[linear-gradient(135deg,#1E1B4B_0%,#3B0764_100%)] text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-purple-300 uppercase tracking-wider mb-4">
              <Sparkles size={16} className="text-[#D946EF]" />
              Recommended Care Package
            </div>

            <h4 className="text-xl font-extrabold text-white mb-2 leading-snug">
              {estimate.recommend}
            </h4>

            <div className="my-6 pt-4 border-t border-white/10 space-y-3">
              {'daily' in estimate && (
                <div className="flex justify-between items-baseline">
                  <span className="text-xs text-slate-300">Estimated Daily Rate:</span>
                  <span className="text-xl font-extrabold text-white">{estimate.daily}</span>
                </div>
              )}

              <div className="flex justify-between items-baseline">
                <span className="text-xs text-slate-300">Estimated Monthly Plan:</span>
                <span className="text-2xl font-extrabold text-[#D946EF]">{estimate.monthly}</span>
              </div>
            </div>

            <div className="space-y-2 text-xs text-purple-200">
              <div className="flex items-center gap-2">
                <Check size={14} className="text-emerald-400" />
                <span>100% Police Verified & Background Checked</span>
              </div>
              <div className="flex items-center gap-2">
                <Check size={14} className="text-emerald-400" />
                <span>Doctor-Guided Supervision Included</span>
              </div>
              <div className="flex items-center gap-2">
                <Check size={14} className="text-emerald-400" />
                <span>Immediate 24-Hour Caregiver Replacement</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-white/10">
            <Link to={`/book?service=${careType}`}>
              <Button size="lg" className="w-full bg-[linear-gradient(90deg,#FF6B9B,#D946EF)] hover:opacity-95 text-white font-extrabold h-12 rounded-xl text-sm border-0 flex items-center justify-center gap-2 shadow-lg">
                <span>Book This Care Plan</span>
                <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
