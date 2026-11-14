import React, { useMemo, useState } from 'react';
import {
  BASE_COLORS,
  BIT_TO_BASE,
  bitsToBytes,
  bitsToDNA,
  bytesToBits,
  dnaToBits,
  textToBytes,
} from '../lib/dnaCodec';

function useTextEncoding(text) {
  return useMemo(() => {
    const bytes = textToBytes(text);
    const binary = bytesToBits(bytes);
    const pairs = binary.match(/.{2}/g) || [];
    return {
      bytes: Array.from(bytes),
      binary,
      byteGroups: binary.match(/.{8}/g) || [],
      pairs,
      dna: bitsToDNA(binary),
    };
  }, [text]);
}

function StepOutput({ number, title, children }) {
  return (
    <div className="min-w-0 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center gap-2">
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-50 font-mono text-[10px] font-bold text-indigo-700">{number}</span>
        <h4 className="text-xs font-semibold text-slate-800">{title}</h4>
      </div>
      <div className="min-h-8 break-words font-mono text-[11px] leading-5 text-slate-700 sm:text-xs">
        {children}
      </div>
    </div>
  );
}

export function InformationConverter() {
  const [text, setText] = useState('Hi');
  const [dnaInput, setDnaInput] = useState('CAGACGGC');
  const encoded = useTextEncoding(text);
  const cleanedDNA = dnaInput.toUpperCase().replace(/\s/g, '');

  const decoded = useMemo(() => {
    if (!cleanedDNA) return { error: 'Enter a DNA sequence using A, C, G, and T.' };
    if (!/^[ACGT]+$/.test(cleanedDNA)) {
      return { error: 'Invalid sequence: use only A, C, G, and T.' };
    }
    if (cleanedDNA.length % 4 !== 0) {
      return { error: 'A complete UTF-8 byte needs four bases (eight encoded bits). Add or remove bases to make a multiple of four.' };
    }

    const binary = dnaToBits(cleanedDNA);
    const bytes = bitsToBytes(binary);
    try {
      const recoveredText = new TextDecoder('utf-8', { fatal: true }).decode(bytes);
      return {
        binary,
        byteGroups: binary.match(/.{8}/g) || [],
        recoveredText,
        bytes: Array.from(bytes),
      };
    } catch {
      return { error: 'The sequence maps to complete bytes, but those bytes are not valid UTF-8 text.' };
    }
  }, [cleanedDNA]);

  return (
    <div className="mt-8 space-y-5">
      <div className="rounded-3xl border border-indigo-100 bg-indigo-50/40 p-5 sm:p-7">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.16em] text-indigo-600">Interactive conversion</span>
            <h3 className="mt-1 text-xl font-bold tracking-tight text-slate-900">Text → DNA</h3>
          </div>
          <span className="rounded-full bg-white px-3 py-1.5 font-mono text-[10px] text-slate-600 shadow-sm">UTF-8 · 00→A · 01→C · 10→G · 11→T</span>
        </div>
        <label htmlFor="dna-encode-text" className="mt-4 block text-xs font-semibold text-slate-700">Text to encode</label>
        <input
          id="dna-encode-text"
          value={text}
          maxLength={48}
          onChange={(event) => setText(event.target.value)}
          className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
          placeholder="Try Hi"
        />
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <StepOutput number="1" title="UTF-8 bytes">
            {encoded.bytes.length
              ? encoded.bytes.map((byte) => byte.toString(16).padStart(2, '0').toUpperCase()).join(' · ')
              : <span className="text-slate-400">Enter text to begin</span>}
          </StepOutput>
          <StepOutput number="2" title="8-bit binary">
            {encoded.byteGroups.length
              ? encoded.byteGroups.join(' ')
              : <span className="text-slate-400">No bytes yet</span>}
          </StepOutput>
          <StepOutput number="3" title="2-bit pairs">
            {encoded.pairs.length
              ? encoded.pairs.map((pair, index) => (
                  <React.Fragment key={`${pair}-${index}`}>
                    {index > 0 && index % 4 === 0 && <span className="mx-1 text-slate-300">|</span>}
                    <span className="mr-1 inline-block rounded bg-slate-100 px-1.5 py-0.5">{pair}</span>
                  </React.Fragment>
                ))
              : <span className="text-slate-400">No bit-pairs yet</span>}
          </StepOutput>
          <StepOutput number="4" title="DNA bases">
            {encoded.dna
              ? <span className="break-all tracking-widest">{Array.from(encoded.dna).map((base, index) => (
                  <span key={`${base}-${index}`} style={{ color: BASE_COLORS[base].text }}>{base}</span>
                ))}</span>
              : <span className="text-slate-400">No sequence yet</span>}
          </StepOutput>
        </div>
        <p className="mt-3 text-[11px] leading-5 text-slate-500">
          The simulator serializes text as UTF-8 bytes; the chosen two-bit mapping then assigns one nucleotide per pair.
        </p>
      </div>

      <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-7">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.16em] text-teal-700">Reverse conversion</span>
            <h3 className="mt-1 text-xl font-bold tracking-tight text-slate-900">DNA → text</h3>
          </div>
          <span className="text-[11px] text-slate-500">A valid base sequence must contain complete bytes.</span>
        </div>
        <label htmlFor="dna-decode-sequence" className="mt-4 block text-xs font-semibold text-slate-700">DNA sequence</label>
        <input
          id="dna-decode-sequence"
          value={dnaInput}
          maxLength={256}
          onChange={(event) => setDnaInput(event.target.value)}
          className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 font-mono text-sm uppercase tracking-wider text-slate-800 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
          placeholder="e.g. CAGACGGC"
          aria-describedby="dna-decode-output"
        />
        <div id="dna-decode-output" className="mt-3 rounded-xl bg-slate-50 p-3" aria-live="polite">
          {decoded.error ? (
            <p className="text-xs font-medium text-rose-700">{decoded.error}</p>
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <p className="min-w-0 text-xs"><span className="block text-[10px] font-semibold uppercase tracking-wide text-slate-400">Binary</span><code className="mt-1 block break-all font-mono text-slate-700">{decoded.byteGroups.join(' ')}</code></p>
              <p className="min-w-0 text-xs"><span className="block text-[10px] font-semibold uppercase tracking-wide text-slate-400">UTF-8 bytes</span><code className="mt-1 block break-all font-mono text-slate-700">{decoded.bytes.map((byte) => byte.toString(16).padStart(2, '0').toUpperCase()).join(' ')}</code></p>
              <p className="min-w-0 text-xs"><span className="block text-[10px] font-semibold uppercase tracking-wide text-slate-400">Recovered text</span><span className="mt-1 block break-all font-semibold text-teal-800">{decoded.recoveredText || '— (empty)'}</span></p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function InformationDensityExplorer() {
  const [payloadKiB, setPayloadKiB] = useState(128);
  const payloadBits = payloadKiB * 8192;
  const binarySymbols = payloadBits;
  const dnaBases = payloadBits / 2;

  return (
    <div className="mt-5 rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-7">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-bold text-slate-900">Information per symbol</h3>
          <p className="mt-1 text-xs leading-5 text-slate-500">Explore the theoretical symbol count for the same payload.</p>
        </div>
        <span className="rounded-full bg-indigo-50 px-3 py-1.5 font-mono text-[10px] font-semibold text-indigo-700">1 bit / binary symbol · 2 bits / DNA base</span>
      </div>
      <label htmlFor="density-payload" className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs font-medium text-slate-700">
        <span>Payload size</span><span className="font-mono text-indigo-700">{payloadKiB} KiB</span>
      </label>
      <input
        id="density-payload"
        type="range"
        min="1"
        max="1024"
        step="1"
        value={payloadKiB}
        onChange={(event) => setPayloadKiB(Number(event.target.value))}
        className="mt-2 w-full accent-indigo-600"
      />
      <div className="mt-4 space-y-3">
        <div>
          <div className="mb-1 flex justify-between gap-3 text-[11px]"><span className="font-medium text-slate-700">Binary symbols</span><span className="font-mono text-slate-500">{binarySymbols.toLocaleString()}</span></div>
          <div className="h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full w-full rounded-full bg-slate-400" /></div>
        </div>
        <div>
          <div className="mb-1 flex justify-between gap-3 text-[11px]"><span className="font-medium text-slate-700">DNA bases at 2-bit encoding</span><span className="font-mono text-indigo-700">{dnaBases.toLocaleString()}</span></div>
          <div className="h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full w-1/2 rounded-full bg-gradient-to-r from-indigo-500 to-teal-500" /></div>
        </div>
      </div>
      <p className="mt-4 rounded-xl border border-amber-100 bg-amber-50/70 px-3 py-2.5 text-[11px] leading-5 text-amber-900">
        This compares ideal symbol counts only. Two bits per nucleotide is a theoretical encoding capacity; indexing, primers, redundancy, biochemical constraints, and synthesis/sequencing limits reduce practical net density.
      </p>
    </div>
  );
}
