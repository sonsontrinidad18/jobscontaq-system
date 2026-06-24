"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { href: "/",           label: "Dashboard",  icon: "⊞" },
    { href: "/applicants", label: "Applicants", icon: "◎" },
  ];

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  function closeSidebar() {
    if (typeof window !== "undefined") {
      const sb = document.getElementById("layout-sidebar");
      const overlay = document.getElementById("layout-overlay");
      const btn = document.getElementById("layout-menu-btn");
      sb?.classList.remove("open");
      overlay?.classList.remove("open");
      if (btn) btn.textContent = "☰";
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Inter:wght@300;400;500;600&display=swap');
        .sb-root {
          display: flex; flex-direction: column;
          width: 250px; min-height: 100vh;
          background: #0F1C2E; flex-shrink: 0;
        }
        .sb-logo-wrap {
          padding: 1rem 1rem 1rem;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          display: flex; flex-direction: column; align-items: center;
        }
        .sb-logo-inner {
          width: 100%;
          padding: 0; display: flex;
          align-items: center; justify-content: center;
        }
        .sb-logo-img { display: block; width: 100%; max-width: 220px, height: auto; object-fit: contain; }
        .sb-logo-sub {
          font-family:'Inter',sans-serif; font-size:0.5625rem; font-weight:400;
          color:rgba(255,255,255,0.25); letter-spacing:0.1em;
          text-transform:uppercase; text-align:center; margin:0.85rem 0 0;
        }
        .sb-nav {
          flex:1; padding:1.25rem 1rem;
          display:flex; flex-direction:column; gap:0.25rem;
        }
        .sb-nav-label {
          font-family:'Inter',sans-serif; font-size:0.5625rem; font-weight:600;
          letter-spacing:0.14em; text-transform:uppercase;
          color:rgba(255,255,255,0.25); padding:0 0.6rem; margin-bottom:0.5rem;
        }
        .sb-link {
          display:flex; align-items:center; gap:0.65rem;
          padding:0.6rem 0.85rem; border-radius:3px;
          font-family:'Inter',sans-serif; font-size:0.8125rem; font-weight:500;
          color:rgba(255,255,255,0.5); text-decoration:none;
          transition:background .15s,color .15s;
          border-left:2px solid transparent;
        }
        .sb-link:hover { background:rgba(255,255,255,0.06); color:rgba(255,255,255,0.85); }
        .sb-link.active { background:rgba(201,168,76,0.1); color:#C9A84C; border-left-color:#C9A84C; font-weight:600; }
        .sb-link-icon { font-size:0.9rem; flex-shrink:0; opacity:0.7; }
        .sb-link.active .sb-link-icon { opacity:1; }
        .sb-footer {
          padding:1.25rem 1.5rem;
          border-top:1px solid rgba(255,255,255,0.07);
        }
        .sb-footer-text {
          font-family:'Inter',sans-serif; font-size:0.5625rem;
          color:rgba(255,255,255,0.18); letter-spacing:0.06em;
          text-transform:uppercase; margin:0; text-align:center;
        }
        .sb-gold-dot {
          display:inline-block; width:4px; height:4px;
          border-radius:50%; background:#C9A84C; opacity:0.5;
          vertical-align:middle; margin:0 0.35rem;
        }
      `}</style>

      <aside className="sb-root">
        <div className="sb-logo-wrap">
          <div className="sb-logo-inner">
            <Image
              src="/jobscontaq-logo.jpg"
              alt="JobsContaq Manpower Corp"
              width={220} height={90} priority
              className="sb-logo-img"
            />
          </div>
          <p className="sb-logo-sub"> Recruitment Management System</p>
        </div>

        <nav className="sb-nav">
          <p className="sb-nav-label">Navigation</p>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeSidebar}
              className={`sb-link${isActive(item.href) ? " active" : ""}`}
            >
              <span className="sb-link-icon">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="sb-footer">
          <p className="sb-footer-text">
            JobsContaq <span className="sb-gold-dot" /> 2025
          </p>
        </div>
      </aside>
    </>
  );
}