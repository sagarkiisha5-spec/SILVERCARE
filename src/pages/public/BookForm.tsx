import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams, Link } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/src/lib/firebase";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { CheckCircle2, AlertCircle, PhoneCall, ShieldCheck, ChevronDown, Check } from "lucide-react";
import SEO from "@/src/components/seo/SEO";
import { useAppContent, fallbackServices } from "@/src/hooks/useAppContent";

const simpleBookingSchema = z.object({
  firstName: z.string().min(2, "First name is required").max(100),
  phone: z.string().min(10, "Please enter a valid 10-digit phone number").max(15),
  city: z.string().min(1, "Please select city preference"),
  careType: z.string().min(1, "Please select type of care required"),
  consent: z.boolean().refine(val => val === true, "Consent is required to receive call back"),
});

type SimpleBookingFormValues = z.infer<typeof simpleBookingSchema>;

const CITIES = [
  "Delhi NCR",
  "Gurugram",
  "Noida",
  "Faridabad",
  "Ghaziabad",
  "Bangalore",
  "Mumbai",
  "Other City"
];

const CARE_TYPES = [
  "Nursing & Attendant Care",
  "Doctor Visit at Home",
  "Physiotherapy at Home",
  "Pathology & Diagnostics",
  "Medical Equipment Rental & Delivery",
  "Elder Care / Companionship",
  "Telemedicine / Online Doctor",
  "Other Eldercare Support"
];

export default function BookForm() {
  const [searchParams] = useSearchParams();
  const preselectedService = searchParams.get('service') || '';
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedPhone, setSubmittedPhone] = useState("");
  const [error, setError] = useState("");
  const { services, loading } = useAppContent();

  const activeServices = services.length > 0 ? services : fallbackServices;

  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm<SimpleBookingFormValues>({
    resolver: zodResolver(simpleBookingSchema),
    defaultValues: {
      firstName: '',
      phone: '',
      city: 'Delhi NCR',
      careType: 'Doctor Visit at Home',
      consent: true
    }
  });

  useEffect(() => {
    if (preselectedService && !loading) {
      const matched = activeServices.find(s => s.slug === preselectedService || s.title.toLowerCase().includes(preselectedService.toLowerCase()));
      if (matched) {
        setValue("careType", matched.title);
      }
    }
  }, [preselectedService, loading, activeServices, setValue]);

  const onSubmit = async (data: SimpleBookingFormValues) => {
    setIsSubmitting(true);
    setError("");
    try {
      await addDoc(collection(db, "serviceRequests"), {
        patientName: data.firstName,
        firstName: data.firstName,
        phone: data.phone.startsWith("+91") ? data.phone : `+91 ${data.phone}`,
        city: data.city,
        serviceName: data.careType,
        careType: data.careType,
        consent: data.consent,
        status: "New",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
      setSubmittedPhone(data.phone);
      setIsSuccess(true);
      reset();
    } catch (err) {
      console.error(err);
      setError("Failed to submit request. Please call our hotline +91 800-14-800-75 directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <>
        <SEO title="Call Back Requested | SilverCare India" description="Your request for a callback from a Senior Care Expert has been received." />
        <div className="bg-slate-50 min-h-[calc(100vh-80px)] py-16 flex items-center justify-center font-sans">
          <div className="container mx-auto px-4 max-w-lg text-center">
            <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl">
              <div className="mx-auto w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6 shadow-inner animate-bounce">
                <CheckCircle2 size={44} />
              </div>
              <h1 className="text-3xl font-black text-[#17345E] mb-3">Request Received!</h1>
              <p className="text-slate-600 text-base leading-relaxed mb-6">
                Thank you for reaching out to <strong className="text-[#7B2CBF]">SilverCare</strong>.
              </p>
              
              <div className="bg-purple-50/70 rounded-2xl p-5 border border-purple-100 text-left mb-8 space-y-2">
                <div className="flex items-center gap-2 text-sm font-bold text-[#7B2CBF]">
                  <PhoneCall size={16} />
                  <span>Call Back SLA Guarantee</span>
                </div>
                <p className="text-xs text-slate-700 leading-normal">
                  Our Senior Care Expert will call you back on <strong className="text-slate-900">+91 {submittedPhone}</strong> within 15 minutes to confirm your care requirements.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button onClick={() => setIsSuccess(false)} variant="outline" className="w-full font-bold h-12 rounded-xl">
                  Submit Another Request
                </Button>
                <Link to="/" className="w-full">
                  <Button className="w-full bg-[linear-gradient(90deg,#7B2CBF,#9D4EDD)] text-white font-bold h-12 rounded-xl shadow-md">
                    Return to Homepage
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO 
        title="Get a Call Back | SilverCare Elder Care Services" 
        description="Request a callback from a Senior Care Expert for home nursing, doctor visits, physiotherapy, and eldercare in Delhi NCR."
      />

      <div className="bg-slate-50 min-h-screen py-10 sm:py-16 font-sans">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-xl">
          
          {/* Main Sample Form Box Container */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xl overflow-hidden p-6 sm:p-10">
            
            {/* Top Logo & Title Header matching client sample format */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <img 
                  src="/silvercare-logo.png" 
                  alt="SilverCare Elder Care" 
                  className="h-14 sm:h-16 w-auto object-contain"
                  onError={(e) => {
                    (e.target as any).src = "https://silvercareindia.com/wp-content/uploads/2025/12/logo.png";
                  }}
                />
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-[#17345E] leading-tight tracking-tight mb-2">
                SilverCare Elder Care Services
              </h1>

              <p className="text-base sm:text-lg font-bold text-[#FF4F81]">
                Get a Call Back from a Senior Care Expert
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              
              {error && (
                <div className="p-4 rounded-2xl bg-red-50 border border-red-100 text-red-600 text-sm font-medium flex items-center gap-3">
                  <AlertCircle size={20} className="shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* 1. First Name Field */}
              <div className="space-y-1.5">
                <label className="block text-sm sm:text-base font-extrabold text-slate-800">
                  First Name<span className="text-red-500 ml-0.5">*</span>
                </label>
                <Input 
                  {...register("firstName")}
                  placeholder="Enter first name"
                  error={errors.firstName?.message}
                  className="h-13 rounded-xl border-slate-300 focus:border-[#FF4F81] focus:ring-[#FF4F81] text-slate-900 text-base"
                />
              </div>

              {/* 2. Mobile Number Field */}
              <div className="space-y-1.5">
                <label className="block text-sm sm:text-base font-extrabold text-slate-800">
                  Mobile Number<span className="text-red-500 ml-0.5">*</span>
                </label>
                <div className="flex items-center gap-2">
                  {/* Country Code Prefix Dropdown Pill */}
                  <div className="h-13 px-3 sm:px-4 bg-slate-100 border border-slate-300 rounded-xl flex items-center gap-1.5 text-slate-800 font-bold text-sm shrink-0">
                    <span className="text-base">🇮🇳</span>
                    <span>+91</span>
                    <ChevronDown size={14} className="text-slate-500" />
                  </div>
                  
                  <Input 
                    {...register("phone")}
                    type="tel"
                    placeholder="Enter phone number"
                    error={errors.phone?.message}
                    className="h-13 flex-1 rounded-xl border-slate-300 focus:border-[#FF4F81] focus:ring-[#FF4F81] text-slate-900 text-base"
                  />
                </div>
                {errors.phone && (
                  <p className="text-xs font-semibold text-red-500 mt-1">{errors.phone.message}</p>
                )}
              </div>

              {/* 3. City Preference Field */}
              <div className="space-y-1.5">
                <label className="block text-sm sm:text-base font-extrabold text-slate-800">
                  City preference<span className="text-red-500 ml-0.5">*</span>
                </label>
                <div className="relative">
                  <select
                    {...register("city")}
                    className="flex h-13 w-full rounded-xl border border-slate-300 bg-white px-4 py-2 text-base font-semibold text-slate-800 shadow-xs appearance-none focus:outline-none focus:ring-2 focus:ring-[#FF4F81] focus:border-[#FF4F81] transition-all"
                  >
                    {CITIES.map((c, i) => (
                      <option key={i} value={c}>{c}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                    <ChevronDown size={18} />
                  </div>
                </div>
                {errors.city && (
                  <p className="text-xs font-semibold text-red-500 mt-1">{errors.city.message}</p>
                )}
              </div>

              {/* 4. Type of Care Required Field */}
              <div className="space-y-1.5">
                <label className="block text-sm sm:text-base font-extrabold text-slate-800">
                  Type of care required<span className="text-red-500 ml-0.5">*</span>
                </label>
                <div className="relative">
                  <select
                    {...register("careType")}
                    className="flex h-13 w-full rounded-xl border border-slate-300 bg-white px-4 py-2 text-base font-semibold text-slate-800 shadow-xs appearance-none focus:outline-none focus:ring-2 focus:ring-[#FF4F81] focus:border-[#FF4F81] transition-all"
                  >
                    {CARE_TYPES.map((ct, i) => (
                      <option key={i} value={ct}>{ct}</option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                    <ChevronDown size={18} />
                  </div>
                </div>
                {errors.careType && (
                  <p className="text-xs font-semibold text-red-500 mt-1">{errors.careType.message}</p>
                )}
              </div>

              {/* 5. Consent Checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    {...register("consent")}
                    className="mt-1 h-5 w-5 rounded border-slate-300 text-[#FF4F81] focus:ring-[#FF4F81] cursor-pointer shrink-0 accent-[#FF4F81]"
                  />
                  <span className="text-xs sm:text-sm text-slate-700 font-medium leading-tight group-hover:text-slate-900 transition-colors">
                    I agree to receive communication from <strong className="text-slate-900">SilverCare</strong> via whatsapp, SMS or call
                  </span>
                </label>
                {errors.consent && (
                  <p className="text-xs font-semibold text-red-500 mt-1">{errors.consent.message}</p>
                )}
              </div>

              {/* 6. Request Call Back Submit Button */}
              <div className="pt-3">
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-[linear-gradient(90deg,#FF4F81,#E63967)] hover:opacity-95 text-white font-black text-lg sm:text-xl h-14 rounded-xl shadow-lg shadow-[#FF4F81]/25 border-0 transition-all duration-300 hover:scale-[1.01] active:scale-95"
                >
                  {isSubmitting ? "Submitting..." : "Request call back"}
                </Button>
              </div>

            </form>

            {/* Bottom Trust Badge Footer */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-center gap-2 text-xs font-bold text-slate-500">
              <ShieldCheck size={16} className="text-[#FF4F81]" />
              <span>100% Confidential & Free Consultation Call</span>
            </div>

          </div>

        </div>
      </div>
    </>
  );
}
