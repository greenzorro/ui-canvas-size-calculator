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
  
  let svgWidth = containerMaxWidth;
  let svgHeight = containerMaxWidth / aspectRatio;

  if (svgHeight > containerMaxWidth * 0.75) { // Limit height to prevent very tall displays
    svgHeight = containerMaxWidth * 0.75;
    svgWidth = svgHeight * aspectRatio;
  }
  
  if (svgWidth <=0 || svgHeight <=0) {
     return (
      <div className="flex items-center justify-center w-full h-48 border rounded-lg bg-muted/50">
        <p className="text-muted-foreground">无效的画布尺寸</p>
      </div>
    );
  }

  const strokeWidth = 2;
  const padding = 20; // Padding for text
  const textFontSize = Math.min(12, svgWidth / 20, svgHeight / 15);


  return (
    <div className="w-full p-4 border rounded-lg shadow-inner bg-secondary/30" style={{ maxWidth: `${containerMaxWidth + padding*2}px`, margin: '0 auto' }}>
      <svg 
        viewBox={`-${padding} -${padding} ${svgWidth + padding*2} ${svgHeight + padding*2}`}
        width="100%"
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
