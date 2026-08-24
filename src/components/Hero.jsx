import React, { useEffect, useRef } from 'react';

function useCountUp(target, duration = 1400) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const isSlash = String(target).includes('/');
    if (isSlash) {
      // handle "172/54"
      const [a, b] = target.split('/').map(Number);
      let start = null;
      const step = (ts) => {
        if (!start) start = ts;
        const prog = Math.min((ts - start) / duration, 1);
        const ease = 1 - Math.pow(1 - prog, 3);
        el.innerHTML = `${Math.round(a * ease)}<span class="hstat-slash"> /</span> ${Math.round(b * ease)}`;
        if (prog < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    } else {
      const num = parseInt(target, 10);
      let start = null;
      const step = (ts) => {
        if (!start) start = ts;
        const prog = Math.min((ts - start) / duration, 1);
        const ease = 1 - Math.pow(1 - prog, 3);
        el.textContent = Math.round(num * ease);
        if (prog < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }
  }, [target, duration]);
  return ref;
}

function StatNum({ value, label }) {
  const ref = useCountUp(value);
  return (
    <div className="hstat">
      <span className="hstat-num" ref={ref}>{value}</span>
      <span className="hstat-lbl">{label}</span>
    </div>
  );
}

export default function Hero({ onExplore }) {
  return (
    <section className="hero-section" id="home">
      <div className="container hero-content">
        <div className="hero-eyebrow">
          <i></i>
          CSI VNRVJIET PRESENTS
        </div>

        <h1 className="hero-title">
          Smart India Hackathon 2026
          <span className="line2">Problem Statements Hub</span>
        </h1>

        <p className="hero-desc">
          All 226 official SIH 2026 problem statements — each with domain analysis, 
          innovation tier scoring, evaluator prep questions, and a 36-hour roadmap.
        </p>

        <div className="hero-stats-row">
          <StatNum value="226" label="Problem Statements" />
          <div className="hstat-divider" />
          <StatNum value="18" label="Domains" />
          <div className="hstat-divider" />
          <StatNum value="30" label="Ministries" />
          <div className="hstat-divider" />
          <StatNum value="172/54" label="Software / Hardware" />
        </div>

        <button type="button" className="btn btn-primary" onClick={onExplore}>
          Browse All Statements &nbsp;<i className="fa-solid fa-arrow-down"></i>
        </button>
      </div>
    </section>
  );
}
