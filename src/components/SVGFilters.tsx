// src/components/SVGFilters.tsx
import React from "react";

export function SVGFilters(): JSX.Element {
  return (
    <svg className="h-0 w-0" aria-hidden>
      <defs>
        {Array.from({ length: 5 }).map((_, index) => (
          <filter id={`squiggle-${index}`} key={index}>
            <feTurbulence
              baseFrequency="0.05"
              id={`turbulence-${index}`}
              numOctaves={2}
              result="noise"
              seed={index}
            />
            <feDisplacementMap
              id={`displacement-${index}`}
              in2="noise"
              in="SourceGraphic"
              scale={4}
            />
          </filter>
        ))}
      </defs>
    </svg>
  );
}

export default SVGFilters;
