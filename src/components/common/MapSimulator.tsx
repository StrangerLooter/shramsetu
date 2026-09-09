'use client';

import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Compass, ShieldCheck } from 'lucide-react';

interface Props {
  workerName?: string;
  workerAvatar?: string;
  workerPhone?: string;
  status: string;
  customerAddress: string;
  etaMinutes?: number;
}

export const MapSimulator: React.FC<Props> = ({
  workerName = 'Amit Verma',
  workerAvatar,
  workerPhone = '+91 98112 34501',
  status,
  customerAddress,
  etaMinutes = 12
}) => {
  const [progress, setProgress] = useState(30);

  // Transit simulation when on the way
  useEffect(() => {
    if (status === 'WORKER_ON_THE_WAY') {
      const interval = setInterval(() => {
        setProgress((prev) => (prev >= 90 ? 30 : prev + 10));
      }, 3000);
      return () => clearInterval(interval);
    } else if (status === 'ARRIVED' || status === 'IN_PROGRESS' || status === 'COMPLETED' || status === 'PAYMENT_SETTLED') {
      setProgress(100);
    }
  }, [status]);

  return (
    <div className="relative w-full h-[320px] sm:h-[360px] bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-inner flex flex-col justify-between p-4">
      {/* Map Graphic Background Simulation */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#60A5FA" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          <path d="M 10 80 Q 150 120 300 180 T 600 240" fill="none" stroke="#475569" strokeWidth="6" strokeLinecap="round" />
          <path d="M 120 10 Q 200 150 350 300 T 500 400" fill="none" stroke="#334155" strokeWidth="5" strokeLinecap="round" />
          <path d="M 50 300 Q 280 200 550 120" fill="none" stroke="#1E293B" strokeWidth="4" strokeLinecap="round" />
          {/* Active Route Polyline */}
          <path 
            d="M 60 220 Q 180 160 380 140 T 520 80" 
            fill="none" 
            stroke="#10B981" 
            strokeWidth="3" 
            strokeDasharray="6 4" 
            className="animate-pulse"
          />
        </svg>
      </div>

      {/* Top Map HUD Bar */}
      <div className="relative z-10 flex items-center justify-between gap-2">
        <div className="bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-800 flex items-center gap-2 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-xs font-medium text-slate-200 tracking-wide">
            {status === 'WORKER_ON_THE_WAY' 
              ? `Worker in Transit (ETA: ${etaMinutes} min)` 
              : status === 'ARRIVED' 
              ? 'Worker Arrived at Location' 
              : status === 'IN_PROGRESS' 
              ? 'Service Currently In Progress' 
              : 'GPS Cooperative Dispatch'}
          </span>
        </div>

        <div className="bg-slate-900/90 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-slate-800 text-[11px] text-slate-400 flex items-center gap-1.5">
          <Compass className="w-3.5 h-3.5 text-slate-400" />
          <span>Saket Sector 4 Hub</span>
        </div>
      </div>

      {/* Center Simulated Pin Animation */}
      <div className="relative z-10 flex items-center justify-center my-auto">
        <div className="relative flex items-center justify-between w-full max-w-sm px-6">
          {/* Customer Node */}
          <div className="flex flex-col items-center">
            <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 shadow-sm flex items-center justify-center text-white">
              <MapPin className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-medium text-slate-400 mt-1 bg-slate-900/80 px-2 py-0.5 rounded">
              Customer
            </span>
          </div>

          {/* Transit Connector */}
          <div className="flex-1 mx-3 relative h-1.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
            <div 
              className="h-full bg-emerald-500 transition-all duration-1000 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Worker Node */}
          <div className="flex flex-col items-center">
            <div className="w-9 h-9 rounded-full bg-emerald-600 border border-emerald-400 shadow-sm flex items-center justify-center text-white animate-bounce">
              <Navigation className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-medium text-emerald-300 mt-1 bg-slate-900/80 px-2 py-0.5 rounded">
              {workerName.split(' ')[0]} (Worker)
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Floating Card with Worker Details */}
      <div className="relative z-10 bg-slate-900/95 backdrop-blur-md p-3 rounded-xl border border-slate-800 text-white shadow-float flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="relative">
            {workerAvatar ? (
              <img src={workerAvatar} alt={workerName} className="w-10 h-10 rounded-full object-cover border border-slate-700" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center font-bold text-white">
                {workerName.charAt(0)}
              </div>
            )}
            <span className="absolute -bottom-0.5 -right-0.5 bg-emerald-600 text-[8px] font-bold p-0.5 rounded-full text-white">
              <ShieldCheck className="w-2.5 h-2.5" />
            </span>
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-sm">{workerName}</span>
              <span className="text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.2 rounded border border-slate-700">
                Verified Co-op
              </span>
            </div>
            <p className="text-xs text-slate-400 truncate max-w-xs">{customerAddress}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${workerPhone}`}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-medium border border-slate-700 transition-colors"
          >
            Call {workerPhone}
          </a>
        </div>
      </div>
    </div>
  );
};
