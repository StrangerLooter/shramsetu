'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/store/app-store';
import { Plus, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function CommunityDashboardPage() {
  const { communityOrders } = useApp();

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      
      {/* Society Header */}
      <div className="bg-white rounded-2xl p-6 border border-border shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="font-display text-xl sm:text-2xl font-bold text-content">
              Arawali Heights Resident Welfare Association (RWA)
            </h1>
            <span className="text-[10px] bg-surface-subtle text-content-muted font-medium px-2 py-0.5 rounded border border-border/70">
              Verified Society
            </span>
          </div>
          <p className="text-xs sm:text-sm text-content-muted mt-1">
            Sector 56, Golf Course Road, Gurugram • 480 Residential Units
          </p>
          <div className="flex items-center gap-3 mt-2 text-xs text-content-muted">
            <span>Secretary: Col. V. K. Malhotra (Rtd)</span>
            <span>•</span>
            <span>Assigned Co-op: Nirman Workers Co-op</span>
          </div>
        </div>

        <Link href="/community/request">
          <Button variant="primary" size="md" leftIcon={<Plus className="w-4 h-4" />}>
            New Bulk Society Order
          </Button>
        </Link>
      </div>

      {/* Society Bulk Orders List */}
      <div className="bg-white rounded-2xl p-6 border border-border shadow-card space-y-4">
        <div>
          <h2 className="font-semibold text-base text-content">
            Society Maintenance Demands & Bulk Deployments
          </h2>
          <p className="text-xs text-content-muted mt-0.5">
            Instead of 10 individual bookings, dispatch coordinated multi-trade cooperative teams with a single invoice.
          </p>
        </div>

        <div className="space-y-4 pt-2">
          {communityOrders.map((order) => (
            <div 
              key={order.id}
              className="p-5 rounded-xl bg-surface-subtle border border-border space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-border/70">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-content text-sm">{order.eventName}</h3>
                    <span className="text-xs font-mono bg-white text-content-muted px-2 py-0.2 rounded border border-border/60">
                      #{order.id}
                    </span>
                  </div>
                  <p className="text-xs text-content-muted mt-0.5">Scheduled for: {order.date}</p>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-[10px] text-content-muted uppercase tracking-wider block">Total Society Budget</span>
                  <span className="text-base font-bold text-content">₹{order.totalBudget.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Required Workers Breakdown */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-semibold text-content uppercase tracking-wider block">
                  Allocated Cooperative Workforce Team:
                </span>
                <div className="flex flex-wrap gap-2">
                  {order.requiredWorkers.map((w, idx) => (
                    <span key={idx} className="bg-white border border-border px-3 py-1 rounded-lg text-xs font-medium text-content shadow-2xs">
                      {w.count}x {w.category.toUpperCase()} ({w.durationDays} Days)
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs">
                <span className="text-emerald-800 font-medium flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Team Dispatched via Nirman Workers Co-op</span>
                </span>

                <span className="text-content-muted font-medium">Status: {order.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
