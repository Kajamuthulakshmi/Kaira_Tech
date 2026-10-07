import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import EventHighlights from '../components/EventHighlights';
import CategoryCard from '../components/CategoryCard';
import CompetitionCard from '../components/CompetitionCard';
import CompetitionFilter from '../components/CompetitionFilter';
import HowItWorks from '../components/HowItWorks';
import Stats from '../components/Stats';
import WhyParticipate from '../components/WhyParticipate';
import CTA from '../components/CTA';
import { CATEGORIES, COMPETITIONS_DATA } from '../data/competitions';

export default function Home() {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const location = useLocation();

  // Handle hash scrolling if URL contains #competitions or #categories etc.
  useEffect(() => {
    if (location.hash) {
      const elementId = location.hash.replace('#', '');
      const el = document.getElementById(elementId);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  const scrollToCompetitions = () => {
    const el = document.getElementById('competitions');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectCategoryFromCard = (categoryId) => {
    setSelectedFilter(categoryId);
    scrollToCompetitions();
  };

  // Filter competitions dynamically by React state
  const displayedCompetitions = selectedFilter === 'All'
    ? COMPETITIONS_DATA
    : COMPETITIONS_DATA.filter((c) => c.category === selectedFilter);

  return (
    <div className="home-page-wrapper">
      {/* 1. Hero Section */}
      <Hero onExploreClick={scrollToCompetitions} />

      {/* 2. Event Highlights */}
      <EventHighlights />

      {/* 3. Age Categories Section */}
      <section className="categories-section" id="categories">
        <div className="container">
          <div className="section-header">
            <div className="section-tag">Age Categories</div>
            <h2 className="section-title">Choose Your Category</h2>
            <p className="section-subtitle">
              Find the competition that matches your age group. Competitions are structured to ensure fair, age-appropriate assessment.
            </p>
          </div>

          <div className="categories-grid">
            {CATEGORIES.map((cat) => (
              <CategoryCard
                key={cat.id}
                category={cat}
                onSelectCategory={handleSelectCategoryFromCard}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Competitions Section with React-State Filter System */}
      <section className="competitions-section" id="competitions">
        <div className="container">
          <div className="section-header">
            <div className="section-tag">Skill Categories</div>
            <h2 className="section-title">Explore Competitions</h2>
            <p className="section-subtitle">
              Browse through all open categories and secure your registration for the 2026 championship.
            </p>
          </div>

          {/* Filter System: All | Kids | Medium | Under 35 */}
          <CompetitionFilter
            activeFilter={selectedFilter}
            onFilterChange={setSelectedFilter}
          />

          {/* Competitions Grid */}
          <div className="competitions-grid">
            {displayedCompetitions.map((comp) => (
              <CompetitionCard key={comp.id} competition={comp} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. How It Works Section */}
      <HowItWorks />

      {/* 6. Event Statistics Section */}
      <Stats />

      {/* 7. Why Participate Section */}
      <WhyParticipate />

      {/* 8. Final Call to Action Section */}
      <CTA />
    </div>
  );
}
