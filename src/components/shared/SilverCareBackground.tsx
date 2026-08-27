import React from "react";

interface SilverCareBackgroundProps {
  variant?: "hero" | "about" | "services" | "why" | "how" | "testimonials" | "cta" | "subpage";
  children?: React.ReactNode;
  className?: string;
}

/**
 * HalftoneWaveSVG: Renders flowing wave paths composed of circular dots (halftone field)
 * using SVG bezier curves with strokeDasharray="0 [spacing]" and strokeLinecap="round".
 */
export const HalftoneWaveSVG: React.FC<{
  density?: "high" | "medium" | "subtle";
  className?: string;
}> = ({ density = "medium", className = "" }) => {
  const opMultiplier = density === "high" ? 1 : density === "medium" ? 0.75 : 0.45;

  return (
    <svg
      viewBox="0 0 1440 700"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full h-full pointer-events-none select-none ${className}`}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        {/* Gradients for dot waves */}
        <linearGradient id="lavenderDotGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C77DFF" stopOpacity={0.65 * opMultiplier} />
          <stop offset="50%" stopColor="#E6C8FF" stopOpacity={0.85 * opMultiplier} />
          <stop offset="100%" stopColor="#FFB8E0" stopOpacity={0.4 * opMultiplier} />
        </linearGradient>

        <linearGradient id="pinkDotGrad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FFD6E8" stopOpacity={0.7 * opMultiplier} />
          <stop offset="60%" stopColor="#D9B8FF" stopOpacity={0.6 * opMultiplier} />
          <stop offset="100%" stopColor="#C77DFF" stopOpacity={0.3 * opMultiplier} />
        </linearGradient>

        <linearGradient id="subtleFadeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#D9B8FF" stopOpacity={0.1 * opMultiplier} />
          <stop offset="40%" stopColor="#C77DFF" stopOpacity={0.6 * opMultiplier} />
          <stop offset="70%" stopColor="#FFB8E0" stopOpacity={0.5 * opMultiplier} />
          <stop offset="100%" stopColor="#E6C8FF" stopOpacity={0.05 * opMultiplier} />
        </linearGradient>

        {/* Halftone Dot Grid Pattern */}
        <pattern id="halftonePatternGrid" width="22" height="22" patternUnits="userSpaceOnUse">
          <circle cx="11" cy="11" r="2.2" fill="#D9B8FF" opacity={0.35 * opMultiplier} />
        </pattern>

        <radialGradient id="centerFadeMask" cx="45%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="65%" stopColor="#ffffff" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>

        <mask id="organicWaveMask">
          <rect width="1440" height="700" fill="url(#centerFadeMask)" />
        </mask>
      </defs>

      {/* Grid Pattern Masked Layer */}
      <rect
        width="1440"
        height="700"
        fill="url(#halftonePatternGrid)"
        mask="url(#organicWaveMask)"
        className="opacity-60"
      />

      {/* Group of Flowing Organic Dot Wave Paths */}
      <g opacity={opMultiplier}>
        {/* Wave 1 - Large Primary Wave */}
        <path
          d="M -80 160 C 250 40, 520 280, 880 120 C 1180 -10, 1380 180, 1550 100"
          stroke="url(#lavenderDotGrad)"
          strokeWidth="4.5"
          strokeDasharray="0 18"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M -80 182 C 250 62, 520 302, 880 142 C 1180 12, 1380 202, 1550 122"
          stroke="url(#lavenderDotGrad)"
          strokeWidth="4"
          strokeDasharray="0 17"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M -80 204 C 250 84, 520 324, 880 164 C 1180 34, 1380 224, 1550 144"
          stroke="url(#pinkDotGrad)"
          strokeWidth="3.8"
          strokeDasharray="0 16"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M -80 226 C 250 106, 520 346, 880 186 C 1180 56, 1380 246, 1550 166"
          stroke="url(#subtleFadeGrad)"
          strokeWidth="3.5"
          strokeDasharray="0 16"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M -80 248 C 250 128, 520 368, 880 208 C 1180 78, 1380 268, 1550 188"
          stroke="url(#lavenderDotGrad)"
          strokeWidth="3.2"
          strokeDasharray="0 15"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M -80 270 C 250 148, 520 388, 880 228 C 1180 98, 1380 288, 1550 208"
          stroke="url(#pinkDotGrad)"
          strokeWidth="3"
          strokeDasharray="0 15"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M -80 292 C 250 168, 520 408, 880 248 C 1180 118, 1380 308, 1550 228"
          stroke="url(#subtleFadeGrad)"
          strokeWidth="2.8"
          strokeDasharray="0 14"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M -80 314 C 250 188, 520 428, 880 268 C 1180 138, 1380 328, 1550 248"
          stroke="url(#lavenderDotGrad)"
          strokeWidth="2.5"
          strokeDasharray="0 14"
          strokeLinecap="round"
          fill="none"
        />

        {/* Secondary Counter-Wave (Diagonal Mesh Intersect) */}
        <path
          d="M -50 420 C 320 220, 680 500, 1050 310 C 1320 180, 1490 380, 1580 320"
          stroke="url(#pinkDotGrad)"
          strokeWidth="4.2"
          strokeDasharray="0 18"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M -50 442 C 320 242, 680 522, 1050 332 C 1320 202, 1490 402, 1580 342"
          stroke="url(#lavenderDotGrad)"
          strokeWidth="3.8"
          strokeDasharray="0 17"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M -50 464 C 320 264, 680 544, 1050 354 C 1320 224, 1490 424, 1580 364"
          stroke="url(#subtleFadeGrad)"
          strokeWidth="3.2"
          strokeDasharray="0 16"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M -50 486 C 320 284, 680 564, 1050 374 C 1320 244, 1490 444, 1580 384"
          stroke="url(#pinkDotGrad)"
          strokeWidth="2.8"
          strokeDasharray="0 15"
          strokeLinecap="round"
          fill="none"
        />

        {/* Floating Accent Halftone Concentric Swirls */}
        <g opacity="0.6">
          <circle cx="1150" cy="180" r="120" stroke="url(#lavenderDotGrad)" strokeWidth="3" strokeDasharray="0 16" strokeLinecap="round" fill="none" />
          <circle cx="1150" cy="180" r="95" stroke="url(#pinkDotGrad)" strokeWidth="2.8" strokeDasharray="0 15" strokeLinecap="round" fill="none" />
          <circle cx="1150" cy="180" r="70" stroke="url(#subtleFadeGrad)" strokeWidth="2.5" strokeDasharray="0 14" strokeLinecap="round" fill="none" />
        </g>
      </g>
    </svg>
  );
};

/**
 * OrganicPastelBlobs: Soft oversized organic gradient shapes sitting behind the halftone pattern.
 */
export const OrganicPastelBlobs: React.FC<{ variant?: string }> = ({ variant = "hero" }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {/* Top Right Lavender Blob */}
      <div
        className="absolute -top-24 -right-24 w-[550px] sm:w-[650px] lg:w-[750px] h-[550px] sm:h-[650px] lg:h-[750px] rounded-full opacity-60 sm:opacity-70 blur-[80px] sm:blur-[110px]"
        style={{
          background: "radial-gradient(circle, rgba(217, 184, 255, 0.45) 0%, rgba(230, 200, 255, 0.25) 50%, rgba(255, 255, 255, 0) 75%)",
        }}
      />

      {/* Left Center Soft Pink Blob */}
      <div
        className="absolute top-1/4 -left-28 w-[450px] sm:w-[550px] lg:w-[650px] h-[450px] sm:h-[550px] lg:h-[650px] rounded-full opacity-55 sm:opacity-65 blur-[75px] sm:blur-[100px]"
        style={{
          background: "radial-gradient(circle, rgba(255, 214, 232, 0.5) 0%, rgba(255, 240, 245, 0.3) 55%, rgba(255, 255, 255, 0) 80%)",
        }}
      />

      {/* Bottom Center Lavender/Soft Blue Accent Blob */}
      <div
        className="absolute -bottom-20 right-1/3 w-[400px] sm:w-[500px] lg:w-[600px] h-[400px] sm:h-[500px] lg:h-[600px] rounded-full opacity-40 sm:opacity-50 blur-[70px] sm:blur-[90px]"
        style={{
          background: "radial-gradient(circle, rgba(225, 205, 255, 0.4) 0%, rgba(243, 232, 255, 0.2) 60%, rgba(255, 255, 255, 0) 80%)",
        }}
      />

      {variant === "subpage" && (
        <div
          className="absolute top-1/2 right-5 w-[350px] h-[350px] rounded-full opacity-35 blur-[65px]"
          style={{
            background: "radial-gradient(circle, rgba(255, 214, 232, 0.4) 0%, rgba(255, 255, 255, 0) 75%)",
          }}
        />
      )}
    </div>
  );
};

/**
 * Main SilverCareBackground wrapper component
 */
export default function SilverCareBackground({
  variant = "hero",
  children,
  className = "",
}: SilverCareBackgroundProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Layer 1: Base Background Color / Soft Gradient */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            variant === "hero"
              ? "linear-gradient(180deg, #FBF8FF 0%, #FFF6FA 45%, #FFFFFF 100%)"
              : variant === "services"
              ? "linear-gradient(180deg, #FFFFFF 0%, #FAF6FF 50%, #FFFFFF 100%)"
              : variant === "about"
              ? "linear-gradient(180deg, #FFF6FA 0%, #F8F2FF 60%, #FFFFFF 100%)"
              : variant === "why"
              ? "linear-gradient(180deg, #FAF5FF 0%, #FFF5F9 100%)"
              : variant === "cta"
              ? "linear-gradient(135deg, #F6ECFF 0%, #FFF0F5 50%, #FAF0FF 100%)"
              : "linear-gradient(180deg, #FAF8FF 0%, #FFFFFF 100%)",
        }}
      />

      {/* Layer 2: Organic Pastel Blobs */}
      <OrganicPastelBlobs variant={variant} />

      {/* Layer 3: Halftone Dotted Wave SVG */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-80 sm:opacity-100">
        <HalftoneWaveSVG
          density={
            variant === "hero"
              ? "high"
              : variant === "cta" || variant === "about"
              ? "medium"
              : "subtle"
          }
        />
      </div>

      {/* Layer 4: Website Content Container */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
