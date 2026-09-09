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
      <Search className="w-4 h-4 text-content-muted absolute left-3.5 pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-white text-content text-sm rounded-xl border border-border pl-10 pr-10 py-2.5 shadow-subtle placeholder:text-content-subtle focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-800 transition-all"
      />
      {value ? (
        <button
          type="button"
          onClick={() => onChange('')}
          className="absolute right-3 p-1 rounded-md text-content-muted hover:text-content hover:bg-surface-subtle transition-colors"
          title="Clear search"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      ) : null}
    </div>
  );
};
