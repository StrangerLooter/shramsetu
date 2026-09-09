'use client';

import React from 'react';

export const LiveActivityTicker: React.FC = () => {
  const activities = [
    { worker: 'Amit V.', trade: 'Plumbing', location: 'Saket, Delhi', amount: '₹350', coop: 'Shramik Seva Co-op', time: '2m ago' },
    { worker: 'Priya S.', trade: 'Deep Cleaning', location: 'Sector 62, Noida', amount: '₹450', coop: 'Sahyog Women Co-op', time: '5m ago' },
    { worker: 'Suresh P.', trade: 'Carpentry', location: 'Sector 14, Gurugram', amount: '₹350', coop: 'Nirman Workers Co-op', time: '8m ago' },
    { worker: 'Rajesh K.', trade: 'Electrical Fix', location: 'Greater Kailash, Delhi', amount: '₹320', coop: 'Shramik Seva Co-op', time: '11m ago' },
    { worker: 'Mohan S.', trade: 'Masonry Patch', location: 'Sohna Road, Gurugram', amount: '₹420', coop: 'Nirman Workers Co-op', time: '14m ago' },
  ];

  return (
    <div className="bg-slate-950 text-slate-300 py-2 overflow-hidden border-y border-slate-900 text-[11px] font-medium select-none">
      <div className="max-w-7xl mx-auto px-4 flex items-center gap-3">
        
        <div className="shrink-0 flex items-center gap-1.5 bg-slate-900 text-slate-200 px-2.5 py-0.5 rounded-full border border-slate-800 font-semibold uppercase tracking-wider text-[10px]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>Live Co-op Feed</span>
        </div>

        <div className="relative flex-1 overflow-hidden">
          <div className="animate-marquee whitespace-nowrap flex items-center gap-8">
            {[...activities, ...activities].map((act, i) => (
              <div key={i} className="inline-flex items-center gap-2 text-slate-400">
                <span className="font-semibold text-slate-200">{act.worker}</span>
                <span className="text-slate-600">•</span>
                <span className="text-slate-300">{act.trade} in {act.location}</span>
                <span className="text-slate-600">•</span>
                <span className="text-emerald-400 font-semibold bg-emerald-950/60 px-1.5 py-0.2 rounded border border-emerald-800/60">
                  {act.amount} Protected Wage
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-[10px] text-slate-500">{act.coop}</span>
                <span className="text-slate-600">({act.time})</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
