'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/store/app-store';
import { 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { MetricCard } from '@/components/ui/MetricCard';
import { Button } from '@/components/ui/Button';

export default function PlatformAdminDashboardPage() {
  const { jobs, language } = useApp();

  const disputedJobs = jobs.filter(j => j.status === 'DISPUTED');

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 sm:py-16 space-y-8">
      
      {/* 1. National Ministry Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[rgba(18,19,22,0.08)] shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-normal text-[#121316]">
            {language === 'hi' ? (
              <>सहकारिता मंत्रालय एवं <span className="font-serif italic font-normal">नियंत्रण केंद्र</span></>
            ) : (
              <>Ministry of Cooperation & <span className="font-serif italic font-normal">Ecosystem Oversight</span></>
            )}
          </h1>
          <p className="text-xs sm:text-sm text-[#66676E] mt-1 max-w-2xl leading-relaxed font-light">
            Public digital infrastructure monitoring: Statutory wage floor compliance, democratic cooperative dispatch, and worker social security.
          </p>
          <div className="flex items-center gap-3 mt-3 text-xs text-[#66676E]">
            <span className="flex items-center gap-1.5 text-[#0D2F28] font-medium">
              <span className="w-2 h-2 rounded-full bg-[#0D2F28]" />
              186 Cooperatives Connected
            </span>
            <span>•</span>
            <span>100% Statutory Compliance</span>
          </div>
        </div>

        <div className="bg-[#F2EFE9] p-5 rounded-2xl border border-[rgba(18,19,22,0.08)] text-xs sm:text-right shrink-0">
          <span className="text-[#66676E] block font-light">Total Protected Wages Distributed</span>
          <span className="font-serif text-3xl font-bold text-[#0D2F28]">₹42,84,500</span>
        </div>
      </div>

      {/* 2. Top Macro KPIs (6 Cards) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        <MetricCard
          label="Workers"
          value="12,842"
          subtext="+148 this week"
        />
        <MetricCard
          label="Cooperatives"
          value="186"
          subtext="14 States"
        />
        <MetricCard
          label="Completed Jobs"
          value="8,492"
          subtext="99.4% resolution"
        />
        <MetricCard
          label="Welfare Covered"
          value="7,621"
          subtext="Ayushman Bharat"
        />
        <MetricCard
          label="Pending Audits"
          value="127"
          subtext="ITI / KYC reviews"
        />
        <MetricCard
          label="Grievances"
          value={disputedJobs.length}
          subtext="Arbitration queue"
        />
      </div>

      {/* 3. Real-Time Statutory Wage Floor Compliance Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[rgba(18,19,22,0.08)] shadow-card space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-[rgba(18,19,22,0.08)]">
          <div>
            <h2 className="font-serif text-xl font-normal text-[#121316]">
              Statutory Wage Compliance by Regional Trade
            </h2>
            <p className="text-xs text-[#66676E] font-light mt-0.5">
              Wage floor enforcement: Prevents predatory downward bidding and safeguards minimum artisan compensation.
            </p>
          </div>

          <Link href="/admin/wage-compliance">
            <Button variant="secondary" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
              Full Compliance Auditor
            </Button>
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-[rgba(18,19,22,0.08)] text-[#66676E] font-medium">
                <th className="py-3 px-3">Trade Category</th>
                <th className="py-3 px-3">Statutory Minimum Floor</th>
                <th className="py-3 px-3">Average Payout</th>
                <th className="py-3 px-3">Compliance Rate</th>
                <th className="py-3 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(18,19,22,0.06)]">
              {[
                { trade: 'Plumbing & Sanitation', floor: '₹350/job', avg: '₹412/job', rate: '100%', compliant: true },
                { trade: 'Electrical Systems', floor: '₹300/job', avg: '₹380/job', rate: '100%', compliant: true },
                { trade: 'Carpentry & Joinery', floor: '₹400/job', avg: '₹480/job', rate: '100%', compliant: true },
                { trade: 'Painting & Finishing', floor: '₹450/job', avg: '₹520/job', rate: '99.8%', compliant: true },
                { trade: 'Appliance Repair', floor: '₹350/job', avg: '₹430/job', rate: '100%', compliant: true },
              ].map((row, idx) => (
                <tr key={idx} className="hover:bg-[#F2EFE9]/60 transition-colors">
                  <td className="py-3.5 px-3 font-medium text-[#121316]">{row.trade}</td>
                  <td className="py-3.5 px-3 text-[#66676E]">{row.floor}</td>
                  <td className="py-3.5 px-3 font-semibold text-[#0D2F28]">{row.avg}</td>
                  <td className="py-3.5 px-3 font-semibold text-[#121316]">{row.rate}</td>
                  <td className="py-3.5 px-3">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#0D2F28] bg-[#EBF5F0] px-2.5 py-0.5 rounded-full border border-[#CCE6DA]">
                      <CheckCircle2 className="w-3 h-3 text-[#0D2F28]" />
                      Statutory Compliant
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Active Dispute & Grievance Queue */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[rgba(18,19,22,0.08)] shadow-card space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[rgba(18,19,22,0.08)]">
          <div>
            <h2 className="font-serif text-xl font-normal text-[#121316]">
              Active Grievance & Arbitration Queue ({disputedJobs.length})
            </h2>
            <p className="text-xs text-[#66676E] font-light mt-0.5">
              Disputed orders held in platform escrow pending cooperative arbitration.
            </p>
          </div>

          <Link href="/admin/disputes">
            <Button variant="secondary" size="sm">
              View All Disputes
            </Button>
          </Link>
        </div>

        {disputedJobs.length === 0 ? (
          <div className="p-8 text-center bg-[#F2EFE9] rounded-2xl border border-[rgba(18,19,22,0.08)] text-xs text-[#66676E]">
            Zero active disputes in the arbitration queue. 99.4% first-time resolution rate.
          </div>
        ) : (
          <div className="space-y-3">
            {disputedJobs.map((dj) => (
              <div key={dj.id} className="p-4 rounded-2xl bg-[#F2EFE9] border border-red-200 flex items-center justify-between text-xs">
                <div>
                  <div className="font-serif text-sm font-normal text-[#121316]">{dj.serviceName} (#{dj.id})</div>
                  <div className="text-[11px] text-[#66676E] mt-0.5 font-light">
                    Customer: {dj.customerName} • Worker: {dj.workerName}
                  </div>
                </div>

                <Link href={`/customer/bookings/${dj.id}`}>
                  <Button variant="outline" size="sm">
                    Inspect Ticket
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
