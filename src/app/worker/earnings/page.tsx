'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store/app-store';
import { 
  ShieldCheck, 
  CheckCircle2, 
  FileText, 
  Zap, 
  Check 
} from 'lucide-react';
import { speakSoundboxAnnouncement } from '@/lib/engines/soundbox';
import { MetricCard } from '@/components/ui/MetricCard';
import { Button } from '@/components/ui/Button';

export default function WorkerEarningsPage() {
  const { activeWorker, language } = useApp();
  const [cashoutSuccess, setCashoutSuccess] = useState(false);

  const handleInstantCashout = () => {
    setCashoutSuccess(true);
    speakSoundboxAnnouncement(
      language === 'hi'
        ? `श्रमसेतु द्वारा रुपये ${activeWorker.todayEarnings} का त्वरित पारिश्रमिक आपके आधार जन धन बैंक खाते में भेज दिया गया है।`
        : `Instant wage withdrawal of rupees ${activeWorker.todayEarnings} credited to your Aadhaar-linked Jan Dhan bank account.`,
      language === 'hi' ? 'hi' : 'en'
    );
    setTimeout(() => setCashoutSuccess(false), 5000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:py-16 space-y-8">
      
      {/* Editorial Header */}
      <div>
        <h1 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-[#121316]">
          {language === 'hi' ? (
            <>मेरी संरक्षित <span className="font-serif italic font-normal">कमाई लेज़र</span></>
          ) : (
            <>Protected Earnings & <span className="font-serif italic font-normal">Wage Ledger</span></>
          )}
        </h1>
        <p className="text-xs sm:text-sm text-[#66676E] mt-1 font-light">
          Complete transparent accounting: 100% statutory labor floor disbursed directly without predatory commission deductions.
        </p>
      </div>

      {/* Instant Cashout Alert */}
      {cashoutSuccess && (
        <div className="p-4 rounded-2xl bg-[#EBF5F0] border border-[#CCE6DA] text-[#121316] text-xs flex items-center justify-between shadow-subtle">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-[#0D2F28] shrink-0" />
            <div>
              <span className="font-semibold text-[#0D2F28]">Instant Payout Disbursed via AEPS / UPI</span>
              <p className="text-[11px] text-[#66676E] mt-0.5 font-light">
                Ref: SHR-AEPS-{Date.now().toString().slice(-6)} • Credited to Jan Dhan Account (Aadhaar Verified)
              </p>
            </div>
          </div>
          <span className="text-[#0D2F28] font-semibold bg-white px-2.5 py-1 rounded-lg border border-[#CCE6DA]">
            ✓ Audio Confirmed
          </span>
        </div>
      )}

      {/* Hero Earnings Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[rgba(18,19,22,0.08)] shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-semibold text-[#66676E] uppercase tracking-wider">
            Total Monthly Net Earnings
          </span>
          <div className="font-serif text-4xl sm:text-5xl font-normal tracking-tight text-[#121316] mt-2">
            ₹{activeWorker.monthlyEarnings.toLocaleString('en-IN')}
          </div>
          <div className="flex items-center gap-2 mt-3 text-xs text-[#0D2F28] font-medium">
            <CheckCircle2 className="w-4 h-4 text-[#0D2F28]" />
            <span>100% Statutory Wage Floor Compliance</span>
          </div>
        </div>

        <div className="bg-[#F2EFE9] p-5 rounded-2xl border border-[rgba(18,19,22,0.08)] text-xs space-y-3 sm:text-right">
          <div>
            <span className="text-[#66676E] block">Today's Available Balance</span>
            <span className="font-serif text-2xl font-bold text-[#121316]">₹{activeWorker.todayEarnings}</span>
          </div>

          <Button
            variant="primary"
            size="sm"
            onClick={handleInstantCashout}
            leftIcon={<Zap className="w-3.5 h-3.5 text-[#121316]" />}
          >
            Instant Payout (Earned Wage Access)
          </Button>
        </div>
      </div>

      {/* Financial Breakdown Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <MetricCard
          label="Total Completed Jobs"
          value={activeWorker.completedJobsTotal}
          subtext={`Across ${activeWorker.skills.join(', ')}`}
        />
        <MetricCard
          label="Welfare Pool Share"
          value={`₹${activeWorker.welfareStatus.welfareCreditBalance}`}
          subtext="Pooled healthcare reserve"
        />
        <MetricCard
          label="Middleman Cuts Avoided"
          value={`₹${Math.round(activeWorker.monthlyEarnings * 0.28).toLocaleString('en-IN')}`}
          subtext="Retained via cooperative system"
        />
      </div>

      {/* Recent Disbursals Ledger */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[rgba(18,19,22,0.08)] shadow-card space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-[rgba(18,19,22,0.08)]">
          <h3 className="font-serif text-lg font-normal text-[#121316] flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#66676E]" />
            <span>Recent Statutory Disbursals</span>
          </h3>
          <span className="text-xs text-[#66676E]">Direct to Bank / AEPS</span>
        </div>

        <div className="space-y-2.5">
          {[
            { id: 'TXN-9021', service: 'Plumbing & Pipe Repair', date: 'Today, 10:30 AM', wage: 350, bonus: 50, coop: 40, total: 400 },
            { id: 'TXN-9018', service: 'Deep Home Cleaning', date: 'Yesterday', wage: 450, bonus: 0, coop: 45, total: 450 },
            { id: 'TXN-9004', service: 'Electrical Wiring Repair', date: '07 Sep 2026', wage: 320, bonus: 80, coop: 35, total: 400 },
            { id: 'TXN-8991', service: 'Appliance Diagnostics', date: '06 Sep 2026', wage: 380, bonus: 0, coop: 38, total: 380 }
          ].map((item) => (
            <div key={item.id} className="p-4 rounded-2xl bg-[#F2EFE9] border border-[rgba(18,19,22,0.06)] flex items-center justify-between text-xs">
              <div>
                <div className="font-serif text-sm font-normal text-[#121316]">{item.service}</div>
                <div className="text-[11px] text-[#66676E] mt-0.5 font-light">{item.date} • {item.id}</div>
              </div>
              <div className="text-right">
                <div className="font-serif text-base font-bold text-[#0D2F28]">₹{item.total}</div>
                <div className="text-[10px] text-[#66676E]">100% Protected Wage</div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
