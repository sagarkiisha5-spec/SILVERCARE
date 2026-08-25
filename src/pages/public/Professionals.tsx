import { useState } from "react";
import { Award, GraduationCap, Quote, ShieldCheck, Stethoscope, UserCheck, Sparkles, PhoneCall } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import SEO from "@/src/components/seo/SEO";
import { useAppContent } from "@/src/hooks/useAppContent";
import { Link } from "react-router-dom";

export default function Professionals() {
  const { professionals, loading } = useAppContent();
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const leadershipTeam = [
    {
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
      name: "Dr. Vikas Sharma",
      designation: "Co-founder & Chief Operating Officer",
      image: "https://silvercareindia.com/wp-content/uploads/2026/04/Vikas_sharma.png",
      bio: [
        "Dr. Vikas Sharma is a seasoned healthcare leader with 25+ years of experience across Diagnostics and Pharmaceuticals. He has held key leadership roles with Dr. Reddy’s, Lupin, Dr Lal PathLabs, and Lifecell Diagnostics.",
        "At SilverCare, Dr. Sharma drives operational excellence, clinical quality protocols, and market expansion to ensure reliable home delivery of care."
      ]
    },
    {
      name: "Komal Gupta",
      designation: "Co-founder & Chief Product Officer",
      image: "https://silvercareindia.com/wp-content/uploads/2026/04/IMG_1291-e1775877168885.jpg",
      bio: [
        "Komal Gupta holds a Master’s degree from NIT Karnataka and brings 13+ years of experience in biopharma and eldercare. She leads product strategy, caregiver training frameworks, and quality oversight systems at SilverCare."
      ]
    }
  ];

  const clinicalStaff = professionals.filter(p => !['Founder & CEO', 'Co-founder & Chief Operating Officer', 'Co-founder & Chief Product Officer'].includes(p.designation));

  const filteredStaff = clinicalStaff.filter(pro => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Doctors") return pro.designation.includes("Physician") || pro.designation.includes("Doctor");
    if (activeFilter === "Nursing & Trainers") return pro.designation.includes("Nursing") || pro.designation.includes("Trainer") || pro.designation.includes("Supervisor");
    return true;
  });

  return (
    <>
      <SEO 
        title="Our Team | SilverCare India Leadership & Clinical Experts" 
        description="Meet the leadership and clinical team behind SilverCare India. Experienced doctors, healthcare administrators, nursing supervisors, and caregivers dedicated to senior home care."
      />
      
      <div className="bg-slate-50 min-h-screen font-sans">
        
        {/* HERO HEADER */}
        <section className="relative bg-[linear-gradient(135deg,#0F172A_0%,#1E1B4B_50%,#3B0764_100%)] text-white py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1.5px, transparent 1.5px)', backgroundSize: '28px 28px' }}></div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 text-xs sm:text-sm font-semibold text-purple-200 mb-6">
              <Sparkles size={14} className="text-[#D946EF]" />
              Dedicated Healthcare Professionals
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tight">
              Our <span className="bg-clip-text text-transparent bg-[linear-gradient(90deg,#FF6B9B,#D946EF,#9D4EDD)]">Leadership</span> & Clinical Team
            </h1>

            <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto">
              Our leadership team brings decades of combined experience in healthcare, technology, and patient care to deliver trusted eldercare at home.
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          
          {/* CEO SPOTLIGHT */}
          <div className="bg-white rounded-3xl p-8 lg:p-12 border border-slate-200/90 shadow-md max-w-6xl mx-auto mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              
              <div className="lg:col-span-5">
                <div className="rounded-3xl overflow-hidden bg-slate-100 border border-slate-200 shadow-sm relative group">
                  <img 
                    src={leadershipTeam[0].image} 
                    alt="Navin Chauhan - Founder & CEO SilverCare India" 
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="p-6 bg-slate-900 text-white text-center">
                    <h3 className="text-2xl font-extrabold">{leadershipTeam[0].name}</h3>
                    <p className="text-[#D946EF] font-bold text-sm">{leadershipTeam[0].designation}, SilverCare India</p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-6">
                <div className="bg-[linear-gradient(135deg,#7B2CBF_0%,#9D4EDD_100%)] text-white p-6 sm:p-8 rounded-3xl relative shadow-lg">
                  <Quote size={36} className="text-purple-200/40 mb-3" />
                  <p className="text-base sm:text-lg font-medium leading-relaxed italic">
                    "{leadershipTeam[0].quote}"
                  </p>
                </div>

                <div className="space-y-4 text-slate-700 text-base leading-relaxed">
                  {leadershipTeam[0].bio.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* CO-FOUNDERS SPOTLIGHT */}
          <div className="max-w-6xl mx-auto mb-20">
            <h2 className="text-2xl font-extrabold text-[#17345E] mb-8 text-center">Co-Founding Leadership</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {leadershipTeam.slice(1).map((leader, i) => (
                <div key={i} className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center gap-6">
                  <div className="h-32 w-32 shrink-0 rounded-2xl overflow-hidden bg-purple-50 border-2 border-purple-100 shadow-inner">
                    <img src={leader.image} alt={leader.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-slate-900 mb-1">{leader.name}</h3>
                    <p className="text-[#7B2CBF] font-bold text-xs uppercase tracking-wider mb-3">{leader.designation}</p>
                    <p className="text-slate-600 text-sm leading-relaxed">{leader.bio[0]}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CLINICAL & CARE EXPERTS */}
          <div className="max-w-6xl mx-auto pt-8 border-t border-slate-200">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-[#7B2CBF] font-bold uppercase tracking-wider text-xs block mb-2">On-Ground Healthcare Team</span>
              <h2 className="text-3xl font-extrabold text-[#17345E] mb-3">Clinical & Care Experts</h2>
              <p className="text-slate-600 text-base">
                Meet our compassionate physicians, nursing trainers, and healthcare supervisors dedicated to delivering home care excellence.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex justify-center gap-2 mb-12 overflow-x-auto no-scrollbar py-1">
              {["All", "Doctors", "Nursing & Trainers"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-200 ${
                    activeFilter === filter 
                      ? 'bg-[#7B2CBF] text-white shadow-md' 
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {loading ? (
              <div className="py-12 text-center text-slate-500 font-medium">Loading clinical profiles...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredStaff.map((pro) => (
                  <Card key={pro.id} className="overflow-hidden border-slate-200 hover:border-[#9D4EDD] hover:shadow-xl transition-all bg-white rounded-3xl group">
                    <CardContent className="p-8 text-center">
                      {pro.imageUrl ? (
                        <div className="mx-auto h-28 w-28 rounded-full overflow-hidden bg-purple-50 border-4 border-white mb-6 shadow-md group-hover:scale-105 transition-transform">
                          <img src={pro.imageUrl} alt={pro.name} className="w-full h-full object-cover" loading="lazy" />
                        </div>
                      ) : (
                        <div className="mx-auto h-24 w-24 bg-purple-100 border-4 border-white rounded-full flex items-center justify-center text-[#7B2CBF] mb-6 shadow-md group-hover:scale-110 transition-transform">
                          {pro.designation.includes('Physician') || pro.designation.includes('Doctor') ? (
                            <Stethoscope size={40} />
                          ) : pro.designation.includes('Trainer') ? (
                            <GraduationCap size={40} />
                          ) : (
                            <UserCheck size={40} />
                          )}
                        </div>
                      )}
                      
                      <h3 className="text-xl font-extrabold text-slate-900 mb-1">{pro.name}</h3>
                      <p className="text-[#7B2CBF] font-bold text-xs uppercase tracking-wider mb-4">{pro.designation}</p>
                      
                      <div className="space-y-3 text-left bg-slate-50 p-4 rounded-2xl border border-slate-100">
                        {pro.qualification && (
                          <div className="flex items-start gap-2.5 text-slate-700">
                            <GraduationCap size={18} className="text-[#7B2CBF] shrink-0 mt-0.5" />
                            <span className="text-xs font-medium leading-snug">{pro.qualification}</span>
                          </div>
                        )}
                        {pro.experience && (
                          <div className="flex items-start gap-2.5 text-slate-700">
                            <Award size={18} className="text-[#7B2CBF] shrink-0 mt-0.5" />
                            <span className="text-xs font-bold leading-snug">{pro.experience} Clinical Practice</span>
                          </div>
                        )}
                      </div>

                      <div className="mt-6 pt-4 border-t border-slate-100">
                        <Link to={`/book?service=${pro.designation.toLowerCase().includes('physician') ? 'doctor-visit-at-home' : 'nursing-attendant-care'}`}>
                          <Button variant="outline" className="w-full border-purple-200 text-[#7B2CBF] hover:bg-purple-50 font-bold text-xs h-10 rounded-xl">
                            Request Consultation
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
          
          {/* JOIN US BANNER */}
          <div className="mt-20 bg-[linear-gradient(90deg,#7B2CBF,#9D4EDD)] rounded-3xl p-10 text-center text-white relative overflow-hidden max-w-5xl mx-auto shadow-xl">
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl font-extrabold mb-4">Are You a Healthcare Professional?</h2>
              <p className="text-purple-100 mb-8 text-base">Join our network of elite caregivers, nurses, supervisors, and doctors across North India.</p>
              <Link to="/contact">
                <Button size="lg" className="bg-white text-[#7B2CBF] hover:bg-slate-100 font-extrabold px-8 h-14 rounded-xl shadow-lg">Apply to Join SilverCare</Button>
              </Link>
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
}

