import React from 'react';
import { ArrowRight, Check, Palette, Award, Trophy } from 'lucide-react';

const CATEGORY_ICONS = {
  Kids: Palette,
  Medium: Award,
  'Under 35': Trophy
};

const CATEGORY_FEATURES = {
  Kids: ['Age below 13 years', 'Creative & expressive events', 'Medals & Participation Badges'],
  Medium: ['Age 13 to 17 years', 'Academic & talent challenges', 'Merit Certificates & Trophies'],
  'Under 35': ['Age 18 to 34 years', 'State-level championships', 'State Honours & Cash Rewards']
};

export default function CategoryCard({ category, onSelectCategory }) {
  const IconComponent = CATEGORY_ICONS[category.id] || Trophy;
  const features = CATEGORY_FEATURES[category.id] || [];

  return (
    <div
      className="category-card"
      style={{
        borderColor: category.borderColor,
        background: `radial-gradient(circle at top right, ${category.borderColor.replace('0.3', '0.08')}, rgba(17, 25, 43, 0.75))`
      }}
    >
      <div className="category-header">
        <div
          className="category-icon-box"
          style={{
            background: `rgba(${category.id === 'Kids' ? '56, 189, 248' : category.id === 'Medium' ? '129, 140, 248' : '52, 211, 153'}, 0.15)`,
            color: category.accentColor,
            border: `1px solid ${category.borderColor}`
          }}
        >
          <IconComponent size={28} />
        </div>
        <span className="category-competitions-badge">
          {category.count} Competitions
        </span>
      </div>

      <h3 className="category-title">{category.name}</h3>
      <div className="category-age-tag" style={{ color: category.accentColor }}>
        {category.ageRange}
      </div>

      <p className="category-desc">{category.description}</p>

      <ul className="category-features">
        {features.map((feat, idx) => (
          <li key={idx} className="category-feature-item">
            <Check size={16} className="category-feature-icon" />
            <span>{feat}</span>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="btn btn-secondary btn-full"
        onClick={() => onSelectCategory(category.id)}
        style={{ borderColor: category.borderColor }}
      >
        <span>View Competitions</span>
        <ArrowRight size={16} />
      </button>
    </div>
  );
}
