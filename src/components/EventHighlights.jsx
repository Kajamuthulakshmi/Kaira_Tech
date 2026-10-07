import React from 'react';
import { Award, Layers, Sparkles, CheckCircle2 } from 'lucide-react';

const HIGHLIGHTS = [
  {
    icon: Award,
    title: 'State Level',
    text: 'Compete with talented participants from across the state on a premier platform.'
  },
  {
    icon: Layers,
    title: '3 Age Categories',
    text: 'Competitions designed for different age groups: Kids, Medium, and Under 35.'
  },
  {
    icon: Sparkles,
    title: 'Multiple Competitions',
    text: 'Choose from different skill-based competitions spanning arts, STEM, and oratory.'
  },
  {
    icon: CheckCircle2,
    title: 'Open Registration',
    text: 'Simple and easy online registration with instant confirmation ID.'
  }
];

export default function EventHighlights() {
  return (
    <section className="highlights-section" id="about-event">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">Key Highlights</div>
          <h2 className="section-title">Designed for Excellence</h2>
          <p className="section-subtitle">
            A state-wide stage offering fair evaluation, verified merit, and equal opportunity for every aspirant.
          </p>
        </div>

        <div className="highlights-grid">
          {HIGHLIGHTS.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="highlight-card">
                <div className="highlight-icon-box">
                  <Icon size={24} />
                </div>
                <h3 className="highlight-title">{item.title}</h3>
                <p className="highlight-text">{item.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
