import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Trophy, ShieldCheck, Award, Users, Star } from 'lucide-react';

export default function Hero({ onExploreClick }) {
  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-grid">
          {/* Left Column: Heading and CTAs */}
          <div className="hero-content">
            <div className="hero-badge-pill">
              <span className="hero-badge-pulse"></span>
              <span>STATE LEVEL COMPETITION 2026</span>
            </div>

            <h1 className="hero-title">
              Show Your Talent.{' '}
              <span className="text-gradient">Compete.</span>{' '}
              Inspire.
            </h1>

            <p className="hero-description">
              Join talented participants from across the state and showcase your skills on a prestigious competition platform.
            </p>

            <div className="hero-cta-group">
              <Link to="/register" className="btn btn-primary btn-lg">
                <span>Register Now</span>
                <ArrowRight size={18} />
              </Link>
              <button
                type="button"
                className="btn btn-secondary btn-lg"
                onClick={onExploreClick}
              >
                <span>Explore Competitions</span>
              </button>
            </div>

            {/* Event Credibility Bar */}
            <div className="hero-trust-bar">
              <div className="trust-item">
                <span className="trust-item-val">38 Districts</span>
                <span className="trust-item-label">State-Wide Reach</span>
              </div>
              <div className="trust-item">
                <span className="trust-item-val">Official Merit</span>
                <span className="trust-item-label">State Certificates</span>
              </div>
              <div className="trust-item">
                <span className="trust-item-val">Expert Jury</span>
                <span className="trust-item-label">Fair Evaluation</span>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Event Visual Illustration */}
          <div className="hero-visual" aria-hidden="true">
            <div className="visual-canvas">
              {/* Glowing Aura Ring */}
              <div className="visual-glow-ring"></div>

              {/* Floating Badge 1: State Certified */}
              <div className="floating-badge floating-badge-1">
                <div className="badge-icon-wrap" style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8' }}>
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#ffffff' }}>Official Platform</div>
                  <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>State-Level Event 2026</div>
                </div>
              </div>

              {/* Central Elevated Crest Card */}
              <div className="visual-center-card">
                <div className="center-trophy-icon">
                  <Trophy size={36} />
                </div>
                <div className="center-card-title">Championship Trophy</div>
                <div className="center-card-sub">State Level Honours & Accolades</div>

                <div className="center-stats-row">
                  <div>
                    <div style={{ fontSize: '1.15rem', fontWeight: '800', color: '#38bdf8' }}>3</div>
                    <div style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase' }}>Categories</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '1.15rem', fontWeight: '800', color: '#34d399' }}>12+</div>
                    <div style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase' }}>Competitions</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '1.15rem', fontWeight: '800', color: '#818cf8' }}>2026</div>
                    <div style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase' }}>Edition</div>
                  </div>
                </div>
              </div>

              {/* Floating Badge 2: Recognition */}
              <div className="floating-badge floating-badge-2">
                <div className="badge-icon-wrap" style={{ background: 'rgba(52, 211, 153, 0.15)', color: '#34d399' }}>
                  <Award size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#ffffff' }}>State Recognition</div>
                  <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Gold & Silver Medals</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
