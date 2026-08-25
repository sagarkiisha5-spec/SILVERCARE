import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams, Link } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/src/lib/firebase";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Card, CardContent } from "@/src/components/ui/card";
import { 
  CheckCircle2, 
  ShieldCheck, 
  Calendar, 
  Clock, 
  PhoneCall, 
  Sparkles, 
  AlertCircle, 
  MapPin, 
  User, 
  FileText,
  Stethoscope,
  ChevronRight,
  ChevronLeft,
  UserCheck,
  GraduationCap,
  Heart,
  Check
} from "lucide-react";
import SEO from "@/src/components/seo/SEO";
import { useAppContent, fallbackServices, fallbackProfessionals } from "@/src/hooks/useAppContent";

const bookingSchema = z.object({
  patientName: z.string().min(2, "Name must be at least 2 characters").max(100),
  phone: z.string().min(10, "Valid 10-digit phone number required").max(20),
  email: z.string().email("Valid email required").optional().or(z.literal("")),
  serviceName: z.string().min(1, "Please select a service"),
  preferredDoctor: z.string().optional(),
  preferredDate: z.string().optional(),
  preferredTimeSlot: z.string().optional(),
  location: z.string().min(5, "Please provide full address").max(200),
  pincode: z.string().min(6, "Valid 6-digit Pincode required").max(6).optional().or(z.literal("")),
  requirements: z.string().max(1000).optional(),
  urgency: z.string().optional(),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

export default function BookForm() {
  const [searchParams] = useSearchParams();
  const preselectedService = searchParams.get('service') || '';
  
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const { services, professionals, loading } = useAppContent();

  const { register, handleSubmit, formState: { errors }, reset, setValue, watch, trigger } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      serviceName: preselectedService || 'doctor-visit-at-home',
      preferredDoctor: 'Any Available Doctor / Specialist',
      preferredTimeSlot: 'Morning (9:00 AM - 12:00 PM)',
      urgency: 'Standard'
    }
  });

  useEffect(() => {
    if (preselectedService && !loading) {
      setValue("serviceName", preselectedService);
    }
  }, [preselectedService, loading, setValue]);

  const formServices = services.length > 0 ? services : fallbackServices;
  const formProfessionals = professionals.length > 0 ? professionals : fallbackProfessionals;

  // Filter clinical staff for doctor selection
  const availableDoctors = [
    {
      id: 'any',
      name: 'Any Available Specialist',
      designation: 'First Available Senior Physician / Nurse',
      qualification: 'Quickest response time & instant deployment',
      imageUrl: null
    },
    ...formProfessionals.filter(p => 
      p.designation.includes('Physician') || 
      p.designation.includes('Doctor') || 
      p.designation.includes('Trainer') || 
      p.designation.includes('Supervisor')
    )
  ];

  const currentServiceSlug = watch("serviceName");
  const selectedDoctor = watch("preferredDoctor");
  const selectedTimeSlot = watch("preferredTimeSlot");

  const timeSlots = [
    { label: "Morning (9:00 AM - 12:00 PM)", icon: Clock },
    { label: "Afternoon (12:00 PM - 4:00 PM)", icon: Clock },
    { label: "Evening (4:00 PM - 8:00 PM)", icon: Clock },
    { label: "Urgent 24/7 (Within 2-4 Hours)", icon: Sparkles }
  ];

  const nextStep = async () => {
    let isValid = false;
    if (currentStep === 1) {
      isValid = await trigger(["serviceName", "preferredDoctor"]);
    } else if (currentStep === 2) {
      isValid = await trigger(["preferredDate", "preferredTimeSlot", "urgency"]);
    } else if (currentStep === 3) {
      isValid = await trigger(["patientName", "phone", "location", "pincode", "email"]);
    }

    if (isValid || currentStep < 4) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
      window.scrollTo({ top: 300, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const onSubmit = async (data: BookingFormValues) => {
    setIsSubmitting(true);
    setError("");
    try {
      await addDoc(collection(db, "serviceRequests"), {
        ...data,
        status: "New",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
      setIsSuccess(true);
      reset();
    } catch (err) {
      console.error(err);
      setError("Failed to submit request. Please call our 24/7 hotline +91 800-14-800-75 directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <>
        <SEO title="Booking Confirmation | SilverCare India" description="Your home healthcare appointment has been confirmed." />
        <div className="bg-slate-50 min-h-[calc(100vh-80px)] py-16 flex items-center justify-center font-sans">
          <div className="container mx-auto px-4 max-w-xl text-center">
            <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl">
              <div className="mx-auto w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6 shadow-inner animate-bounce">
                <CheckCircle2 size={44} />
              </div>
              <h1 className="text-3xl font-extrabold text-[#17345E] mb-3">Appointment Scheduled!</h1>
              <p className="text-slate-600 text-base leading-relaxed mb-8">
                Thank you for choosing <strong className="text-[#7B2CBF]">SilverCare India</strong>. Your appointment request for <strong className="text-slate-900">{formServices.find(s => s.slug === currentServiceSlug)?.title || "Home Visit"}</strong> is being processed.
              </p>
              
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 text-left mb-8 space-y-3">
                <h4 className="font-extrabold text-xs text-slate-400 uppercase tracking-wider">Appointment Summary</h4>
                <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 font-medium">
                  <CheckCircle2 size={16} className="text-[#7B2CBF] shrink-0 mt-0.5" />
                  <span>Assigned Professional: <strong>{selectedDoctor || 'Senior Clinical Team'}</strong></span>
                </div>
                <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 font-medium">
                  <CheckCircle2 size={16} className="text-[#7B2CBF] shrink-0 mt-0.5" />
                  <span>Time Slot: <strong>{selectedTimeSlot}</strong></span>
                </div>
                <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 font-medium">
                  <CheckCircle2 size={16} className="text-[#7B2CBF] shrink-0 mt-0.5" />
                  <span>SLA Guarantee: Care coordinator calling within 15 mins</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button onClick={() => { setIsSuccess(false); setCurrentStep(1); }} variant="outline" className="w-full font-bold h-12 rounded-xl">
                  Book Another Appointment
                </Button>
                <Link to="/" className="w-full">
                  <Button className="w-full bg-[#7B2CBF] hover:bg-[#6A24A6] text-white font-bold h-12 rounded-xl shadow-md">
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

  const steps = [
    { num: 1, label: "Choose Service & Doctor", desc: "Select service and preferred specialist" },
    { num: 2, label: "Date & Time Slot", desc: "Select date to view timeline of available slots" },
    { num: 3, label: "Patient Information", desc: "Provide patient details and home location" },
    { num: 4, label: "Confirmation", desc: "Review and confirm your booking" }
  ];

  return (
    <>
      <SEO 
        title="Schedule Your Home Healthcare Service | SilverCare India" 
        description="Book doctor visits, home nursing, physiotherapy, or lab tests with verified professionals."
      />

      <div className="bg-slate-50 min-h-screen py-12 md:py-20 font-sans">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          
          {/* Header matching live site screenshot slogan */}
          <div className="mb-12 text-center max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#17345E] tracking-tight">
              Schedule your home <span className="bg-clip-text text-transparent bg-[linear-gradient(90deg,#FF6B9B,#FF9F43)]">healthcare service</span> with ease.
            </h1>
            <p className="mt-4 text-slate-600 text-base sm:text-lg">
              Our team will reach out to you shortly for appointment confirmation
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT WIZARD SIDEBAR matching layout screenshot */}
            <div className="lg:col-span-4 bg-[linear-gradient(180deg,#6487E5_0%,#5B7BE8_100%)] text-white rounded-3xl p-8 shadow-xl">
              <h3 className="text-lg font-extrabold text-white mb-6 uppercase tracking-wider">Booking Steps</h3>
              
              <div className="space-y-8 relative before:absolute before:left-4 before:top-4 before:bottom-4 before:w-0.5 before:bg-white/30">
                {steps.map((step) => {
                  const isActive = currentStep === step.num;
                  const isCompleted = currentStep > step.num;

                  return (
                    <div 
                      key={step.num}
                      onClick={() => { if (step.num < currentStep) setCurrentStep(step.num); }}
                      className={`relative flex items-start gap-4 cursor-pointer transition-all ${
                        isActive ? 'opacity-100 scale-105' : isCompleted ? 'opacity-90' : 'opacity-60'
                      }`}
                    >
                      <div className={`h-9 w-9 rounded-full flex items-center justify-center font-extrabold text-sm shrink-0 border-2 z-10 ${
                        isCompleted 
                          ? 'bg-emerald-400 border-white text-slate-900' 
                          : isActive 
                            ? 'bg-white border-white text-[#5B7BE8] shadow-md ring-4 ring-white/20' 
                            : 'bg-white/20 border-white/50 text-white'
                      }`}>
                        {isCompleted ? <Check size={18} /> : step.num}
                      </div>

                      <div>
                        <h4 className="font-extrabold text-base text-white leading-snug">{step.label}</h4>
                        <p className="text-xs text-blue-100 leading-snug mt-0.5">{step.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-12 pt-6 border-t border-white/20 text-xs font-medium text-blue-100 flex items-center gap-2">
                <ShieldCheck size={18} className="text-emerald-300 shrink-0" />
                <span>100% Verified Doctors & Certified Nurses</span>
              </div>
            </div>

            {/* RIGHT FORM CONTAINER */}
            <div className="lg:col-span-8">
              <Card className="border-slate-200 shadow-xl bg-white rounded-3xl overflow-hidden min-h-[520px]">
                <CardContent className="p-8 sm:p-12">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    
                    {error && (
                      <div className="p-4 mb-6 rounded-2xl bg-red-50 border border-red-100 text-red-600 text-sm font-medium flex items-center gap-3">
                        <AlertCircle size={20} className="shrink-0" />
                        <span>{error}</span>
                      </div>
                    )}

                    {/* STEP 1: SERVICE & DOCTOR SELECTION */}
                    {currentStep === 1 && (
                      <div className="space-y-8 animate-in fade-in duration-300">
                        <div>
                          <h3 className="text-2xl font-extrabold text-[#17345E] mb-1">Select Required Service</h3>
                          <p className="text-slate-500 text-xs">Choose the type of healthcare support your family needs at home.</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {formServices.map((srv) => (
                            <div 
                              key={srv.id}
                              onClick={() => setValue("serviceName", srv.slug)}
                              className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-3 ${
                                currentServiceSlug === srv.slug 
                                  ? 'border-[#7B2CBF] bg-purple-50/80 shadow-md scale-[1.01]' 
                                  : 'border-slate-200 hover:border-slate-300 bg-white'
                              }`}
                            >
                              <div className={`h-5 w-5 rounded-full border-2 mt-0.5 flex items-center justify-center shrink-0 ${
                                currentServiceSlug === srv.slug ? 'border-[#7B2CBF] bg-[#7B2CBF]' : 'border-slate-300'
                              }`}>
                                {currentServiceSlug === srv.slug && <div className="h-2 w-2 rounded-full bg-white"></div>}
                              </div>
                              <div>
                                <h4 className="font-extrabold text-slate-900 text-sm">{srv.title}</h4>
                                <p className="text-slate-500 text-xs line-clamp-1 mt-0.5">{srv.shortDescription}</p>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="pt-6 border-t border-slate-100">
                          <h3 className="text-xl font-extrabold text-[#17345E] mb-1">Choose Specialist / Doctor</h3>
                          <p className="text-slate-500 text-xs mb-4">Select a specific practitioner or let us assign the quickest available physician.</p>

                          <div className="space-y-3">
                            {availableDoctors.map((doc) => (
                              <div 
                                key={doc.id}
                                onClick={() => setValue("preferredDoctor", doc.name)}
                                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                                  selectedDoctor === doc.name 
                                    ? 'border-[#7B2CBF] bg-purple-50/80 shadow-md' 
                                    : 'border-slate-200 hover:border-slate-300 bg-white'
                                }`}
                              >
                                <div className="flex items-center gap-4">
                                  {doc.imageUrl ? (
                                    <img src={doc.imageUrl} alt={doc.name} className="h-12 w-12 rounded-full object-cover border-2 border-purple-200" />
                                  ) : (
                                    <div className="h-12 w-12 rounded-full bg-purple-100 text-[#7B2CBF] flex items-center justify-center font-bold">
                                      <Stethoscope size={24} />
                                    </div>
                                  )}
                                  <div>
                                    <h4 className="font-extrabold text-slate-900 text-sm">{doc.name}</h4>
                                    <p className="text-xs text-[#7B2CBF] font-bold">{doc.designation}</p>
                                    <p className="text-xs text-slate-500">{doc.qualification}</p>
                                  </div>
                                </div>

                                <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                                  selectedDoctor === doc.name ? 'border-[#7B2CBF] bg-[#7B2CBF] text-white' : 'border-slate-300'
                                }`}>
                                  {selectedDoctor === doc.name && <Check size={14} />}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="pt-6 flex justify-end">
                          <Button type="button" onClick={nextStep} size="lg" className="bg-[linear-gradient(90deg,#7B2CBF,#9D4EDD)] text-white font-extrabold h-12 px-8 rounded-xl flex items-center gap-2">
                            <span>Proceed to Date & Time</span>
                            <ChevronRight size={18} />
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* STEP 2: DATE & TIME SLOT */}
                    {currentStep === 2 && (
                      <div className="space-y-8 animate-in fade-in duration-300">
                        <div>
                          <h3 className="text-2xl font-extrabold text-[#17345E] mb-1">Select Date & Time Slot</h3>
                          <p className="text-slate-500 text-xs">Choose when you would like the healthcare professional to visit.</p>
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Preferred Appointment Date</label>
                          <Input {...register("preferredDate")} type="date" className="h-12 rounded-xl text-sm" />
                        </div>

                        <div className="space-y-3">
                          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Available Time Slots</label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {timeSlots.map((slot, idx) => (
                              <div
                                key={idx}
                                onClick={() => setValue("preferredTimeSlot", slot.label)}
                                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                                  selectedTimeSlot === slot.label 
                                    ? 'border-[#7B2CBF] bg-purple-50/80 shadow-md' 
                                    : 'border-slate-200 hover:border-slate-300 bg-white'
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  <slot.icon size={20} className="text-[#7B2CBF]" />
                                  <span className="font-bold text-xs sm:text-sm text-slate-900">{slot.label}</span>
                                </div>
                                <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                                  selectedTimeSlot === slot.label ? 'border-[#7B2CBF] bg-[#7B2CBF] text-white' : 'border-slate-300'
                                }`}>
                                  {selectedTimeSlot === slot.label && <Check size={12} />}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2 pt-4">
                          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Deployment Urgency</label>
                          <select 
                            {...register("urgency")}
                            className="flex h-12 w-full rounded-xl border border-slate-200 bg-white px-3 py-1 text-sm font-medium shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#7B2CBF]"
                          >
                            <option value="Urgent">Immediate / Urgent (Within 24 Hours)</option>
                            <option value="Standard">Standard (Within 2-3 Days)</option>
                            <option value="Planned">Planned (Within 1 Week)</option>
                          </select>
                        </div>

                        <div className="pt-6 flex justify-between">
                          <Button type="button" onClick={prevStep} variant="outline" className="font-bold h-12 px-6 rounded-xl flex items-center gap-2">
                            <ChevronLeft size={18} />
                            <span>Back</span>
                          </Button>
                          <Button type="button" onClick={nextStep} size="lg" className="bg-[linear-gradient(90deg,#7B2CBF,#9D4EDD)] text-white font-extrabold h-12 px-8 rounded-xl flex items-center gap-2">
                            <span>Proceed to Patient Details</span>
                            <ChevronRight size={18} />
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* STEP 3: PATIENT INFORMATION */}
                    {currentStep === 3 && (
                      <div className="space-y-8 animate-in fade-in duration-300">
                        <div>
                          <h3 className="text-2xl font-extrabold text-[#17345E] mb-1">Patient Details & Address</h3>
                          <p className="text-slate-500 text-xs">Enter contact details and home location for practitioner visit.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Patient Full Name <span className="text-red-500">*</span></label>
                            <Input {...register("patientName")} placeholder="e.g. Ramesh Kumar" error={errors.patientName?.message} className="h-12 rounded-xl text-sm" />
                          </div>
                          
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Mobile Phone Number <span className="text-red-500">*</span></label>
                            <Input {...register("phone")} placeholder="+91 98765 43210" error={errors.phone?.message} className="h-12 rounded-xl text-sm" />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Email Address (Optional)</label>
                            <Input {...register("email")} type="email" placeholder="name@example.com" error={errors.email?.message} className="h-12 rounded-xl text-sm" />
                          </div>

                          <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Pincode (Optional)</label>
                            <Input {...register("pincode")} placeholder="e.g. 122001" error={errors.pincode?.message} className="h-12 rounded-xl text-sm" />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Complete Home Address <span className="text-red-500">*</span></label>
                          <Input {...register("location")} placeholder="House No., Street, Sector/Area, City (e.g. Sector 33, Gurgaon)" error={errors.location?.message} className="h-12 rounded-xl text-sm" />
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Additional Care Instructions (Optional)</label>
                          <textarea 
                            {...register("requirements")}
                            rows={3}
                            className="flex w-full rounded-xl border border-slate-200 bg-white p-3 text-sm shadow-sm placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7B2CBF]"
                            placeholder="Specify medical history, oxygen requirement, bedridden status..."
                          />
                        </div>

                        <div className="pt-6 flex justify-between">
                          <Button type="button" onClick={prevStep} variant="outline" className="font-bold h-12 px-6 rounded-xl flex items-center gap-2">
                            <ChevronLeft size={18} />
                            <span>Back</span>
                          </Button>
                          <Button type="button" onClick={nextStep} size="lg" className="bg-[linear-gradient(90deg,#7B2CBF,#9D4EDD)] text-white font-extrabold h-12 px-8 rounded-xl flex items-center gap-2">
                            <span>Review & Confirm</span>
                            <ChevronRight size={18} />
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* STEP 4: REVIEW & CONFIRMATION */}
                    {currentStep === 4 && (
                      <div className="space-y-8 animate-in fade-in duration-300">
                        <div>
                          <h3 className="text-2xl font-extrabold text-[#17345E] mb-1">Confirm Your Appointment</h3>
                          <p className="text-slate-500 text-xs">Please review your booking details before final submission.</p>
                        </div>

                        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-4 text-sm">
                          <div className="flex justify-between py-2 border-b border-slate-200">
                            <span className="text-slate-500">Service:</span>
                            <strong className="text-slate-900">{formServices.find(s => s.slug === currentServiceSlug)?.title || currentServiceSlug}</strong>
                          </div>

                          <div className="flex justify-between py-2 border-b border-slate-200">
                            <span className="text-slate-500">Specialist:</span>
                            <strong className="text-[#7B2CBF]">{selectedDoctor}</strong>
                          </div>

                          <div className="flex justify-between py-2 border-b border-slate-200">
                            <span className="text-slate-500">Time Slot:</span>
                            <strong className="text-slate-900">{selectedTimeSlot}</strong>
                          </div>

                          <div className="flex justify-between py-2 border-b border-slate-200">
                            <span className="text-slate-500">Patient:</span>
                            <strong className="text-slate-900">{watch("patientName") || "Not provided"}</strong>
                          </div>

                          <div className="flex justify-between py-2 border-b border-slate-200">
                            <span className="text-slate-500">Phone:</span>
                            <strong className="text-slate-900">{watch("phone") || "Not provided"}</strong>
                          </div>

                          <div className="flex justify-between py-2">
                            <span className="text-slate-500">Address:</span>
                            <strong className="text-slate-900 text-right max-w-xs">{watch("location") || "Not provided"}</strong>
                          </div>
                        </div>

                        <div className="pt-6 flex justify-between gap-4">
                          <Button type="button" onClick={prevStep} variant="outline" className="font-bold h-14 px-6 rounded-xl flex items-center gap-2">
                            <ChevronLeft size={18} />
                            <span>Edit Details</span>
                          </Button>

                          <Button type="submit" size="lg" className="flex-1 bg-[linear-gradient(90deg,#7B2CBF,#9D4EDD)] hover:opacity-95 text-white font-extrabold h-14 text-base rounded-xl shadow-xl border-0" disabled={isSubmitting}>
                            {isSubmitting ? "Confirming Appointment..." : "Confirm & Schedule Visit"}
                          </Button>
                        </div>
                      </div>
                    )}

                  </form>
                </CardContent>
              </Card>
            </div>

          </div>

        </div>
      </div>
    </>
  );
}


