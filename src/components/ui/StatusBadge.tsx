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
          styles: 'bg-[#F2EFE9] text-[#121316] border-[rgba(18,19,22,0.10)]'
        };
      case 'MATCHING':
        return {
          label: 'Finding Worker',
          icon: <Search className="w-3 h-3 animate-spin" />,
          styles: 'bg-[#FAF3E8] text-[#78541A] border-[#E8DDC9]'
        };
      case 'ASSIGNED':
        return {
          label: 'Worker Assigned',
          icon: <UserCheck className="w-3 h-3" />,
          styles: 'bg-[#EDE8FC] text-[#3D2975] border-[#DDD6FE]'
        };
      case 'ACCEPTED':
        return {
          label: 'Job Accepted',
          icon: <Check className="w-3 h-3" />,
          styles: 'bg-[#EBF5F0] text-[#0D2F28] border-[#CCE6DA]'
        };
      case 'WORKER_ON_THE_WAY':
        return {
          label: 'Worker On The Way',
          icon: <Navigation className="w-3 h-3 animate-pulse" />,
          styles: 'bg-[#EDF4F8] text-[#1D4A66] border-[#D1E3EE]'
        };
      case 'ARRIVED':
        return {
          label: 'Worker Arrived',
          icon: <MapPin className="w-3 h-3" />,
          styles: 'bg-[#EBF5F0] text-[#0D2F28] border-[#CCE6DA]'
        };
      case 'IN_PROGRESS':
        return {
          label: 'In Progress',
          icon: <Wrench className="w-3 h-3 animate-spin" />,
          styles: 'bg-[#EDE8FC] text-[#3D2975] border-[#DDD6FE]'
        };
      case 'COMPLETED':
        return {
          label: 'Work Completed',
          icon: <CheckCircle2 className="w-3 h-3" />,
          styles: 'bg-[#EBF5F0] text-[#0D2F28] border-[#CCE6DA]'
        };
      case 'PAYMENT_SETTLED':
        return {
          label: 'Payment Settled',
          icon: <ShieldCheck className="w-3 h-3 text-[#0D2F28]" />,
          styles: 'bg-[#EBF5F0] text-[#0D2F28] border-[#0D2F28]/30 font-semibold'
        };
      case 'DISPUTED':
        return {
          label: 'Disputed',
          icon: <AlertTriangle className="w-3 h-3" />,
          styles: 'bg-[#FAECEB] text-[#782823] border-[#EAC2BF]'
        };
      case 'CANCELLED':
        return {
          label: 'Cancelled',
          icon: <XCircle className="w-3 h-3" />,
          styles: 'bg-[#F2EFE9] text-[#66676E] border-[rgba(18,19,22,0.10)]'
        };
      default:
        return {
          label: s,
          icon: <Clock className="w-3 h-3" />,
          styles: 'bg-[#F2EFE9] text-[#121316] border-[rgba(18,19,22,0.10)]'
        };
    }
  };

  const config = getStatusConfig(status);
  const sizeStyles = size === 'sm' 
    ? 'text-[10px] px-2 py-0.5 gap-1' 
    : 'text-xs px-2.5 py-1 gap-1.5 font-medium';

  return (
    <span className={`inline-flex items-center rounded-full border select-none ${sizeStyles} ${config.styles} ${className}`}>
      {config.icon}
      <span>{config.label}</span>
    </span>
  );
};
