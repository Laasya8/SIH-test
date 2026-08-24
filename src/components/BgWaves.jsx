import React from 'react';

export default function BgWaves() {
  return (
    <div className="bg-waves-layer" aria-hidden="true">
      <svg className="bg-wave bg-wave-top" viewBox="0 0 1440 600" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,160 C320,300 420,40 720,180 C1020,320 1180,100 1440,220 L1440,0 L0,0 Z" fill="url(#wave-grad-1)" opacity="0.4" />
        <path d="M0,260 C260,100 500,340 820,180 C1140,20 1280,280 1440,160 L1440,0 L0,0 Z" fill="url(#wave-grad-2)" opacity="0.3" />
        <defs>
          <linearGradient id="wave-grad-1" x1="0%" y1="0%" x2="100%" y2="80%">
            <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.85" />
            <stop offset="45%" stopColor="#2563eb" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="wave-grad-2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0284c7" stopOpacity="0.55" />
            <stop offset="55%" stopColor="#1d4ed8" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#061124" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      <svg className="bg-wave bg-wave-mid" viewBox="0 0 1440 600" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,320 C360,180 640,420 1020,240 C1220,140 1340,280 1440,320 L1440,600 L0,600 Z" fill="url(#wave-grad-3)" opacity="0.25" />
        <defs>
          <linearGradient id="wave-grad-3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0369a1" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#1e40af" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#050d1a" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
