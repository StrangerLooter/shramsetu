'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/store/app-store';
import { 
  ShieldCheck, 
  MapPin, 
  Navigation, 
  CheckCircle2, 
  ArrowRight, 
  HeartHandshake, 
  BookOpen, 
  Phone,
  QrCode
} from 'lucide-react';
import { WorkerDigitalIDModal } from '@/components/common/WorkerDigitalIDModal';
import { VoiceReaderButton } from '@/components/common/VoiceReaderButton';
import { MetricCard } from '@/components/ui/MetricCard';
import { Button } from '@/components/ui/Button';

export default function WorkerDashboardPage() {
  const { activeWorker, jobs, updateJobStatus, language, t } = useApp();
  const [idModalOpen, setIdModalOpen] = useState(false);

  // Find worker's current active or upcoming job
  const activeJob = jobs.find(j => 
    j.workerId === activeWorker.id && 
    j.status !== 'PAYMENT_SETTLED' && 
    j.status !== 'CANCELLED'
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 space-y-6">
      
      {/* 1. Worker Header & Dignity Greeting */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[rgba(18,19,22,0.08)] shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="relative shrink-0">
            <img 
              src={activeWorker.avatar} 
              alt={activeWorker.name} 
              className="w-16 h-16 sm:w-18 sm:h-18 rounded-full object-cover border border-[rgba(18,19,22,0.08)] shadow-subtle"
            />
            <span className="absolute -bottom-1 -right-1 bg-[#0D2F28] text-white p-1 rounded-full text-[10px]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#DDD6FE]" />
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="font-serif text-2xl sm:text-3xl font-normal text-[#121316]">
                {language === 'hi' ? `${t.workerGreeting}, ${activeWorker.nameHi}` : `${t.workerGreeting}, ${activeWorker.name}`}
              </h1>
              <span className="text-[11px] bg-[#F2EFE9] text-[#121316] font-medium px-2.5 py-0.5 rounded-full border border-[rgba(18,19,22,0.08)]">
                {language === 'hi' ? 'सत्यापित कामगार' : 'Verified Co-op Member'}
              </span>
            </div>
            <p className="text-xs text-[#66676E] mt-1 font-light">{activeWorker.cooperativeName}</p>
            <div className="flex items-center gap-2 mt-2 text-xs text-[#66676E]">
              <span>★ {activeWorker.rating} ({activeWorker.completedJobsTotal} jobs)</span>
              <span>•</span>
              <span className="text-[#0D2F28] font-semibold">100% Protected Wage Floor</span>
            </div>
          </div>
        </div>

        {/* Welfare Quick Status & ID Pass Action */}
        <div className="flex flex-col sm:items-end gap-2 shrink-0">
          <div className="bg-[#F2EFE9] p-3 rounded-2xl border border-[rgba(18,19,22,0.08)] text-xs space-y-0.5">
            <div className="flex items-center gap-1.5 text-[#0D2F28] font-semibold">
              <HeartHandshake className="w-4 h-4 text-[#0D2F28]" />
              <span>Ayushman Health Active</span>
            </div>
            <p className="text-[11px] text-[#66676E] font-light">₹5,00,000 Cashless Hospitalization</p>
          </div>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => setIdModalOpen(true)}
            leftIcon={<QrCode className="w-3.5 h-3.5" />}
          >
            Digital Worker ID Pass
          </Button>
        </div>
      </div>

      {/* 2. Worker Quick KPIs Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <MetricCard
          label={t.todaysEarnings}
          value={`₹${activeWorker.todayEarnings}`}
          subtext="Direct to bank account"
        />
        <MetricCard
          label={t.todayJobs}
          value={activeWorker.completedJobsToday}
          subtext={`Workload score: ${activeWorker.workloadScore}%`}
        />
        <MetricCard
          label="This Month"
          value={`₹${activeWorker.monthlyEarnings}`}
          subtext="Zero middleman cut"
        />
        <MetricCard
          label="Welfare Balance"
          value={`₹${activeWorker.welfareStatus.welfareCreditBalance}`}
          subtext="Co-op pool credit"
        />
      </div>

      {/* 3. ACTIVE JOB DISPATCH CONTROLLER (HERO WORKER ACTION) */}
      {activeJob ? (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#121316] shadow-card space-y-5">
          <div className="flex items-center justify-between pb-4 border-b border-[rgba(18,19,22,0.08)]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0D2F28] animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-wider text-[#121316]">
                {t.nextJob} (#{activeJob.id})
              </span>
            </div>
            <div className="flex items-center gap-2">
              <VoiceReaderButton 
                textToRead={`${activeJob.serviceName}. ${activeJob.description}. Customer: ${activeJob.customerName}. Address: ${activeJob.locationAddress}`}
                label={language === 'hi' ? 'बोलकर सुनें' : 'Audio Instructions'} 
              />
              <span className="text-xs font-semibold bg-[#F2EFE9] text-[#121316] px-3 py-1 rounded-full border border-[rgba(18,19,22,0.08)]">
                {activeJob.status}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-normal text-[#121316]">{activeJob.serviceName}</h2>
              <p className="text-xs sm:text-sm text-[#66676E] mt-1 font-light">{activeJob.description}</p>
              
              <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-[#66676E]">
                <span className="flex items-center gap-1 font-medium text-[#121316]">
                  <MapPin className="w-4 h-4 text-[#66676E]" />
                  {activeJob.locationAddress}
                </span>
                <span>•</span>
                <span>Customer: <strong className="text-[#121316] font-medium">{activeJob.customerName}</strong></span>
              </div>
            </div>

            <div className="sm:text-right shrink-0">
              <span className="text-xs text-[#66676E] block">Protected Earning</span>
              <span className="font-serif text-3xl font-semibold text-[#0D2F28]">₹{activeJob.pricing.protectedWorkerWage}</span>
            </div>
          </div>

          {/* Big Tap Actions for Worker (Accessible on basic mobile screens) */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            {activeJob.status === 'ASSIGNED' && (
              <Button
                variant="primary"
                size="lg"
                onClick={() => updateJobStatus(activeJob.id, 'ACCEPTED')}
                className="flex-1 min-h-[52px]"
              >
                ✓ {t.acceptJob}
              </Button>
            )}

            {activeJob.status === 'ACCEPTED' && (
              <Button
                variant="primary"
                size="lg"
                onClick={() => updateJobStatus(activeJob.id, 'WORKER_ON_THE_WAY')}
                leftIcon={<Navigation className="w-4 h-4 text-[#121316]" />}
                className="flex-1 min-h-[52px]"
              >
                {t.startNavigation}
              </Button>
            )}

            {activeJob.status === 'WORKER_ON_THE_WAY' && (
              <Button
                variant="primary"
                size="lg"
                onClick={() => updateJobStatus(activeJob.id, 'ARRIVED')}
                className="flex-1 min-h-[52px]"
              >
                📍 {t.arrivedAtCustomer}
              </Button>
            )}

            {activeJob.status === 'ARRIVED' && (
              <Button
                variant="primary"
                size="lg"
                onClick={() => updateJobStatus(activeJob.id, 'IN_PROGRESS')}
                className="flex-1 min-h-[52px]"
              >
                ⚡ {t.startWork}
              </Button>
            )}

            {activeJob.status === 'IN_PROGRESS' && (
              <Button
                variant="primary"
                size="lg"
                onClick={() => updateJobStatus(activeJob.id, 'COMPLETED', {
                  completionProof: {
                    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500&auto=format&fit=crop&q=80',
                    notes: 'Fitting verified and water leakage completely sealed.',
                    completedAt: new Date().toISOString()
                  }
                })}
                className="flex-1 min-h-[52px]"
              >
                📸 {t.uploadProofComplete}
              </Button>
            )}

            {activeJob.status === 'COMPLETED' && (
              <div className="flex-1 p-4 rounded-2xl bg-[#EBF5F0] text-[#0D2F28] font-semibold text-xs text-center border border-[#CCE6DA]">
                ✓ Photo Proof Uploaded. Awaiting Customer Escrow Release!
              </div>
            )}

            <a
              href={`tel:${activeJob.customerPhone}`}
              className="inline-flex items-center justify-center gap-2 px-5 min-h-[52px] rounded-xl border border-[rgba(18,19,22,0.15)] bg-[#F2EFE9] text-[#121316] font-medium text-xs sm:text-sm hover:bg-[#EAE6DE] transition-all"
            >
              <Phone className="w-4 h-4 text-[#66676E]" />
              <span>Call Customer</span>
            </a>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-10 text-center border border-[rgba(18,19,22,0.08)] shadow-subtle">
          <CheckCircle2 className="w-10 h-10 text-[#0D2F28] mx-auto mb-3" />
          <h3 className="font-serif text-xl font-normal text-[#121316]">All Current Jobs Completed</h3>
          <p className="text-xs text-[#66676E] mt-1 font-light">
            You are ready to receive the next fair allocation from {activeWorker.cooperativeName}.
          </p>
        </div>
      )}

      {/* 4. Welfare & Skill Upgradation Banners */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link 
          href="/worker/welfare"
          className="bg-white p-6 rounded-3xl border border-[rgba(18,19,22,0.08)] hover:border-[rgba(18,19,22,0.18)] shadow-subtle transition-all flex items-center justify-between group"
        >
          <div className="space-y-1">
            <div className="flex items-center gap-2 font-serif text-sm font-normal text-[#121316]">
              <HeartHandshake className="w-4 h-4 text-[#0D2F28]" />
              <span>Ayushman & Suraksha Health Cover</span>
            </div>
            <p className="text-[11px] text-[#66676E] font-light">100% cashless claims enabled for your family.</p>
          </div>
          <ArrowRight className="w-4 h-4 text-[#66676E] group-hover:translate-x-1 transition-transform" />
        </Link>

        <Link 
          href="/worker/welfare"
          className="bg-white p-6 rounded-3xl border border-[rgba(18,19,22,0.08)] hover:border-[rgba(18,19,22,0.18)] shadow-subtle transition-all flex items-center justify-between group"
        >
          <div className="space-y-1">
            <div className="flex items-center gap-2 font-serif text-sm font-normal text-[#121316]">
              <BookOpen className="w-4 h-4 text-[#1E3A8A]" />
              <span>PM Kaushal Skill Modules</span>
            </div>
            <p className="text-[11px] text-[#66676E] font-light">2 free certified courses with ₹2,000 completion stipend.</p>
          </div>
          <ArrowRight className="w-4 h-4 text-[#66676E] group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Digital Worker ID Modal */}
      <WorkerDigitalIDModal
        worker={activeWorker}
        isOpen={idModalOpen}
        onClose={() => setIdModalOpen(false)}
      />
    </div>
  );
}
