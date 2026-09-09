'use client';

import React, { useState } from 'react';
import { ShieldCheck, HeartHandshake, CheckCircle2, TrendingUp } from 'lucide-react';

export const WageComparisonCalculator: React.FC = () => {
  const [jobAmount, setJobAmount] = useState<number>(500);

  // Calculations for Private Aggregator App (e.g. typical gig app)
  const privateCommission = Math.round(jobAmount * 0.30); // 30% cut
  const privateSurgeFee = 50; // extra customer platform fee
  const privateCustomerTotal = jobAmount + privateSurgeFee;
  const privateWorkerNet = jobAmount - privateCommission;

  // Calculations for ShramSetu Cooperative Network
  const shramSetuWorkerWage = Math.round(jobAmount * 0.78); // ~78% protected direct labour wage
  const shramSetuCoopPool = Math.round(jobAmount * 0.12); // 12% health & accident pool
  const shramSetuCustomerTotal = jobAmount; // No surge

  return (
    <div className="bg-white/95 text-[#121316] rounded-3xl p-6 sm:p-10 border border-[rgba(18,19,22,0.10)] shadow-card space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-[rgba(18,19,22,0.08)]">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#0D2F28] flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#0D2F28]" />
            <span>Interactive Transparency Model</span>
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#121316] mt-1">
            Compare <span className="font-serif italic font-normal">ShramSetu</span> vs Conventional Gig Apps
          </h3>
          <p className="text-xs sm:text-sm text-[#66676E] mt-1">
            Slide to see how cooperative dispatches protect worker earnings and save customer expenses.
          </p>
        </div>

        {/* Amount Picker Slider */}
        <div className="bg-[#F2EFE9] p-4 rounded-2xl border border-[rgba(18,19,22,0.08)] space-y-2 min-w-[240px]">
          <div className="flex justify-between text-xs font-medium">
            <span className="text-[#66676E]">Service Base:</span>
            <span className="font-serif text-base font-semibold text-[#121316]">₹{jobAmount}</span>
          </div>
          <input 
            type="range" 
            min="300" 
            max="2000" 
            step="50"
            value={jobAmount}
            onChange={(e) => setJobAmount(Number(e.target.value))}
            className="w-full h-1.5 bg-[#E2DDD3] rounded-lg appearance-none cursor-pointer accent-[#121316]"
          />
          <div className="flex justify-between text-[10px] text-[#66676E]">
            <span>₹300 (Basic)</span>
            <span>₹2,000 (Major)</span>
          </div>
        </div>
      </div>

      {/* Side-by-Side Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Commercial App (Predatory) */}
        <div className="rounded-2xl p-6 bg-[#F2EFE9] border border-[rgba(18,19,22,0.08)] space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-[#121316] font-medium text-xs sm:text-sm">
              <span className="w-5 h-5 rounded-full bg-[#E2DDD3] text-[#121316] flex items-center justify-center text-xs">✕</span>
              <span>Conventional Aggregators</span>
            </div>
            <span className="text-[10px] bg-white text-[#66676E] font-medium px-2.5 py-0.5 rounded-full border border-[rgba(18,19,22,0.08)]">
              30% Commission Cut
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between p-3 rounded-xl bg-white border border-[rgba(18,19,22,0.06)]">
              <span className="text-[#66676E]">Customer Bill (with surge/fees):</span>
              <span className="font-semibold text-[#121316]">₹{privateCustomerTotal}</span>
            </div>

            <div className="flex justify-between p-3 rounded-xl bg-white border border-[rgba(18,19,22,0.06)]">
              <span className="text-[#66676E]">Middleman Cut Deducted:</span>
              <span className="font-semibold text-red-700">-₹{privateCommission}</span>
            </div>

            <div className="flex justify-between p-3 rounded-xl bg-white border border-[rgba(18,19,22,0.06)]">
              <span className="text-[#66676E]">Worker Social Security & Health:</span>
              <span className="font-semibold text-[#66676E]">₹0 (Zero cover)</span>
            </div>

            <div className="pt-2 border-t border-[rgba(18,19,22,0.08)] flex justify-between items-center text-xs font-medium">
              <span className="text-[#121316]">Final Worker Take-Home:</span>
              <span className="font-serif text-lg font-bold text-[#121316]">₹{privateWorkerNet}</span>
            </div>
          </div>
        </div>

        {/* ShramSetu Cooperative (Dignified) */}
        <div className="rounded-2xl p-6 bg-white border-2 border-[#0D2F28]/30 space-y-4 shadow-subtle">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-[#0D2F28] font-semibold text-xs sm:text-sm">
              <CheckCircle2 className="w-5 h-5 text-[#0D2F28]" />
              <span>ShramSetu Cooperative Model</span>
            </div>
            <span className="text-[10px] bg-[#EBF5F0] text-[#0D2F28] font-semibold px-2.5 py-0.5 rounded-full border border-[#CCE6DA]">
              100% Protected Floor
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between p-3 rounded-xl bg-[#FBF9F5] border border-[rgba(18,19,22,0.06)]">
              <span className="text-[#66676E]">Customer Fair Price (No surge):</span>
              <span className="font-semibold text-[#121316]">₹{shramSetuCustomerTotal}</span>
            </div>

            <div className="flex justify-between p-3 rounded-xl bg-[#FBF9F5] border border-[rgba(18,19,22,0.06)]">
              <span className="text-[#66676E]">Protected Worker Take-Home:</span>
              <span className="font-serif text-lg font-bold text-[#0D2F28]">₹{shramSetuWorkerWage}</span>
            </div>

            <div className="flex justify-between p-3 rounded-xl bg-[#FBF9F5] border border-[rgba(18,19,22,0.06)]">
              <span className="text-[#66676E] flex items-center gap-1.5 font-medium">
                <HeartHandshake className="w-3.5 h-3.5 text-[#0D2F28]" />
                <span>Co-op Healthcare & Emergency Pool:</span>
              </span>
              <span className="font-semibold text-[#121316]">₹{shramSetuCoopPool}</span>
            </div>

            <div className="pt-2 border-t border-[rgba(18,19,22,0.08)] flex justify-between items-center text-xs font-semibold text-[#0D2F28]">
              <span>Worker Advantage vs Commercial:</span>
              <span className="font-serif text-base font-bold flex items-center gap-1 text-[#0D2F28]">
                <TrendingUp className="w-4 h-4" />
                <span>+₹{shramSetuWorkerWage - privateWorkerNet} Extra Cash</span>
              </span>
            </div>
          </div>
        </div>

      </div>

      <div className="text-center pt-2">
        <p className="text-xs text-[#66676E] font-light max-w-xl mx-auto">
          Under ShramSetu, household citizens pay fair rates and workers retain their full livelihood dignity with collective healthcare.
        </p>
      </div>
    </div>
  );
};
