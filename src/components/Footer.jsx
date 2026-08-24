import React from 'react';

export default function Footer({ onNavigate }) {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">

          <div className="footer-brand-col">
            <a
              href="#home"
              className="footer-logo-wrap"
              onClick={(e) => { e.preventDefault(); onNavigate('home'); }}
            >
              <img src="/csilogo.png" alt="CSI Logo" className="footer-logo-img" />
              <div>
                <div className="footer-brand-name">CSI</div>
                <div className="footer-brand-sub">VNRVJIET Student Chapter</div>
              </div>
            </a>
            <p className="footer-tagline">
              Empowering students to build, innovate, and compete at Smart India Hackathon and beyond.
            </p>
            {/* Social links */}
            <div className="footer-socials">
              <a
                href="https://www.instagram.com/csi_vnrvjiet?igsh=MXgya2w1eTg1eHhheg%3D%3D"
                target="_blank"
                rel="noreferrer"
                className="social-btn instagram"
                aria-label="CSI VNRVJIET on Instagram"
              >
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a
                href="https://www.linkedin.com/company/csi-vnrvjiet/posts/?feedView=all"
                target="_blank"
                rel="noreferrer"
                className="social-btn linkedin"
                aria-label="CSI VNRVJIET on LinkedIn"
              >
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h5>Navigate</h5>
            <ul>
              <li><button className="footer-link" onClick={() => onNavigate('home')}>Home</button></li>
              <li><button className="footer-link" onClick={() => onNavigate('workshopSection')}>Session Details</button></li>
              <li><button className="footer-link" onClick={() => onNavigate('toolbarSection')}>SIH 2026 Statements</button></li>
            </ul>
          </div>

          <div className="footer-col">
            <h5>Resources</h5>
            <ul>
              <li>
                <a
                  href="https://sih.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="footer-link"
                  style={{ display: 'inline' }}
                >
                  sih.gov.in (Official)
                </a>
              </li>
              <li>
                <a
                  href="https://vnrvjietcsi.com"
                  target="_blank"
                  rel="noreferrer"
                  className="footer-link"
                  style={{ display: 'inline' }}
                >
                  CSI VNRVJIET Website
                </a>
              </li>
              {/* <li><span className="footer-link" style={{ cursor: 'default' }}>PS Analysis by CSI Team</span></li> */}
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} CSI VNRVJIET Student Chapter · All rights reserved</span>
          <div className="footer-bottom-right">
            <span>Problem statements sourced from <a href="https://sih.gov.in" target="_blank" rel="noreferrer">sih.gov.in</a></span>
            {/* <div className="footer-socials footer-socials-sm">
              <a href="https://www.instagram.com/csi_vnrvjiet?igsh=MXgya2w1eTg1eHhheg%3D%3D" target="_blank" rel="noreferrer" className="social-btn instagram" aria-label="Instagram">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href="https://www.linkedin.com/company/csi-vnrvjiet/posts/?feedView=all" target="_blank" rel="noreferrer" className="social-btn linkedin" aria-label="LinkedIn">
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
}
