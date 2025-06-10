"use client";

import React from 'react';

interface CanvasVisualizerProps {
  canvasWidth: number;
  canvasHeight: number;
}

const CanvasVisualizer: React.FC<CanvasVisualizerProps> = ({ canvasWidth, canvasHeight }) => {
  if (!canvasWidth || !canvasHeight || canvasWidth <= 0 || canvasHeight <= 0) {
    return (
      <div className="flex items-center justify-center w-full h-48 border rounded-lg bg-muted/50">
        <p className="text-muted-foreground">输入参数后显示预览</p>
      </div>
    );
  }

  const aspectRatio = canvasWidth / canvasHeight;
  const containerMaxWidth = 320; // Max width for the visualizer in pixels
  const containerMaxHeight = 320; // Max height for the visualizer in pixels
  const padding = 20; // Padding for text
  const availableWidth = containerMaxWidth - padding * 2; // 减掉左右padding
  const availableHeight = containerMaxHeight - padding * 2; // 减掉上下padding
  
  let svgWidth = availableWidth;
  let svgHeight = availableWidth / aspectRatio;

  // 确保高度不超过可用高度
  if (svgHeight > availableHeight) {
    svgHeight = availableHeight;
    svgWidth = svgHeight * aspectRatio;
  }
  
  // 确保宽度不超过可用宽度（双重保护）
  if (svgWidth > availableWidth) {
    svgWidth = availableWidth;
    svgHeight = svgWidth / aspectRatio;
  }
  
  if (svgWidth <=0 || svgHeight <=0) {
     return (
      <div className="flex items-center justify-center w-full h-48 border rounded-lg bg-muted/50">
        <p className="text-muted-foreground">无效的画布尺寸</p>
      </div>
    );
  }

  const strokeWidth = 2;
  const textFontSize = Math.max(10, Math.min(14, svgWidth / 15, svgHeight / 10));


  return (
    <div className="w-full p-4 border rounded-lg shadow-inner bg-secondary/30" style={{ maxWidth: `${containerMaxWidth + padding*2}px`, maxHeight: `${containerMaxHeight + padding*2}px`, margin: '0 auto' }}>
      <svg 
        viewBox={`-${padding} -${padding} ${svgWidth + padding*2} ${svgHeight + padding*2}`}
        width={svgWidth + padding*2}
        height={svgHeight + padding*2}
        style={{ maxWidth: '100%', maxHeight: '100%', display: 'block', margin: '0 auto' }}
        preserveAspectRatio="xMidYMid meet"
        aria-label={`屏幕示意图：宽 ${canvasWidth}px, 高 ${canvasHeight}px`}
      >
        <rect
          x="0"
          y="0"
          width={svgWidth}
          height={svgHeight}
          fill="hsl(var(--card))"
          stroke="hsl(var(--primary))"
          strokeWidth={strokeWidth}
          rx="4"
          ry="4"
        />
        {/* Width Annotation */}
        <text
          x={svgWidth / 2}
          y={-padding / 2.5}
          textAnchor="middle"
          fontSize={textFontSize}
          fill="hsl(var(--foreground))"
          className="font-medium"
        >
          {canvasWidth}px
        </text>
        {/* Height Annotation */}
        <text
          x={-padding / 2.5}
          y={svgHeight / 2}
          textAnchor="middle"
          fontSize={textFontSize}
          fill="hsl(var(--foreground))"
          className="font-medium"
          transform={`rotate(-90, ${-padding / 2.5}, ${svgHeight / 2})`}
        >
          {canvasHeight}px
        </text>
      </svg>
    </div>
  );
};

export default CanvasVisualizer;
