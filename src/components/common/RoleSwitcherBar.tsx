'use client';

import React from 'react';
import { useApp } from '@/lib/store/app-store';
import { UserRole } from '@/types';
import { 
  User, 
  HardHat, 
  Users, 
  Building2, 
  ShieldCheck, 
  Sparkles, 
  RotateCcw
} from 'lucide-react';

export const RoleSwitcherBar: React.FC = () => {
  const { role, setRole, language, setLanguage, runSIHDemoFlow, resetDemoData, activeWorker } = useApp();

  const roles: { id: UserRole; label: string; labelHi: string; icon: React.ReactNode; badge: string }[] = [
    { 
      id: 'customer', 
      label: 'Customer', 
      labelHi: 'ग्राहक',
      icon: <User className="w-3 h-3" />, 
      badge: 'Ram Sharma'
    },
    { 
      id: 'worker', 
      label: 'Worker', 
      labelHi: 'कामगार',
      icon: <HardHat className="w-3 h-3 text-[#B45309]" />, 
      badge: activeWorker.name.split(' ')[0]
    },
    { 
      id: 'cooperative', 
      label: 'Co-op Admin', 
      labelHi: 'सहकारी समिति',
      icon: <Users className="w-3 h-3 text-[#0D2F28]" />, 
      badge: 'Shramik Seva'
    },
    { 
      id: 'community', 
      label: 'Society RWA', 
      labelHi: 'सोसायटी RWA',
      icon: <Building2 className="w-3 h-3 text-[#1E3A8A]" />, 
      badge: 'Arawali Heights'
    },
    { 
      id: 'admin', 
      label: 'Govt Admin', 
      labelHi: 'मंत्रालय',
      icon: <ShieldCheck className="w-3 h-3 text-[#0D2F28]" />, 
      badge: 'National View'
    }
  ];

  return (
    <div className="bg-[#121316] text-[#FBF9F5] text-xs border-b border-black/20 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-1.5 flex flex-wrap items-center justify-between gap-2">
        
        {/* Left: Persona Switcher Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 scrollbar-none">
          <span className="font-semibold tracking-wider text-white/50 uppercase text-[10px] hidden md:inline-flex items-center gap-1.5 mr-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#DDD6FE]" />
            Persona:
          </span>

          <div className="flex items-center gap-1 bg-white/10 p-0.5 rounded-xl border border-white/10">
            {roles.map((r) => {
              const isActive = role === r.id;
              return (
                <button
                  key={r.id}
                  onClick={() => setRole(r.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-all duration-150 text-[11px] whitespace-nowrap ${
                    isActive 
                      ? 'bg-[#FBF9F5] text-[#121316] font-semibold shadow-xs' 
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                  title={`Switch view to ${r.label}`}
                >
                  {r.icon}
                  <span>{language === 'hi' ? r.labelHi : r.label}</span>
                  <span className={`text-[9px] px-1.5 py-0.2 rounded font-normal ${
                    isActive ? 'bg-[#EDE9E0] text-[#121316]' : 'text-white/50'
                  }`}>
                    {r.badge}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Demo Actions & Language Switcher */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Quick SIH Demo Runner in Lavender Accent */}
          <button
            onClick={runSIHDemoFlow}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#DDD6FE] hover:bg-[#D4CBFC] text-[#121316] font-medium shadow-subtle transition-all text-xs active:scale-95"
            title="Fast-forward the complete Customer ➔ Fair Allocation ➔ Worker dispatch scenario"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#3D2975]" />
            <span className="font-medium hidden sm:inline">Run SIH Demo Story</span>
            <span className="font-medium sm:hidden">Demo Story</span>
          </button>

          {/* Reset Demo State */}
          <button
            onClick={resetDemoData}
            className="p-1.5 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            title="Reset All Mock State"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
