import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ApplicationExplorer from './ApplicationExplorer';
import { HelixStructureExplorer } from './DNAConceptExplorers';
import MolecularComputingLab from './MolecularComputingLab';
import { LifecycleExplorer, StorageDensityExplorer } from './StorageEducation';

describe('interactive learning components', () => {
  it('highlights selected features in the double helix diagram', () => {
    render(<HelixStructureExplorer />);

    const diagram = screen.getByRole('img', { name: /DNA double helix diagram/ });
    expect(diagram.getAttribute('aria-label')).toContain('Base pairs highlighted');

    fireEvent.click(screen.getByRole('button', { name: 'Major groove' }));
    expect(diagram.getAttribute('aria-label')).toContain('Major groove highlighted');
    expect(screen.getByRole('button', { name: 'Major groove' }).getAttribute('aria-pressed')).toBe('true');

    fireEvent.click(screen.getByRole('button', { name: 'Sugar–phosphate backbone' }));
    expect(diagram.getAttribute('aria-label')).toContain('Sugar–phosphate backbone highlighted');
  });

  it('updates Boolean output when molecular gate inputs change', () => {
    render(<MolecularComputingLab />);

    expect(screen.getByText('AND → 1')).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'Input B is 1; toggle' }));
    expect(screen.getByText('AND → 0')).toBeTruthy();

    fireEvent.click(screen.getByRole('button', { name: 'OR', exact: true }));
    expect(screen.getByText('OR → 1')).toBeTruthy();
  });

  it('shows the selected biochemical lifecycle stage', () => {
    render(<LifecycleExplorer />);

    fireEvent.click(screen.getByRole('button', { name: /WritingChemically or enzymatically/ }));
    expect(screen.getByText('Writing: DNA synthesis')).toBeTruthy();
    expect(screen.getByText('Physical synthetic oligonucleotides')).toBeTruthy();
  });

  it('updates ideal base count as payload size changes', () => {
    render(<StorageDensityExplorer />);
    const slider = screen.getByRole('slider', { name: /Digital payload/ });

    fireEvent.change(slider, { target: { value: '2' } });
    expect(screen.getByText(/≈ 8\.39M nucleotide bases/)).toBeTruthy();
  });

  it('switches application details when a topic is selected', () => {
    render(<ApplicationExplorer />);

    fireEvent.click(screen.getByRole('button', { name: /Cellular recording/ }));
    expect(screen.getByText(/not general-purpose digital archives/)).toBeTruthy();
  });
});
