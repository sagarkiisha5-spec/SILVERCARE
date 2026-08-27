import React, { useState, useEffect, useRef } from 'react';
import { Search, ArrowRight, Sparkles, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useAppContent, Service, fallbackServices } from '@/src/hooks/useAppContent';

const POPULAR_SEARCHES = [
  { term: "24/7 Nursing & Attendant Care", slug: "nursing-attendant-care", category: "Medical Care" },
  { term: "Doctor Visit at Home", slug: "doctor-visit-at-home", category: "Physician" },
  { term: "Physiotherapy at Home", slug: "physiotherapy-at-home", category: "Rehab" },
  { term: "Pathology & Lab Diagnostics", slug: "pathology-diagnostics", category: "Lab" },
  { term: "Medical Equipment Rental", slug: "medical-equipment", category: "Supplies" },
  { term: "Senior Companionship & Care", slug: "daycare-companionship", category: "Daily Care" }
];

export default function ServiceSearch({ 
  className = "", 
  placeholder = "Search for a healthcare service (e.g. Home Nursing, Physiotherapy...)",
  size = "default" 
}: { 
  className?: string;
  placeholder?: string;
  size?: "default" | "large";
}) {
  const { services } = useAppContent();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<Service[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const navigate = useNavigate();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const searchableServices = services.length > 0 ? services : fallbackServices;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wrapperRef]);

  useEffect(() => {
    if (query.trim().length === 0) {
      setSuggestions([]);
      setSelectedIndex(-1);
      return;
    }

    const lowerQuery = query.toLowerCase();
    
    const results = searchableServices.filter(srv => {
      if (srv.title.toLowerCase().includes(lowerQuery)) return true;
      if (srv.shortDescription.toLowerCase().includes(lowerQuery)) return true;
      if (srv.category?.toLowerCase().includes(lowerQuery)) return true;
      if (srv.aliases?.some(alias => alias.toLowerCase().includes(lowerQuery))) return true;
      return false;
    });

    setSuggestions(results.slice(0, 5));
    setSelectedIndex(-1);
  }, [query, services]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedIndex >= 0 && suggestions[selectedIndex]) {
      handleSelect(suggestions[selectedIndex].slug);
    } else if (query.trim()) {
      setIsOpen(false);
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const handleSelect = (slug: string) => {
    setIsOpen(false);
    setQuery('');
    navigate(`/services/${slug}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown') setIsOpen(true);
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div ref={wrapperRef} className={`relative w-full ${className}`}>
      <form onSubmit={handleSearch} className="relative">
        <div className={`relative flex items-center w-full bg-white rounded-full border border-slate-300 shadow-sm overflow-hidden focus-within:ring-2 focus-within:ring-[#E91E63] focus-within:border-[#E91E63] transition-all ${size === 'large' ? 'h-14 sm:h-16' : 'h-12'}`}>
          <div className="pl-4 sm:pl-6 text-slate-400 flex items-center justify-center">
            <Search className={size === 'large' ? 'w-6 h-6 text-[#E91E63]' : 'w-5 h-5 text-[#E91E63]'} />
          </div>

          <input
            ref={inputRef}
            type="text"
            className={`w-full bg-transparent border-none focus:outline-none focus:ring-0 px-4 text-slate-900 font-medium ${size === 'large' ? 'text-lg' : 'text-sm sm:text-base'}`}
            placeholder={placeholder}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              if (!isOpen) setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
            aria-label="Search healthcare services"
          />

          <button 
            type="submit"
            className={`h-full bg-[linear-gradient(90deg,#FF4F81,#E91E63)] hover:opacity-95 text-white font-extrabold transition-all px-6 sm:px-8 flex items-center justify-center shrink-0 ${size === 'large' ? 'text-base sm:text-lg' : 'text-sm'}`}
          >
            <span>Search</span>
          </button>
        </div>
      </form>

      {/* SUGGESTIVE DROPDOWN */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -8 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -8 }} 
            transition={{ duration: 0.18 }} 
            className="absolute top-[calc(100%+8px)] left-0 w-full bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50 text-left"
          >
            {/* IF USER HAS NOT TYPED ANYTHING: SHOW POPULAR SUGGESTIONS */}
            {query.trim().length === 0 ? (
              <div className="p-5">
                <div className="flex items-center gap-2 text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-3">
                  <TrendingUp size={14} className="text-[#E91E63]" /> Popular Eldercare Searches
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                  {POPULAR_SEARCHES.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelect(item.slug)}
                      className="p-2.5 rounded-xl border border-slate-100 hover:border-pink-200 hover:bg-pink-50/70 text-left transition-all group flex items-center justify-between"
                    >
                      <div>
                        <span className="font-bold text-xs sm:text-sm text-slate-800 group-hover:text-[#E91E63] block line-clamp-1">{item.term}</span>
                        <span className="text-[10px] text-slate-400 font-semibold uppercase">{item.category}</span>
                      </div>
                      <ArrowRight size={14} className="text-slate-300 group-hover:text-[#E91E63] transition-transform group-hover:translate-x-1 shrink-0" />
                    </button>
                  ))}
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">Need immediate assistance?</span>
                  <button 
                    type="button" 
                    onClick={() => { setIsOpen(false); navigate('/book'); }}
                    className="text-[#E91E63] font-bold hover:underline flex items-center gap-1"
                  >
                    <Sparkles size={12} /> Book Appointment
                  </button>
                </div>
              </div>
            ) : (
              /* IF USER IS TYPING: LIVE FILTERED SUGGESTIONS */
              suggestions.length > 0 ? (
                <div>
                  <div className="px-5 py-2.5 bg-slate-50 border-b border-slate-100 text-xs font-extrabold text-slate-400 uppercase tracking-wider flex justify-between items-center">
                    <span>Suggested Services ({suggestions.length})</span>
                    <span className="text-[10px] text-slate-400 font-normal">Use ↑ ↓ to navigate</span>
                  </div>

                  <ul>
                    {suggestions.map((srv, index) => (
                      <li key={srv.id} className="border-b border-slate-100 last:border-0">
                        <button
                          type="button"
                          className={`w-full text-left px-5 py-3.5 transition-colors group flex items-center justify-between ${
                            index === selectedIndex ? 'bg-pink-50' : 'hover:bg-slate-50'
                          }`}
                          onClick={() => handleSelect(srv.slug)}
                        >
                          <div>
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="font-extrabold text-slate-900 group-hover:text-[#E91E63] text-sm sm:text-base">{srv.title}</span>
                              {srv.category && (
                                <span className="text-[10px] font-bold uppercase tracking-wider bg-pink-100 text-[#E91E63] px-2 py-0.5 rounded-full">{srv.category}</span>
                              )}
                            </div>
                            <p className="text-xs text-slate-500 line-clamp-1">{srv.shortDescription}</p>
                          </div>
                          <ArrowRight className="text-slate-300 group-hover:text-[#E91E63] transition-transform group-hover:translate-x-1 shrink-0 ml-3" size={16} />
                        </button>
                      </li>
                    ))}
                  </ul>

                  <div className="p-3 bg-slate-50 text-center border-t border-slate-100">
                    <button 
                      type="submit" 
                      onClick={handleSearch}
                      className="text-xs font-bold text-[#E91E63] hover:underline"
                    >
                      See all search results for "{query}" →
                    </button>
                  </div>
                </div>
              ) : (
                /* NO MATCH FOUND FALLBACK */
                <div className="p-6 text-center">
                  <div className="h-10 w-10 bg-pink-100 text-[#E91E63] rounded-full flex items-center justify-center mx-auto mb-2 font-bold">?</div>
                  <p className="text-slate-900 font-bold text-sm mb-1">No direct matching service found for "{query}"</p>
                  <p className="text-slate-500 text-xs mb-4">Our care team handles customized eldercare requests 24/7.</p>
                  
                  <div className="flex justify-center gap-4 text-xs font-bold">
                    <button 
                      type="button" 
                      onClick={() => { setIsOpen(false); navigate('/services'); }}
                      className="text-[#E91E63] hover:underline"
                    >
                      Browse All Services
                    </button>
                    <span className="text-slate-300">•</span>
                    <button 
                      type="button" 
                      onClick={() => { setIsOpen(false); navigate('/contact'); }}
                      className="text-[#E91E63] hover:underline"
                    >
                      Talk to Care Manager
                    </button>
                  </div>
                </div>
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}