import React, { useState, useEffect } from 'react';

const VERDICT_EMOJI  = { GREEN: '🟢', YELLOW: '🟡', RED: '🔴' };
const VERDICT_LABEL  = { GREEN: 'Strong Pick', YELLOW: 'Workable', RED: 'High Risk' };

const TABS = [
  { id: 'overview',  label: 'Overview' },
  { id: 'analysis',  label: 'Analysis' },
  { id: 'evaluator', label: 'Evaluator Lens' },
  { id: 'plan',      label: '36-Hr Plan' }
];

const SC_ORDER  = ['innovation','invention','technical_feasibility','impact_benefits','architecture'];
const SC_PREFIX = { innovation:'tp', invention:'tp', technical_feasibility:'tp', impact_benefits:'tp', architecture:'tp' };

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

  const verdict  = ps.verdict || { tier: 'YELLOW' };
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

  const vcClass  = verdict.tier === 'GREEN' ? 'vc-green' : verdict.tier === 'RED' ? 'vc-red' : 'vc-yellow';
  const vbClass  = verdict.tier.toLowerCase();

  return (
    <div
      className="overlay open"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="panel" role="dialog" aria-modal="true" aria-label="Problem statement details">
        <button className="panel-close" onClick={onClose} aria-label="Close">×</button>

        {/* Sticky header */}
        <div className="panel-head">
          <div className="panel-badges">
            <span className="panel-ps-id">{ps.ps_number}</span>
            <span className={`verdict-badge verdict-${vbClass}`}>
              {VERDICT_EMOJI[verdict.tier]} {verdict.tier} · {VERDICT_LABEL[verdict.tier]}
            </span>
          </div>

          <h2 className="panel-title">{ps.title}</h2>

          <div className="panel-meta">
            <span className="p-chip"><i className="fa-solid fa-building-columns"></i> {ps.org}</span>
            <span className="p-chip"><i className={`fa-solid fa-${catIcon}`}></i> {ps.category}</span>
            <span className="p-chip"><i className="fa-solid fa-tag"></i> {ps.theme}</span>
          </div>
          <div className="panel-stats">
            <span className={soon ? 'soon' : ''}>
              <i className="fa-solid fa-calendar"></i> Deadline: {ps.deadline || 'TBA'}
            </span>
            <span title="Snapshot data — SIH has no public API for live counts">
              <i className="fa-solid fa-chart-simple"></i> Ideas: {ps.ideas || 'N/A'}
              <i className="fa-solid fa-circle-info snap-ico" style={{marginLeft:'4px'}}></i>
            </span>
          </div>

          <div className="tab-bar">
            {TABS.map(t => (
              <button
                key={t.id}
                type="button"
                className={`tab-btn ${tab === t.id ? 'active' : ''}`}
                onClick={() => setTab(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="panel-body">

          {/* ── OVERVIEW ── */}
          {tab === 'overview' && (
            <>
              {pd.plain_summary && (
                <>
                  <div className="p-heading"><span className="p-ico"><i className="fa-solid fa-align-left"></i></span> In Plain Terms</div>
                  <div className="p-box accent">{pd.plain_summary}</div>
                </>
              )}

              {pd.why_it_matters && (
                <div className="p-box warn">
                  <i className="fa-solid fa-lightbulb"></i>
                  <span><strong>Why it matters: </strong>{pd.why_it_matters}</span>
                </div>
              )}

              {pains.length > 0 && (
                <>
                  <div className="p-heading"><span className="p-ico"><i className="fa-solid fa-triangle-exclamation"></i></span> Core Pain Points</div>
                  <ul className="p-pain-list">
                    {pains.map((p, i) => (
                      <li key={i}><i className="fa-solid fa-circle-exclamation"></i><span>{p}</span></li>
                    ))}
                  </ul>
                </>
              )}

              {ps.background && (
                <>
                  <div className="p-heading"><span className="p-ico"><i className="fa-solid fa-book-open"></i></span> Background</div>
                  <div className="p-box">{ps.background}</div>
                </>
              )}

              {ps.description && (
                <>
                  <div className="p-heading"><span className="p-ico"><i className="fa-solid fa-list-check"></i></span> What They're Asking For</div>
                  <div className="p-box">{ps.description}</div>
                </>
              )}

              <div className="p-heading"><span className="p-ico"><i className="fa-solid fa-circle-check"></i></span> Expected Solution Highlights</div>
              {bullets.length > 0 ? (
                <ul className="p-list">
                  {bullets.map((b, i) => (
                    <li key={i}><i className="fa-solid fa-check"></i><span>{b}</span></li>
                  ))}
                </ul>
              ) : (
                <p className="p-empty">Full breakdown available at sih.gov.in</p>
              )}
            </>
          )}

          {/* ── ANALYSIS ── */}
          {tab === 'analysis' && (
            <>
              <div className="p-heading"><span className="p-ico"><i className="fa-solid fa-wand-magic-sparkles"></i></span> Innovation Scope</div>
              <div className="p-callout">
                <span className={`tier-pill tp-${innov.tier.toLowerCase()}`}>{innov.tier}</span>
                <p>{innov.reason}</p>
              </div>

              <div className="p-heading"><span className="p-ico"><i className="fa-solid fa-gears"></i></span> Invention Effort</div>
              <div className="p-callout">
                <span className={`tier-pill tp-${effort.tier.toLowerCase()}`}>{effort.tier}</span>
                <div>
                  <p>Scored from distinct component asks and integration complexity.</p>
                  <p style={{ fontSize: '12px', color: 'var(--txt-3)', marginTop: '4px' }}>
                    Effort score: <strong style={{ color: 'var(--txt-2)' }}>{effort.score || 0}</strong>
                  </p>
                </div>
              </div>

              <div className="p-heading"><span className="p-ico"><i className="fa-solid fa-chart-line"></i></span> Competitive Landscape</div>
              <div className="p-callout">
                <span className={`tier-pill tp-${(cl.tier||'medium').toLowerCase()}`}>{cl.tier || 'Medium'} Crowding</span>
                <p>{cl.reason || '—'}</p>
              </div>
              {cl.common_approaches && (
                <div className="p-box"><strong>What most teams build: </strong>{cl.common_approaches}</div>
              )}
              {cl.differentiation_angle && (
                <div className="p-box" style={{ background: 'rgba(34,197,94,0.08)', borderColor: 'rgba(34,197,94,0.18)', color: '#86efac' }}>
                  <strong>How to stand out: </strong>{cl.differentiation_angle}
                </div>
              )}

              <div className="p-heading"><span className="p-ico"><i className="fa-solid fa-table-cells"></i></span> SWOT Snapshot</div>
              <div className="swot-grid">
                {swot.strengths?.length > 0 && (
                  <div className="swot-cell swot-s">
                    <div className="swot-head"><i className="fa-solid fa-shield-halved"></i> Strengths</div>
                    <ul>{swot.strengths.map((s,i) => <li key={i}>{s}</li>)}</ul>
                  </div>
                )}
                {swot.weaknesses?.length > 0 && (
                  <div className="swot-cell swot-w">
                    <div className="swot-head"><i className="fa-solid fa-bug"></i> Weaknesses</div>
                    <ul>{swot.weaknesses.map((w,i) => <li key={i}>{w}</li>)}</ul>
                  </div>
                )}
                {swot.opportunities?.length > 0 && (
                  <div className="swot-cell swot-o">
                    <div className="swot-head"><i className="fa-solid fa-rocket"></i> Opportunities</div>
                    <ul>{swot.opportunities.map((o,i) => <li key={i}>{o}</li>)}</ul>
                  </div>
                )}
                {swot.threats?.length > 0 && (
                  <div className="swot-cell swot-t">
                    <div className="swot-head"><i className="fa-solid fa-triangle-exclamation"></i> Threats</div>
                    <ul>{swot.threats.map((t,i) => <li key={i}>{t}</li>)}</ul>
                  </div>
                )}
              </div>
            </>
          )}

          {/* ── EVALUATOR LENS ── */}
          {tab === 'evaluator' && (
            <>
              <div className="p-heading"><span className="p-ico"><i className="fa-solid fa-clipboard-check"></i></span> Evaluation Scorecard</div>
              <div className="scorecard">
                {SC_ORDER.map(k => {
                  const axis = sc[k];
                  if (!axis) return null;
                  return (
                    <div key={k} className="score-row">
                      <div className="score-top">
                        <span className="score-label">{axis.label}</span>
                        <span className={`tier-pill tp-${axis.tier.toLowerCase()}`}>{axis.tier}</span>
                      </div>
                      <p className="score-note">{axis.note}</p>
                    </div>
                  );
                })}
              </div>

              <div className="p-heading"><span className="p-ico"><i className="fa-solid fa-gavel"></i></span> Overall Verdict</div>
              <div className={`verdict-card ${vcClass}`}>
                <div className="verdict-title">{VERDICT_EMOJI[verdict.tier]} {verdict.tier} Verdict</div>
                <p>{verdict.why}</p>
              </div>
              <div className="v-bullets">
                {verdict.strength && <div className="v-item v-strength"><strong>Key Strength: </strong>{verdict.strength}</div>}
                {verdict.risk     && <div className="v-item v-risk"><strong>Main Risk: </strong>{verdict.risk}</div>}
                {verdict.validate && <div className="v-item v-validate"><strong>Validation Check: </strong>{verdict.validate}</div>}
              </div>

              <div className="p-heading"><span className="p-ico"><i className="fa-solid fa-circle-question"></i></span> What Evaluators Will Ask</div>
              {qs.length > 0 ? (
                <div className="q-list">
                  {qs.map((q, i) => (
                    <div key={i} className="q-item">
                      <span className="q-num">Q{i + 1}</span>
                      <span>{q}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="p-empty">No evaluator questions listed for this PS.</p>
              )}
            </>
          )}

          {/* ── 36-HR PLAN ── */}
          {tab === 'plan' && (
            <>
              <div className="p-heading"><span className="p-ico"><i className="fa-solid fa-stopwatch"></i></span> 36-Hour Execution Plan</div>
              <div className="plan-list">
                {[
                  { stage: plan.stage_idea,        num: '01' },
                  { stage: plan.stage_prototype,   num: '02' },
                  { stage: plan.stage_integration, num: '03' },
                  { stage: plan.stage_polish,      num: '04' }
                ].map(({ stage, num }) => {
                  if (!stage) return null;
                  return (
                    <div key={num} className="plan-phase">
                      <div className="plan-head">
                        <span className="plan-num">{num}</span>
                        <h4>{stage.label}</h4>
                      </div>
                      <ul>
                        {(stage.items || []).map((item, idx) => (
                          <li key={idx}><i className="fa-solid fa-angle-right"></i><span>{item}</span></li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
}
