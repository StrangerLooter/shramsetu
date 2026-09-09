'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/store/app-store';
import { 
  MapPin, 
  Calendar, 
  ArrowRight, 
  Plus,
  Briefcase
} from 'lucide-react';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/Button';

export default function CustomerBookingsPage() {
  const router = useRouter();
  const { jobs, language } = useApp();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-10">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-content">
            {language === 'hi' ? 'मेरी सेवा बुकिंग' : 'My Service Bookings'}
          </h1>
          <p className="text-xs sm:text-sm text-content-muted mt-1">
            Track real-time worker arrivals, view protected wage settlements, and manage past service history.
          </p>
        </div>

        <Link href="/customer/request">
          <Button variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
            {language === 'hi' ? 'नया अनुरोध' : 'Request Service'}
          </Button>
        </Link>
      </div>

      {/* Bookings List or Empty State */}
      {jobs.length === 0 ? (
        <EmptyState
          icon={<Briefcase className="w-6 h-6" />}
          title={language === 'hi' ? 'कोई बुकिंग नहीं मिली' : 'No service bookings yet'}
          description={language === 'hi' 
            ? 'आपने अभी तक कोई सेवा बुक नहीं की है। शुरू करने के लिए नीचे क्लिक करें।'
            : 'You haven’t booked any services yet. Request a verified cooperative artisan to get started.'}
          actionLabel={language === 'hi' ? 'पहली सेवा बुक करें' : 'Request a Service'}
          onAction={() => router.push('/customer/request')}
        />
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-2xl p-5 border border-border hover:border-neutral-300 shadow-card transition-all duration-150 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-2 flex-1 min-w-0">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h3 className="font-semibold text-content text-base">{job.serviceName}</h3>
                  <span className="text-xs font-mono text-content-muted bg-surface-subtle px-2 py-0.5 rounded border border-border/60">
                    #{job.id}
                  </span>
                  <StatusBadge status={job.status} size="sm" />
                </div>

                <p className="text-xs text-content-muted line-clamp-1">
                  {job.description}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs text-content-muted pt-1">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-content-muted shrink-0" />
                    <span className="truncate max-w-xs">{job.locationAddress}</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-content-muted shrink-0" />
                    <span>{job.statusTimestamps.requestedAt.split('T')[0]} • {job.urgency} Urgency</span>
                  </span>
                </div>
              </div>

              {/* Price & Action */}
              <div className="flex sm:flex-col items-center sm:items-end justify-between gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-border/60">
                <div className="text-left sm:text-right">
                  <span className="text-[10px] text-content-muted uppercase tracking-wider block">Total Amount</span>
                  <span className="text-base font-bold text-content">₹{job.pricing.customerTotal}</span>
                  <span className="text-[10px] text-emerald-700 block font-medium">
                    ₹{job.pricing.protectedWorkerWage} Protected Wage
                  </span>
                </div>

                <Link href={`/customer/bookings/${job.id}`}>
                  <Button variant="secondary" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                    {language === 'hi' ? 'विवरण देखें' : 'View Booking'}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
