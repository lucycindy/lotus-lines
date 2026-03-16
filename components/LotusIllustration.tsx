"use client";

import React from "react";

const LotusIllustration: React.FC = () => {
  return (
    <div className="relative w-full max-w-[420px] h-auto pointer-events-none">
      <svg
        viewBox="0 0 420 580"
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        <style>
          {`
            .botanical-stroke {
              stroke-linecap: round;
              stroke-linejoin: round;
              fill: none;
              stroke-dasharray: 2000;
              stroke-dashoffset: 2000;
              transition: stroke 0.3s ease;
            }

            @keyframes draw {
              to { stroke-dashoffset: 0; }
            }

            @keyframes fadeIn {
              from { opacity: 0; }
              to { opacity: 1; }
            }

            /* Zone 1 - Mud (0.2 - 1.2s) */
            .mud-line {
              stroke: #ccc;
              stroke-width: 1.8;
              animation: draw 1s ease-out forwards;
              animation-delay: 0.2s;
            }
            .mud-label {
              opacity: 0;
              animation: fadeIn 0.5s ease-out forwards;
              animation-delay: 0.8s;
            }

            /* Zone 2 - Growth (1.3 - 4.8s) */
            .water-line {
              stroke: #b0b0b0;
              stroke-width: 1.2;
              animation: draw 1s ease-out forwards;
              animation-delay: 1.3s;
            }
            .stem-main {
              stroke: #b83143;
              stroke-width: 3.2;
              animation: draw 2s ease-in-out forwards;
              animation-delay: 1.5s;
            }
            .stem-secondary {
              stroke: #b83143;
              stroke-width: 2.5;
              animation: draw 1.8s ease-in-out forwards;
              animation-delay: 1.7s;
            }
            .root-tendril {
              stroke: #b83143;
              stroke-width: 2;
              animation: draw 1.5s ease-out forwards;
              animation-delay: 1.3s;
            }
            .lily-pad {
              stroke: #b83143;
              stroke-width: 2.8;
              animation: draw 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
              animation-delay: 2.8s;
            }
            .growth-label {
              opacity: 0;
              animation: fadeIn 0.5s ease-out forwards;
              animation-delay: 3.6s;
            }

            /* Zone 3 - Lotus (6.5 - 8.3s) */
            .lotus-petal {
              stroke: #b83143;
              animation: draw 1s cubic-bezier(0.2, 0, 0.4, 1) forwards;
            }
            .petal-outer { stroke-width: 2.8; }
            .petal-mid { stroke-width: 2.0; }
            .petal-inner { stroke-width: 1.5; }
            
            .stamen {
              stroke: #b83143;
              stroke-width: 1.2;
              animation: draw 0.5s ease-out forwards;
              animation-delay: 8s;
            }
            .stamen-tip {
              fill: #b83143;
              opacity: 0;
              animation: fadeIn 0.3s ease-out forwards;
              animation-delay: 8.3s;
            }
            .lotus-label {
              opacity: 0;
              animation: fadeIn 0.5s ease-out forwards;
              animation-delay: 6.4s;
            }

            /* Staggered petals for Zone 3 */
            .petal-1 { animation-delay: 6.5s; }
            .petal-2 { animation-delay: 6.6s; }
            .petal-3 { animation-delay: 6.7s; }
            .petal-4 { animation-delay: 6.8s; }
            .petal-outer-stagger { animation-delay: 6.9s; }
            .petal-mid-stagger { animation-delay: 7.2s; }

            .botanical-label {
              font-family: "Times New Roman", serif;
              font-style: italic;
              font-size: 11px;
              fill: #1a1a1a;
              letter-spacing: 0.12em;
            }
            .leader-line {
              stroke: #1a1a1a;
              stroke-width: 0.5;
              opacity: 0.3;
              animation: draw 0.4s ease-out forwards;
            }

            @media (prefers-reduced-motion: reduce) {
              .botanical-stroke, .mud-label, .growth-label, .lotus-label, .stamen-tip, .leader-line {
                stroke-dashoffset: 0 !important;
                opacity: 1 !important;
                animation: none !important;
              }
            }
          `}
        </style>

        {/* Zone 1: Mud - Gestural Wavy Scrawls */}
        <g id="mud">
          <path className="botanical-stroke mud-line" d="M 50 540 c 30 -5 70 8 110 -2 c 40 -10 90 12 140 -5 c 30 -10 60 5 80 8" />
          <path className="botanical-stroke mud-line" d="M 70 555 c 40 5 90 -10 130 5 c 50 15 100 -8 150 2" style={{ animationDelay: '0.4s' }} />
          <path className="botanical-stroke mud-line" d="M 100 568 c 60 -5 120 10 180 -2" style={{ animationDelay: '0.6s' }} />

          <g className="mud-label">
            <line className="leader-line" x1="330" y1="545" x2="365" y2="545" style={{ animationDelay: '0.8s' }} />
            <text x="370" y="548" className="botanical-label">mud</text>
          </g>
        </g>

        {/* Zone 2: Growth - Wild Roots, Organic Stems */}
        <g id="growth">
          {/* Water Surface Lines (Faint) */}
          <path className="botanical-stroke water-line" d="M 40 435 c 50 -8 110 5 170 -2 c 60 -7 120 10 180 -5" />
          <path className="botanical-stroke water-line" d="M 80 448 c 70 5 140 -10 210 2" style={{ animationDelay: '1.4s' }} />

          {/* Extended Wild Roots */}
          <g id="roots">
            <path className="botanical-stroke root-tendril" d="M 210 542 c -15 20 -40 30 -60 50 c -20 20 -10 40 -15 60" />
            <path className="botanical-stroke root-tendril" d="M 210 542 c 20 15 35 45 30 70 c -5 25 15 35 10 50" />
            <path className="botanical-stroke root-tendril" d="M 210 542 c -25 5 -50 0 -75 15 c -20 10 -30 30 -50 25" />
            <path className="botanical-stroke root-tendril" d="M 210 542 c 30 5 60 -10 90 5 c 25 12 40 35 60 40" />
            <path className="botanical-stroke root-tendril" d="M 210 542 s -10 30 -5 55 s 20 40 15 70" />

            {/* Secondary Roots (Tangled) */}
            <path className="botanical-stroke root-tendril" d="M 255 542 c -10 30 -30 45 -45 75" style={{ animationDelay: '1.6s' }} />
            <path className="botanical-stroke root-tendril" d="M 255 542 c 15 25 40 40 55 65" style={{ animationDelay: '1.6s' }} />
            <path className="botanical-stroke root-tendril" d="M 255 542 c 5 40 -20 60 -15 90" style={{ animationDelay: '1.7s' }} />
          </g>

          {/* Stems (Hand-drawn wobbly quality) */}
          <path className="botanical-stroke stem-main" d="M 210 542 c -8 -40 12 -90 -5 -150 c -15 -60 20 -120 -5 -210" />
          <path className="botanical-stroke stem-secondary" d="M 255 542 c 15 -50 -10 -110 5 -180 c 12 -60 -5 -110 10 -150" />

          {/* Lily Pads - Flatter, wider elliptical, gestural */}
          <g transform="translate(130, 420)">
            <path className="botanical-stroke lily-pad" d="M -60 0 c 10 -25 90 -20 120 5 c 20 20 -30 35 -60 30 c -30 -5 -40 -10 -50 -10 c -10 0 -20 5 -10 -25 Z" />
            <path className="botanical-stroke lily-pad" d="M 0 0 c 20 -10 40 -5 60 -2" style={{ strokeWidth: 1.5, animationDelay: '3.2s' }} />
          </g>
          <g transform="translate(320, 390) scale(1.1)">
            <path className="botanical-stroke lily-pad" d="M -50 0 c 15 -30 100 -25 140 10 c 10 30 -50 45 -80 35 c -30 -10 -40 -15 -60 -45 Z" style={{ animationDelay: '3s' }} />
            <path className="botanical-stroke lily-pad" d="M 0 0 c 30 -15 60 -10 80 -5" style={{ strokeWidth: 1.5, animationDelay: '3.4s' }} />
          </g>
          <g transform="translate(170, 310) rotate(-15) scale(0.9)">
            <path className="botanical-stroke lily-pad" d="M -55 0 c 10 -20 80 -15 110 5 c 25 15 -35 30 -65 25 c -25 -5 -45 -10 -45 -30 Z" style={{ animationDelay: '3.2s' }} />
            <path className="botanical-stroke lily-pad" d="M 0 0 c 25 -8 50 -3 70 0" style={{ strokeWidth: 1.5, animationDelay: '3.6s' }} />
          </g>

          <g className="growth-label">
            <line className="leader-line" x1="280" y1="430" x2="315" y2="430" style={{ animationDelay: '3.6s' }} />
            <text x="320" y="433" className="botanical-label">growth</text>
          </g>
        </g>

        {/* Zone 3: Lotus - Sharp pointed petals, Chinese brush style */}
        <g id="lotus">
          {/* Main Bloom */}
          <g transform="translate(200, 182)">
            {/* Outer Petals (Wide sweeps, pointed) */}
            <path className="botanical-stroke lotus-petal petal-outer petal-1" d="M 0 0 c -50 -20 -80 -100 -10 -120" />
            <path className="botanical-stroke lotus-petal petal-outer petal-2" d="M 0 0 c 50 -20 80 -100 10 -120" />
            <path className="botanical-stroke lotus-petal petal-outer petal-3" d="M 0 0 c -40 30 -100 80 -120 40" />
            <path className="botanical-stroke lotus-petal petal-outer petal-4" d="M 0 0 c 40 30 100 80 120 40" />
            <path className="botanical-stroke lotus-petal petal-outer petal-outer-stagger" d="M 0 0 c -20 40 -60 110 -80 90" />
            <path className="botanical-stroke lotus-petal petal-outer petal-outer-stagger" d="M 0 0 c 20 40 60 110 80 90" />

            {/* Mid Petals (Staggered overlaps) */}
            <path className="botanical-stroke lotus-petal petal-mid petal-mid-stagger" d="M 0 0 c -30 -15 -45 -70 -5 -85" />
            <path className="botanical-stroke lotus-petal petal-mid petal-mid-stagger" d="M 0 0 c 30 -15 45 -70 5 -85" />
            <path className="botanical-stroke lotus-petal petal-mid petal-mid-stagger" d="M 0 0 c -30 20 -60 60 -70 40" />
            <path className="botanical-stroke lotus-petal petal-mid petal-mid-stagger" d="M 0 0 c 30 20 60 60 70 40" />

            {/* Inner Petals (Tight cluster) */}
            <path className="botanical-stroke lotus-petal petal-inner" d="M 0 0 c -15 -10 -20 -40 -3 -50" style={{ animationDelay: '7.8s' }} />
            <path className="botanical-stroke lotus-petal petal-inner" d="M 0 0 c 15 -10 20 -40 3 -50" style={{ animationDelay: '7.9s' }} />
            <path className="botanical-stroke lotus-petal petal-inner" d="M 0 0 c -5 -15 -5 -45 5 -55" style={{ animationDelay: '8.0s' }} />
            <path className="botanical-stroke lotus-petal petal-inner" d="M 0 0 l 0 -45" style={{ animationDelay: '8.1s' }} />

            {/* Stamens */}
            <g id="stamens-main">
              <line className="botanical-stroke stamen" x1="-8" y1="-15" x2="-12" y2="-40" />
              <circle className="stamen-tip" cx="-12" cy="-40" r="1.8" />
              <line className="botanical-stroke stamen" x1="8" y1="-15" x2="12" y2="-40" />
              <circle className="stamen-tip" cx="12" cy="-40" r="1.8" />
              <line className="botanical-stroke stamen" x1="-4" y1="-18" x2="-6" y2="-45" />
              <circle className="stamen-tip" cx="-6" cy="-45" r="1.8" />
              <line className="botanical-stroke stamen" x1="4" y1="-18" x2="6" y2="-45" />
              <circle className="stamen-tip" cx="6" cy="-45" r="1.8" />
              <line className="botanical-stroke stamen" x1="0" y1="-15" x2="0" y2="-42" />
              <circle className="stamen-tip" cx="0" cy="-42" r="1.8" />
            </g>
          </g>

          {/* Secondary Bloom (Gestural tilt) */}
          <g transform="translate(265, 230) scale(0.85) rotate(20)">
            {/* Outer Petals */}
            <path className="botanical-stroke lotus-petal petal-outer" d="M 0 0 c -50 -15 -70 -90 -15 -110" style={{ animationDelay: '6.8s' }} />
            <path className="botanical-stroke lotus-petal petal-outer" d="M 0 0 c 40 -20 65 -85 15 -105" style={{ animationDelay: '6.9s' }} />
            <path className="botanical-stroke lotus-petal petal-outer" d="M 0 0 c -30 25 -80 70 -90 45" style={{ animationDelay: '7.0s' }} />

            {/* Mid & Inner Petals */}
            <path className="botanical-stroke lotus-petal petal-mid" d="M 0 0 c -25 -10 -35 -60 -5 -75" style={{ animationDelay: '7.4s' }} />
            <path className="botanical-stroke lotus-petal petal-mid" d="M 0 0 c 25 -10 35 -60 5 -75" style={{ animationDelay: '7.5s' }} />
            <path className="botanical-stroke lotus-petal petal-inner" d="M 0 0 c -10 -15 -10 -35 2 -45" style={{ animationDelay: '7.9s' }} />
            <path className="botanical-stroke lotus-petal petal-inner" d="M 0 0 l 0 -40" style={{ animationDelay: '8.0s' }} />

            {/* Stamens */}
            <g id="stamens-secondary">
              <line className="botanical-stroke stamen" x1="-5" y1="-12" x2="-8" y2="-35" style={{ animationDelay: '8.1s' }} />
              <circle className="stamen-tip" cx="-8" cy="-35" r="1.5" style={{ animationDelay: '8.4s' }} />
              <line className="botanical-stroke stamen" x1="5" y1="-12" x2="8" y2="-35" style={{ animationDelay: '8.1s' }} />
              <circle className="stamen-tip" cx="8" cy="-35" r="1.5" style={{ animationDelay: '8.4s' }} />
              <line className="botanical-stroke stamen" x1="0" y1="-12" x2="0" y2="-32" style={{ animationDelay: '8.1s' }} />
              <circle className="stamen-tip" cx="0" cy="-32" r="1.5" style={{ animationDelay: '8.4s' }} />
            </g>
          </g>

          <g className="lotus-label">
            <line className="leader-line" x1="310" y1="185" x2="350" y2="185" style={{ animationDelay: '6.4s' }} />
            <text x="355" y="188" className="botanical-label">lotus</text>
          </g>
        </g>
      </svg>
    </div>
  );
};

export default LotusIllustration;
