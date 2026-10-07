import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Palette,
  BookOpen,
  Mic,
  PenTool,
  HelpCircle,
  Megaphone,
  FileText,
  Camera,
  Code,
  Sparkles,
  Clock,
  MapPin,
  CheckCircle2
} from 'lucide-react';

const ICON_MAP = {
  Palette,
  BookOpen,
  Mic,
  PenTool,
  HelpCircle,
  Megaphone,
  FileText,
  Camera,
  Code,
  Sparkles
};

export default function CompetitionCard({ competition }) {
  const navigate = useNavigate();
  const IconComponent = ICON_MAP[competition.icon] || Sparkles;

  const getCategoryBadgeClass = (category) => {
    if (category === 'Kids') return 'badge-kids';
    if (category === 'Medium') return 'badge-medium';
    return 'badge-u35';
  };

  const handleRegisterClick = () => {
    // Navigate to registration page pre-filling the selected category and competition
    navigate('/register', {
      state: {
        category: competition.category,
        competition: competition.name
      }
    });
  };

  return (
    <div className="competition-card">
      <div className="comp-card-top">
        <span className={`badge ${getCategoryBadgeClass(competition.category)}`}>
          {competition.category}
        </span>
        <div className="comp-icon-box">
          <IconComponent size={22} />
        </div>
      </div>

      <h3 className="comp-card-title">{competition.name}</h3>
      <p className="comp-card-desc">{competition.shortDescription}</p>

      <div className="comp-meta-grid">
        <div className="comp-meta-item">
          <span className="comp-meta-label">Eligibility</span>
          <span className="comp-meta-value">{competition.eligibility}</span>
        </div>
        <div className="comp-meta-item">
          <span className="comp-meta-label">Duration</span>
          <span className="comp-meta-value">{competition.duration}</span>
        </div>
      </div>

      <div className="comp-card-bottom">
        <div className="comp-spots-pill">
          <CheckCircle2 size={14} />
          <span>{competition.status}</span>
        </div>
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={handleRegisterClick}
        >
          <span>Register</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}
