import React from 'react';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'teal' | 'outline' | 'ghost' | 'destructive' | 'coop';
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
  const baseStyles = "inline-flex items-center justify-center font-medium font-sans transition-all duration-150 rounded-xl select-none focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]";

  const variantStyles = {
    // Wispr Flow Inspired Soft Lavender Primary CTA with Dark Text and Thin Border
    primary: "bg-[#DDD6FE] text-[#121316] border border-[#121316]/20 hover:bg-[#D4CBFC] focus:ring-purple-300 shadow-subtle",
    // Secondary CTA: Transparent/Cream background with dark border
    secondary: "bg-transparent text-[#121316] border border-[#121316]/20 hover:bg-black/5 focus:ring-neutral-300",
    // High-impact Deep Teal CTA
    teal: "bg-[#0D2F28] text-white border border-[#0D2F28] hover:bg-[#133D34] focus:ring-teal-900 shadow-subtle",
    outline: "bg-transparent text-[#121316] border border-[#121316]/15 hover:bg-black/5 focus:ring-neutral-200",
    ghost: "bg-transparent text-content-secondary hover:text-content hover:bg-black/5 focus:ring-neutral-200",
    destructive: "bg-red-700 text-white hover:bg-red-800 focus:ring-red-600 shadow-subtle",
    coop: "bg-[#0D2F28] text-white hover:bg-[#133D34] focus:ring-teal-900 shadow-subtle",
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
