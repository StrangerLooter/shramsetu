'use client';

import React from 'react';
import { useApp } from '@/lib/store/app-store';
import { 
  ShieldCheck, 
  Star, 
  MapPin 
} from 'lucide-react';

export default function CooperativeWorkersRosterPage() {
  const { workers, language } = useApp();

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 sm:py-16 space-y-8">
      
      {/* Editorial Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-[#121316]">
            {language === 'hi' ? (
              <>सहकारी सदस्य <span className="font-serif italic font-normal">श्रमिक रोस्टर</span></>
            ) : (
              <>Cooperative Member <span className="font-serif italic font-normal">Worker Roster</span></>
            )}
          </h1>
          <p className="text-xs sm:text-sm text-[#66676E] mt-1 font-light">
            Democratic register of all verified member artisans, trade certifications, and social security coverage.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-[#EBF5F0] px-4 py-2 rounded-full border border-[#CCE6DA] text-xs font-medium text-[#0D2F28] self-start">
          <ShieldCheck className="w-4 h-4 text-[#0D2F28]" />
          <span>100% Members Verified & Insured</span>
        </div>
      </div>

      {/* Workers Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workers.map((worker) => (
          <div 
            key={worker.id}
            className="bg-white rounded-3xl p-6 border border-[rgba(18,19,22,0.08)] shadow-subtle hover:shadow-card hover:border-[rgba(18,19,22,0.18)] transition-all duration-150 flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3.5">
                  <img 
                    src={worker.avatar} 
                    alt={worker.name} 
                    className="w-13 h-13 rounded-full object-cover border border-[rgba(18,19,22,0.08)] shadow-subtle"
                  />
                  <div>
                    <h3 className="font-serif text-base font-normal text-[#121316]">{worker.name}</h3>
                    <p className="text-[11px] text-[#66676E] font-light">{worker.phone}</p>
                  </div>
                </div>

                <span className="text-[10px] bg-[#EBF5F0] text-[#0D2F28] font-semibold px-2.5 py-0.5 rounded-full border border-[#CCE6DA]">
                  VERIFIED
                </span>
              </div>

              {/* Skills Tags */}
              <div className="mt-3 flex flex-wrap gap-1.5">
                {worker.skills.map((skill, i) => (
                  <span key={i} className="text-[10px] bg-[#F2EFE9] text-[#121316] px-2.5 py-0.5 rounded-md border border-[rgba(18,19,22,0.06)] uppercase font-medium">
                    {skill}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div className="mt-4 pt-3 border-t border-[rgba(18,19,22,0.08)] grid grid-cols-3 gap-2 text-center text-xs">
                <div>
                  <span className="text-[10px] text-[#66676E] block font-light">Experience</span>
                  <strong className="font-serif text-sm font-semibold text-[#121316]">{worker.experienceYears}y</strong>
                </div>
                <div>
                  <span className="text-[10px] text-[#66676E] block font-light">Rating</span>
                  <strong className="font-serif text-sm font-semibold text-amber-600 flex items-center justify-center gap-0.5">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    {worker.rating}
                  </strong>
                </div>
                <div>
                  <span className="text-[10px] text-[#66676E] block font-light">Jobs Done</span>
                  <strong className="font-serif text-sm font-semibold text-[#121316]">{worker.completedJobsTotal}</strong>
                </div>
              </div>
            </div>

            {/* Verification Footer */}
            <div className="pt-3 border-t border-[rgba(18,19,22,0.08)] flex items-center justify-between text-[11px] text-[#66676E]">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#66676E]" />
                <span>Saket Sector Hub</span>
              </span>
              <span className="text-[#0D2F28] font-medium">Ayushman Covered</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
