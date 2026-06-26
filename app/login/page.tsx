"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase-client";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({ email, password, });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    setLoading(false);

    router.replace("/");
    router.refresh();
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .lg-root {
          min-height: 100vh;
          background: #F7F5F0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Inter', sans-serif;
          padding: 1.5rem;
        }

        .lg-card {
          width: 100%;
          max-width: 380px;
          background: #ffffff;
          border-radius: 4px;
          border: 1px solid #E8E5DF;
          padding: 2.5rem 2.25rem;
        }

        /* Logo + title */
        .lg-top {
          text-align: center;
          margin-bottom: 2rem;
        }
        .lg-logo { display: block; margin: 0 auto 1.25rem; }
        .lg-gold-rule {
          width: 2rem; height: 2px;
          background: #C9A84C;
          border: none;
          margin: 0 auto 0.75rem;
        }
        .lg-subtitle {
          font-size: 0.75rem;
          color: #94A3B8;
          font-weight: 500;
          letter-spacing: 0.07em;
          text-transform: uppercase;
        }

        /* Fields */
        .lg-field { display: flex; flex-direction: column; gap: 0.35rem; margin-bottom: 1rem; }
        .lg-label {
          font-size: 0.625rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #94A3B8;
        }
        .lg-input {
          width: 100%;
          background: #FAFAF8;
          border: 1px solid #EEF0EC;
          border-radius: 3px;
          padding: 0.7rem 0.9rem;
          font-family: 'Inter', sans-serif;
          font-size: 0.875rem;
          color: #0F1C2E;
          outline: none;
          transition: border-color 0.18s, box-shadow 0.18s;
        }
        .lg-input::placeholder { color: #CBD5E1; }
        .lg-input:focus {
          border-color: #C9A84C;
          box-shadow: 0 0 0 3px rgba(201,168,76,0.1);
          background: #ffffff;
        }

        /* Error */
        .lg-error {
          font-size: 0.8125rem;
          color: #DC2626;
          background: #FEF2F2;
          border: 1px solid #FCA5A5;
          border-radius: 3px;
          padding: 0.6rem 0.9rem;
          margin-bottom: 1rem;
        }

        /* Button */
        .lg-btn {
          width: 100%;
          padding: 0.8rem;
          background: #0F1C2E;
          color: #C9A84C;
          font-family: 'Inter', sans-serif;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          border: none;
          border-radius: 3px;
          cursor: pointer;
          margin-top: 0.5rem;
          transition: background 0.15s, color 0.15s;
        }
        .lg-btn:hover:not(:disabled) { background: #C9A84C; color: #0F1C2E; }
        .lg-btn:disabled { opacity: 0.6; cursor: not-allowed; }

        /* Footer */
        .lg-footer {
          margin-top: 1.75rem;
          text-align: center;
          font-size: 0.6875rem;
          color: #CBD5E1;
          letter-spacing: 0.04em;
        }
      `}</style>

      <div className="lg-root">
        <div className="lg-card">

          <div className="lg-top">
            <Image
              src="/jobscontaq-logo.jpg"
              width={150}
              height={54}
              alt="JobsContaq"
              className="lg-logo"
              priority
            />
            <hr className="lg-gold-rule" />
            <p className="lg-subtitle">Applicant Management System</p>
          </div>

          <form onSubmit={handleLogin}>

            <div className="lg-field">
              <label className="lg-label" htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@jobscontaq.com"
                className="lg-input"
              />
            </div>

            <div className="lg-field">
              <label className="lg-label" htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="lg-input"
              />
            </div>

            {error && <div className="lg-error">{error}</div>}

            <button type="submit" disabled={loading} className="lg-btn">
              {loading ? "Signing In..." : "Sign In"}
            </button>

          </form>

          <p className="lg-footer">JobsContaq · 2025</p>

        </div>
      </div>
    </>
  );
}