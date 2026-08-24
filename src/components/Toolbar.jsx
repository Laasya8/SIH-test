import React from 'react';

export default function Toolbar({
  searchQuery,
  onSearchChange,
  sortOption,
  onSortChange,
  filters,
  onFilterChange,
  onResetFilters,
  categories,
  themes,
  organizations,
  filterOpen,
  onToggleFilter,
  totalCount,
  visibleCount
}) {
  const activeCount = Object.values(filters).filter(Boolean).length;
  const chipNames = {
    category: 'Category',
    theme: 'Theme',
    org: 'Org',
    innovation: 'Innovation',
    effort: 'Effort',
    verdict: 'Verdict',
    competitiveness: 'Competition'
  };

  return (
    <section className="toolbar-section container" id="toolbarSection">
      <div className="section-label">Browse &amp; Filter</div>
      <h2 className="section-title">SIH 2026 Problem Statements</h2>

      <div className="search-row">
        <div className="search-wrap">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="search"
            className="search-input"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by title, org, theme or PS number…"
            autoComplete="off"
          />
        </div>

        <select
          className="ctrl-select"
          value={sortOption}
          onChange={(e) => onSortChange(e.target.value)}
          aria-label="Sort by"
        >
          <option value="sno-asc">Sort: PS Number</option>
          <option value="verdict-desc">Best verdict first</option>
          <option value="innovation-desc">Breakthrough first</option>
          <option value="effort-asc">Easiest effort first</option>
          <option value="ideas-desc">🔥 Most Competitive First</option>
          <option value="ideas-asc">🟢 Least Competitive First</option>
        </select>

        <button
          type="button"
          className={`filter-btn ${filterOpen ? 'open' : ''}`}
          onClick={onToggleFilter}
          aria-expanded={filterOpen}
        >
          <i className="fa-solid fa-sliders"></i>
          Filters
          {activeCount > 0 && <span className="filter-count">{activeCount}</span>}
        </button>
      </div>

      {/* Filter drawer */}
      <div className={`filter-drawer ${filterOpen ? 'open' : ''}`}>
        <div className="filter-grid">
          <select
            className="ctrl-select"
            value={filters.category}
            onChange={(e) => onFilterChange('category', e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>

          <select
            className="ctrl-select"
            value={filters.theme}
            onChange={(e) => onFilterChange('theme', e.target.value)}
          >
            <option value="">All Themes</option>
            {themes.map(t => <option key={t} value={t}>{t}</option>)}
          </select>

          <select
            className="ctrl-select"
            value={filters.org}
            onChange={(e) => onFilterChange('org', e.target.value)}
          >
            <option value="">All Organizations</option>
            {organizations.map(o => <option key={o} value={o}>{o}</option>)}
          </select>

          <select
            className="ctrl-select"
            value={filters.competitiveness || ''}
            onChange={(e) => onFilterChange('competitiveness', e.target.value)}
          >
            <option value="">All Competition Levels</option>
            <option value="High">🔥 High Competition</option>
            <option value="Medium">⚡ Medium Competition</option>
            <option value="Low">🟢 Low Competition (Easy Entry)</option>
          </select>

          <select
            className="ctrl-select"
            value={filters.innovation}
            onChange={(e) => onFilterChange('innovation', e.target.value)}
          >
            <option value="">All Innovation Tiers</option>
            <option value="Breakthrough">Breakthrough</option>
            <option value="Moderate">Moderate</option>
            <option value="Incremental">Incremental</option>
          </select>

          <select
            className="ctrl-select"
            value={filters.effort}
            onChange={(e) => onFilterChange('effort', e.target.value)}
          >
            <option value="">All Effort Levels</option>
            <option value="Low">Low effort</option>
            <option value="Medium">Medium effort</option>
            <option value="High">High effort</option>
          </select>

          <select
            className="ctrl-select"
            value={filters.verdict}
            onChange={(e) => onFilterChange('verdict', e.target.value)}
          >
            <option value="">All Verdicts</option>
            <option value="GREEN">🟢 Strong Pick</option>
            <option value="YELLOW">🟡 Workable</option>
            <option value="RED">🔴 High Risk</option>
          </select>
        </div>

        <button type="button" className="reset-btn" onClick={onResetFilters}>
          ✕ Clear all filters
        </button>
      </div>

      {/* Active filter chips */}
      {activeCount > 0 && (
        <div className="chips">
          {Object.entries(filters).map(([key, val]) => {
            if (!val) return null;
            return (
              <span key={key} className="chip">
                {chipNames[key]}: {val}
                <button
                  type="button"
                  onClick={() => onFilterChange(key, '')}
                  aria-label={`Remove ${chipNames[key]} filter`}
                >
                  ×
                </button>
              </span>
            );
          })}
        </div>
      )}

      <p className="result-meta">
        Showing <b>{visibleCount}</b> of <b>{totalCount}</b> problem statements
      </p>
    </section>
  );
}
