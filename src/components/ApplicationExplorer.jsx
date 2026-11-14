import React, { useState } from 'react';

const applications = [
  {
    id: 'archive',
    icon: '🏛️',
    title: 'Cold archival storage',
    status: 'Research prototypes',
    summary: 'Explore how DNA could preserve infrequently accessed digital records.',
    detail: 'Potential fit: valuable, rarely retrieved data where long-term preservation matters more than access speed. Synthesis, sequencing, and system-level costs remain major barriers to routine deployment.',
  },
  {
    id: 'recording',
    icon: '🧫',
    title: 'Cellular recording',
    status: 'Active research',
    summary: 'Investigate molecular recording of selected events in engineered cells.',
    detail: 'Research systems can write event histories into biological material, for example through CRISPR-associated recording. These are specialized experimental systems—not general-purpose digital archives or clinical diagnostic products.',
  },
  {
    id: 'circuits',
    icon: '⚙️',
    title: 'Molecular circuits',
    status: 'Experimental',
    summary: 'See how designed strands can implement small biochemical circuits.',
    detail: 'Strand-displacement and other nucleic-acid circuits can process molecular inputs in vitro. Scale, reaction speed, leakage, and reliable interfacing with real-world systems remain active engineering challenges.',
  },
  {
    id: 'security',
    icon: '🔐',
    title: 'DNA steganography',
    status: 'Research concept',
    summary: 'Consider how DNA can carry encoded payloads alongside ordinary data.',
    detail: 'DNA has been studied as a medium for encoding concealed payloads. This is a specialized research idea, not an inherent security guarantee: encoded DNA is still subject to discovery, analysis, and ordinary cryptographic requirements.',
  },
];

export default function ApplicationExplorer() {
  const [selectedId, setSelectedId] = useState(applications[0].id);
  const selected = applications.find((application) => application.id === selectedId);

  return (
    <div className="mt-8">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4" role="group" aria-label="Select a DNA technology application">
        {applications.map((application) => (
          <button
            key={application.id}
            type="button"
            onClick={() => setSelectedId(application.id)}
            aria-pressed={selected.id === application.id}
            className={`rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 hover:border-indigo-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
              selected.id === application.id ? 'border-indigo-300 bg-indigo-50/70 shadow-sm' : 'border-slate-200 bg-white'
            }`}
          >
            <span className="flex items-center justify-between gap-2">
              <span className="text-2xl" aria-hidden="true">{application.icon}</span>
              <span className="rounded-full bg-slate-100 px-2 py-1 text-[9px] font-semibold text-slate-600">{application.status}</span>
            </span>
            <span className="mt-3 block text-sm font-bold text-slate-800">{application.title}</span>
            <span className="mt-1 block text-xs leading-5 text-slate-600">{application.summary}</span>
          </button>
        ))}
      </div>
      <div className="mt-3 rounded-2xl border border-slate-200 bg-white px-4 py-3" aria-live="polite">
        <p className="text-xs leading-5 text-slate-600"><strong className="text-slate-800">{selected.title}:</strong> {selected.detail}</p>
      </div>
    </div>
  );
}
