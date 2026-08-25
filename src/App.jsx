import React, { useState, useMemo, useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import BgWaves from './components/BgWaves.jsx';
import Hero from './components/Hero.jsx';
import WorkshopBanner from './components/WorkshopBanner.jsx';
import Toolbar from './components/Toolbar.jsx';
import PSCard from './components/PSCard.jsx';
import DetailModal from './components/DetailModal.jsx';
import Footer from './components/Footer.jsx';
import { SIH_DATA } from './data/sihData.js';

const PAGE_SIZE = 9;

function parseIdeas(str) {
  if (!str) return 0;
  const m = String(str).match(/^(\d+)/);
  return m ? parseInt(m[1], 10) : 0;
}

export function getCompetitivenessScore(ps) {
  if (!ps) return 0;
  const realIdeas = parseIdeas(ps.ideas);
  const innovMap = { Breakthrough: 35, Moderate: 20, Incremental: 10 };
  const innovScore = innovMap[ps.innovation_scope?.tier] || 15;
  const effortMap = { High: 30, Medium: 20, Low: 10 };
  const effortScore = effortMap[ps.invention_effort?.tier] || (ps.invention_effort?.score || 15);
  const verdictMap = { GREEN: 30, YELLOW: 20, RED: 10 };
  const verdictScore = verdictMap[ps.verdict?.tier] || 15;
  const categoryScore = ps.category === 'Software' ? 25 : 10;
  const text = `${ps.theme || ''} ${ps.title || ''}`.toLowerCase();
  const isHighDemand = ['ai', 'machine learning', 'cyber', 'blockchain', 'web3', 'app', 'automation', 'health'].some(k => text.includes(k));
  const themeScore = isHighDemand ? 15 : 0;

  return (realIdeas * 100) + innovScore + effortScore + verdictScore + categoryScore + themeScore;
}

export function getCompetitivenessTier(ps) {
  const score = getCompetitivenessScore(ps);
  if (score >= 95) return 'High';
  if (score >= 70) return 'Medium';
  return 'Low';
}

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('sno-asc');
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    theme: '',
    org: '',
    innovation: '',
    effort: '',
    verdict: '',
    competitiveness: ''
  });
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [selectedPS, setSelectedPS] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const categories = useMemo(() => Array.from(new Set(SIH_DATA.map(d => d.category).filter(Boolean))).sort(), []);
  const themes = useMemo(() => Array.from(new Set(SIH_DATA.map(d => d.theme).filter(Boolean))).sort(), []);
  const organizations = useMemo(() => Array.from(new Set(SIH_DATA.map(d => d.org).filter(Boolean))).sort(), []);

  const filteredData = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return SIH_DATA.filter((r) => {
      if (filters.category && r.category !== filters.category) return false;
      if (filters.theme && r.theme !== filters.theme) return false;
      if (filters.org && r.org !== filters.org) return false;
      if (filters.innovation && (r.innovation_scope?.tier !== filters.innovation)) return false;
      if (filters.effort && (r.invention_effort?.tier !== filters.effort)) return false;
      if (filters.verdict && (r.verdict?.tier !== filters.verdict)) return false;
      if (filters.competitiveness && getCompetitivenessTier(r) !== filters.competitiveness) return false;
      if (q) {
        const hay = `${r.title || ''} ${r.org || ''} ${r.theme || ''} ${r.ps_number || ''} ${r.description || ''}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    }).sort((a, b) => {
      const effortRank = { Low: 0, Medium: 1, High: 2 };
      const innovationRank = { Incremental: 0, Moderate: 1, Breakthrough: 2 };
      const verdictRank = { RED: 0, YELLOW: 1, GREEN: 2 };

      switch (sortOption) {
        case 'deadline-asc': return (a.deadline_date || '9999').localeCompare(b.deadline_date || '9999');
        case 'ideas-desc': return getCompetitivenessScore(b) - getCompetitivenessScore(a);
        case 'ideas-asc': return getCompetitivenessScore(a) - getCompetitivenessScore(b);
        case 'effort-asc': return (effortRank[a.invention_effort?.tier] || 0) - (effortRank[b.invention_effort?.tier] || 0);
        case 'innovation-desc': return (innovationRank[b.innovation_scope?.tier] || 0) - (innovationRank[a.innovation_scope?.tier] || 0);
        case 'verdict-desc': return (verdictRank[b.verdict?.tier] || 0) - (verdictRank[a.verdict?.tier] || 0);
        default: return a.sno - b.sno;
      }
    });
  }, [searchQuery, sortOption, filters]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowScrollTop(scrollY > 400);

      const vh = window.innerHeight;
      const sections = [
        { id: 'home',            el: document.getElementById('home') },
        { id: 'workshopSection', el: document.getElementById('workshopSection') },
        { id: 'toolbarSection',  el: document.getElementById('toolbarSection') }
      ];

      // Walk from bottom: first section whose top is within upper 55% of viewport wins
      let active = 'home';
      for (const sec of sections) {
        if (sec.el) {
          const rect = sec.el.getBoundingClientRect();
          if (rect.top <= vh * 0.55) active = sec.id;
        }
      }
      setActiveSection(active);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  const handleFilterChange = (key, val) => {
    setFilters(prev => ({ ...prev, [key]: val }));
    setVisibleCount(PAGE_SIZE);
  };

  const handleResetFilters = () => {
    setFilters({
      category: '',
      theme: '',
      org: '',
      innovation: '',
      effort: '',
      verdict: '',
      competitiveness: ''
    });
    setSearchQuery('');
    setSortOption('sno-asc');
    setVisibleCount(PAGE_SIZE);
  };

  const visibleItems = filteredData.slice(0, visibleCount);

  return (
    <div className="app-root">
      <BgWaves />
      <Navbar activeSection={activeSection} onNavigate={handleNavigate} />
      
      <main>
        <Hero onExplore={() => handleNavigate('toolbarSection')} />
        <WorkshopBanner onExplore={() => handleNavigate('toolbarSection')} />
        <Toolbar
          searchQuery={searchQuery}
          onSearchChange={(q) => { setSearchQuery(q); setVisibleCount(PAGE_SIZE); }}
          sortOption={sortOption}
          onSortChange={setSortOption}
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
          categories={categories}
          themes={themes}
          organizations={organizations}
          filterOpen={filterOpen}
          onToggleFilter={() => setFilterOpen(prev => !prev)}
          totalCount={filteredData.length}
          visibleCount={Math.min(visibleCount, filteredData.length)}
        />

        <section className="grid-section container">
          {visibleItems.length > 0 ? (
            <div className="ps-grid">
              {visibleItems.map((ps) => (
                <PSCard key={ps.ps_number} ps={ps} onSelect={setSelectedPS} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <i className="fa-solid fa-magnifying-glass"></i>
              <p>No problem statements match your filters. Try adjusting your search.</p>
            </div>
          )}

          {visibleCount < filteredData.length && (
            <div className="load-more">
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => setVisibleCount(prev => prev + PAGE_SIZE)}
              >
                Load {Math.min(PAGE_SIZE, filteredData.length - visibleCount)} more statements
              </button>
            </div>
          )}
        </section>
      </main>

      <Footer onNavigate={handleNavigate} />

      {selectedPS && (
        <DetailModal ps={selectedPS} onClose={() => setSelectedPS(null)} />
      )}

      <button
        type="button"
        className={`scroll-top ${showScrollTop ? 'visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Scroll to top"
      >
        <i className="fa-solid fa-arrow-up"></i>
      </button>
    </div>
  );
}
