'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/store/app-store';
import { Plus, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function CommunityDashboardPage() {
  const { communityOrders } = useApp();

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 sm:py-16 space-y-8">
      
      {/* Society Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[rgba(18,19,22,0.08)] shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="font-serif text-2xl sm:text-3xl font-normal text-[#121316]">
              Arawali Heights Resident Welfare Association
            </h1>
            <span className="text-[11px] bg-[#F2EFE9] text-[#66676E] font-medium px-2.5 py-0.5 rounded-full border border-[rgba(18,19,22,0.06)]">
              Verified Society RWA
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#66676E] mt-1 font-light">
            Sector 56, Golf Course Road, Gurugram • 480 Residential Units
          </p>
          <div className="flex items-center gap-3 mt-2 text-xs text-[#66676E]">
            <span>Secretary: Col. V. K. Malhotra (Rtd)</span>
            <span>•</span>
            <span>Assigned Co-op: Nirman Workers Co-op</span>
          </div>
        </div>

        <Link href="/community/request">
          <Button variant="primary" size="md" leftIcon={<Plus className="w-4 h-4 text-[#121316]" />}>
            New Bulk Society Order
          </Button>
        </Link>
      </div>

      {/* Society Bulk Orders List */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[rgba(18,19,22,0.08)] shadow-card space-y-5">
        <div>
          <h2 className="font-serif text-xl font-normal text-[#121316]">
            Society Maintenance Demands & Bulk Deployments
          </h2>
          <p className="text-xs text-[#66676E] font-light mt-0.5">
            Instead of 10 individual bookings, dispatch coordinated multi-trade cooperative teams with a single invoice.
          </p>
        </div>

        <div className="space-y-4 pt-2">
          {communityOrders.map((order) => (
            <div 
              key={order.id}
              className="p-6 rounded-2xl bg-[#F2EFE9] border border-[rgba(18,19,22,0.06)] space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[rgba(18,19,22,0.08)]">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif text-base font-normal text-[#121316]">{order.eventName}</h3>
                    <span className="text-xs font-mono bg-white text-[#66676E] px-2 py-0.5 rounded border border-[rgba(18,19,22,0.06)]">
                      #{order.id}
                    </span>
                  </div>
                  <p className="text-xs text-[#66676E] mt-0.5 font-light">Scheduled for: {order.date}</p>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-[10px] text-[#66676E] uppercase tracking-wider block">Total Society Budget</span>
                  <span className="font-serif text-lg font-bold text-[#121316]">₹{order.totalBudget.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Required Workers Breakdown */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-semibold text-[#121316] uppercase tracking-wider block">
                  Allocated Cooperative Workforce Team:
                </span>
                <div className="flex flex-wrap gap-2">
                  {order.requiredWorkers.map((w, idx) => (
                    <span key={idx} className="bg-white border border-[rgba(18,19,22,0.08)] px-3 py-1 rounded-xl text-xs font-medium text-[#121316] shadow-subtle">
                      {w.count}x {w.category.toUpperCase()} ({w.durationDays} Days)
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs">
                <span className="text-[#0D2F28] font-medium flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#0D2F28]" />
                  <span>Team Dispatched via Nirman Workers Co-op</span>
                </span>

                <span className="text-[#66676E] font-medium">Status: {order.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
