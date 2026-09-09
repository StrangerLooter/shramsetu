import React from 'react';
import { Search, X } from 'lucide-react';

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = "Search services, plumbers, electricians...",
  className = ""
}) => {
  return (
    <div className={`relative flex items-center w-full ${className}`}>
      <Search className="w-4 h-4 text-[#66676E] absolute left-3.5 pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-white text-[#121316] text-sm rounded-xl border border-[rgba(18,19,22,0.12)] pl-10 pr-10 py-3 shadow-subtle placeholder:text-[#9D9EA5] focus:outline-none focus:ring-2 focus:ring-[#121316]/10 focus:border-[#121316] transition-all"
      />
      {value ? (
        <button
          type="button"
          onClick={() => onChange('')}
          className="absolute right-3 p-1 rounded-md text-[#66676E] hover:text-[#121316] hover:bg-[#F2EFE9] transition-colors"
          title="Clear search"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      ) : null}
    </div>
  );
};
