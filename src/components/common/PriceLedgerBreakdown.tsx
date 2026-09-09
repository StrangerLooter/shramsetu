'use client';

import React from 'react';
import { WageBreakdown } from '@/types';
import { ShieldCheck, Info, CheckCircle2, HeartHandshake } from 'lucide-react';
import { useApp } from '@/lib/store/app-store';

interface Props {
  pricing: WageBreakdown;
  compact?: boolean;
}

export const PriceLedgerBreakdown: React.FC<Props> = ({ pricing, compact = false }) => {
  const { language } = useApp();

  return (
    <div className="bg-white border border-[rgba(18,19,22,0.08)] rounded-3xl p-6 shadow-card space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-[rgba(18,19,22,0.08)]">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4.5 h-4.5 text-[#0D2F28]" />
          <h4 className="font-serif text-base font-normal text-[#121316]">
            {language === 'hi' ? 'पारदर्शी पारिश्रमिक एवं मूल्य विभाजन' : 'Payment Breakdown & Wage Protection'}
          </h4>
        </div>
        <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-[#EBF5F0] text-[#0D2F28] px-2.5 py-0.5 rounded-full border border-[#CCE6DA]">
          <CheckCircle2 className="w-3 h-3 text-[#0D2F28]" />
          {language === 'hi' ? '100% न्यूनतम मजदूरी सुरक्षित' : 'Wage Floor Protected'}
        </span>
      </div>

      <div className="space-y-2.5 text-xs">
        {/* Worker Direct Wage */}
        <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#F2EFE9] border border-[rgba(18,19,22,0.06)]">
          <div>
            <div className="font-semibold text-[#121316] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#0D2F28]" />
              {language === 'hi' ? 'श्रमिक का संरक्षित पारिश्रमिक' : 'Protected Worker Labour Wage'}
            </div>
            <p className="text-[11px] text-[#66676E] pl-3.5 mt-0.5 font-light">
              {language === 'hi' 
                ? `सांविधिक न्यूनतम मजदूरी (न्यूनतम ₹${pricing.wageFloorConfigured}) सीधे कामगार को` 
                : `Guaranteed minimum wage floor (₹${pricing.wageFloorConfigured} standard)`}
            </p>
          </div>
          <span className="font-serif font-bold text-[#0D2F28] text-lg">₹{pricing.protectedWorkerWage}</span>
        </div>

        {/* Materials */}
        <div className="flex items-center justify-between px-3 py-1.5 text-[#66676E]">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#66676E]/40" />
            <span>{language === 'hi' ? 'सामग्री एवं पुर्जे (अनुमानित)' : 'Materials & Tools (Estimated)'}</span>
          </div>
          <span className="font-semibold text-[#121316]">₹{pricing.materialCost}</span>
        </div>

        {/* Cooperative Collective Fund */}
        <div className="flex items-center justify-between px-3 py-1.5 text-[#66676E]">
          <div>
            <div className="flex items-center gap-1.5">
              <HeartHandshake className="w-3.5 h-3.5 text-[#0D2F28]" />
              <span>{language === 'hi' ? 'सहकारी कल्याण कोष (10%)' : 'Cooperative Welfare Fund (10%)'}</span>
            </div>
            <p className="text-[10px] text-[#66676E] pl-5 font-light">
              {language === 'hi' ? 'सामूहिक स्वास्थ्य बीमा एवं आकस्मिक निधि' : 'Pooled for member healthcare, accident cover & child education'}
            </p>
          </div>
          <span className="font-semibold text-[#121316]">₹{pricing.cooperativeFund}</span>
        </div>

        {/* Platform Ops */}
        <div className="flex items-center justify-between px-3 py-1.5 text-[#66676E]">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#66676E]/40" />
            <span>{language === 'hi' ? 'प्लेटफ़ॉर्म संचालन एवं सर्वर (5%)' : 'Platform Operations & Support (5%)'}</span>
          </div>
          <span className="font-semibold text-[#121316]">₹{pricing.platformOperations}</span>
        </div>

        {/* Total */}
        <div className="pt-3 mt-2 border-t border-[rgba(18,19,22,0.08)] flex items-center justify-between font-medium text-[#121316] text-sm px-1">
          <span>{language === 'hi' ? 'कुल देय राशि (ग्राहक)' : 'Total Customer Payable'}</span>
          <span className="font-serif text-xl font-bold text-[#121316]">₹{pricing.customerTotal}</span>
        </div>
      </div>

      {!compact && (
        <div className="p-3.5 rounded-2xl bg-[#F2EFE9] border border-[rgba(18,19,22,0.06)] flex items-start gap-2.5 text-[11px] text-[#66676E] font-light">
          <Info className="w-4 h-4 text-[#66676E] shrink-0 mt-0.5" />
          <p>
            {language === 'hi'
              ? 'श्रमसेतु मॉडल में किसी भी कॉर्पोरेट बिचौलिए द्वारा श्रमिक के श्रम अंश से 20-30% की अनुचित कटौती नहीं की जाती।'
              : 'ShramSetu ensures 0% predatory middleman cuts. The statutory labor floor goes 100% directly to the verified cooperative artisan.'}
          </p>
        </div>
      )}
    </div>
  );
};
