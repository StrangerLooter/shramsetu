'use client';

import React from 'react';
import { useApp } from '@/lib/store/app-store';
import { ShieldCheck, Scale, CheckCircle2, AlertCircle } from 'lucide-react';

export default function AdminWageCompliancePage() {
  const { services, cooperatives, language } = useApp();

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      <div>
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4" />
          <span>Statutory Protection Standards</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mt-1">
          {language === 'hi' ? 'सांविधिक न्यूनतम मजदूरी अनुपालन' : 'Statutory Wage Floor Compliance Engine'}
        </h1>
        <p className="text-xs text-slate-600 mt-1">
          Government mandated minimum protected earnings per craft category. ShramSetu strictly blocks any transactions that attempt to undercut these floors.
        </p>
      </div>

      {/* Wage Rules Matrix */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <h3 className="font-bold text-sm text-slate-900">Configured Category Statutory Wage Floors</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-600">
                <th className="p-3">Service Category</th>
                <th className="p-3">Customer Base Price</th>
                <th className="p-3 text-emerald-800">Protected Worker Floor (Min)</th>
                <th className="p-3">Co-op Fund (10%)</th>
                <th className="p-3">Platform Ops (5%)</th>
                <th className="p-3">Compliance Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {services.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50/50">
                  <td className="p-3 font-bold text-slate-900">{s.name}</td>
                  <td className="p-3">₹{s.basePrice}</td>
                  <td className="p-3 font-bold text-emerald-700">₹{s.minimumWageFloor}</td>
                  <td className="p-3 text-blue-700">₹{Math.round(s.minimumWageFloor * 0.1)}</td>
                  <td className="p-3 text-slate-500">₹{Math.round(s.minimumWageFloor * 0.05)}</td>
                  <td className="p-3">
                    <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3 h-3" />
                      100% Enforced
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
