'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useApp } from '@/lib/store/app-store';
import { 
  MapPin, 
  Calendar, 
  Sparkle, 
  Upload, 
  Mic, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  CheckCircle2, 
  Clock,
  Check
} from 'lucide-react';
import { PriceLedgerBreakdown } from '@/components/common/PriceLedgerBreakdown';
import { classifyServiceRequest } from '@/lib/engines/ai-assistant';
import { calculateProtectedWageBreakdown } from '@/lib/engines/wage-engine';
import { Button } from '@/components/ui/Button';

function RequestWizardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialServiceId = searchParams.get('serviceId') || 'srv-plumb';

  const { services, createServiceRequest, language } = useApp();

  const [step, setStep] = useState(1);
  const [selectedServiceId, setSelectedServiceId] = useState(initialServiceId);
  const [description, setDescription] = useState('Kitchen sink pipe has a severe leak and water is pooling under the cabinet.');
  const [address, setAddress] = useState('Flat 402, Sunshine Apartments, Saket, New Delhi - 110017');
  const [urgency, setUrgency] = useState<'NORMAL' | 'HIGH' | 'EMERGENCY'>('HIGH');
  const [preferredDate, setPreferredDate] = useState(new Date().toISOString().split('T')[0]);
  const [preferredTimeSlot, setPreferredTimeSlot] = useState<'morning' | 'afternoon' | 'evening'>('morning');
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<any>(null);

  const selectedService = services.find(s => s.id === selectedServiceId) || services[0];

  // Auto AI classification whenever description changes
  useEffect(() => {
    if (description.length > 5) {
      const result = classifyServiceRequest(description);
      setAiAnalysis(result);
    }
  }, [description]);

  const pricing = calculateProtectedWageBreakdown(
    selectedService, 
    undefined, 
    urgency === 'EMERGENCY' ? 1.25 : 1.0
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { job } = createServiceRequest({
      serviceId: selectedService.id,
      description,
      locationAddress: address,
      urgency,
      preferredDate,
      preferredTimeSlot,
      imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=500&auto=format&fit=crop&q=80'
    });

    router.push(`/customer/bookings/${job.id}`);
  };

  const sampleVoicePrompts = [
    { label: 'Hindi Urgency', text: 'Bhai bathroom ka pipe toot gya pura paani bhar rha h jaldi bhejo' },
    { label: 'English AC Issue', text: 'AC is not cooling properly and making loud buzzing sound in the master bedroom' },
    { label: 'Deep Cleaning', text: 'Need deep floor scrubbing and kitchen sanitization for family gathering tomorrow' }
  ];

  const steps = [
    { num: 1, title: 'Service & Problem' },
    { num: 2, title: 'Location & Schedule' },
    { num: 3, title: 'Wage Breakdown & Confirm' },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
      
      {/* Step Header */}
      <div className="mb-8 text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-border text-content text-xs font-medium shadow-2xs">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Statutory Protected Work Dispatch</span>
        </div>

        <h1 className="font-display text-2xl sm:text-3xl font-bold text-content tracking-tight">
          {language === 'hi' ? 'सेवा अनुरोध दर्ज करें' : 'Request a Cooperative Service'}
        </h1>

        <p className="text-xs sm:text-sm text-content-muted max-w-md mx-auto">
          {language === 'hi' 
            ? 'अपनी आवश्यकता बताएं। निष्पक्ष आवंटन प्रणाली आपके लिए निकटतम सत्यापित कारीगर चुनेगी।'
            : 'Detail your requirements. Our cooperative allocation engine matches a verified local artisan under fair workload rules.'}
        </p>

        {/* Quiet Step Indicator */}
        <div className="pt-5 flex items-center justify-center gap-2 max-w-sm mx-auto">
          {steps.map((s, idx) => (
            <React.Fragment key={s.num}>
              <div 
                onClick={() => { if (step > s.num) setStep(s.num); }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-all duration-150 ${
                  step === s.num 
                    ? 'bg-slate-900 text-white shadow-2xs' 
                    : step > s.num 
                      ? 'bg-surface-subtle text-content border border-border/60 hover:bg-surface-hover' 
                      : 'text-content-muted opacity-60'
                }`}
              >
                {step > s.num ? (
                  <Check className="w-3 h-3 text-emerald-500" />
                ) : (
                  <span className="text-[11px]">{s.num}</span>
                )}
                <span className="hidden sm:inline">{s.title}</span>
              </div>
              {idx < steps.length - 1 && (
                <div className="w-4 h-px bg-border shrink-0" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* STEP 1: SERVICE & PROBLEM */}
      {step === 1 && (
        <div className="bg-white rounded-2xl p-6 border border-border shadow-card space-y-6">
          <div>
            <label className="block text-xs font-semibold text-content-secondary uppercase tracking-wider mb-2.5">
              1. Select Service Category
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {services.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSelectedServiceId(s.id)}
                  className={`p-3 rounded-xl border text-left transition-all duration-150 ${
                    selectedServiceId === s.id 
                      ? 'border-slate-900 bg-surface-subtle ring-1 ring-slate-900 shadow-2xs' 
                      : 'border-border/80 hover:border-neutral-300 bg-white'
                  }`}
                >
                  <div className="font-semibold text-xs text-content">{s.name}</div>
                  <div className="text-[11px] text-content-muted mt-1">From ₹{s.basePrice}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-semibold text-content-secondary uppercase tracking-wider">
                2. Describe the Issue
              </label>
              <div className="flex items-center gap-1 text-[11px] text-emerald-700">
                <Sparkle className="w-3 h-3" />
                <span>AI Problem Clarifier Active</span>
              </div>
            </div>

            {/* Quick Sample Prompts */}
            <div className="flex flex-wrap items-center gap-1.5 mb-2.5">
              <span className="text-[10px] text-content-muted">Sample prompts:</span>
              {sampleVoicePrompts.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setDescription(p.text)}
                  className="text-[10px] px-2.5 py-0.5 rounded-full bg-surface-subtle hover:bg-surface-hover text-content-secondary border border-border/60 transition-colors"
                >
                  {p.label}
                </button>
              ))}
            </div>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="e.g. Bathroom sink tap has a leak and water is pooling under the cabinet..."
              className="w-full p-3.5 text-sm rounded-xl border border-border bg-white text-content placeholder:text-content-subtle focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800 transition-all"
            />

            {/* Voice & Photo Shortcuts */}
            <div className="mt-3 flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setIsRecordingVoice(!isRecordingVoice);
                  if (!isRecordingVoice) {
                    setDescription('Bhai bathroom ka pipe toot gya pura paani bhar rha h jaldi bhejo');
                  }
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border flex items-center gap-1.5 transition-all ${
                  isRecordingVoice 
                    ? 'bg-red-50 text-red-700 border-red-200 animate-pulse' 
                    : 'bg-surface-subtle text-content border-border/80 hover:bg-surface-hover'
                }`}
              >
                <Mic className="w-3.5 h-3.5 text-content-muted" />
                <span>{isRecordingVoice ? 'Recording... (Tap to apply)' : 'Voice Note (Hinglish/Hindi)'}</span>
              </button>

              <div className="px-3 py-1.5 rounded-lg text-xs font-medium border border-border/80 bg-surface-subtle text-content-muted flex items-center gap-1.5">
                <Upload className="w-3.5 h-3.5 text-content-muted" />
                <span>Photo Proof Attached</span>
              </div>
            </div>

            {/* AI Assistant Output Card */}
            {aiAnalysis && (
              <div className="mt-4 p-3.5 rounded-xl bg-surface-subtle border border-border text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-content flex items-center gap-1.5">
                    <Sparkle className="w-3.5 h-3.5 text-emerald-600" />
                    Detected Issue: {aiAnalysis.identifiedIssue}
                  </span>
                  <span className="text-[10px] bg-white text-content-muted px-2 py-0.5 rounded border border-border/60">
                    Confidence {(aiAnalysis.confidenceScore * 100).toFixed(0)}%
                  </span>
                </div>
                <div className="flex flex-wrap gap-3 pt-1 text-[11px] text-content-muted">
                  <span>Language: <strong className="text-content">{aiAnalysis.rawLanguageDetected}</strong></span>
                  <span>•</span>
                  <span>Suggested Urgency: <strong className="text-amber-700">{aiAnalysis.suggestedUrgency}</strong></span>
                  <span>•</span>
                  <span>Est. Duration: <strong className="text-content">{aiAnalysis.estimatedHours} Hours</strong></span>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end pt-2">
            <Button
              variant="primary"
              size="md"
              onClick={() => setStep(2)}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Continue to Location & Schedule
            </Button>
          </div>
        </div>
      )}

      {/* STEP 2: LOCATION & TIME */}
      {step === 2 && (
        <div className="bg-white rounded-2xl p-6 border border-border shadow-card space-y-6">
          <div>
            <label className="block text-xs font-semibold text-content-secondary uppercase tracking-wider mb-2">
              Service Address & Landmark
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-content-muted absolute left-3.5 top-3" />
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border border-border bg-white text-content focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800 transition-all"
              />
            </div>
            <p className="text-[11px] text-content-muted mt-1.5">
              Assigned Cooperative Node: <strong className="text-content font-medium">Shramik Seva Co-op (Saket Hub • 1.8km away)</strong>
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-content-secondary uppercase tracking-wider mb-2">
                Preferred Date
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-content-muted absolute left-3.5 top-3" />
                <input
                  type="date"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border border-border bg-white text-content focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-content-secondary uppercase tracking-wider mb-2">
                Preferred Time Slot
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['morning', 'afternoon', 'evening'] as const).map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setPreferredTimeSlot(slot)}
                    className={`py-2 px-2 rounded-xl text-xs font-medium border capitalize transition-all ${
                      preferredTimeSlot === slot 
                        ? 'bg-slate-900 text-white border-slate-900 shadow-2xs' 
                        : 'bg-surface-subtle text-content border-border/80 hover:bg-surface-hover'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-content-secondary uppercase tracking-wider mb-2">
              Urgency Level
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {(['NORMAL', 'HIGH', 'EMERGENCY'] as const).map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setUrgency(lvl)}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    urgency === lvl 
                      ? lvl === 'EMERGENCY' 
                        ? 'bg-red-50 border-red-300 text-red-900 font-semibold shadow-2xs' 
                        : 'bg-slate-900 border-slate-900 text-white font-semibold shadow-2xs'
                      : 'bg-surface-subtle border-border/80 text-content hover:bg-surface-hover'
                  }`}
                >
                  <div className="text-xs">{lvl}</div>
                  <div className={`text-[10px] mt-0.5 ${urgency === lvl && lvl !== 'EMERGENCY' ? 'text-slate-300' : 'text-content-muted'}`}>
                    {lvl === 'EMERGENCY' ? '+25% Hazard/Overtime' : 'Standard Rate'}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center pt-2">
            <Button
              variant="ghost"
              size="md"
              onClick={() => setStep(1)}
              leftIcon={<ArrowLeft className="w-4 h-4" />}
            >
              Back
            </Button>

            <Button
              variant="primary"
              size="md"
              onClick={() => setStep(3)}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Next: Wage Breakdown
            </Button>
          </div>
        </div>
      )}

      {/* STEP 3: PROTECTED WAGE REVIEW & CONFIRM */}
      {step === 3 && (
        <div className="bg-white rounded-2xl p-6 border border-border shadow-card space-y-6">
          <div>
            <h3 className="text-base font-semibold text-content">
              Transparent Pricing & Protected Wage Guarantee
            </h3>
            <p className="text-xs text-content-muted mt-1">
              Every rupee is transparently allocated. The worker is guaranteed the statutory wage floor with zero predatory commission deductions.
            </p>
          </div>

          {/* Pricing Ledger Component */}
          <PriceLedgerBreakdown pricing={pricing} />

          <div className="p-3.5 rounded-xl bg-surface-subtle border border-border flex items-start gap-2.5 text-xs text-content">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-content">Fair Work Allocation Guarantee:</span>
              <p className="text-[11px] text-content-muted mt-0.5 leading-relaxed">
                Upon submitting, the ShramSetu dispatch algorithm selects a qualified, verified local worker who has completed fewer jobs today to protect union income distribution.
              </p>
            </div>
          </div>

          <div className="flex justify-between items-center pt-2">
            <Button
              variant="ghost"
              size="md"
              onClick={() => setStep(2)}
              leftIcon={<ArrowLeft className="w-4 h-4" />}
            >
              Back
            </Button>

            <Button
              variant="coop"
              size="lg"
              onClick={handleSubmit}
              leftIcon={<ShieldCheck className="w-4 h-4" />}
            >
              Confirm & Request Dispatch
            </Button>
          </div>
        </div>
      )}

    </div>
  );
}

export default function ServiceRequestWizard() {
  return (
    <Suspense fallback={<div className="max-w-3xl mx-auto p-12 text-center text-xs text-content-muted">Loading request wizard...</div>}>
      <RequestWizardContent />
    </Suspense>
  );
}
