'use client';

import React, { useState } from 'react';
import { ShieldCheck, HeartHandshake, CheckCircle2, TrendingUp } from 'lucide-react';

export const WageComparisonCalculator: React.FC = () => {
  const [jobAmount, setJobAmount] = useState<number>(500);

  // Calculations for Private Aggregator App (e.g. Urban Company / typical gig app)
  const privateCommission = Math.round(jobAmount * 0.30); // 30% cut
  const privateSurgeFee = 50; // extra customer platform fee
  const privateCustomerTotal = jobAmount + privateSurgeFee;
  const privateWorkerNet = jobAmount - privateCommission;

  // Calculations for ShramSetu Cooperative Network
  const shramSetuWorkerWage = Math.round(jobAmount * 0.78); // ~78% protected direct labour wage
  const shramSetuCoopPool = Math.round(jobAmount * 0.12); // 12% health & accident pool
  const shramSetuCustomerTotal = jobAmount; // No surge

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-border shadow-card space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border/70">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Interactive Transparency Model</span>
          </span>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-content mt-1">
            Compare: ShramSetu vs Commercial Aggregators
          </h3>
          <p className="text-xs sm:text-sm text-content-muted mt-0.5">
            Slide to see how cooperative dispatches protect worker earnings and save customer expenses.
          </p>
        </div>

        {/* Amount Picker Slider */}
        <div className="bg-surface-subtle p-3 rounded-xl border border-border space-y-1.5 min-w-[220px]">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-content-muted">Service Base:</span>
            <span className="text-content text-sm">₹{jobAmount}</span>
          </div>
          <input 
            type="range" 
            min="300" 
            max="2000" 
            step="50"
            value={jobAmount}
            onChange={(e) => setJobAmount(Number(e.target.value))}
            className="w-full h-1.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-slate-900"
          />
          <div className="flex justify-between text-[10px] text-content-muted">
            <span>₹300 (Basic)</span>
            <span>₹2,000 (Major)</span>
          </div>
        </div>
      </div>

      {/* Side-by-Side Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* Commercial App (Predatory) */}
        <div className="rounded-xl p-5 bg-surface-subtle border border-border space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-content font-semibold text-xs sm:text-sm">
              <span className="w-5 h-5 rounded-full bg-neutral-200 text-content-secondary flex items-center justify-center text-xs">✕</span>
              <span>Commercial Aggregator Apps</span>
            </div>
            <span className="text-[10px] bg-white text-content-secondary font-medium px-2 py-0.5 rounded border border-border/60">
              30% Commission Cut
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between p-2.5 rounded-lg bg-white border border-border/70">
              <span className="text-content-muted">Customer Bill (with surge/convenience fee):</span>
              <span className="font-semibold text-content">₹{privateCustomerTotal}</span>
            </div>

            <div className="flex justify-between p-2.5 rounded-lg bg-white border border-border/70">
              <span className="text-content-muted">Middleman Commission Deducted:</span>
              <span className="font-semibold text-red-600">-₹{privateCommission}</span>
            </div>

            <div className="flex justify-between p-2.5 rounded-lg bg-white border border-border/70">
              <span className="text-content-muted">Worker Social Security / Health:</span>
              <span className="font-semibold text-content-muted">₹0 (Zero cover)</span>
            </div>

            <div className="pt-2 border-t border-border/80 flex justify-between items-center text-xs font-semibold">
              <span className="text-content">Final Worker Take-Home:</span>
              <span className="text-content text-sm font-bold">₹{privateWorkerNet}</span>
            </div>
          </div>
        </div>

        {/* ShramSetu Cooperative (Dignified) */}
        <div className="rounded-xl p-5 bg-white border border-emerald-300 space-y-4 shadow-subtle">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-emerald-900 font-semibold text-xs sm:text-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>ShramSetu Cooperative Network</span>
            </div>
            <span className="text-[10px] bg-emerald-50 text-emerald-800 font-medium px-2 py-0.5 rounded border border-emerald-200">
              100% Protected Wage
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between p-2.5 rounded-lg bg-surface-subtle border border-border/70">
              <span className="text-content-muted">Customer Fair Price (No hidden surge):</span>
              <span className="font-semibold text-content">₹{shramSetuCustomerTotal}</span>
            </div>

            <div className="flex justify-between p-2.5 rounded-lg bg-surface-subtle border border-border/70">
              <span className="text-content-muted">Protected Worker Take-Home:</span>
              <span className="font-bold text-emerald-800 text-sm">₹{shramSetuWorkerWage}</span>
            </div>

            <div className="flex justify-between p-2.5 rounded-lg bg-surface-subtle border border-border/70">
              <span className="text-content-muted flex items-center gap-1 font-medium">
                <HeartHandshake className="w-3.5 h-3.5 text-emerald-600" />
                <span>Co-op Healthcare & Emergency Pool:</span>
              </span>
              <span className="font-semibold text-content">₹{shramSetuCoopPool}</span>
            </div>

            <div className="pt-2 border-t border-border/80 flex justify-between items-center text-xs font-semibold text-emerald-900">
              <span>Worker Gains vs Commercial:</span>
              <span className="text-emerald-800 font-bold text-sm flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+₹{shramSetuWorkerWage - privateWorkerNet} Extra Cash</span>
              </span>
            </div>
          </div>
        </div>

      </div>

      <div className="text-center pt-1">
        <p className="text-xs text-content-muted font-medium">
          Under ShramSetu, household citizens pay fair rates and workers retain their full livelihood dignity with collective healthcare.
        </p>
      </div>
    </div>
  );
};
