'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store/app-store';
import { AlertTriangle, ShieldCheck, CheckCircle2, MessageSquare, Scale } from 'lucide-react';

export default function AdminDisputesPage() {
  const { jobs, resolveDispute, language } = useApp();
  const [selectedResolution, setSelectedResolution] = useState<{ [jobId: string]: string }>({});

  const disputedJobs = jobs.filter(j => j.status === 'DISPUTED' || j.dispute !== undefined);

  const handleResolve = (jobId: string) => {
    const note = selectedResolution[jobId] || 'Mutual consensus reached: Additional material compensated, protected wage disbursed.';
    resolveDispute(jobId, note);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      <div>
        <div className="flex items-center gap-2 text-xs font-bold text-red-700 uppercase tracking-wider">
          <Scale className="w-4 h-4" />
          <span>Platform Arbitration Desk</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mt-1">
          {language === 'hi' ? 'विवाद एवं शिकायत समाधान केंद्र' : 'Dispute & Grievance Arbitration Desk'}
        </h1>
        <p className="text-xs text-slate-600 mt-1">
          Cooperative grievance tribunal: Impartial resolution of customer quality claims and worker safety conditions.
        </p>
      </div>

      {disputedJobs.length === 0 ? (
        <div className="bg-white rounded-2xl p-10 text-center border border-slate-200">
          <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
          <p className="text-sm font-bold text-slate-900">No active grievances in the arbitration queue.</p>
          <p className="text-xs text-slate-500 mt-1">
            All customer requests and worker settlements are functioning smoothly.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {disputedJobs.map((job) => (
            <div 
              key={job.id}
              className="bg-white rounded-2xl p-6 border border-red-200 shadow-sm space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">{job.serviceName}</span>
                    <span className="text-xs font-mono bg-red-100 text-red-800 font-bold px-2 py-0.5 rounded">
                      #{job.id}
                    </span>
                    <span className="text-[10px] bg-red-100 text-red-900 font-bold px-2 py-0.5 rounded">
                      Status: {job.dispute?.status || 'UNDER_REVIEW'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">
                    Customer: <strong className="text-slate-800">{job.customerName}</strong> • Worker: <strong className="text-slate-800">{job.workerName}</strong>
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-xs text-slate-400 block">Escrow Amount in Dispute</span>
                  <span className="text-base font-black text-slate-900">₹{job.pricing.customerTotal}</span>
                </div>
              </div>

              {/* Grievance Statement */}
              <div className="p-3.5 rounded-xl bg-red-50 text-xs text-red-900 space-y-1">
                <span className="font-bold">Grievance Reason: {job.dispute?.reason || 'Service execution dispute'}</span>
                <p className="text-[11px] text-red-700">{job.dispute?.description || 'Awaiting customer detailed statement.'}</p>
              </div>

              {/* Arbitration Resolution Form */}
              {job.dispute?.status !== 'RESOLVED' ? (
                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <input
                    type="text"
                    value={selectedResolution[job.id] || ''}
                    onChange={(e) => setSelectedResolution({ ...selectedResolution, [job.id]: e.target.value })}
                    placeholder="Enter arbitration resolution verdict / notes..."
                    className="flex-1 p-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <button
                    onClick={() => handleResolve(job.id)}
                    className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors shrink-0"
                  >
                    ✓ Arbitrate & Release Escrow
                  </button>
                </div>
              ) : (
                <div className="p-3 bg-emerald-50 rounded-xl text-xs text-emerald-900 font-medium">
                  ✓ Dispute Resolved: {job.dispute.resolutionNotes}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
