import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Award, 
  GraduationCap, 
  Quote, 
  Stethoscope, 
  UserCheck, 
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Heart,
  Building,
  ArrowRight
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import SEO from "@/src/components/seo/SEO";
import { useAppContent } from "@/src/hooks/useAppContent";
import { Link } from "react-router-dom";
import { HalftoneWaveSVG } from "@/src/components/shared/SilverCareBackground";

export default function Professionals() {
  const { professionals, loading } = useAppContent();
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const navinPro = professionals.find(p => p.id === 'p1' || p.name.toLowerCase().includes('navin'));
  const komalPro = professionals.find(p => p.id === 'p3' || p.name.toLowerCase().includes('komal'));

  const leadershipTeam = [
    {
      id: "navin-chauhan",
      name: navinPro?.name || "Navin Chauhan",
      designation: navinPro?.designation || "Founder & CEO",
      image: navinPro?.imageUrl || "/navin-chauhan.png",
      quote: "Eldercare is not only about medical support. It is about presence, patience, and respect. Every senior deserves to feel safe, heard, and valued in their own home.",
      bio: [
        "Navin Chauhan is the founder of SilverCare India. He brings over 15 years of experience in healthcare administration and operations. His career includes leadership roles at Healthians and Atulaya Healthcare, where he worked closely with clinical teams, caregivers, and families.",
        "Through his work, he saw a clear gap between hospital care and day-to-day support at home for seniors. Hospitals treated illness. Homes needed continuity, empathy, and supervision. This insight led to the creation of SilverCare India.",
        "Navin built SilverCare with a simple goal: Help elders live with dignity, comfort, and emotional security at home. His focus remains on reliable systems, trained caregivers, and care that feels personal and respectful."
      ]
    },
    {
      id: "komal-gupta",
      name: komalPro?.name || "Komal Gupta",
      designation: komalPro?.designation || "Co-founder & Chief Product Officer",
      image: komalPro?.imageUrl || "/team/komal-gupta.jpg",
      bio: [
        komalPro?.qualification
          ? `Komal Gupta (${komalPro.qualification}). She leads product strategy, caregiver training frameworks, and quality oversight systems at SilverCare.`
          : "Komal Gupta holds a Master’s degree from NIT Karnataka and brings 13+ years of experience in biopharma and eldercare. She leads product strategy, caregiver training frameworks, and quality oversight systems at SilverCare."
      ]
    }
  ];

  const clinicalStaff = professionals.filter(
    p => !['Founder & CEO', 'Co-founder & Chief Operating Officer', 'Co-founder & Chief Product Officer'].includes(p.designation)
  );

  const filteredStaff = clinicalStaff.filter(pro => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Doctors") return pro.designation.toLowerCase().includes("physician") || pro.designation.toLowerCase().includes("doctor");
    if (activeFilter === "Nursing & Care") return pro.designation.toLowerCase().includes("nursing") || pro.designation.toLowerCase().includes("trainer") || pro.designation.toLowerCase().includes("supervisor") || pro.designation.toLowerCase().includes("care");
    if (activeFilter === "Leadership") return false;
    return true;
  });

  const categories = ["All", "Doctors", "Nursing & Care", "Leadership"];

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
    if (filter === "Leadership") {
      const el = document.getElementById("leadership-section");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <SEO 
        title="Our Team | SilverCare India Leadership & Clinical Experts" 
        description="Meet the leadership and clinical team behind SilverCare India. Experienced doctors, healthcare administrators, nursing supervisors, and caregivers dedicated to senior home care."
      />
      
      <div className="bg-[#FAF8FC] min-h-screen font-sans text-slate-800">
        
        {/* HERO SECTION - REFINED WARM HEALTHCARE THEME */}
        <section 
          className="relative py-14 sm:py-20 overflow-hidden border-b border-pink-100/60"
          style={{
            background: 'linear-gradient(135deg, #FFF6F9 0%, #FAF2FB 45%, #F5F0FF 100%)'
          }}
        >
          {/* Subtle Halftone Wave Background */}
          <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
            <HalftoneWaveSVG density="medium" />
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="inline-flex items-center gap-2 rounded-full bg-white/90 backdrop-blur-md border border-pink-200/80 px-4 py-1.5 text-xs sm:text-sm font-bold text-[#E91E63] mb-5 shadow-2xs"
            >
              <Sparkles size={14} className="text-[#E91E63]" />
              People Behind SilverCare
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#17345E] leading-[1.15] tracking-tight mb-5"
            >
              Meet the People Behind <span className="bg-clip-text text-transparent bg-[linear-gradient(90deg,#FF4F81,#E91E63,#7B2CBF)]">Compassionate Care</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto font-medium"
            >
              Our leadership, clinical experts, and care professionals work together to deliver trusted, doctor-led, and dependable home healthcare for seniors.
            </motion.p>
          </div>
        </section>

        {/* MAIN CONTENT WRAPPER */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20 max-w-[1200px]">
          
          {/* LEADERSHIP SECTION INTRO */}
          <div id="leadership-section" className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 pt-2">
            <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#E91E63] bg-pink-50/90 px-3.5 py-1.5 rounded-full border border-pink-200/80 inline-flex items-center gap-1.5 shadow-2xs mb-3">
              <ShieldCheck size={13} className="text-[#E91E63]" />
              Visionary Leadership
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#17345E] tracking-tight mb-3">
              Visionary Leadership. Human-Centered Care
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-[650px] mx-auto font-medium">
              Combining 15+ years of healthcare operational excellence with heartfelt dedication to senior comfort and dignity at home.
            </p>
          </div>

          {/* FOUNDER & CEO EDITORIAL SPOTLIGHT CARD */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.55 }}
            className="max-w-[1180px] mx-auto bg-[linear-gradient(145deg,#FFFFFF_0%,#FDFBFE_50%,#FAF5F9_100%)] rounded-[28px] border border-pink-100/90 shadow-[0_12px_36px_rgba(23,52,94,0.05),0_1px_3px_rgba(23,52,94,0.02)] hover:shadow-[0_16px_44px_rgba(23,52,94,0.08)] hover:-translate-y-0.5 transition-all duration-300 p-8 sm:p-12 lg:p-14 mb-16 relative overflow-hidden"
          >
            {/* Extremely subtle ambient background glow */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-pink-100/30 rounded-full blur-3xl pointer-events-none -z-0"></div>
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-100/25 rounded-full blur-3xl pointer-events-none -z-0"></div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
              
              {/* Left Column (38% to 42%): Founder Portrait */}
              <div className="lg:col-span-5 w-full flex justify-center pb-5 lg:pb-0">
                <div className="relative w-full max-w-[340px] sm:max-w-[380px]">
                  
                  {/* Extremely subtle abstract brand shape backdrop */}
                  <div className="absolute -inset-2 bg-[linear-gradient(135deg,rgba(255,79,129,0.12)_0%,rgba(123,44,191,0.12)_100%)] rounded-[26px] blur-sm"></div>
                  
                  {/* Photo Container */}
                  <div className="relative bg-[linear-gradient(180deg,#FAF5FC_0%,#FFFFFF_60%,#FFF6F9_100%)] rounded-[24px] p-2.5 border border-pink-200/60 shadow-sm">
                    <img 
                      src={leadershipTeam[0].image} 
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = "/navin-chauhan.png";
                      }}
                      alt={`${leadershipTeam[0].name} - ${leadershipTeam[0].designation}`}
                      className="w-full h-[380px] sm:h-[430px] rounded-[20px] object-cover object-top shadow-xs border border-white/60"
                      loading="lazy"
                    />
                  </div>
                  
                  {/* Refined Badge Overlapping Bottom Edge */}
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-[#17345E] text-white px-6 py-2 sm:py-2.5 rounded-2xl shadow-xl whitespace-nowrap flex flex-col items-center border border-white/20">
                    <span className="text-sm sm:text-[15px] font-black tracking-wide text-white">
                      {leadershipTeam[0].name}
                    </span>
                    <span className="text-xs sm:text-[13px] font-black uppercase tracking-[0.18em] text-white flex items-center gap-1.5 mt-0.5">
                      <ShieldCheck size={14} className="text-[#FF4F81]" />
                      FOUNDER & CEO
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Editorial Bio, Quote & Horizontal Credentials Strip */}
              <div className="lg:col-span-7 flex flex-col justify-center space-y-5 sm:space-y-6">
                
                {/* Eyebrow, Name & Designation */}
                <div>
                  <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#E91E63] inline-block mb-1.5">
                    FROM OUR FOUNDER
                  </span>
                  <h3 className="text-3xl sm:text-4xl lg:text-[40px] font-black text-[#17345E] leading-tight tracking-tight">
                    {leadershipTeam[0].name}
                  </h3>
                  <p className="text-xs sm:text-[13px] font-extrabold uppercase tracking-wider text-slate-500 mt-1.5">
                    FOUNDER & CHIEF EXECUTIVE OFFICER, SILVERCARE INDIA
                  </p>
                </div>

                {/* Elegant Leadership Statement / Quote */}
                <div className="relative rounded-2xl bg-[linear-gradient(135deg,#FFF5F8_0%,#FAF5FC_100%)] border-l-[3.5px] border-[#E91E63] p-5 sm:p-6 shadow-2xs">
                  <Quote size={22} className="text-pink-300/50 absolute top-4 right-4 pointer-events-none" />
                  <p className="text-base sm:text-[17px] font-medium leading-[1.65] italic text-[#17345E] relative z-10">
                    "{leadershipTeam[0].quote}"
                  </p>
                </div>

                {/* Biography Paragraphs */}
                <div className="space-y-3.5 text-slate-700 text-sm sm:text-[14.5px] leading-[1.75] font-normal max-w-[620px]">
                  <p>
                    Navin Chauhan is the founder and CEO of SilverCare India. He brings over 15 years of experience in healthcare administration and operations, having held key leadership roles at leading healthcare organizations including Healthians and Atulaya Healthcare.
                  </p>
                  <p>
                    Through his work, he saw a clear gap between hospital care and day-to-day support at home for seniors. Hospitals treated illness, while homes needed continuity, empathy, and professional supervision. This insight sparked the creation of SilverCare India.
                  </p>
                  <p>
                    Under his leadership, SilverCare is built to help elders live with dignity, comfort, and emotional security at home through reliable systems, trained caregivers, and clinical oversight.
                  </p>
                </div>

                {/* Horizontal Credentials Strip */}
                <div className="pt-2">
                  <div className="rounded-2xl bg-white/90 border border-pink-100/80 p-3.5 sm:p-4 shadow-2xs grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-pink-100/80">
                    
                    <div className="py-2 sm:py-0 sm:px-4 first:pl-2 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-pink-50 border border-pink-100 flex items-center justify-center shrink-0 text-[#E91E63]">
                        <Award size={18} />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block leading-tight">Healthcare Leadership</span>
                        <strong className="text-xs sm:text-sm text-[#17345E] font-extrabold block leading-tight mt-0.5">15+ Years Admin</strong>
                      </div>
                    </div>

                    <div className="py-2 sm:py-0 sm:px-4 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center shrink-0 text-purple-700">
                        <Building size={18} />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block leading-tight">Industry Background</span>
                        <strong className="text-xs sm:text-sm text-[#17345E] font-extrabold block leading-tight mt-0.5">Ex-Healthians & Atulaya</strong>
                      </div>
                    </div>

                    <div className="py-2 sm:py-0 sm:px-4 last:pr-2 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-pink-50 border border-pink-100 flex items-center justify-center shrink-0 text-[#E91E63]">
                        <Stethoscope size={18} />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block leading-tight">Clinical Vision</span>
                        <strong className="text-xs sm:text-sm text-[#E91E63] font-extrabold block leading-tight mt-0.5">Doctor-Led Protocols</strong>
                      </div>
                    </div>

                  </div>
                </div>

              </div>

            </div>
          </motion.div>

          {/* CO-FOUNDING LEADERSHIP */}
          <div className="mb-16 lg:mb-20">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.18em] text-purple-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-100/90 inline-block mb-2">
                Executive Leadership
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-[#17345E]">
                Co-Founding Leadership
              </h3>
            </div>

            <div className="max-w-[900px] mx-auto">
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-[linear-gradient(145deg,#FFFFFF_0%,#FAF7FC_100%)] rounded-[26px] p-6 sm:p-8 border border-purple-100/80 shadow-[0_8px_24px_rgba(23,52,94,0.04)] hover:shadow-[0_12px_32px_rgba(23,52,94,0.07)] hover:-translate-y-0.5 transition-all duration-300 flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8"
              >
                {/* Photo container */}
                <div className="w-28 h-28 sm:w-36 sm:h-36 shrink-0 rounded-[20px] overflow-hidden bg-purple-50 border-2 border-purple-100 shadow-xs relative">
                  <img 
                    src={leadershipTeam[1].image} 
                    alt={leadershipTeam[1].name} 
                    className="w-full h-full object-cover object-top" 
                    loading="lazy"
                    onError={(e) => {
                      (e.currentTarget as HTMLElement).style.display = 'none';
                      const fallback = e.currentTarget.parentElement?.querySelector('.komal-fallback') as HTMLElement;
                      if (fallback) fallback.classList.remove('hidden');
                    }}
                  />
                  <div className="komal-fallback hidden w-full h-full bg-[linear-gradient(135deg,#F5E8FF_0%,#EDD8FF_100%)] flex flex-col items-center justify-center text-[#7B2CBF] font-black">
                    <span className="text-2xl font-extrabold tracking-tight">KG</span>
                    <span className="text-[10px] tracking-wider uppercase font-bold text-purple-600 mt-0.5">Leadership</span>
                  </div>
                </div>

                {/* Content */}
                <div className="text-center sm:text-left space-y-2.5 flex-1">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-purple-700 bg-purple-50/90 px-2.5 py-0.5 rounded-md border border-purple-100 mb-1.5 inline-block">
                      Product Strategy & Clinical Quality
                    </span>
                    <h4 className="text-2xl sm:text-[26px] font-black text-[#17345E]">{leadershipTeam[1].name}</h4>
                    <p className="text-xs sm:text-[13px] font-extrabold uppercase tracking-wider text-purple-700/80 mt-0.5">
                      {leadershipTeam[1].designation}
                    </p>
                  </div>
                  <p className="text-slate-700 text-xs sm:text-sm leading-[1.7] font-normal">
                    Komal Gupta holds a Master's degree from NIT Karnataka and brings over 13 years of experience in biopharma and eldercare. She leads product strategy, caregiver training frameworks, and clinical quality oversight systems at SilverCare India.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* CLINICAL & CARE EXPERTS SECTION */}
          <div id="clinical-experts" className="pt-8 border-t border-slate-200/80">
            
            {/* Section Heading */}
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="text-[#E91E63] font-black uppercase tracking-widest text-xs block mb-2">
                On-Ground Healthcare Team
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#17345E] mb-3">
                Clinical & Care Experts
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Meet our experienced physicians, nursing leaders and multidisciplinary care professionals.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex justify-center items-center gap-2 sm:gap-3 mb-10 overflow-x-auto no-scrollbar py-2 px-1 max-w-full">
              {categories.map((filter) => (
                <button
                  key={filter}
                  onClick={() => handleFilterClick(filter)}
                  className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 cursor-pointer min-h-[44px] flex items-center ${
                    activeFilter === filter 
                      ? 'bg-[linear-gradient(90deg,#FF4F81,#E91E63)] text-white shadow-md shadow-pink-500/20' 
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/80 shadow-xs'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Team Grid */}
            {loading ? (
              <div className="py-16 text-center text-slate-500 font-medium">Loading clinical profiles...</div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeFilter}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7 items-stretch"
                >
                  {filteredStaff.map((pro) => (
                    <motion.div 
                      key={pro.id}
                      className="bg-white rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-md hover:border-pink-200 hover:-translate-y-1 transition-all duration-300 p-6 flex flex-col justify-between h-full group"
                    >
                      <div>
                        {/* Member Photo */}
                        <div className="flex justify-center mb-5">
                          {pro.imageUrl ? (
                            <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-pink-100 shadow-xs bg-pink-50 group-hover:scale-102 transition-transform duration-300">
                              <img 
                                src={pro.imageUrl} 
                                alt={pro.name} 
                                className="w-full h-full object-cover object-top" 
                                loading="lazy" 
                                onError={(e) => {
                                  (e.currentTarget as HTMLImageElement).src = "/team/dr-kirandeep.jpg";
                                }}
                              />
                            </div>
                          ) : (
                            <div className="w-24 h-24 rounded-2xl bg-pink-100 border-2 border-pink-200 flex items-center justify-center text-[#E91E63] shadow-xs group-hover:scale-102 transition-transform duration-300">
                              {pro.designation.toLowerCase().includes('physician') || pro.designation.toLowerCase().includes('doctor') ? (
                                <Stethoscope size={36} />
                              ) : pro.designation.toLowerCase().includes('trainer') ? (
                                <GraduationCap size={36} />
                              ) : (
                                <UserCheck size={36} />
                              )}
                            </div>
                          )}
                        </div>

                        {/* Name & Title */}
                        <div className="text-center mb-3">
                          <h3 className="text-lg font-bold text-slate-900 mb-1">{pro.name}</h3>
                          <span className="inline-block text-[11px] font-black uppercase tracking-wider text-[#E91E63] bg-pink-50 px-2.5 py-0.5 rounded-md border border-pink-100">
                            {pro.designation}
                          </span>
                        </div>

                        {/* 1-2 Lines Brief Description */}
                        {pro.bio && (
                          <p className="text-xs text-slate-600 leading-relaxed text-center mb-4 px-1 font-normal">
                            {pro.bio}
                          </p>
                        )}

                        {/* Credentials Card */}
                        <div className="bg-slate-50/80 border border-slate-100 rounded-xl p-3.5 space-y-2 text-xs text-slate-600 leading-relaxed mb-6">
                          {pro.qualification && (
                            <div className="flex items-start gap-2 text-slate-700">
                              <GraduationCap size={15} className="text-[#E91E63] shrink-0 mt-0.5" />
                              <span className="font-medium leading-snug">{pro.qualification}</span>
                            </div>
                          )}
                          {pro.experience && (
                            <div className="flex items-start gap-2 text-slate-700">
                              <Award size={15} className="text-[#E91E63] shrink-0 mt-0.5" />
                              <span className="font-bold leading-snug">{pro.experience} Clinical Practice</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Request Consultation CTA */}
                      <Link 
                        to={`/book?service=${pro.designation.toLowerCase().includes('physician') ? 'doctor-visit-at-home' : 'nursing-attendant-care'}`}
                        className="w-full"
                      >
                        <Button 
                          variant="outline" 
                          className="w-full border-pink-200 text-[#E91E63] hover:bg-[linear-gradient(90deg,#FF4F81,#E91E63)] hover:text-white font-bold text-xs h-10 rounded-xl transition-all duration-200 cursor-pointer"
                        >
                          Request Consultation
                        </Button>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            )}
          </div>
          
          {/* HEALTHCARE PROFESSIONAL CTA SECTION */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-16 lg:mt-20 bg-gradient-to-r from-[#17345E] via-[#2A1B4E] to-[#17345E] rounded-3xl p-8 sm:p-10 lg:p-12 text-center text-white relative overflow-hidden max-w-4xl mx-auto shadow-xl"
          >
            <div className="relative z-10 max-w-2xl mx-auto">
              <h3 className="text-2xl sm:text-3xl font-black mb-3 text-white">
                Are You a Healthcare Professional?
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                Join our network of verified physicians, nursing supervisors, and caregivers committed to delivering compassionate and dependable eldercare.
              </p>
              <Link to="/contact">
                <Button 
                  size="lg" 
                  className="bg-[linear-gradient(90deg,#FF4F81,#E91E63)] hover:opacity-95 text-white font-extrabold px-8 h-12 sm:h-14 rounded-xl shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer border-0"
                >
                  Apply to Join SilverCare
                </Button>
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </>
  );
}
