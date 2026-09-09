import React from 'react';
import { 
  Clock, 
  Search, 
  UserCheck, 
  Check, 
  Navigation, 
  MapPin, 
  Wrench, 
  CheckCircle2, 
  ShieldCheck, 
  AlertTriangle, 
  XCircle 
} from 'lucide-react';
import { JobStatus } from '@/types';

export interface StatusBadgeProps {
  status: JobStatus | string;
  size?: 'sm' | 'md';
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = 'md',
  className = ''
}) => {
  const getStatusConfig = (s: string) => {
    switch (s) {
      case 'REQUESTED':
      case 'PENDING':
        return {
          label: 'Request Received',
          icon: <Clock className="w-3 h-3" />,
          styles: 'bg-neutral-100 text-neutral-800 border-neutral-200'
        };
      case 'MATCHING':
        return {
          label: 'Finding Worker',
          icon: <Search className="w-3 h-3 animate-spin" />,
          styles: 'bg-amber-50 text-amber-800 border-amber-200'
        };
      case 'ASSIGNED':
        return {
          label: 'Worker Assigned',
          icon: <UserCheck className="w-3 h-3" />,
          styles: 'bg-blue-50 text-blue-800 border-blue-200'
        };
      case 'ACCEPTED':
        return {
          label: 'Job Accepted',
          icon: <Check className="w-3 h-3" />,
          styles: 'bg-indigo-50 text-indigo-800 border-indigo-200'
        };
      case 'WORKER_ON_THE_WAY':
        return {
          label: 'Worker On The Way',
          icon: <Navigation className="w-3 h-3 animate-pulse" />,
          styles: 'bg-sky-50 text-sky-800 border-sky-200'
        };
      case 'ARRIVED':
        return {
          label: 'Worker Arrived',
          icon: <MapPin className="w-3 h-3" />,
          styles: 'bg-emerald-50 text-emerald-800 border-emerald-200'
        };
      case 'IN_PROGRESS':
        return {
          label: 'In Progress',
          icon: <Wrench className="w-3 h-3 animate-spin" />,
          styles: 'bg-blue-50 text-blue-900 border-blue-200'
        };
      case 'COMPLETED':
        return {
          label: 'Work Completed',
          icon: <CheckCircle2 className="w-3 h-3" />,
          styles: 'bg-emerald-50 text-emerald-800 border-emerald-200'
        };
      case 'PAYMENT_SETTLED':
        return {
          label: 'Payment Settled',
          icon: <ShieldCheck className="w-3 h-3" />,
          styles: 'bg-emerald-50 text-emerald-900 border-emerald-300 font-semibold'
        };
      case 'DISPUTED':
        return {
          label: 'Disputed',
          icon: <AlertTriangle className="w-3 h-3" />,
          styles: 'bg-red-50 text-red-800 border-red-200'
        };
      case 'CANCELLED':
        return {
          label: 'Cancelled',
          icon: <XCircle className="w-3 h-3" />,
          styles: 'bg-neutral-100 text-neutral-600 border-neutral-200'
        };
      default:
        return {
          label: s,
          icon: <Clock className="w-3 h-3" />,
          styles: 'bg-neutral-100 text-neutral-700 border-neutral-200'
        };
    }
  };

  const config = getStatusConfig(status);
  const sizeStyles = size === 'sm' 
    ? 'text-[10px] px-2 py-0.5 gap-1' 
    : 'text-xs px-2.5 py-1 gap-1.5 font-medium';

  return (
    <span className={`inline-flex items-center rounded-full border shadow-2xs select-none ${sizeStyles} ${config.styles} ${className}`}>
      {config.icon}
      <span>{config.label}</span>
    </span>
  );
};
