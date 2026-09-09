'use client';

import React from 'react';
import { useApp } from '@/lib/store/app-store';
import { 
  ShieldCheck, 
  Star, 
  CheckCircle2, 
  MapPin, 
  Phone
} from 'lucide-react';

export default function CooperativeWorkersRosterPage() {
  const { workers, language } = useApp();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-content">
            {language === 'hi' ? 'सहकारी सदस्य श्रमिक रोस्टर' : 'Cooperative Member Worker Roster'}
          </h1>
          <p className="text-xs sm:text-sm text-content-muted mt-1">
            Democratic register of all verified member artisans, trade certifications, and social security coverage.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-surface-subtle px-3 py-1.5 rounded-xl border border-border text-xs font-medium text-content">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>100% Members Verified & Insured</span>
        </div>
      </div>

      {/* Workers Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {workers.map((worker) => (
          <div 
            key={worker.id}
            className="bg-white rounded-2xl p-5 border border-border shadow-card hover:border-neutral-300 transition-all duration-150 flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img 
                    src={worker.avatar} 
                    alt={worker.name} 
                    className="w-12 h-12 rounded-full object-cover border border-border shadow-2xs"
                  />
                  <div>
                    <h3 className="font-semibold text-content text-sm">{worker.name}</h3>
                    <p className="text-[11px] text-content-muted">{worker.phone}</p>
                  </div>
                </div>

                <span className="text-[10px] bg-surface-subtle text-emerald-800 font-semibold px-2 py-0.5 rounded-full border border-border/70">
                  VERIFIED
                </span>
              </div>

              {/* Skills Tags */}
              <div className="mt-3 flex flex-wrap gap-1.5">
                {worker.skills.map((skill, i) => (
                  <span key={i} className="text-[10px] bg-surface-subtle text-content px-2 py-0.5 rounded border border-border/60 uppercase font-medium">
                    {skill}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div className="mt-3.5 pt-3 border-t border-border/70 grid grid-cols-3 gap-2 text-center text-xs">
                <div>
                  <span className="text-[10px] text-content-muted block">Experience</span>
                  <strong className="text-content font-semibold">{worker.experienceYears} Years</strong>
                </div>
                <div>
                  <span className="text-[10px] text-content-muted block">Rating</span>
                  <strong className="text-amber-600 font-semibold flex items-center justify-center gap-0.5">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    {worker.rating}
                  </strong>
                </div>
                <div>
                  <span className="text-[10px] text-content-muted block">Jobs Done</span>
                  <strong className="text-content font-semibold">{worker.completedJobsTotal}</strong>
                </div>
              </div>
            </div>

            {/* Verification Footer */}
            <div className="pt-2 border-t border-border/70 flex items-center justify-between text-[11px] text-content-muted">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-content-muted" />
                <span>Saket Sector Hub</span>
              </span>
              <span className="text-emerald-800 font-medium">Ayushman Covered</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
