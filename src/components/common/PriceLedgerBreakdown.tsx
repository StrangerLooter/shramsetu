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
    <div className="bg-white border border-border rounded-2xl p-5 shadow-card space-y-3">
      <div className="flex items-center justify-between pb-3 border-b border-border/70">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4.5 h-4.5 text-emerald-600" />
          <h4 className="font-semibold text-content text-sm">
            {language === 'hi' ? 'पारदर्शी पारिश्रमिक एवं मूल्य विभाजन' : 'Payment Breakdown & Wage Protection'}
          </h4>
        </div>
        <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-surface-subtle text-emerald-800 px-2 py-0.5 rounded-full border border-border/70">
          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
          {language === 'hi' ? '100% न्यूनतम मजदूरी सुरक्षित' : 'Wage Floor Protected'}
        </span>
      </div>

      <div className="space-y-2 text-xs">
        {/* Worker Direct Wage */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-surface-subtle border border-border/70">
          <div>
            <div className="font-semibold text-content flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              {language === 'hi' ? 'श्रमिक का संरक्षित पारिश्रमिक' : 'Protected Worker Labour Wage'}
            </div>
            <p className="text-[11px] text-content-muted pl-3.5 mt-0.5">
              {language === 'hi' 
                ? `सांविधिक न्यूनतम मजदूरी (न्यूनतम ₹${pricing.wageFloorConfigured}) सीधे कामगार को` 
                : `Guaranteed minimum wage floor (₹${pricing.wageFloorConfigured} standard)`}
            </p>
          </div>
          <span className="font-bold text-content text-base">₹{pricing.protectedWorkerWage}</span>
        </div>

        {/* Materials */}
        <div className="flex items-center justify-between px-3 py-1.5 text-content-secondary">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-300" />
            <span>{language === 'hi' ? 'सामग्री एवं पुर्जे (अनुमानित)' : 'Materials & Tools (Estimated)'}</span>
          </div>
          <span className="font-semibold text-content">₹{pricing.materialCost}</span>
        </div>

        {/* Cooperative Collective Fund */}
        <div className="flex items-center justify-between px-3 py-1.5 text-content-secondary">
          <div>
            <div className="flex items-center gap-1.5">
              <HeartHandshake className="w-3.5 h-3.5 text-emerald-600" />
              <span>{language === 'hi' ? 'सहकारी कल्याण कोष (10%)' : 'Cooperative Welfare Fund (10%)'}</span>
            </div>
            <p className="text-[10px] text-content-muted pl-5">
              {language === 'hi' ? 'सामूहिक स्वास्थ्य बीमा एवं आकस्मिक निधि' : 'Pooled for member healthcare, accident cover & child education'}
            </p>
          </div>
          <span className="font-semibold text-content">₹{pricing.cooperativeFund}</span>
        </div>

        {/* Platform Ops */}
        <div className="flex items-center justify-between px-3 py-1.5 text-content-secondary">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-300" />
            <span>{language === 'hi' ? 'प्लेटफ़ॉर्म संचालन एवं सर्वर (5%)' : 'Platform Operations & Support (5%)'}</span>
          </div>
          <span className="font-semibold text-content">₹{pricing.platformOperations}</span>
        </div>

        {/* Total */}
        <div className="pt-2.5 mt-2 border-t border-border/80 flex items-center justify-between font-bold text-content text-sm px-1">
          <span>{language === 'hi' ? 'कुल देय राशि (ग्राहक)' : 'Total Customer Payable'}</span>
          <span className="text-lg font-bold text-content">₹{pricing.customerTotal}</span>
        </div>
      </div>

      {!compact && (
        <div className="p-3 rounded-xl bg-surface-subtle border border-border/70 flex items-start gap-2 text-[11px] text-content-muted">
          <Info className="w-4 h-4 text-content-muted shrink-0 mt-0.5" />
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
