"use client";

import React from "react";

type IconType = "vine" | "bloom" | "book" | "flower" | "brackets";

interface KineticIconProps {
  type: IconType;
}

const KineticIcon: React.FC<KineticIconProps> = ({ type }) => {
  return (
    <div className="w-[32px] h-[32px] flex items-center justify-center overflow-hidden">
      <style jsx>{`
        @keyframes draw { to { stroke-dashoffset: 0; } }
        @keyframes appear { to { opacity: 1; } }
        @keyframes drop-ink {
          0% { transform: translateY(-10px); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(12px) scale(1.5); opacity: 0; }
        }
        @keyframes splash {
          0%, 80% { transform: scale(0); opacity: 0; }
          90% { transform: scale(1); opacity: 1; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        @keyframes cursor-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }

        .kinetic-svg {
          width: 28px;
          height: 28px;
          fill: none;
          stroke: #1a1a1a;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        @media (prefers-reduced-motion: reduce) {
          path, line, circle, rect {
            animation: none !important;
            stroke-dashoffset: 0 !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>

      {type === "vine" && (
        <svg viewBox="0 0 28 28" className="kinetic-svg" style={{ strokeWidth: "1px" }}>
          {/* Item 1: Vine - S-curve + bud circle */}
          <path
            d="M14 26 C 14 26, 8 13, 14 2"
            strokeDasharray="40"
            strokeDashoffset="40"
            style={{ animation: "draw 1.2s ease-out forwards" }}
          />
          <circle cx="14" cy="2" r="1.5" fill="#1a1a1a" stroke="none" opacity="0" style={{ animation: "appear 0.3s ease-out 1.2s forwards" }} />
        </svg>
      )}

      {type === "bloom" && (
        <svg viewBox="0 0 24 24" className="kinetic-svg">
          {/* Item 2: Writing/Ink drop (Refined) */}
          <circle cx="12" cy="4" r="1.5" fill="#1a1a1a" stroke="none" style={{ animation: "drop-ink 1.5s ease-in infinite" }} />
          <circle cx="12" cy="18" r="4" style={{ animation: "splash 1.5s ease-out infinite" }} />
        </svg>
      )}

      {type === "book" && (
        <svg viewBox="0 0 28 28" className="kinetic-svg" style={{ strokeWidth: "0.9px" }}>
          {/* Item 3: Reading - 3 straight lines fanning up */}
          <line x1="14" y1="24" x2="14" y2="4" strokeDasharray="20" strokeDashoffset="20" style={{ animation: "draw 0.5s ease-out forwards" }} />
          <line x1="14" y1="24" x2="4" y2="8" strokeDasharray="25" strokeDashoffset="25" style={{ animation: "draw 0.5s ease-out 0.2s forwards" }} />
          <line x1="14" y1="24" x2="24" y2="8" strokeDasharray="25" strokeDashoffset="25" style={{ animation: "draw 0.5s ease-out 0.4s forwards" }} />
        </svg>
      )}

      {type === "flower" && (
        <svg viewBox="0 0 28 28" className="kinetic-svg" style={{ strokeWidth: "0.9px" }}>
          {/* Item 4: Florals - 5 radiating lines + center dot */}
          {[0, 72, 144, 216, 288].map((rot, i) => (
            <line
              key={i}
              x1="14" y1="14" x2="14" y2="4"
              style={{
                transformOrigin: "14px 14px",
                transform: `rotate(${rot}deg)`,
                strokeDasharray: "10",
                strokeDashoffset: "10",
                animation: `draw 0.4s ease-out ${i * 0.15}s forwards`
              }}
            />
          ))}
          <circle cx="14" cy="14" r="1.5" fill="#1a1a1a" stroke="none" opacity="0" style={{ animation: "appear 0.3s ease-out 0.8s forwards" }} />
        </svg>
      )}

      {type === "brackets" && (
        <svg viewBox="0 0 24 24" className="kinetic-svg">
          {/* Item 5: Websites/Brackets */}
          <path d="M8 8L4 12L8 16" strokeDasharray="20" strokeDashoffset="20" style={{ animation: "draw 0.5s ease-out forwards" }} />
          <path d="M16 8L20 12L16 16" strokeDasharray="20" strokeDashoffset="20" style={{ animation: "draw 0.5s ease-out 0.2s forwards" }} />
          <line x1="12" y1="8" x2="12" y2="16" style={{ animation: "cursor-blink 1s step-end infinite" }} />
        </svg>
      )}
    </div>
  );
};

export default KineticIcon;
