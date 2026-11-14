import React, { useState } from 'react';

const gates = ['AND', 'OR', 'NOT'];

export default function MolecularComputingLab() {
  const [gate, setGate] = useState('AND');
  const [inputA, setInputA] = useState(1);
  const [inputB, setInputB] = useState(1);
  const output = gate === 'AND'
    ? Number(Boolean(inputA && inputB))
    : gate === 'OR'
    ? Number(Boolean(inputA || inputB))
    : Number(!inputA);

  return (
    <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
      <section className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6" aria-labelledby="logic-gate-title">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.16em] text-indigo-600">Interactive concept</span>
            <h3 id="logic-gate-title" className="mt-1 text-lg font-bold text-slate-900">Molecular logic gates</h3>
          </div>
          <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-semibold text-amber-800">Conceptual model</span>
        </div>

        <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Select a logic gate">
          {gates.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setGate(item)}
              aria-pressed={gate === item}
              className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
                gate === item ? 'border-indigo-300 bg-indigo-50 text-indigo-700' : 'border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-3 rounded-2xl bg-slate-50 p-4" aria-live="polite">
          <button
            type="button"
            onClick={() => setInputA((value) => Number(!value))}
            aria-pressed={Boolean(inputA)}
            aria-label={`Input A is ${inputA}; toggle`}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-mono font-bold text-slate-800 shadow-sm transition hover:border-indigo-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
          >
            A = {inputA}
          </button>
          {gate !== 'NOT' && (
            <button
              type="button"
              onClick={() => setInputB((value) => Number(!value))}
              aria-pressed={Boolean(inputB)}
              aria-label={`Input B is ${inputB}; toggle`}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-mono font-bold text-slate-800 shadow-sm transition hover:border-indigo-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
            >
              B = {inputB}
            </button>
          )}
          <span className="font-mono text-lg text-indigo-400" aria-hidden="true">→</span>
          <div className="rounded-xl bg-indigo-600 px-4 py-2 text-center text-sm font-mono font-bold text-white">
            {gate} → {output}
          </div>
        </div>
        <p className="mt-3 text-[11px] leading-5 text-slate-500">
          {gate === 'NOT'
            ? 'NOT inverts its single input.'
            : `${gate} computes a Boolean output from two inputs; set either input to 0 or 1 to test the truth table.`}
        </p>
        <p className="mt-3 rounded-xl border border-amber-100 bg-amber-50/70 px-3 py-2 text-[10px] leading-4 text-amber-900">
          This is a simplified logic model, not a laboratory-validated chemical reaction simulator.
        </p>
      </section>

      <section className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6" aria-labelledby="strand-displacement-title">
        <span className="text-[10px] font-mono font-bold uppercase tracking-[0.16em] text-teal-700">Reaction concept</span>
        <h3 id="strand-displacement-title" className="mt-1 text-lg font-bold text-slate-900">Strand displacement</h3>
        <p className="mt-1 text-xs leading-5 text-slate-600">An invading strand binds a short exposed toehold, then branch migration can displace an incumbent strand.</p>

        <svg viewBox="0 0 540 156" className="mt-4 h-auto w-full rounded-2xl bg-slate-50 p-2" role="img" aria-label="Three-step conceptual diagram: an invader binds a toehold and displaces an incumbent strand">
          <g fontFamily="ui-sans-serif, system-ui" fontSize="10" fontWeight="600" fill="#101F36" textAnchor="middle">
            <text x="85" y="18">1 · Duplex</text>
            <text x="270" y="18">2 · Toehold binding</text>
            <text x="455" y="18">3 · Displacement</text>
          </g>
          <g strokeLinecap="round" strokeWidth="5">
            <path d="M25 67h45" stroke="#087F8C" />
            <path d="M70 67h70" stroke="#3478C8" />
            <path d="M70 90h70" stroke="#DCE9EF" />
            <path d="M140 90h28" stroke="#DCE9EF" strokeDasharray="3 4" />

            <path d="M210 67h45" stroke="#087F8C" />
            <path d="M255 67h62" stroke="#3478C8" />
            <path d="M255 90h62" stroke="#DCE9EF" />
            <path d="M214 112h80" stroke="#24B8A5" />
            <path d="M214 112h20" stroke="#25B8C8" strokeWidth="7" />

            <path d="M395 67h45" stroke="#087F8C" />
            <path d="M440 67h62" stroke="#3478C8" />
            <path d="M440 90h62" stroke="#24B8A5" />
            <path d="M395 112h45" stroke="#25B8C8" />
          </g>
          <g fontFamily="ui-monospace, monospace" fontSize="9" fontWeight="700">
            <text x="35" y="56" fill="#087F8C">t</text><text x="96" y="56" fill="#2C67AE">x</text>
            <text x="220" y="56" fill="#087F8C">t</text><text x="275" y="56" fill="#2C67AE">x</text>
            <text x="220" y="128" fill="#087F8C">invader</text>
            <text x="464" y="56" fill="#2C67AE">target</text>
            <text x="455" y="128" fill="#126B7A">displaced</text>
          </g>
          <g fill="#25B8C8" stroke="white" strokeWidth="2">
            <circle cx="35" cy="67" r="5" /><circle cx="220" cy="67" r="5" /><circle cx="405" cy="112" r="5" />
          </g>
          <path d="M171 78h20m-6-6 6 6-6 6M356 78h20m-6-6 6 6-6 6" fill="none" stroke="#8CA0B0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-slate-500">
          <span><strong className="text-teal-700">t</strong> = toehold</span>
          <span><strong className="text-blue-700">x</strong> = paired domain</span>
          <span><strong className="text-violet-700">invader</strong> = incoming strand</span>
        </div>
        <p className="mt-2 text-[10px] leading-4 text-slate-500">A conceptual schematic; actual strand-displacement circuits depend on sequence design, temperature, concentrations, and reaction kinetics.</p>
      </section>
    </div>
  );
}
