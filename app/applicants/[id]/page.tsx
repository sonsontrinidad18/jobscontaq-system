import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default async function ApplicantProfile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: applicant, error } = await supabase
    .from("applicants")
    .select("*")
    .eq("id", id)
    .single();

  if (!applicant) {
    return (
      <main style={{ padding: "2.5rem", fontFamily: "Inter, sans-serif" }}>
        <h1 style={{ color: "#0F1C2E" }}>Applicant not found</h1>
        <pre style={{ color: "#64748B", fontSize: "0.8125rem" }}>
          {JSON.stringify(error, null, 2)}
        </pre>
      </main>
    );
  }

  // Fetch deployment tracker records for this applicant
  const { data: deploymentRecords } = await supabase
    .from("deployments")
    .select("*")
    .eq("applicant_id", id)
    .order("created_at", { ascending: true });

  function getInitials(name: string) {
    if (!name) return "?";
    const parts = name.trim().split(/[\s,]+/).filter(Boolean);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }

  const deploymentStatus = applicant.deployment_status || "Processing";

  // Map records to stages
  const stages = ["Contract Start", "Contract End", "Renewal"];
  const stageMap: Record<string, { date?: string; location?: string }> = {};
  deploymentRecords?.forEach((r) => {
    stageMap[r.stage] = { date: r.date, location: r.location };
  });

  // How many stages are completed
  const completedCount = stages.filter((s) => stageMap[s]?.date).length;
  const progressPct = Math.round((completedCount / stages.length) * 100);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Inter:wght@300;400;500;600&display=swap');

        .pr-root {
          font-family: 'Inter', sans-serif;
          background: #F7F5F0;
          min-height: 100vh;
          padding: 2.5rem 2.5rem 5rem;
          color: #0F1C2E;
        }

        /* ── Header ── */
        .pr-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 2.5rem;
          gap: 1.5rem;
        }
        .pr-header-left {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }
        .pr-avatar {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: #D8EDD0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
          font-weight: 600;
          color: #2D6A2D;
          flex-shrink: 0;
        }
        .pr-title {
          font-family: 'Playfair Display', serif;
          font-size: 2rem;
          font-weight: 700;
          color: #0F1C2E;
          letter-spacing: -0.3px;
          margin: 0 0 0.2rem;
          line-height: 1.15;
        }
        .pr-gold-rule {
          width: 2rem;
          height: 2px;
          background: #C9A84C;
          border: none;
          margin: 0 0 0.35rem;
        }
        .pr-subtitle {
          font-size: 0.8125rem;
          color: #64748B;
          margin: 0;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .pr-badge {
          display: inline-block;
          padding: 0.2rem 0.65rem;
          border-radius: 2px;
          font-size: 0.625rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          border: 1px solid;
        }
        .pr-b-proc { background: #FFFBEB; color: #92580A; border-color: #E8C56A; }
        .pr-b-dep  { background: #EFF6FF; color: #1D4ED8; border-color: #93C5FD; }
        .pr-b-done { background: #F0FDF4; color: #15803D; border-color: #86EFAC; }

        .pr-actions { display: flex; gap: 0.6rem; flex-shrink: 0; }
        .pr-btn-back {
          font-family: 'Inter', sans-serif;
          font-size: 0.6875rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 0.65rem 1.25rem;
          border-radius: 3px;
          text-decoration: none;
          background: transparent;
          color: #0F1C2E;
          border: 1px solid #CBD5E1;
          transition: all 0.15s;
        }
        .pr-btn-back:hover { background: #F1F5F9; border-color: #94A3B8; }
        .pr-btn-edit {
          font-family: 'Inter', sans-serif;
          font-size: 0.6875rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 0.65rem 1.25rem;
          border-radius: 3px;
          text-decoration: none;
          background: #0F1C2E;
          color: #C9A84C;
          border: 1px solid #0F1C2E;
          transition: all 0.15s;
        }
        .pr-btn-edit:hover { background: #C9A84C; color: #0F1C2E; border-color: #C9A84C; }

        /* ── Sections ── */
        .pr-section {
          background: #ffffff;
          border-radius: 4px;
          border: 1px solid #E8E5DF;
          padding: 1.75rem 2rem;
          margin-bottom: 1.5rem;
        }
        .pr-section-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #F1EFE9;
        }
        .pr-section-icon {
          width: 32px;
          height: 32px;
          background: #F7F5F0;
          border: 1px solid #E8E5DF;
          border-radius: 3px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.875rem;
          color: #C9A84C;
          flex-shrink: 0;
        }
        .pr-section-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.2rem;
          font-weight: 600;
          color: #0F1C2E;
          margin: 0;
        }

        /* ── Grids ── */
        .pr-grid-2 {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }
        .pr-grid-3 {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
        }
        @media (max-width: 768px) {
          .pr-grid-2 { grid-template-columns: 1fr; }
          .pr-grid-3 { grid-template-columns: repeat(2, 1fr); }
        }

        /* ── Info Field ── */
        .pr-field {
          padding: 0.85rem 1rem;
          border-radius: 3px;
          border: 1px solid #EEF0EC;
          background: #FAFAF8;
          transition: border-color 0.15s;
        }
        .pr-field:hover { border-color: #C9A84C; }
        .pr-field-label {
          font-size: 0.625rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #94A3B8;
          margin: 0 0 0.35rem;
        }
        .pr-field-value {
          font-size: 0.875rem;
          font-weight: 500;
          color: #0F1C2E;
          margin: 0;
        }
        .pr-field-empty {
          font-size: 0.875rem;
          font-weight: 400;
          color: #CBD5E1;
          margin: 0;
        }

        /* ── Progress bar ── */
        .pr-progress-wrap { margin-top: 0.5rem; }
        .pr-progress-track {
          width: 100%;
          height: 4px;
          background: #E8E5DF;
          border-radius: 2px;
          overflow: hidden;
        }
        .pr-progress-fill {
          height: 100%;
          background: #C9A84C;
          border-radius: 2px;
          transition: width 0.3s ease;
        }
        .pr-progress-label {
          font-size: 0.625rem;
          color: #94A3B8;
          margin-top: 0.3rem;
          text-align: right;
        }
        .pr-remarks { grid-column: 1 / -1; }
        .pr-remarks .pr-field-value {
          font-weight: 400;
          line-height: 1.6;
          color: #334155;
        }

        /* ── Status field ── */
        .pr-field-status .pr-field-value {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        /* ════════════════════════════
           DEPLOYMENT TRACKER
        ════════════════════════════ */

        .tracker-progress-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.5rem;
        }
        .tracker-progress-label {
          font-size: 0.6875rem;
          color: #64748B;
          font-weight: 500;
        }
        .tracker-progress-pct {
          font-size: 0.6875rem;
          font-weight: 600;
          color: #C9A84C;
        }
        .tracker-bar-track {
          width: 100%;
          height: 5px;
          background: #EEF0EC;
          border-radius: 3px;
          overflow: hidden;
          margin-bottom: 2.5rem;
        }
        .tracker-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #C9A84C, #E8D08A);
          border-radius: 3px;
          transition: width 0.4s ease;
        }

        /* Timeline */
        .tracker-timeline {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          position: relative;
          gap: 1rem;
        }

        /* Connecting line behind the nodes */
        .tracker-timeline::before {
          content: '';
          position: absolute;
          top: 18px;
          left: calc(16.666% + 8px);
          right: calc(16.666% + 8px);
          height: 2px;
          background: #E8E5DF;
          z-index: 0;
        }

        .tracker-stage {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          z-index: 1;
        }

        /* Node circle */
        .tracker-node {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: 700;
          margin-bottom: 0.85rem;
          flex-shrink: 0;
          transition: all 0.2s;
        }
        .tracker-node-done {
          background: #0F1C2E;
          color: #C9A84C;
          border: 2px solid #C9A84C;
        }
        .tracker-node-active {
          background: #ffffff;
          color: #C9A84C;
          border: 2px solid #C9A84C;
        }
        .tracker-node-pending {
          background: #F7F5F0;
          color: #CBD5E1;
          border: 2px solid #E8E5DF;
        }

        .tracker-stage-label {
          font-family: 'Playfair Display', serif;
          font-size: 0.875rem;
          font-weight: 600;
          color: #0F1C2E;
          text-align: center;
          margin: 0 0 0.75rem;
        }
        .tracker-stage-label.pending-label {
          color: #94A3B8;
        }

        .tracker-stage-card {
          background: #FAFAF8;
          border: 1px solid #EEF0EC;
          border-radius: 3px;
          padding: 0.85rem 1rem;
          width: 100%;
          text-align: left;
          transition: border-color 0.15s;
        }
        .tracker-stage-card:hover { border-color: #C9A84C; }
        .tracker-stage-card.done-card {
          border-color: #C9A84C;
          background: #FDFAF3;
        }
        .tracker-stage-card.pending-card {
          border-style: dashed;
          background: #F7F5F0;
        }

        .tracker-field-label {
          font-size: 0.5625rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #94A3B8;
          margin: 0 0 0.2rem;
        }
        .tracker-field-value {
          font-size: 0.8125rem;
          font-weight: 500;
          color: #0F1C2E;
          margin: 0 0 0.65rem;
        }
        .tracker-field-value:last-child { margin-bottom: 0; }
        .tracker-field-empty {
          font-size: 0.8125rem;
          color: #CBD5E1;
          margin: 0 0 0.65rem;
          font-weight: 400;
        }
        .tracker-field-empty:last-child { margin-bottom: 0; }

        /* Edit tracker link */
        .tracker-edit-link {
          display: block;
          margin-top: 0.6rem;
          font-size: 0.625rem;
          font-weight: 600;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          color: #C9A84C;
          text-decoration: none;
          text-align: center;
          transition: color 0.15s;
        }
        .tracker-edit-link:hover { color: #0F1C2E; }

        .tracker-empty-notice {
          text-align: center;
          padding: 2rem;
          color: #94A3B8;
          font-size: 0.8125rem;
        }
        .tracker-empty-notice strong {
          display: block;
          font-family: 'Playfair Display', serif;
          font-size: 1rem;
          color: #64748B;
          margin-bottom: 0.3rem;
        }

        @media (max-width: 768px) {
          .tracker-timeline { grid-template-columns: 1fr; }
          .tracker-timeline::before { display: none; }
        }
      `}</style>

      <main className="pr-root">

        {/* Header */}
        <div className="pr-header">
          <div className="pr-header-left">
            <div className="pr-avatar">{getInitials(applicant.worker_name)}</div>
            <div>
              <h1 className="pr-title">{applicant.worker_name}</h1>
              <hr className="pr-gold-rule" />
              <p className="pr-subtitle">
                Applicant Profile
                <span className={`pr-badge ${
                  deploymentStatus === "Deployed"
                    ? "pr-b-done"
                    : deploymentStatus === "For Deployment"
                    ? "pr-b-dep"
                    : "pr-b-proc"
                }`}>
                  {deploymentStatus}
                </span>
              </p>
            </div>
          </div>
          <div className="pr-actions">
            <Link href="/applicants" className="pr-btn-back">← Back</Link>
            <Link href={`/applicants/${applicant.id}/edit`} className="pr-btn-edit">Edit Applicant</Link>
          </div>
        </div>

        {/* Basic Information */}
        <div className="pr-section">
          <div className="pr-section-header">
            <div className="pr-section-icon">✦</div>
            <h2 className="pr-section-title">Basic Information</h2>
          </div>
          <div className="pr-grid-2">
            <Field label="Worker Name"     value={applicant.worker_name} />
            <Field label="SR Code"     value={applicant.sr_code} />
            <Field label="Position"        value={applicant.position} />
            <Field label="Country"         value={applicant.country} />
            <Field label="Employer"        value={applicant.employer} />
            <Field label="FRA"             value={applicant.fra} />
            <Field label="Passport Number" value={applicant.passport_number} />
            <Field label="Contact Number"  value={applicant.contact_number} />
            <Field label="Province"        value={applicant.province} />
          </div>
        </div>

        {/* Processing Status */}
        <div className="pr-section">
          <div className="pr-section-header">
            <div className="pr-section-icon">◈</div>
            <h2 className="pr-section-title">Processing Status</h2>
          </div>
          <div className="pr-grid-3">
            <StatusField label="DMW E-Registration" value={applicant.dmw_registration} />
            <StatusField label="Info Sheet"         value={applicant.info_sheet} />
            <StatusField label="CV"                 value={applicant.cv_status} />
            <StatusField label="Medical"            value={applicant.medical} />
            <StatusField label="PEOS"               value={applicant.peos} />
            <StatusField label="Biometrics"         value={applicant.biometrics} />
            <StatusField label="Visa"               value={applicant.visa} />
            <StatusField label="Contract Verified"  value={applicant.contract_verified} />
            <StatusField label="OEC"                value={applicant.oec} />
          </div>
        </div>

        {/* Deployment */}
        <div className="pr-section">
          <div className="pr-section-header">
            <div className="pr-section-icon">⟶</div>
            <h2 className="pr-section-title">Deployment</h2>
          </div>
          <div className="pr-grid-2">
            <Field label="Flight"            value={applicant.flight} />
            <Field label="Deployment Status" value={applicant.deployment_status} />
            <Field label="Start Date"        value={applicant.start_date} />
            <Field label="Days Processing"   value={applicant.days_processing} />
            <div className="pr-field">
              <p className="pr-field-label">Progress %</p>
              {applicant.progress_percentage ? (
                <div className="pr-progress-wrap">
                  <p className="pr-field-value">{applicant.progress_percentage}%</p>
                  <div className="pr-progress-track">
                    <div
                      className="pr-progress-fill"
                      style={{ width: `${Math.min(Number(applicant.progress_percentage), 100)}%` }}
                    />
                  </div>
                  <p className="pr-progress-label">{applicant.progress_percentage}% complete</p>
                </div>
              ) : (
                <p className="pr-field-empty">—</p>
              )}
            </div>
            <Field label="Status" value={applicant.status} />
            <div className="pr-field pr-remarks">
              <p className="pr-field-label">Remarks</p>
              {applicant.remarks
                ? <p className="pr-field-value">{applicant.remarks}</p>
                : <p className="pr-field-empty">—</p>
              }
            </div>
          </div>
        </div>

        {/* ════════════════════════════
            DEPLOYMENT LIFECYCLE TRACKER
        ════════════════════════════ */}
        <div className="pr-section">
          <div className="pr-section-header">
            <div className="pr-section-icon">◉</div>
            <div style={{ flex: 1 }}>
              <h2 className="pr-section-title">Deployment Tracker</h2>
            </div>
            <Link
              href={`/applicants/${applicant.id}/tracker`}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.6875rem",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                padding: "0.5rem 1rem",
                borderRadius: "3px",
                textDecoration: "none",
                background: "#0F1C2E",
                color: "#C9A84C",
                border: "1px solid #0F1C2E",
                transition: "all 0.15s",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              Update Tracker
            </Link>
          </div>

          {/* Overall progress bar */}
          <div className="tracker-progress-row">
            <span className="tracker-progress-label">
              {completedCount} of {stages.length} stages completed
            </span>
            <span className="tracker-progress-pct">{progressPct}%</span>
          </div>
          <div className="tracker-bar-track">
            <div className="tracker-bar-fill" style={{ width: `${progressPct}%` }} />
          </div>

          {/* Stage nodes */}
          {deploymentStatus === "Deployed" || completedCount > 0 ? (
            <div className="tracker-timeline">
              {stages.map((stage, idx) => {
                const record = stageMap[stage];
                const isDone = !!record?.date;
                const isNext = !isDone && stages.slice(0, idx).every((s) => stageMap[s]?.date);

                return (
                  <div className="tracker-stage" key={stage}>
                    {/* Node */}
                    <div className={`tracker-node ${
                      isDone ? "tracker-node-done"
                      : isNext ? "tracker-node-active"
                      : "tracker-node-pending"
                    }`}>
                      {isDone ? "✓" : idx + 1}
                    </div>

                    {/* Stage label */}
                    <p className={`tracker-stage-label ${!isDone ? "pending-label" : ""}`}>
                      {stage}
                    </p>

                    {/* Info card */}
                    <div className={`tracker-stage-card ${
                      isDone ? "done-card" : "pending-card"
                    }`}>
                      <p className="tracker-field-label">Date</p>
                      {record?.date
                        ? <p className="tracker-field-value">{record.date}</p>
                        : <p className="tracker-field-empty">Not recorded</p>
                      }
                      <p className="tracker-field-label">Location</p>
                      {record?.location
                        ? <p className="tracker-field-value">{record.location}</p>
                        : <p className="tracker-field-empty">Not recorded</p>
                      }
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="tracker-empty-notice">
              <strong>No tracker data yet</strong>
              This tracker activates once the applicant is marked as Deployed.
              Click <em>Update Tracker</em> to begin recording lifecycle stages.
            </div>
          )}
        </div>

      </main>
    </>
  );
}

/* ── Plain info field ── */
function Field({ label, value }: { label: string; value: any }) {
  return (
    <div className="pr-field">
      <p className="pr-field-label">{label}</p>
      {value
        ? <p className="pr-field-value">{value}</p>
        : <p className="pr-field-empty">—</p>
      }
    </div>
  );
}

/* ── Status field with Pending / Completed badge ── */
function StatusField({ label, value }: { label: string; value: any }) {
  const isCompleted = value === "Completed";
  const isPending   = value === "Pending";

  return (
    <div className="pr-field pr-field-status">
      <p className="pr-field-label">{label}</p>
      <div className="pr-field-value">
        {isCompleted ? (
          <span style={{
            display: "inline-block", padding: "0.2rem 0.65rem", borderRadius: "2px",
            fontSize: "0.625rem", fontWeight: 600, letterSpacing: "0.08em",
            textTransform: "uppercase", background: "#F0FDF4", color: "#15803D",
            border: "1px solid #86EFAC",
          }}>Completed</span>
        ) : isPending ? (
          <span style={{
            display: "inline-block", padding: "0.2rem 0.65rem", borderRadius: "2px",
            fontSize: "0.625rem", fontWeight: 600, letterSpacing: "0.08em",
            textTransform: "uppercase", background: "#FFFBEB", color: "#92580A",
            border: "1px solid #E8C56A",
          }}>Pending</span>
        ) : value ? (
          <span style={{ fontSize: "0.875rem", fontWeight: 500, color: "#0F1C2E" }}>{value}</span>
        ) : (
          <span style={{ fontSize: "0.875rem", fontWeight: 400, color: "#CBD5E1" }}>—</span>
        )}
      </div>
    </div>
  );
}