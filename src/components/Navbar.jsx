import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Trophy, Menu, X, ArrowRight, Sparkles } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setMobileMenuOpen(false);

  const handleNavClick = (anchorId) => {
    closeMenu();
    if (location.pathname !== '/') {
      navigate(`/#${anchorId}`);
      setTimeout(() => {
        const el = document.getElementById(anchorId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(anchorId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`navbar-wrapper ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="navbar-content">
          {/* Brand Logo */}
          <Link to="/" className="brand-logo" onClick={closeMenu}>
            <div className="brand-icon-box">
              <Trophy size={20} />
            </div>
            <span>
              STATE COMPETE
              <span className="brand-tag">2026</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav>
            <ul className="nav-links">
              <li>
                <Link
                  to="/"
                  className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
                >
                  Home
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  className="nav-link"
                  onClick={() => handleNavClick('competitions')}
                >
                  Competitions
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="nav-link"
                  onClick={() => handleNavClick('about-event')}
                >
                  About Event
                </button>
              </li>
            </ul>
          </nav>

          {/* Desktop CTA Button */}
          <div className="nav-cta-group">
            <Link to="/register" className="btn btn-primary btn-sm nav-cta-desktop">
              <span>Register Now</span>
              <ArrowRight size={16} />
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              className="hamburger-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <ul className="mobile-nav-links">
          <li>
            <Link to="/" className="mobile-nav-link" onClick={closeMenu}>
              <span>Home</span>
              <Sparkles size={16} />
            </Link>
          </li>
          <li>
            <button
              type="button"
              className="mobile-nav-link"
              style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none' }}
              onClick={() => handleNavClick('competitions')}
            >
              <span>Competitions</span>
              <Trophy size={16} />
            </button>
          </li>
          <li>
            <button
              type="button"
              className="mobile-nav-link"
              style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none' }}
              onClick={() => handleNavClick('about-event')}
            >
              <span>About Event</span>
              <Sparkles size={16} />
            </button>
          </li>
        </ul>

        <div style={{ marginTop: 'auto', paddingTop: '1.5rem' }}>
          <Link
            to="/register"
            className="btn btn-primary btn-lg btn-full"
            onClick={closeMenu}
          >
            <span>Register Now</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </header>
  );
}
