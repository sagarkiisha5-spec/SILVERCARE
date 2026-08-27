import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  CheckCircle2, 
  Stethoscope, 
  Heart, 
  UserCheck, 
  Activity, 
  Search, 
  ShieldCheck, 
  PhoneCall, 
  Clock, 
  Award,
  ChevronDown,
  Sparkles,
  FileText,
  Calendar,
  Layers
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { motion, AnimatePresence } from "motion/react";
import SEO from "@/src/components/seo/SEO";
import { useAppContent, fallbackServices, Service } from "@/src/hooks/useAppContent";

export default function Services() {
  const { services, loading } = useAppContent();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const displayServices = services.length > 0 ? services : fallbackServices;

  const categories = [
    "All",
    "Medical & Daily Care",
    "Clinical Consultations",
    "Rehabilitation & Mobility",
    "Diagnostics & Lab",
    "Virtual Care",
    "Equipment & Supplies",
    "Eldercare & Engagement"
  ];

  const getIcon = (slug?: string, iconName?: string) => {
    if (slug?.includes('nursing') || slug?.includes('attendant')) return Heart;
    if (slug?.includes('doctor')) return Stethoscope;
    if (slug?.includes('physio')) return Activity;
    if (slug?.includes('pathology') || slug?.includes('diag')) return UserCheck;
    if (slug?.includes('tele')) return PhoneCall;
    if (slug?.includes('equipment')) return ShieldCheck;
    return Stethoscope;
  };

  const getBadgeText = (slug: string) => {
    switch (slug) {
      case 'nursing-attendant-care': return '24/7 Home Care';
      case 'doctor-visit-at-home': return 'Doorstep Consultation';
      case 'physiotherapy-at-home': return 'Certified Therapists';
      case 'pathology-diagnostics': return 'NABL Partnered Labs';
      case 'telemedicine': return 'Instant Online Consult';
      case 'medical-equipment': return 'Home Delivery & Setup';
      case 'daycare-companionship': return 'Senior Engagement';
      default: return 'Professional Support';
    }
  };

  const getFeatureHighlights = (slug: string): string[] => {
    switch (slug) {
      case 'nursing-attendant-care':
        return [
          "24/7 & 12-hour shift registered nurse & attendant options",
          "Medication administration, IV therapy & vital signs monitoring",
          "Bedridden patient care, hygiene & mobility support",
          "Post-operative surgical wound dressing & recovery tracking"
        ];
      case 'doctor-visit-at-home':
        return [
          "Qualified MBBS general physicians & eldercare specialists",
          "Comprehensive health assessment & chronic condition reviews",
          "On-spot prescription guidance & lab test ordering",
          "Avoid hospital travel & waiting room discomfort"
        ];
      case 'physiotherapy-at-home':
        return [
          "Personalized stroke rehabilitation & joint pain therapy",
          "Post-knee & hip replacement recovery protocols",
          "Mobility enhancement, balance training & fall prevention",
          "Certified physical therapists with specialized equipment"
        ];
      case 'pathology-diagnostics':
        return [
          "Hygienic home sample collection by trained phlebotomists",
          "Routine blood tests, HbA1c, lipid profiles & kidney panels",
          "Fast digital report delivery via Email & WhatsApp",
          "NABL & CAP accredited diagnostic lab partnerships"
        ];
      case 'telemedicine':
        return [
          "Instant virtual doctor video consultations from home",
          "Routine follow-ups & prescription renewal guidance",
          "Digital health records & electronic medical advice",
          "Family members can join consultation remotely"
        ];
      case 'medical-equipment':
        return [
          "Hospital beds, ICU setups & multipara monitors for rent",
          "Oxygen concentrators, BiPAP & CPAP machines",
          "Wheelchairs, suction machines & pulse oximeters",
          "Free doorstep delivery, installation & technical demo"
        ];
      case 'daycare-companionship':
        return [
          "Warm companion visits to prevent senior isolation",
          "Cognitive exercises, memory games & recreational activities",
          "Accompaniment for walks, appointments & daily errands",
          "Regular emotional well-being updates to family"
        ];
      default:
        return [
          "Verified & background-checked healthcare professionals",
          "Doctor-supervised personalized care plans",
          "Transparent pricing with no hidden charges",
          "Dedicated 24/7 care coordination manager"
        ];
    }
  };

  const filteredServices = displayServices.filter((service) => {
    const matchesCategory = selectedCategory === "All" || service.category === selectedCategory;
    const matchesSearch = searchQuery === "" || 
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (service.aliases && service.aliases.some(a => a.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesCategory && matchesSearch;
  });

  const faqs = [
    {
      q: "How quickly can a caregiver or nurse be deployed to my home?",
      a: "In most metro locations across North India (Gurgaon, Delhi NCR, Chandigarh, etc.), we can assign and deploy a verified nurse or attendant within 24 to 48 hours following an initial assessment."
    },
    {
      q: "Are your caregivers and medical staff background verified?",
      a: "Yes, 100% of our clinical staff, registered nurses, and attendants undergo rigorous background verification, criminal record checks, reference checks, and comprehensive SilverCare training."
    },
    {
      q: "Can I customize the frequency and duration of doctor or nursing visits?",
      a: "Absolutely. We tailor care plans to your exact requirements, whether you need 24-hour live-in care, 12-hour day/night shifts, weekly doctor consultations, or periodic physiotherapy sessions."
    },
    {
      q: "How does payment and pricing work?",
      a: "SilverCare offers transparent, flat pricing with flexible daily, weekly, or monthly billing cycles. There are no hidden fees, and you receive clear digital invoices for all services rendered."
    }
  ];

  return (
    <>
      <SEO 
        title="Our Eldercare Services | SilverCare India" 
        description="Comprehensive eldercare services designed for the medical, physical, and emotional needs of seniors all delivered at home. Nursing, Doctor Visits, Physio, Pathology & Equipment Rental."
      />

      <div className="bg-slate-50 min-h-screen font-sans">
        
        {/* HERO SECTION */}
        <section className="relative bg-[linear-gradient(135deg,#0F172A_0%,#1E1B4B_50%,#3B0764_100%)] text-white pt-12 pb-20 md:pt-16 md:pb-28 overflow-hidden">
          {/* Background Decorative Pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1.5px, transparent 1.5px)', backgroundSize: '28px 28px' }}></div>
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#E91E63]/30 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#FF4F81]/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Breadcrumbs */}
            <nav className="flex items-center text-sm font-medium text-slate-300 mb-8" aria-label="Breadcrumb">
              <Link to="/" className="hover:text-[#FF4F81] transition-colors flex items-center gap-1">
                Home
              </Link>
              <span className="mx-2 text-slate-500">/</span>
              <span className="text-[#FF4F81] font-bold">Services</span>
            </nav>

            <div className="max-w-3xl">
              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 text-xs sm:text-sm font-semibold text-pink-200 mb-6 shadow-inner">
                <Sparkles size={16} className="text-[#FF4F81]" />
                Dedicated Home Healthcare Across India
              </motion.div>
              
              <motion.h1 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
                Our <span className="bg-clip-text text-transparent bg-[linear-gradient(90deg,#FF6B9B,#FF4F81,#E91E63)]">Eldercare</span> Services
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="text-lg md:text-xl text-slate-300 leading-relaxed mb-10">
                Comprehensive eldercare services designed for the medical, physical, and emotional needs of seniors all delivered at home.
              </motion.p>

              {/* Instant Search Bar */}
              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="relative max-w-2xl bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/20 shadow-2xl flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search services (e.g., Nursing, Doctor Visit, Lab Test)..."
                    className="w-full h-12 pl-12 pr-4 rounded-xl bg-white text-slate-900 placeholder:text-slate-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#E91E63]"
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600 bg-slate-100 rounded-md px-2 py-1">
                      Clear
                    </button>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CATEGORY FILTER TABS */}
        <section className="sticky top-20 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm py-4">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-2 flex items-center gap-1">
                <Layers size={14} /> Filter:
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 shrink-0 ${
                    selectedCategory === cat 
                      ? 'bg-[#E91E63] text-white shadow-md shadow-[#E91E63]/20 scale-105' 
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                  }`}
                >
                  {cat === "All" ? "All Eldercare Services" : cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* MAIN SERVICES GRID */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            
            {loading ? (
              <div className="py-20 text-center text-slate-500 font-medium">Loading comprehensive eldercare services...</div>
            ) : filteredServices.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center max-w-xl mx-auto border border-slate-200 shadow-sm">
                <Search size={48} className="mx-auto text-slate-300 mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-2">No matching services found</h3>
                <p className="text-slate-500 mb-6">Try adjusting your search query or category filter to view our full service catalog.</p>
                <Button onClick={() => { setSelectedCategory("All"); setSearchQuery(""); }} className="bg-[#E91E63] text-white font-bold">
                  Reset Filters
                </Button>
              </div>
            ) : (
              <div className="space-y-12">
                {filteredServices.map((service, index) => {
                  const IconComponent = getIcon(service.slug, service.icon);
                  const badge = getBadgeText(service.slug);
                  const features = getFeatureHighlights(service.slug);
                  const isEven = index % 2 === 0;

                  return (
                    <motion.div 
                      key={service.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                    >
                      <Card className="overflow-hidden border-slate-200/90 shadow-md hover:shadow-2xl transition-all duration-300 bg-white rounded-3xl group border hover:border-[#E91E63]">
                        <div className="flex flex-col lg:flex-row">
                          
                          {/* Vibrant Accent Side Panel */}
                          <div className={`p-8 lg:p-10 lg:w-5/12 flex flex-col justify-between relative overflow-hidden text-white ${
                            isEven 
                              ? 'bg-[linear-gradient(135deg,#E91E63_0%,#FF4F81_100%)]' 
                              : 'bg-[linear-gradient(135deg,#880E4F_0%,#AD1457_100%)]'
                          }`}>
                            {/* Ambient Glow circles */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
                            
                            <div>
                              <div className="flex items-center justify-between mb-8">
                                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-xs font-extrabold uppercase tracking-wider text-white border border-white/30 shadow-sm">
                                  <Sparkles size={12} /> {badge}
                                </span>
                                <span className="text-white/60 font-mono text-sm font-bold">
                                  0{index + 1}
                                </span>
                              </div>

                              <div className="h-20 w-20 bg-white/15 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 border border-white/25 group-hover:scale-110 transition-transform duration-300 shadow-inner">
                                <IconComponent size={40} className="text-white" />
                              </div>

                              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 tracking-tight">
                                {service.title}
                              </h3>

                              <p className="text-purple-100/90 text-sm sm:text-base leading-relaxed mb-6 font-medium">
                                {service.shortDescription}
                              </p>
                            </div>

                            <div className="pt-6 border-t border-white/15 flex items-center gap-2 text-xs font-semibold text-purple-200">
                              <ShieldCheck size={16} className="text-emerald-300" />
                              <span>Doctor-Led Care Plan & Continuous Monitoring</span>
                            </div>
                          </div>

                          {/* Detail Content Panel */}
                          <CardContent className="p-8 lg:p-10 lg:w-7/12 flex flex-col justify-between bg-white">
                            <div>
                              <h4 className="text-lg font-extrabold text-slate-900 mb-3 flex items-center gap-2">
                                Overview & Clinical Scope
                              </h4>
                              
                              <p className="text-slate-600 leading-relaxed text-base mb-8 whitespace-pre-line">
                                {service.description}
                              </p>

                              {/* Key Highlights checklist */}
                              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 mb-8">
                                 <h5 className="text-xs font-extrabold text-[#E91E63] uppercase tracking-wider mb-4 flex items-center gap-1.5">
                                  <CheckCircle2 size={16} /> Key Features & Coverage
                                </h5>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                  {features.map((feat, fIdx) => (
                                    <div key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-medium leading-snug">
                                      <CheckCircle2 size={16} className="text-[#00B894] shrink-0 mt-0.5" />
                                      <span>{feat}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* Action CTAs */}
                            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-slate-100">
                              <Link to={`/book?service=${service.slug}`} className="flex-1 sm:flex-none">
                                <Button size="lg" className="w-full bg-[linear-gradient(90deg,#FF4F81,#E91E63)] hover:opacity-95 text-white font-bold h-12 px-8 rounded-xl shadow-md shadow-[#E91E63]/20 border-0 text-sm transition-all hover:scale-105">
                                  Book This Service
                                </Button>
                              </Link>
                              
                              <Link to={`/services/${service.slug}`} className="flex-1 sm:flex-none">
                                <Button size="lg" variant="outline" className="w-full bg-white border-2 border-slate-200 text-slate-800 hover:border-[#E91E63] hover:text-[#E91E63] font-bold h-12 px-6 rounded-xl text-sm transition-all flex items-center justify-center gap-2 group/btn">
                                  <span>Learn More</span>
                                  <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                                </Button>
                              </Link>

                              <a href="tel:+918001480075" className="hidden sm:flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-[#E91E63] ml-auto transition-colors">
                                <PhoneCall size={16} className="text-[#FF4F81]" /> Call Coordinator
                              </a>
                            </div>

                          </CardContent>
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* 4 PILLARS OF QUALITY ASSURANCE */}
        <section className="py-16 bg-white border-y border-slate-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-[#E91E63] font-bold uppercase tracking-wider text-xs block mb-2">Quality & Safety First</span>
              <h2 className="text-3xl font-extrabold text-[#17345E]">Why Families Trust SilverCare</h2>
              <p className="mt-3 text-slate-600 text-base">
                We combine clinical expertise with heartfelt compassion to deliver uncompromised eldercare at home.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200/80 shadow-sm text-center hover:border-[#E91E63] transition-colors group">
                <div className="h-14 w-14 bg-[#FCE4EC] text-[#E91E63] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <ShieldCheck size={30} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">100% Verified Staff</h3>
                <p className="text-slate-600 text-sm leading-relaxed">Police background-verified, certified, and trained nursing caregivers.</p>
              </div>

              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200/80 shadow-sm text-center hover:border-[#E91E63] transition-colors group">
                <div className="h-14 w-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Stethoscope size={30} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Doctor-Led Care</h3>
                <p className="text-slate-600 text-sm leading-relaxed">Senior physicians design and monitor customized home treatment plans.</p>
              </div>

              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200/80 shadow-sm text-center hover:border-[#E91E63] transition-colors group">
                <div className="h-14 w-14 bg-pink-50 text-[#E91E63] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Clock size={30} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">24/7 Helpline</h3>
                <p className="text-slate-600 text-sm leading-relaxed">Dedicated single-point care coordinators available round-the-clock.</p>
              </div>

              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200/80 shadow-sm text-center hover:border-[#E91E63] transition-colors group">
                <div className="h-14 w-14 bg-pink-50 text-[#E91E63] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Award size={30} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Transparent Pricing</h3>
                <p className="text-slate-600 text-sm leading-relaxed">Flat transparent charges with daily, weekly, or monthly flexible billing.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FREQUENTLY ASKED QUESTIONS */}
        <section className="py-16 md:py-24 bg-slate-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="text-center mb-16">
              <span className="text-[#E91E63] font-bold uppercase tracking-wider text-xs block mb-2">Got Questions?</span>
              <h2 className="text-3xl font-extrabold text-[#17345E]">Frequently Asked Questions</h2>
              <p className="mt-3 text-slate-600 text-base">Everything you need to know about our home eldercare services.</p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div 
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-base sm:text-lg hover:text-[#E91E63] transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown size={20} className={`text-slate-400 shrink-0 transition-transform duration-300 ${openFaq === idx ? 'rotate-180 text-[#E91E63]' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {openFaq === idx && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-6 pb-6 pt-1 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-100"
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA BANNER */}
        <section className="py-16 bg-[linear-gradient(90deg,#E91E63_0%,#FF4F81_100%)] text-white text-center relative overflow-hidden">
          <div className="container mx-auto px-4 max-w-4xl relative z-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 tracking-tight">Need Urgent Home Healthcare Support?</h2>
            <p className="text-pink-100 mb-8 text-base sm:text-lg max-w-2xl mx-auto">
              Our clinical coordinators are standing by 24/7 to guide you and match the right healthcare professional for your family.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/book" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto bg-white text-[#E91E63] hover:bg-slate-100 font-extrabold h-14 px-8 text-base rounded-xl shadow-xl">
                  Book a Home Visit Now
                </Button>
              </Link>
              <a href="tel:+918001480075" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent border-2 border-white text-white hover:bg-white/10 font-bold h-14 px-8 text-base rounded-xl flex items-center justify-center gap-2">
                  <PhoneCall size={20} /> Call +91 800-14-800-75
                </Button>
              </a>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}

