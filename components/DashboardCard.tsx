type DashboardCardProps = {
  label: string;
  value: number | string;
  color?: "dark" | "amber" | "blue" | "green" | "red";
  icon?: string;
  sublabel?: string;
};

export default function DashboardCard({
  label,
  value,
  color = "dark",
  icon,
  sublabel,
}: DashboardCardProps) {
  const colorMap: Record<string, string> = {
    dark:  "#0F1C2E",
    amber: "#C8800A",
    blue:  "#2563EB",
    green: "#1A7A35",
    red:   "#DC2626",
  };

  const numberColor = colorMap[color] || colorMap["dark"];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;500;600&display=swap');

        .dc-card {
          background: #ffffff;
          border-radius: 4px;
          border: 1px solid #E8E5DF;
          border-left: 3px solid #C9A84C;
          padding: 1.25rem 1.4rem;
          position: relative;
          overflow: hidden;
          transition: border-color 0.15s, box-shadow 0.15s;
        }

        .dc-card:hover {
          box-shadow: 0 4px 16px rgba(15,28,46,0.07);
        }

        /* Subtle gold corner accent */
        .dc-card::after {
          content: '';
          position: absolute;
          top: 0; right: 0;
          width: 48px; height: 48px;
          background: linear-gradient(135deg, transparent 50%, rgba(201,168,76,0.05) 50%);
          pointer-events: none;
        }

        .dc-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 0.6rem;
        }

        .dc-label {
          font-family: 'Inter', sans-serif;
          font-size: 0.625rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #94A3B8;
          margin: 0;
        }

        .dc-icon {
          font-size: 1rem;
          color: #C9A84C;
          opacity: 0.7;
          line-height: 1;
        }

        .dc-value {
          font-family: 'Playfair Display', serif;
          font-size: 2.25rem;
          font-weight: 700;
          line-height: 1;
          margin: 0 0 0.35rem;
        }

        .dc-sublabel {
          font-family: 'Inter', sans-serif;
          font-size: 0.6875rem;
          color: #94A3B8;
          margin: 0;
          font-weight: 400;
        }
      `}</style>

      <div className="dc-card">
        <div className="dc-top">
          <p className="dc-label">{label}</p>
          {icon && <span className="dc-icon">{icon}</span>}
        </div>

        <p className="dc-value" style={{ color: numberColor }}>
          {value}
        </p>

        {sublabel && (
          <p className="dc-sublabel">{sublabel}</p>
        )}
      </div>
    </>
  );
}