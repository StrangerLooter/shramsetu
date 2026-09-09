import React from 'react';

export interface MetricCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  trend?: string;
  trendPositive?: boolean;
  icon?: React.ReactNode;
  variant?: 'white' | 'beige' | 'teal';
  className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  subtext,
  trend,
  trendPositive = true,
  icon,
  variant = 'white',
  className = ''
}) => {
  const variantStyles = {
    white: "bg-white border border-[rgba(18,19,22,0.08)] shadow-subtle text-[#121316]",
    beige: "bg-[#F2EFE9] border border-[rgba(18,19,22,0.08)] text-[#121316]",
    teal: "bg-[#0D2F28] border border-[rgba(255,255,255,0.12)] text-white shadow-teal",
  };

  return (
    <div className={`rounded-2xl p-5 flex flex-col justify-between ${variantStyles[variant]} ${className}`}>
      <div className="flex items-center justify-between gap-2">
        <span className={`text-xs font-medium ${variant === 'teal' ? 'text-white/70' : 'text-[#66676E]'}`}>
          {label}
        </span>
        {icon && (
          <div className={`shrink-0 ${variant === 'teal' ? 'text-[#DDD6FE]' : 'text-[#121316]/60'}`}>
            {icon}
          </div>
        )}
      </div>

      <div className="mt-3">
        <div className="font-serif text-2xl sm:text-3xl font-semibold tracking-tight">
          {value}
        </div>
        
        {(subtext || trend) && (
          <div className="flex items-center gap-1.5 mt-1.5 text-xs">
            {trend && (
              <span className={`font-semibold ${
                variant === 'teal' 
                  ? 'text-[#DDD6FE]' 
                  : trendPositive ? 'text-[#0D2F28]' : 'text-red-600'
              }`}>
                {trend}
              </span>
            )}
            {subtext && (
              <span className={`truncate ${variant === 'teal' ? 'text-white/60' : 'text-[#66676E]'}`}>
                {subtext}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
