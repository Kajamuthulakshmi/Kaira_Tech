import React, { useState, useEffect } from 'react';
import { getStoredRegistrations } from '../data/competitions';

export default function Stats() {
  const [statsData, setStatsData] = useState({
    participants: 1000,
    competitions: '20+',
    categories: '3',
    event: '1'
  });

  useEffect(() => {
    const stored = getStoredRegistrations();
    if (stored && stored.length > 0) {
      setStatsData((prev) => ({
        ...prev,
        participants: 1000 + stored.length
      }));
    }
  }, []);

  return (
    <section className="stats-section">
      <div className="container">
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-number text-gradient">{statsData.participants}+</div>
            <div className="stat-label">Participants</div>
          </div>
          <div className="stat-item">
            <div className="stat-number" style={{ color: '#38bdf8' }}>{statsData.competitions}</div>
            <div className="stat-label">Competitions</div>
          </div>
          <div className="stat-item">
            <div className="stat-number" style={{ color: '#818cf8' }}>{statsData.categories}</div>
            <div className="stat-label">Age Categories</div>
          </div>
          <div className="stat-item">
            <div className="stat-number" style={{ color: '#34d399' }}>{statsData.event}</div>
            <div className="stat-label">State-Level Event</div>
          </div>
        </div>
      </div>
    </section>
  );
}
