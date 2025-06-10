"use client";

import React, { useState, useCallback } from 'react';
import CalculatorForm from './calculator-form';
import ResultsDisplay from './results-display';
import { calculateAll } from '@/lib/calculator';
import type { CalculatorFormInput, CalculationResults } from '@/types';
import { ThemeToggle } from '@/components/theme-toggle';
import { LanguageToggle } from '@/components/language-toggle';
import { useLanguage } from '@/components/providers/language-provider';
import Link from 'next/link';

const CalculatorClientPage: React.FC = () => {
  const [results, setResults] = useState<CalculationResults | null>(null);
  const { t } = useLanguage();
  
  // Persist form inputs to localStorage
  const [initialFormValues, setInitialFormValues] = useState<Partial<CalculatorFormInput>>(() => {
    if (typeof window !== 'undefined') {
      const savedValues = localStorage.getItem('canvasAlchemistForm');
      try {
        if (savedValues) return JSON.parse(savedValues);
      } catch {
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
    <div className="min-h-screen flex flex-col p-4 md:p-8 font-body">
      <header className="w-full max-w-7xl mx-auto mb-8 flex justify-between items-center">
        <h1 className="text-3xl md:text-4xl font-headline font-bold text-primary">
          {t('title')}
        </h1>
        <div className="flex items-center space-x-2">
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </header>

      <main className="w-full max-w-7xl mx-auto flex-1">
        {/* 移动端：上下排列 */}
        <div className="lg:hidden space-y-8 px-2">
          <CalculatorForm onSubmit={handleCalculate} initialValues={initialFormValues} />
          {results && <ResultsDisplay results={results} />}
        </div>
        
        {/* PC端：左右排列 */}
        <div className="hidden lg:grid lg:grid-cols-2 lg:gap-8 lg:items-start lg:px-4">
          <div className="lg:py-2">
            <CalculatorForm onSubmit={handleCalculate} initialValues={initialFormValues} />
          </div>
          <div className="lg:py-2">
            {results && <ResultsDisplay results={results} />}
          </div>
        </div>
      </main>

      <footer className="w-full max-w-7xl mx-auto mt-12 text-center text-muted-foreground text-sm">
        <p className="mb-2">
          {t('disclaimer')}{' '}
          <Link 
            href="https://victor42.eth.limo/post/ui-canvas-size-calculator/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            {t('detailProcess')}
          </Link>
        </p>
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
