import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Trophy } from 'lucide-react';

export default function CTA() {
  return (
    <section className="cta-section">
      <div className="container">
        <div className="cta-box">
          <div style={{ display: 'inline-flex', padding: '0.6rem', borderRadius: '50%', background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', marginBottom: '1.25rem' }}>
            <Trophy size={28} />
          </div>
          <h2 className="cta-heading">Ready to Showcase Your Talent?</h2>
          <p className="cta-text">
            Take the next step and register for the State-Level Competition. Registration is open across all 3 categories for a limited period.
          </p>
          <Link to="/register" className="btn btn-primary btn-lg">
            <span>Register Now</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
