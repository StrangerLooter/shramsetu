'use client';

import React, { useState, useRef, useCallback } from 'react';
import { CheckCircle2, Split } from 'lucide-react';

interface Props {
  beforeImage?: string;
  afterImage?: string;
  beforeLabel?: string;
  afterLabel?: string;
  notes?: string;
}

export const BeforeAfterSlider: React.FC<Props> = ({
  beforeImage = 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&auto=format&fit=crop&q=80',
  afterImage = 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&auto=format&fit=crop&q=80',
  beforeLabel = 'Before: Fractured Pipe',
  afterLabel = 'After: Verified Repair & Seal',
  notes = 'Work inspected by Cooperative Technical Field Officer. 100% verified.'
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    handleMove(e.clientX);
  };

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-border shadow-card space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Split className="w-4 h-4 text-content" />
          <h4 className="font-semibold text-xs sm:text-sm text-content">
            Before & After Photographic Inspection Proof
          </h4>
        </div>
        <span className="text-[10px] font-medium bg-surface-subtle text-content px-2 py-0.5 rounded-full border border-border/70 flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
          Drag slider to compare
        </span>
      </div>

      {/* Slider Viewer */}
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchMove={handleTouchMove}
        className="relative w-full h-64 sm:h-80 rounded-xl overflow-hidden cursor-ew-resize select-none border border-border shadow-inner bg-slate-950"
      >
        {/* Before Image (Bottom Layer) */}
        <img 
          src={beforeImage} 
          alt="Before Repair" 
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* After Image (Top Layer - clipped to sliderPosition) */}
        <div 
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <img 
            src={afterImage} 
            alt="After Repair" 
            className="absolute inset-0 w-full h-full object-cover max-w-none"
            style={{ width: containerRef.current?.clientWidth || '100%' }}
          />
        </div>

        {/* Labels on images */}
        <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-xs text-white text-[10px] font-medium px-2.5 py-1 rounded-md shadow-md pointer-events-none">
          {afterLabel}
        </div>
        <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-xs text-white text-[10px] font-medium px-2.5 py-1 rounded-md shadow-md pointer-events-none">
          {beforeLabel}
        </div>

        {/* Divider Handle */}
        <div 
          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-2xl z-20 pointer-events-none -translate-x-1/2 flex items-center justify-center"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="w-7 h-7 rounded-full bg-white text-slate-900 shadow-md border border-neutral-300 flex items-center justify-center text-xs font-bold">
            ⇄
          </div>
        </div>
      </div>

      <p className="text-[11px] text-content-muted italic text-center">
        "{notes}"
      </p>
    </div>
  );
};
