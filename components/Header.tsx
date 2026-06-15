export default function Header() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Inter:wght@300;400;500;600&display=swap');

        .hdr-root {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #ffffff;
          border-bottom: 1px solid #E8E5DF;
          padding: 0 2.5rem;
          height: 64px;
          position: sticky;
          top: 0;
          z-index: 50;
        }

        .hdr-brand {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .hdr-gold-mark {
          width: 3px;
          height: 28px;
          background: #C9A84C;
          border-radius: 0;
          flex-shrink: 0;
        }

        .hdr-name {
          font-family: 'Playfair Display', serif;
          font-size: 1rem;
          font-weight: 700;
          color: #0F1C2E;
          margin: 0;
          letter-spacing: -0.1px;
          line-height: 1.2;
        }

        .hdr-tagline {
          font-family: 'Inter', sans-serif;
          font-size: 0.6875rem;
          color: #94A3B8;
          margin: 0;
          letter-spacing: 0.02em;
          font-weight: 400;
        }

        .hdr-right {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .hdr-user-info {
          text-align: right;
        }

        .hdr-user-name {
          font-family: 'Inter', sans-serif;
          font-size: 0.8125rem;
          font-weight: 600;
          color: #0F1C2E;
          margin: 0;
          line-height: 1.3;
        }

        .hdr-user-status {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 0.3rem;
          font-family: 'Inter', sans-serif;
          font-size: 0.6875rem;
          color: #94A3B8;
          margin: 0;
        }

        .hdr-status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #22C55E;
          flex-shrink: 0;
        }

        .hdr-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #0F1C2E;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Inter', sans-serif;
          font-size: 0.8125rem;
          font-weight: 700;
          color: #C9A84C;
          letter-spacing: 0.03em;
          flex-shrink: 0;
          border: 2px solid #E8E5DF;
        }
      `}</style>

      <header className="hdr-root">

        {/* Brand */}
        <div className="hdr-brand">
          <div className="hdr-gold-mark" />
          <div>
            <p className="hdr-name">JobsContaq Recruitment Agency</p>
            <p className="hdr-tagline">Applicant & Worker Management System</p>
          </div>
        </div>

        {/* User */}
        <div className="hdr-right">
          <div className="hdr-user-info">
            <p className="hdr-user-name">Administrator</p>
            <p className="hdr-user-status">
              <span className="hdr-status-dot" />
              Online
            </p>
          </div>
          <div className="hdr-avatar">A</div>
        </div>

      </header>
    </>
  );
}