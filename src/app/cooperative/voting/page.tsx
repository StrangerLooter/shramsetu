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
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider">
            <Vote className="w-4 h-4 text-emerald-600" />
            <span>Democratic Governance & Member Self-Rule</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-content mt-1">
            {language === 'hi' ? 'सहकारी जनमत एवं मतदान मंच' : 'Cooperative Democratic Voting & Resolutions'}
          </h1>
          <p className="text-xs sm:text-sm text-content-muted mt-1">
            One Member, One Vote: Every artisan directly shapes minimum wage rules, safety expenditures, and tool capital assets.
          </p>
        </div>

        <div className="bg-surface-subtle px-3.5 py-2 rounded-xl border border-border text-xs font-medium text-content flex items-center gap-1.5 self-start">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
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
              className="bg-white rounded-2xl p-6 border border-border shadow-card space-y-4 hover:border-neutral-300 transition-all duration-150"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 pb-3 border-b border-border/70">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-semibold uppercase tracking-wider bg-surface-subtle text-content px-2 py-0.5 rounded border border-border/60">
                      {res.category}
                    </span>
                    <span className="text-xs font-mono text-content-muted">{res.id}</span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${res.status === 'PASSED' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-surface-subtle text-content border border-border'}`}>
                      {res.status}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-content mt-1.5">{res.title}</h3>
                </div>

                <div className="sm:text-right shrink-0">
                  <span className="text-[11px] text-content-muted block">{res.deadline}</span>
                  <span className="text-xs font-medium text-content">
                    {totalVotes} of {res.totalEligibleMembers} Voted
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-content-muted leading-relaxed">{res.description}</p>
              
              <div className="text-[11px] text-content-muted">
                Proposed by: <strong className="text-content font-medium">{res.proposedBy}</strong>
              </div>

              {/* Vote Progression Bar */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-emerald-800">{forPercentage}% For ({res.votesFor} votes)</span>
                  <span className="text-content-muted">{res.votesAgainst} Against</span>
                </div>
                <div className="w-full bg-neutral-200 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-emerald-700 h-full rounded-full transition-all duration-500"
                    style={{ width: `${forPercentage}%` }}
                  />
                </div>
              </div>

              {/* Vote Actions */}
              {res.status === 'ACTIVE' && (
                <div className="pt-2 flex items-center justify-between border-t border-border/70">
                  {hasVoted ? (
                    <span className="text-xs font-semibold text-emerald-800 bg-surface-subtle px-3 py-1.5 rounded-lg border border-border">
                      ✓ You voted {hasVoted} this resolution
                    </span>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Button
                        variant="coop"
                        size="sm"
                        onClick={() => handleVote(res.id, 'FOR')}
                      >
                        Vote In Favor (हाँ)
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleVote(res.id, 'AGAINST')}
                      >
                        Vote Against (ना)
                      </Button>
                    </div>
                  )}

                  <span className="text-[11px] text-content-muted">Anonymous encrypted member ballot</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
