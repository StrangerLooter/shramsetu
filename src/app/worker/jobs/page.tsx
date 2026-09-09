'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/store/app-store';
import { 
  ShieldCheck, 
  MapPin, 
  ArrowRight, 
  HardHat, 
  Navigation 
} from 'lucide-react';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/Button';

export default function WorkerJobsPage() {
  const { jobs, activeWorker, updateJobStatus, language } = useApp();

  const workerJobs = jobs.filter(j => j.workerId === activeWorker.id);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:py-16 space-y-8">
      
      {/* Editorial Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-[#121316]">
            {language === 'hi' ? (
              <>कार्य आवंटन <span className="font-serif italic font-normal">एवं इतिहास</span></>
            ) : (
              <>Worker Job <span className="font-serif italic font-normal">Assignments</span></>
            )}
          </h1>
          <p className="text-xs sm:text-sm text-[#66676E] mt-1 font-light">
            Jobs assigned to you through cooperative fair work allocation.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-[#EBF5F0] px-3.5 py-1.5 rounded-full border border-[#CCE6DA] text-xs font-semibold text-[#0D2F28] self-start">
          <ShieldCheck className="w-4 h-4 text-[#0D2F28]" />
          <span>Statutory Wage Guarantee Active</span>
        </div>
      </div>

      {/* List or Empty State */}
      {workerJobs.length === 0 ? (
        <EmptyState
          icon={<HardHat className="w-6 h-6 text-[#121316]" />}
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
              className="bg-white rounded-3xl p-6 border border-[rgba(18,19,22,0.08)] shadow-subtle hover:shadow-card hover:border-[rgba(18,19,22,0.18)] transition-all duration-150 space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[rgba(18,19,22,0.08)]">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="font-serif text-lg font-normal text-[#121316]">{job.serviceName}</span>
                  <span className="text-xs font-mono bg-[#F2EFE9] px-2.5 py-0.5 rounded-md text-[#66676E] border border-[rgba(18,19,22,0.06)]">
                    #{job.id}
                  </span>
                  <StatusBadge status={job.status} size="sm" />
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-[10px] text-[#66676E] uppercase tracking-wider block">Protected Earning</span>
                  <span className="font-serif text-xl font-bold text-[#0D2F28]">
                    ₹{job.pricing.protectedWorkerWage}
                  </span>
                </div>
              </div>

              <p className="text-xs text-[#66676E] font-light">{job.description}</p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-[#66676E]">
                <span className="flex items-center gap-1 font-medium text-[#121316]">
                  <MapPin className="w-3.5 h-3.5 text-[#66676E]" />
                  {job.locationAddress}
                </span>
                <span>•</span>
                <span>Customer: <strong className="text-[#121316] font-medium">{job.customerName}</strong></span>
              </div>

              {/* Status Actions */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-[rgba(18,19,22,0.08)]">
                <div className="flex items-center gap-2.5 flex-wrap">
                  {job.status === 'ASSIGNED' && (
                    <Button
                      variant="primary"
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
                      leftIcon={<Navigation className="w-3.5 h-3.5 text-[#121316]" />}
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
                      variant="primary"
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
                  className="text-xs font-medium text-[#121316] hover:text-[#0D2F28] flex items-center gap-1"
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
