'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store/app-store';
import { 
  Vote, 
  ShieldCheck 
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface Resolution {
  id: string;
  title: string;
  category: string;
  description: string;
  proposedBy: string;
  deadline: string;
  votesFor: number;
  votesAgainst: number;
  totalEligibleMembers: number;
  status: 'ACTIVE' | 'PASSED' | 'REJECTED';
}

export default function CooperativeVotingPage() {
  const { language } = useApp();

  const [resolutions, setResolutions] = useState<Resolution[]>([
    {
      id: 'RES-2026-04',
      title: 'Allocate ₹50,000 from Welfare Fund for Monsoon Rain Gear & Tool Safety Kits',
      category: 'Welfare & Safety',
      description: 'Provide all 63 active field workers with heavy-duty waterproof boots, raincoat sets, and insulated electrical gloves for upcoming monsoon.',
      proposedBy: 'Worker Member Council (Amit Verma & 12 co-signers)',
      deadline: '15 Sep 2026',
      votesFor: 48,
      votesAgainst: 3,
      totalEligibleMembers: 63,
      status: 'ACTIVE'
    },
    {
      id: 'RES-2026-03',
      title: 'Revise Plumbing Minimum Wage Floor from ₹300 to ₹350 in South Delhi Hub',
      category: 'Statutory Wage Floor',
      description: 'Adjust baseline labor rate upward to account for localized fuel and inflation index, ensuring wage floors keep pace with market costs.',
      proposedBy: 'Trade Representative Committee',
      deadline: '20 Sep 2026',
      votesFor: 56,
      votesAgainst: 4,
      totalEligibleMembers: 63,
      status: 'ACTIVE'
    },
    {
      id: 'RES-2026-02',
      title: 'Bulk Purchase of 2 Shared Industrial Hydro-Jetters for Society AMCs',
      category: 'Cooperative Capital Assets',
      description: 'Invest ₹80,000 from equipment reserve to procure shared drain augers available for checkout at Saket cooperative depot.',
      proposedBy: 'Managing Committee Secretary',
      deadline: 'Passed on 01 Sep 2026',
      votesFor: 59,
      votesAgainst: 2,
      totalEligibleMembers: 63,
      status: 'PASSED'
    }
  ]);

  const [userVoted, setUserVoted] = useState<{ [resId: string]: 'FOR' | 'AGAINST' }>({});

  const handleVote = (resId: string, choice: 'FOR' | 'AGAINST') => {
    setResolutions(prev => prev.map(res => {
      if (res.id === resId) {
        return {
          ...res,
          votesFor: choice === 'FOR' ? res.votesFor + 1 : res.votesFor,
          votesAgainst: choice === 'AGAINST' ? res.votesAgainst + 1 : res.votesAgainst
        };
      }
      return res;
    }));
    setUserVoted(prev => ({ ...prev, [resId]: choice }));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 sm:py-16 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#0D2F28] uppercase tracking-wider">
            <Vote className="w-4 h-4 text-[#0D2F28]" />
            <span>Democratic Governance & Member Self-Rule</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-[#121316] mt-1">
            {language === 'hi' ? (
              <>सहकारी जनमत <span className="font-serif italic font-normal">एवं मतदान मंच</span></>
            ) : (
              <>Cooperative Democratic <span className="font-serif italic font-normal">Voting & Resolutions</span></>
            )}
          </h1>
          <p className="text-xs sm:text-sm text-[#66676E] mt-1 font-light">
            One Member, One Vote: Every artisan directly shapes minimum wage rules, safety expenditures, and tool capital assets.
          </p>
        </div>

        <div className="bg-[#EBF5F0] px-4 py-2 rounded-full border border-[#CCE6DA] text-xs font-medium text-[#0D2F28] flex items-center gap-1.5 self-start">
          <ShieldCheck className="w-4 h-4 text-[#0D2F28]" />
          <span>Quorum: 84% Member Turnout</span>
        </div>
      </div>

      {/* Resolutions List */}
      <div className="space-y-4">
        {resolutions.map((res) => {
          const totalVotes = res.votesFor + res.votesAgainst;
          const forPercentage = Math.round((res.votesFor / res.totalEligibleMembers) * 100);
          const hasVoted = userVoted[res.id];

          return (
            <div 
              key={res.id} 
              className="bg-white rounded-3xl p-6 sm:p-8 border border-[rgba(18,19,22,0.08)] shadow-subtle hover:shadow-card hover:border-[rgba(18,19,22,0.18)] transition-all duration-150 space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-3 border-b border-[rgba(18,19,22,0.08)]">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-semibold uppercase tracking-wider bg-[#F2EFE9] text-[#121316] px-2.5 py-0.5 rounded-full border border-[rgba(18,19,22,0.06)]">
                      {res.category}
                    </span>
                    <span className="text-xs font-mono text-[#66676E]">{res.id}</span>
                    <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full ${res.status === 'PASSED' ? 'bg-[#EBF5F0] text-[#0D2F28] border border-[#CCE6DA]' : 'bg-[#F2EFE9] text-[#121316] border border-[rgba(18,19,22,0.08)]'}`}>
                      {res.status}
                    </span>
                  </div>
                  <h3 className="font-serif text-lg font-normal text-[#121316] mt-2">{res.title}</h3>
                </div>

                <div className="sm:text-right shrink-0">
                  <span className="text-[11px] text-[#66676E] block font-light">{res.deadline}</span>
                  <span className="text-xs font-medium text-[#121316]">
                    {totalVotes} of {res.totalEligibleMembers} Voted
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#66676E] leading-relaxed font-light">{res.description}</p>
              
              <div className="text-[11px] text-[#66676E]">
                Proposed by: <strong className="text-[#121316] font-medium">{res.proposedBy}</strong>
              </div>

              {/* Vote Progression Bar */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#0D2F28]">{forPercentage}% For ({res.votesFor} votes)</span>
                  <span className="text-[#66676E]">{res.votesAgainst} Against</span>
                </div>
                <div className="w-full bg-[#E2DDD3] h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-[#0D2F28] h-full rounded-full transition-all duration-500" 
                    style={{ width: `${forPercentage}%` }}
                  />
                </div>
              </div>

              {/* Vote Actions */}
              {res.status === 'ACTIVE' && (
                <div className="pt-3 flex items-center justify-between border-t border-[rgba(18,19,22,0.08)]">
                  {hasVoted ? (
                    <span className="text-xs font-semibold text-[#0D2F28] bg-[#EBF5F0] px-3.5 py-1.5 rounded-xl border border-[#CCE6DA]">
                      ✓ You voted {hasVoted} this resolution
                    </span>
                  ) : (
                    <div className="flex items-center gap-2.5">
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleVote(res.id, 'FOR')}
                      >
                        Vote In Favor (हाँ)
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleVote(res.id, 'AGAINST')}
                      >
                        Vote Against (ना)
                      </Button>
                    </div>
                  )}

                  <span className="text-[11px] text-[#66676E] font-light">Anonymous encrypted member ballot</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
