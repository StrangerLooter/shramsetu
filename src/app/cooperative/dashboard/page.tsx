'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/store/app-store';
import { 
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
    <div className="max-w-6xl mx-auto px-4 py-12 sm:py-16 space-y-8">
      
      {/* 1. Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[rgba(18,19,22,0.08)] shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="font-serif text-2xl sm:text-3xl font-normal text-[#121316]">{activeCooperative.name}</h1>
            <span className="text-[11px] bg-[#F2EFE9] text-[#66676E] font-medium px-2.5 py-0.5 rounded-full border border-[rgba(18,19,22,0.06)]">
              Reg: {activeCooperative.registrationNumber}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#66676E] mt-1 font-light">{activeCooperative.description}</p>
          <div className="flex items-center gap-3 mt-2 text-xs text-[#66676E]">
            <span>📍 {activeCooperative.location}</span>
            <span>•</span>
            <span>{activeCooperative.region}</span>
          </div>
        </div>

        <Link href="/cooperative/allocation">
          <Button variant="primary" size="md" leftIcon={<Scale className="w-4 h-4 text-[#121316]" />}>
            Open Fair Allocation Console
          </Button>
        </Link>
      </div>

      {/* 2. Cooperative Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
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
          value="₹8.42L"
          subtext="Direct to artisans"
        />
        <MetricCard
          label="Welfare Pool"
          value="₹1.84L"
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
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[rgba(18,19,22,0.08)] shadow-card space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-[rgba(18,19,22,0.08)]">
          <div>
            <h2 className="font-serif text-xl font-normal text-[#121316]">
              Live Incoming Demands ({pendingJobs.length} Pending Allocation)
            </h2>
            <p className="text-xs text-[#66676E] font-light mt-0.5">
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
              className="p-5 rounded-2xl bg-[#F2EFE9] border border-[rgba(18,19,22,0.06)] flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[rgba(18,19,22,0.18)] transition-all duration-150"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-serif text-base font-normal text-[#121316]">{job.serviceName}</span>
                  <span className="text-xs font-mono bg-white px-2 py-0.5 rounded text-[#66676E] border border-[rgba(18,19,22,0.06)]">
                    #{job.id}
                  </span>
                  <StatusBadge status={job.status} size="sm" />
                </div>
                <p className="text-xs text-[#66676E] line-clamp-1 font-light">{job.description}</p>
                <div className="text-[11px] text-[#66676E]">
                  Customer: <strong className="text-[#121316] font-medium">{job.customerName}</strong> • {job.locationAddress}
                </div>
              </div>

              <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0">
                <div className="text-left sm:text-right">
                  <span className="text-[10px] text-[#66676E] block">Protected Wage</span>
                  <span className="font-serif text-base font-bold text-[#0D2F28]">₹{job.pricing.protectedWorkerWage}</span>
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
