import { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/src/lib/firebase";
import { ArrowRight, CheckCircle2, ShieldCheck, HeartPulse, PhoneCall, Calendar, Clock, Sparkles, UserCheck, Stethoscope } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import SEO from "@/src/components/seo/SEO";
import { useAppContent, Service, fallbackServices } from "@/src/hooks/useAppContent";

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const { services, loading: contentLoading } = useAppContent();

  useEffect(() => {
    async function fetchService() {
      if (!slug) return;
      try {
        const q = query(collection(db, 'services'), where('slug', '==', slug), where('isActive', '==', true));
        const snap = await getDocs(q);
        if (snap.empty) {
          const fallback = fallbackServices.find(s => s.slug === slug || (s.aliases && s.aliases.includes(slug)));
          if (fallback) {
             setService(fallback);
          } else {
             setNotFound(true);
          }
        } else {
          setService({ id: snap.docs[0].id, ...snap.docs[0].data() } as Service);
        }
      } catch (error) {
        console.error("Error fetching service detail:", error);
        const fallback = fallbackServices.find(s => s.slug === slug || (s.aliases && s.aliases.includes(slug)));
        if (fallback) {
           setService(fallback);
        } else {
           setNotFound(true);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchService();
  }, [slug]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-slate-500 font-medium">Loading service details...</div>;
  }

  if (notFound || !service) {
    return <Navigate to="/services" replace />;
  }

  const allServices = services.length > 0 ? services : fallbackServices;
  const relatedServices = allServices.filter(s => s.id !== service.id).slice(0, 3);

  const getWhoIsThisFor = (slug: string): string[] => {
    switch (slug) {
      case 'mother-baby-care':
        return [
          "New mothers seeking expert post-natal recovery, lactation support, and maternal physical care after delivery (C-section or natural delivery).",
          "Newborn infants requiring delicate daily hygiene, gentle oil massage, umbilical cord care, and round-the-clock monitoring.",
          "Working parents & families needing experienced, background-verified Jhaia / baby care attendants for 12-hour or 24-hour shifts.",
          "First-time mothers looking for compassionate guidance on baby feeding routines, sleep training, and overall post-partum well-being."
        ];
      case 'nursing-attendant-care':
        return [
          "Patients recovering from major surgeries, joint replacements, stroke rehabilitation, or hospital discharge.",
          "Bedridden or semi-dependent seniors requiring vital signs monitoring, medication administration, and daily hygiene support.",
          "Families seeking dependable 24/7 or 12-hour trained nursing care at home under clinical doctor supervision."
        ];
      case 'doctor-visit-at-home':
        return [
          "Elderly or bedridden individuals who face difficulty traveling to hospitals or diagnostic clinics.",
          "Patients needing routine medical checkups, chronic disease management, and prescription adjustments.",
          "Families seeking timely home consultations by experienced MBBS physicians without long waiting room delays."
        ];
      case 'physiotherapy-at-home':
        return [
          "Patients recovering from stroke, paralysis, joint replacements (knee/hip), or spine surgeries.",
          "Seniors suffering from arthritis, chronic back pain, balance issues, or mobility impairment.",
          "Individuals needing personalized rehabilitation exercises and movement therapy in the comfort of home."
        ];
      case 'pathology-diagnostics':
        return [
          "Seniors and patients needing regular blood tests, diabetic screening (HbA1c), or organ function panels.",
          "Individuals looking for hassle-free, hygienic sample collection at home with digital reports on WhatsApp.",
          "Busy families seeking certified lab testing without visiting diagnostic labs."
        ];
      case 'telemedicine':
        return [
          "Patients requiring fast online medical advice, second opinions, or quick prescription renewals.",
          "Families and NRIs wanting to join doctor consultations remotely alongside elderly parents.",
          "Individuals seeking routine follow-ups for non-emergency healthcare queries."
        ];
      case 'medical-equipment':
        return [
          "Families needing ICU setups at home, hospital beds, oxygen concentrators, or BiPAP/CPAP units.",
          "Patients requiring temporary mobility aids like wheelchairs, walkers, or patient lifts.",
          "Home care setups requiring patient monitoring devices and suction machines."
        ];
      case 'icu-setup':
        return [
          "Critically ill patients requiring intensive clinical monitoring and life-support equipment at home.",
          "Patients transitioning from hospital ICU to home-based critical care with mechanical ventilation or tracheostomy.",
          "Post-surgical or palliative care patients needing 24/7 dedicated ICU-trained critical care nurses.",
          "Families seeking hospital-standard intensive care at home with doctor supervision at significant cost savings."
        ];
      case 'daycare-companionship':
        return [
          "Senior citizens experiencing loneliness, social isolation, or mild cognitive decline.",
          "Elderly individuals looking for engaging conversation, recreational activities, and accompaniment on walks.",
          "Families wanting trusted companions for elderly parents while family members are at work."
        ];
      default:
        return [
          "Families seeking dependable, professional home healthcare and specialized personal assistance.",
          "Patients needing structured care plans customized to their medical and recovery requirements.",
          "Individuals looking for verified, compassionate care professionals supervised by clinical experts."
        ];
    }
  };

  const getSidebarDescription = (slug: string): string => {
    if (slug === 'mother-baby-care') {
      return "Request a trained baby caregiver or maternity nurse deployment to your home in Gurgaon & North India.";
    }
    return "Request a doctor visit or nurse deployment to your home in Gurgaon & North India.";
  };

  return (
    <>
      <SEO 
        title={`${service.title} | SilverCare India`} 
        description={service.shortDescription}
      />
      
      <div className="bg-slate-50 min-h-screen font-sans">
        
        {/* HERO SECTION */}
        <section className="bg-[linear-gradient(135deg,#0F172A_0%,#1E1B4B_50%,#3B0764_100%)] text-white py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1.5px, transparent 1.5px)', backgroundSize: '28px 28px' }}></div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl">
              <nav className="flex items-center text-sm font-medium text-slate-300 mb-8" aria-label="Breadcrumb">
                <Link to="/" className="hover:text-[#D946EF] transition-colors">
                  Home
                </Link>
                <span className="mx-2 text-slate-500">/</span>
                <Link to="/services" className="hover:text-[#D946EF] transition-colors">
                  Services
                </Link>
                <span className="mx-2 text-slate-500">/</span>
                <span className="text-[#D946EF] font-bold">{service.title}</span>
              </nav>

              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-4 py-1.5 text-xs font-bold text-purple-200 mb-6">
                <Sparkles size={14} className="text-[#D946EF]" />
                {service.category || "SilverCare Home Healthcare"}
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tight">
                {service.title}
              </h1>

              <p className="text-lg md:text-xl text-slate-300 leading-relaxed mb-10 max-w-3xl">
                {service.shortDescription}
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Link to={`/book?service=${service.slug}`}>
                  <Button size="lg" className="bg-[linear-gradient(90deg,#7B2CBF,#9D4EDD)] hover:opacity-95 text-white font-extrabold h-14 px-8 text-base rounded-xl shadow-xl border-0">
                    Book Home Visit Now
                  </Button>
                </Link>
              </div>

            </div>
          </div>
        </section>

        {/* CONTENT & SIDEBAR */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              
              {/* MAIN CONTENT AREA */}
              <div className="lg:col-span-8 space-y-12">
                
                {/* Description Card */}
                <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-sm">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17345E] mb-6">
                    About This Service
                  </h2>
                  <div className="text-slate-700 leading-relaxed whitespace-pre-line text-base sm:text-lg mb-8">
                    {service.description}
                  </div>

                  {/* Standard Guarantees */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 border-t border-slate-100">
                    <div className="flex items-start gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100">
                      <div className="h-10 w-10 bg-purple-100 text-[#7B2CBF] rounded-xl flex items-center justify-center shrink-0">
                        <ShieldCheck size={22} />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm mb-1">Police Verified Staff</h4>
                        <p className="text-slate-600 text-xs leading-relaxed">Rigorous background checks and clinical training for complete family peace of mind.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100">
                      <div className="h-10 w-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center shrink-0">
                        <Stethoscope size={22} />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm mb-1">Doctor Supervision</h4>
                        <p className="text-slate-600 text-xs leading-relaxed">Regular clinical oversight & care plan adjustments by senior general physicians.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Who is this for? */}
                <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-sm">
                  <h3 className="text-2xl font-extrabold text-[#17345E] mb-6">
                    Who Is This Service Best For?
                  </h3>
                  <div className="space-y-4">
                    {getWhoIsThisFor(service.slug).map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-purple-50/50 border border-purple-100 text-slate-700 font-medium text-sm sm:text-base">
                        <CheckCircle2 size={20} className="text-[#7B2CBF] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* SIDEBAR WIDGET */}
              <div className="lg:col-span-4">
                <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-md sticky top-28">
                  <h3 className="text-xl font-extrabold text-[#17345E] mb-2">Book {service.title}</h3>
                  <p className="text-slate-500 text-xs mb-6">{getSidebarDescription(service.slug)}</p>

                  <div className="space-y-4 mb-8">
                    <div className="p-4 rounded-2xl bg-purple-50 border border-purple-100 flex items-center gap-3 text-xs font-bold text-[#7B2CBF]">
                      <Clock size={18} />
                      <span>Same-day or next-day deployment available</span>
                    </div>

                    <div className="space-y-3 pt-2 text-xs font-medium text-slate-600">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 size={16} className="text-emerald-500" /> Vetted & certified staff
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 size={16} className="text-emerald-500" /> Transparent flat daily/weekly rates
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 size={16} className="text-emerald-500" /> 24/7 dedicated care coordinator
                      </div>
                    </div>
                  </div>

                  <Link to={`/book?service=${service.slug}`} className="block">
                    <Button className="w-full bg-[linear-gradient(90deg,#7B2CBF,#9D4EDD)] hover:opacity-95 text-white font-extrabold h-14 text-base rounded-xl shadow-lg border-0">
                      Book Appointment Now
                    </Button>
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* RELATED SERVICES */}
        <section className="py-16 bg-white border-t border-slate-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <h3 className="text-2xl font-extrabold text-[#17345E] mb-8">Other Eldercare Services You May Need</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedServices.map(rel => (
                <Link key={rel.id} to={`/services/${rel.slug}`} className="group block">
                  <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 hover:border-[#7B2CBF] hover:shadow-md transition-all h-full flex flex-col justify-between">
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-lg mb-2 group-hover:text-[#7B2CBF] transition-colors">{rel.title}</h4>
                      <p className="text-slate-600 text-xs sm:text-sm line-clamp-2 mb-4 leading-relaxed">{rel.shortDescription}</p>
                    </div>
                    <div className="text-xs font-extrabold text-[#7B2CBF] flex items-center gap-1">
                      Learn More <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

      </div>
    </>
  );
}

