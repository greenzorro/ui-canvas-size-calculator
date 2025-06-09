"use client";

import React, { useState, useCallback } from 'react';
import CalculatorForm from './calculator-form';
import ResultsDisplay from './results-display';
import { calculateAll } from '@/lib/calculator';
import type { CalculatorFormInput, CalculationResults } from '@/types';
import { ThemeToggle } from '@/components/theme-toggle';
import { Github } from 'lucide-react';
import Link from 'next/link';

const CalculatorClientPage: React.FC = () => {
  const [results, setResults] = useState<CalculationResults | null>(null);
  
  // Persist form inputs to localStorage
  const [initialFormValues, setInitialFormValues] = useState<Partial<CalculatorFormInput>>(() => {
    if (typeof window !== 'undefined') {
      const savedValues = localStorage.getItem('canvasAlchemistForm');
      try {
        if (savedValues) return JSON.parse(savedValues);
      } catch (e) {
        // problem parsing, ignore
      }
    }
    return {
      pixelWidth: 1920,
      pixelHeight: 1080,
      diagonalSize: 27,
      viewingDistance: 'medium',
      preferredCanvasWidth: '375',
    };
  });

  const handleCalculate = useCallback((data: CalculatorFormInput) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('canvasAlchemistForm', JSON.stringify(data));
    }
    setInitialFormValues(data); // Keep form state in sync if it updates via this callback directly
    const calculatedResults = calculateAll(data);
    setResults(calculatedResults);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 font-body">
      <header className="w-full max-w-4xl mb-8 flex justify-between items-center">
        <h1 className="text-3xl md:text-4xl font-headline font-bold text-primary">
          UI画布尺寸计算器
        </h1>
        <div className="flex items-center space-x-2">
          <Link href="https://github.com/firebase/studio-extra-recipes/tree/main/canvas-alchemist" target="_blank" rel="noopener noreferrer" aria-label="GitHub Repository">
            <Github className="w-6 h-6 text-foreground hover:text-primary transition-colors" />
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <main className="w-full max-w-4xl space-y-8">
        <CalculatorForm onSubmit={handleCalculate} initialValues={initialFormValues} />
        {results && <ResultsDisplay results={results} />}
      </main>

      <footer className="w-full max-w-4xl mt-12 text-center text-muted-foreground text-sm">
        <p>
          Created by{' '}
          <Link 
            href="https://victor42.eth.limo/page/tools/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Victor_42
          </Link>
          {' | '}
          <Link 
            href="https://github.com/greenzorro/ui-canvas-size-calculator" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Code
          </Link>
        </p>
      </footer>
    </div>
  );
};

export default CalculatorClientPage;
