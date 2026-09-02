import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { submitServiceRequest } from "@/src/lib/requestManager";
import { motion, AnimatePresence } from "motion/react";
import { X, CheckCircle2, AlertCircle, ShieldCheck, ChevronDown, PhoneCall } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";

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
  "Healthy Age Package (Plan #1)",
  "Chronic Care Package (Plan #2)",
  "Heart Care Package (Plan #3)",
  "Dementia & Memory Care (Plan #4)",
  "Respiratory Care Package (Plan #5)",
  "Mobility & Bone Health Package (Plan #6)",
  "Doctor Visit at Home",
  "Nursing & Attendant Care",
  "Physiotherapy at Home",
  "Pathology & Diagnostics",
  "Medical Equipment Rental & Delivery",
  "Elder Care / Companionship",
  "Telemedicine / Online Doctor",
  "Other Eldercare Support"
];

interface AutoBookingModalProps {
  forceOpen?: boolean;
  initialService?: string;
  onClose?: () => void;
}

export default function AutoBookingModal({ forceOpen = false, initialService, onClose }: AutoBookingModalProps = {}) {
  const [isOpen, setIsOpen] = useState(forceOpen);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedPhone, setSubmittedPhone] = useState("");
  const [error, setError] = useState("");

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<SimpleBookingFormValues>({
    resolver: zodResolver(simpleBookingSchema),
    defaultValues: {
      firstName: '',
      phone: '',
      city: 'Delhi NCR',
      careType: initialService || 'Healthy Age Package (Plan #1)',
      consent: true
    }
  });

  // Dynamically update selected careType when initialService prop changes
  useEffect(() => {
    if (initialService) {
      setValue('careType', initialService);
    }
  }, [initialService, setValue]);

  // Automatically trigger modal popup after a 7-second delay if not already dismissed or forced open
  useEffect(() => {
    if (forceOpen) {
      setIsOpen(true);
      return;
    }
    const isDismissed = sessionStorage.getItem("silvercare_modal_dismissed");
    if (isDismissed) return;

    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 7000);

    return () => clearTimeout(timer);
  }, [forceOpen]);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("silvercare_modal_dismissed", "true");
    onClose?.();
  };

  const onSubmit = async (data: SimpleBookingFormValues) => {
    setIsSubmitting(true);
    setError("");
    try {
      await submitServiceRequest({
        patientName: data.firstName,
        phone: data.phone,
        city: data.city,
        careType: data.careType,
        consent: data.consent,
      });
      setSubmittedPhone(data.phone);
      setIsSuccess(true);
      sessionStorage.setItem("silvercare_modal_seen", "true");
      reset();
    } catch (err) {
      console.error(err);
      setError("Failed to submit request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Dark Blurred Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-slate-900/65 backdrop-blur-sm z-0 cursor-pointer"
          />

          {/* Popup Modal Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative z-10 w-full max-w-lg bg-white rounded-3xl border border-slate-200/90 shadow-2xl overflow-hidden p-6 sm:p-8 my-auto"
          >
            {/* Close X Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 h-10 w-10 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 flex items-center justify-center transition-colors z-20"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            {isSuccess ? (
              <div className="text-center py-4">
                <div className="mx-auto w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4 shadow-inner">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="text-2xl font-black text-[#17345E] mb-2">Request Received!</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  Thank you for reaching out to <strong className="text-[#FF4F81]">SilverCare</strong>. Our Senior Care Expert will call you back on <strong className="text-slate-900">+91 {submittedPhone}</strong> within 15 minutes.
                </p>
                <Button onClick={handleClose} className="w-full bg-[#FF4F81] text-white font-extrabold h-12 rounded-xl border-0">
                  Close Window
                </Button>
              </div>
            ) : (
              <>
                {/* Header with Logo & Subtitle */}
                <div className="text-center mb-6 pr-6">
                  <div className="flex justify-center mb-3">
                    <img
                      src="/silvercare-logo.png"
                      alt="SilverCare Elder Care"
                      className="h-12 sm:h-14 w-auto object-contain"
                      onError={(e) => {
                        (e.target as any).src = "https://silvercareindia.com/wp-content/uploads/2025/12/logo.png";
                      }}
                    />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-[#17345E] leading-tight tracking-tight mb-1">
                    SilverCare Elder Care Services
                  </h2>
                  <p className="text-sm sm:text-base font-bold text-[#FF4F81]">
                    Get a Call Back from a Senior Care Expert
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  {error && (
                    <div className="p-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-xs font-medium flex items-center gap-2">
                      <AlertCircle size={16} className="shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  {/* 1. First Name Field */}
                  <div className="space-y-1">
                    <label className="block text-xs sm:text-sm font-extrabold text-slate-800">
                      First Name<span className="text-red-500 ml-0.5">*</span>
                    </label>
                    <Input
                      {...register("firstName")}
                      placeholder="Enter first name"
                      error={errors.firstName?.message}
                      className="h-12 rounded-xl border-slate-300 focus:border-[#FF4F81] focus:ring-[#FF4F81] text-slate-900 text-sm"
                    />
                  </div>

                  {/* 2. Mobile Number Field */}
                  <div className="space-y-1">
                    <label className="block text-xs sm:text-sm font-extrabold text-slate-800">
                      Mobile Number<span className="text-red-500 ml-0.5">*</span>
                    </label>
                    <div className="flex items-center gap-2">
                      <div className="h-12 px-3 bg-slate-100 border border-slate-300 rounded-xl flex items-center gap-1.5 text-slate-800 font-bold text-xs shrink-0">
                        <span>🇮🇳</span>
                        <span>+91</span>
                        <ChevronDown size={12} className="text-slate-500" />
                      </div>
                      <Input
                        {...register("phone")}
                        type="tel"
                        placeholder="Enter phone number"
                        error={errors.phone?.message}
                        className="h-12 flex-1 rounded-xl border-slate-300 focus:border-[#FF4F81] focus:ring-[#FF4F81] text-slate-900 text-sm"
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-[11px] font-semibold text-red-500 mt-0.5">{errors.phone.message}</p>
                    )}
                  </div>

                  {/* 3. City Preference Field */}
                  <div className="space-y-1">
                    <label className="block text-xs sm:text-sm font-extrabold text-slate-800">
                      City preference<span className="text-red-500 ml-0.5">*</span>
                    </label>
                    <div className="relative">
                      <select
                        {...register("city")}
                        className="flex h-12 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-800 appearance-none focus:outline-none focus:ring-2 focus:ring-[#FF4F81] focus:border-[#FF4F81]"
                      >
                        {CITIES.map((c, i) => (
                          <option key={i} value={c}>{c}</option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                        <ChevronDown size={16} />
                      </div>
                    </div>
                  </div>

                  {/* 4. Type of Care Required Field */}
                  <div className="space-y-1">
                    <label className="block text-xs sm:text-sm font-extrabold text-slate-800">
                      Type of care required<span className="text-red-500 ml-0.5">*</span>
                    </label>
                    <div className="relative">
                      <select
                        {...register("careType")}
                        className="flex h-12 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-800 appearance-none focus:outline-none focus:ring-2 focus:ring-[#FF4F81] focus:border-[#FF4F81]"
                      >
                        {CARE_TYPES.map((ct, i) => (
                          <option key={i} value={ct}>{ct}</option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                        <ChevronDown size={16} />
                      </div>
                    </div>
                  </div>

                  {/* 5. Consent Checkbox */}
                  <div className="pt-1">
                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        {...register("consent")}
                        className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#FF4F81] focus:ring-[#FF4F81] cursor-pointer shrink-0 accent-[#FF4F81]"
                      />
                      <span className="text-[11px] sm:text-xs text-slate-700 font-medium leading-tight">
                        I agree to receive communication from <strong className="text-slate-900">SilverCare</strong> via whatsapp, SMS or call
                      </span>
                    </label>
                  </div>

                  {/* 6. Request Call Back Button */}
                  <div className="pt-2">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[linear-gradient(90deg,#FF4F81,#E63967)] hover:opacity-95 text-white font-black text-base sm:text-lg h-13 rounded-xl shadow-lg shadow-[#FF4F81]/25 border-0 transition-all duration-300 hover:scale-[1.01] active:scale-95"
                    >
                      {isSubmitting ? "Submitting..." : "Request call back"}
                    </Button>
                  </div>
                </form>

                {/* Footer Trust Badge */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-center gap-1.5 text-[11px] font-bold text-slate-500">
                  <ShieldCheck size={14} className="text-[#FF4F81]" />
                  <span>100% Confidential & Free Consultation Call</span>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
