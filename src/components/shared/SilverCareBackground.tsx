import React from "react";

interface SilverCareBackgroundProps {
  variant?: "hero" | "about" | "services" | "why" | "how" | "testimonials" | "cta" | "subpage";
  children?: React.ReactNode;
  className?: string;
}

/**
 * PinkAmbientGlows: Soft, oversized blurred radial glows behaving like ambient healthcare lighting.
 * Extremely soft and subtle - NO hard edges, NO heavy dot patterns, NO visual noise.
 */
export const PinkAmbientGlows: React.FC<{ variant?: string }> = ({ variant = "hero" }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {/* Top-Left Soft Blush Radial Lighting (Behind Text / Header) */}
      <div
        className="absolute -top-32 -left-20 w-[550px] sm:w-[650px] lg:w-[750px] h-[550px] sm:h-[650px] lg:h-[750px] rounded-full opacity-65 sm:opacity-75 blur-[90px] sm:blur-[120px]"
        style={{
          background: "radial-gradient(circle, rgba(255, 228, 238, 0.65) 0%, rgba(255, 234, 242, 0.35) 50%, rgba(255, 247, 250, 0) 75%)",
        }}
      />

      {/* Top-Right Soft Pink Ambient Glow (Behind Hero Image / Visual Column) */}
      <div
        className="absolute -top-20 -right-20 w-[500px] sm:w-[600px] lg:w-[700px] h-[500px] sm:h-[600px] lg:h-[700px] rounded-full opacity-60 sm:opacity-70 blur-[85px] sm:blur-[110px]"
        style={{
          background: "radial-gradient(circle, rgba(255, 234, 242, 0.6) 0%, rgba(255, 240, 245, 0.3) 55%, rgba(255, 255, 255, 0) 80%)",
        }}
      />

      {/* Center Soft Warm White / Diffused Glow */}
      <div
        className="absolute top-1/3 left-1/3 w-[450px] sm:w-[550px] lg:w-[650px] h-[450px] sm:h-[550px] lg:h-[650px] rounded-full opacity-40 blur-[80px] sm:blur-[100px]"
        style={{
          background: "radial-gradient(circle, rgba(255, 245, 249, 0.7) 0%, rgba(255, 255, 255, 0) 75%)",
        }}
      />

      {/* Bottom Right Soft Pink Accent Lighting */}
      <div
        className="absolute -bottom-24 right-10 w-[400px] sm:w-[500px] lg:w-[600px] h-[400px] sm:h-[500px] lg:h-[600px] rounded-full opacity-45 sm:opacity-55 blur-[75px] sm:blur-[95px]"
        style={{
          background: "radial-gradient(circle, rgba(255, 228, 238, 0.45) 0%, rgba(255, 241, 246, 0.2) 60%, rgba(255, 255, 255, 0) 80%)",
        }}
      />
    </div>
  );
};

/**
 * Backward Compatibility SVG Component - Lightweight Ambient Curved Light Lines
 * (Clean & minimal - No wallpaper grids or heavy dots)
 */
export const HalftoneWaveSVG: React.FC<{
  density?: "high" | "medium" | "subtle";
  className?: string;
}> = ({ className = "" }) => {
  return (
    <svg
      viewBox="0 0 1440 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full h-full pointer-events-none select-none ${className}`}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="softPinkWaveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFE4EE" stopOpacity="0.4" />
          <stop offset="50%" stopColor="#FFEAF2" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#FFF1F6" stopOpacity="0.05" />
        </linearGradient>
      </defs>

      {/* Very faint, silky ambient contour lines */}
      <path
        d="M -100 200 C 350 80, 650 320, 1050 140 C 1280 60, 1450 220, 1600 150"
        stroke="url(#softPinkWaveGrad)"
        strokeWidth="2"
        fill="none"
        opacity="0.5"
      />
      <path
        d="M -100 230 C 350 110, 650 350, 1050 170 C 1280 90, 1450 250, 1600 180"
        stroke="url(#softPinkWaveGrad)"
        strokeWidth="1.5"
        fill="none"
        opacity="0.3"
      />
    </svg>
  );
};

export const OrganicPastelBlobs = PinkAmbientGlows;

/**
 * Main SilverCareBackground wrapper component for Premium Light Pink Healthcare Theme
 */
export default function SilverCareBackground({
  variant = "hero",
  children,
  className = "",
}: SilverCareBackgroundProps) {
  const getGradientStyle = () => {
    switch (variant) {
      case "hero":
        return "linear-gradient(180deg, #FFF7FA 0%, #FFF4F8 40%, #FFF9FC 75%, #FFFFFF 100%)";
      case "about":
        return "linear-gradient(180deg, #FFFFFF 0%, #FFF7FA 50%, #FFFFFF 100%)";
      case "services":
        return "linear-gradient(180deg, #FFF5F8 0%, #FFF0F5 50%, #FFF7FA 100%)";
      case "why":
        return "linear-gradient(180deg, #FFF7FA 0%, #FFF1F6 100%)";
      case "testimonials":
        return "linear-gradient(180deg, #FFFFFF 0%, #FFF9FC 60%, #FFFFFF 100%)";
      case "cta":
        return "linear-gradient(135deg, #FFF0F5 0%, #FFE4EE 50%, #FFF5F8 100%)";
      case "subpage":
        return "linear-gradient(180deg, #FFF7FA 0%, #FFF4F8 50%, #FFFFFF 100%)";
      default:
        return "linear-gradient(180deg, #FFF7FA 0%, #FFFFFF 100%)";
    }
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Layer 1: Main Base Gradient */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ background: getGradientStyle() }}
      />

      {/* Layer 2: Organic Pink Lighting / Ambient Glows */}
      <PinkAmbientGlows variant={variant} />

      {/* Layer 3: Website Content Container */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
