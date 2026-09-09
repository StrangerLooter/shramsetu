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
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-content">
          {language === 'hi' ? 'मेरी संरक्षित कमाई लेज़र' : 'Protected Earnings & Wage Ledger'}
        </h1>
        <p className="text-xs sm:text-sm text-content-muted mt-1">
          Complete transparent accounting: 100% statutory labor floor disbursed directly without predatory commission deductions.
        </p>
      </div>

      {/* Instant Cashout Alert */}
      {cashoutSuccess && (
        <div className="p-4 rounded-2xl bg-surface-subtle border border-emerald-300 text-content text-xs flex items-center justify-between shadow-subtle">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <span className="font-semibold text-emerald-950">Instant Payout Disbursed via AEPS / UPI</span>
              <p className="text-[11px] text-content-muted mt-0.5">
                Ref: SHR-AEPS-{Date.now().toString().slice(-6)} • Credited to Jan Dhan Account (Aadhaar Verified)
              </p>
            </div>
          </div>
          <span className="text-emerald-800 font-semibold bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
            ✓ Audio Confirmed
          </span>
        </div>
      )}

      {/* Hero Earnings Banner */}
      <div className="bg-white rounded-2xl p-6 border border-border shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div>
          <span className="text-xs font-semibold text-content-muted uppercase tracking-wider">
            Total Monthly Net Earnings
          </span>
          <div className="text-3xl sm:text-4xl font-bold tracking-tight text-content mt-1">
            ₹{activeWorker.monthlyEarnings.toLocaleString('en-IN')}
          </div>
          <div className="flex items-center gap-2 mt-2 text-xs text-content-muted">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>100% Statutory Wage Floor Compliance</span>
          </div>
        </div>

        <div className="bg-surface-subtle p-4 rounded-xl border border-border text-xs space-y-2.5 sm:text-right">
          <div>
            <span className="text-content-muted block">Today's Available Balance</span>
            <span className="text-xl font-bold text-content">₹{activeWorker.todayEarnings}</span>
          </div>

          <Button
            variant="primary"
            size="sm"
            onClick={handleInstantCashout}
            leftIcon={<Zap className="w-3.5 h-3.5 text-amber-400" />}
          >
            Instant Payout (Earned Wage Access)
          </Button>
        </div>
      </div>

      {/* Financial Breakdown Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
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
      <div className="bg-white rounded-2xl p-6 border border-border shadow-card space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-border/70">
          <h3 className="font-semibold text-sm text-content flex items-center gap-2">
            <FileText className="w-4 h-4 text-content-muted" />
            <span>Recent Statutory Disbursals</span>
          </h3>
          <span className="text-xs text-content-muted">Direct to Bank / AEPS</span>
        </div>

        <div className="space-y-2.5">
          {[
            { id: 'TXN-9021', service: 'Plumbing & Pipe Repair', date: 'Today, 10:30 AM', wage: 350, bonus: 50, coop: 40, total: 400 },
            { id: 'TXN-9018', service: 'Deep Home Cleaning', date: 'Yesterday', wage: 450, bonus: 0, coop: 45, total: 450 },
            { id: 'TXN-9004', service: 'Electrical Wiring Repair', date: '07 Sep 2026', wage: 320, bonus: 80, coop: 35, total: 400 },
            { id: 'TXN-8991', service: 'Appliance Diagnostics', date: '06 Sep 2026', wage: 380, bonus: 0, coop: 38, total: 380 }
          ].map((item) => (
            <div key={item.id} className="p-3.5 rounded-xl bg-surface-subtle border border-border/70 flex items-center justify-between text-xs">
              <div>
                <div className="font-semibold text-content">{item.service}</div>
                <div className="text-[11px] text-content-muted">{item.date} • {item.id}</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-emerald-800 text-sm">₹{item.total}</div>
                <div className="text-[10px] text-content-muted">100% Protected Wage</div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
