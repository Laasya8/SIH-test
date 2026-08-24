import React from 'react';

const VERDICT_COLOR = { GREEN: '#4ade80', YELLOW: '#facc15', RED: '#f87171' };

function daysUntil(dateStr) {
  if (!dateStr) return null;
  const t = new Date(dateStr + 'T00:00:00');
  const n = new Date();
  n.setHours(0, 0, 0, 0);
  return Math.round((t - n) / 86400000);
}

export default function PSCard({ ps, onSelect }) {
  const days = daysUntil(ps.deadline_date);
  let deadlineLabel = ps.deadline || 'TBA';
  if (days !== null && days >= 0) deadlineLabel += ` (${days}d left)`;
  const soon = days !== null && days <= 14 && days >= 0;

  const innovTier = (ps.innovation_scope?.tier || 'Moderate').toLowerCase();
  const effortTier = (ps.invention_effort?.tier || 'Medium').toLowerCase();
  const verdictColor = VERDICT_COLOR[ps.verdict?.tier || 'YELLOW'];
  const isSoftware = ps.category === 'Software';

  return (
    <article
      className="ps-card"
      onClick={() => onSelect(ps)}
      tabIndex={0}
      role="button"
      aria-label={`Open ${ps.ps_number}`}
      onKeyDown={(e) => { if (e.key === 'Enter') onSelect(ps); }}
    >
      {/* Header row */}
      <div className="card-top">
        <span className="card-id-row">
          <span className="card-verdict-dot" style={{ background: verdictColor }} />
          <span className="card-ps-id">{ps.ps_number}</span>
        </span>
        <span className={`card-cat-pill ${isSoftware ? 'sw' : 'hw'}`}>
          <i className={`fa-solid fa-${isSoftware ? 'code' : 'microchip'}`}></i>
          {ps.category}
        </span>
      </div>

      {/* Title */}
      <h3 className="card-title">{ps.title}</h3>

      {/* Organisation */}
      <div className="card-org">
        <i className="fa-solid fa-building-columns"></i>
        <span>{ps.org}</span>
      </div>

      {/* Theme */}
      <div className="card-theme-row">
        <span className="card-theme-pill">
          <i className="fa-solid fa-tag"></i> {ps.theme}
        </span>
      </div>

      {/* Tier pills */}
      <div className="card-tier-row">
        <span className={`tier-pill tp-${innovTier}`}>{ps.innovation_scope?.tier || 'Moderate'}</span>
        <span className={`tier-pill tp-effort-${effortTier}`}>{ps.invention_effort?.tier || 'Medium'} Effort</span>
      </div>

      {/* Footer */}
      <div className="card-foot">
        <span className={soon ? 'soon' : ''}>{deadlineLabel}</span>
        <span className="ideas-snap" title="Snapshot — no live SIH API">
          Ideas: {ps.ideas || '—'}
        </span>
      </div>
    </article>
  );
}
