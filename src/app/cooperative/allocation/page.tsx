'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/store/app-store';
import { 
  Scale, 
  ShieldCheck, 
  MapPin, 
  CheckCircle2, 
  Sparkles, 
  UserCheck, 
  Check 
} from 'lucide-react';
import { rankWorkersForJob } from '@/lib/engines/fair-allocation';
import { Button } from '@/components/ui/Button';

export default function FairAllocationConsolePage() {
  const router = useRouter();
  const { 
    jobs, 
    workers, 
    allocateJob, 
    setRole, 
    setActiveWorkerId,
    language 
  } = useApp();

  const pendingJobs = jobs.filter(j => 
    j.status === 'MATCHING' || 
    j.status === 'REQUESTED' || 
    j.status === 'ASSIGNED'
  );

  const [selectedJobId, setSelectedJobId] = useState<string>(pendingJobs[0]?.id || jobs[0]?.id);
  const [assignedNotice, setAssignedNotice] = useState<string | null>(null);

  const selectedJob = jobs.find(j => j.id === selectedJobId) || jobs[0];

  // Run Fair Allocation Engine for current selected job
  const rankedCandidates = selectedJob 
    ? rankWorkersForJob(workers, selectedJob.category, 10)
    : [];

  const handleDispatch = (workerId: string, workerName: string, reason: string) => {
    allocateJob(selectedJob.id, workerId, reason);
    setActiveWorkerId(workerId);
    setAssignedNotice(`Assigned ${workerName} to #${selectedJob.id} successfully.`);
    setTimeout(() => setAssignedNotice(null), 4000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      
      {/* 1. Console Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider">
            <Scale className="w-4 h-4 text-emerald-600" />
            <span>Cooperative Governance & Democratic Dispatch</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-content mt-1">
            {language === 'hi' ? 'समान कार्य आवंटन इंजन' : 'Fair Work Allocation Engine'}
          </h1>
          <p className="text-xs sm:text-sm text-content-muted mt-1">
            Multi-factor dispatch algorithm: Prevents star-worker monopoly by factoring workload equity alongside proximity and skill.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-surface-subtle px-3 py-1.5 rounded-xl border border-border text-xs text-content font-medium self-start">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Statutory Fairness Index: 88.4%</span>
        </div>
      </div>

      {assignedNotice && (
        <div className="p-4 rounded-xl bg-surface-subtle border border-emerald-300 text-content text-xs flex items-center justify-between shadow-subtle">
          <div className="flex items-center gap-2 font-medium">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>{assignedNotice}</span>
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              setRole('worker');
              router.push('/worker/dashboard');
            }}
          >
            Switch to Worker View
          </Button>
        </div>
      )}

      {/* Main 2-Column Interface: Left (Select Job Ticket), Right (Scored Candidates & Explainability) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column (4 cols): Pending Demand Queue */}
        <div className="lg:col-span-4 space-y-3">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-content-muted">
            Incoming Demand Queue ({pendingJobs.length})
          </h2>

          <div className="space-y-2.5">
            {pendingJobs.map((job) => {
              const isSelected = job.id === selectedJobId;
              return (
                <div
                  key={job.id}
                  onClick={() => setSelectedJobId(job.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all duration-150 ${
                    isSelected 
                      ? 'bg-white border-slate-900 shadow-card ring-1 ring-slate-900' 
                      : 'bg-white hover:border-neutral-300 border-border/80'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-content">{job.serviceName}</span>
                    <span className="text-[10px] font-mono bg-surface-subtle text-content-muted px-1.5 py-0.2 rounded border border-border/60">
                      #{job.id}
                    </span>
                  </div>

                  <p className="text-xs text-content-muted mt-1 line-clamp-1">{job.description}</p>
                  
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-border/60 text-[11px] text-content-muted">
                    <span>{job.urgency} Urgency</span>
                    <span className="font-semibold text-emerald-700">₹{job.pricing.protectedWorkerWage} Labour</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column (8 cols): Scored Worker Candidates with Deep Explainability */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* Selected Job Header Summary */}
          {selectedJob && (
            <div className="bg-white rounded-2xl p-5 border border-border shadow-card space-y-1">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-base text-content">
                    Evaluating Candidates for: {selectedJob.serviceName}
                  </h3>
                  <p className="text-xs text-content-muted mt-0.5">
                    Customer: <strong className="text-content font-medium">{selectedJob.customerName}</strong> • {selectedJob.locationAddress}
                  </p>
                </div>

                <span className="text-xs font-semibold bg-surface-subtle text-content px-2.5 py-1 rounded-full border border-border/70">
                  Status: {selectedJob.status}
                </span>
              </div>
            </div>
          )}

          {/* Scored Worker Candidate Cards */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-content-muted flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Algorithmic Fairness Recommendations</span>
            </h3>

            {rankedCandidates.map((cand) => {
              const { worker, matchScore, subScores, reasons, isRecommended } = cand;
              const isCurrentlyAssigned = selectedJob?.workerId === worker.id;

              return (
                <div
                  key={worker.id}
                  className={`bg-white rounded-2xl p-5 border transition-all duration-150 ${
                    isRecommended 
                      ? 'border-emerald-500 shadow-card ring-1 ring-emerald-500/20' 
                      : 'border-border hover:border-neutral-300'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    
                    {/* Worker Details */}
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <img 
                          src={worker.avatar} 
                          alt={worker.name} 
                          className="w-13 h-13 rounded-full object-cover border border-border shadow-2xs"
                        />
                        {isRecommended && (
                          <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-[9px] font-bold px-1 rounded-full">
                            TOP
                          </span>
                        )}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-content text-sm">{worker.name}</h4>
                          <span className="text-[10px] bg-surface-subtle text-content-muted px-1.5 py-0.2 rounded border border-border/60 font-medium">
                            {worker.experienceYears}y exp
                          </span>
                        </div>

                        <p className="text-xs text-content-muted mt-0.5">{worker.cooperativeName}</p>

                        <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs text-content-muted">
                          <span className="font-semibold text-amber-600">★ {worker.rating}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-content-muted" />
                            {worker.distanceKm} km away
                          </span>
                          <span>•</span>
                          <span className={`font-semibold ${worker.completedJobsToday > 3 ? 'text-amber-700' : 'text-emerald-700'}`}>
                            {worker.completedJobsToday} jobs today
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Overall Match Score Badge */}
                    <div className="text-right shrink-0">
                      <div className="inline-flex flex-col items-center justify-center w-13 h-13 rounded-xl bg-surface-subtle border border-border text-content">
                        <span className="text-base font-bold">{matchScore}%</span>
                        <span className="text-[9px] font-semibold uppercase tracking-tighter text-content-muted">Match</span>
                      </div>
                    </div>
                  </div>

                  {/* 4 Multi-Factor Scoring Breakdown with Visual Progress Bars */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-3 mt-3 border-t border-border/70 text-xs">
                    <div className="bg-surface-subtle p-2.5 rounded-xl border border-border/60">
                      <div className="flex items-center justify-between text-[10px] text-content-muted mb-1">
                        <span>1. Skill Match</span>
                        <span className="font-semibold text-content">{subScores.skillMatch}/30</span>
                      </div>
                      <div className="w-full bg-neutral-200 h-1 rounded-full overflow-hidden">
                        <div 
                          className="bg-slate-900 h-full rounded-full transition-all duration-500" 
                          style={{ width: `${(subScores.skillMatch / 30) * 100}%` }}
                        />
                      </div>
                      <span className="text-[9px] text-content-muted block mt-1">Trade certified</span>
                    </div>

                    <div className="bg-surface-subtle p-2.5 rounded-xl border border-border/60">
                      <div className="flex items-center justify-between text-[10px] text-content-muted mb-1">
                        <span>2. Proximity</span>
                        <span className="font-semibold text-content">{subScores.distanceScore}/25</span>
                      </div>
                      <div className="w-full bg-neutral-200 h-1 rounded-full overflow-hidden">
                        <div 
                          className="bg-teal-700 h-full rounded-full transition-all duration-500" 
                          style={{ width: `${(subScores.distanceScore / 25) * 100}%` }}
                        />
                      </div>
                      <span className="text-[9px] text-content-muted block mt-1">{worker.distanceKm} km radius</span>
                    </div>

                    <div className="bg-emerald-50/60 p-2.5 rounded-xl border border-emerald-200 shadow-2xs">
                      <div className="flex items-center justify-between text-[10px] text-emerald-900 font-semibold mb-1">
                        <span>3. Workload Equity</span>
                        <span>{subScores.workloadFairness}/25</span>
                      </div>
                      <div className="w-full bg-emerald-200 h-1 rounded-full overflow-hidden">
                        <div 
                          className="bg-emerald-700 h-full rounded-full transition-all duration-500" 
                          style={{ width: `${(subScores.workloadFairness / 25) * 100}%` }}
                        />
                      </div>
                      <span className="text-[9px] text-emerald-800 block mt-1 font-medium">Anti-monopoly balance</span>
                    </div>

                    <div className="bg-surface-subtle p-2.5 rounded-xl border border-border/60">
                      <div className="flex items-center justify-between text-[10px] text-content-muted mb-1">
                        <span>4. Trust & Rating</span>
                        <span className="font-semibold text-content">{subScores.ratingExperience}/20</span>
                      </div>
                      <div className="w-full bg-neutral-200 h-1 rounded-full overflow-hidden">
                        <div 
                          className="bg-amber-500 h-full rounded-full transition-all duration-500" 
                          style={{ width: `${(subScores.ratingExperience / 20) * 100}%` }}
                        />
                      </div>
                      <span className="text-[9px] text-content-muted block mt-1">{worker.rating}★ rating</span>
                    </div>
                  </div>

                  {/* Explainability & Anti-Monopoly Spotlight Badge */}
                  <div className="mt-3 p-2.5 rounded-xl bg-surface-subtle border border-border">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-content flex items-center gap-1">
                        <Scale className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Why the Engine Recommends this Artisan:</span>
                      </span>
                      {worker.completedJobsToday <= 1 && (
                        <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-emerald-700 text-white">
                          Income Equity Prioritized
                        </span>
                      )}
                    </div>
                    <ul className="space-y-1 text-xs text-content-secondary">
                      {reasons.map((r, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span className="font-medium text-[11px]">{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Dispatch Button */}
                  <div className="mt-4 pt-3 border-t border-border/70 flex items-center justify-between">
                    {isCurrentlyAssigned ? (
                      <span className="text-xs font-semibold text-emerald-800 flex items-center gap-1 bg-surface-subtle px-3 py-1.5 rounded-lg border border-border">
                        <Check className="w-3.5 h-3.5" />
                        <span>Currently Assigned</span>
                      </span>
                    ) : (
                      <span className="text-[11px] text-content-muted">
                        {isRecommended ? '★ Recommended by Algorithm' : 'Eligible Candidate'}
                      </span>
                    )}

                    <Button
                      variant={isRecommended ? 'coop' : 'primary'}
                      size="sm"
                      onClick={() => handleDispatch(worker.id, worker.name, reasons.join(' • '))}
                      leftIcon={<UserCheck className="w-3.5 h-3.5" />}
                    >
                      {isCurrentlyAssigned ? 'Re-Dispatch' : `Assign ${worker.name.split(' ')[0]}`}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </div>
  );
}
