import React from "react";

interface SilverCareBackgroundProps {
  variant?: "hero" | "about" | "services" | "why" | "how" | "testimonials" | "cta" | "subpage";
  children?: React.ReactNode;
  className?: string;
}

/**
 * Authentic SilverCare India Background (Ground Truth from silvercareindia.com - home-bg-1.png & soft wave gradient)
 * Features:
 * 1. Soft Flowing Gradient (#FFF7FA -> #FFF0F5 -> #FFFFFF)
 * 2. Original SilverCare Soft Halftone Wave Pattern
 * 3. Soft Ambient Pastel Blobs for Depth
 */
export const SilverCareOfficialBackground: React.FC<{ variant?: string }> = ({ variant = "hero" }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {/* 1. Base Gradient matching silvercareindia.com */}
      <div
        className="absolute inset-0"
        style={{
          background:
            variant === "hero"
              ? "linear-gradient(180deg, #FAF4FF 0%, #FFF0F6 45%, #FFFFFF 100%)"
              : variant === "services"
              ? "linear-gradient(180deg, #FFFFFF 0%, #FAF2FF 50%, #FFFFFF 100%)"
              : variant === "about"
              ? "linear-gradient(180deg, #FFF0F6 0%, #FAF0FF 60%, #FFFFFF 100%)"
              : variant === "why"
              ? "linear-gradient(180deg, #FAF4FF 0%, #FFF0F6 100%)"
              : variant === "cta"
              ? "linear-gradient(135deg, #F3E5F5 0%, #FFF0F5 50%, #FAF0FF 100%)"
              : "linear-gradient(180deg, #FAF4FF 0%, #FFFFFF 100%)",
        }}
      />

      {/* 2. Soft Organic Glow Blobs */}
      <div
        className="absolute -top-28 -left-20 w-[600px] h-[600px] rounded-full opacity-60 blur-[100px]"
        style={{
          background: "radial-gradient(circle, rgba(230, 200, 255, 0.4) 0%, rgba(255, 214, 232, 0.25) 50%, transparent 75%)",
        }}
      />
      <div
        className="absolute -top-20 -right-20 w-[550px] h-[550px] rounded-full opacity-50 blur-[90px]"
        style={{
          background: "radial-gradient(circle, rgba(255, 214, 232, 0.45) 0%, rgba(230, 200, 255, 0.2) 60%, transparent 80%)",
        }}
      />

      {/* 3. Official Halftone Dot Wave Mesh SVG matching home-bg-1 */}
      <svg
        viewBox="0 0 1440 700"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full opacity-70"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="scWaveGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C77DFF" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#E6C8FF" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#FFB8E0" stopOpacity="0.3" />
          </linearGradient>

          <linearGradient id="scWaveGrad2" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFB8E0" stopOpacity="0.6" />
            <stop offset="70%" stopColor="#D9B8FF" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#C77DFF" stopOpacity="0.2" />
          </linearGradient>

          <pattern id="scDotPattern" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="1.8" fill="#D9B8FF" opacity="0.35" />
          </pattern>

          <radialGradient id="scFadeMask" cx="50%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="70%" stopColor="#ffffff" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>

          <mask id="scOrganicMask">
            <rect width="1440" height="700" fill="url(#scFadeMask)" />
          </mask>
        </defs>

        {/* Soft Dot Grid overlay with fade mask */}
        <rect width="1440" height="700" fill="url(#scDotPattern)" mask="url(#scOrganicMask)" />

        {/* Halftone Curved Dot Wave Lines */}
        <g opacity="0.85">
          <path
            d="M -50 140 C 280 30, 550 260, 900 110 C 1180 -10, 1380 160, 1520 90"
            stroke="url(#scWaveGrad1)"
            strokeWidth="3.5"
            strokeDasharray="0 16"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M -50 160 C 280 50, 550 280, 900 130 C 1180 10, 1380 180, 1520 110"
            stroke="url(#scWaveGrad1)"
            strokeWidth="3"
            strokeDasharray="0 15"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M -50 180 C 280 70, 550 300, 900 150 C 1180 30, 1380 200, 1520 130"
            stroke="url(#scWaveGrad2)"
            strokeWidth="2.8"
            strokeDasharray="0 15"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M -50 200 C 280 90, 550 320, 900 170 C 1180 50, 1380 220, 1520 150"
            stroke="url(#scWaveGrad2)"
            strokeWidth="2.5"
            strokeDasharray="0 14"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M -30 380 C 320 200, 680 460, 1040 280 C 1300 150, 1460 340, 1550 280"
            stroke="url(#scWaveGrad1)"
            strokeWidth="3"
            strokeDasharray="0 16"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M -30 400 C 320 220, 680 480, 1040 300 C 1300 170, 1460 360, 1550 300"
            stroke="url(#scWaveGrad2)"
            strokeWidth="2.5"
            strokeDasharray="0 15"
            strokeLinecap="round"
            fill="none"
          />
        </g>
      </svg>
    </div>
  );
};

export const HalftoneWaveSVG = SilverCareOfficialBackground;
export const PinkAmbientGlows = SilverCareOfficialBackground;
export const OrganicPastelBlobs = SilverCareOfficialBackground;

export default function SilverCareBackground({
  variant = "hero",
  children,
  className = "",
}: SilverCareBackgroundProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <SilverCareOfficialBackground variant={variant} />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
