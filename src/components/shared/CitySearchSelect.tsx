import React, { useState, useRef, useEffect } from 'react';
import { MapPin, ChevronDown, Check } from 'lucide-react';

export const ALL_CITIES = [
  "Delhi NCR",
  "Faridabad",
  "Noida",
  "Gurgaon",
  "Ghaziabad",
  "Chandigarh",
  "Panchkula",
  "Mohali",
  "Udaipur",
  "Meerut",
  "Lucknow",
  "Ambala",
  "Patiala",
  "Jalandhar",
  "Amritsar",
  "Jaipur",
  "Nawanshahr",
  "Shimla",
  "Solan",
  "Bengaluru",
  "Other City"
];

interface CitySearchSelectProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  compact?: boolean;
}

export const CitySearchSelect: React.FC<CitySearchSelectProps> = ({
  value,
  onChange,
  error,
  compact = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState(value || "");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setQuery(value || "");
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredCities = ALL_CITIES.filter(c => 
    c.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (city: string) => {
    setQuery(city);
    onChange(city);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      <div className="relative flex items-center">
        <div className="pointer-events-none absolute left-3.5 text-slate-400">
          <MapPin size={compact ? 16 : 18} className="text-[#FF4F81]" />
        </div>
        <input
          type="text"
          value={query}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => {
            const val = e.target.value;
            setQuery(val);
            onChange(val);
            setIsOpen(true);
          }}
          placeholder="Search or select city..."
          className={`flex w-full rounded-xl border bg-white pl-10 pr-9 font-semibold text-slate-800 shadow-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FF4F81] focus:border-[#FF4F81] transition-all ${
            compact ? 'h-12 text-sm' : 'h-13 text-base'
          } ${error ? 'border-red-500' : 'border-slate-300'}`}
        />
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="absolute right-3 text-slate-400 hover:text-slate-600 focus:outline-none"
        >
          <ChevronDown size={compact ? 16 : 18} className={`transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#FF4F81]' : ''}`} />
        </button>
      </div>

      {/* Suggestive Search Dropdown Popup */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-1.5 z-[999] bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden max-h-[220px] overflow-y-auto p-1.5 space-y-0.5 animate-in fade-in slide-in-from-top-1 duration-150">
          {filteredCities.length > 0 ? (
            filteredCities.map((city) => {
              const isSelected = value === city;
              return (
                <button
                  key={city}
                  type="button"
                  onClick={() => handleSelect(city)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left font-bold text-xs sm:text-sm transition-colors ${
                    isSelected 
                      ? 'bg-purple-100/80 text-[#7B2CBF]' 
                      : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <span className="flex items-center gap-2 truncate pr-2">
                    <MapPin size={14} className={isSelected ? 'text-[#7B2CBF] shrink-0' : 'text-slate-400 shrink-0'} />
                    <span className="truncate">{city}</span>
                  </span>
                  {isSelected && <Check size={16} className="text-[#7B2CBF] shrink-0" />}
                </button>
              );
            })
          ) : (
            <div className="px-3 py-2.5 text-xs text-slate-500 font-medium text-center">
              City entered: <strong>"{query}"</strong>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
