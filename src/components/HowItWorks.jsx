import React from 'react';

const STEPS = [
  {
    number: '01',
    title: 'Choose Your Category',
    desc: 'Select the age category that matches you — Kids (below 13), Medium (13–17), or Under 35 (18–34).'
  },
  {
    number: '02',
    title: 'Select Competition',
    desc: 'Choose from a dynamic range of skill-based competitions tailored specifically to your chosen bracket.'
  },
  {
    number: '03',
    title: 'Complete Registration',
    desc: 'Enter your personal details, verify your age, and submit to receive your official Registration ID instantly.'
  }
];

export default function HowItWorks() {
  return (
    <section className="how-it-works-section">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">Participation Process</div>
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">
            Get registered in three simple and transparent steps on the official state platform.
          </p>
        </div>

        <div className="steps-grid">
          {STEPS.map((step, idx) => (
            <div key={idx} className="step-card">
              <div className="step-number">{step.number}</div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
