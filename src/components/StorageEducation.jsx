import React, { useState } from 'react';

const lifecycleStages = [
  {
    title: 'Encoding',
    tag: 'Sequence design',
    summary: 'Convert data to DNA oligonucleotides.',
    details: 'Bytes are mapped to bases, split into oligonucleotides, and tagged with addresses and error-correction information. Design rules can balance GC content and avoid long homopolymers.',
    output: 'Designed, indexed DNA sequences',
  },
  {
    title: 'Writing',
    tag: 'DNA synthesis',
    summary: 'Chemically or enzymatically build strands.',
    details: 'Phosphoramidite synthesis adds bases through repeated chemical cycles. Enzymatic methods, including terminal deoxynucleotidyl transferase approaches, are also being developed; oligos may then be assembled and checked.',
    output: 'Physical synthetic oligonucleotides',
  },
  {
    title: 'Storage',
    tag: 'Preservation',
    summary: 'Protect DNA from chemical degradation.',
    details: 'Dry, cool, dark conditions slow degradation. Silica encapsulation and careful control of temperature and humidity are studied to improve preservation; DNA is not immune to damage.',
    output: 'Protected DNA sample',
  },
  {
    title: 'Reading',
    tag: 'Retrieval',
    summary: 'Amplify, sequence, and reconstruct.',
    details: 'PCR can amplify selected strands using primers. Sequencing instruments read the bases; software then sorts fragments by address, applies error correction, and rebuilds the original data.',
    output: 'Reconstructed digital file',
  },
];

export function LifecycleExplorer() {
  const [activeStage, setActiveStage] = useState(0);
  const stage = lifecycleStages[activeStage];

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
      <div className="mb-5 text-center">
        <h3 className="text-lg font-bold text-slate-900">Explore the biochemical lifecycle</h3>
        <p className="mt-1 text-xs leading-5 text-slate-500">Select a stage to see the laboratory process and its output.</p>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {lifecycleStages.map((item, index) => (
          <button
            key={item.title}
            type="button"
            onClick={() => setActiveStage(index)}
            aria-pressed={activeStage === index}
            className={`rounded-xl border p-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
              activeStage === index
                ? 'border-indigo-300 bg-indigo-50'
                : 'border-slate-200 bg-slate-50 hover:border-indigo-200 hover:bg-white'
            }`}
          >
            <span className="block text-[10px] font-mono font-bold uppercase tracking-wide text-indigo-600">0{index + 1} · {item.tag}</span>
            <span className="mt-1 block text-sm font-semibold text-slate-800">{item.title}</span>
            <span className="mt-1 block text-[10px] leading-4 text-slate-500">{item.summary}</span>
          </button>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-[1fr_auto]">
        <div className="rounded-2xl bg-slate-50 p-4">
          <h4 className="text-sm font-semibold text-slate-900">{stage.title}: {stage.tag}</h4>
          <p className="mt-1.5 text-xs leading-5 text-slate-600">{stage.details}</p>
        </div>
        <div className="flex items-center gap-2 rounded-2xl border border-indigo-100 bg-indigo-50/60 p-4 md:max-w-[230px]">
          <span className="h-2 w-2 shrink-0 rounded-full bg-teal-500" />
          <p className="text-xs leading-5 text-indigo-950"><span className="block text-[10px] font-semibold uppercase tracking-wide text-indigo-600">Stage output</span>{stage.output}</p>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-100 px-3 py-2.5">
          <h5 className="text-[11px] font-semibold text-slate-800">Oligonucleotide</h5>
          <p className="mt-1 text-[10px] leading-4 text-slate-500">A short DNA strand; files use many addressed fragments rather than one long molecule.</p>
        </div>
        <div className="rounded-xl border border-slate-100 px-3 py-2.5">
          <h5 className="text-[11px] font-semibold text-slate-800">PCR amplification</h5>
          <p className="mt-1 text-[10px] leading-4 text-slate-500">Copies selected DNA regions using primers and polymerase; amplification can introduce bias.</p>
        </div>
        <div className="rounded-xl border border-slate-100 px-3 py-2.5">
          <h5 className="text-[11px] font-semibold text-slate-800">Sequencing</h5>
          <p className="mt-1 text-[10px] leading-4 text-slate-500">Reads nucleotide order so indexed fragments can be checked and decoded.</p>
        </div>
      </div>
      <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50/70 px-3 py-2.5 text-[11px] leading-5 text-amber-900">
        <strong className="font-semibold">Simulation boundary:</strong> HelixLab models sequence encoding, storage, and recovery in software. It does not synthesize, preserve, amplify, or sequence physical DNA.
      </p>
    </div>
  );
}

export function StorageComparison() {
  const rows = [
    ['Storage medium', 'Magnetic disks', 'Flash memory', 'Magnetic tape', 'Nucleotide sequences'],
    ['Access', 'Random', 'Random', 'Sequential', 'Sequence-dependent'],
    ['Longevity', 'Varies by use and conditions', 'Varies by use and conditions', 'Long-term with maintenance', 'Potentially long under suitable conditions'],
    ['Power', 'During operation', 'During operation', 'During operation', 'None for passive preservation'],
    ['Retrieval', 'Fast', 'Very fast', 'Slower', 'Currently slow and specialized'],
  ];

  return (
    <div className="mt-8 rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-7">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.16em] text-indigo-600">Trade-offs</span>
          <h3 className="mt-1 text-lg font-bold text-slate-900">DNA and established storage media</h3>
        </div>
        <span className="text-[10px] text-slate-500">Qualitative comparison</span>
      </div>
      <div className="overflow-x-auto rounded-xl border border-slate-200">
        <table className="min-w-[700px] w-full table-fixed text-left text-[11px]">
          <thead className="bg-slate-50 text-slate-700">
            <tr>
              {['Parameter', 'HDD', 'SSD', 'Magnetic tape', 'DNA storage'].map((head) => (
                <th key={head} scope="col" className={`px-3 py-2.5 font-semibold ${head === 'Parameter' ? 'w-[16%]' : 'w-[21%]'}`}>{head}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-600">
            {rows.map(([label, ...values]) => (
              <tr key={label}>
                <th scope="row" className="bg-slate-50/60 px-3 py-2.5 font-semibold text-slate-700">{label}</th>
                {values.map((value, index) => (
                  <td key={`${label}-${index}`} className={`px-3 py-2.5 leading-4 ${index === 3 ? 'bg-indigo-50/40 text-indigo-950' : ''}`}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-[11px] leading-5 text-slate-500">
        DNA storage is a research-stage archival approach, not a practical replacement for everyday computing: synthesis and sequencing remain costly and slow compared with conventional media.
      </p>
    </div>
  );
}

export function StorageDensityExplorer() {
  const [payloadMiB, setPayloadMiB] = useState(1);
  const encodedBases = payloadMiB * 8 * 1024 * 1024 / 2;
  const formattedBases = new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 2 }).format(encodedBases);
  const illustrationScale = Math.min(20 + Math.log2(payloadMiB + 1) * 12, 100);

  return (
    <div className="mt-5 grid grid-cols-1 items-center gap-5 rounded-3xl border border-indigo-100 bg-indigo-50/40 p-5 sm:p-6 md:grid-cols-[1fr_180px]">
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-slate-900">Theoretical molecular density</h3>
            <p className="mt-1 text-xs leading-5 text-slate-600">At two bits per base, a compact amount of DNA can encode many symbols.</p>
          </div>
          <span className="rounded-full bg-white px-3 py-1.5 font-mono text-[10px] text-indigo-700 shadow-sm">Illustrative, not to scale</span>
        </div>
        <label htmlFor="storage-density-size" className="mt-4 flex items-center justify-between text-xs font-medium text-slate-700">
          <span>Digital payload</span><span className="font-mono text-indigo-700">{payloadMiB} MiB</span>
        </label>
        <input id="storage-density-size" type="range" min="1" max="1024" value={payloadMiB} onChange={(event) => setPayloadMiB(Number(event.target.value))} className="mt-2 w-full accent-indigo-600" />
        <p className="mt-2 text-xs text-slate-600">Ideal encoded sequence: <strong className="font-mono text-slate-900">≈ {formattedBases} nucleotide bases</strong>, before indexing, primers, redundancy, and biochemical constraints.</p>
      </div>
      <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full border border-indigo-200 bg-white shadow-sm" aria-hidden="true">
        <svg viewBox="0 0 100 100" className="h-24 w-24">
          <path d="M37 20c25 12 1 21 26 31S38 70 63 81M63 20C38 32 62 41 37 51s25 19 0 30" fill="none" stroke="#3478C8" strokeWidth="3" strokeLinecap="round" />
          <path d="M37 20c25 12 1 21 26 31S38 70 63 81M63 20C38 32 62 41 37 51s25 19 0 30" fill="none" stroke="#087F8C" strokeWidth="2" strokeLinecap="round" strokeDasharray="1 100" strokeDashoffset="0" />
          <g stroke="#25B8C8" strokeWidth="1.5" opacity=".8">
            {Array.from({ length: 5 }, (_, index) => {
              const y = 27 + index * 12;
              return <line key={y} x1={37 + (index % 2) * 3} y1={y} x2={63 - (index % 2) * 3} y2={y} />;
            })}
          </g>
          <circle cx="50" cy="50" r={illustrationScale / 2} fill="#3478C8" fillOpacity=".06" stroke="#087F8C" strokeOpacity=".35" />
        </svg>
      </div>
    </div>
  );
}
