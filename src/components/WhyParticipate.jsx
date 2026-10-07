import React from 'react';
import { Sparkles, Award, Users, TrendingUp } from 'lucide-react';

const BENEFITS = [
  {
    icon: Sparkles,
    title: 'Showcase Your Talent',
    desc: 'Demonstrate your distinct capabilities before renowned state artists, evaluators, and academic leaders.'
  },
  {
    icon: Award,
    title: 'Gain Recognition',
    desc: 'Earn prestigious state-level merit certificates, trophies, and statewide acknowledgment for your portfolio.'
  },
  {
    icon: Users,
    title: 'Compete With Others',
    desc: 'Measure your skills against the top qualifiers and brilliant minds from all across the districts.'
  },
  {
    icon: TrendingUp,
    title: 'Build Confidence',
    desc: 'Develop invaluable presentation experience, resilience, and inspiration to achieve greater milestones.'
  }
];

export default function WhyParticipate() {
  return (
    <section className="benefits-section">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">Empowerment</div>
          <h2 className="section-title">Why Participate?</h2>
          <p className="section-subtitle">
            More than just a contest — an extraordinary catalyst for your creative, academic, and personal growth.
          </p>
        </div>

        <div className="benefits-grid">
          {BENEFITS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="benefit-card">
                <div className="benefit-icon-wrap">
                  <Icon size={26} />
                </div>
                <h3 className="benefit-title">{item.title}</h3>
                <p className="benefit-desc">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
