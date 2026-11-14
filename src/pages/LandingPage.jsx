import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowRight, Dna, Link2, Workflow } from 'lucide-react';
import DoubleHelix from '../components/DoubleHelix';
import NucleotideParticles from '../components/NucleotideParticles';
import HelixDivider from '../components/HelixDivider';
import ScrollProgress from '../components/ScrollProgress';
import BaseCard from '../components/BaseCard';
import {
  DNASequenceExplorer,
  HelixStructureExplorer,
  NucleotideDiagram,
} from '../components/DNAConceptExplorers';
import {
  InformationConverter,
  InformationDensityExplorer,
} from '../components/InformationMediumLab';
import PipelineExplorer from '../components/PipelineExplorer';
import {
  LifecycleExplorer,
  StorageComparison,
  StorageDensityExplorer,
} from '../components/StorageEducation';
import MolecularComputingLab from '../components/MolecularComputingLab';
import ApplicationExplorer from '../components/ApplicationExplorer';
import { BASE_COLORS, BIT_TO_BASE, COMPLEMENT } from '../lib/dnaCodec';

export default function LandingPage() {
  // Interactive state for complementary base pairing demo
  const [hoveredBase, setHoveredBase] = useState(null);
  const [selectedDemoBase, setSelectedDemoBase] = useState(null);
  const shouldReduceMotion = useReducedMotion();

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const sampleOligoStrand = ['A', 'T', 'G', 'C', 'C', 'A', 'T', 'G'];
  const sampleComplementStrand = ['T', 'A', 'C', 'G', 'G', 'T', 'A', 'C'];

  return (
    <div className="relative min-h-screen bg-background text-text-main overflow-x-hidden">
      <ScrollProgress />

      {/* ========================================================
          SECTION 1: HERO
      ======================================================== */}
      <section className="relative isolate overflow-hidden bg-[#101F36] text-white">
        <NucleotideParticles count={30} className="opacity-75" />
        <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_72%_42%,rgba(8,127,140,0.18),transparent_36%),radial-gradient(ellipse_at_18%_75%,rgba(52,120,200,0.08),transparent_35%)]" />
        <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.08] [background-image:linear-gradient(rgba(126,217,224,0.24)_1px,transparent_1px),linear-gradient(90deg,rgba(126,217,224,0.24)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 pb-6 pt-10 sm:px-6 sm:pt-14 lg:px-8 lg:pt-12">
          <div className="grid grid-cols-1 items-center gap-8 lg:min-h-[610px] lg:grid-cols-12 lg:gap-6">
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: 'easeOut' }}
              className="space-y-6 pt-1 text-center lg:col-span-7 lg:space-y-7 lg:pt-2 lg:text-left"
            >
              <h1 className="mx-auto max-w-3xl text-[clamp(2.45rem,5.25vw,4.65rem)] font-bold leading-[1.04] tracking-[-0.045em] text-white lg:mx-0">
                DNA Computing
                <span className="block pt-1 text-[0.78em] font-semibold tracking-[-0.035em] text-slate-200">
                  &amp;{' '}
                  <span className="bg-gradient-to-r from-[#24B8A5] via-[#3478C8] to-[#25B8C8] bg-clip-text text-transparent">
                    Molecular Data Storage
                  </span>
                </span>
              </h1>

              <p className="mx-auto max-w-2xl text-sm font-light leading-7 text-slate-300 sm:text-base sm:leading-8 lg:mx-0">
                Explore how the molecule of life can carry digital information. Discover the science behind encoding data into synthetic DNA and processing it at the molecular scale.
              </p>

              <div className="mx-auto max-w-xl rounded-2xl border border-white/10 bg-white/[0.045] p-4 text-left shadow-[0_18px_60px_rgba(2,6,23,0.22)] backdrop-blur-sm sm:p-5 lg:mx-0">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-semibold tracking-wide text-slate-100 sm:text-sm">
                    From digital bits to DNA
                  </span>
                  <span className="rounded-full border border-indigo-300/15 bg-indigo-300/[0.08] px-2.5 py-1 font-mono text-[10px] text-indigo-200">
                    2 bits → 1 base
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {['00', '01', '10', '11'].map((bits, index) => {
                    const base = BIT_TO_BASE[bits];
                    const baseInfo = BASE_COLORS[base];
                    const isSelected = selectedDemoBase === base;

                    return (
                      <motion.button
                        key={bits}
                        type="button"
                        initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: shouldReduceMotion ? 0 : 0.12 + index * 0.08 }}
                        whileHover={shouldReduceMotion ? undefined : { y: -2 }}
                        onMouseEnter={() => setSelectedDemoBase(base)}
                        onFocus={() => setSelectedDemoBase(base)}
                        onClick={() => setSelectedDemoBase(base)}
                        aria-label={`${bits} maps to ${baseInfo.name}, ${base}`}
                        aria-pressed={isSelected}
                        className={`group flex min-w-0 flex-col items-center gap-1.5 rounded-xl border px-1.5 py-2 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 sm:py-2.5 ${
                          isSelected
                            ? 'border-indigo-300/50 bg-indigo-300/[0.12]'
                            : 'border-white/[0.07] bg-slate-950/20 hover:border-white/20 hover:bg-white/[0.07]'
                        }`}
                      >
                        <span className="font-mono text-[11px] tracking-wider text-slate-400">
                          {bits}
                        </span>
                        <span
                          className="flex h-8 w-8 items-center justify-center rounded-lg font-mono text-lg font-bold shadow-sm transition-transform duration-200 group-hover:scale-105"
                          style={{
                            color: baseInfo.hex,
                            backgroundColor: `${baseInfo.hex}18`,
                            border: `1px solid ${baseInfo.hex}55`,
                          }}
                        >
                          {base}
                        </span>
                        <span className="truncate text-[9px] text-slate-400 sm:text-[10px]">
                          {baseInfo.name}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
                <p className="mt-3 min-h-5 text-center text-[11px] leading-relaxed text-slate-400 sm:text-left">
                  {selectedDemoBase
                    ? `${selectedDemoBase} is ${BASE_COLORS[selectedDemoBase].name}, paired with ${BASE_COLORS[selectedDemoBase].pair}.`
                    : 'Four nucleotide bases form a compact alphabet for encoding information.'}
                </p>
              </div>

              <div className="flex flex-col items-stretch justify-center gap-3 pt-1 sm:flex-row sm:items-center lg:justify-start">
                <Link
                  to="/simulator"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 via-indigo-500 to-violet-500 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-950/40 transition duration-200 hover:-translate-y-0.5 hover:from-indigo-400 hover:to-violet-400 hover:shadow-indigo-500/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 active:translate-y-0 sm:px-6"
                >
                  Launch Interactive Simulator
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                </Link>
                <button
                  type="button"
                  onClick={() => scrollToSection('section-what-is-dna')}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.045] px-5 py-3.5 text-sm font-semibold text-slate-100 transition duration-200 hover:-translate-y-0.5 hover:border-indigo-200/40 hover:bg-white/[0.09] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 active:translate-y-0 sm:px-6"
                >
                  Explore the Theory
                  <ArrowDown className="h-4 w-4 text-indigo-200" aria-hidden="true" />
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: shouldReduceMotion ? 0 : 0.15, ease: 'easeOut' }}
              className="relative mx-auto flex w-full max-w-[430px] items-center justify-center lg:col-span-5 lg:max-w-none"
            >
              <div className="pointer-events-none absolute inset-[14%] rounded-full bg-indigo-500/20 blur-[70px]" />
              <div className="pointer-events-none absolute h-[82%] w-[82%] rounded-full border border-indigo-200/[0.08] shadow-[0_0_80px_rgba(8,127,140,0.09)]" />
              <div className="pointer-events-none absolute h-[65%] w-[65%] rounded-full border border-dashed border-cyan-200/[0.11]" />
              <div className="absolute right-[8%] top-[15%] z-10 rounded-full border border-white/10 bg-slate-950/50 px-3 py-1.5 font-mono text-[10px] tracking-wide text-cyan-100/80 backdrop-blur-sm">
                A — T
              </div>
              <div className="absolute bottom-[18%] left-[5%] z-10 rounded-full border border-white/10 bg-slate-950/50 px-3 py-1.5 font-mono text-[10px] tracking-wide text-violet-100/80 backdrop-blur-sm">
                G — C
              </div>
              <DoubleHelix
                width={360}
                height={450}
                speed={0.48}
                className="relative z-[1] drop-shadow-[0_0_26px_rgba(36,184,165,0.2)]"
              />
              <span className="absolute bottom-2 z-10 text-center font-mono text-[9px] uppercase tracking-[0.18em] text-indigo-100/55 sm:text-[10px]">
                Complementary strands · molecular scale
              </span>
            </motion.div>
          </div>

          <div className="mt-8 grid grid-cols-3 divide-x divide-white/10 border-t border-white/10 py-4 sm:mt-10 sm:py-5">
            {[
              { label: 'Nucleotide Bases', value: '4', Icon: Dna },
              { label: 'Complementary Pairs', value: '2', Icon: Link2 },
              { label: 'Computational Stages', value: '7', Icon: Workflow },
            ].map(({ label, value, Icon }) => (
              <div key={label} className="flex items-center justify-center gap-2 px-2 text-center sm:gap-3">
                <Icon className="h-4 w-4 shrink-0 text-indigo-300 sm:h-5 sm:w-5" strokeWidth={1.7} aria-hidden="true" />
                <p className="flex flex-col items-start text-left">
                  <span className="text-sm font-semibold leading-tight text-white sm:text-base">{value}</span>
                  <span className="mt-0.5 text-[9px] leading-tight text-slate-400 sm:text-[11px]">{label}</span>
                </p>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => scrollToSection('section-what-is-dna')}
            className="mx-auto mt-1 flex items-center gap-2 rounded-full px-3 py-2 text-[10px] font-medium uppercase tracking-[0.18em] text-slate-400 transition-colors hover:text-indigo-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300"
            aria-label="Scroll to DNA basics"
          >
            Discover the science
            <ArrowDown className="h-3.5 w-3.5 animate-pulse" aria-hidden="true" />
          </button>
        </div>
      </section>

      {/* ========================================================
          SECTION 2: WHAT IS DNA?
      ======================================================== */}
      <section id="section-what-is-dna" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto scroll-mt-20">
        <div className="relative mx-auto mb-10 max-w-3xl text-center sm:mb-12">
          <Dna
            className="pointer-events-none absolute -right-4 -top-4 hidden h-16 w-16 text-indigo-200/50 sm:block"
            strokeWidth={1}
            aria-hidden="true"
          />
          <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200/70 bg-indigo-50 px-3 py-1.5 text-[11px] font-mono font-bold uppercase tracking-[0.16em] text-indigo-700">
            <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
            Molecular Fundamentals
          </span>
          <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">
            What is Deoxyribonucleic Acid (DNA)?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            DNA is a polymer made of repeating nucleotide units. In living cells it stores genetic information; its four-base alphabet also makes it a promising medium for molecular data storage.
          </p>
        </div>

        {/* Nucleotide Anatomy & Complementary Base Pairing */}
        <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2 lg:gap-7">
          {/* Anatomy Card */}
          <article className="flex h-full flex-col gap-5 rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm shadow-slate-900/[0.03] transition-shadow duration-300 hover:shadow-lg hover:shadow-indigo-950/[0.06] sm:p-7">
            <div>
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-50 to-cyan-50 text-indigo-600">
                <Dna className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold tracking-tight text-slate-900">
                Anatomy of a Nucleotide
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Every nucleotide combines three covalently bonded components:
              </p>
            </div>

            <NucleotideDiagram />

            <div className="divide-y divide-slate-100">
              <div className="flex gap-3 py-3 first:pt-0">
                <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-400 ring-4 ring-emerald-50" />
                <div>
                  <h4 className="text-sm font-semibold text-slate-800">Phosphate group</h4>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    A negatively charged phosphate forms phosphodiester links between the 3′ carbon of one sugar and the 5′ carbon of the next.
                  </p>
                </div>
              </div>
              <div className="flex gap-3 py-3">
                <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-sky-400 ring-4 ring-sky-50" />
                <div>
                  <h4 className="text-sm font-semibold text-slate-800">Deoxyribose pentose sugar</h4>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    A five-carbon sugar with hydrogen instead of a hydroxyl group at the 2′ carbon, contributing to DNA’s stability relative to RNA.
                  </p>
                </div>
              </div>
              <div className="flex gap-3 py-3 last:pb-0">
                <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-fuchsia-400 ring-4 ring-fuchsia-50" />
                <div>
                  <h4 className="text-sm font-semibold text-slate-800">Nitrogenous base</h4>
                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    The variable information carrier. Purines (Adenine and Guanine) pair with pyrimidines (Thymine and Cytosine) via hydrogen bonds.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-auto flex gap-3 rounded-2xl border border-indigo-100 bg-indigo-50/70 p-4">
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white text-indigo-600 shadow-sm" aria-hidden="true">
                <Link2 className="h-4 w-4" />
              </span>
              <p className="text-xs leading-5 text-indigo-950">
                <strong className="font-semibold">How a strand forms:</strong> Nucleotides join through 3′–5′ phosphodiester bonds, building the repeating sugar–phosphate backbone.
              </p>
            </div>
          </article>

          {/* Interactive Complementary Pairing Card */}
          <article className="flex h-full flex-col gap-5 rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm shadow-slate-900/[0.03] transition-shadow duration-300 hover:shadow-lg hover:shadow-indigo-950/[0.06] sm:p-7">
            <div>
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-50 to-emerald-50 text-teal-700">
                <Link2 className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-xl font-bold tracking-tight text-slate-900">
                  Complementary Base Pairing
                </h3>
                <span className="rounded-full border border-indigo-100 bg-indigo-50 px-2.5 py-1 text-[10px] font-mono font-semibold text-indigo-700">
                  Explore a pair
                </span>
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Watson–Crick pairing binds <strong className="font-semibold text-slate-800">Adenine (A) to Thymine (T)</strong> with two hydrogen bonds, and <strong className="font-semibold text-slate-800">Guanine (G) to Cytosine (C)</strong> with three.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {[
                { left: 'A', right: 'T', bonds: 2 },
                { left: 'G', right: 'C', bonds: 3 },
              ].map(({ left, right, bonds }) => (
                <span key={left} className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-[10px] font-medium text-slate-600">
                  <span className="font-mono font-bold" style={{ color: BASE_COLORS[left].text }}>{left}</span>
                  <span className="text-indigo-400">{bonds === 2 ? '··' : '···'}</span>
                  <span className="font-mono font-bold" style={{ color: BASE_COLORS[right].text }}>{right}</span>
                  <span>{bonds} H-bonds</span>
                </span>
              ))}
            </div>

            {/* Interactive Strand Pair Demonstration */}
            <div className="rounded-2xl border border-slate-200/80 bg-gradient-to-br from-slate-50 to-indigo-50/40 p-2.5 sm:p-4">
              <div className="mb-2 flex items-center justify-between gap-2 text-[10px] font-mono font-semibold text-slate-500 sm:text-[11px]">
                <span>5′ → 3′ Coding strand</span>
                <span className="text-slate-400">Hover or select a base</span>
              </div>
              <div className="grid grid-cols-8 gap-0.5 sm:gap-1">
                {sampleOligoStrand.map((base, idx) => (
                  <div key={`top-base-${idx}`} className="flex justify-center">
                    <BaseCard
                      base={base}
                      size="sm"
                      showBits
                      isHighlighted={hoveredBase?.idx === idx}
                      onMouseEnter={() => setHoveredBase({ base, idx, strand: 1 })}
                      onMouseLeave={() => setHoveredBase(null)}
                      onClick={() => setHoveredBase({ base, idx, strand: 1 })}
                      className="sm:h-10 sm:w-10 sm:rounded-lg sm:text-sm"
                    />
                  </div>
                ))}
              </div>

              <div className="my-1 grid grid-cols-8 gap-0.5 sm:gap-1" aria-hidden="true">
                {sampleOligoStrand.map((base, idx) => {
                  const bondCount = base === 'A' || base === 'T' ? 2 : 3;
                  const isPairActive = hoveredBase?.idx === idx;
                  const bondY = bondCount === 2 ? [9, 19] : [6, 14, 22];

                  return (
                    <svg
                      key={`bonds-${idx}`}
                      viewBox="0 0 40 28"
                      className={`h-7 w-full transition-opacity duration-200 ${isPairActive ? 'opacity-100' : 'opacity-60'}`}
                    >
                      <path d="M20 0v28" stroke={isPairActive ? '#24B8A5' : '#DCE9EF'} strokeWidth="1.2" strokeDasharray="2 3" />
                      {bondY.map((y) => (
                        <line
                          key={y}
                          x1="13"
                          y1={y}
                          x2="27"
                          y2={y}
                          stroke={isPairActive ? '#087F8C' : '#8CA0B0'}
                          strokeWidth={isPairActive ? '2' : '1.5'}
                          strokeDasharray="2 2"
                          strokeLinecap="round"
                        />
                      ))}
                    </svg>
                  );
                })}
              </div>

              <div className="grid grid-cols-8 gap-0.5 sm:gap-1">
                {sampleComplementStrand.map((base, idx) => (
                  <div key={`bottom-base-${idx}`} className="flex justify-center">
                    <BaseCard
                      base={base}
                      size="sm"
                      showBits
                      isHighlighted={hoveredBase?.idx === idx}
                      onMouseEnter={() => setHoveredBase({ base, idx, strand: 2 })}
                      onMouseLeave={() => setHoveredBase(null)}
                      onClick={() => setHoveredBase({ base, idx, strand: 2 })}
                      className="sm:h-10 sm:w-10 sm:rounded-lg sm:text-sm"
                    />
                  </div>
                ))}
              </div>
              <div className="mt-2 flex items-center justify-between gap-2 text-[10px] font-mono font-semibold text-slate-500 sm:text-[11px]">
                <span>3′ ← 5′ Complementary strand</span>
                <span className="text-slate-400">Antiparallel</span>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200/80 bg-white p-4">
              <div className="flex flex-wrap items-center justify-center gap-2 text-[10px] font-semibold sm:text-xs">
                <span className="rounded-lg bg-indigo-50 px-2.5 py-1.5 text-indigo-700">Purines · A, G</span>
                <span className="text-slate-400" aria-hidden="true">pair with</span>
                <span className="rounded-lg bg-teal-50 px-2.5 py-1.5 text-teal-700">Pyrimidines · T, C</span>
              </div>
              <p className="mt-2 text-center text-[11px] leading-5 text-slate-500">
                Pairing one larger purine with one smaller pyrimidine keeps the double helix a consistent width.
              </p>
            </div>

            <div
              className="mt-auto flex flex-wrap items-center justify-between gap-x-4 gap-y-1 rounded-xl border border-indigo-100 bg-indigo-50/60 px-3.5 py-3 text-xs text-slate-600"
              aria-live="polite"
            >
              <span>
                {hoveredBase ? (
                  <>Selected: <strong className="text-indigo-700">{hoveredBase.base} — {COMPLEMENT[hoveredBase.base]}</strong></>
                ) : (
                  <>Selected pair: <strong className="text-indigo-700">Hover or select a nucleotide</strong></>
                )}
              </span>
              <span className="font-mono text-indigo-700">
                {hoveredBase
                  ? `${hoveredBase.base === 'A' || hoveredBase.base === 'T' ? 2 : 3} hydrogen bonds`
                  : '2 or 3 H-bonds'}
              </span>
            </div>
          </article>
        </div>

        <HelixStructureExplorer />
        <DNASequenceExplorer />

        <div className="mt-14 sm:mt-16">
          <div className="mb-6 flex flex-col items-center text-center">
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.18em] text-indigo-600">
              From building blocks to structure
            </span>
            <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Understanding DNA Structure
            </h3>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <details className="group rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-200 open:border-indigo-200 hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md">
              <summary className="cursor-pointer list-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400">
                <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <Dna className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
                </div>
                <h4 className="text-sm font-semibold text-slate-900">Double Helix</h4>
                <p className="mt-1.5 text-xs leading-5 text-slate-600">
                  Two intertwined polynucleotide strands form DNA’s double-helical structure.
                </p>
                <span className="mt-3 inline-block text-[11px] font-semibold text-indigo-700 group-open:hidden">Learn more +</span>
              </summary>
              <p className="mt-3 border-t border-slate-100 pt-3 text-xs leading-5 text-slate-600">
                The sugar–phosphate backbones sit on the outside while paired bases stack inside. The helix’s major and minor grooves expose different molecular surfaces for protein binding.
              </p>
            </details>
            <details className="group rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-200 open:border-cyan-200 hover:-translate-y-0.5 hover:border-cyan-200 hover:shadow-md">
              <summary className="cursor-pointer list-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400">
                <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M7 3v18M17 3v18M4 6l3-3 3 3M14 18l3 3 3-3" />
                    <path d="M9 7h6M9 12h6M9 17h6" strokeDasharray="2 2" />
                  </svg>
                </div>
                <h4 className="text-sm font-semibold text-slate-900">Antiparallel Orientation</h4>
                <p className="mt-1.5 text-xs leading-5 text-slate-600">
                  The strands run in opposite directions: one 5′ to 3′, the other 3′ to 5′.
                </p>
                <span className="mt-3 inline-block text-[11px] font-semibold text-indigo-700 group-open:hidden">Learn more +</span>
              </summary>
              <p className="mt-3 border-t border-slate-100 pt-3 text-xs leading-5 text-slate-600">
                This polarity comes from the numbered carbons in deoxyribose and determines how DNA polymerases synthesize a new strand.
              </p>
            </details>
            <details className="group rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-200 open:border-emerald-200 hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-md">
              <summary className="cursor-pointer list-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400">
                <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                  <Link2 className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
                </div>
                <h4 className="text-sm font-semibold text-slate-900">Complementary Pairing</h4>
                <p className="mt-1.5 text-xs leading-5 text-slate-600">
                  Specific A–T and G–C pairing lets each strand serve as a template for its complement.
                </p>
                <span className="mt-3 inline-block text-[11px] font-semibold text-indigo-700 group-open:hidden">Learn more +</span>
              </summary>
              <p className="mt-3 border-t border-slate-100 pt-3 text-xs leading-5 text-slate-600">
                A–T pairs form two hydrogen bonds and G–C pairs form three. One purine and one pyrimidine fit together to maintain a regular helix width.
              </p>
            </details>
          </div>
        </div>

        <div className="mt-14 sm:mt-16">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.18em] text-indigo-600">
                A quick comparison
              </span>
              <h3 className="mt-1.5 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                DNA and RNA
              </h3>
            </div>
            <span className="text-xs text-slate-500">Both are nucleic acids made of nucleotides.</span>
          </div>
          <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
            <table className="w-full table-fixed text-left text-[11px] sm:text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th scope="col" className="w-[23%] px-2.5 py-3 font-semibold text-slate-600 sm:px-4">Feature</th>
                  <th scope="col" className="w-[38.5%] border-l border-slate-200/70 px-2.5 py-3 font-semibold text-indigo-700 sm:px-4">DNA</th>
                  <th scope="col" className="w-[38.5%] border-l border-slate-200/70 px-2.5 py-3 font-semibold text-teal-700 sm:px-4">RNA</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                <tr>
                  <th scope="row" className="px-2.5 py-3 font-semibold text-slate-700 sm:px-4">Sugar</th>
                  <td className="border-l border-slate-100 px-2.5 py-3 sm:px-4">Deoxyribose</td>
                  <td className="border-l border-slate-100 px-2.5 py-3 sm:px-4">Ribose</td>
                </tr>
                <tr>
                  <th scope="row" className="px-2.5 py-3 font-semibold text-slate-700 sm:px-4">Bases</th>
                  <td className="border-l border-slate-100 px-2.5 py-3 font-mono text-slate-700 sm:px-4">A, T, G, C</td>
                  <td className="border-l border-slate-100 px-2.5 py-3 font-mono text-slate-700 sm:px-4">A, U, G, C</td>
                </tr>
                <tr>
                  <th scope="row" className="px-2.5 py-3 font-semibold text-slate-700 sm:px-4">Structure</th>
                  <td className="border-l border-slate-100 px-2.5 py-3 sm:px-4">Typically double-stranded</td>
                  <td className="border-l border-slate-100 px-2.5 py-3 sm:px-4">Typically single-stranded</td>
                </tr>
                <tr>
                  <th scope="row" className="px-2.5 py-3 font-semibold text-slate-700 sm:px-4">Stability</th>
                  <td className="border-l border-slate-100 px-2.5 py-3 leading-4 sm:px-4">Generally more chemically stable; storage still needs protection from damage</td>
                  <td className="border-l border-slate-100 px-2.5 py-3 leading-4 sm:px-4">The 2′ hydroxyl makes RNA more susceptible to hydrolysis</td>
                </tr>
                <tr>
                  <th scope="row" className="px-2.5 py-3 font-semibold leading-4 text-slate-700 sm:px-4">Primary role</th>
                  <td className="border-l border-slate-100 px-2.5 py-3 leading-4 sm:px-4">Stores genetic information</td>
                  <td className="border-l border-slate-100 px-2.5 py-3 leading-4 sm:px-4">Multiple roles in gene expression and protein synthesis</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 flex items-start gap-2 text-[11px] leading-5 text-slate-500">
            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-teal-500" aria-hidden="true" />
            DNA’s chemical stability can aid long-term preservation, but actual durability depends on storage conditions, packaging, and later retrieval methods.
          </p>
        </div>
      </section>

      <HelixDivider />

      {/* ========================================================
          SECTION 3: DNA AS AN INFORMATION MEDIUM
      ======================================================== */}
      <section className="py-20 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200/60">
            Information Theory
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 mt-3 tracking-tight">
            DNA as an Information Medium
          </h2>
          <p className="text-slate-600 mt-3 text-sm sm:text-base leading-relaxed">
            In computing, information is quantized by the number of states per symbol. Binary silicon uses two voltage states {'{0, 1}'}. DNA operates on a quaternary alphabet {'{A, C, G, T}'}.
          </p>
        </div>

        {/* Side-by-Side Comparison: Binary vs Quaternary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Binary Card */}
          <div className="p-7 rounded-3xl bg-white border border-slate-200 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-slate-100 rounded-bl-full -z-0 opacity-60" />
            <div className="relative z-10 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                  Conventional Computing
                </span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold">
                  Base-2
                </span>
              </div>
              <h3 className="text-2xl font-bold text-slate-800">Binary Alphabet</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Represents data using electrical charges, magnetic orientations, or optical pits.
              </p>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-500">Alphabet Set:</span>
                  <span className="font-bold text-slate-800">{`{ 0, 1 }`} (2 states)</span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-500">Information per symbol:</span>
                  <span className="font-bold text-slate-800">log₂(2) = 1.0 bit / symbol</span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-500">Physical carrier:</span>
                  <span className="font-bold text-slate-800">Electrons in transistors</span>
                </div>
              </div>
            </div>
          </div>

          {/* DNA Quaternary Card */}
          <div className="p-7 rounded-3xl bg-white border border-indigo-200/80 shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50 rounded-bl-full -z-0" />
            <div className="relative z-10 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-600">
                  Molecular Storage
                </span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 font-bold">
                  Base-4
                </span>
              </div>
              <h3 className="text-2xl font-bold text-slate-800">DNA Alphabet</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Represents information in covalent nucleotide polymers, doubling theoretical information density per symbol.
              </p>

              <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-600">Alphabet Set:</span>
                  <span className="font-bold text-indigo-900">{`{ A, C, G, T }`} (4 states)</span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-600">Information per symbol:</span>
                  <span className="font-bold text-indigo-900">log₂(4) = 2.0 bits / base</span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-600">Physical carrier:</span>
                  <span className="font-bold text-indigo-900">Nucleic acid phosphodiester chains</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2-Bit Mapping Table */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-2">
            The Standard 2-Bit Mapping Standard
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
            Because 2² = 4, every nucleotide base maps losslessly to exactly two binary digits. This produces a bijective mapping between arbitrary digital bitstreams and DNA sequences.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { bits: '00', base: 'A', name: 'Adenine', color: BASE_COLORS.A, pair: 'T' },
              { bits: '01', base: 'C', name: 'Cytosine', color: BASE_COLORS.C, pair: 'G' },
              { bits: '10', base: 'G', name: 'Guanine', color: BASE_COLORS.G, pair: 'C' },
              { bits: '11', base: 'T', name: 'Thymine', color: BASE_COLORS.T, pair: 'A' },
            ].map((entry) => (
              <div
                key={entry.bits}
                className="p-4 rounded-2xl border transition-all hover:scale-105"
                style={{
                  backgroundColor: entry.color.bgLight,
                  borderColor: entry.color.border,
                }}
              >
                <div className="text-xs font-mono text-slate-500 flex items-center justify-between">
                  <span>Binary Bit-Pair</span>
                  <span className="font-bold text-slate-800">{entry.bits}</span>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center font-mono font-bold text-lg shadow-xs"
                    style={{ backgroundColor: entry.color.hex, color: entry.color.text }}
                  >
                    {entry.base}
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-slate-800">{entry.name}</div>
                    <div className="text-[10px] font-mono text-slate-500">Pairs with {entry.pair}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <InformationConverter />
        <InformationDensityExplorer />
      </section>

      <HelixDivider />

      {/* ========================================================
          SECTION 4: THE 7-STAGE PIPELINE & WORKED EXAMPLE
      ======================================================== */}
      <section id="section-pipeline" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto scroll-mt-20">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200/60">
            End-To-End Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 mt-3 tracking-tight">
            How Digital Data Becomes DNA: The 7-Stage Pipeline
          </h2>
          <p className="text-slate-600 mt-3 text-sm sm:text-base leading-relaxed">
            The project proposal establishes an end-to-end transformation architecture spanning text serialization, bit pairing, nucleotide synthesis, simulated archival, sequencing, and lossless recovery.
          </p>
        </div>

        <PipelineExplorer />
      </section>

      <HelixDivider />

      {/* ========================================================
          SECTION 5: WHY DNA FOR STORAGE? (PROBLEM STATEMENT)
      ======================================================== */}
      <section className="py-20 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200/60">
            The Storage Crisis
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 mt-3 tracking-tight">
            Why DNA for Storage?
          </h2>
          <p className="text-slate-600 mt-3 text-sm sm:text-base leading-relaxed">
            Global data generation is projected to exceed 175 zettabytes. Conventional electronic and magnetic media face thermodynamic limits in physical volume, active cooling electricity, and media degradation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Card 1 */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
            <span className="text-3xl">💾</span>
            <h3 className="text-lg font-bold text-slate-800">Conventional Degradation</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Magnetic HDD drives experience mechanical failure within 3–7 years. Enterprise LTO magnetic tape requires climate-controlled silos and complete media rewrites every 10–30 years to prevent bit rot.
            </p>
            <div className="text-xs font-mono text-rose-600 font-semibold pt-1">
              • High periodic migration costs
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
            <span className="text-3xl">🧊</span>
            <h3 className="text-lg font-bold text-slate-800">Millennial Durability</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              A sealed DNA sample needs no operating power. Cold, dry, dark conditions can slow chemical damage, and ancient DNA demonstrates long-term molecular survival—but this does not establish a guaranteed lifetime for stored digital files.
            </p>
            <div className="text-xs font-mono text-emerald-600 font-semibold pt-1">
              • Zero idle electricity consumption
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
            <span className="text-3xl">📦</span>
            <h3 className="text-lg font-bold text-slate-800">Ultra-High Molecular Density</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Erlich and Zielinski estimated a theoretical coding density of about 215 petabytes per gram. This is a molecular-capacity estimate, not a practical net capacity achieved by a commercial end-to-end system.
            </p>
            <div className="text-xs font-mono text-indigo-600 font-semibold pt-1">
              • Theoretical estimate · 2017
            </div>
          </div>
        </div>

        {/* Cautious Academic Note */}
        <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
          <span className="text-lg">⚠️</span>
          <div>
            <strong className="font-semibold">Academic Rigor Note:</strong> Published density figures are theoretical coding estimates, not commercial system performance. Practical net density is lower after indexing, primers, redundancy, biochemical constraints, and synthesis/sequencing overhead.
          </div>
        </div>
        <StorageComparison />
        <StorageDensityExplorer />
      </section>

      <HelixDivider />

      {/* ========================================================
          SECTION 6: HOW REAL DNA STORAGE WORKS ("THE LITTLE EXTRA")
      ======================================================== */}
      <section id="section-real-world" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto scroll-mt-20">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200/60">
            Biochemical Reality
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 mt-3 tracking-tight">
            How Real DNA Storage Works
          </h2>
          <p className="text-slate-600 mt-3 text-sm sm:text-base leading-relaxed">
            In physical biology, you cannot synthesize a single 10-megabyte strand. Real DNA storage requires oligonucleotide chunking, primer binding, Reed-Solomon redundancy, and sequencing flow cells.
          </p>
        </div>

        <LifecycleExplorer />

        {/* 3 Biochemical Constraints Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Card 1: Homopolymers */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 font-mono font-bold flex items-center justify-center">
              AAAA
            </div>
            <h3 className="text-base font-bold text-slate-800">Homopolymer Avoidance</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Consecutive runs of identical bases (≥ 4 bases, e.g. AAAA) produce optical fluorescence blurring in sequencers, resulting in deletion errors. Modern codecs rotate choices to strictly limit homopolymer length.
            </p>
          </div>

          {/* Card 2: GC Content */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 font-mono font-bold flex items-center justify-center">
              50%
            </div>
            <h3 className="text-base font-bold text-slate-800">GC Ratio Control (40–60%)</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Because G-C pairs contain 3 hydrogen bonds compared to A-T's 2, unbalanced GC ratios cause severe secondary structure hairpin folding and unequal melting temperatures during PCR amplification.
            </p>
          </div>

          {/* Card 3: Error Correction */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 font-mono font-bold flex items-center justify-center">
              RS/F
            </div>
            <h3 className="text-base font-bold text-slate-800">Indels & Redundancy Codes</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Unlike silicon's substitution-only bit flips, DNA synthesis introduces insertions and deletions (indels) that desynchronize byte alignment. Reed-Solomon and Fountain codes are required to rebuild corrupted strands.
            </p>
          </div>
        </div>

        {/* Historical Milestones Timeline */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200/80">
          <h3 className="text-lg font-bold text-slate-800 mb-6 text-center">
            Key Milestones in DNA Storage Research
          </h3>

          <div className="space-y-4">
            {[
              {
                year: '2012',
                author: 'Church et al. (Harvard)',
                feat: 'Encoded an entire HTML book (5.27 megabits), draftsmanship images, and text into DNA, synthesized on a microfluidic chip.',
              },
              {
                year: '2013',
                author: 'Goldman et al. (European Bioinformatics Institute)',
                feat: 'Introduced base-3 rotating differential encoding avoiding homopolymers, losslessly storing MP3 audio and Shakespeare sonnets.',
              },
              {
                year: '2017',
                author: 'Erlich & Zielinski (Columbia / NYGC)',
                feat: 'DNA Fountain architecture achieving 215 PB/g using Luby transform rateless erasure codes, robust to strand dropouts.',
              },
              {
                year: '2019+',
                author: 'Microsoft Research & Univ. of Washington',
                feat: 'Demonstrated the first fully automated end-to-end DNA storage device capable of writing, storing, and reading the word "HELLO".',
              },
            ].map((m) => (
              <div
                key={m.year}
                className="p-4 rounded-xl bg-white border border-slate-200/80 flex flex-col sm:flex-row sm:items-center gap-4"
              >
                <span className="text-base font-bold font-mono text-indigo-600 sm:w-20">
                  {m.year}
                </span>
                <div className="flex-1">
                  <div className="text-xs font-bold text-slate-800">{m.author}</div>
                  <div className="text-xs text-slate-600 mt-0.5">{m.feat}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <HelixDivider />

      {/* ========================================================
          SECTION 7: DNA COMPUTING BEYOND STORAGE
      ======================================================== */}
      <section id="section-computing" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto scroll-mt-20">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200/60">
            Information Processing
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 mt-3 tracking-tight">
            DNA Computing Beyond Storage
          </h2>
          <p className="text-slate-600 mt-3 text-sm sm:text-base leading-relaxed">
            Beyond data storage, designed DNA strands can process molecular inputs through hybridization and reactions. Research spans small-scale computation, strand-displacement circuits, and molecular logic.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start mb-8">
          {/* Adleman's Experiment */}
          <div className="p-7 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
            <span className="text-3xl">🧩</span>
            <h3 className="text-xl font-bold text-slate-800">Adleman’s 1994 Breakthrough</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Leonard Adleman demonstrated molecular computation by solving a seven-vertex instance of the NP-complete <strong>Directed Hamiltonian Path Problem</strong>.
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Oligonucleotides represented vertices and paths; hybridization generated candidate paths, which were filtered and checked using laboratory procedures. The experiment demonstrated a proof of concept, not a practical general-purpose computer.
            </p>
          </div>

          {/* Molecular Logic & Strand Displacement */}
          <div className="p-7 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
            <span className="text-3xl">⚡</span>
            <h3 className="text-xl font-bold text-slate-800">DNA Strand Displacement (DSD)</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              In DNA strand displacement, an invading single strand can bind an exposed toehold and displace a strand from a duplex. This provides a programmable reaction motif that can be used to build molecular circuits.
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Researchers have demonstrated nucleic-acid logic gates and circuit cascades. Their behavior depends on sequence design and reaction conditions; this area remains experimental rather than a replacement for electronic computing.
            </p>
          </div>
        </div>
        <MolecularComputingLab />
      </section>

      <HelixDivider />

      {/* ========================================================
          SECTION 8: LIMITATIONS AND CHALLENGES
      ======================================================== */}
      <section className="py-20 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200/60">
            Current Bottlenecks
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 mt-3 tracking-tight">
            Limitations & Technical Challenges
          </h2>
          <p className="text-slate-600 mt-3 text-sm sm:text-base leading-relaxed">
            DNA storage is currently an archival research frontier, not an immediate consumer replacement for solid-state silicon drives.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
            <span className="text-2xl">💰</span>
            <h3 className="font-bold text-slate-800 text-base">Synthesis Cost</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Chemical nucleotide assembly remains orders of magnitude more expensive per megabyte than magnetic media, limiting write operations to high-value archival data.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
            <span className="text-2xl">⏱️</span>
            <h3 className="font-bold text-slate-800 text-base">Latency & Read/Write Speeds</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Writing requires chemical cycling over hours; reading requires enzymatic flow cell sequencing over minutes to hours. There is no sub-millisecond random access.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
            <span className="text-2xl">⚠️</span>
            <h3 className="font-bold text-slate-800 text-base">Error Susceptibility</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Synthesis and sequencing can introduce substitutions, insertions, and deletions. Indexing and error-correction schemes add redundancy, with overhead varying by the storage design and target reliability.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
            <span className="text-2xl">✏️</span>
            <h3 className="font-bold text-slate-800 text-base">No In-Place Overwrites</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              In common synthesized-oligo archival workflows, changing data generally means producing new molecules rather than conveniently overwriting selected bases in place.
            </p>
          </div>
        </div>

        <div className="mt-8 text-center text-xs text-slate-500 font-mono">
          • This project explores DNA storage as an educational software simulation and architectural analysis •
        </div>
      </section>

      <HelixDivider />

      {/* ========================================================
          SECTION 9: APPLICATIONS
      ======================================================== */}
      <section className="py-20 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200/60">
            Real-World Horizons
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 mt-3 tracking-tight">
            Target Applications
          </h2>
        </div>

        <ApplicationExplorer />
      </section>

      <HelixDivider />

      {/* ========================================================
          SECTION 10: PROJECT AIM & CALL TO ACTION
      ======================================================== */}
      <section className="py-20 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900 text-white shadow-2xl relative overflow-hidden text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-mono font-semibold text-indigo-200 border border-white/15">
            Interactive Pipeline Simulator
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight max-w-3xl mx-auto">
            Ready to test the pipeline with your own data?
          </h2>

          <p className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto font-light leading-relaxed">
            Our interactive simulator implements the complete 7-stage proposal pipeline: encode arbitrary text, watch the double helix synthesize base by base, inspect sequence metrics, simulate mutations, and verify lossless recovery.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Link
              to="/simulator"
              className="px-8 py-4 rounded-2xl font-bold text-base text-indigo-900 bg-white hover:bg-slate-100 shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <span>Launch Simulator Page</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 11: REFERENCES & FURTHER READING
      ======================================================== */}
      <section className="py-16 px-4 sm:px-6 max-w-6xl mx-auto border-t border-slate-200">
        <div className="mb-8">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-500">
            Academic Bibliography
          </span>
          <h3 className="text-xl font-bold text-slate-800 mt-1">
            References & Verifiable Scientific Literature
          </h3>
        </div>

        <details className="group">
          <summary className="cursor-pointer rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-indigo-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400">
            Browse six peer-reviewed references <span className="float-right text-indigo-600 transition-transform group-open:rotate-180" aria-hidden="true">⌄</span>
          </summary>
          <ol className="mt-4 space-y-3 text-xs text-slate-600 font-mono">
          <li className="p-3 rounded-lg bg-white border border-slate-200/70">
            [1] <strong>Erlich, Y., & Zielinski, D. (2017).</strong> DNA Fountain enables a robust and efficient storage architecture. <em>Science</em>, 355(6328), 950–954. <a className="text-indigo-700 underline" href="https://doi.org/10.1126/science.aaj2038" target="_blank" rel="noreferrer">doi:10.1126/science.aaj2038</a>
          </li>
          <li className="p-3 rounded-lg bg-white border border-slate-200/70">
            [2] <strong>Church, G. M., Gao, Y., & Kosuri, S. (2012).</strong> Next-generation digital information storage in DNA. <em>Science</em>, 337(6102), 1628. <a className="text-indigo-700 underline" href="https://doi.org/10.1126/science.1226355" target="_blank" rel="noreferrer">doi:10.1126/science.1226355</a>
          </li>
          <li className="p-3 rounded-lg bg-white border border-slate-200/70">
            [3] <strong>Goldman, N., Bertone, P., Chen, S., et al. (2013).</strong> Towards practical, high-capacity, low-maintenance information storage in synthesized DNA. <em>Nature</em>, 494(7435), 77–80. <a className="text-indigo-700 underline" href="https://doi.org/10.1038/nature11875" target="_blank" rel="noreferrer">doi:10.1038/nature11875</a>
          </li>
          <li className="p-3 rounded-lg bg-white border border-slate-200/70">
            [4] <strong>Adleman, L. M. (1994).</strong> Molecular computation of solutions to combinatorial problems. <em>Science</em>, 266(5187), 1021–1024. <a className="text-indigo-700 underline" href="https://doi.org/10.1126/science.7973651" target="_blank" rel="noreferrer">doi:10.1126/science.7973651</a>
          </li>
          <li className="p-3 rounded-lg bg-white border border-slate-200/70">
            [5] <strong>Organick, L., Ang, S. D., Chen, Y. J., et al. (2018).</strong> Random access in large-scale DNA data storage. <em>Nature Biotechnology</em>, 36(3), 242–248. <a className="text-indigo-700 underline" href="https://doi.org/10.1038/nbt.4079" target="_blank" rel="noreferrer">doi:10.1038/nbt.4079</a>
          </li>
          <li className="p-3 rounded-lg bg-white border border-slate-200/70">
            [6] <strong>Ceze, L., Nivala, J., & Strauss, K. (2019).</strong> Molecular digital data storage using DNA. <em>Nature Reviews Genetics</em>, 20(8), 456–466. <a className="text-indigo-700 underline" href="https://doi.org/10.1038/s41576-019-0125-3" target="_blank" rel="noreferrer">doi:10.1038/s41576-019-0125-3</a>
          </li>
          </ol>
        </details>
      </section>
    </div>
  );
}
