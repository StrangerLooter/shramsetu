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
    <div className="bg-[#121316] text-[#FBF9F5] py-2.5 overflow-hidden border-y border-white/10 text-[11px] font-medium select-none">
      <div className="max-w-6xl mx-auto px-4 flex items-center gap-3">
        
        <div className="shrink-0 flex items-center gap-1.5 bg-white/10 text-[#DDD6FE] px-2.5 py-0.5 rounded-full border border-white/10 font-medium uppercase tracking-wider text-[10px]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#DDD6FE]" />
          <span>Live Co-op Dispatches</span>
        </div>

        <div className="relative flex-1 overflow-hidden">
          <div className="animate-marquee whitespace-nowrap flex items-center gap-8">
            {[...activities, ...activities].map((act, i) => (
              <div key={i} className="inline-flex items-center gap-2 text-white/60">
                <span className="font-semibold text-white">{act.worker}</span>
                <span className="text-white/30">•</span>
                <span className="text-white/80">{act.trade} in {act.location}</span>
                <span className="text-white/30">•</span>
                <span className="text-[#DDD6FE] font-medium bg-white/10 px-1.5 py-0.5 rounded border border-white/15">
                  {act.amount} Protected Wage
                </span>
                <span className="text-white/30">•</span>
                <span className="text-[10px] text-white/50">{act.coop}</span>
                <span className="text-white/30">({act.time})</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
