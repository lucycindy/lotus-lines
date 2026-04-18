"use client";

import React from "react";

type IconType = "vine" | "bloom" | "book" | "flower" | "brackets";

interface KineticIconProps {
  type: IconType;
}

const KineticIcon: React.FC<KineticIconProps> = ({ type }) => {
  return (
    <div className="w-[32px] h-[32px] flex items-center justify-center shrink-0">
      <style jsx>{`
        @keyframes draw { to { stroke-dashoffset: 0; } }
        @keyframes appear { to { opacity: 1; } }
        
        /* Ring Looping */
        @keyframes ring-loop {
          0% { stroke-dashoffset: 60; }
          45% { stroke-dashoffset: 0; }
          80% { stroke-dashoffset: 0; }
          80.1%, 100% { stroke-dashoffset: 60; }
        }
        /* Book Fanning (Breathing Motion) */
        @keyframes book-page-left {
          from { transform: rotate(0deg); }
          to { transform: rotate(-25deg); }
        }
        @keyframes book-page-right {
          from { transform: rotate(0deg); }
          to { transform: rotate(25deg); }
        }

        /* Blooming Petals Looping */
        @keyframes petal-1 { 0% { stroke-dashoffset: 10; } 20% { stroke-dashoffset: 0; } 80% { stroke-dashoffset: 0; } 80.1%, 100% { stroke-dashoffset: 10; } }
        @keyframes petal-2 { 0%, 10% { stroke-dashoffset: 10; } 30% { stroke-dashoffset: 0; } 80% { stroke-dashoffset: 0; } 80.1%, 100% { stroke-dashoffset: 10; } }
        @keyframes petal-3 { 0%, 20% { stroke-dashoffset: 10; } 40% { stroke-dashoffset: 0; } 80% { stroke-dashoffset: 0; } 80.1%, 100% { stroke-dashoffset: 10; } }
        @keyframes petal-4 { 0%, 30% { stroke-dashoffset: 10; } 50% { stroke-dashoffset: 0; } 80% { stroke-dashoffset: 0; } 80.1%, 100% { stroke-dashoffset: 10; } }
        @keyframes petal-5 { 0%, 40% { stroke-dashoffset: 10; } 60% { stroke-dashoffset: 0; } 80% { stroke-dashoffset: 0; } 80.1%, 100% { stroke-dashoffset: 10; } }
        @keyframes flower-center { 0%, 55% { opacity: 0; } 65%, 80% { opacity: 1; } 80.1%, 100% { opacity: 0; } }

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
          stroke: currentColor;
          stroke-linecap: round;
          stroke-linejoin: round;
          flex-shrink: 0;
        }

        @media (prefers-reduced-motion: reduce) {
          path, line, circle, rect {
            animation-iteration-count: 1 !important;
            animation-duration: 2s !important;
            animation-fill-mode: forwards !important;
          }
          .book-left { transform: rotate(-25deg) !important; animation: none !important; }
          .book-right { transform: rotate(25deg) !important; animation: none !important; }
        }
      `}</style>

      {type === "vine" && (
        <svg viewBox="0 0 28 28" width="28" height="28" className="kinetic-svg" style={{ strokeWidth: "1px" }}>
          <circle 
            cx="14" cy="14" r="9" 
            strokeDasharray="60" strokeDashoffset="60"
            style={{ animation: "ring-loop 2.5s ease-out infinite" }}
          />
        </svg>
      )}

      {type === "bloom" && (
        <svg viewBox="0 0 24 24" width="24" height="24" className="kinetic-svg">
          <circle cx="12" cy="4" r="1.5" fill="currentColor" stroke="none" style={{ animation: "drop-ink 1.5s ease-in infinite" }} />
          <circle cx="12" cy="18" r="4" style={{ animation: "splash 1.5s ease-out infinite" }} />
        </svg>
      )}

      {type === "book" && (
        <svg viewBox="0 0 28 28" width="28" height="28" className="kinetic-svg" style={{ strokeWidth: "0.9px" }}>
          <line x1="14" y1="24" x2="14" y2="4" />
          <line
            x1="14" y1="24" x2="14" y2="4"
            className="book-left"
            style={{
              transformOrigin: "14px 24px",
              animation: "book-page-left 1.8s ease-in-out infinite alternate"
            }}
          />
          <line
            x1="14" y1="24" x2="14" y2="4"
            className="book-right"
            style={{
              transformOrigin: "14px 24px",
              animation: "book-page-right 1.8s ease-in-out infinite alternate"
            }}
          />
        </svg>
      )}

      {type === "flower" && (
        <svg viewBox="0 0 28 28" width="28" height="28" className="kinetic-svg" style={{ strokeWidth: "0.9px" }}>
          {[0, 72, 144, 216, 288].map((rot, i) => (
            <line
              key={i}
              x1="14" y1="14" x2="14" y2="4"
              style={{
                transformOrigin: "14px 14px",
                transform: `rotate(${rot}deg)`,
                strokeDasharray: "10",
                strokeDashoffset: "10",
                animation: `petal-${i + 1} 1.5s ease-out infinite`
              }}
            />
          ))}
          <circle cx="14" cy="14" r="1.5" fill="currentColor" stroke="none" opacity="0" style={{ animation: "flower-center 1.5s ease-out infinite" }} />
        </svg>
      )}

      {type === "brackets" && (
        <svg viewBox="0 0 24 24" width="24" height="24" className="kinetic-svg">
          <path d="M8 8L4 12L8 16" strokeDasharray="20" strokeDashoffset="20" style={{ animation: "draw 0.5s ease-out forwards" }} />
          <path d="M16 8L20 12L16 16" strokeDasharray="20" strokeDashoffset="20" style={{ animation: "draw 0.5s ease-out 0.2s forwards" }} />
          <line x1="12" y1="8" x2="12" y2="16" style={{ animation: "cursor-blink 1s step-end infinite" }} />
        </svg>
      )}
    </div>
  );
};

export default KineticIcon;
