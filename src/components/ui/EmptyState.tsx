import React from 'react';
import { Button } from './Button';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  className = ''
}) => {
  return (
    <div className={`bg-white rounded-2xl border border-dashed border-border p-8 sm:p-12 text-center max-w-md mx-auto ${className}`}>
      {icon && (
        <div className="w-12 h-12 rounded-2xl bg-surface-subtle border border-border/60 flex items-center justify-center mx-auto text-content-muted mb-4">
          {icon}
        </div>
      )}
      <h3 className="text-base font-semibold text-content">{title}</h3>
      <p className="text-xs sm:text-sm text-content-muted mt-1.5 leading-relaxed max-w-xs mx-auto">
        {description}
      </p>
      {actionLabel && onAction && (
        <div className="mt-5">
          <Button variant="primary" size="sm" onClick={onAction}>
            {actionLabel}
          </Button>
        </div>
      )}
    </div>
  );
};
