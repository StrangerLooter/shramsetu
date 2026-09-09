'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/lib/store/app-store';
import { 
  Home, 
  Calendar, 
  Wallet, 
  HardHat, 
  Users, 
  Scale, 
  Vote, 
  Building2, 
  ShieldCheck, 
  Plus, 
  FileText, 
  HeartHandshake,
  User
} from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const { role, language } = useApp();
  const pathname = usePathname();

  const getNavItems = () => {
    switch (role) {
      case 'worker':
        return [
          { href: '/worker/dashboard', label: language === 'hi' ? 'होम' : 'Home', icon: <Home className="w-5 h-5" /> },
          { href: '/worker/jobs', label: language === 'hi' ? 'कार्य' : 'Jobs', icon: <HardHat className="w-5 h-5" /> },
          { href: '/worker/earnings', label: language === 'hi' ? 'कमाई' : 'Earnings', icon: <Wallet className="w-5 h-5" /> },
          { href: '/worker/welfare', label: language === 'hi' ? 'कल्याण' : 'Welfare', icon: <HeartHandshake className="w-5 h-5" /> },
        ];
      case 'cooperative':
        return [
          { href: '/cooperative/dashboard', label: language === 'hi' ? 'डैशबोर्ड' : 'Dashboard', icon: <Home className="w-5 h-5" /> },
          { href: '/cooperative/allocation', label: language === 'hi' ? 'आवंटन' : 'Allocation', icon: <Scale className="w-5 h-5" /> },
          { href: '/cooperative/workers', label: language === 'hi' ? 'श्रमिक' : 'Workers', icon: <Users className="w-5 h-5" /> },
          { href: '/cooperative/voting', label: language === 'hi' ? 'मतदान' : 'Voting', icon: <Vote className="w-5 h-5" /> },
        ];
      case 'community':
        return [
          { href: '/community/dashboard', label: language === 'hi' ? 'सोसायटी' : 'Society', icon: <Building2 className="w-5 h-5" /> },
          { href: '/community/request', label: language === 'hi' ? 'अनुरोध' : 'Request', icon: <Plus className="w-5 h-5" /> },
        ];
      case 'admin':
        return [
          { href: '/admin/dashboard', label: language === 'hi' ? 'डैशबोर्ड' : 'Dashboard', icon: <Home className="w-5 h-5" /> },
          { href: '/admin/wage-compliance', label: language === 'hi' ? 'मजदूरी' : 'Wages', icon: <Scale className="w-5 h-5" /> },
          { href: '/admin/disputes', label: language === 'hi' ? 'विवाद' : 'Disputes', icon: <FileText className="w-5 h-5" /> },
          { href: '/admin/audit-logs', label: language === 'hi' ? 'ऑडिट' : 'Audit', icon: <ShieldCheck className="w-5 h-5" /> },
        ];
      default: // Customer
        return [
          { href: '/', label: language === 'hi' ? 'सेवाएं' : 'Home', icon: <Home className="w-5 h-5" /> },
          { href: '/customer/request', label: language === 'hi' ? 'अनुरोध' : 'Request', icon: <Plus className="w-5 h-5" /> },
          { href: '/customer/bookings', label: language === 'hi' ? 'बुकिंग' : 'Bookings', icon: <Calendar className="w-5 h-5" /> },
        ];
    }
  };

  const navItems = getNavItems();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-border shadow-float py-1 px-2">
      <nav className="flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = item.href === '/' 
            ? pathname === '/' 
            : pathname === item.href || pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-all duration-150 ${
                isActive 
                  ? 'text-slate-950 font-semibold' 
                  : 'text-content-muted hover:text-content'
              }`}
            >
              <div className={`p-1 rounded-lg ${isActive ? 'bg-surface-subtle text-slate-950' : ''}`}>
                {item.icon}
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight">
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};
