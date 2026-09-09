'use client';

import React from 'react';
import { useApp } from '@/lib/store/app-store';
import { ShieldCheck, FileText, CheckCircle2, Download, Scale } from 'lucide-react';

export default function CooperativeReportsPage() {
  const { auditLogs, activeCooperative, language } = useApp();

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            {language === 'hi' ? 'सहकारी ऑडिट लेज़र एवं रिपोर्ट' : 'Cooperative Audit Ledger & Reports'}
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Immutable transaction history, statutory wage compliance records, and democratic dispatch trail.
          </p>
        </div>

        <button
          onClick={() => alert('Cooperative Compliance Audit Report exported successfully (PDF format)!')}
          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm self-start"
        >
          <Download className="w-4 h-4" />
          <span>Export Audit PDF</span>
        </button>
      </div>

      {/* Compliance Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200">
          <span className="text-xs font-bold text-emerald-800">Wage Compliance Rating</span>
          <div className="text-2xl font-black text-emerald-700 mt-1">100%</div>
          <p className="text-[11px] text-emerald-600 mt-0.5">Zero wage dilution incidents logged</p>
        </div>

        <div className="bg-blue-50 rounded-2xl p-4 border border-blue-200">
          <span className="text-xs font-bold text-blue-800">Fair Allocation Health</span>
          <div className="text-2xl font-black text-blue-700 mt-1">88.4%</div>
          <p className="text-[11px] text-blue-600 mt-0.5">Optimal multi-worker distribution</p>
        </div>

        <div className="bg-purple-50 rounded-2xl p-4 border border-purple-200">
          <span className="text-xs font-bold text-purple-800">Welfare Fund Pool</span>
          <div className="text-2xl font-black text-purple-700 mt-1">
            ₹{activeCooperative.collectiveWelfareFund.toLocaleString('en-IN')}
          </div>
          <p className="text-[11px] text-purple-600 mt-0.5">Health & emergency reserves</p>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <FileText className="w-4 h-4 text-blue-600" />
          <span>Audit Trail History</span>
        </h3>

        <div className="space-y-3">
          {auditLogs.map((log) => (
            <div key={log.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 font-mono text-[11px]">
                  {log.action}
                </span>
                <span className="text-[10px] text-slate-400">
                  {new Date(log.timestamp).toLocaleTimeString()} • {new Date(log.timestamp).toLocaleDateString()}
                </span>
              </div>
              <p className="text-slate-700 text-xs">{log.details}</p>
              <div className="text-[10px] text-slate-500 pt-1 flex items-center gap-2">
                <span>Actor: <strong className="text-slate-700">{log.actorName}</strong></span>
                <span>•</span>
                <span>Entity: <strong className="text-slate-700">{log.entityType} ({log.entityId})</strong></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
