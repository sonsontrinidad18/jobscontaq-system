"use client";

import { useState } from "react";

export default function MobileNav({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <style>{`
        .mn-overlay {
          display: none;
          position: fixed; inset: 0;
          background: rgba(15,28,46,0.55);
          z-index: 40; cursor: pointer;
        }
        .mn-overlay.open { display: block; }
        .mn-sidebar {
          position: fixed; top: 0; left: 0;
          height: 100vh; z-index: 50;
          transform: translateX(-100%);
          transition: transform 0.25s ease;
        }
        .mn-sidebar.open { transform: translateX(0); }
        .mn-toggle {
          display: none;
          position: fixed; bottom: 1.25rem; right: 1.25rem;
          z-index: 60; width: 48px; height: 48px;
          border-radius: 50%; background: #0F1C2E;
          color: #C9A84C; border: 2px solid #C9A84C;
          font-size: 1.25rem; cursor: pointer;
          align-items: center; justify-content: center;
          box-shadow: 0 4px 16px rgba(15,28,46,0.3);
          transition: background 0.15s;
        }
        .mn-toggle:hover { background: #C9A84C; color: #0F1C2E; }
        @media (max-width: 768px) {
          .mn-toggle { display: flex; }
          .mn-sidebar { position: fixed !important; }
        }
        @media (min-width: 769px) {
          .mn-sidebar {
            position: static !important;
            transform: none !important;
          }
        }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #F7F5F0; }
        ::-webkit-scrollbar-thumb { background: #D8D4CC; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: #C9A84C; }
      `}</style>

      {/* Overlay */}
      <div
        className={`mn-overlay${open ? " open" : ""}`}
        onClick={() => setOpen(false)}
      />

      {/* Sidebar wrapper */}
      <div className={`mn-sidebar${open ? " open" : ""}`}>
        {/* Pass close fn to children via context isn't possible here,
            so sidebar closes via the Sidebar component's own link clicks */}
        {children}
      </div>

      {/* Toggle button */}
      <button
        className="mn-toggle"
        onClick={() => setOpen((v) => !v)}
        aria-label="Toggle navigation"
      >
        {open ? "✕" : "☰"}
      </button>
    </>
  );
}