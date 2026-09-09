import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  variant?: 'white' | 'cream' | 'beige' | 'teal';
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  variant = 'white',
  hoverable = false,
  ...props
}) => {
  const variantStyles = {
    white: "bg-white border border-[rgba(18,19,22,0.08)] shadow-subtle text-[#121316]",
    cream: "bg-[#FBF9F5] border border-[rgba(18,19,22,0.08)] shadow-subtle text-[#121316]",
    beige: "bg-[#F2EFE9] border border-[rgba(18,19,22,0.08)] text-[#121316]",
    teal: "bg-[#0D2F28] border border-[rgba(255,255,255,0.12)] text-white shadow-teal",
  };

  return (
    <div
      className={`rounded-2xl p-5 ${variantStyles[variant]} ${
        hoverable ? 'hover:border-[rgba(18,19,22,0.18)] hover:shadow-card transition-all duration-200' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
