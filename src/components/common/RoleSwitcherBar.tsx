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
      icon: <User className="w-3.5 h-3.5" />, 
      badge: 'Ram Sharma'
    },
    { 
      id: 'worker', 
      label: 'Worker', 
      labelHi: 'कामगार',
      icon: <HardHat className="w-3.5 h-3.5" />, 
      badge: activeWorker.name.split(' ')[0]
    },
    { 
      id: 'cooperative', 
      label: 'Co-op Admin', 
      labelHi: 'सहकारी समिति',
      icon: <Users className="w-3.5 h-3.5" />, 
      badge: 'Shramik Seva'
    },
    { 
      id: 'community', 
      label: 'Society RWA', 
      labelHi: 'सोसायटी RWA',
      icon: <Building2 className="w-3.5 h-3.5" />, 
      badge: 'Arawali Heights'
    },
    { 
      id: 'admin', 
      label: 'Govt Admin', 
      labelHi: 'मंत्रालय',
      icon: <ShieldCheck className="w-3.5 h-3.5" />, 
      badge: 'National View'
    }
  ];

  return (
    <div className="bg-slate-950 text-slate-200 text-xs border-b border-slate-800/80 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-1.5 flex flex-wrap items-center justify-between gap-2">
        
        {/* Left: Persona Switcher Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 scrollbar-none">
          <span className="font-semibold tracking-wider text-slate-400 uppercase text-[10px] hidden md:inline-flex items-center gap-1.5 mr-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Persona:
          </span>

          <div className="flex items-center gap-1 bg-slate-900/90 p-0.5 rounded-xl border border-slate-800">
            {roles.map((r) => {
              const isActive = role === r.id;
              return (
                <button
                  key={r.id}
                  onClick={() => setRole(r.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-all duration-150 text-[11px] whitespace-nowrap ${
                    isActive 
                      ? 'bg-white text-slate-950 font-semibold shadow-xs' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                  title={`Switch view to ${r.label}`}
                >
                  {r.icon}
                  <span>{language === 'hi' ? r.labelHi : r.label}</span>
                  <span className={`text-[9px] px-1.5 py-0.2 rounded font-normal ${
                    isActive ? 'bg-slate-100 text-slate-700' : 'text-slate-500'
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
          {/* Quick SIH Demo Runner */}
          <button
            onClick={runSIHDemoFlow}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium shadow-2xs transition-all text-xs active:scale-95"
            title="Fast-forward the complete Customer ➔ Fair Allocation ➔ Worker dispatch scenario"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-200" />
            <span className="font-semibold hidden sm:inline">Run SIH Demo Flow</span>
            <span className="font-semibold sm:hidden">Demo Flow</span>
          </button>

          {/* Reset Demo State */}
          <button
            onClick={resetDemoData}
            className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors"
            title="Reset All Mock State"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Language Switcher */}
          <div className="flex items-center bg-slate-900 rounded-lg p-0.5 border border-slate-800">
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-0.5 rounded text-[10px] font-medium transition-all ${
                language === 'en' ? 'bg-slate-800 text-white font-semibold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('hi')}
              className={`px-2 py-0.5 rounded text-[10px] font-medium transition-all ${
                language === 'hi' ? 'bg-slate-800 text-white font-semibold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              हिन्दी
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
