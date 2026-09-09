'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store/app-store';
import { 
  ShieldCheck, 
  CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function WorkerWelfarePage() {
  const { activeWorker, welfarePrograms, language } = useApp();
  const [claimSuccess, setClaimSuccess] = useState<string | null>(null);

  const handleClaim = (programTitle: string) => {
    setClaimSuccess(programTitle);
    setTimeout(() => setClaimSuccess(null), 4000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-content">
          {language === 'hi' ? 'श्रमिक कल्याण एवं सुरक्षा वॉलेट' : 'Worker Welfare & Social Security'}
        </h1>
        <p className="text-xs sm:text-sm text-content-muted mt-1">
          Cashless health coverage, accidental insurance, free skill certification, and emergency grants funded through collective cooperative reserves.
        </p>
      </div>

      {claimSuccess && (
        <div className="p-4 rounded-2xl bg-surface-subtle border border-emerald-300 text-content text-xs flex items-center gap-2.5 shadow-subtle">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>Claim / Enrollment request initiated for <strong>{claimSuccess}</strong>. Your cooperative welfare secretary has been notified.</span>
        </div>
      )}

      {/* Welfare Wallet Credit Balance Card */}
      <div className="bg-white rounded-2xl p-6 border border-border shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div>
          <span className="text-xs font-semibold text-content-muted uppercase tracking-wider">
            Your Pooled Welfare Credit Balance
          </span>
          <div className="text-3xl sm:text-4xl font-bold tracking-tight text-content mt-1">
            ₹{activeWorker.welfareStatus.welfareCreditBalance.toLocaleString('en-IN')}
          </div>
          <p className="text-xs text-content-muted mt-1">
            Accrues automatically with every completed job (5% bonus share)
          </p>
        </div>

        <div className="flex items-center gap-2.5 bg-surface-subtle p-3 rounded-xl border border-border text-xs">
          <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
          <div>
            <div className="font-semibold text-content">Full Family Coverage Active</div>
            <span className="text-[11px] text-content-muted">Self + Spouse + 2 Children</span>
          </div>
        </div>
      </div>

      {/* Programs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {welfarePrograms.map((prog) => (
          <div 
            key={prog.id}
            className="bg-white rounded-2xl p-5 border border-border shadow-card hover:border-neutral-300 transition-all duration-150 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase tracking-wider bg-surface-subtle text-content px-2 py-0.5 rounded border border-border/70">
                  {prog.category}
                </span>
                <span className="text-xs font-bold text-emerald-700">{prog.coverageAmount}</span>
              </div>

              <h3 className="text-sm font-semibold text-content">{prog.title}</h3>
              <p className="text-xs text-content-muted leading-relaxed">{prog.description}</p>
              
              <div className="text-[11px] text-content-muted pt-1">
                Provider: <strong className="text-content font-medium">{prog.provider}</strong>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-border/70 flex items-center justify-between">
              <span className="text-[11px] font-medium text-emerald-800">✓ Eligible via Co-op</span>
              
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handleClaim(prog.title)}
              >
                Access Benefit
              </Button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
