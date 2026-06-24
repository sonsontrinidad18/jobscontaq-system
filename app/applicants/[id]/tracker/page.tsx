import { supabase } from "@/lib/supabase";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import Link from "next/link";

const STAGES = ["Contract Start", "Contract End", "Renewal"] as const;
type Stage = typeof STAGES[number];

export default async function TrackerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: applicant } = await supabase
    .from("applicants")
    .select("worker_name, deployment_status")
    .eq("id", id)
    .single();

  const { data: records } = await supabase
    .from("deployments")
    .select("*")
    .eq("applicant_id", id);

  // Map existing records by stage
  const stageMap: Record<string, { id: string; date?: string; location?: string }> = {};
  records?.forEach((r) => {
    stageMap[r.stage] = { id: r.id, date: r.date, location: r.location };
  });

  async function saveTracker(formData: FormData) {
    "use server";

    console.log("SAVE TRACKER CLICKED");

    for (const stage of STAGES) {
      const date     = formData.get(`${stage}_date`) as string;
      const location = formData.get(`${stage}_location`) as string;

      const existing = stageMap[stage];

      if (existing?.id) {
        // Update
        await supabase
          .from("deployments")
          .update({ date: date || null, location: location || null })
          .eq("id", existing.id);
      } else if (date || location) {
        // Insert only if there's data
        await supabase
          .from("deployments")
          .insert({
            applicant_id: id,
            stage,
            date: date || null,
            location: location || null,
          });
      }
    }

    revalidatePath(`/applicants/${id}`);
    redirect(`/applicants/${id}`);
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Inter:wght@300;400;500;600&display=swap');

        .tr-root {
          font-family: 'Inter', sans-serif;
          background: #F7F5F0;
          min-height: 100vh;
          padding: 2.5rem 2.5rem 5rem;
          color: #0F1C2E;
        }

        /* ── Header ── */
        .tr-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 2.5rem;
        }
        .tr-title {
          font-family: 'Playfair Display', serif;
          font-size: 2rem;
          font-weight: 700;
          color: #0F1C2E;
          letter-spacing: -0.3px;
          margin: 0 0 0.2rem;
          line-height: 1.15;
        }
        .tr-gold-rule {
          width: 2rem;
          height: 2px;
          background: #C9A84C;
          border: none;
          margin: 0 0 0.35rem;
        }
        .tr-subtitle {
          font-size: 0.8125rem;
          color: #64748B;
          margin: 0;
        }
        .tr-btn-back {
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
        .tr-btn-back:hover { background: #F1F5F9; border-color: #94A3B8; }

        /* ── Notice ── */
        .tr-notice {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          background: #FAFAF8;
          border: 1px solid #E8E5DF;
          border-left: 3px solid #C9A84C;
          border-radius: 3px;
          padding: 1rem 1.25rem;
          margin-bottom: 1.5rem;
          font-size: 0.8125rem;
          color: #64748B;
          line-height: 1.5;
        }
        .tr-notice-icon { color: #C9A84C; flex-shrink: 0; margin-top: 1px; }

        /* ── Form ── */
        .tr-form { display: flex; flex-direction: column; gap: 1.25rem; }

        /* ── Stage Card ── */
        .tr-stage-card {
          background: #ffffff;
          border-radius: 4px;
          border: 1px solid #E8E5DF;
          overflow: hidden;
        }

        .tr-stage-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.25rem 1.75rem;
          border-bottom: 1px solid #F1EFE9;
          background: #FDFAF3;
        }

        .tr-stage-node {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #0F1C2E;
          color: #C9A84C;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: 700;
          flex-shrink: 0;
          border: 2px solid #C9A84C;
        }

        .tr-stage-name {
          font-family: 'Playfair Display', serif;
          font-size: 1.1rem;
          font-weight: 600;
          color: #0F1C2E;
          margin: 0;
        }

        .tr-stage-body {
          padding: 1.5rem 1.75rem;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.25rem;
        }

        @media (max-width: 600px) {
          .tr-stage-body { grid-template-columns: 1fr; }
        }

        /* ── Field ── */
        .tr-field { display: flex; flex-direction: column; gap: 0.4rem; }
        .tr-label {
          font-size: 0.625rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #94A3B8;
        }
        .tr-input {
          width: 100%;
          background: #FAFAF8;
          border: 1px solid #EEF0EC;
          border-radius: 3px;
          padding: 0.7rem 0.9rem;
          font-family: 'Inter', sans-serif;
          font-size: 0.875rem;
          color: #0F1C2E;
          outline: none;
          transition: border-color 0.18s, box-shadow 0.18s, background 0.18s;
          box-sizing: border-box;
        }
        .tr-input::placeholder { color: #CBD5E1; }
        .tr-input:focus {
          border-color: #C9A84C;
          box-shadow: 0 0 0 3px rgba(201,168,76,0.1);
          background: #ffffff;
        }

        /* ── Footer ── */
        .tr-footer {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 0.75rem;
          padding-top: 1.5rem;
        }
        .tr-btn-cancel {
          font-family: 'Inter', sans-serif;
          font-size: 0.6875rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 0.7rem 1.4rem;
          border-radius: 3px;
          text-decoration: none;
          background: transparent;
          color: #64748B;
          border: 1px solid #CBD5E1;
          transition: all 0.15s;
        }
        .tr-btn-cancel:hover { background: #F1F5F9; color: #0F1C2E; }
        .tr-btn-submit {
          font-family: 'Inter', sans-serif;
          font-size: 0.6875rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 0.7rem 1.75rem;
          border-radius: 3px;
          background: #0F1C2E;
          color: #C9A84C;
          border: 1px solid #0F1C2E;
          cursor: pointer;
          transition: all 0.15s;
        }
        .tr-btn-submit:hover { background: #C9A84C; color: #0F1C2E; border-color: #C9A84C; }
      `}</style>

      <main className="tr-root">

        {/* Header */}
        <div className="tr-header">
          <div>
            <h1 className="tr-title">Deployment Tracker</h1>
            <hr className="tr-gold-rule" />
            <p className="tr-subtitle">{applicant?.worker_name}</p>
          </div>
          <Link href={`/applicants/${id}`} className="tr-btn-back">
            ← Back to Profile
          </Link>
        </div>

        {/* Notice */}
        <div className="tr-notice">
          <span className="tr-notice-icon">✦</span>
          <span>
            Record the <strong>date</strong> and <strong>location</strong> for each stage of the applicant's deployment lifecycle. Stages with a recorded date will be marked as completed on the profile timeline.
          </span>
        </div>

        <form action={saveTracker} className="tr-form">

          {STAGES.map((stage, idx) => (
            <div className="tr-stage-card" key={stage}>
              <div className="tr-stage-header">
                <div className="tr-stage-node">{idx + 1}</div>
                <p className="tr-stage-name">{stage}</p>
              </div>

              <div className="tr-stage-body">
                <div className="tr-field">
                  <label className="tr-label" htmlFor={`${stage}_date`}>
                    Date
                  </label>
                  <input
                    id={`${stage}_date`}
                    type="date"
                    name={`${stage}_date`}
                    defaultValue={stageMap[stage]?.date || ""}
                    className="tr-input"
                  />
                </div>

                <div className="tr-field">
                  <label className="tr-label" htmlFor={`${stage}_location`}>
                    Location
                  </label>
                  <input
                    id={`${stage}_location`}
                    type="text"
                    name={`${stage}_location`}
                    defaultValue={stageMap[stage]?.location || ""}
                    placeholder="e.g. Riyadh, Saudi Arabia"
                    className="tr-input"
                  />
                </div>
              </div>
            </div>
          ))}

          {/* Footer */}
          <div className="tr-footer">
            <Link href={`/applicants/${id}`} className="tr-btn-cancel">
              Cancel
            </Link>
            <button type="submit" className="tr-btn-submit">
              Save Tracker
            </button>
          </div>

        </form>
      </main>
    </>
  );
}