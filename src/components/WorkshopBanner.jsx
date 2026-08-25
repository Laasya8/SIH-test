import React from 'react';

export default function WorkshopBanner({ onExplore }) {
  return (
    <section className="workshop-section" id="workshopSection">
      <div className="container">
        <div className="workshop-card highlighted-workshop-card">
          {/* Ambient Glow Elements */}
          <div className="ws-glow-backdrop" aria-hidden="true" />

          <div className="ws-tags">
            <span className="ws-tag featured">
              ✨ Featured Guidance Session
            </span>
            <span className="ws-tag live">Live Prep</span>
            <span className="ws-tag">Mentored by SIH Finalists</span>
            <span className="ws-tag">CSI Exclusive</span>
            <span className="ws-tag tag-free">100% Free</span>
          </div>

          <div className="ws-inner">
            <div className="ws-body">
              <h2>
                SIH 2026 Guidance &amp; Strategy Session
                <span className="ws-badge-sub">Fast-Track Your Hackathon Journey</span>
              </h2>
              <p>
                A dedicated mentorship and guidance session hosted by CSI VNRVJIET. Connect with past national SIH finalists and student leads to learn how to pick winning problem statements, formulate architectural blueprints, and impress the evaluation panel.
              </p>
              <ul className="ws-points">
                <li>
                  <i className="fa-solid fa-bullseye"></i>
                  <span><b>Strategic PS Selection:</b> How to shortlist a problem statement that aligns with your team's core technical strengths</span>
                </li>
                <li>
                  <i className="fa-solid fa-file-powerpoint"></i>
                  <span><b>Winning Pitch Decks:</b> What evaluators look for in architecture diagrams, workflow models, and feasibility scores</span>
                </li>
                <li>
                  <i className="fa-solid fa-shield-halved"></i>
                  <span><b>Elimination Traps:</b> Pitfalls that disqualify teams during initial screening and how to bypass them</span>
                </li>
                <li>
                  <i className="fa-solid fa-comments"></i>
                  <span><b>Live Interactive Q&amp;A:</b> Ask questions directly to seniors with podium finishes at SIH</span>
                </li>
              </ul>
              <div className="ws-actions">
                <button
                  type="button"
                  className="btn btn-primary btn-highlight"
                  onClick={onExplore}
                >
                  Browse Problem Statements <i className="fa-solid fa-arrow-right"></i>
                </button>
                <a
                  href="#register"
                  className="btn btn-glow-action"
                  onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo({ top: document.getElementById('workshopSection')?.offsetTop - 90, behavior: 'smooth' });
                  }}
                >
                  <i className="fa-solid fa-user-plus"></i> Register for Session
                </a>
              </div>
            </div>

            <div className="ws-poster-box">
              <div className="ws-poster-inner">
                <div className="ws-poster-icon">
                  <i className="fa-solid fa-graduation-cap"></i>
                </div>
                <h4>CSI Mentorship Hub</h4>
                <p>Exclusive Guidance &amp; Live Q&amp;A</p>
                <span className="ws-poster-pill">Open for All Branches</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
