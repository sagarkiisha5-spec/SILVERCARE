import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp, Check, Shield, Stethoscope, Baby, Handshake, HelpCircle } from 'lucide-react';

export interface CareCategory {
  id: string;
  title: string;
  badge?: string;
  icon: React.ReactNode;
  color: string;
  activeColor: string;
  items: { value: string; label: string; tag?: string }[];
}

const CARE_CATEGORIES: CareCategory[] = [
  {
    id: "freedom",
    title: "Freedom Care Plans",
    badge: "6 Plans",
    icon: <Shield size={18} className="text-[#7B2CBF]" />,
    color: "bg-purple-50 text-purple-700 border-purple-200",
    activeColor: "border-purple-300 bg-purple-50/50",
    items: [
      { value: "Healthy Age Package (Plan #1)", label: "Healthy Age Package (Plan #1)", tag: "Plan #1" },
      { value: "Chronic Care Package (Plan #2)", label: "Chronic Care Package (Plan #2)", tag: "Plan #2" },
      { value: "Heart Care Package (Plan #3)", label: "Heart Care Package (Plan #3)", tag: "Plan #3" },
      { value: "Dementia & Memory Care (Plan #4)", label: "Dementia & Memory Care (Plan #4)", tag: "Plan #4" },
      { value: "Respiratory Care Package (Plan #5)", label: "Respiratory Care Package (Plan #5)", tag: "Plan #5" },
      { value: "Mobility & Bone Health Package (Plan #6)", label: "Mobility & Bone Health Package (Plan #6)", tag: "Plan #6" },
    ]
  },
  {
    id: "services",
    title: "Home Healthcare & Services",
    badge: "7 Services",
    icon: <Stethoscope size={18} className="text-[#E91E63]" />,
    color: "bg-pink-50 text-pink-700 border-pink-200",
    activeColor: "border-pink-300 bg-pink-50/50",
    items: [
      { value: "Doctor Visit at Home", label: "Doctor Visit at Home" },
      { value: "Nursing & Attendant Care", label: "Nursing & Attendant Care" },
      { value: "Physiotherapy at Home", label: "Physiotherapy at Home" },
      { value: "Pathology & Diagnostics", label: "Pathology & Diagnostics" },
      { value: "Medical Equipment Rental & Delivery", label: "Medical Equipment Rental & Delivery" },
      { value: "ICU Set-up at Home", label: "ICU Set-up at Home" },
      { value: "Telemedicine / Online Doctor", label: "Telemedicine / Online Doctor" },
    ]
  },
  {
    id: "mother_baby",
    title: "Mother & Baby Care",
    badge: "Maternity",
    icon: <Baby size={18} className="text-rose-600" />,
    color: "bg-rose-50 text-rose-700 border-rose-200",
    activeColor: "border-rose-300 bg-rose-50/50",
    items: [
      { value: "Mother & Baby Care", label: "Mother & Baby Care" },
    ]
  },
  {
    id: "partner",
    title: "Franchise Partner Inquiry",
    badge: "Business",
    icon: <Handshake size={18} className="text-amber-600" />,
    color: "bg-amber-50 text-amber-700 border-amber-200",
    activeColor: "border-amber-300 bg-amber-50/50",
    items: [
      { value: "Franchise Partner Inquiry", label: "Franchise Partner Inquiry" },
    ]
  },
  {
    id: "other",
    title: "Other Eldercare Support",
    badge: "General",
    icon: <HelpCircle size={18} className="text-slate-600" />,
    color: "bg-slate-50 text-slate-700 border-slate-200",
    activeColor: "border-slate-300 bg-slate-50/50",
    items: [
      { value: "Other Eldercare Support", label: "Other Eldercare Support" },
    ]
  }
];

interface CareTypeSelectProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  compact?: boolean;
}

export const CareTypeSelect: React.FC<CareTypeSelectProps> = ({
  value,
  onChange,
  error,
  compact = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>("freedom");
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (val: string) => {
    onChange(val);
    setIsOpen(false);
  };

  const toggleCategory = (catId: string) => {
    setExpandedCategory(expandedCategory === catId ? null : catId);
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex w-full items-center justify-between rounded-xl border bg-white text-left font-semibold text-slate-800 shadow-xs transition-all focus:outline-none focus:ring-2 focus:ring-[#FF4F81] focus:border-[#FF4F81] ${
          compact ? 'h-12 px-3 text-sm' : 'h-13 px-4 text-base'
        } ${error ? 'border-red-500' : 'border-slate-300'}`}
      >
        <span className="truncate text-slate-900 pr-2">
          {value || "Select Care Type Required"}
        </span>
        <ChevronDown
          size={compact ? 16 : 18}
          className={`text-slate-500 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#FF4F81]' : ''}`}
        />
      </button>

      {/* Accordion Categorized Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-2 z-[9999] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[380px] overflow-y-auto p-2 space-y-2 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="px-2 py-1 text-[11px] font-extrabold tracking-wider text-slate-400 uppercase">
            Select Care Category & Package
          </div>

          {CARE_CATEGORIES.map((cat) => {
            const isExpanded = expandedCategory === cat.id;
            const hasMultipleItems = cat.items.length > 1;

            return (
              <div 
                key={cat.id} 
                className={`rounded-xl border transition-all ${
                  isExpanded ? cat.activeColor : 'border-slate-100 bg-slate-50/50 hover:bg-slate-100/60'
                }`}
              >
                {/* Category Header */}
                <button
                  type="button"
                  onClick={() => {
                    if (hasMultipleItems) {
                      toggleCategory(cat.id);
                    } else {
                      handleSelect(cat.items[0].value);
                    }
                  }}
                  className="w-full flex items-center justify-between p-3 text-left font-bold text-slate-800 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0 pr-2">
                    <span className="shrink-0 p-1.5 rounded-lg bg-white shadow-xs border border-slate-200/80">
                      {cat.icon}
                    </span>
                    <span className="text-sm font-extrabold text-slate-900 truncate">
                      {cat.title}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {cat.badge && (
                      <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-bold border ${cat.color}`}>
                        {cat.badge}
                      </span>
                    )}
                    {hasMultipleItems && (
                      <div className="p-1 rounded-full text-slate-400 hover:text-slate-700">
                        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </div>
                    )}
                  </div>
                </button>

                {/* Sub-Items List (Expanded Accordion Content) */}
                {isExpanded && hasMultipleItems && (
                  <div className="px-3 pb-3 pt-1 space-y-1.5 border-t border-slate-200/60 mt-1">
                    {cat.items.map((item) => {
                      const isSelected = value === item.value;
                      return (
                        <button
                          key={item.value}
                          type="button"
                          onClick={() => handleSelect(item.value)}
                          className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left font-bold text-xs sm:text-sm transition-all ${
                            isSelected
                              ? 'bg-[#7B2CBF] text-white shadow-md'
                              : 'bg-white hover:bg-purple-50 text-slate-700 hover:text-[#7B2CBF] border border-slate-200/70 shadow-2xs'
                          }`}
                        >
                          <span className="truncate pr-2">{item.label}</span>
                          {isSelected ? (
                            <Check size={16} className="text-white shrink-0" />
                          ) : item.tag ? (
                            <span className="text-[10px] bg-purple-100 text-purple-700 px-2 py-0.5 rounded-md font-extrabold shrink-0">
                              {item.tag}
                            </span>
                          ) : null}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
