import React from 'react';

export default function WorkshopBanner({ onExplore }) {
  return (
    <section className="workshop-section" id="workshopSection">
      <div className="container">
        <div className="workshop-card">
          <div className="ws-tags">
            <span className="ws-tag live">Live Guidance Session</span>
            <span className="ws-tag">Mentored by SIH Finalists</span>
            <span className="ws-tag">CSI Exclusive</span>
            <span className="ws-tag">Free of cost</span>
          </div>

          <div className="ws-inner">
            <div className="ws-body">
              <h2>SIH 2026 Guidance &amp; Prep Session</h2>
              <p>
                A dedicated guidance session by CSI VNRVJIET, where senior SIH finalists share their experience and insights on 
                navigating the competition — from choosing the right problem statement to delivering the final presentation. No workshop, 
                no lectures — just real experiences, practical advice, and an open space to ask questions.
              </p>
              <ul className="ws-points">
                <li>
                  <i className="fa-solid fa-bullseye"></i>
                  How to shortlist a PS that genuinely fits your team's strengths and tech stack
                </li>
                <li>
                  <i className="fa-solid fa-file-powerpoint"></i>
                  What evaluators actually look for in idea decks, demos, and architecture
                </li>
                <li>
                  <i className="fa-solid fa-shield-halved"></i>
                  Common elimination mistakes and how to avoid them at every round
                </li>
                <li>
                  <i className="fa-solid fa-comments"></i>
                  Open Q&amp;A with seniors who've made it to SIH finals
                </li>
              </ul>
              <div className="ws-actions">
                <button type="button" className="btn btn-primary" onClick={onExplore}>
                  Explore Problem Statements <i className="fa-solid fa-arrow-right"></i>
                </button>
                <a
                  href="#register"
                  className="btn btn-ghost"
                  onClick={(e) => e.preventDefault()}
                >
                  Register Now <i className="fa-solid fa-user-plus"></i>
                </a>
              </div>
            </div>

            <div className="ws-poster-placeholder">
              <i className="fa-solid fa-image"></i>
              <p>Session Poster</p>
              <span>Replace <code>with poster</code></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
