'use client';

import React from 'react';
import { WorkerProfile } from '@/types';
import { 
  ShieldCheck, 
  X, 
  Printer, 
  CheckCircle2, 
  Share2
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface Props {
  worker: WorkerProfile;
  isOpen: boolean;
  onClose: () => void;
}

export const WorkerDigitalIDModal: React.FC<Props> = ({ worker, isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-md bg-white rounded-2xl overflow-hidden shadow-float border border-border">
        
        {/* Top Header Controls */}
        <div className="bg-slate-950 px-5 py-3 text-white flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Digital Worker Identity Card (e-Shram)</span>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Physical Card Layout */}
        <div className="p-6 space-y-4 bg-canvas">
          
          {/* Card Badge */}
          <div className="bg-slate-900 text-white p-4 rounded-xl shadow-subtle border border-slate-800">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-semibold tracking-wider text-emerald-400 uppercase block">
                  Ministry of Cooperation • ShramSetu
                </span>
                <h3 className="text-xs font-bold tracking-tight text-white mt-0.5">
                  CERTIFIED ARTISAN IDENTITY PASS
                </h3>
              </div>
              <div className="text-sm font-bold">
                🇮🇳
              </div>
            </div>

            {/* Photo and Details */}
            <div className="mt-4 flex items-center gap-3.5">
              <div className="relative shrink-0">
                <img 
                  src={worker.avatar} 
                  alt={worker.name} 
                  className="w-16 h-16 rounded-xl object-cover border border-slate-700 shadow-2xs"
                />
                <span className="absolute -bottom-1 -right-1 bg-emerald-600 text-white text-[9px] font-bold p-0.5 rounded-full shadow">
                  ✓
                </span>
              </div>

              <div className="space-y-0.5">
                <h4 className="text-sm font-bold text-white">{worker.name}</h4>
                <div className="text-xs text-emerald-300 capitalize">
                  Verified Master {worker.skills.join(' & ')}
                </div>
                <div className="text-[11px] text-slate-400 font-mono">
                  UAN: 9812-4029-{worker.id.replace('worker-', '710')}
                </div>
                <div className="text-[10px] text-slate-500">
                  Coop Reg: {worker.cooperativeName.split(' ')[0]} / 2026
                </div>
              </div>
            </div>
          </div>

          {/* Verification Badges */}
          <div className="grid grid-cols-2 gap-2.5 text-xs">
            <div className="p-3 bg-white rounded-xl border border-border">
              <span className="text-[10px] text-content-muted font-semibold block uppercase">Social Security</span>
              <strong className="text-content font-semibold text-xs block mt-0.5">Ayushman Health</strong>
              <div className="text-[10px] text-emerald-700 mt-0.5">₹5,00,000 Cashless Cover</div>
            </div>

            <div className="p-3 bg-white rounded-xl border border-border">
              <span className="text-[10px] text-content-muted font-semibold block uppercase">Accreditation</span>
              <strong className="text-content font-semibold text-xs block mt-0.5">Govt ITI (Level 4)</strong>
              <div className="text-[10px] text-content-muted mt-0.5">Skill India Certified</div>
            </div>
          </div>

          {/* Cryptographic QR Security Code */}
          <div className="p-4 bg-white rounded-xl border border-border flex items-center justify-between gap-3">
            <div>
              <span className="text-xs font-semibold text-content block">
                Apartment Security Gate Pass
              </span>
              <p className="text-[11px] text-content-muted mt-0.5 leading-relaxed">
                Scan with smartphone or MyGate terminal to verify police clearance & active job assignment.
              </p>
              <div className="text-[10px] text-emerald-800 font-medium mt-1.5 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Digitally Signed by District Registrar</span>
              </div>
            </div>

            {/* Generated QR Code SVG */}
            <div className="w-16 h-16 shrink-0 bg-slate-950 p-1.5 rounded-lg flex items-center justify-center text-white">
              <svg viewBox="0 0 100 100" className="w-full h-full fill-current text-white">
                <path d="M0,0 h30 v30 h-30 z M10,10 h10 v10 h-10 z M70,0 h30 v30 h-30 z M80,10 h10 v10 h-10 z M0,70 h30 v30 h-30 z M10,80 h10 v10 h-10 z M40,10 h10 v10 h-10 z M50,40 h20 v10 h-20 z M40,60 h10 v20 h-10 z M60,70 h20 v20 h-20 z M70,40 h10 v10 h-10 z M20,40 h10 v20 h-10 z" />
              </svg>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 pt-1">
            <Button
              variant="primary"
              size="sm"
              onClick={handlePrint}
              leftIcon={<Printer className="w-4 h-4" />}
              className="flex-1"
            >
              Print Gate ID Pass
            </Button>

            <Button
              variant="secondary"
              size="sm"
              onClick={() => alert('Digital ID Pass shared to WhatsApp/Aadhaar vault!')}
              leftIcon={<Share2 className="w-4 h-4" />}
            >
              Share Pass
            </Button>
          </div>

        </div>

      </div>
    </div>
  );
};
