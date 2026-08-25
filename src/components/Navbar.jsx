import React, { useState } from 'react';

export default function Navbar({ activeSection, onNavigate }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { id: 'home', label: 'Home' },
    { id: 'workshopSection', label: 'Guidance Session' },
    { id: 'toolbarSection', label: 'SIH 2026 PS' }
  ];

  const go = (id) => { onNavigate(id); setMobileOpen(false); };

  return (
    <header className="site-header" id="siteHeader">
      <div className="container">
        <div className="header-inner">

          {/* VNR & CSI Logos — Centered & Optically Aligned */}
          <a
            href="#home"
            className="logo-wrap"
            onClick={(e) => { e.preventDefault(); go('home'); }}
            title="CSI VNRVJIET"
            aria-label="CSI VNRVJIET Home"
          >
            <div className="logo-group">
              <img
                src="/VNRVJIET_White_Text.webp"
                alt="VNR VJIET"
                className="logo-vnr"
              />
              <span className="logo-divider" aria-hidden="true" />
              <img
                src="/csilogo.png"
                alt="CSI VNRVJIET"
                className="logo-csi"
              />
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="main-nav" id="mainNav" aria-label="Main navigation">
            <div className="nav-pill-track">
              {links.map(l => (
                <button
                  key={l.id}
                  type="button"
                  className={`nav-btn ${activeSection === l.id ? 'active' : ''}`}
                  onClick={() => go(l.id)}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </nav>

          {/* Actions */}
          <div className="header-actions">
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={() => go('workshopSection')}
            >
              Register
            </button>
            <button
              type="button"
              className="hamburger"
              onClick={() => setMobileOpen(v => !v)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="mobile-nav">
          <ul>
            {links.map(l => (
              <li key={l.id}>
                <button
                  type="button"
                  className={`mobile-nav-btn ${activeSection === l.id ? 'active' : ''}`}
                  onClick={() => go(l.id)}
                >
                  {l.label}
                </button>
              </li>
            ))}
            <li key="mobile-register">
              <button
                type="button"
                className="mobile-nav-btn"
                style={{ background: 'var(--blue-primary)', color: '#fff', textAlign: 'center', marginTop: '4px' }}
                onClick={() => go('workshopSection')}
              >
                Register
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
