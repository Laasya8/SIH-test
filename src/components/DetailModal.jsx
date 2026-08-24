import React, { useState, useEffect } from 'react';

const VERDICT_EMOJI  = { GREEN: '🟢', YELLOW: '🟡', RED: '🔴' };
const VERDICT_LABEL  = { GREEN: 'Strong Pick', YELLOW: 'Workable Pick', RED: 'High Risk' };

const TABS = [
  { id: 'overview',  label: 'Problem Snapshot', icon: 'fa-compass' },
  { id: 'analysis',  label: 'Technical Breakdown', icon: 'fa-microchip' },
  { id: 'evaluator', label: "Judge's Perspective & Prep", icon: 'fa-shield-halved' },
  { id: 'plan',      label: '36-Hour Build Plan', icon: 'fa-stopwatch' }
];

const SC_ORDER  = ['innovation','invention','technical_feasibility','impact_benefits','architecture'];

function daysUntil(d) {
  if (!d) return null;
  const t = new Date(d + 'T00:00:00'), n = new Date();
  n.setHours(0,0,0,0);
  return Math.round((t - n) / 86400000);
}

export default function DetailModal({ ps, onClose }) {
  const [tab, setTab] = useState('overview');

  useEffect(() => {
    const esc = (e) => { if (e.key === 'Escape') onClose(); };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', esc);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', esc); };
  }, [onClose]);

  useEffect(() => { setTab('overview'); }, [ps]);

  if (!ps) return null;

  const verdict  = ps.verdict || { tier: 'GREEN' };
  const catIcon  = ps.category === 'Hardware' ? 'microchip' : 'code';
  const days     = daysUntil(ps.deadline_date);
  const soon     = days !== null && days <= 14 && days >= 0;

  const pd       = ps.problem_decode || {};
  const pains    = pd.pain_points || [];
  const bullets  = ps.expected_solution_bullets || [];
  const innov    = ps.innovation_scope   || { tier: 'Moderate', reason: '' };
  const effort   = ps.invention_effort   || { tier: 'Medium', score: 0 };
  const cl       = ps.competitive_landscape || {};
  const swot     = ps.swot || {};
  const sc       = ps.evaluation_scorecard || {};
  const qs       = ps.evaluator_questions || [];
  const plan     = ps.build_plan_36h || {};

  const vbClass  = (verdict.tier || 'GREEN').toLowerCase();

  return (
    <div
      className="modal-overlay open"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="modal-dialog" role="dialog" aria-modal="true" aria-label="Problem statement details">
        {/* Floating Close Button */}
        <button className="modal-close-btn" onClick={onClose} aria-label="Close dialog">
          <i className="fa-solid fa-xmark"></i>
        </button>

        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-eyebrow">
            <span className="modal-ps-badge">
              <i className="fa-solid fa-hashtag"></i> {ps.ps_number}
            </span>
            <span className={`modal-verdict-pill verdict-${vbClass}`}>
              {VERDICT_EMOJI[verdict.tier]} {VERDICT_LABEL[verdict.tier] || verdict.tier}
            </span>
            <span className="modal-csi-badge">
              <i className="fa-solid fa-award"></i> CSI Mentorship Analysis
            </span>
          </div>

          <h2 className="modal-title">{ps.title}</h2>

          <div className="modal-meta-row">
            <div className="modal-meta-pill">
              <i className="fa-solid fa-building-columns"></i>
              <span>{ps.org}</span>
            </div>
            <div className="modal-meta-pill">
              <i className={`fa-solid fa-${catIcon}`}></i>
              <span>{ps.category}</span>
            </div>
            <div className="modal-meta-pill">
              <i className="fa-solid fa-tag"></i>
              <span>{ps.theme}</span>
            </div>
            <div className={`modal-meta-pill ${soon ? 'soon' : ''}`}>
              <i className="fa-solid fa-calendar-check"></i>
              <span>Deadline: {ps.deadline || 'TBA'}</span>
            </div>
          </div>

          {/* Segmented Tab Navigation */}
          <div className="modal-tabs">
            {TABS.map(t => (
              <button
                key={t.id}
                type="button"
                className={`modal-tab-btn ${tab === t.id ? 'active' : ''}`}
                onClick={() => setTab(t.id)}
              >
                <i className={`fa-solid ${t.icon}`}></i>
                <span>{t.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="modal-body">

          {/* ── TAB 1: OVERVIEW ── */}
          {tab === 'overview' && (
            <div className="modal-section-grid">
              {pd.plain_summary && (
                <div className="m-card m-card-accent">
                  <div className="m-card-header">
                    <i className="fa-solid fa-lightbulb"></i>
                    <h3>Executive Summary (In Plain Terms)</h3>
                  </div>
                  <p className="m-card-lead">{pd.plain_summary}</p>
                </div>
              )}

              {pd.why_it_matters && (
                <div className="m-card m-card-highlight">
                  <div className="m-card-header">
                    <i className="fa-solid fa-star"></i>
                    <h3>Strategic Impact &amp; Why It Matters</h3>
                  </div>
                  <p>{pd.why_it_matters}</p>
                </div>
              )}

              {pains.length > 0 && (
                <div className="m-card">
                  <div className="m-card-header text-danger">
                    <i className="fa-solid fa-triangle-exclamation"></i>
                    <h3>Critical Operational Pain Points</h3>
                  </div>
                  <ul className="m-danger-list">
                    {pains.map((p, i) => (
                      <li key={i}>
                        <i className="fa-solid fa-circle-xmark"></i>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {ps.background && (
                <div className="m-card">
                  <div className="m-card-header">
                    <i className="fa-solid fa-book-open"></i>
                    <h3>Background &amp; Regional Context</h3>
                  </div>
                  <p className="m-card-text">{ps.background}</p>
                </div>
              )}

              {ps.description && (
                <div className="m-card">
                  <div className="m-card-header">
                    <i className="fa-solid fa-list-check"></i>
                    <h3>Official Ministerial Scope</h3>
                  </div>
                  <p className="m-card-text">{ps.description}</p>
                </div>
              )}

              <div className="m-card m-card-success">
                <div className="m-card-header text-success">
                  <i className="fa-solid fa-circle-check"></i>
                  <h3>Mandatory Deliverables &amp; Expected Features</h3>
                </div>
                {bullets.length > 0 ? (
                  <ul className="m-check-list">
                    {bullets.map((b, i) => (
                      <li key={i}>
                        <i className="fa-solid fa-check"></i>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted">Refer to sih.gov.in for full specification.</p>
                )}
              </div>
            </div>
          )}

          {/* ── TAB 2: TECHNICAL ANALYSIS ── */}
          {tab === 'analysis' && (
            <div className="modal-section-grid">
              <div className="m-two-col">
                <div className="m-card">
                  <div className="m-card-header">
                    <i className="fa-solid fa-wand-magic-sparkles"></i>
                    <h3>Innovation Potential</h3>
                  </div>
                  <div className="m-badge-row">
                    <span className={`tier-pill tp-${innov.tier.toLowerCase()}`}>{innov.tier}</span>
                  </div>
                  <p className="m-card-text" style={{ marginTop: '8px' }}>{innov.reason}</p>
                </div>

                <div className="m-card">
                  <div className="m-card-header">
                    <i className="fa-solid fa-gears"></i>
                    <h3>Engineering Complexity</h3>
                  </div>
                  <div className="m-badge-row">
                    <span className={`tier-pill tp-${effort.tier.toLowerCase()}`}>{effort.tier} Effort</span>
                    <span className="m-score-tag">Score: <strong>{effort.score || 0}/15</strong></span>
                  </div>
                  <p className="m-card-text" style={{ marginTop: '8px' }}>
                    Multi-tier component architecture requiring structured API contracts and automated data ingest.
                  </p>
                </div>
              </div>

              <div className="m-card m-card-accent">
                <div className="m-card-header">
                  <i className="fa-solid fa-chart-line"></i>
                  <h3>Competitive Landscape &amp; Crowding</h3>
                </div>
                <div className="m-badge-row" style={{ marginBottom: '8px' }}>
                  <span className={`tier-pill tp-${(cl.tier||'medium').toLowerCase()}`}>{cl.tier || 'Medium'} Crowding</span>
                </div>
                <p className="m-card-text">{cl.reason || '—'}</p>

                {cl.differentiation_angle && (
                  <div className="m-diff-box">
                    <div className="m-diff-title">
                      <i className="fa-solid fa-trophy"></i>
                      <span>How To Stand Out &amp; Win:</span>
                    </div>
                    <p>{cl.differentiation_angle}</p>
                  </div>
                )}
              </div>

              <div className="m-card">
                <div className="m-card-header">
                  <i className="fa-solid fa-table-cells-large"></i>
                  <h3>SWOT Strategic Matrix</h3>
                </div>
                <div className="m-swot-grid">
                  {swot.strengths?.length > 0 && (
                    <div className="swot-box swot-s">
                      <div className="swot-title"><i className="fa-solid fa-shield-halved"></i> Strengths</div>
                      <ul>{swot.strengths.map((s, i) => <li key={i}>{s}</li>)}</ul>
                    </div>
                  )}
                  {swot.weaknesses?.length > 0 && (
                    <div className="swot-box swot-w">
                      <div className="swot-title"><i className="fa-solid fa-bug"></i> Weaknesses / Traps</div>
                      <ul>{swot.weaknesses.map((w, i) => <li key={i}>{w}</li>)}</ul>
                    </div>
                  )}
                  {swot.opportunities?.length > 0 && (
                    <div className="swot-box swot-o">
                      <div className="swot-title"><i className="fa-solid fa-rocket"></i> Opportunities</div>
                      <ul>{swot.opportunities.map((o, i) => <li key={i}>{o}</li>)}</ul>
                    </div>
                  )}
                  {swot.threats?.length > 0 && (
                    <div className="swot-box swot-t">
                      <div className="swot-title"><i className="fa-solid fa-triangle-exclamation"></i> Jury Scrutiny</div>
                      <ul>{swot.threats.map((t, i) => <li key={i}>{t}</li>)}</ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ── TAB 3: EVALUATOR LENS & DEFENSE ── */}
          {tab === 'evaluator' && (
            <div className="modal-section-grid">
              {/* Verdict Highlight */}
              <div className={`m-verdict-banner verdict-${vbClass}`}>
                <div className="m-vb-left">
                  <div className="m-vb-badge">{VERDICT_EMOJI[verdict.tier]} {verdict.tier} VERDICT</div>
                  <p className="m-vb-why">{verdict.why}</p>
                </div>
              </div>

              {/* Evaluation Scorecard */}
              <div className="m-card">
                <div className="m-card-header">
                  <i className="fa-solid fa-clipboard-check"></i>
                  <h3>Evaluation Scorecard Breakdown</h3>
                </div>
                <div className="m-scorecard-list">
                  {SC_ORDER.map(k => {
                    const axis = sc[k];
                    if (!axis) return null;
                    return (
                      <div key={k} className="m-score-item">
                        <div className="m-score-top">
                          <span className="m-score-axis">{axis.label}</span>
                          <span className={`tier-pill tp-${axis.tier.toLowerCase()}`}>{axis.tier}</span>
                        </div>
                        <p className="m-score-desc">{axis.note}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Evaluator Questions */}
              <div className="m-card">
                <div className="m-card-header text-primary">
                  <i className="fa-solid fa-person-chalkboard"></i>
                  <h3>Tough Questions the Jury Will Ask &amp; How to Prepare</h3>
                </div>
                {qs.length > 0 ? (
                  <div className="m-q-grid">
                    {qs.map((q, i) => (
                      <div key={i} className="m-q-card">
                        <div className="m-q-num">Q{i + 1}</div>
                        <p className="m-q-text">{q}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted">No evaluator questions listed for this statement.</p>
                )}
              </div>
            </div>
          )}

          {/* ── TAB 4: 36-HOUR BLUEPRINT ── */}
          {tab === 'plan' && (
            <div className="modal-section-grid">
              <div className="m-card m-card-accent">
                <div className="m-card-header">
                  <i className="fa-solid fa-stopwatch"></i>
                  <h3>36-Hour Hackathon Execution Roadmap</h3>
                </div>
                <p className="m-card-lead">
                  Disciplined milestone scheduling designed by CSI mentors to take your solution from zero to a winning demo.
                </p>
              </div>

              <div className="m-timeline">
                {[
                  { stage: plan.stage_idea,        num: '01', hours: '0 – 4h', color: '#60a5fa' },
                  { stage: plan.stage_prototype,   num: '02', hours: '4 – 22h', color: '#38bdf8' },
                  { stage: plan.stage_integration, num: '03', hours: '22 – 30h', color: '#818cf8' },
                  { stage: plan.stage_polish,      num: '04', hours: '30 – 36h', color: '#4ade80' }
                ].map(({ stage, num, hours, color }) => {
                  if (!stage) return null;
                  return (
                    <div key={num} className="m-timeline-phase">
                      <div className="m-phase-badge" style={{ borderColor: color, color }}>
                        <span className="m-phase-num">{num}</span>
                        <span className="m-phase-hours">{hours}</span>
                      </div>
                      <div className="m-phase-content">
                        <h4 className="m-phase-title">{stage.label}</h4>
                        <ul className="m-phase-tasks">
                          {(stage.items || []).map((item, idx) => (
                            <li key={idx}>
                              <i className="fa-solid fa-arrow-right"></i>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
