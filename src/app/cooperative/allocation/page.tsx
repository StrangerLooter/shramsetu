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
    <div className="max-w-6xl mx-auto px-4 py-12 sm:py-16 space-y-8">
      
      {/* 1. Console Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#0D2F28] uppercase tracking-wider">
            <Scale className="w-4 h-4 text-[#0D2F28]" />
            <span>Cooperative Governance & Democratic Dispatch</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-[#121316] mt-1">
            {language === 'hi' ? (
              <>समान कार्य <span className="font-serif italic font-normal">आवंटन इंजन</span></>
            ) : (
              <>Fair Work <span className="font-serif italic font-normal">Allocation Engine</span></>
            )}
          </h1>
          <p className="text-xs sm:text-sm text-[#66676E] mt-1 font-light">
            Multi-factor dispatch algorithm: Prevents star-worker monopoly by factoring workload equity alongside proximity and skill.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-[#EBF5F0] px-3.5 py-1.5 rounded-full border border-[#CCE6DA] text-xs text-[#0D2F28] font-medium self-start">
          <ShieldCheck className="w-4 h-4 text-[#0D2F28]" />
          <span>Statutory Fairness Index: 88.4%</span>
        </div>
      </div>

      {assignedNotice && (
        <div className="p-4 rounded-2xl bg-[#EBF5F0] border border-[#CCE6DA] text-[#121316] text-xs flex items-center justify-between shadow-subtle">
          <div className="flex items-center gap-2 font-medium text-[#0D2F28]">
            <Check className="w-4 h-4 text-[#0D2F28]" />
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
          <h2 className="text-xs font-semibold uppercase tracking-wider text-[#66676E]">
            Incoming Demand Queue ({pendingJobs.length})
          </h2>

          <div className="space-y-3">
            {pendingJobs.map((job) => {
              const isSelected = job.id === selectedJobId;
              return (
                <div
                  key={job.id}
                  onClick={() => setSelectedJobId(job.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all duration-150 ${
                    isSelected 
                      ? 'bg-white border-[#121316] shadow-card ring-1 ring-[#121316]' 
                      : 'bg-white hover:border-[rgba(18,19,22,0.18)] border-[rgba(18,19,22,0.08)]'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-serif text-sm font-normal text-[#121316]">{job.serviceName}</span>
                    <span className="text-[10px] font-mono bg-[#F2EFE9] text-[#66676E] px-2 py-0.5 rounded border border-[rgba(18,19,22,0.06)]">
                      #{job.id}
                    </span>
                  </div>

                  <p className="text-xs text-[#66676E] mt-1 line-clamp-1 font-light">{job.description}</p>
                  
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-[rgba(18,19,22,0.06)] text-[11px] text-[#66676E]">
                    <span>{job.urgency} Urgency</span>
                    <span className="font-serif font-semibold text-[#0D2F28]">₹{job.pricing.protectedWorkerWage} Labour</span>
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
            <div className="bg-white rounded-3xl p-6 border border-[rgba(18,19,22,0.08)] shadow-subtle space-y-1">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-lg font-normal text-[#121316]">
                    Evaluating Candidates for: {selectedJob.serviceName}
                  </h3>
                  <p className="text-xs text-[#66676E] mt-0.5 font-light">
                    Customer: <strong className="text-[#121316] font-medium">{selectedJob.customerName}</strong> • {selectedJob.locationAddress}
                  </p>
                </div>

                <span className="text-xs font-semibold bg-[#F2EFE9] text-[#121316] px-3 py-1 rounded-full border border-[rgba(18,19,22,0.08)]">
                  Status: {selectedJob.status}
                </span>
              </div>
            </div>
          )}

          {/* Scored Worker Candidate Cards */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#66676E] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#B45309]" />
              <span>Algorithmic Fairness Recommendations</span>
            </h3>

            {rankedCandidates.map((cand) => {
              const { worker, matchScore, subScores, reasons, isRecommended } = cand;
              const isCurrentlyAssigned = selectedJob?.workerId === worker.id;

              return (
                <div
                  key={worker.id}
                  className={`bg-white rounded-3xl p-6 border transition-all duration-150 ${
                    isRecommended 
                      ? 'border-[#0D2F28] shadow-card ring-1 ring-[#0D2F28]/20' 
                      : 'border-[rgba(18,19,22,0.08)] hover:border-[rgba(18,19,22,0.18)]'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    
                    {/* Worker Details */}
                    <div className="flex items-start gap-3.5">
                      <div className="relative">
                        <img 
                          src={worker.avatar} 
                          alt={worker.name} 
                          className="w-14 h-14 rounded-full object-cover border border-[rgba(18,19,22,0.08)] shadow-subtle"
                        />
                        {isRecommended && (
                          <span className="absolute -top-1 -right-1 bg-[#0D2F28] text-white text-[9px] font-bold px-1.5 py-0.2 rounded-full">
                            TOP
                          </span>
                        )}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-serif text-base font-normal text-[#121316]">{worker.name}</h4>
                          <span className="text-[10px] bg-[#F2EFE9] text-[#66676E] px-2 py-0.5 rounded-full border border-[rgba(18,19,22,0.06)] font-medium">
                            {worker.experienceYears}y exp
                          </span>
                        </div>

                        <p className="text-xs text-[#66676E] mt-0.5">{worker.cooperativeName}</p>

                        <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs text-[#66676E]">
                          <span className="font-semibold text-amber-600">★ {worker.rating}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-[#66676E]" />
                            {worker.distanceKm} km away
                          </span>
                          <span>•</span>
                          <span className={`font-semibold ${worker.completedJobsToday > 3 ? 'text-amber-700' : 'text-[#0D2F28]'}`}>
                            {worker.completedJobsToday} jobs today
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Overall Match Score Badge */}
                    <div className="text-right shrink-0">
                      <div className="inline-flex flex-col items-center justify-center w-14 h-14 rounded-2xl bg-[#F2EFE9] border border-[rgba(18,19,22,0.08)] text-[#121316]">
                        <span className="font-serif text-lg font-bold">{matchScore}%</span>
                        <span className="text-[9px] font-semibold uppercase tracking-tighter text-[#66676E]">Match</span>
                      </div>
                    </div>
                  </div>

                  {/* 4 Multi-Factor Scoring Breakdown with Visual Progress Bars */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-4 mt-4 border-t border-[rgba(18,19,22,0.08)] text-xs">
                    <div className="bg-[#F2EFE9] p-3 rounded-2xl border border-[rgba(18,19,22,0.06)]">
                      <div className="flex items-center justify-between text-[10px] text-[#66676E] mb-1">
                        <span>1. Skill Match</span>
                        <span className="font-semibold text-[#121316]">{subScores.skillMatch}/30</span>
                      </div>
                      <div className="w-full bg-[#E2DDD3] h-1.5 rounded-full overflow-hidden">
                        <div 
                          className="bg-[#121316] h-full rounded-full transition-all duration-500" 
                          style={{ width: `${(subScores.skillMatch / 30) * 100}%` }}
                        />
                      </div>
                      <span className="text-[9px] text-[#66676E] block mt-1">Trade certified</span>
                    </div>

                    <div className="bg-[#F2EFE9] p-3 rounded-2xl border border-[rgba(18,19,22,0.06)]">
                      <div className="flex items-center justify-between text-[10px] text-[#66676E] mb-1">
                        <span>2. Proximity</span>
                        <span className="font-semibold text-[#121316]">{subScores.distanceScore}/25</span>
                      </div>
                      <div className="w-full bg-[#E2DDD3] h-1.5 rounded-full overflow-hidden">
                        <div 
                          className="bg-[#0D2F28] h-full rounded-full transition-all duration-500" 
                          style={{ width: `${(subScores.distanceScore / 25) * 100}%` }}
                        />
                      </div>
                      <span className="text-[9px] text-[#66676E] block mt-1">{worker.distanceKm} km radius</span>
                    </div>

                    <div className="bg-[#EBF5F0] p-3 rounded-2xl border border-[#CCE6DA]">
                      <div className="flex items-center justify-between text-[10px] text-[#0D2F28] font-semibold mb-1">
                        <span>3. Workload Equity</span>
                        <span>{subScores.workloadFairness}/25</span>
                      </div>
                      <div className="w-full bg-[#CCE6DA] h-1.5 rounded-full overflow-hidden">
                        <div 
                          className="bg-[#0D2F28] h-full rounded-full transition-all duration-500" 
                          style={{ width: `${(subScores.workloadFairness / 25) * 100}%` }}
                        />
                      </div>
                      <span className="text-[9px] text-[#0D2F28] block mt-1 font-medium">Anti-monopoly balance</span>
                    </div>

                    <div className="bg-[#F2EFE9] p-3 rounded-2xl border border-[rgba(18,19,22,0.06)]">
                      <div className="flex items-center justify-between text-[10px] text-[#66676E] mb-1">
                        <span>4. Trust & Rating</span>
                        <span className="font-semibold text-[#121316]">{subScores.ratingExperience}/20</span>
                      </div>
                      <div className="w-full bg-[#E2DDD3] h-1.5 rounded-full overflow-hidden">
                        <div 
                          className="bg-[#B45309] h-full rounded-full transition-all duration-500" 
                          style={{ width: `${(subScores.ratingExperience / 20) * 100}%` }}
                        />
                      </div>
                      <span className="text-[9px] text-[#66676E] block mt-1">{worker.rating}★ rating</span>
                    </div>
                  </div>

                  {/* Explainability & Anti-Monopoly Spotlight Badge */}
                  <div className="mt-3.5 p-3.5 rounded-2xl bg-[#F2EFE9] border border-[rgba(18,19,22,0.06)]">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-[#121316] flex items-center gap-1">
                        <Scale className="w-3.5 h-3.5 text-[#0D2F28]" />
                        <span>Why the Engine Recommends this Artisan:</span>
                      </span>
                      {worker.completedJobsToday <= 1 && (
                        <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded-full bg-[#0D2F28] text-white">
                          Income Equity Prioritized
                        </span>
                      )}
                    </div>
                    <ul className="space-y-1 text-xs text-[#66676E]">
                      {reasons.map((r, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#0D2F28] shrink-0" />
                          <span className="font-medium text-[11px] text-[#121316]">{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Dispatch Button in Soft Lavender */}
                  <div className="mt-5 pt-3 border-t border-[rgba(18,19,22,0.08)] flex items-center justify-between">
                    {isCurrentlyAssigned ? (
                      <span className="text-xs font-semibold text-[#0D2F28] flex items-center gap-1 bg-[#EBF5F0] px-3 py-1.5 rounded-xl border border-[#CCE6DA]">
                        <Check className="w-3.5 h-3.5" />
                        <span>Currently Assigned</span>
                      </span>
                    ) : (
                      <span className="text-[11px] text-[#66676E]">
                        {isRecommended ? '★ Recommended by Algorithm' : 'Eligible Candidate'}
                      </span>
                    )}

                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleDispatch(worker.id, worker.name, reasons.join(' • '))}
                      leftIcon={<UserCheck className="w-3.5 h-3.5 text-[#121316]" />}
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
