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
    <div className="max-w-4xl mx-auto px-4 py-12 sm:py-16 space-y-8">
      
      {/* Editorial Header */}
      <div>
        <h1 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-[#121316]">
          {language === 'hi' ? (
            <>श्रमिक कल्याण <span className="font-serif italic font-normal">एवं सुरक्षा वॉलेट</span></>
          ) : (
            <>Worker Welfare & <span className="font-serif italic font-normal">Social Security</span></>
          )}
        </h1>
        <p className="text-xs sm:text-sm text-[#66676E] mt-1 font-light">
          Cashless health coverage, accidental insurance, free skill certification, and emergency grants funded through collective cooperative reserves.
        </p>
      </div>

      {claimSuccess && (
        <div className="p-4 rounded-2xl bg-[#EBF5F0] border border-[#CCE6DA] text-[#121316] text-xs flex items-center gap-2.5 shadow-subtle">
          <CheckCircle2 className="w-5 h-5 text-[#0D2F28] shrink-0" />
          <span>Claim / Enrollment request initiated for <strong>{claimSuccess}</strong>. Your cooperative welfare secretary has been notified.</span>
        </div>
      )}

      {/* Welfare Wallet Credit Balance Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[rgba(18,19,22,0.08)] shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-semibold text-[#66676E] uppercase tracking-wider">
            Your Pooled Welfare Credit Balance
          </span>
          <div className="font-serif text-4xl sm:text-5xl font-normal tracking-tight text-[#121316] mt-2">
            ₹{activeWorker.welfareStatus.welfareCreditBalance.toLocaleString('en-IN')}
          </div>
          <p className="text-xs text-[#66676E] mt-1 font-light">
            Accrues automatically with every completed job (5% bonus share)
          </p>
        </div>

        <div className="flex items-center gap-3 bg-[#F2EFE9] p-4 rounded-2xl border border-[rgba(18,19,22,0.08)] text-xs">
          <ShieldCheck className="w-5 h-5 text-[#0D2F28] shrink-0" />
          <div>
            <div className="font-semibold text-[#121316]">Full Family Coverage Active</div>
            <span className="text-[11px] text-[#66676E] font-light">Self + Spouse + 2 Children</span>
          </div>
        </div>
      </div>

      {/* Programs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {welfarePrograms.map((prog) => (
          <div 
            key={prog.id}
            className="bg-white rounded-3xl p-6 border border-[rgba(18,19,22,0.08)] shadow-subtle hover:shadow-card hover:border-[rgba(18,19,22,0.18)] transition-all duration-150 flex flex-col justify-between"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase tracking-wider bg-[#F2EFE9] text-[#121316] px-2.5 py-0.5 rounded-full border border-[rgba(18,19,22,0.06)]">
                  {prog.category}
                </span>
                <span className="font-serif text-sm font-semibold text-[#0D2F28]">{prog.coverageAmount}</span>
              </div>

              <h3 className="font-serif text-base font-normal text-[#121316]">{prog.title}</h3>
              <p className="text-xs text-[#66676E] leading-relaxed font-light">{prog.description}</p>
              
              <div className="text-[11px] text-[#66676E] pt-1">
                Provider: <strong className="text-[#121316] font-medium">{prog.provider}</strong>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-[rgba(18,19,22,0.08)] flex items-center justify-between">
              <span className="text-[11px] font-medium text-[#0D2F28]">✓ Eligible via Co-op</span>
              
              <Button
                variant="primary"
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
