'use client';

import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { speakSoundboxAnnouncement } from '@/lib/engines/soundbox';
import { useApp } from '@/lib/store/app-store';

interface Props {
  textToRead: string;
  label?: string;
  size?: 'sm' | 'md';
}

export const VoiceReaderButton: React.FC<Props> = ({ textToRead, label, size = 'sm' }) => {
  const { language } = useApp();
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof window === 'undefined') return;

    if (isPlaying) {
      window.speechSynthesis?.cancel();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      speakSoundboxAnnouncement(textToRead, language === 'hi' ? 'hi' : 'en');
      setTimeout(() => setIsPlaying(false), 6000);
    }
  };

  return (
    <button
      type="button"
      onClick={handleSpeak}
      className={`inline-flex items-center gap-1 font-medium rounded-lg transition-all ${
        isPlaying 
          ? 'bg-amber-50 text-amber-900 border border-amber-300 animate-pulse' 
          : 'bg-surface-subtle hover:bg-surface-hover text-content border border-border'
      } ${size === 'sm' ? 'px-2 py-1 text-[11px]' : 'px-3 py-1.5 text-xs'}`}
      title={isPlaying ? 'Stop audio' : 'Listen aloud (Audio Assist)'}
    >
      {isPlaying ? <VolumeX className="w-3.5 h-3.5 text-amber-700" /> : <Volume2 className="w-3.5 h-3.5 text-content-muted" />}
      <span>{label || (isPlaying ? 'Playing...' : language === 'hi' ? 'बोलकर सुनें' : 'Listen')}</span>
    </button>
  );
};
