'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/store/app-store';
import { 
  ShieldCheck, 
  Wrench, 
  Zap, 
  Sparkles, 
  Hammer, 
  Paintbrush, 
  Cpu, 
  Flower2, 
  Layers, 
  Building2, 
  ArrowRight, 
  CheckCircle2, 
  Scale, 
  Users, 
  HardHat, 
  User, 
  Play, 
  Search,
  Check
} from 'lucide-react';
import { LiveActivityTicker } from '@/components/common/LiveActivityTicker';
import { WageComparisonCalculator } from '@/components/common/WageComparisonCalculator';
import { SearchBar } from '@/components/ui/SearchBar';

export default function HomePage() {
  const { services, language, t, setRole, runSIHDemoFlow } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Wrench': return <Wrench className="w-5 h-5 text-slate-800" />;
      case 'Zap': return <Zap className="w-5 h-5 text-amber-600" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-emerald-700" />;
      case 'Hammer': return <Hammer className="w-5 h-5 text-slate-700" />;
      case 'Paintbrush': return <Paintbrush className="w-5 h-5 text-indigo-700" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-teal-700" />;
      case 'Flower2': return <Flower2 className="w-5 h-5 text-emerald-700" />;
      case 'Layers': return <Layers className="w-5 h-5 text-slate-700" />;
      case 'Building2': return <Building2 className="w-5 h-5 text-slate-800" />;
      default: return <Wrench className="w-5 h-5 text-slate-800" />;
    }
  };

  const categories = [
    { id: 'all', label: language === 'hi' ? 'सभी सेवाएं' : 'All Services' },
    { id: 'plumbing', label: language === 'hi' ? 'नलसाजी (Plumbing)' : 'Plumbing' },
    { id: 'electrical', label: language === 'hi' ? 'बिजली (Electrical)' : 'Electrical' },
    { id: 'cleaning', label: language === 'hi' ? 'सफाई (Cleaning)' : 'Cleaning' },
    { id: 'carpentry', label: language === 'hi' ? 'बढ़ईगीरी (Carpentry)' : 'Carpentry' },
    { id: 'painting', label: language === 'hi' ? 'पेंटिंग (Painting)' : 'Painting' },
    { id: 'appliances', label: language === 'hi' ? 'उपकरण (Appliances)' : 'Appliances' },
  ];

  const filteredServices = services.filter(s => {
    const matchesCat = selectedCategory === 'all' || s.category === selectedCategory;
    const matchesQuery = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.nameHi.includes(searchQuery);
    return matchesCat && matchesQuery;
  });

  return (
    <div className="flex flex-col min-h-screen bg-canvas">
      
      {/* 1. HERO SECTION: "What service do you need?" */}
      <section className="relative pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-border/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-border text-content text-xs font-medium shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Ministry of Cooperation Aligned • 100% Protected Wage Floors</span>
          </div>

          {/* Clean Headline */}
          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-content max-w-3xl mx-auto leading-[1.12]">
            {language === 'hi' 
              ? 'सहकारी कामगारों के साथ विश्वसनीय घरेलू सेवाएं'
              : 'Dignified household services powered by worker cooperatives.'}
          </h1>

          <p className="text-base sm:text-lg text-content-muted max-w-2xl mx-auto leading-relaxed">
            {language === 'hi'
              ? 'मध्यस्थों के बिना, पारदर्शी मूल्य निर्धारण, गारंटीकृत मजदूरी और कुशल सत्यापित कारीगर।'
              : 'Direct connection to verified local artisan cooperatives. Fair wages for workers, transparent pricing for households.'}
          </p>

          {/* Central Search Bar */}
          <div className="max-w-xl mx-auto pt-2">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder={language === 'hi' ? 'आपको किस सेवा की आवश्यकता है? (उदा. प्लंबर, इलेक्ट्रीशियन)...' : 'What service do you need? Search plumbing, AC repair...'}
            />

            {/* Quick Filter Pills */}
            <div className="flex items-center justify-center gap-1.5 flex-wrap mt-3">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1 rounded-full text-xs transition-all duration-150 ${
                    selectedCategory === cat.id
                      ? 'bg-slate-900 text-white font-medium shadow-2xs'
                      : 'bg-white text-content-muted hover:text-content hover:bg-surface-subtle border border-border/60'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <Link
              href="/customer/request"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs sm:text-sm shadow-subtle transition-all active:scale-[0.98]"
            >
              <span>{language === 'hi' ? 'सेवा अनुरोध करें' : 'Request a Service'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              onClick={() => setRole('worker')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-surface-subtle text-content border border-border font-medium text-xs sm:text-sm shadow-2xs transition-all"
            >
              <HardHat className="w-4 h-4 text-amber-600" />
              <span>{language === 'hi' ? 'कामगार के रूप में जुड़ें' : 'Join as Worker'}</span>
            </button>

            <button
              onClick={runSIHDemoFlow}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100/80 text-emerald-800 border border-emerald-200 font-medium text-xs sm:text-sm transition-all"
            >
              <Play className="w-3.5 h-3.5 fill-emerald-700 text-emerald-700" />
              <span>Launch SIH Demo Story</span>
            </button>
          </div>

          {/* Trust points */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-content-muted">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Statutory Protected Wage Floor</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Zero Predatory Commissions</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Ayushman Health Coverage</span>
            </div>
          </div>

        </div>
      </section>

      {/* LIVE COOPERATIVE ACTIVITY TICKER */}
      <LiveActivityTicker />

      {/* 2. REFINED ECOSYSTEM METRICS */}
      <section className="bg-white border-b border-border/80 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-border">
            <div className="pt-3 md:pt-0">
              <div className="text-2xl sm:text-3xl font-bold tracking-tight text-content">12,842+</div>
              <div className="text-xs text-content-muted mt-1">{t.verifiedWorkers}</div>
            </div>
            <div className="pt-3 md:pt-0">
              <div className="text-2xl sm:text-3xl font-bold tracking-tight text-content">186</div>
              <div className="text-xs text-content-muted mt-1">{t.registeredCooperatives}</div>
            </div>
            <div className="pt-3 md:pt-0">
              <div className="text-2xl sm:text-3xl font-bold tracking-tight text-emerald-700">₹42.8 Lakh</div>
              <div className="text-xs text-content-muted mt-1">{t.wagesProtected}</div>
            </div>
            <div className="pt-3 md:pt-0">
              <div className="text-2xl sm:text-3xl font-bold tracking-tight text-content">8,492+</div>
              <div className="text-xs text-content-muted mt-1">{t.completedServices}</div>
            </div>
            <div className="pt-3 md:pt-0 col-span-2 md:col-span-1">
              <div className="text-2xl sm:text-3xl font-bold tracking-tight text-content">88.4%</div>
              <div className="text-xs text-content-muted mt-1">{t.fairnessIndex}</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SERVICE DISCOVERY CATALOG */}
      <section className="py-14 sm:py-18">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
                {language === 'hi' ? 'सत्यापित सेवाएं' : 'Verified Services'}
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-content mt-1">
                {t.whatServiceNeed}
              </h2>
            </div>

            <span className="text-xs text-content-muted">
              Showing {filteredServices.length} cooperative services
            </span>
          </div>

          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-2xl p-5 border border-border hover:border-neutral-300 shadow-card transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-surface-subtle border border-border/60 flex items-center justify-center text-content group-hover:scale-105 transition-transform">
                      {getServiceIcon(service.icon)}
                    </div>
                    <span className="text-[11px] font-semibold text-content-secondary bg-surface-subtle px-2 py-0.5 rounded-md border border-border/60">
                      From ₹{service.basePrice}
                    </span>
                  </div>

                  <h3 className="text-base font-semibold text-content group-hover:text-slate-900 transition-colors">
                    {language === 'hi' ? service.nameHi : service.name}
                  </h3>

                  <p className="text-xs text-content-muted mt-1.5 line-clamp-2 leading-relaxed">
                    {language === 'hi' ? service.descriptionHi : service.description}
                  </p>
                </div>

                {/* Card footer with protected wage & action */}
                <div className="mt-5 pt-3.5 border-t border-border/60 flex items-center justify-between text-xs">
                  <div className="text-content-muted text-[11px]">
                    Protected wage: <span className="font-semibold text-emerald-700">₹{service.minimumWageFloor}</span>
                  </div>

                  <Link
                    href={`/customer/request?serviceId=${service.id}`}
                    className="font-semibold text-content hover:text-slate-900 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>{language === 'hi' ? 'बुक करें' : 'Book'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. WHY SHRAMSETU — INTERACTIVE WAGE COMPARISON */}
      <section className="py-14 sm:py-18 bg-white border-t border-border/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
              {language === 'hi' ? 'पारदर्शिता' : 'The Cooperative Advantage'}
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-content mt-1">
              Why ShramSetu Outperforms Generic Gig Apps
            </h2>
            <p className="text-xs sm:text-sm text-content-muted mt-2">
              Transforming informal labour into dignified, protected, democratic community wealth.
            </p>
          </div>

          {/* Side-by-side comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Private Gig Apps (Negative) */}
            <div className="bg-canvas border border-border rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2 text-content font-semibold text-sm">
                <span className="w-5 h-5 rounded-full bg-neutral-200 text-neutral-700 flex items-center justify-center text-xs">✕</span>
                <span>Conventional Aggregator Apps</span>
              </div>
              <ul className="space-y-2 text-xs text-content-muted">
                <li className="flex items-start gap-2">
                  <span className="text-neutral-400">•</span>
                  <span><strong>25% to 35% commission cut</strong> extracted from worker labour.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-neutral-400">•</span>
                  <span><strong>Monopolized work allocation</strong>: Overworks few, starves many.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-neutral-400">•</span>
                  <span><strong>Zero social security</strong>: No collective health or pension pools.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-neutral-400">•</span>
                  <span><strong>Opaque pricing</strong> with hidden algorithmic surge fees.</span>
                </li>
              </ul>
            </div>

            {/* ShramSetu Cooperative Model (Positive) */}
            <div className="bg-white border border-emerald-300 rounded-2xl p-6 space-y-4 shadow-subtle">
              <div className="flex items-center gap-2 text-emerald-800 font-semibold text-sm">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs">✓</span>
                <span>ShramSetu Cooperative Model</span>
              </div>
              <ul className="space-y-2 text-xs text-content">
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>100% Protected Wage Floor</strong> paid directly to the verified artisan.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Fair Work Allocation Engine</strong>: Equal opportunities balanced daily.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>10% Pooled Welfare Fund</strong>: Cashless health cover & emergency relief.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Democratic Ownership</strong>: Workers govern their own societies.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Interactive Calculator Slider */}
          <div className="mt-10 max-w-4xl mx-auto">
            <WageComparisonCalculator />
          </div>

        </div>
      </section>

      {/* 5. MULTI-ROLE ACCESS SECTION */}
      <section className="py-14 bg-canvas border-t border-border/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-semibold text-content-muted uppercase tracking-wider">
              {language === 'hi' ? 'भूमिकाएं' : 'Ecosystem Roles'}
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-content mt-1">
              Explore ShramSetu Across All Personas
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Customer */}
            <div 
              onClick={() => setRole('customer')}
              className="bg-white p-5 rounded-2xl border border-border hover:border-neutral-300 shadow-subtle cursor-pointer transition-all duration-200 flex flex-col justify-between"
            >
              <div className="space-y-2.5">
                <div className="w-9 h-9 rounded-xl bg-surface-subtle border border-border/60 flex items-center justify-center text-content">
                  <User className="w-4.5 h-4.5" />
                </div>
                <h3 className="font-semibold text-content text-sm">Customer Portal</h3>
                <p className="text-xs text-content-muted leading-relaxed">
                  Book services, AI assistance, live GPS tracking, and transparent escrow settlements.
                </p>
              </div>
              <Link href="/customer/request" className="mt-4 text-xs font-medium text-slate-900 flex items-center gap-1">
                <span>Enter as Customer</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Worker */}
            <div 
              onClick={() => setRole('worker')}
              className="bg-white p-5 rounded-2xl border border-border hover:border-neutral-300 shadow-subtle cursor-pointer transition-all duration-200 flex flex-col justify-between"
            >
              <div className="space-y-2.5">
                <div className="w-9 h-9 rounded-xl bg-surface-subtle border border-border/60 flex items-center justify-center text-content">
                  <HardHat className="w-4.5 h-4.5 text-amber-600" />
                </div>
                <h3 className="font-semibold text-content text-sm">Worker Portal</h3>
                <p className="text-xs text-content-muted leading-relaxed">
                  Mobile UI, 1-tap accept, navigation, photo proof completion, and welfare wallet.
                </p>
              </div>
              <Link href="/worker/dashboard" className="mt-4 text-xs font-medium text-slate-900 flex items-center gap-1">
                <span>Enter as Worker</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Cooperative */}
            <div 
              onClick={() => setRole('cooperative')}
              className="bg-white p-5 rounded-2xl border border-border hover:border-neutral-300 shadow-subtle cursor-pointer transition-all duration-200 flex flex-col justify-between"
            >
              <div className="space-y-2.5">
                <div className="w-9 h-9 rounded-xl bg-surface-subtle border border-border/60 flex items-center justify-center text-content">
                  <Users className="w-4.5 h-4.5 text-emerald-700" />
                </div>
                <h3 className="font-semibold text-content text-sm">Cooperative Console</h3>
                <p className="text-xs text-content-muted leading-relaxed">
                  Fair work allocation engine, member roster, collective funds, and wage floor compliance.
                </p>
              </div>
              <Link href="/cooperative/allocation" className="mt-4 text-xs font-medium text-slate-900 flex items-center gap-1">
                <span>Enter as Co-op Admin</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Government */}
            <div 
              onClick={() => setRole('admin')}
              className="bg-white p-5 rounded-2xl border border-border hover:border-neutral-300 shadow-subtle cursor-pointer transition-all duration-200 flex flex-col justify-between"
            >
              <div className="space-y-2.5">
                <div className="w-9 h-9 rounded-xl bg-surface-subtle border border-border/60 flex items-center justify-center text-content">
                  <ShieldCheck className="w-4.5 h-4.5 text-blue-700" />
                </div>
                <h3 className="font-semibold text-content text-sm">Ministry Admin</h3>
                <p className="text-xs text-content-muted leading-relaxed">
                  Macro ecosystem dashboard, wage compliance audits, dispute arbitration, and welfare schemes.
                </p>
              </div>
              <Link href="/admin/dashboard" className="mt-4 text-xs font-medium text-slate-900 flex items-center gap-1">
                <span>Enter as Admin</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
