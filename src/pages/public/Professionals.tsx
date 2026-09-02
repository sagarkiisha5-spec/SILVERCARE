import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Award, 
  GraduationCap, 
  Quote, 
  Stethoscope, 
  UserCheck, 
  Sparkles 
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import SEO from "@/src/components/seo/SEO";
import { useAppContent } from "@/src/hooks/useAppContent";
import { Link } from "react-router-dom";

export default function Professionals() {
  const { professionals, loading } = useAppContent();
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const leadershipTeam = [
    {
      id: "navin-chauhan",
      name: "Navin Chauhan",
      designation: "Founder & CEO",
      image: "https://silvercareindia.com/wp-content/uploads/2025/12/Navin.png",
      quote: "Eldercare is not only about medical support. It is about presence, patience, and respect. Every senior deserves to feel safe, heard, and valued in their own home.",
      bio: [
        "Navin Chauhan is the founder of SilverCare India. He brings over 15 years of experience in healthcare administration and operations. His career includes leadership roles at Healthians and Atulaya Healthcare, where he worked closely with clinical teams, caregivers, and families.",
        "Through his work, he saw a clear gap between hospital care and day-to-day support at home for seniors. Hospitals treated illness. Homes needed continuity, empathy, and supervision. This insight led to the creation of SilverCare India.",
        "Navin built SilverCare with a simple goal: Help elders live with dignity, comfort, and emotional security at home. His focus remains on reliable systems, trained caregivers, and care that feels personal and respectful."
      ]
    },
    {
      id: "komal-gupta",
      name: "Komal Gupta",
      designation: "Co-founder & Chief Product Officer",
      image: "https://silvercareindia.com/wp-content/uploads/2026/04/IMG_1291-e1775877168885.jpg",
      bio: [
        "Komal Gupta holds a Master’s degree from NIT Karnataka and brings 13+ years of experience in biopharma and eldercare. She leads product strategy, caregiver training frameworks, and quality oversight systems at SilverCare."
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
      
      <div className="bg-slate-50/60 min-h-screen font-sans text-slate-800">
        
        {/* HERO SECTION */}
        <section className="relative bg-[linear-gradient(135deg,#0F172A_0%,#1E1B4B_50%,#3B0764_100%)] text-white py-16 lg:py-20 overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-purple-600/20 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1.5px, transparent 1.5px)', backgroundSize: '32px 32px' }} />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1200px] text-center relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 text-xs sm:text-sm font-bold text-purple-200 mb-5 shadow-sm"
            >
              <Sparkles size={14} className="text-[#FF4F81] animate-pulse" />
              People Behind SilverCare
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.15] tracking-tight mb-5 max-w-[760px] mx-auto"
            >
              Meet the People Behind <span className="bg-clip-text text-transparent bg-[linear-gradient(90deg,#FF6B9B,#D946EF,#9D4EDD)]">Compassionate Care</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto font-medium"
            >
              Our leadership, clinical experts and care professionals work together to deliver trusted, compassionate and dependable eldercare.
            </motion.p>
          </div>
        </section>

        {/* MAIN CONTENT WRAPPER */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20 max-w-[1200px]">
          
          {/* LEADERSHIP SECTION HEADER */}
          <div id="leadership-section" className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#7B2CBF] mb-2 block">
              Leadership
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#17345E] tracking-tight">
              Visionary Leadership, Human-Centered Care
            </h2>
          </div>

          {/* CEO SPOTLIGHT CARD */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-[24px] border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 p-6 sm:p-8 lg:p-10 mb-12"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              
              {/* Left Column: Founder Photo */}
              <div className="lg:col-span-5 w-full">
                <div className="relative rounded-[20px] overflow-hidden bg-slate-100 border border-slate-200/80 shadow-sm aspect-[4/5] group">
                  <img 
                    src={leadershipTeam[0].image} 
                    alt={`${leadershipTeam[0].name} - ${leadershipTeam[0].designation}`}
                    className="w-full h-full object-cover object-top group-hover:scale-102 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-5 bg-[linear-gradient(180deg,transparent_0%,rgba(15,23,42,0.92)_100%)] text-white text-center">
                    <h3 className="text-xl sm:text-2xl font-black">{leadershipTeam[0].name}</h3>
                    <p className="text-[#FF4F81] font-bold text-xs sm:text-sm tracking-wide mt-0.5">{leadershipTeam[0].designation}, SilverCare India</p>
                  </div>
                </div>
              </div>

              {/* Right Column: Quote & Biography */}
              <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
                
                {/* Quote Box */}
                <div className="bg-[linear-gradient(135deg,#F5E8FF_0%,#FFF0F5_100%)] border border-purple-100 text-slate-800 p-6 lg:p-7 rounded-[18px] relative shadow-xs">
                  <div className="w-10 h-10 rounded-xl bg-[linear-gradient(135deg,#7B2CBF,#9D4EDD)] text-white flex items-center justify-center mb-3 shadow-sm">
                    <Quote size={20} />
                  </div>
                  <p className="text-base sm:text-lg font-medium leading-relaxed italic text-slate-800">
                    "{leadershipTeam[0].quote}"
                  </p>
                </div>

                {/* Paragraphs */}
                <div className="space-y-3.5 text-slate-600 text-sm sm:text-base leading-relaxed">
                  {leadershipTeam[0].bio.map((para, i) => (
                    <p key={i} className="font-normal">{para}</p>
                  ))}
                </div>

              </div>

            </div>
          </motion.div>

          {/* CO-FOUNDING LEADERSHIP CARD */}
          <div className="mb-16 lg:mb-20">
            <h3 className="text-xl sm:text-2xl font-bold text-[#17345E] mb-6 text-center">
              Co-Founding Leadership
            </h3>
            <div className="max-w-[800px] mx-auto">
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-[20px] p-6 sm:p-7 border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row items-center gap-6"
              >
                <div className="w-24 h-24 sm:w-28 sm:h-28 shrink-0 rounded-2xl overflow-hidden bg-purple-50 border border-purple-100 shadow-xs">
                  <img 
                    src={leadershipTeam[1].image} 
                    alt={leadershipTeam[1].name} 
                    className="w-full h-full object-cover object-top" 
                    loading="lazy"
                  />
                </div>
                <div className="text-center sm:text-left space-y-1.5">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                    <h4 className="text-lg sm:text-xl font-extrabold text-slate-900">{leadershipTeam[1].name}</h4>
                    <span className="inline-block px-3 py-0.5 rounded-full bg-purple-100 text-[#7B2CBF] font-extrabold text-xs tracking-wide w-fit mx-auto sm:mx-0">
                      {leadershipTeam[1].designation}
                    </span>
                  </div>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed pt-1">
                    {leadershipTeam[1].bio[0]}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* CLINICAL & CARE EXPERTS SECTION */}
          <div id="clinical-experts" className="pt-8 border-t border-slate-200/80">
            
            {/* Section Heading */}
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="text-[#7B2CBF] font-extrabold uppercase tracking-widest text-xs sm:text-sm block mb-2">
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
                      ? 'bg-[linear-gradient(90deg,#7B2CBF,#9D4EDD)] text-white shadow-md shadow-purple-500/20' 
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
                      className="bg-white rounded-[20px] border border-slate-200/80 shadow-xs hover:shadow-md hover:border-purple-200 hover:-translate-y-1.5 transition-all duration-300 p-6 flex flex-col justify-between h-full group"
                    >
                      <div>
                        {/* Member Photo */}
                        <div className="flex justify-center mb-5">
                          {pro.imageUrl ? (
                            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-slate-50 shadow-sm bg-purple-50 group-hover:scale-102 transition-transform duration-300">
                              <img 
                                src={pro.imageUrl} 
                                alt={pro.name} 
                                className="w-full h-full object-cover object-top" 
                                loading="lazy" 
                              />
                            </div>
                          ) : (
                            <div className="w-24 h-24 rounded-full bg-purple-100 border-4 border-slate-50 flex items-center justify-center text-[#7B2CBF] shadow-sm group-hover:scale-102 transition-transform duration-300">
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
                        <div className="text-center mb-4">
                          <h3 className="text-lg font-bold text-slate-900 mb-1">{pro.name}</h3>
                          <p className="text-[#7B2CBF] font-bold text-xs uppercase tracking-wider">{pro.designation}</p>
                        </div>

                        {/* Credentials Card */}
                        <div className="bg-slate-50 border border-slate-100 rounded-xl p-3.5 space-y-2 text-xs text-slate-600 leading-relaxed mb-6">
                          {pro.qualification && (
                            <div className="flex items-start gap-2 text-slate-700">
                              <GraduationCap size={16} className="text-[#7B2CBF] shrink-0 mt-0.5" />
                              <span className="font-medium leading-snug">{pro.qualification}</span>
                            </div>
                          )}
                          {pro.experience && (
                            <div className="flex items-start gap-2 text-slate-700">
                              <Award size={16} className="text-[#7B2CBF] shrink-0 mt-0.5" />
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
                          className="w-full border-purple-200 text-[#7B2CBF] hover:bg-[#7B2CBF] hover:text-white font-bold text-xs h-10 rounded-xl transition-all duration-200 cursor-pointer"
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
            transition={{ duration: 0.6 }}
            className="mt-16 lg:mt-20 bg-[linear-gradient(135deg,#17345E_0%,#7B2CBF_60%,#9D4EDD_100%)] rounded-[24px] p-8 sm:p-10 lg:p-12 text-center text-white relative overflow-hidden max-w-[920px] mx-auto shadow-xl"
          >
            {/* Subtle background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-purple-400/20 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 max-w-2xl mx-auto">
              <h3 className="text-2xl sm:text-3xl font-black mb-3 text-white">
                Are You a Healthcare Professional?
              </h3>
              <p className="text-purple-100 text-sm sm:text-base leading-relaxed mb-8">
                Join our network of professionals committed to delivering compassionate and dependable eldercare.
              </p>
              <Link to="/contact">
                <Button 
                  size="lg" 
                  className="bg-white text-[#7B2CBF] hover:bg-slate-100 font-extrabold px-8 h-12 sm:h-14 rounded-xl shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer"
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
