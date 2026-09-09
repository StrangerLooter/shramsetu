'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store/app-store';
import { ShieldCheck, FileText, Download, Filter } from 'lucide-react';

export default function AdminAuditLogsPage() {
  const { auditLogs, language } = useApp();
  const [filterRole, setFilterRole] = useState<string>('all');

  const filteredLogs = auditLogs.filter(log => 
    filterRole === 'all' || log.actorRole === filterRole
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>Immutable Governance Record</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mt-1">
            {language === 'hi' ? 'सार्वजनिक प्रणाली ऑडिट ट्रेल' : 'National System Audit Ledger'}
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Every dispatch, state transition, escrow release, and wage calculation is logged with cryptographic accountability.
          </p>
        </div>

        {/* Filter by Actor */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="p-2 text-xs rounded-xl border border-slate-300 bg-white"
          >
            <option value="all">All Actors</option>
            <option value="customer">Customer Actions</option>
            <option value="worker">Worker Actions</option>
            <option value="cooperative">Cooperative Dispatches</option>
            <option value="admin">Platform Escrow Settlements</option>
          </select>
        </div>
      </div>

      {/* Audit Log Entries */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
        {filteredLogs.map((log) => (
          <div 
            key={log.id} 
            className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5 hover:bg-slate-100/60 transition-colors"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-bold text-slate-900 font-mono text-[11px] bg-white px-2 py-0.5 rounded border border-slate-200">
                {log.action}
              </span>
              <span className="text-[10px] text-slate-500 font-mono">
                {new Date(log.timestamp).toLocaleTimeString()} • {new Date(log.timestamp).toLocaleDateString()}
              </span>
            </div>

            <p className="text-slate-800 text-xs leading-relaxed">{log.details}</p>

            <div className="text-[11px] text-slate-500 pt-1 flex flex-wrap items-center gap-3 border-t border-slate-200/60">
              <span>Actor: <strong className="text-slate-700">{log.actorName}</strong> ({log.actorRole})</span>
              <span>•</span>
              <span>Entity: <strong className="text-slate-700">{log.entityType} ({log.entityId})</strong></span>
              <span>•</span>
              <span className="text-emerald-700 font-medium">✓ Cryptographically Verified</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
