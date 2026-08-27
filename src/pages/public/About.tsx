import { ShieldCheck, HeartPulse, Stethoscope, Users, Award, CheckCircle2, Quote, PhoneCall, Sparkles } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import SEO from "@/src/components/seo/SEO";
import { HalftoneWaveSVG, OrganicPastelBlobs } from "@/src/components/shared/SilverCareBackground";

export default function About() {
  return (
    <>
      <SEO 
        title="About Us | SilverCare India - Eldercare Services" 
        description="Learn about SilverCare India, founded by Navin Chauhan to bridge the gap between hospital and home with compassionate, doctor-led eldercare services across North India."
      />
      <div className="bg-slate-50 min-h-screen font-sans">
        
        {/* HERO SECTION */}
        <section className="relative bg-[linear-gradient(135deg,#0F172A_0%,#1E1B4B_50%,#3B0764_100%)] text-white py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
            <HalftoneWaveSVG density="high" />
          </div>

          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 text-xs sm:text-sm font-semibold text-purple-200 mb-6">
              <Sparkles size={14} className="text-[#D946EF]" />
              Rakhe Aapke Apno Ka Khyal
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tight">
              About <span className="bg-clip-text text-transparent bg-[linear-gradient(90deg,#FF6B9B,#D946EF,#9D4EDD)]">SilverCare</span> India
            </h1>

            <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto">
              An eldercare service provider dedicated to home-based medical and non-medical support for seniors across North India. Bringing dignity, comfort, and peace of mind to families.
            </p>
          </div>
        </section>

        {/* STORY & CEO SECTION */}
        <section className="py-16 md:py-24 bg-white" id="who-we-are">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              <div className="lg:col-span-7 space-y-6">
                <span className="text-[#E91E63] font-extrabold uppercase tracking-wider text-xs block">Our Philosophy</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#17345E] leading-tight">
                  Compassionate Care That Feels Like Family
                </h2>
                
                <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                  You want your parents to age with dignity, comfort, and safety. Home gives them emotional security. Familiar surroundings reduce stress, anxiety, and hospital dependency. We design our services around this reality.
                </p>

                <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                  You rely on us to deliver structured, dependable care at home. Our trained nurses, caregivers, doctors, and therapists work as one coordinated team. Care plans follow medical needs, daily routines, and personal preferences.
                </p>

                {/* CEO Quote Spotlight Card */}
                <div className="bg-[linear-gradient(135deg,#E91E63_0%,#FF4F81_100%)] text-white p-6 sm:p-8 rounded-3xl shadow-xl relative overflow-hidden mt-8">
                  <Quote size={40} className="text-pink-200/40 absolute top-4 right-4" />
                  <p className="text-base sm:text-lg font-medium leading-relaxed italic mb-4 relative z-10">
                    "Eldercare is not only about medical support. It is about presence, patience, and respect. Every senior deserves to feel safe, heard, and valued in their own home."
                  </p>
                  <div className="flex items-center gap-3 relative z-10 pt-4 border-t border-white/20">
                    <div className="h-10 w-10 rounded-full bg-white/20 overflow-hidden flex items-center justify-center font-bold text-white text-sm">
                      NC
                    </div>
                    <div>
                      <h4 className="font-extrabold text-sm text-white">Navin Chauhan</h4>
                      <p className="text-xs text-pink-200">Founder & CEO, SilverCare India</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-slate-100 relative group">
                  <img 
                    src="https://silvercareindia.com/wp-content/uploads/2025/12/Doc-treat-1.png" 
                    alt="SilverCare Doctor treating patient at home" 
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <span className="bg-[#00B894] text-white text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider mb-2 inline-block">
                      Doctor-Led Care
                    </span>
                    <h3 className="text-xl font-bold">Clinical Precision at Doorstep</h3>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* MISSION & PURPOSE */}
        <section className="py-16 bg-slate-50 border-y border-slate-200" id="our-purpose">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-[#E91E63] font-bold uppercase tracking-wider text-xs block mb-2">Guided By Principles</span>
              <h2 className="text-3xl font-extrabold text-[#17345E]">Our Mission & Core Purpose</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="h-14 w-14 bg-pink-100 text-[#E91E63] rounded-2xl flex items-center justify-center mb-6">
                  <HeartPulse size={30} />
                </div>
                <h3 className="text-2xl font-extrabold text-slate-900 mb-4">Our Mission</h3>
                <p className="text-slate-600 leading-relaxed text-base">
                  To bridge the gap between hospitals and home by delivering reliable care where seniors feel safest. Reduce avoidable hospital visits and support recovery, chronic care, and daily living under one coordinated system.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="h-14 w-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                  <Award size={30} />
                </div>
                <h3 className="text-2xl font-extrabold text-slate-900 mb-4">Our Purpose</h3>
                <p className="text-slate-600 leading-relaxed text-base">
                  Deliver professional healthcare where seniors feel most secure, ensuring each service focuses on safety, continuity, dignity, and deep respect for every individual patient and their family.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4 OPERATIONAL PILLARS */}
        <section className="py-16 md:py-24 bg-white" id="how-we-work">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-[#E91E63] font-bold uppercase tracking-wider text-xs block mb-2">Structured Eldercare System</span>
              <h2 className="text-3xl font-extrabold text-[#17345E]">How We Work</h2>
              <p className="mt-3 text-slate-600 text-base">A systematic, step-by-step approach to home healthcare.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200 hover:border-[#E91E63] transition-all hover:-translate-y-1">
                <div className="h-12 w-12 bg-[#E91E63] text-white rounded-2xl flex items-center justify-center mb-6 font-extrabold text-lg shadow-md">01</div>
                <h3 className="text-xl font-extrabold text-slate-900 mb-3">Assessment</h3>
                <p className="text-slate-600 text-sm leading-relaxed">Detailed review of medical history, current health status, and daily living support needs.</p>
              </div>
              
              <div className="bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200 hover:border-[#E91E63] transition-all hover:-translate-y-1">
                <div className="h-12 w-12 bg-[#E91E63] text-white rounded-2xl flex items-center justify-center mb-6 font-extrabold text-lg shadow-md">02</div>
                <h3 className="text-xl font-extrabold text-slate-900 mb-3">Care Planning</h3>
                <p className="text-slate-600 text-sm leading-relaxed">Customized care plan developed by senior physicians and care coordinators.</p>
              </div>

              <div className="bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200 hover:border-[#E91E63] transition-all hover:-translate-y-1">
                <div className="h-12 w-12 bg-[#E91E63] text-white rounded-2xl flex items-center justify-center mb-6 font-extrabold text-lg shadow-md">03</div>
                <h3 className="text-xl font-extrabold text-slate-900 mb-3">Deployment</h3>
                <p className="text-slate-600 text-sm leading-relaxed">Matching qualified, verified healthcare professionals to patient requirements.</p>
              </div>

              <div className="bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200 hover:border-[#E91E63] transition-all hover:-translate-y-1">
                <div className="h-12 w-12 bg-[#E91E63] text-white rounded-2xl flex items-center justify-center mb-6 font-extrabold text-lg shadow-md">04</div>
                <h3 className="text-xl font-extrabold text-slate-900 mb-3">Monitoring</h3>
                <p className="text-slate-600 text-sm leading-relaxed">Continuous clinical oversight, regular feedback, and flexible plan adjustments.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA BANNER */}
        <section className="py-16 bg-[linear-gradient(90deg,#7B2CBF,#9D4EDD)] text-center text-white">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">Ready to Plan Home Care for Your Parents?</h2>
            <p className="text-purple-100 mb-8 text-base sm:text-lg">
              Our clinical care coordinators are available 24/7 to guide you through personalized care plans.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link to="/book" className="w-full sm:w-auto">
                <Button size="lg" className="bg-white text-[#7B2CBF] hover:bg-slate-100 font-extrabold px-8 h-14 w-full sm:w-auto shadow-xl rounded-xl">
                  Book a Home Visit
                </Button>
              </Link>
            </div>

          </div>
        </section>

      </div>
    </>
  );
}

