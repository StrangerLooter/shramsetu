import React from 'react';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'coop';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-150 rounded-xl select-none focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]";

  const variantStyles = {
    primary: "bg-slate-900 text-white hover:bg-slate-800 focus:ring-slate-950 shadow-subtle",
    secondary: "bg-surface-subtle text-content hover:bg-surface-hover focus:ring-neutral-300 border border-border/80 shadow-subtle",
    outline: "bg-transparent text-content hover:bg-surface-subtle focus:ring-neutral-300 border border-border",
    ghost: "bg-transparent text-content-secondary hover:text-content hover:bg-surface-subtle focus:ring-neutral-200",
    destructive: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-subtle",
    coop: "bg-emerald-700 text-white hover:bg-emerald-800 focus:ring-emerald-700 shadow-subtle",
  };

  const sizeStyles = {
    sm: "text-xs px-3 py-1.5 min-h-[34px] gap-1.5",
    md: "text-xs sm:text-sm px-4 py-2.5 min-h-[42px] gap-2",
    lg: "text-sm sm:text-base px-5 py-3 min-h-[48px] sm:min-h-[52px] gap-2.5 font-semibold",
  };

  return (
    <button
      disabled={disabled || isLoading}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin shrink-0" />
      ) : (
        leftIcon && <span className="shrink-0">{leftIcon}</span>
      )}
      <span>{children}</span>
      {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </button>
  );
};
