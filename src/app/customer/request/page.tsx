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
    <div className="max-w-3xl mx-auto px-4 py-12 sm:py-16">
      
      {/* Step Header */}
      <div className="mb-10 text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F2EFE9] border border-[rgba(18,19,22,0.08)] text-[#121316] text-xs font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-[#0D2F28]" />
          <span>Statutory Protected Work Dispatch</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#121316] tracking-tight">
          {language === 'hi' ? (
            <>सेवा अनुरोध <span className="font-serif italic font-normal">दर्ज करें</span></>
          ) : (
            <>Request a <span className="font-serif italic font-normal">Cooperative Service</span></>
          )}
        </h1>

        <p className="text-xs sm:text-sm text-[#66676E] max-w-md mx-auto font-light">
          {language === 'hi' 
            ? 'अपनी आवश्यकता बताएं। निष्पक्ष आवंटन प्रणाली आपके लिए निकटतम सत्यापित कारीगर चुनेगी।'
            : 'Detail your requirements. Our cooperative allocation engine matches a verified local artisan under fair workload rules.'}
        </p>

        {/* Quiet Step Indicator */}
        <div className="pt-6 flex items-center justify-center gap-2 max-w-sm mx-auto">
          {steps.map((s, idx) => (
            <React.Fragment key={s.num}>
              <div 
                onClick={() => { if (step > s.num) setStep(s.num); }}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-all duration-150 ${
                  step === s.num 
                    ? 'bg-[#121316] text-white shadow-subtle' 
                    : step > s.num 
                      ? 'bg-[#F2EFE9] text-[#121316] border border-[rgba(18,19,22,0.08)] hover:bg-[#EAE6DE]' 
                      : 'text-[#66676E] opacity-50'
                }`}
              >
                {step > s.num ? (
                  <Check className="w-3 h-3 text-[#0D2F28]" />
                ) : (
                  <span className="text-[11px] font-semibold">{s.num}</span>
                )}
                <span className="hidden sm:inline">{s.title}</span>
              </div>
              {idx < steps.length - 1 && (
                <div className="w-4 h-px bg-[rgba(18,19,22,0.12)] shrink-0" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* STEP 1: SERVICE & PROBLEM */}
      {step === 1 && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[rgba(18,19,22,0.08)] shadow-card space-y-6">
          <div>
            <label className="block text-xs font-semibold text-[#121316] uppercase tracking-wider mb-3">
              1. Select Service Category
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {services.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSelectedServiceId(s.id)}
                  className={`p-3.5 rounded-2xl border text-left transition-all duration-150 ${
                    selectedServiceId === s.id 
                      ? 'border-[#121316] bg-[#F2EFE9] ring-1 ring-[#121316] shadow-subtle' 
                      : 'border-[rgba(18,19,22,0.08)] hover:border-[rgba(18,19,22,0.18)] bg-white'
                  }`}
                >
                  <div className="font-serif text-sm font-medium text-[#121316]">{s.name}</div>
                  <div className="text-[11px] text-[#66676E] mt-1 font-sans">From ₹{s.basePrice}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-semibold text-[#121316] uppercase tracking-wider">
                2. Describe the Issue
              </label>
              <div className="flex items-center gap-1.5 text-xs text-[#0D2F28] font-medium">
                <Sparkle className="w-3.5 h-3.5" />
                <span>AI Problem Clarifier Active</span>
              </div>
            </div>

            {/* Quick Sample Prompts */}
            <div className="flex flex-wrap items-center gap-1.5 mb-3">
              <span className="text-[10px] text-[#66676E]">Sample prompts:</span>
              {sampleVoicePrompts.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setDescription(p.text)}
                  className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#F2EFE9] hover:bg-[#EAE6DE] text-[#121316] border border-[rgba(18,19,22,0.06)] transition-colors"
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
              className="w-full p-4 text-sm rounded-2xl border border-[rgba(18,19,22,0.12)] bg-white text-[#121316] placeholder:text-[#9D9EA5] focus:outline-none focus:ring-2 focus:ring-[#121316]/10 focus:border-[#121316] transition-all"
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
                className={`px-3.5 py-2 rounded-xl text-xs font-medium border flex items-center gap-1.5 transition-all ${
                  isRecordingVoice 
                    ? 'bg-red-50 text-red-700 border-red-200 animate-pulse' 
                    : 'bg-[#F2EFE9] text-[#121316] border-[rgba(18,19,22,0.08)] hover:bg-[#EAE6DE]'
                }`}
              >
                <Mic className="w-3.5 h-3.5 text-[#66676E]" />
                <span>{isRecordingVoice ? 'Recording... (Tap to apply)' : 'Voice Note (Hinglish/Hindi)'}</span>
              </button>

              <div className="px-3.5 py-2 rounded-xl text-xs font-medium border border-[rgba(18,19,22,0.08)] bg-[#F2EFE9] text-[#66676E] flex items-center gap-1.5">
                <Upload className="w-3.5 h-3.5 text-[#66676E]" />
                <span>Photo Proof Attached</span>
              </div>
            </div>

            {/* AI Assistant Output Card */}
            {aiAnalysis && (
              <div className="mt-4 p-4 rounded-2xl bg-[#F2EFE9] border border-[rgba(18,19,22,0.08)] text-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-[#121316] flex items-center gap-1.5">
                    <Sparkle className="w-3.5 h-3.5 text-[#0D2F28]" />
                    Detected Issue: {aiAnalysis.identifiedIssue}
                  </span>
                  <span className="text-[10px] bg-white text-[#66676E] px-2 py-0.5 rounded-md border border-[rgba(18,19,22,0.06)]">
                    Confidence {(aiAnalysis.confidenceScore * 100).toFixed(0)}%
                  </span>
                </div>
                <div className="flex flex-wrap gap-3 pt-1 text-[11px] text-[#66676E]">
                  <span>Language: <strong className="text-[#121316]">{aiAnalysis.rawLanguageDetected}</strong></span>
                  <span>•</span>
                  <span>Suggested Urgency: <strong className="text-[#B45309]">{aiAnalysis.suggestedUrgency}</strong></span>
                  <span>•</span>
                  <span>Est. Duration: <strong className="text-[#121316]">{aiAnalysis.estimatedHours} Hours</strong></span>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end pt-3">
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
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[rgba(18,19,22,0.08)] shadow-card space-y-6">
          <div>
            <label className="block text-xs font-semibold text-[#121316] uppercase tracking-wider mb-2">
              Service Address & Landmark
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-[#66676E] absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full pl-10 pr-3.5 py-3 text-sm rounded-2xl border border-[rgba(18,19,22,0.12)] bg-white text-[#121316] focus:outline-none focus:ring-2 focus:ring-[#121316]/10 focus:border-[#121316] transition-all"
              />
            </div>
            <p className="text-[11px] text-[#66676E] mt-2 font-light">
              Assigned Cooperative Node: <strong className="text-[#121316] font-medium">Shramik Seva Co-op (Saket Hub • 1.8km away)</strong>
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#121316] uppercase tracking-wider mb-2">
                Preferred Date
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-[#66676E] absolute left-3.5 top-3.5" />
                <input
                  type="date"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-3 text-sm rounded-2xl border border-[rgba(18,19,22,0.12)] bg-white text-[#121316] focus:outline-none focus:ring-2 focus:ring-[#121316]/10 focus:border-[#121316] transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#121316] uppercase tracking-wider mb-2">
                Preferred Time Slot
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['morning', 'afternoon', 'evening'] as const).map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setPreferredTimeSlot(slot)}
                    className={`py-3 px-2 rounded-xl text-xs font-medium border capitalize transition-all ${
                      preferredTimeSlot === slot 
                        ? 'bg-[#121316] text-white border-[#121316] shadow-subtle' 
                        : 'bg-[#F2EFE9] text-[#121316] border-[rgba(18,19,22,0.08)] hover:bg-[#EAE6DE]'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#121316] uppercase tracking-wider mb-2">
              Urgency Level
            </label>
            <div className="grid grid-cols-3 gap-3">
              {(['NORMAL', 'HIGH', 'EMERGENCY'] as const).map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setUrgency(lvl)}
                  className={`p-3.5 rounded-2xl border text-center transition-all ${
                    urgency === lvl 
                      ? lvl === 'EMERGENCY' 
                        ? 'bg-red-50 border-red-200 text-red-900 font-semibold shadow-subtle' 
                        : 'bg-[#121316] border-[#121316] text-white font-semibold shadow-subtle'
                      : 'bg-[#F2EFE9] border-[rgba(18,19,22,0.08)] text-[#121316] hover:bg-[#EAE6DE]'
                  }`}
                >
                  <div className="text-xs font-medium">{lvl}</div>
                  <div className={`text-[10px] mt-0.5 ${urgency === lvl && lvl !== 'EMERGENCY' ? 'text-white/70' : 'text-[#66676E]'}`}>
                    {lvl === 'EMERGENCY' ? '+25% Overtime' : 'Standard Rate'}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center pt-3">
            <Button
              variant="secondary"
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
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[rgba(18,19,22,0.08)] shadow-card space-y-6">
          <div>
            <h3 className="font-serif text-2xl font-normal text-[#121316]">
              Transparent Pricing & Protected Wage Guarantee
            </h3>
            <p className="text-xs text-[#66676E] mt-1 font-light">
              Every rupee is transparently allocated. The worker is guaranteed the statutory wage floor with zero predatory commission deductions.
            </p>
          </div>

          {/* Pricing Ledger Component */}
          <PriceLedgerBreakdown pricing={pricing} />

          <div className="p-4 rounded-2xl bg-[#F2EFE9] border border-[rgba(18,19,22,0.08)] flex items-start gap-3 text-xs text-[#121316]">
            <CheckCircle2 className="w-4 h-4 text-[#0D2F28] shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-[#121316]">Fair Work Allocation Guarantee:</span>
              <p className="text-[11px] text-[#66676E] mt-1 leading-relaxed font-light">
                Upon submitting, the ShramSetu dispatch algorithm selects a qualified, verified local worker who has completed fewer jobs today to protect cooperative income equity.
              </p>
            </div>
          </div>

          <div className="flex justify-between items-center pt-3">
            <Button
              variant="secondary"
              size="md"
              onClick={() => setStep(2)}
              leftIcon={<ArrowLeft className="w-4 h-4" />}
            >
              Back
            </Button>

            <Button
              variant="primary"
              size="lg"
              onClick={handleSubmit}
              leftIcon={<ShieldCheck className="w-4 h-4 text-[#121316]" />}
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
    <Suspense fallback={<div className="max-w-3xl mx-auto p-12 text-center text-xs text-[#66676E]">Loading request wizard...</div>}>
      <RequestWizardContent />
    </Suspense>
  );
}
