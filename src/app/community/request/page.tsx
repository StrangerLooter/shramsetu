'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/store/app-store';
import { Building2, Plus, ArrowLeft, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { ServiceCategory } from '@/types';

export default function CommunityRequestPage() {
  const router = useRouter();
  const { createCommunityOrder, language } = useApp();

  const [eventName, setEventName] = useState('Diwali Pre-Festival Deep Cleaning & Electrical Audit');
  const [address, setAddress] = useState('Arawali Heights, Sector 56, Gurugram');
  const [date, setDate] = useState('2026-10-10');
  
  const [workerSlots, setWorkerSlots] = useState<{ category: ServiceCategory; count: number; durationDays: number }[]>([
    { category: 'cleaning', count: 3, durationDays: 2 },
    { category: 'electrical', count: 2, durationDays: 1 },
    { category: 'plumbing', count: 1, durationDays: 1 }
  ]);

  const calculateTotal = () => {
    return workerSlots.reduce((acc, slot) => {
      const dailyRate = slot.category === 'cleaning' ? 650 : slot.category === 'electrical' ? 480 : 450;
      return acc + (dailyRate * slot.count * slot.durationDays);
    }, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createCommunityOrder({
      societyName: 'Arawali Heights RWA',
      adminName: 'Col. V. K. Malhotra (Rtd)',
      phone: '+91 98101 99887',
      address,
      eventName,
      requiredWorkers: workerSlots,
      date,
      totalBudget: calculateTotal(),
      cooperativeId: 'coop-2'
    });

    router.push('/community/dashboard');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.push('/community/dashboard')}
          className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Society Dashboard</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-purple-700 uppercase tracking-wider">
            <Building2 className="w-4 h-4" />
            <span>Multi-Worker Cooperative Deployment</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 mt-1">
            Book Society Maintenance Team
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Single bulk invoice, protected worker wage compliance, and full cooperative supervisor coordination.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Event / Maintenance Purpose
            </label>
            <input
              type="text"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              className="w-full p-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Society Address
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Scheduled Start Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* Multi-Worker Trade Slots */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Required Trades & Team Composition
            </label>
            <div className="space-y-2.5">
              {workerSlots.map((slot, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-xl bg-purple-50/50 border border-purple-200 text-xs">
                  <span className="font-bold text-slate-800 uppercase text-[11px] w-28">
                    {slot.category}
                  </span>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500">Workers:</span>
                    <input
                      type="number"
                      min={1}
                      max={10}
                      value={slot.count}
                      onChange={(e) => {
                        const newSlots = [...workerSlots];
                        newSlots[index].count = parseInt(e.target.value) || 1;
                        setWorkerSlots(newSlots);
                      }}
                      className="w-16 p-1 border rounded text-center bg-white"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-slate-500">Days:</span>
                    <input
                      type="number"
                      min={1}
                      max={7}
                      value={slot.durationDays}
                      onChange={(e) => {
                        const newSlots = [...workerSlots];
                        newSlots[index].durationDays = parseInt(e.target.value) || 1;
                        setWorkerSlots(newSlots);
                      }}
                      className="w-16 p-1 border rounded text-center bg-white"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Budget Calculation */}
          <div className="p-4 rounded-xl bg-slate-900 text-white flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 block">Total Society Team Budget</span>
              <span className="text-xl font-black text-emerald-400">₹{calculateTotal().toLocaleString('en-IN')}</span>
            </div>
            <div className="text-[11px] text-slate-300 text-right">
              Includes 100% Protected Wages + 10% Co-op Pool
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors"
          >
            Dispatch Multi-Worker Society Team Request
          </button>
        </form>
      </div>
    </div>
  );
}
