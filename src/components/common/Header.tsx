'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/lib/store/app-store';
import { 
  ShieldCheck, 
  Menu, 
  X, 
  Plus
} from 'lucide-react';

export const Header: React.FC = () => {
  const { role, setRole, language, t } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const getPortalTitle = () => {
    switch (role) {
      case 'worker': return language === 'hi' ? 'कामगार पोर्टल' : 'Worker Portal';
      case 'cooperative': return language === 'hi' ? 'सहकारी समिति कंसोल' : 'Cooperative Console';
      case 'community': return language === 'hi' ? 'सामुदायिक RWA पोर्टल' : 'Community RWA';
      case 'admin': return language === 'hi' ? 'मंत्रालय निगरानी' : 'Ministry Oversight';
      default: return language === 'hi' ? 'नागरिक सेवा केंद्र' : 'Citizen Services';
    }
  };

  const navLinkClass = (href: string, exact = false) => {
    const isActive = exact ? pathname === href : pathname?.startsWith(href);
    return `px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-150 ${
      isActive
        ? 'text-content font-semibold bg-surface-subtle'
        : 'text-content-muted hover:text-content hover:bg-surface-subtle/70'
    }`;
  };

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-border/80 sticky top-[33px] z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-15">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white shadow-2xs group-hover:bg-slate-800 transition-colors">
                <ShieldCheck className="w-4.5 h-4.5 text-emerald-400" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-display text-lg font-bold tracking-tight text-content">
                    {language === 'hi' ? 'श्रमसेतु' : 'ShramSetu'}
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-wider bg-emerald-50 text-emerald-800 px-1.5 py-0.2 rounded border border-emerald-200/60">
                    Co-op
                  </span>
                </div>
                <p className="text-[10px] font-medium text-content-muted hidden sm:block">
                  {getPortalTitle()}
                </p>
              </div>
            </Link>
          </div>

          {/* Navigation Links based on role */}
          <nav className="hidden md:flex items-center gap-1">
            {role === 'customer' && (
              <>
                <Link href="/" className={navLinkClass('/', true)}>
                  {t.navServices}
                </Link>
                <Link href="/customer/bookings" className={navLinkClass('/customer/bookings')}>
                  {language === 'hi' ? 'मेरी बुकिंग' : 'My Bookings'}
                </Link>
                <Link 
                  href="/customer/request" 
                  className="ml-2 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 shadow-2xs transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{language === 'hi' ? 'सेवा अनुरोध करें' : 'Request Service'}</span>
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
                <Link href="/cooperative/reports" className={navLinkClass('/cooperative/reports')}>
                  {language === 'hi' ? 'ऑडिट लॉग' : 'Audit Logs'}
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
                <Link 
                  href="/community/request" 
                  className="ml-2 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 shadow-2xs transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{language === 'hi' ? 'सामूहिक श्रमिक अनुरोध' : 'Bulk Worker Request'}</span>
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
                <Link href="/admin/audit-logs" className={navLinkClass('/admin/audit-logs')}>
                  {language === 'hi' ? 'प्रणाली ऑडिट' : 'Audit Trail'}
                </Link>
              </>
            )}
          </nav>

          {/* User profile avatar / role status */}
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <span className="text-xs font-semibold text-content block capitalize">{role}</span>
              <span className="text-[10px] text-emerald-700 font-medium">Statutory Protected</span>
            </div>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-content-muted hover:text-content hover:bg-surface-subtle"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-white px-4 pt-2 pb-4 space-y-1 shadow-float">
          <div className="p-2 bg-surface-subtle rounded-lg text-xs font-medium text-content-muted mb-2 flex items-center justify-between">
            <span>Portal:</span>
            <span className="font-semibold text-content uppercase">{role}</span>
          </div>

          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-medium text-content hover:bg-surface-subtle"
          >
            {t.navServices}
          </Link>

          <Link
            href="/customer/request"
            onClick={() => { setRole('customer'); setMobileMenuOpen(false); }}
            className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-900 bg-slate-100"
          >
            + {language === 'hi' ? 'सेवा अनुरोध करें' : 'Request Service'}
          </Link>

          <Link
            href="/worker/dashboard"
            onClick={() => { setRole('worker'); setMobileMenuOpen(false); }}
            className="block px-3 py-2 rounded-lg text-sm font-medium text-content hover:bg-surface-subtle"
          >
            {language === 'hi' ? 'कामगार डैशबोर्ड' : 'Worker Dashboard'}
          </Link>

          <Link
            href="/cooperative/allocation"
            onClick={() => { setRole('cooperative'); setMobileMenuOpen(false); }}
            className="block px-3 py-2 rounded-lg text-sm font-medium text-content hover:bg-surface-subtle"
          >
            {language === 'hi' ? 'समान आवंटन इंजन' : 'Fair Allocation Engine'}
          </Link>

          <Link
            href="/admin/dashboard"
            onClick={() => { setRole('admin'); setMobileMenuOpen(false); }}
            className="block px-3 py-2 rounded-lg text-sm font-medium text-content hover:bg-surface-subtle"
          >
            {language === 'hi' ? 'मंत्रालय निगरानी' : 'Ministry Oversight'}
          </Link>
        </div>
      )}
    </header>
  );
};
