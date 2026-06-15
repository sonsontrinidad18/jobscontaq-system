"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Dashboard", icon: "⊞" },
    { href: "/applicants", label: "Applicants", icon: "◎" },
    { href: "/workers", label: "Workers", icon: "◈" },
  ];

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');

        .sb-root {
          display: flex;
          flex-direction: column;
          width: 150px;
          min-height: 100vh;
          background: #0F1C2E;
          flex-shrink: 0;
        }

        /* ───────── Logo ───────── */
        .sb-logo-wrap {
          background: #ffffff;
          padding: 10px;
          border-bottom: 3px solid #C9A84C;
        }

        .sb-logo-img {
          width: 100%;
          height: auto;
          display: block;
          object-fit: contain;
        }

        .sb-logo-sub {
          font-family: 'Inter', sans-serif;
          font-size: 0.65rem;
          font-weight: 600;
          color: rgba(255,255,255,0.4);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          text-align: center;
          margin: 0.9rem 0;
        }

        /* ───────── Navigation ───────── */
        .sb-nav {
          flex: 1;
          padding: 1.25rem 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .sb-nav-label {
          font-family: 'Inter', sans-serif;
          font-size: 0.5625rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.25);
          padding: 0 0.6rem;
          margin-bottom: 0.5rem;
        }

        .sb-link {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          padding: 0.75rem 0.85rem;
          border-radius: 6px;
          font-family: 'Inter', sans-serif;
          font-size: 0.875rem;
          font-weight: 500;
          color: rgba(255,255,255,0.6);
          text-decoration: none;
          transition: all 0.2s ease;
          border-left: 3px solid transparent;
        }

        .sb-link:hover {
          background: rgba(255,255,255,0.06);
          color: white;
        }

        .sb-link.active {
          background: rgba(201,168,76,0.15);
          color: #F4C542;
          border-left-color: #F4C542;
          font-weight: 600;
        }

        .sb-link-icon {
          font-size: 0.9rem;
          flex-shrink: 0;
        }

        /* ───────── Footer ───────── */
        .sb-footer {
          padding: 1rem;
          border-top: 1px solid rgba(255,255,255,0.08);
        }

        .sb-footer-text {
          font-family: 'Inter', sans-serif;
          font-size: 0.65rem;
          color: rgba(255,255,255,0.25);
          text-align: center;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin: 0;
        }

        .sb-gold-dot {
          display: inline-block;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #C9A84C;
          margin: 0 6px;
          vertical-align: middle;
        }
      `}</style>

      <aside className="sb-root">

        {/* Logo */}
        <div className="sb-logo-wrap">
          <Image
            src="/jobscontaq-logo.jpg"
            alt="JobsContaq Manpower Corp"
            width={500}
            height={120}
            priority
            className="sb-logo-img"
          />
        </div>

        <p className="sb-logo-sub">
          MANAGEMENT SYSTEM
        </p>

        {/* Navigation */}
        <nav className="sb-nav">
          <p className="sb-nav-label">Navigation</p>

          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`sb-link${isActive(item.href) ? " active" : ""}`}
            >
              <span className="sb-link-icon">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="sb-footer">
          <p className="sb-footer-text">
            JobsContaq
            <span className="sb-gold-dot" />
            2025
          </p>
        </div>

      </aside>
    </>
  );
}