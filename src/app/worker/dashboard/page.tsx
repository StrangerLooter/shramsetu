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
    <div className="max-w-4xl mx-auto px-4 py-6 sm:py-10 space-y-6">
      
      {/* 1. Worker Header & Dignity Greeting */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-border shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <div className="relative shrink-0">
            <img 
              src={activeWorker.avatar} 
              alt={activeWorker.name} 
              className="w-15 h-15 sm:w-16 sm:h-16 rounded-full object-cover border border-border shadow-2xs"
            />
            <span className="absolute -bottom-1 -right-1 bg-emerald-600 text-white p-1 rounded-full text-[10px]">
              <ShieldCheck className="w-3.5 h-3.5" />
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="font-display text-lg sm:text-xl font-bold text-content">
                {language === 'hi' ? `${t.workerGreeting}, ${activeWorker.nameHi}` : `${t.workerGreeting}, ${activeWorker.name}`}
              </h1>
              <span className="text-[10px] bg-surface-subtle text-content-secondary font-medium px-2 py-0.5 rounded-full border border-border/70">
                {language === 'hi' ? 'सत्यापित कामगार' : 'Verified Co-op Member'}
              </span>
            </div>
            <p className="text-xs text-content-muted mt-0.5">{activeWorker.cooperativeName}</p>
            <div className="flex items-center gap-2 mt-1.5 text-xs text-content-muted">
              <span>★ {activeWorker.rating} ({activeWorker.completedJobsTotal} jobs)</span>
              <span>•</span>
              <span className="text-emerald-700 font-semibold">100% Protected Wage Floor</span>
            </div>
          </div>
        </div>

        {/* Welfare Quick Status & ID Pass Action */}
        <div className="flex flex-col sm:items-end gap-2 shrink-0">
          <div className="bg-surface-subtle p-2.5 rounded-xl border border-border text-xs space-y-0.5">
            <div className="flex items-center gap-1.5 text-emerald-800 font-semibold">
              <HeartHandshake className="w-3.5 h-3.5 text-emerald-600" />
              <span>Ayushman Health Active</span>
            </div>
            <p className="text-[11px] text-content-muted">₹5,00,000 Cashless Hospitalization</p>
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
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
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
        <div className="bg-white rounded-2xl p-6 border-2 border-slate-900 shadow-card space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-border/70">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-wider text-content">
                {t.nextJob} (#{activeJob.id})
              </span>
            </div>
            <div className="flex items-center gap-2">
              <VoiceReaderButton 
                textToRead={`${activeJob.serviceName}. ${activeJob.description}. Customer: ${activeJob.customerName}. Address: ${activeJob.locationAddress}`}
                label={language === 'hi' ? 'बोलकर सुनें' : 'Audio Instructions'} 
              />
              <span className="text-xs font-semibold bg-surface-subtle text-content px-2.5 py-1 rounded-full border border-border/70">
                {activeJob.status}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-display text-lg font-bold text-content">{activeJob.serviceName}</h2>
              <p className="text-xs sm:text-sm text-content-muted mt-1">{activeJob.description}</p>
              
              <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-content-muted">
                <span className="flex items-center gap-1 font-medium text-content">
                  <MapPin className="w-4 h-4 text-content-muted" />
                  {activeJob.locationAddress}
                </span>
                <span>•</span>
                <span>Customer: <strong className="text-content font-medium">{activeJob.customerName}</strong></span>
              </div>
            </div>

            <div className="sm:text-right shrink-0">
              <span className="text-xs text-content-muted block">Protected Earning</span>
              <span className="text-2xl font-bold text-emerald-700">₹{activeJob.pricing.protectedWorkerWage}</span>
            </div>
          </div>

          {/* Big Tap Actions for Worker (Accessible on basic mobile screens) */}
          <div className="pt-2 flex flex-wrap items-center gap-2.5">
            {activeJob.status === 'ASSIGNED' && (
              <Button
                variant="coop"
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
                leftIcon={<Navigation className="w-4 h-4" />}
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
                variant="coop"
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
              <div className="flex-1 p-3.5 rounded-xl bg-surface-subtle text-emerald-900 font-semibold text-xs text-center border border-emerald-200">
                ✓ Photo Proof Uploaded. Awaiting Customer Escrow Release!
              </div>
            )}

            <a
              href={`tel:${activeJob.customerPhone}`}
              className="inline-flex items-center justify-center gap-1.5 px-4 min-h-[52px] rounded-xl border border-border bg-white text-content font-medium text-xs sm:text-sm hover:bg-surface-subtle transition-all"
            >
              <Phone className="w-4 h-4 text-content-muted" />
              <span>Call Customer</span>
            </a>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-8 text-center border border-border shadow-subtle">
          <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
          <h3 className="font-semibold text-content text-sm">All Current Jobs Completed</h3>
          <p className="text-xs text-content-muted mt-1">
            You are ready to receive the next fair allocation from {activeWorker.cooperativeName}.
          </p>
        </div>
      )}

      {/* 4. Welfare & Skill Upgradation Banners */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <Link 
          href="/worker/welfare"
          className="bg-white p-5 rounded-2xl border border-border hover:border-neutral-300 shadow-subtle transition-all flex items-center justify-between group"
        >
          <div className="space-y-1">
            <div className="flex items-center gap-2 font-semibold text-xs text-content">
              <HeartHandshake className="w-4 h-4 text-emerald-600" />
              <span>Ayushman & Suraksha Health Cover</span>
            </div>
            <p className="text-[11px] text-content-muted">100% cashless claims enabled for your family.</p>
          </div>
          <ArrowRight className="w-4 h-4 text-content-muted group-hover:translate-x-0.5 transition-transform" />
        </Link>

        <Link 
          href="/worker/welfare"
          className="bg-white p-5 rounded-2xl border border-border hover:border-neutral-300 shadow-subtle transition-all flex items-center justify-between group"
        >
          <div className="space-y-1">
            <div className="flex items-center gap-2 font-semibold text-xs text-content">
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span>PM Kaushal Skill Modules</span>
            </div>
            <p className="text-[11px] text-content-muted">2 free certified courses with ₹2,000 completion stipend.</p>
          </div>
          <ArrowRight className="w-4 h-4 text-content-muted group-hover:translate-x-0.5 transition-transform" />
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
