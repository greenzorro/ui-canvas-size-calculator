import type { CalculatorFormInput, CalculationResults } from '@/types';
import {
  VIEWING_DISTANCE_DIVISORS,
  PREFERRED_CANVAS_WIDTH_MULTIPLIERS,
  BASE_FONT_SIZE,
} from './constants';

export function calculateAll(inputs: CalculatorFormInput): CalculationResults | null {
  const {
    pixelWidth,
    pixelHeight,
    diagonalSize,
    viewingDistance,
    preferredCanvasWidth,
  } = inputs;

  if (pixelWidth <= 0 || pixelHeight <= 0 || diagonalSize <= 0) {
    return null; 
  }

  // PPI = √(像素宽度^2 + 像素高度^2) / 屏幕尺寸
  const diagonalPixels = Math.sqrt(pixelWidth ** 2 + pixelHeight ** 2);
  const ppi = diagonalPixels / diagonalSize;

  // 屏幕倍数 = PPI / 除数 (取整, 最小为1)
  const divisor = VIEWING_DISTANCE_DIVISORS[viewingDistance];
  let screenScalingFactor = Math.round(ppi / divisor);
  screenScalingFactor = Math.max(1, screenScalingFactor); // 确保倍数至少为1

  // 设计稿倍数
  const preferredDesignMultiplier = PREFERRED_CANVAS_WIDTH_MULTIPLIERS[preferredCanvasWidth];

  // 实际设计稿倍数 (设计稿倍数不能大于屏幕倍数)
  const actualDesignMultiplier = Math.min(preferredDesignMultiplier, screenScalingFactor);

  // 画布宽 = 屏幕像素宽 / 屏幕倍数 × 实际设计稿倍数
  const canvasWidth = Math.round((pixelWidth / screenScalingFactor) * actualDesignMultiplier);
  // 画布高 = 屏幕像素高 / 屏幕倍数 × 实际设计稿倍数
  const canvasHeight = Math.round((pixelHeight / screenScalingFactor) * actualDesignMultiplier);

  // 切图倍数 = 屏幕倍数 / 实际设计稿倍数
  let assetExportScale = screenScalingFactor / actualDesignMultiplier;
  // Ensure assetExportScale is presentable, e.g., 1, 1.5, 2 not 1.3333
  // For simplicity, let's round to one decimal or keep as integer
  assetExportScale = Math.round(assetExportScale * 10) / 10;


  // 小字建议字号 = 基础字号 × 实际设计稿倍数
  const suggestedFontSize = BASE_FONT_SIZE * actualDesignMultiplier;
  const fontExportScaleText = `${actualDesignMultiplier}倍`;

  return {
    ppi: parseFloat(ppi.toFixed(2)),
    screenScalingFactor,
    actualDesignMultiplier,
    canvasWidth,
    canvasHeight,
    assetExportScale,
    suggestedFontSize,
    fontExportScaleText,
  };
}
