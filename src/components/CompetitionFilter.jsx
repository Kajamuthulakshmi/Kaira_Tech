import React from 'react';

const FILTER_OPTIONS = [
  { id: 'All', label: 'All Competitions' },
  { id: 'Kids', label: 'Kids (Below 13)' },
  { id: 'Medium', label: 'Medium (13–17)' },
  { id: 'Under 35', label: 'Under 35 (18–34)' }
];

export default function CompetitionFilter({ activeFilter, onFilterChange }) {
  return (
    <div className="filter-bar-wrapper">
      {FILTER_OPTIONS.map((opt) => (
        <button
          key={opt.id}
          type="button"
          className={`filter-btn ${activeFilter === opt.id ? 'active' : ''}`}
          onClick={() => onFilterChange(opt.id)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
