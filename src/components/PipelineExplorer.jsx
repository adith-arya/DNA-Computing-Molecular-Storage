import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const stages = [
  {
    title: 'Digital Text',
    description: 'Start with the two Unicode characters. This example uses the ASCII-compatible UTF-8 bytes for “Hi”.',
    input: '“Hi”',
    output: 'H · i',
    process: 'Identify each character before serializing it as bytes.',
  },
  {
    title: 'Binary Conversion',
    description: 'Each UTF-8 byte is represented by eight binary digits.',
    input: 'H · i',
    output: '01001000 · 01101001',
    process: 'H = 0x48 (72); i = 0x69 (105).',
  },
  {
    title: 'Bit-Pair Grouping',
    description: 'Split the continuous bitstream into two-bit symbols, preserving the original order.',
    input: '01001000 · 01101001',
    output: '01 00 10 00 | 01 10 10 01',
    process: 'Four pairs represent each byte; the divider marks the character boundary.',
  },
  {
    title: 'DNA Encoding',
    description: 'Apply the project’s fixed mapping to each pair to generate the DNA sequence.',
    input: '01 00 10 00 | 01 10 10 01',
    output: 'C A G A | C G G C',
    process: '01→C, 00→A, 10→G, and 11→T; therefore “Hi” encodes as CAGACGGC.',
  },
  {
    title: 'Simulated Storage',
    description: 'The software retains the sequence as data; this step does not synthesize a physical molecule.',
    input: '5′-CAGACGGC-3′',
    output: 'Sequence represented in the simulator',
    process: 'Real storage would require oligonucleotide synthesis and controlled preservation.',
  },
  {
    title: 'DNA Decoding',
    description: 'Read each base and reverse the same two-bit mapping to reconstruct the binary stream.',
    input: '5′-CAGACGGC-3′',
    output: '01001000 · 01101001',
    process: 'C→01, A→00, G→10, and T→11; the resulting bits regroup into bytes.',
  },
  {
    title: 'Original Recovery',
    description: 'Decode the bytes as UTF-8 and compare them with the original input.',
    input: '01001000 · 01101001',
    output: '“Hi” · exact match',
    process: 'Both characters are recovered with no information loss in this error-free example.',
  },
];

export default function PipelineExplorer() {
  const [activeStage, setActiveStage] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const stage = stages[activeStage];
  const progress = ((activeStage + 1) / stages.length) * 100;

  useEffect(() => {
    if (!isRunning) return undefined;
    if (activeStage === stages.length - 1) {
      setIsRunning(false);
      return undefined;
    }

    const timer = setTimeout(() => {
      setActiveStage((current) => Math.min(current + 1, stages.length - 1));
    }, 850);
    return () => clearTimeout(timer);
  }, [activeStage, isRunning]);

  const selectStage = (index) => {
    setIsRunning(false);
    setActiveStage(index);
  };

  const runExample = () => {
    setActiveStage(0);
    setIsRunning(true);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-7">
        {stages.map((item, index) => {
          const selected = index === activeStage;
          const complete = index < activeStage;
          return (
            <button
              key={item.title}
              type="button"
              onClick={() => selectStage(index)}
              aria-pressed={selected}
              className={`min-h-[112px] rounded-2xl border p-3 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
                selected
                  ? 'border-indigo-300 bg-indigo-50 shadow-sm'
                  : complete
                  ? 'border-emerald-200 bg-emerald-50/50 hover:border-indigo-200'
                  : 'border-slate-200 bg-white hover:border-indigo-200 hover:bg-slate-50'
              }`}
            >
              <span className={`mb-2 flex h-6 w-6 items-center justify-center rounded-full font-mono text-[10px] font-bold ${
                complete ? 'bg-emerald-100 text-emerald-700' : selected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500'
              }`}>
                {complete ? '✓' : index + 1}
              </span>
              <span className="block text-xs font-semibold leading-4 text-slate-800">{item.title}</span>
              <span className="mt-1 block text-[10px] leading-4 text-slate-500">{item.process}</span>
            </button>
          );
        })}
      </div>

      <div className="rounded-3xl bg-slate-900 p-5 text-white shadow-xl sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.16em] text-indigo-300">Worked example · “Hi” → CAGACGGC → “Hi”</span>
            <h3 className="mt-1 text-xl font-bold text-white">{activeStage + 1}. {stage.title}</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={runExample}
              className="rounded-xl bg-indigo-500 px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-indigo-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-200"
            >
              {isRunning ? 'Running example…' : 'Run step by step'}
            </button>
            <button
              type="button"
              onClick={() => selectStage((activeStage + 1) % stages.length)}
              className="rounded-xl border border-slate-600 px-3.5 py-2 text-xs font-semibold text-slate-100 transition-colors hover:bg-dark-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-200"
            >
              Next stage
            </button>
          </div>
        </div>

        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-700" role="progressbar" aria-label="Pipeline example progress" aria-valuemin="1" aria-valuemax={stages.length} aria-valuenow={activeStage + 1}>
          <div className="h-full rounded-full bg-gradient-to-r from-indigo-400 to-teal-300 transition-[width] duration-500" style={{ width: `${progress}%` }} />
        </div>
        <div className="mt-1.5 flex justify-between text-[10px] font-mono text-slate-400">
          <span>Stage {activeStage + 1} of {stages.length}</span>
          <span>{Math.round(progress)}% complete</span>
        </div>

        <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-300">{stage.description}</p>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-slate-700 bg-dark-card/70 p-3.5">
            <span className="block text-[10px] font-mono uppercase tracking-wide text-slate-400">Input to this stage</span>
            <code className="mt-1.5 block break-all text-sm font-semibold text-slate-100">{stage.input}</code>
          </div>
          <div className="rounded-xl border border-indigo-400/20 bg-indigo-950/60 p-3.5">
            <span className="block text-[10px] font-mono uppercase tracking-wide text-indigo-300">Output from this stage</span>
            <code className="mt-1.5 block break-all text-sm font-semibold text-cyan-100">{stage.output}</code>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap justify-between gap-2 text-[10px] text-slate-400">
          <span>{activeStage > 0 ? `Previous: ${stages[activeStage - 1].title}` : 'Start of pipeline'}</span>
          <span>{activeStage < stages.length - 1 ? `Next: ${stages[activeStage + 1].title}` : 'End of pipeline · lossless recovery'}</span>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-700 pt-4">
          <p className="text-[11px] leading-5 text-slate-400">This is an error-free software example. Physical synthesis, storage, and sequencing are not performed.</p>
          <Link to="/simulator" className="text-xs font-semibold text-indigo-300 transition-colors hover:text-white">
            Run your own text in the simulator →
          </Link>
        </div>
      </div>
    </div>
  );
}
