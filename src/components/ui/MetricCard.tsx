import React from 'react';

export interface MetricCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  trend?: string;
  trendPositive?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  subtext,
  trend,
  trendPositive = true,
  icon,
  className = ''
}) => {
  return (
    <div className={`bg-white rounded-xl border border-border/80 p-4 shadow-subtle flex flex-col justify-between ${className}`}>
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-medium text-content-muted">{label}</span>
        {icon && <div className="text-content-muted shrink-0">{icon}</div>}
      </div>

      <div className="mt-2.5">
        <div className="text-2xl font-bold tracking-tight text-content">{value}</div>
        
        {(subtext || trend) && (
          <div className="flex items-center gap-1.5 mt-1 text-xs">
            {trend && (
              <span className={`font-semibold ${trendPositive ? 'text-emerald-700' : 'text-red-600'}`}>
                {trend}
              </span>
            )}
            {subtext && (
              <span className="text-content-muted truncate">{subtext}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
