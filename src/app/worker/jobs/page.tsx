'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/store/app-store';
import { 
  ShieldCheck, 
  MapPin, 
  ArrowRight,
  HardHat,
  Navigation,
  CheckCircle2
} from 'lucide-react';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/Button';

export default function WorkerJobsPage() {
  const { jobs, activeWorker, updateJobStatus, language } = useApp();

  const workerJobs = jobs.filter(j => j.workerId === activeWorker.id);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-content">
            {language === 'hi' ? 'कार्य आवंटन एवं इतिहास' : 'Worker Job Assignments'}
          </h1>
          <p className="text-xs sm:text-sm text-content-muted mt-1">
            Jobs assigned to you through cooperative fair work allocation.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-surface-subtle px-3 py-1.5 rounded-xl border border-border text-xs font-medium text-emerald-800 self-start">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Statutory Wage Guarantee Active</span>
        </div>
      </div>

      {/* List or Empty State */}
      {workerJobs.length === 0 ? (
        <EmptyState
          icon={<HardHat className="w-6 h-6" />}
          title={language === 'hi' ? 'कोई कार्य आवंटित नहीं है' : 'No jobs in queue'}
          description={language === 'hi' 
            ? 'जब आपके क्षेत्र में कोई सेवा अनुरोध आएगा, तो समान आवंटन प्रणाली आपको सूचित करेगी।'
            : 'When a citizen in your hub requests a service, the Fair Allocation Engine will assign you equitably.'}
        />
      ) : (
        <div className="space-y-4">
          {workerJobs.map((job) => (
            <div 
              key={job.id}
              className="bg-white rounded-2xl p-5 border border-border shadow-card space-y-3.5 hover:border-neutral-300 transition-all duration-150"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-border/70">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="font-semibold text-sm sm:text-base text-content">{job.serviceName}</span>
                  <span className="text-xs font-mono bg-surface-subtle px-2 py-0.5 rounded text-content-muted border border-border/60">
                    #{job.id}
                  </span>
                  <StatusBadge status={job.status} size="sm" />
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-[10px] text-content-muted uppercase tracking-wider block">Protected Earning</span>
                  <span className="text-base font-bold text-emerald-700">
                    ₹{job.pricing.protectedWorkerWage}
                  </span>
                </div>
              </div>

              <p className="text-xs text-content-muted">{job.description}</p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-content-muted">
                <span className="flex items-center gap-1 font-medium text-content">
                  <MapPin className="w-3.5 h-3.5 text-content-muted" />
                  {job.locationAddress}
                </span>
                <span>•</span>
                <span>Customer: <strong className="text-content font-medium">{job.customerName}</strong></span>
              </div>

              {/* Status Actions */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-border/60">
                <div className="flex items-center gap-2 flex-wrap">
                  {job.status === 'ASSIGNED' && (
                    <Button
                      variant="coop"
                      size="sm"
                      onClick={() => updateJobStatus(job.id, 'ACCEPTED')}
                    >
                      ✓ Accept Job
                    </Button>
                  )}

                  {job.status === 'ACCEPTED' && (
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => updateJobStatus(job.id, 'WORKER_ON_THE_WAY')}
                      leftIcon={<Navigation className="w-3.5 h-3.5" />}
                    >
                      Start Navigation
                    </Button>
                  )}

                  {job.status === 'WORKER_ON_THE_WAY' && (
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => updateJobStatus(job.id, 'ARRIVED')}
                    >
                      📍 Mark Arrived
                    </Button>
                  )}

                  {job.status === 'ARRIVED' && (
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => updateJobStatus(job.id, 'IN_PROGRESS')}
                    >
                      ⚡ Start Work
                    </Button>
                  )}

                  {job.status === 'IN_PROGRESS' && (
                    <Button
                      variant="coop"
                      size="sm"
                      onClick={() => updateJobStatus(job.id, 'COMPLETED', {
                        completionProof: {
                          image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500&auto=format&fit=crop&q=80',
                          notes: 'Completed according to standard guidelines.',
                          completedAt: new Date().toISOString()
                        }
                      })}
                    >
                      📸 Upload Proof & Complete
                    </Button>
                  )}
                </div>

                <Link
                  href={`/customer/bookings/${job.id}`}
                  className="text-xs font-semibold text-content hover:text-slate-900 flex items-center gap-1"
                >
                  <span>Customer View</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
