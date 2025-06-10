import type { ViewingDistance, PreferredCanvasWidth } from '@/lib/constants';

export interface CalculatorFormInput {
  pixelWidth: number;
  pixelHeight: number;
  diagonalSize: number;
  viewingDistance: ViewingDistance;
  preferredCanvasWidth: PreferredCanvasWidth;
}

export interface CalculationResults {
  ppi: number;
  screenScalingFactor: number;
  actualDesignMultiplier: number;
  canvasWidth: number;
  canvasHeight: number;
  assetExportScale: number;
  suggestedFontSize: number;
}
