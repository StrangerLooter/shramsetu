'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/lib/store/app-store';
import { 
  ShieldCheck, 
  Menu, 
  X, 
  Plus,
  Globe
} from 'lucide-react';

export const Header: React.FC = () => {
  const { role, setRole, language, setLanguage, t } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const getPortalTitle = () => {
    switch (role) {
      case 'worker': return language === 'hi' ? 'कामगार पोर्टल' : 'Worker Portal';
      case 'cooperative': return language === 'hi' ? 'सहकारी समिति' : 'Co-op Console';
      case 'community': return language === 'hi' ? 'सामुदायिक RWA' : 'Community RWA';
      case 'admin': return language === 'hi' ? 'मंत्रालय निगरानी' : 'Ministry Oversight';
      default: return language === 'hi' ? 'नागरिक सेवाएं' : 'Citizen Services';
    }
  };

  const navLinkClass = (href: string, exact = false) => {
    const isActive = exact ? pathname === href : pathname?.startsWith(href);
    return `px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 ${
      isActive
        ? 'text-[#121316] font-semibold bg-[#F2EFE9]'
        : 'text-[#66676E] hover:text-[#121316] hover:bg-[#F2EFE9]/60'
    }`;
  };

  return (
    <header className="sticky top-2 z-40 px-3 sm:px-6 lg:px-8 py-1.5 transition-all">
      <div className="max-w-6xl mx-auto floating-nav rounded-2xl px-4 sm:px-5 py-2.5 shadow-subtle">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-xl bg-[#0D2F28] flex items-center justify-center text-white shadow-subtle group-hover:bg-[#133D34] transition-colors">
                <ShieldCheck className="w-4.5 h-4.5 text-[#DDD6FE]" />
              </div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-xl font-semibold tracking-tight text-[#121316]">
                  {language === 'hi' ? 'श्रमसेतु' : 'ShramSetu'}
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider bg-[#EBF5F0] text-[#0D2F28] px-1.5 py-0.5 rounded-md border border-[#CCE6DA]">
                  Co-op
                </span>
              </div>
            </Link>
          </div>

          {/* Center Navigation Links based on role */}
          <nav className="hidden md:flex items-center gap-1">
            {role === 'customer' && (
              <>
                <Link href="/" className={navLinkClass('/', true)}>
                  {t.navServices}
                </Link>
                <Link href="/customer/bookings" className={navLinkClass('/customer/bookings')}>
                  {language === 'hi' ? 'मेरी बुकिंग' : 'My Bookings'}
                </Link>
              </>
            )}

            {role === 'worker' && (
              <>
                <Link href="/worker/dashboard" className={navLinkClass('/worker/dashboard', true)}>
                  {language === 'hi' ? 'डैशबोर्ड' : 'Dashboard'}
                </Link>
                <Link href="/worker/jobs" className={navLinkClass('/worker/jobs')}>
                  {language === 'hi' ? 'कार्य आवंटन' : 'Assigned Jobs'}
                </Link>
                <Link href="/worker/earnings" className={navLinkClass('/worker/earnings')}>
                  {language === 'hi' ? 'सुरक्षित कमाई' : 'Earnings'}
                </Link>
                <Link href="/worker/welfare" className={navLinkClass('/worker/welfare')}>
                  {language === 'hi' ? 'कल्याण' : 'My Welfare'}
                </Link>
              </>
            )}

            {role === 'cooperative' && (
              <>
                <Link href="/cooperative/dashboard" className={navLinkClass('/cooperative/dashboard', true)}>
                  {language === 'hi' ? 'संचालन' : 'Operations'}
                </Link>
                <Link href="/cooperative/allocation" className={navLinkClass('/cooperative/allocation')}>
                  {language === 'hi' ? 'समान आवंटन' : 'Fair Allocation'}
                </Link>
                <Link href="/cooperative/workers" className={navLinkClass('/cooperative/workers')}>
                  {language === 'hi' ? 'श्रमिक रोस्टर' : 'Worker Roster'}
                </Link>
                <Link href="/cooperative/voting" className={navLinkClass('/cooperative/voting')}>
                  {language === 'hi' ? 'मतदान' : 'Voting'}
                </Link>
              </>
            )}

            {role === 'community' && (
              <>
                <Link href="/community/dashboard" className={navLinkClass('/community/dashboard', true)}>
                  {language === 'hi' ? 'सोसायटी रख-रखाव' : 'Society Maintenance'}
                </Link>
              </>
            )}

            {role === 'admin' && (
              <>
                <Link href="/admin/dashboard" className={navLinkClass('/admin/dashboard', true)}>
                  {language === 'hi' ? 'राष्ट्रीय अवलोकन' : 'National Overview'}
                </Link>
                <Link href="/admin/wage-compliance" className={navLinkClass('/admin/wage-compliance')}>
                  {language === 'hi' ? 'मजदूरी अनुपालन' : 'Wage Compliance'}
                </Link>
                <Link href="/admin/disputes" className={navLinkClass('/admin/disputes')}>
                  {language === 'hi' ? 'विवाद समाधान' : 'Dispute Queue'}
                </Link>
              </>
            )}
          </nav>

          {/* Right Action Group: Language Toggle + Lavender CTA */}
          <div className="flex items-center gap-2.5">
            {/* Minimal Language Selector */}
            <div className="hidden sm:flex items-center bg-[#F2EFE9] rounded-lg p-0.5 border border-[rgba(18,19,22,0.08)]">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-0.5 rounded-md text-[10px] font-medium transition-all ${
                  language === 'en' ? 'bg-white text-[#121316] font-semibold shadow-2xs' : 'text-[#66676E] hover:text-[#121316]'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('hi')}
                className={`px-2 py-0.5 rounded-md text-[10px] font-medium transition-all ${
                  language === 'hi' ? 'bg-white text-[#121316] font-semibold shadow-2xs' : 'text-[#66676E] hover:text-[#121316]'
                }`}
              >
                हिन्दी
              </button>
            </div>

            {/* Primary Lavender CTA */}
            {role === 'customer' && (
              <Link 
                href="/customer/request" 
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium bg-[#DDD6FE] text-[#121316] border border-[#121316]/20 hover:bg-[#D4CBFC] shadow-subtle transition-all active:scale-[0.98]"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{language === 'hi' ? 'सेवा अनुरोध' : 'Request Service'}</span>
              </Link>
            )}

            {role === 'community' && (
              <Link 
                href="/community/request" 
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium bg-[#DDD6FE] text-[#121316] border border-[#121316]/20 hover:bg-[#D4CBFC] shadow-subtle transition-all active:scale-[0.98]"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{language === 'hi' ? 'सामूहिक श्रमिक' : 'Bulk Request'}</span>
              </Link>
            )}

            {/* Persona indicator */}
            <div className="hidden lg:flex items-center gap-1 px-2.5 py-1 rounded-xl bg-[#F2EFE9] border border-[rgba(18,19,22,0.08)] text-[11px] text-[#121316] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0D2F28]" />
              <span className="capitalize">{getPortalTitle()}</span>
            </div>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-[#121316] hover:bg-[#F2EFE9] transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5 text-[#121316]" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 max-w-6xl mx-auto rounded-2xl bg-[#FBF9F5] border border-[rgba(18,19,22,0.12)] p-4 space-y-2 shadow-float">
          <div className="p-2.5 bg-[#F2EFE9] rounded-xl text-xs font-medium text-[#66676E] flex items-center justify-between">
            <span>Portal:</span>
            <span className="font-semibold text-[#121316] uppercase">{role}</span>
          </div>

          <div className="flex items-center justify-between py-1">
            <span className="text-xs text-[#66676E]">Language:</span>
            <div className="flex items-center gap-1 bg-[#F2EFE9] rounded-lg p-0.5 border border-[rgba(18,19,22,0.08)]">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-0.5 rounded text-xs ${language === 'en' ? 'bg-white font-bold text-[#121316]' : 'text-[#66676E]'}`}
              >
                English
              </button>
              <button
                onClick={() => setLanguage('hi')}
                className={`px-2 py-0.5 rounded text-xs ${language === 'hi' ? 'bg-white font-bold text-[#121316]' : 'text-[#66676E]'}`}
              >
                हिन्दी
              </button>
            </div>
          </div>

          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl text-sm font-medium text-[#121316] hover:bg-[#F2EFE9]"
          >
            {t.navServices}
          </Link>

          <Link
            href="/customer/request"
            onClick={() => { setRole('customer'); setMobileMenuOpen(false); }}
            className="block px-3 py-2.5 rounded-xl text-sm font-medium bg-[#DDD6FE] text-[#121316] border border-[#121316]/20 text-center"
          >
            + {language === 'hi' ? 'सेवा अनुरोध करें' : 'Request Service'}
          </Link>

          <Link
            href="/worker/dashboard"
            onClick={() => { setRole('worker'); setMobileMenuOpen(false); }}
            className="block px-3 py-2 rounded-xl text-sm font-medium text-[#121316] hover:bg-[#F2EFE9]"
          >
            {language === 'hi' ? 'कामगार डैशबोर्ड' : 'Worker Dashboard'}
          </Link>

          <Link
            href="/cooperative/allocation"
            onClick={() => { setRole('cooperative'); setMobileMenuOpen(false); }}
            className="block px-3 py-2 rounded-xl text-sm font-medium text-[#121316] hover:bg-[#F2EFE9]"
          >
            {language === 'hi' ? 'समान आवंटन इंजन' : 'Fair Allocation Engine'}
          </Link>

          <Link
            href="/admin/dashboard"
            onClick={() => { setRole('admin'); setMobileMenuOpen(false); }}
            className="block px-3 py-2 rounded-xl text-sm font-medium text-[#121316] hover:bg-[#F2EFE9]"
          >
            {language === 'hi' ? 'मंत्रालय निगरानी' : 'Ministry Oversight'}
          </Link>
        </div>
      )}
    </header>
  );
};
