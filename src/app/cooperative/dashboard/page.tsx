'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/store/app-store';
import { 
  Users, 
  Scale, 
  ArrowRight
} from 'lucide-react';
import { MetricCard } from '@/components/ui/MetricCard';
import { Button } from '@/components/ui/Button';
import { StatusBadge } from '@/components/ui/StatusBadge';

export default function CooperativeDashboardPage() {
  const { activeCooperative, jobs, language } = useApp();

  const pendingJobs = jobs.filter(j => j.status === 'MATCHING' || j.status === 'REQUESTED');

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      
      {/* 1. Header Banner */}
      <div className="bg-white rounded-2xl p-6 border border-border shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="font-display text-xl sm:text-2xl font-bold text-content">{activeCooperative.name}</h1>
            <span className="text-[10px] bg-surface-subtle text-content-muted font-medium px-2 py-0.5 rounded border border-border/70">
              Reg: {activeCooperative.registrationNumber}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-content-muted mt-1">{activeCooperative.description}</p>
          <div className="flex items-center gap-3 mt-2 text-xs text-content-muted">
            <span>📍 {activeCooperative.location}</span>
            <span>•</span>
            <span>{activeCooperative.region}</span>
          </div>
        </div>

        <Link href="/cooperative/allocation">
          <Button variant="primary" size="md" leftIcon={<Scale className="w-4 h-4" />}>
            Open Fair Allocation Console
          </Button>
        </Link>
      </div>

      {/* 2. Cooperative Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <MetricCard
          label="Total Members"
          value={activeCooperative.totalMembers}
          subtext="63 on active duty"
        />
        <MetricCard
          label="Jobs Today"
          value="27"
          subtext="412 this month"
        />
        <MetricCard
          label="Monthly Disbursed"
          value="₹8.42 Lakh"
          subtext="Direct to artisans"
        />
        <MetricCard
          label="Welfare Pool"
          value="₹1.84 Lakh"
          subtext="Healthcare reserve"
        />
        <MetricCard
          label="Fairness Index"
          value={`${activeCooperative.fairnessIndex}%`}
          subtext="Balanced workload"
        />
        <MetricCard
          label="Wage Compliance"
          value="100%"
          subtext="Zero wage dilution"
        />
      </div>

      {/* 3. Pending Job Demands & Fast Allocation Bar */}
      <div className="bg-white rounded-2xl p-6 border border-border shadow-card space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-border/70">
          <div>
            <h2 className="font-semibold text-base text-content">
              Live Incoming Demands ({pendingJobs.length} Pending Allocation)
            </h2>
            <p className="text-xs text-content-muted">
              Citizen service requests awaiting cooperative dispatch via the fair allocation engine.
            </p>
          </div>

          <Link href="/cooperative/allocation">
            <Button variant="secondary" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
              Process All in Engine
            </Button>
          </Link>
        </div>

        <div className="space-y-3">
          {pendingJobs.map((job) => (
            <div 
              key={job.id}
              className="p-4 rounded-xl bg-surface-subtle border border-border/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-neutral-300 transition-all duration-150"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-xs sm:text-sm text-content">{job.serviceName}</span>
                  <span className="text-xs font-mono bg-white px-2 py-0.5 rounded text-content-muted border border-border/60">
                    #{job.id}
                  </span>
                  <StatusBadge status={job.status} size="sm" />
                </div>
                <p className="text-xs text-content-muted line-clamp-1">{job.description}</p>
                <div className="text-[11px] text-content-muted">
                  Customer: <strong className="text-content font-medium">{job.customerName}</strong> • {job.locationAddress}
                </div>
              </div>

              <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0">
                <div className="text-left sm:text-right">
                  <span className="text-[10px] text-content-muted block">Protected Wage</span>
                  <span className="text-sm font-bold text-emerald-700">₹{job.pricing.protectedWorkerWage}</span>
                </div>

                <Link href={`/cooperative/allocation`}>
                  <Button variant="primary" size="sm">
                    Allocate Worker
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
