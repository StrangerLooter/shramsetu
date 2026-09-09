'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/store/app-store';
import { ShieldCheck, HeartHandshake, Scale } from 'lucide-react';

export const Footer: React.FC = () => {
  const { language } = useApp();

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 text-xs mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Brand & Mission */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-white">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </div>
              <span className="text-white font-bold text-sm tracking-tight">
                {language === 'hi' ? 'श्रमसेतु' : 'ShramSetu'}
              </span>
              <span className="text-[10px] uppercase font-semibold text-emerald-400 px-1.5 py-0.2 rounded bg-emerald-950/60 border border-emerald-800/60">
                Co-op System
              </span>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-md">
              {language === 'hi' 
                ? 'सहकारी-प्रथम सार्वजनिक डिजिटल सेवा मंच। श्रमिकों के लिए न्यूनतम संरक्षित पारिश्रमिक, पारदर्शी लेज़र एवं लोकतांत्रिक सहभागिता।'
                : 'India’s cooperative-first digital public infrastructure connecting households, communities, and verified worker cooperatives with statutory wage protection.'}
            </p>

            <div className="flex items-center gap-2 text-slate-400 text-xs">
              <Scale className="w-3.5 h-3.5 text-emerald-500" />
              <span>Aligned with the Ministry of Cooperation & e-Shram</span>
            </div>
          </div>

          {/* Col 2: Core Architecture */}
          <div className="space-y-2">
            <h4 className="text-slate-200 font-semibold text-xs tracking-wider uppercase">
              {language === 'hi' ? 'प्रमुख सिद्धांत' : 'Core Principles'}
            </h4>
            <ul className="space-y-1.5 text-slate-400">
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Fair Work Allocation Engine</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                <span>Statutory Wage Floor Floor</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                <span>10% Pooled Welfare Fund</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>Democratic Governance</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Portal Shortcuts */}
          <div className="space-y-2">
            <h4 className="text-slate-200 font-semibold text-xs tracking-wider uppercase">
              {language === 'hi' ? 'पोर्टल' : 'Portals'}
            </h4>
            <ul className="space-y-1.5 text-slate-400">
              <li>
                <Link href="/customer/request" className="hover:text-white transition-colors">
                  Citizen Service Request
                </Link>
              </li>
              <li>
                <Link href="/worker/dashboard" className="hover:text-white transition-colors">
                  Worker Dashboard & Earnings
                </Link>
              </li>
              <li>
                <Link href="/cooperative/allocation" className="hover:text-white transition-colors">
                  Cooperative Allocation Console
                </Link>
              </li>
              <li>
                <Link href="/admin/dashboard" className="hover:text-white transition-colors">
                  Ministry & Compliance Oversight
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-400 text-[11px]">
          <div>
            © 2026 ShramSetu. Open Civic Cooperative Protocol.
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Non-monopolistic</span>
            <span>•</span>
            <span>Zero-brokerage model</span>
            <span>•</span>
            <span>e-Shram Verified</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
