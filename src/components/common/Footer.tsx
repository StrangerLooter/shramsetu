'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/store/app-store';
import { ShieldCheck, Scale, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const { language } = useApp();

  return (
    <footer className="bg-[#0D2F28] text-white/80 border-t border-white/10 text-xs mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Col 1: Brand & Mission */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-[#DDD6FE]">
                <ShieldCheck className="w-4.5 h-4.5" />
              </div>
              <span className="font-serif text-white font-semibold text-lg tracking-tight">
                {language === 'hi' ? 'श्रमसेतु' : 'ShramSetu'}
              </span>
              <span className="text-[10px] uppercase font-semibold text-[#DDD6FE] px-2 py-0.5 rounded-full bg-white/10 border border-white/15">
                Co-op Protocol
              </span>
            </div>

            <p className="text-white/70 text-xs sm:text-sm leading-relaxed max-w-md font-light">
              {language === 'hi' 
                ? 'सहकारी-प्रथम सार्वजनिक डिजिटल सेवा मंच। श्रमिकों के लिए न्यूनतम संरक्षित पारिश्रमिक, पारदर्शी लेज़र एवं लोकतांत्रिक सहभागिता।'
                : 'India’s cooperative-first digital public infrastructure connecting households, communities, and verified worker cooperatives with statutory wage protection.'}
            </p>

            <div className="flex items-center gap-2 text-white/60 text-xs pt-1">
              <Scale className="w-4 h-4 text-[#DDD6FE]" />
              <span>Aligned with the Ministry of Cooperation & e-Shram Architecture</span>
            </div>
          </div>

          {/* Col 2: Core Architecture */}
          <div className="space-y-3">
            <h4 className="text-white font-serif text-sm tracking-wide">
              {language === 'hi' ? 'प्रमुख सिद्धांत' : 'Core Principles'}
            </h4>
            <ul className="space-y-2 text-white/70">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#DDD6FE]" />
                <span>Fair Work Allocation Engine</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#DDD6FE]" />
                <span>Statutory Wage Floor Floor</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#DDD6FE]" />
                <span>10% Pooled Welfare Fund</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#DDD6FE]" />
                <span>Democratic Governance</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Portal Shortcuts */}
          <div className="space-y-3">
            <h4 className="text-white font-serif text-sm tracking-wide">
              {language === 'hi' ? 'पोर्टल' : 'Portals'}
            </h4>
            <ul className="space-y-2 text-white/70">
              <li>
                <Link href="/customer/request" className="hover:text-white transition-colors inline-flex items-center gap-1">
                  <span>Citizen Service Request</span>
                  <ArrowUpRight className="w-3 h-3 text-white/40" />
                </Link>
              </li>
              <li>
                <Link href="/worker/dashboard" className="hover:text-white transition-colors inline-flex items-center gap-1">
                  <span>Worker Portal & Earnings</span>
                  <ArrowUpRight className="w-3 h-3 text-white/40" />
                </Link>
              </li>
              <li>
                <Link href="/cooperative/allocation" className="hover:text-white transition-colors inline-flex items-center gap-1">
                  <span>Cooperative Allocation Console</span>
                  <ArrowUpRight className="w-3 h-3 text-white/40" />
                </Link>
              </li>
              <li>
                <Link href="/admin/dashboard" className="hover:text-white transition-colors inline-flex items-center gap-1">
                  <span>Ministry Compliance Oversight</span>
                  <ArrowUpRight className="w-3 h-3 text-white/40" />
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-white/50 text-[11px]">
          <div>
            © 2026 ShramSetu. Open Civic Cooperative Operating System.
          </div>
          <div className="flex items-center gap-4">
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
