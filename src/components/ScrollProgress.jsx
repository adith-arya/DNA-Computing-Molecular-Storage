import React, { useState, useEffect } from 'react';
import { BASE_COLORS } from '../lib/dnaCodec';

/**
 * ScrollProgress
 * Slim double-helix styled scroll progress bar at the very top of the window.
 * Features A, C, G, T nucleotide markers at 25%, 50%, 75%, and 100% intervals.
 */
export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) {
        setScrollProgress(0);
        return;
      }
      const currentScroll = window.scrollY;
      const progress = Math.min(100, Math.max(0, (currentScroll / totalHeight) * 100));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const markers = [
    { base: 'A', percent: 25, color: BASE_COLORS.A.hex },
    { base: 'C', percent: 50, color: BASE_COLORS.C.hex },
    { base: 'G', percent: 75, color: BASE_COLORS.G.hex },
    { base: 'T', percent: 100, color: BASE_COLORS.T.hex },
  ];

  return (
    <div
      className="fixed top-0 left-0 w-full h-[5px] z-[60] bg-slate-100/70 backdrop-blur-sm shadow-xs"
      role="progressbar"
      aria-valuenow={Math.round(scrollProgress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
    >
      {/* Progress fill gradient */}
      <div
        className="h-full transition-all duration-100 ease-out rounded-r-full shadow-inner"
        style={{
          width: `${scrollProgress}%`,
          background: `linear-gradient(90deg, ${BASE_COLORS.A.hex} 0%, ${BASE_COLORS.C.hex} 33%, ${BASE_COLORS.G.hex} 66%, ${BASE_COLORS.T.hex} 100%)`,
        }}
      />

      {/* Markers along the scroll path */}
      {markers.map((m) => {
        const isReached = scrollProgress >= m.percent;
        return (
          <div
            key={m.base}
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex items-center justify-center transition-all duration-300"
            style={{ left: `${m.percent}%` }}
          >
            <span
              className={`w-3.5 h-3.5 rounded-full text-[9px] font-mono font-bold flex items-center justify-center transition-all duration-300 shadow-xs border ${
                isReached
                  ? 'scale-110 shadow-md text-slate-800'
                  : 'scale-90 opacity-40 bg-white text-slate-400 border-slate-300'
              }`}
              style={{
                backgroundColor: isReached ? m.color : '#FFFFFF',
                borderColor: m.color,
              }}
              title={`Section Marker ${m.base} (${m.percent}%)`}
            >
              {m.base}
            </span>
          </div>
        );
      })}
    </div>
  );
}
