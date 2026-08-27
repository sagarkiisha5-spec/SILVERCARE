import React from "react";

interface SilverCareBackgroundProps {
  variant?: "hero" | "about" | "services" | "why" | "how" | "testimonials" | "cta" | "subpage";
  children?: React.ReactNode;
  className?: string;
}

/**
 * Authentic SilverCare India Background
 * Uses exact home-bg-1.png asset downloaded from silvercareindia.com
 */
export const SilverCareOfficialBackground: React.FC<{ variant?: string }> = ({ variant = "hero" }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {variant === "hero" ? (
        <div
          className="absolute inset-0 bg-cover bg-top bg-no-repeat opacity-100"
          style={{ backgroundImage: "url(/home-bg-1.png)" }}
        />
      ) : (
        <div
          className="absolute inset-0"
          style={{
            background:
              variant === "services"
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
      )}
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
