"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-client";

export default function Header() {
  const router = useRouter();
  const supabase = createClient();

  const [open, setOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClick);

    return () =>
      document.removeEventListener("mousedown", handleClick);
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();

    router.replace("/login");
    router.refresh();
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Inter:wght@300;400;500;600&display=swap');

        .hdr-root{
          display:flex;
          justify-content:space-between;
          align-items:center;
          height:64px;
          padding:0 2.5rem;
          background:#fff;
          border-bottom:1px solid #E8E5DF;
          position:sticky;
          top:0;
          z-index:50;
        }

        .hdr-brand{
          display:flex;
          align-items:center;
          gap:.75rem;
        }

        .hdr-gold-mark{
          width:3px;
          height:28px;
          background:#C9A84C;
        }

        .hdr-name{
          font-family:'Playfair Display',serif;
          font-size:1rem;
          font-weight:700;
          color:#0F1C2E;
          margin:0;
        }

        .hdr-tagline{
          font-family:'Inter',sans-serif;
          font-size:.6875rem;
          color:#94A3B8;
          margin:0;
        }

        .hdr-user{
          position:relative;
        }

        .hdr-user-btn{
          display:flex;
          align-items:center;
          gap:.8rem;
          background:none;
          border:none;
          cursor:pointer;
        }

        .hdr-user-info{
          text-align:right;
        }

        .hdr-user-name{
          margin:0;
          font-size:.8125rem;
          font-weight:600;
          color:#0F1C2E;
        }

        .hdr-user-status{
          display:flex;
          justify-content:flex-end;
          align-items:center;
          gap:.3rem;
          margin:0;
          font-size:.6875rem;
          color:#94A3B8;
        }

        .hdr-status-dot{
          width:6px;
          height:6px;
          border-radius:50%;
          background:#22C55E;
        }

        .hdr-avatar{
          width:38px;
          height:38px;
          border-radius:50%;
          background:#0F1C2E;
          color:#C9A84C;
          display:flex;
          justify-content:center;
          align-items:center;
          font-weight:700;
          border:2px solid #E8E5DF;
        }

        .hdr-menu{
          position:absolute;
          right:0;
          top:52px;
          width:220px;
          background:#fff;
          border:1px solid #E8E5DF;
          border-radius:6px;
          overflow:hidden;
          box-shadow:0 10px 25px rgba(0,0,0,.08);
        }

        .hdr-menu-item{
          display:block;
          width:100%;
          text-align:left;
          padding:.9rem 1rem;
          border:none;
          background:#fff;
          cursor:pointer;
          font-size:.8125rem;
          color:#334155;
        }

        .hdr-menu-item:hover{
          background:#F8F8F8;
        }

        .logout{
          color:#DC2626;
          font-weight:600;
        }
      `}</style>

      <header className="hdr-root">

        <div className="hdr-brand">
          <div className="hdr-gold-mark"></div>

          <div>
            <p className="hdr-name">
              JobsContaq Recruitment Agency
            </p>

            <p className="hdr-tagline">
              Applicant & Worker Management System
            </p>
          </div>
        </div>

        <div
          className="hdr-user"
          ref={menuRef}
        >
          <button
            className="hdr-user-btn"
            onClick={() => setOpen(!open)}
          >
            <div className="hdr-user-info">
              <p className="hdr-user-name">
                Administrator ▼
              </p>

              <p className="hdr-user-status">
                <span className="hdr-status-dot"></span>
                Online
              </p>
            </div>

            <div className="hdr-avatar">
              A
            </div>
          </button>

          {open && (
            <div className="hdr-menu">
              <button
                onClick={handleLogout}
                className="hdr-menu-item logout"
              >
                🚪 Logout
              </button>

            </div>
          )}
        </div>

      </header>
    </>
  );
}