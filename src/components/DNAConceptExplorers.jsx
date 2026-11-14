import React, { useState } from 'react';
import { BASE_COLORS, complementStrand } from '../lib/dnaCodec';

const nucleotideParts = {
  phosphate: {
    label: 'Phosphate group',
    description: 'A phosphate group links adjacent sugars through 3′–5′ phosphodiester bonds in the DNA backbone.',
    color: '#087F8C',
  },
  sugar: {
    label: 'Deoxyribose sugar',
    description: 'This five-carbon sugar has a hydrogen rather than a hydroxyl group at its 2′ carbon.',
    color: '#3478C8',
  },
  base: {
    label: 'Nitrogenous base',
    description: 'The base—A, T, G, or C—carries sequence information and pairs with its complement.',
    color: '#24B8A5',
  },
};

function NucleotidePart({ name, label, activePart, onSelect, children }) {
  const active = activePart === name;
  const selectPart = () => onSelect(name);

  return (
    <g
      role="button"
      tabIndex="0"
      aria-label={`Select ${label}`}
      aria-pressed={active}
      onClick={selectPart}
      onMouseEnter={selectPart}
      onFocus={selectPart}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          selectPart();
        }
      }}
      className="cursor-pointer outline-none"
    >
      {children({ active })}
    </g>
  );
}

export function NucleotideDiagram() {
  const [activePart, setActivePart] = useState('sugar');
  const active = nucleotideParts[activePart];

  return (
    <figure className="rounded-2xl border border-indigo-100/80 bg-gradient-to-br from-slate-50 via-white to-indigo-50/70 p-3 sm:p-4">
      <svg
        viewBox="0 0 480 136"
        className="h-auto w-full"
        role="group"
        aria-label="Interactive nucleotide diagram. Select a phosphate, sugar, or nitrogenous base."
      >
        <path d="M87 58h88m61 0h91" stroke="#B7CBD5" strokeWidth="2" strokeDasharray="4 4" />
        <NucleotidePart name="phosphate" label="phosphate group" activePart={activePart} onSelect={setActivePart}>
          {({ active: selected }) => (
            <>
              <circle cx="60" cy="58" r="25" fill={selected ? '#D3F0EC' : '#EAF7F6'} stroke={selected ? '#087F8C' : '#49C2AC'} strokeWidth={selected ? '3' : '2'} />
              <text x="60" y="63" textAnchor="middle" fill="#076A75" fontSize="16" fontWeight="700">P</text>
              <text x="60" y="25" textAnchor="middle" fill="#087F8C" fontSize="9" fontWeight="700">O</text>
              <text x="60" y="98" textAnchor="middle" fill="#087F8C" fontSize="9" fontWeight="700">O</text>
              <text x="28" y="61" textAnchor="middle" fill="#087F8C" fontSize="9" fontWeight="700">O</text>
              <text x="92" y="61" textAnchor="middle" fill="#087F8C" fontSize="9" fontWeight="700">O</text>
            </>
          )}
        </NucleotidePart>
        <NucleotidePart name="sugar" label="deoxyribose sugar" activePart={activePart} onSelect={setActivePart}>
          {({ active: selected }) => (
            <>
              <path
                d="m205 33 25-12 25 14-4 30-28 15-26-16z"
                fill={selected ? '#DDEAF5' : '#EEF5FA'}
                stroke={selected ? '#3478C8' : '#8EB6D9'}
                strokeWidth={selected ? '3' : '2'}
                strokeLinejoin="round"
              />
              <text x="230" y="51" textAnchor="middle" fill="#2C67AE" fontSize="11" fontWeight="700">2′</text>
              <text x="230" y="64" textAnchor="middle" fill="#2C67AE" fontSize="9" fontWeight="600">C</text>
              <circle cx="230" cy="20" r="3" fill="#25B8C8" />
            </>
          )}
        </NucleotidePart>
        <NucleotidePart name="base" label="nitrogenous base" activePart={activePart} onSelect={setActivePart}>
          {({ active: selected }) => (
            <>
              <rect x="327" y="34" width="100" height="48" rx="14" fill={selected ? '#D3F0EC' : '#EAF7F6'} stroke={selected ? '#087F8C' : '#B2E5DC'} strokeWidth={selected ? '3' : '2'} />
              <g fontFamily="ui-monospace, SFMono-Regular, Consolas, monospace" fontSize="11" fontWeight="700" textAnchor="middle">
                <text x="347" y="62" fill={BASE_COLORS.A.text}>A</text>
                <text x="370" y="62" fill={BASE_COLORS.T.text}>T</text>
                <text x="393" y="62" fill={BASE_COLORS.G.text}>G</text>
                <text x="414" y="62" fill={BASE_COLORS.C.text}>C</text>
              </g>
            </>
          )}
        </NucleotidePart>
        <text x="60" y="124" textAnchor="middle" fill="#607386" fontSize="10" fontWeight="600">Phosphate</text>
        <text x="230" y="124" textAnchor="middle" fill="#607386" fontSize="10" fontWeight="600">Deoxyribose sugar</text>
        <text x="377" y="124" textAnchor="middle" fill="#607386" fontSize="10" fontWeight="600">Nitrogenous base</text>
      </svg>
      <figcaption className="mt-2 flex min-h-9 items-center gap-2 rounded-xl bg-white/80 px-3 py-2 text-[11px] leading-5 text-slate-600" aria-live="polite">
        <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: active.color }} />
        <span><strong className="text-slate-800">{active.label}:</strong> {active.description}</span>
      </figcaption>
    </figure>
  );
}

const helixFeatures = {
  backbone: {
    label: 'Sugar–phosphate backbone',
    description: 'Covalently linked sugars and phosphates form the outside rails of each DNA strand.',
  },
  pairs: {
    label: 'Base pairs',
    description: 'A pairs with T and G with C across the helix, holding the two strands together.',
  },
  major: {
    label: 'Major groove',
    description: 'The wider groove exposes chemical patterns that many DNA-binding proteins recognize.',
  },
  minor: {
    label: 'Minor groove',
    description: 'The narrower groove is another surface where proteins and small molecules can interact with DNA.',
  },
};

const helixPairs = ['A-T', 'G-C', 'A-T', 'G-C', 'G-C', 'A-T', 'G-C', 'A-T', 'G-C', 'A-T'];

function createHelixPath(strandSide) {
  const points = Array.from({ length: 121 }, (_, index) => {
    const progress = index / 120;
    const y = 31 + progress * 368;
    const angle = progress * Math.PI * 4;
    const halfWidth = 62 + 42 * Math.cos(angle);
    const x = 200 + strandSide * halfWidth;
    return `${index === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`;
  });

  return points.join(' ');
}

export function HelixStructureExplorer() {
  const [activeFeature, setActiveFeature] = useState('pairs');
  const backboneOpacity = activeFeature === 'backbone' ? 1 : activeFeature === 'pairs' ? 0.78 : 0.64;
  const pairOpacity = activeFeature === 'pairs' ? 1 : activeFeature === 'backbone' ? 0.5 : 0.64;
  const grooveOpacity = activeFeature === 'major' || activeFeature === 'minor' ? 1 : 0.58;
  const leftStrand = createHelixPath(-1);
  const rightStrand = createHelixPath(1);

  return (
    <div className="mt-8 grid grid-cols-1 items-center gap-5 rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6 md:grid-cols-[1fr_1.2fr]">
      <div className="flex min-h-[380px] flex-col items-center justify-center overflow-hidden rounded-2xl border border-slate-200/70 bg-gradient-to-br from-slate-50 via-white to-teal-50/40 p-2 sm:min-h-[420px] sm:p-3">
        <svg viewBox="0 0 400 430" className="h-[370px] w-full max-w-[390px] overflow-visible sm:h-[400px]" role="img" aria-label={`DNA double helix diagram. ${helixFeatures[activeFeature].label} highlighted.`}>
          <style>{`
            .dna-helix-motion {
              transform-box: fill-box;
              transform-origin: center;
              animation: dna-helix-sway 9s ease-in-out infinite;
            }
            @keyframes dna-helix-sway {
              0%, 100% { transform: rotate(-0.45deg) translateY(0); }
              50% { transform: rotate(0.45deg) translateY(-2px); }
            }
            @media (prefers-reduced-motion: reduce) {
              .dna-helix-motion { animation: none; }
            }
          `}</style>
          <defs>
            <linearGradient id="helix-strand-blue" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#101F36" />
              <stop offset=".48" stopColor="#3478C8" />
              <stop offset="1" stopColor="#25B8C8" />
            </linearGradient>
            <linearGradient id="helix-strand-teal" x1="1" y1="0" x2="0" y2="0">
              <stop offset="0" stopColor="#101F36" />
              <stop offset=".5" stopColor="#087F8C" />
              <stop offset="1" stopColor="#24B8A5" />
            </linearGradient>
            <linearGradient id="helix-rung" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#3478C8" stopOpacity=".75" />
              <stop offset=".5" stopColor="#25B8C8" />
              <stop offset="1" stopColor="#24B8A5" stopOpacity=".75" />
            </linearGradient>
            <filter id="helix-soft-shadow" x="-.3" y="-.1" width="1.6" height="1.2">
              <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur" />
              <feOffset in="blur" dx="0" dy="2" result="offsetBlur" />
              <feFlood floodColor="#101F36" floodOpacity=".2" result="shadowColor" />
              <feComposite in="shadowColor" in2="offsetBlur" operator="in" result="shadow" />
              <feMerge>
                <feMergeNode in="shadow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <g className="dna-helix-motion">
            <ellipse cx="200" cy="215" rx="112" ry="188" fill="#087F8C" fillOpacity=".035" />

            {helixPairs.map((pair, index) => {
              const y = 48 + index * 36;
              const angle = (index / 10) * Math.PI * 4;
              const halfWidth = 62 + 42 * Math.cos(angle);
              const leftX = 200 - halfWidth;
              const rightX = 200 + halfWidth;
              const [leftBase, rightBase] = pair.split('-');
              const bondCount = pair === 'A-T' ? 2 : 3;

              return (
                <g key={`${pair}-${index}`} opacity={pairOpacity} aria-label={`${leftBase}-${rightBase} pair, ${bondCount} hydrogen bonds`}>
                  <path d={`M${leftX + 13} ${y}H${rightX - 13}`} stroke="#101F36" strokeOpacity=".12" strokeWidth="7" strokeLinecap="round" />
                  <path d={`M${leftX + 13} ${y}H${rightX - 13}`} stroke="url(#helix-rung)" strokeWidth="3" strokeLinecap="round" />
                  <rect x={leftX - 14} y={y - 12} width="28" height="24" rx="8" fill={BASE_COLORS[leftBase].hex} stroke={BASE_COLORS[leftBase].border} strokeWidth="1.5" />
                  <rect x={rightX - 14} y={y - 12} width="28" height="24" rx="8" fill={BASE_COLORS[rightBase].hex} stroke={BASE_COLORS[rightBase].border} strokeWidth="1.5" />
                  <text x={leftX} y={y + 4} textAnchor="middle" fill={BASE_COLORS[leftBase].text} fontFamily="ui-monospace, monospace" fontSize="12" fontWeight="700">{leftBase}</text>
                  <text x={rightX} y={y + 4} textAnchor="middle" fill={BASE_COLORS[rightBase].text} fontFamily="ui-monospace, monospace" fontSize="12" fontWeight="700">{rightBase}</text>
                  {Array.from({ length: bondCount }, (_, bondIndex) => {
                    const bondY = y + (bondIndex - (bondCount - 1) / 2) * 5;
                    return <line key={bondIndex} x1="193" y1={bondY} x2="207" y2={bondY} stroke="#F4F8FA" strokeWidth="2.5" strokeLinecap="round" />;
                  })}
                </g>
              );
            })}

            <g opacity={backboneOpacity} filter="url(#helix-soft-shadow)">
              <path d={leftStrand} fill="none" stroke="#101F36" strokeOpacity=".2" strokeWidth="13" strokeLinecap="round" />
              <path d={rightStrand} fill="none" stroke="#101F36" strokeOpacity=".2" strokeWidth="13" strokeLinecap="round" />
            </g>
            <g opacity={backboneOpacity}>
              <path d={leftStrand} fill="none" stroke="url(#helix-strand-blue)" strokeWidth="8" strokeLinecap="round" />
              <path d={rightStrand} fill="none" stroke="url(#helix-strand-teal)" strokeWidth="8" strokeLinecap="round" />
              <path d={leftStrand} fill="none" stroke="white" strokeOpacity=".32" strokeWidth="1.5" strokeLinecap="round" />
              <path d={rightStrand} fill="none" stroke="white" strokeOpacity=".3" strokeWidth="1.5" strokeLinecap="round" />
            </g>

            <g opacity={grooveOpacity}>
              <path d="M112 110 C98 124 98 151 112 165" fill="none" stroke={activeFeature === 'major' ? '#24B8A5' : '#3478C8'} strokeWidth={activeFeature === 'major' ? '4' : '2.5'} strokeLinecap="round" />
              <path d="M288 270 C299 278 299 291 288 299" fill="none" stroke={activeFeature === 'minor' ? '#24B8A5' : '#3478C8'} strokeWidth={activeFeature === 'minor' ? '4' : '2.5'} strokeLinecap="round" />
            </g>
            <g fill="#607386" fontFamily="ui-sans-serif, system-ui" fontSize="10" fontWeight="600">
              <text x="18" y="132" fill={activeFeature === 'major' ? '#087F8C' : '#607386'}>Major groove</text>
              <text x="300" y="289" fill={activeFeature === 'minor' ? '#087F8C' : '#607386'}>Minor groove</text>
            </g>
            <g fill="#607386" fontFamily="ui-monospace, monospace" fontSize="10" fontWeight="700">
              <text x="104" y="34">5′</text>
              <text x="278" y="34">3′</text>
              <text x="105" y="416">3′</text>
              <text x="278" y="416">5′</text>
            </g>
          </g>
        </svg>
        <div className="-mt-1 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 px-2 pb-1 text-[10px] font-medium text-slate-600">
          <span><strong className="font-mono text-blue-700">A–T</strong> ·· 2 hydrogen bonds</span>
          <span><strong className="font-mono text-teal-700">G–C</strong> ··· 3 hydrogen bonds</span>
        </div>
      </div>
      <div>
        <h4 className="text-sm font-semibold text-slate-900">Explore the double helix</h4>
        <p className="mt-1 text-xs leading-5 text-slate-500">Select a feature to see how the strands are organized.</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {Object.entries(helixFeatures).map(([key, feature]) => (
            <button
              key={key}
              type="button"
              onMouseEnter={() => setActiveFeature(key)}
              onFocus={() => setActiveFeature(key)}
              onClick={() => setActiveFeature(key)}
              aria-pressed={activeFeature === key}
              className={`rounded-full border px-3 py-1.5 text-[11px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
                activeFeature === key
                  ? 'border-indigo-200 bg-indigo-50 text-indigo-700'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-indigo-200'
              }`}
            >
              {feature.label}
            </button>
          ))}
        </div>
        <p className="mt-3 min-h-10 rounded-xl bg-indigo-50/70 px-3 py-2 text-xs leading-5 text-indigo-950" aria-live="polite">
          {helixFeatures[activeFeature].description}
        </p>
      </div>
    </div>
  );
}

export function DNASequenceExplorer() {
  const [sequence, setSequence] = useState('ACGTTGCA');
  const cleanedSequence = sequence.toUpperCase().replace(/\s/g, '');
  const isValid = /^[ACGT]*$/.test(cleanedSequence);
  const complement = isValid && cleanedSequence ? complementStrand(cleanedSequence) : '';

  return (
    <div className="mt-6 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-bold text-slate-900">DNA sequence explorer</h3>
          <p className="mt-1 text-xs leading-5 text-slate-500">Enter a strand to see its complementary sequence.</p>
        </div>
        <span className="rounded-full bg-teal-50 px-2.5 py-1 text-[10px] font-mono font-semibold text-teal-700">A ↔ T · G ↔ C</span>
      </div>
      <label htmlFor="dna-sequence-input" className="mt-4 block text-xs font-semibold text-slate-700">Sequence (A, C, G, T)</label>
      <input
        id="dna-sequence-input"
        value={sequence}
        maxLength={64}
        onChange={(event) => setSequence(event.target.value)}
        className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 font-mono text-sm uppercase tracking-wider text-slate-800 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
        placeholder="e.g. ACGTTGCA"
        aria-describedby="dna-sequence-result"
      />
      <div id="dna-sequence-result" className="mt-3 rounded-xl bg-slate-50 px-3 py-2.5" aria-live="polite">
        {!isValid ? (
          <p className="text-xs font-medium text-rose-700">Use only A, C, G, and T in a DNA sequence.</p>
        ) : !cleanedSequence ? (
          <p className="text-xs text-slate-500">Enter a sequence to generate its complement.</p>
        ) : (
          <div className="grid grid-cols-1 gap-2 text-xs sm:grid-cols-2">
            <p className="min-w-0"><span className="block text-[10px] font-semibold uppercase tracking-wide text-slate-400">Input · 5′ → 3′</span><code className="mt-1 block break-all font-mono font-semibold tracking-wider text-slate-800">{cleanedSequence}</code></p>
            <p className="min-w-0"><span className="block text-[10px] font-semibold uppercase tracking-wide text-slate-400">Complement · 3′ → 5′</span><code className="mt-1 block break-all font-mono font-semibold tracking-wider text-indigo-700">{complement}</code></p>
          </div>
        )}
      </div>
    </div>
  );
}
