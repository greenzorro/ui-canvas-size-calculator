"use client";

import type { CalculationResults } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import CanvasVisualizer from './canvas-visualizer';
import { Ruler, Smartphone, TextCursorInput, Image as ImageIcon } from 'lucide-react';

interface ResultsDisplayProps {
  results: CalculationResults | null;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results }) => {
  if (!results) {
    return null;
  }

  const resultItems = [
    { icon: <Smartphone className="w-5 h-5 text-primary" />, label: "画布宽度", value: `${results.canvasWidth} px` },
    { icon: <Ruler className="w-5 h-5 text-primary" />, label: "画布高度", value: `${results.canvasHeight} px` },
    { icon: <ImageIcon className="w-5 h-5 text-primary" />, label: "切图倍数", value: `${results.assetExportScale}x` },
    { icon: <TextCursorInput className="w-5 h-5 text-primary" />, label: "小字建议", value: `${results.suggestedFontSize}px (${results.fontExportScaleText})` },
  ];

  return (
    <Card className="w-full shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-headline text-center">计算结果</CardTitle>
        <CardDescription className="text-center">
          根据您的输入，建议的设计参数如下：
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <CanvasVisualizer canvasWidth={results.canvasWidth} canvasHeight={results.canvasHeight} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
          {resultItems.map((item, index) => (
            <Card key={index} className="bg-background/70">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-3">
                  {item.icon}
                  <div>
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                    <p className="text-lg font-semibold text-foreground">{item.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-4 bg-secondary/50">
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">屏幕PPI: <span className="font-semibold text-foreground">{results.ppi}</span></p>
            <p className="text-sm text-muted-foreground">屏幕倍数: <span className="font-semibold text-foreground">{results.screenScalingFactor}x</span></p>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

export default ResultsDisplay;
