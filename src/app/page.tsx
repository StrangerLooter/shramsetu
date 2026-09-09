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
      case 'Wrench': return <Wrench className="w-5 h-5 text-[#121316]" />;
      case 'Zap': return <Zap className="w-5 h-5 text-[#B45309]" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-[#0D2F28]" />;
      case 'Hammer': return <Hammer className="w-5 h-5 text-[#121316]" />;
      case 'Paintbrush': return <Paintbrush className="w-5 h-5 text-[#3D2975]" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-[#0D2F28]" />;
      case 'Flower2': return <Flower2 className="w-5 h-5 text-[#0D2F28]" />;
      case 'Layers': return <Layers className="w-5 h-5 text-[#121316]" />;
      case 'Building2': return <Building2 className="w-5 h-5 text-[#121316]" />;
      default: return <Wrench className="w-5 h-5 text-[#121316]" />;
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
    <div className="flex flex-col min-h-screen bg-[#FBF9F5] text-[#121316]">
      
      {/* 1. HERO SECTION: Editorial Wispr Flow Visual Language */}
      <section className="relative pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          
          {/* Subtle Trust Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F2EFE9] border border-[rgba(18,19,22,0.08)] text-[#121316] text-xs font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-[#0D2F28]" />
            <span>Ministry of Cooperation Aligned • 100% Protected Wage Floors</span>
          </div>

          {/* Large Editorial Headline with Refined Serif and Italic Emphasis */}
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-[#121316] max-w-4xl mx-auto leading-[1.12]">
            {language === 'hi' ? (
              <>
                सहकारी कामगारों के साथ{' '}
                <span className="font-serif italic font-normal">विश्वसनीय घरेलू सेवाएं।</span>
              </>
            ) : (
              <>
                Dignified household services,{' '}
                <span className="font-serif italic font-normal">powered by worker cooperatives.</span>
              </>
            )}
          </h1>

          <p className="text-base sm:text-lg text-[#66676E] max-w-2xl mx-auto leading-relaxed font-light">
            {language === 'hi'
              ? 'मध्यस्थों के बिना, पारदर्शी मूल्य निर्धारण, गारंटीकृत मजदूरी और कुशल सत्यापित कारीगर।'
              : 'Direct connection to verified local artisan cooperatives. Fair wages for workers, transparent pricing for households.'}
          </p>

          {/* Central Editorial Search Bar */}
          <div className="max-w-xl mx-auto pt-2 space-y-3">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder={language === 'hi' ? 'आपको किस सेवा की आवश्यकता है? (उदा. प्लंबर, इलेक्ट्रीशियन)...' : 'What service do you need? Search plumbing, AC repair...'}
            />

            {/* Quick Filter Pills */}
            <div className="flex items-center justify-center gap-1.5 flex-wrap pt-1">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1 rounded-full text-xs transition-all duration-150 ${
                    selectedCategory === cat.id
                      ? 'bg-[#121316] text-white font-medium shadow-subtle'
                      : 'bg-[#F2EFE9] text-[#66676E] hover:text-[#121316] hover:bg-[#EAE6DE] border border-[rgba(18,19,22,0.06)]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Action Row: Primary Soft Lavender CTA + Secondary CTA */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
            <Link
              href="/customer/request"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#DDD6FE] text-[#121316] border border-[#121316]/20 font-medium text-xs sm:text-sm hover:bg-[#D4CBFC] shadow-subtle transition-all active:scale-[0.98]"
            >
              <span>{language === 'hi' ? 'सेवा अनुरोध करें' : 'Request a Service'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              onClick={() => setRole('worker')}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-transparent hover:bg-[#F2EFE9] text-[#121316] border border-[#121316]/20 font-medium text-xs sm:text-sm transition-all active:scale-[0.98]"
            >
              <HardHat className="w-4 h-4 text-[#B45309]" />
              <span>{language === 'hi' ? 'कामगार के रूप में जुड़ें' : 'Join as Worker'}</span>
            </button>

            <button
              onClick={runSIHDemoFlow}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#EBF5F0] hover:bg-[#DFEFE7] text-[#0D2F28] border border-[#CCE6DA] font-medium text-xs sm:text-sm transition-all active:scale-[0.98]"
            >
              <Play className="w-3.5 h-3.5 fill-[#0D2F28] text-[#0D2F28]" />
              <span>Launch SIH Demo Story</span>
            </button>
          </div>

          {/* Trust Points */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-[#66676E]">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#0D2F28]" />
              <span>Statutory Protected Wage Floor</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#0D2F28]" />
              <span>Zero Predatory Commissions</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#0D2F28]" />
              <span>Ayushman Health Coverage</span>
            </div>
          </div>

        </div>
      </section>

      {/* LIVE COOPERATIVE ACTIVITY TICKER */}
      <LiveActivityTicker />

      {/* 2. REFINED ECOSYSTEM METRICS ON MUTED BEIGE CONTAINER */}
      <section className="bg-[#F2EFE9] border-y border-[rgba(18,19,22,0.08)] py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-[rgba(18,19,22,0.08)]">
            <div className="pt-4 md:pt-0">
              <div className="font-serif text-3xl sm:text-4xl font-normal text-[#121316]">12,842+</div>
              <div className="text-xs text-[#66676E] mt-1 font-sans">{t.verifiedWorkers}</div>
            </div>
            <div className="pt-4 md:pt-0">
              <div className="font-serif text-3xl sm:text-4xl font-normal text-[#121316]">186</div>
              <div className="text-xs text-[#66676E] mt-1 font-sans">{t.registeredCooperatives}</div>
            </div>
            <div className="pt-4 md:pt-0">
              <div className="font-serif text-3xl sm:text-4xl font-normal text-[#0D2F28]">₹42.8 Lakh</div>
              <div className="text-xs text-[#66676E] mt-1 font-sans">{t.wagesProtected}</div>
            </div>
            <div className="pt-4 md:pt-0">
              <div className="font-serif text-3xl sm:text-4xl font-normal text-[#121316]">8,492+</div>
              <div className="text-xs text-[#66676E] mt-1 font-sans">{t.completedServices}</div>
            </div>
            <div className="pt-4 md:pt-0 col-span-2 md:col-span-1">
              <div className="font-serif text-3xl sm:text-4xl font-normal text-[#121316]">88.4%</div>
              <div className="text-xs text-[#66676E] mt-1 font-sans">{t.fairnessIndex}</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SERVICE DISCOVERY CATALOG */}
      <section className="py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#0D2F28]">
                {language === 'hi' ? 'सत्यापित सेवाएं' : 'Verified Services'}
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#121316] mt-1">
                {t.whatServiceNeed}
              </h2>
            </div>

            <span className="text-xs text-[#66676E]">
              Showing {filteredServices.length} cooperative services
            </span>
          </div>

          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-2xl p-6 border border-[rgba(18,19,22,0.08)] hover:border-[rgba(18,19,22,0.18)] shadow-subtle hover:shadow-card transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="w-11 h-11 rounded-xl bg-[#F2EFE9] border border-[rgba(18,19,22,0.06)] flex items-center justify-center group-hover:scale-105 transition-transform">
                      {getServiceIcon(service.icon)}
                    </div>
                    <span className="text-xs font-medium text-[#121316] bg-[#F2EFE9] px-2.5 py-0.5 rounded-full border border-[rgba(18,19,22,0.06)]">
                      From ₹{service.basePrice}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-normal text-[#121316] group-hover:text-[#0D2F28] transition-colors">
                    {language === 'hi' ? service.nameHi : service.name}
                  </h3>

                  <p className="text-xs text-[#66676E] mt-2 line-clamp-2 leading-relaxed font-light">
                    {language === 'hi' ? service.descriptionHi : service.description}
                  </p>
                </div>

                {/* Card Footer with Protected Wage & Lavender Action */}
                <div className="mt-6 pt-4 border-t border-[rgba(18,19,22,0.08)] flex items-center justify-between text-xs">
                  <div className="text-[#66676E] text-[11px]">
                    Protected wage: <span className="font-semibold text-[#0D2F28]">₹{service.minimumWageFloor}</span>
                  </div>

                  <Link
                    href={`/customer/request?serviceId=${service.id}`}
                    className="font-medium text-[#121316] bg-[#DDD6FE] hover:bg-[#D4CBFC] px-3 py-1.5 rounded-lg border border-[#121316]/20 flex items-center gap-1 shadow-2xs transition-all active:scale-95"
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

      {/* 4. HIGH-IMPACT DEEP TEAL SHOWCASE CONTAINER: Why Cooperation Outperforms */}
      <section className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto rounded-[2.5rem] bg-[#0D2F28] text-white p-8 sm:p-14 border border-white/10 shadow-teal">
          
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#DDD6FE]">
              {language === 'hi' ? 'पारदर्शिता' : 'The Cooperative Advantage'}
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-white">
              Why cooperation outperforms{' '}
              <span className="font-serif italic font-normal text-[#DDD6FE]">commercial extraction.</span>
            </h2>
            <p className="text-xs sm:text-sm text-white/70 font-light max-w-xl mx-auto">
              Transforming informal labour into dignified, protected, democratic community wealth.
            </p>
          </div>

          {/* Interactive Calculator Slider Inside Teal Section */}
          <div className="max-w-4xl mx-auto">
            <WageComparisonCalculator />
          </div>

        </div>
      </section>

      {/* 5. MULTI-ROLE PERSONA DISCOVERY */}
      <section className="py-20 bg-[#FBF9F5]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold text-[#66676E] uppercase tracking-wider">
              {language === 'hi' ? 'भूमिकाएं' : 'Ecosystem Personas'}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#121316] mt-1">
              Explore ShramSetu across all roles
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Customer */}
            <div 
              onClick={() => setRole('customer')}
              className="bg-[#F2EFE9] p-6 rounded-2xl border border-[rgba(18,19,22,0.08)] hover:border-[rgba(18,19,22,0.18)] cursor-pointer transition-all duration-200 flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-white border border-[rgba(18,19,22,0.08)] flex items-center justify-center text-[#121316]">
                  <User className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg font-normal text-[#121316]">Citizen Services</h3>
                <p className="text-xs text-[#66676E] leading-relaxed font-light">
                  Book services, AI assistance, live GPS tracking, and transparent escrow settlements.
                </p>
              </div>
              <Link href="/customer/request" className="mt-5 text-xs font-medium text-[#121316] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>Enter as Citizen</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Worker */}
            <div 
              onClick={() => setRole('worker')}
              className="bg-[#F2EFE9] p-6 rounded-2xl border border-[rgba(18,19,22,0.08)] hover:border-[rgba(18,19,22,0.18)] cursor-pointer transition-all duration-200 flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-white border border-[rgba(18,19,22,0.08)] flex items-center justify-center text-[#B45309]">
                  <HardHat className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg font-normal text-[#121316]">Worker Portal</h3>
                <p className="text-xs text-[#66676E] leading-relaxed font-light">
                  Dignified mobile UI, 1-tap accept, navigation, photo proof completion, and welfare wallet.
                </p>
              </div>
              <Link href="/worker/dashboard" className="mt-5 text-xs font-medium text-[#121316] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>Enter as Worker</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Cooperative */}
            <div 
              onClick={() => setRole('cooperative')}
              className="bg-[#F2EFE9] p-6 rounded-2xl border border-[rgba(18,19,22,0.08)] hover:border-[rgba(18,19,22,0.18)] cursor-pointer transition-all duration-200 flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-white border border-[rgba(18,19,22,0.08)] flex items-center justify-center text-[#0D2F28]">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg font-normal text-[#121316]">Cooperative Console</h3>
                <p className="text-xs text-[#66676E] leading-relaxed font-light">
                  Fair work allocation engine, member roster, collective funds, and wage floor compliance.
                </p>
              </div>
              <Link href="/cooperative/allocation" className="mt-5 text-xs font-medium text-[#121316] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>Enter as Co-op Admin</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Government */}
            <div 
              onClick={() => setRole('admin')}
              className="bg-[#F2EFE9] p-6 rounded-2xl border border-[rgba(18,19,22,0.08)] hover:border-[rgba(18,19,22,0.18)] cursor-pointer transition-all duration-200 flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-white border border-[rgba(18,19,22,0.08)] flex items-center justify-center text-[#1E3A8A]">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-lg font-normal text-[#121316]">Ministry Oversight</h3>
                <p className="text-xs text-[#66676E] leading-relaxed font-light">
                  Macro ecosystem dashboard, wage compliance audits, dispute arbitration, and welfare schemes.
                </p>
              </div>
              <Link href="/admin/dashboard" className="mt-5 text-xs font-medium text-[#121316] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
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
