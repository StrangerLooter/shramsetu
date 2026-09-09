'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '@/lib/store/app-store';
import { 
  ShieldCheck, 
  MapPin, 
  Clock, 
  Phone, 
  MessageSquare, 
  Star, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowLeft,
  CreditCard,
  Check,
  Send
} from 'lucide-react';
import { MapSimulator } from '@/components/common/MapSimulator';
import { PriceLedgerBreakdown } from '@/components/common/PriceLedgerBreakdown';
import { BeforeAfterSlider } from '@/components/common/BeforeAfterSlider';
import { VoiceReaderButton } from '@/components/common/VoiceReaderButton';
import { WorkerDigitalIDModal } from '@/components/common/WorkerDigitalIDModal';
import { announceWorkerWageSettlement } from '@/lib/engines/soundbox';
import confetti from 'canvas-confetti';
import { JobStatus } from '@/types';
import { Button } from '@/components/ui/Button';
import { StatusBadge } from '@/components/ui/StatusBadge';

export default function CustomerBookingDetailPage() {
  const params = useParams();
  const router = useRouter();
  const jobId = params.id as string;

  const { 
    jobs, 
    workers,
    settleJobPayment, 
    submitCustomerRating, 
    raiseDispute, 
    updateJobStatus,
    setRole,
    language 
  } = useApp();

  const job = jobs.find(j => j.id === jobId) || jobs[0];
  const assignedWorker = workers.find(w => w.id === job.workerId) || workers[0];

  const [idModalOpen, setIdModalOpen] = useState(false);
  const [ratingOverall, setRatingOverall] = useState(5);
  const [ratingComment, setRatingComment] = useState('Excellent service, prompt arrival and honest pricing.');
  const [ratingSubmitted, setRatingSubmitted] = useState(false);

  const [disputeOpen, setDisputeOpen] = useState(false);
  const [disputeReason, setDisputeReason] = useState('Poor quality / incomplete work');
  const [disputeNotes, setDisputeNotes] = useState('');

  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{ sender: 'customer' | 'worker'; text: string; time: string }[]>([
    { sender: 'worker', text: 'Namaste Ram ji, I have picked up the tools from the cooperative hub and am heading to your flat.', time: '10:02 AM' },
    { sender: 'customer', text: 'Thank you Amit, the gate security is informed.', time: '10:04 AM' }
  ]);

  if (!job) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <p className="text-sm text-[#66676E]">Booking not found.</p>
        <Link href="/customer/bookings" className="text-[#121316] font-semibold text-xs mt-2 inline-block">
          Return to Bookings
        </Link>
      </div>
    );
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    setChatHistory(prev => [...prev, { sender: 'customer', text: chatMessage, time: 'Just now' }]);
    setChatMessage('');
  };

  const handleRatingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitCustomerRating(job.id, {
      overall: ratingOverall,
      quality: 5,
      timeliness: 5,
      professionalism: 5,
      comment: ratingComment
    });
    setRatingSubmitted(true);
  };

  const handleRaiseDispute = (e: React.FormEvent) => {
    e.preventDefault();
    raiseDispute(job.id, disputeReason, disputeNotes || 'Customer raised grievance regarding service execution.', 'CUSTOMER');
    setDisputeOpen(false);
  };

  const steps: { key: JobStatus; label: string }[] = [
    { key: 'REQUESTED', label: 'Requested' },
    { key: 'MATCHING', label: 'Co-op Matching' },
    { key: 'ASSIGNED', label: 'Worker Assigned' },
    { key: 'ACCEPTED', label: 'Accepted' },
    { key: 'WORKER_ON_THE_WAY', label: 'On The Way' },
    { key: 'ARRIVED', label: 'Arrived' },
    { key: 'IN_PROGRESS', label: 'In Progress' },
    { key: 'COMPLETED', label: 'Completed' },
    { key: 'PAYMENT_SETTLED', label: 'Settled & Closed' }
  ];

  const currentStepIndex = steps.findIndex(s => s.key === job.status);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-6">
      
      {/* Top Breadcrumb & Status Alert */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link 
          href="/customer/bookings"
          className="text-xs font-medium text-[#66676E] hover:text-[#121316] flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Bookings</span>
        </Link>

        {/* Quick Fast-Forward Controller for Evaluators */}
        <div className="flex items-center gap-1.5 bg-[#F2EFE9] p-1 rounded-2xl border border-[rgba(18,19,22,0.08)] text-xs">
          <span className="text-[11px] text-[#66676E] font-medium px-2.5 hidden sm:inline">Simulate Status:</span>
          <button
            onClick={() => updateJobStatus(job.id, 'WORKER_ON_THE_WAY')}
            className={`px-2.5 py-1 rounded-xl text-[11px] transition-all ${job.status === 'WORKER_ON_THE_WAY' ? 'bg-[#121316] text-white font-medium shadow-subtle' : 'text-[#66676E] hover:text-[#121316]'}`}
          >
            On The Way
          </button>
          <button
            onClick={() => updateJobStatus(job.id, 'ARRIVED')}
            className={`px-2.5 py-1 rounded-xl text-[11px] transition-all ${job.status === 'ARRIVED' ? 'bg-[#121316] text-white font-medium shadow-subtle' : 'text-[#66676E] hover:text-[#121316]'}`}
          >
            Arrived
          </button>
          <button
            onClick={() => updateJobStatus(job.id, 'IN_PROGRESS')}
            className={`px-2.5 py-1 rounded-xl text-[11px] transition-all ${job.status === 'IN_PROGRESS' ? 'bg-[#121316] text-white font-medium shadow-subtle' : 'text-[#66676E] hover:text-[#121316]'}`}
          >
            In Progress
          </button>
          <button
            onClick={() => updateJobStatus(job.id, 'COMPLETED')}
            className={`px-2.5 py-1 rounded-xl text-[11px] transition-all ${job.status === 'COMPLETED' ? 'bg-[#121316] text-white font-medium shadow-subtle' : 'text-[#66676E] hover:text-[#121316]'}`}
          >
            Completed
          </button>
        </div>
      </div>

      {/* Main Booking Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[rgba(18,19,22,0.08)] shadow-card space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-[rgba(18,19,22,0.08)]">
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="font-serif text-2xl sm:text-3xl font-normal text-[#121316]">{job.serviceName}</h1>
              <span className="text-xs font-mono bg-[#F2EFE9] text-[#66676E] px-2.5 py-0.5 rounded-md border border-[rgba(18,19,22,0.06)]">
                #{job.id}
              </span>
              <StatusBadge status={job.status} size="sm" />
            </div>
            <p className="text-xs sm:text-sm text-[#66676E] mt-1.5 font-light">{job.description}</p>
          </div>

          <div className="flex items-center gap-2.5">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setChatOpen(!chatOpen)}
              leftIcon={<MessageSquare className="w-3.5 h-3.5" />}
            >
              In-App Chat
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setDisputeOpen(true)}
              leftIcon={<AlertTriangle className="w-3.5 h-3.5 text-amber-600" />}
            >
              Raise Issue
            </Button>
          </div>
        </div>

        {/* Step Progression Timeline */}
        <div className="pt-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#66676E] block mb-3">
            Service Progression
          </span>
          <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2">
            {steps.map((s, idx) => {
              const isPast = idx < currentStepIndex;
              const isCurrent = idx === currentStepIndex;
              return (
                <div 
                  key={s.key}
                  className={`p-2.5 rounded-2xl text-center border transition-all duration-150 ${
                    isCurrent 
                      ? 'bg-[#121316] text-white border-[#121316] shadow-subtle' 
                      : isPast 
                      ? 'bg-[#F2EFE9] text-[#0D2F28] border-[rgba(18,19,22,0.08)]' 
                      : 'bg-white text-[#66676E] border-[rgba(18,19,22,0.06)] opacity-60'
                  }`}
                >
                  <div className="text-[10px] font-semibold uppercase tracking-tight">
                    {isPast ? '✓ Done' : isCurrent ? '● Active' : `${idx + 1}`}
                  </div>
                  <div className="text-[11px] font-medium truncate mt-0.5">{s.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Two Column Layout: Left (Live Tracking / Proof / Actions), Right (Worker Profile & Price Breakdown) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Live Map GPS Simulator */}
          <MapSimulator
            workerName={job.workerName || 'Amit Verma'}
            workerAvatar={job.workerAvatar}
            workerPhone={job.workerPhone}
            status={job.status}
            customerAddress={job.locationAddress}
            etaMinutes={job.workerEtaMinutes || 14}
          />

          {/* If Job is COMPLETED -> Show Photographic Inspection Proof with Before/After Slider & Escrow Payment Button */}
          {job.status === 'COMPLETED' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#CCE6DA] shadow-card space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#0D2F28] font-semibold text-sm">
                  <CheckCircle2 className="w-5 h-5 text-[#0D2F28]" />
                  <span>Work Completed & Photographic Evidence Verified</span>
                </div>
                <VoiceReaderButton 
                  textToRead={job.completionProof?.notes || 'Repaired the sink joint, tested water flow with zero leakage.'} 
                  label="Audio Notes" 
                />
              </div>

              {/* Before / After Slider Comparison */}
              <BeforeAfterSlider 
                beforeImage="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&auto=format&fit=crop&q=80"
                afterImage={job.completionProof?.image || 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&auto=format&fit=crop&q=80'}
                beforeLabel="Before: Fractured Pipe"
                afterLabel="After: Verified Repair & Seal"
                notes={job.completionProof?.notes || 'Repaired sink joint, verified zero leakage under pressure.'}
              />

              {/* Instant Escrow Settlement Action in Soft Lavender */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-[#66676E] block">Total Settlement Amount</span>
                  <span className="font-serif text-2xl font-semibold text-[#121316]">₹{job.pricing.customerTotal}</span>
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => {
                    settleJobPayment(job.id);
                    try {
                      confetti({
                        particleCount: 150,
                        spread: 80,
                        origin: { y: 0.6 }
                      });
                    } catch (e) {
                      console.warn('Confetti error', e);
                    }
                    announceWorkerWageSettlement(
                      job.pricing.protectedWorkerWage,
                      job.workerName || 'Amit Verma',
                      language === 'hi' ? 'hi' : 'en'
                    );
                  }}
                  leftIcon={<CreditCard className="w-4 h-4 text-[#121316]" />}
                >
                  Confirm Satisfaction & Release Escrow
                </Button>
              </div>
            </div>
          )}

          {/* If Job is PAYMENT_SETTLED -> Show Rating & Review submission */}
          {job.status === 'PAYMENT_SETTLED' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[rgba(18,19,22,0.08)] shadow-card space-y-4">
              <div className="flex items-center gap-2 text-[#0D2F28] font-semibold text-sm">
                <ShieldCheck className="w-5 h-5 text-[#0D2F28]" />
                <span>Payment Settled • Leave Worker Review</span>
              </div>

              {ratingSubmitted || job.customerRating ? (
                <div className="p-4 bg-[#F2EFE9] rounded-2xl border border-[rgba(18,19,22,0.08)] text-xs text-[#121316] space-y-1">
                  <div className="flex items-center gap-1.5 font-semibold text-[#0D2F28]">
                    <Check className="w-4 h-4 text-[#0D2F28]" />
                    <span>Review Submitted Successfully!</span>
                  </div>
                  <p className="text-[#66676E] font-light">
                    "{job.customerRating?.comment || ratingComment}"
                  </p>
                </div>
              ) : (
                <form onSubmit={handleRatingSubmit} className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#121316] uppercase tracking-wider mb-2">
                      Rate Worker Craftsmanship & Professionalism
                    </label>
                    <div className="flex items-center gap-1.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRatingOverall(star)}
                          className="p-1 text-amber-400 hover:scale-110 transition-transform"
                        >
                          <Star className={`w-6 h-6 ${star <= ratingOverall ? 'fill-amber-400 text-amber-400' : 'text-neutral-300'}`} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <textarea
                    value={ratingComment}
                    onChange={(e) => setRatingComment(e.target.value)}
                    rows={2}
                    className="w-full p-3 text-xs rounded-2xl border border-[rgba(18,19,22,0.12)] bg-white text-[#121316] focus:outline-none focus:ring-2 focus:ring-[#121316]/10 focus:border-[#121316]"
                  />

                  <Button type="submit" variant="primary" size="sm">
                    Submit Worker Review
                  </Button>
                </form>
              )}
            </div>
          )}

          {/* In-App Chat Modal / Drawer */}
          {chatOpen && (
            <div className="bg-white rounded-3xl p-5 border border-[rgba(18,19,22,0.12)] shadow-float space-y-3">
              <div className="flex items-center justify-between pb-2.5 border-b border-[rgba(18,19,22,0.08)]">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-[#121316]" />
                  <span className="font-semibold text-xs text-[#121316]">Direct Worker Chat ({job.workerName})</span>
                </div>
                <button 
                  onClick={() => setChatOpen(false)}
                  className="text-xs text-[#66676E] hover:text-[#121316]"
                >
                  Close
                </button>
              </div>

              <div className="h-48 overflow-y-auto space-y-2.5 p-1 text-xs">
                {chatHistory.map((msg, i) => (
                  <div 
                    key={i} 
                    className={`flex flex-col ${msg.sender === 'customer' ? 'items-end' : 'items-start'}`}
                  >
                    <div 
                      className={`max-w-[80%] p-3 rounded-2xl ${
                        msg.sender === 'customer' 
                          ? 'bg-[#121316] text-white rounded-br-none' 
                          : 'bg-[#F2EFE9] text-[#121316] rounded-bl-none border border-[rgba(18,19,22,0.06)]'
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[10px] text-[#66676E] mt-0.5 px-1">{msg.time}</span>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendMessage} className="flex gap-2 pt-2 border-t border-[rgba(18,19,22,0.08)]">
                <input
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Type message to worker..."
                  className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-[rgba(18,19,22,0.12)] bg-white text-[#121316] focus:outline-none focus:ring-2 focus:ring-[#121316]/10 focus:border-[#121316]"
                />
                <Button type="submit" variant="primary" size="sm">
                  <Send className="w-3.5 h-3.5 text-[#121316]" />
                </Button>
              </form>
            </div>
          )}

          {/* Raise Dispute Modal */}
          {disputeOpen && (
            <div className="bg-white rounded-3xl p-6 border border-red-200 shadow-float space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-xs text-red-900 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                  Raise Grievance / Dispute to Cooperative Admin
                </h4>
                <button onClick={() => setDisputeOpen(false)} className="text-xs text-[#66676E]">Cancel</button>
              </div>

              <form onSubmit={handleRaiseDispute} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-[#121316] mb-1">Reason for Dispute</label>
                  <select
                    value={disputeReason}
                    onChange={(e) => setDisputeReason(e.target.value)}
                    className="w-full p-2.5 text-xs rounded-xl border border-[rgba(18,19,22,0.12)] bg-white"
                  >
                    <option>Work not completed</option>
                    <option>Poor craftsmanship quality</option>
                    <option>Worker did not arrive on time</option>
                    <option>Material price discrepancy</option>
                    <option>Safety concern</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#121316] mb-1">Detailed Description</label>
                  <textarea
                    value={disputeNotes}
                    onChange={(e) => setDisputeNotes(e.target.value)}
                    rows={2}
                    placeholder="Provide details for the cooperative arbitration desk..."
                    className="w-full p-2.5 text-xs rounded-xl border border-[rgba(18,19,22,0.12)] bg-white"
                  />
                </div>

                <Button type="submit" variant="destructive" size="md" className="w-full">
                  Submit Dispute to Arbitration Queue
                </Button>
              </form>
            </div>
          )}
        </div>

        {/* Right Column (5 cols): Worker Profile & Price Breakdown */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Worker Profile Card */}
          <div className="bg-white rounded-3xl p-6 border border-[rgba(18,19,22,0.08)] shadow-card space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[rgba(18,19,22,0.08)]">
              <span className="text-xs font-semibold text-[#66676E] uppercase tracking-wider">
                Assigned Cooperative Artisan
              </span>
              <span className="text-[11px] bg-[#EBF5F0] text-[#0D2F28] font-semibold px-2.5 py-0.5 rounded-full border border-[#CCE6DA]">
                ✓ Govt Verified
              </span>
            </div>

            <div className="flex items-center gap-3.5">
              <img 
                src={job.workerAvatar || 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=150&auto=format&fit=crop&q=80'} 
                alt={job.workerName || 'Worker'} 
                className="w-14 h-14 rounded-full object-cover border border-[rgba(18,19,22,0.08)] shadow-subtle"
              />
              <div>
                <h3 className="font-serif text-lg font-normal text-[#121316]">{job.workerName || 'Amit Verma'}</h3>
                <p className="text-xs text-[#66676E]">{job.cooperativeName}</p>
                <div className="flex items-center gap-2 mt-1 text-xs">
                  <span className="flex items-center gap-1 font-semibold text-amber-600">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    {job.workerRating || 4.8}
                  </span>
                  <span className="text-[#66676E]">•</span>
                  <span className="text-[#66676E] font-light">{assignedWorker.completedJobsTotal || 148} Jobs Completed</span>
                </div>
              </div>
            </div>

            {/* Verification Badges */}
            <div className="space-y-1.5 pt-2 text-xs border-t border-[rgba(18,19,22,0.08)] text-[#121316]">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#0D2F28]" />
                <span>Govt ITI Trade Certified</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#0D2F28]" />
                <span>Ayushman Health & Suraksha Active</span>
              </div>
            </div>

            {/* Verifiable Digital Worker ID Pass Action */}
            <Button
              variant="primary"
              size="sm"
              onClick={() => setIdModalOpen(true)}
              leftIcon={<ShieldCheck className="w-4 h-4 text-[#121316]" />}
              className="w-full"
            >
              Verify Digital QR Gate Pass (e-Shram)
            </Button>

            {/* Jump to Worker View shortcut for testing */}
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                setRole('worker');
                router.push('/worker/jobs');
              }}
              className="w-full"
            >
              Switch to Worker View (Simulate Acceptance)
            </Button>
          </div>

          {/* Pricing Ledger Breakdown */}
          <PriceLedgerBreakdown pricing={job.pricing} />

        </div>

      </div>

      {/* Digital Worker ID Modal */}
      <WorkerDigitalIDModal
        worker={assignedWorker}
        isOpen={idModalOpen}
        onClose={() => setIdModalOpen(false)}
      />
    </div>
  );
}
