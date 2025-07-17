# UI Canvas Size Calculator 备忘录

## 1. 目的

本文档旨在详细记录 `projects/ui-canvas-size-calculator` 项目，为本项目的未来开发和维护提供便利。

**重要提示：** 每次新增或修改功能后，请务必更新此备忘录，确保文档的准确性和时效性。

## 2. 项目概述

本项目是一个Web应用，旨在帮助UI设计师根据各种参数（屏幕分辨率、尺寸、观看距离等）计算出最佳的UI设计画布尺寸。

### 2.1 技术栈

- **框架**: Next.js (React)
- **语言**: TypeScript
- **UI**: shadcn/ui, Tailwind CSS
- **表单**: react-hook-form, zod
- **状态管理**: React Hooks (useState, useCallback, etc.)
- **部署**: Vercel

### 2.2 文件结构

- `src/app/page.tsx`: 应用主页面，负责渲染 `CalculatorClientPage` 组件。
- `src/components/calculator/calculator-client-page.tsx`: 计算器页面的主要组件，负责状态管理和布局。
- `src/components/calculator/calculator-form.tsx`: 用户输入表单组件。
- `src/components/calculator/results-display.tsx`: 显示计算结果的组件。
- `src/components/calculator/canvas-visualizer.tsx`: 画布可视化组件。
- `src/lib/calculator.ts`: 包含核心计算逻辑的函数。
- `src/lib/constants.ts`: 定义了应用中使用的常量。
- `src/types/index.ts`: 定义了应用中使用的 TypeScript 类型。
- `notes.md`: 本备忘录。

## 3. 功能模块与实现

### 3.1 数据流

1.  **用户输入**: 用户在 `CalculatorForm` 组件中输入屏幕参数。
2.  **状态更新**: `calculator-client-page.tsx` 中的 `handleCalculate` 函数被调用，更新组件状态。
3.  **计算**: `calculateAll` 函数 (`calculator.ts`) 被调用，执行计算。
4.  **结果显示**: `ResultsDisplay` 组件接收计算结果并渲染。

### 3.2 核心计算逻辑 (`calculator.ts`)

- **PPI (Pixels Per Inch)**: `√(像素宽度² + 像素高度²) / 屏幕尺寸`
- **屏幕倍数**: `PPI / 除数` (除数由观看距离决定)
- **实际设计稿倍数**: `min(偏好的设计稿倍数, 屏幕倍数)`
- **画布尺寸**: `(屏幕像素尺寸 / 屏幕倍数) * 实际设计稿倍数`
- **切图倍数**: `屏幕倍数 / 实际设计稿倍数`
- **建议字号**: `基础字号 * 实际设计稿倍数`

### 3.3 特色功能

- **实时计算**: 表单输入时会进行防抖处理并实时计算结果。
- **本地存储**: 用户的输入会保存在浏览器的 `localStorage` 中，以便下次访问时恢复。
- **多语言支持**: 应用支持多语言。
- **主题切换**: 提供了明暗主题切换功能。
- **响应式设计**: 移动端和桌面端有不同的布局。

## 4. 数据结构 (`types/index.ts`)

```typescript
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
```

## 5. SEO优化

- **Meta标签**: description、keywords、author、robots、canonical URL
- **社交媒体**: Open Graph和Twitter Card标签
- **结构化数据**: JSON-LD格式
- **语义化HTML**: 使用main、aside、section等标签
- **可访问性**: alt属性、aria-label标签

## 6. 故障排查

- **基础检查**: 确保文件路径正确、输入数据格式有效。
- **开发者工具**: 检查Console错误、Network加载状态、Elements结构。
- **清除缓存**: 清除浏览器缓存解决资源更新问题。
