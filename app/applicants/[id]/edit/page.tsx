import { supabase } from "@/lib/supabase";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import Link from "next/link";

export default async function EditApplicant({
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

  if (error || !applicant) {
    return (
      <main style={{ padding: "2.5rem", fontFamily: "Inter, sans-serif" }}>
        <h1 style={{ color: "#C0392B", fontSize: "1.5rem", fontWeight: 600 }}>
          Applicant not found
        </h1>
      </main>
    );
  }

  async function updateApplicant(formData: FormData) {
    "use server";

    const applicantData = {
      sr_code: formData.get("sr_code"),
      worker_name: formData.get("worker_name"),
      position: formData.get("position"),
      country: formData.get("country"),
      employer: formData.get("employer"),
      fra: formData.get("fra"),
      passport_number: formData.get("passport_number"),
      contact_number: formData.get("contact_number"),
      province: formData.get("province"),

      dmw_registration: formData.get("dmw_registration"),
      info_sheet: formData.get("info_sheet"),
      cv_status: formData.get("cv_status"),
      medical: formData.get("medical"),
      peos: formData.get("peos"),
      biometrics: formData.get("biometrics"),
      visa: formData.get("visa"),
      contract_verified: formData.get("contract_verified"),
      oec: formData.get("oec"),

      flight: formData.get("flight"),
      deployment_status: formData.get("deployment_status"),
      start_date: formData.get("start_date") || null,
      days_processing: Number(formData.get("days_processing")) || 0,
      progress_percentage: Number(formData.get("progress_percentage")) || 0,
      remarks: formData.get("remarks"),
    };

    const { data, error } = await supabase
      .from("applicants")
      .update(applicantData)
      .eq("id", id)
      .select();

    console.log("UPDATED DATA:", data);
    console.log("UPDATE ERROR:", error);

    if (error) throw new Error(error.message);

    revalidatePath("/applicants");
    revalidatePath(`/applicants/${id}`);
    redirect(`/applicants/${id}`);
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Inter:wght@300;400;500;600&display=swap');

        .ea-root {
          font-family: 'Inter', sans-serif;
          background: #F7F5F0;
          min-height: 100vh;
          padding: 2.5rem 2.5rem 5rem;
          color: #0F1C2E;
        }

        /* ── Header ── */
        .ea-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 2.5rem;
        }
        .ea-title {
          font-family: 'Playfair Display', serif;
          font-size: 2rem;
          font-weight: 700;
          color: #0F1C2E;
          letter-spacing: -0.3px;
          margin: 0 0 0.2rem;
          line-height: 1.15;
        }
        .ea-gold-rule {
          width: 2rem;
          height: 2px;
          background: #C9A84C;
          border: none;
          margin: 0 0 0.35rem;
        }
        .ea-subtitle {
          font-size: 0.8125rem;
          color: #64748B;
          margin: 0;
        }
        .ea-btn-back {
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
          white-space: nowrap;
        }
        .ea-btn-back:hover { background: #F1F5F9; border-color: #94A3B8; }

        /* ── Form spacing ── */
        .ea-form { display: flex; flex-direction: column; gap: 1.5rem; }

        /* ── Card ── */
        .ea-card {
          background: #ffffff;
          border-radius: 4px;
          border: 1px solid #E8E5DF;
          padding: 1.75rem 2rem;
        }
        .ea-card-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #F1EFE9;
        }
        .ea-card-icon {
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
        .ea-card-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.2rem;
          font-weight: 600;
          color: #0F1C2E;
          margin: 0;
        }

        /* ── Grids ── */
        .ea-grid-2 {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.25rem;
        }
        .ea-grid-3 {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
        }
        @media (max-width: 768px) {
          .ea-grid-2 { grid-template-columns: 1fr; }
          .ea-grid-3 { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 480px) {
          .ea-grid-3 { grid-template-columns: 1fr; }
        }

        /* ── Field ── */
        .ea-field { display: flex; flex-direction: column; gap: 0.4rem; }
        .ea-label {
          font-size: 0.625rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #94A3B8;
        }
        .ea-input {
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
        .ea-input::placeholder { color: #CBD5E1; }
        .ea-input:focus {
          border-color: #C9A84C;
          box-shadow: 0 0 0 3px rgba(201,168,76,0.1);
          background: #ffffff;
        }

        /* chevron arrow for selects */
        .ea-select {
          width: 100%;
          background-color: #FAFAF8;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394A3B8' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 0.85rem center;
          border: 1px solid #EEF0EC;
          border-radius: 3px;
          padding: 0.7rem 2.25rem 0.7rem 0.9rem;
          font-family: 'Inter', sans-serif;
          font-size: 0.875rem;
          color: #0F1C2E;
          outline: none;
          appearance: none;
          cursor: pointer;
          transition: border-color 0.18s, box-shadow 0.18s, background-color 0.18s;
          box-sizing: border-box;
        }
        .ea-select:focus {
          border-color: #C9A84C;
          box-shadow: 0 0 0 3px rgba(201,168,76,0.1);
          background-color: #ffffff;
        }

        /* ── Textarea ── */
        .ea-textarea {
          width: 100%;
          background: #FAFAF8;
          border: 1px solid #EEF0EC;
          border-radius: 3px;
          padding: 0.7rem 0.9rem;
          font-family: 'Inter', sans-serif;
          font-size: 0.875rem;
          color: #0F1C2E;
          outline: none;
          resize: vertical;
          transition: border-color 0.18s, box-shadow 0.18s, background 0.18s;
          box-sizing: border-box;
          line-height: 1.6;
        }
        .ea-textarea:focus {
          border-color: #C9A84C;
          box-shadow: 0 0 0 3px rgba(201,168,76,0.1);
          background: #ffffff;
        }

        /* ── Remarks row ── */
        .ea-remarks { margin-top: 1.25rem; }

        /* ── Footer ── */
        .ea-footer {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 0.75rem;
          padding-top: 1.5rem;
          border-top: 1px solid #F1EFE9;
          margin-top: 0.5rem;
        }
        .ea-btn-cancel {
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
        .ea-btn-cancel:hover { background: #F1F5F9; color: #0F1C2E; }
        .ea-btn-submit {
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
        .ea-btn-submit:hover { background: #C9A84C; color: #0F1C2E; border-color: #C9A84C; }
      `}</style>

      <main className="ea-root">

        {/* Header */}
        <div className="ea-header">
          <div>
            <h1 className="ea-title">Edit Applicant</h1>
            <hr className="ea-gold-rule" />
            <p className="ea-subtitle">{applicant.worker_name}</p>
          </div>
          <Link href={`/applicants/${id}`} className="ea-btn-back">
            ← Back
          </Link>
        </div>

        <form action={updateApplicant} className="ea-form">

          {/* Basic Information */}
          <div className="ea-card">
            <div className="ea-card-header">
              <div className="ea-card-icon">✦</div>
              <h2 className="ea-card-title">Basic Information</h2>
            </div>

            <div className="ea-grid-2">
            
              <Field label="Worker Name" name="worker_name" defaultValue={applicant.worker_name} />

              <Field label="SR Code" name="sr_code" defaultValue={applicant.sr_code}/>

              <div className="ea-field">
                <label className="ea-label" htmlFor="position">Position</label>
                <input id="position" name="position" type="text" defaultValue={applicant.position || ""} className="ea-input"
                />
              </div>

              <Field label="Country"         name="country"          defaultValue={applicant.country} />
              <Field label="Employer"        name="employer"         defaultValue={applicant.employer} />
              <Field label="FRA"             name="fra"              defaultValue={applicant.fra} />
              <Field label="Passport Number" name="passport_number"  defaultValue={applicant.passport_number} />
              <Field label="Contact Number"  name="contact_number"   defaultValue={applicant.contact_number} />
              <Field label="Province"        name="province"         defaultValue={applicant.province} />
            </div>
          </div>

          {/* Processing Status */}
          <div className="ea-card">
            <div className="ea-card-header">
              <div className="ea-card-icon">◈</div>
              <h2 className="ea-card-title">Processing Status</h2>
            </div>

            <div className="ea-grid-3">
              <StatusField label="DMW Registration"  name="dmw_registration"  defaultValue={applicant.dmw_registration} />
              <StatusField label="Info Sheet"         name="info_sheet"         defaultValue={applicant.info_sheet} />
              <StatusField label="CV"                 name="cv_status"          defaultValue={applicant.cv_status} />
              <StatusField label="Medical"            name="medical"            defaultValue={applicant.medical} />
              <StatusField label="PEOS"               name="peos"               defaultValue={applicant.peos} />
              <StatusField label="Biometrics"         name="biometrics"         defaultValue={applicant.biometrics} />
              <StatusField label="Visa"               name="visa"               defaultValue={applicant.visa} />
              <StatusField label="Contract Verified"  name="contract_verified"  defaultValue={applicant.contract_verified} />
              <StatusField label="OEC"                name="oec"                defaultValue={applicant.oec} />
            </div>
          </div>

          {/* Deployment */}
          <div className="ea-card">
            <div className="ea-card-header">
              <div className="ea-card-icon">⟶</div>
              <h2 className="ea-card-title">Deployment</h2>
            </div>

            <div className="ea-grid-2">
              <Field label="Flight" name="flight" defaultValue={applicant.flight} />

              <div className="ea-field">
                <label className="ea-label" htmlFor="deployment_status">Deployment Status</label>
                <select id="deployment_status" name="deployment_status" defaultValue={applicant.deployment_status || ""} className="ea-select">
                  <option value="">— Select —</option>
                  <option value="Processing">Processing</option>
                  <option value="For Deployment">For Deployment</option>
                  <option value="Deployed">Deployed</option>
                </select>
              </div>

              <Field label="Start Date"      name="start_date"          defaultValue={applicant.start_date} />
              <Field label="Days Processing" name="days_processing"     defaultValue={applicant.days_processing} />
              <Field label="Progress %"      name="progress_percentage" defaultValue={applicant.progress_percentage} />
            </div>

            <div className="ea-remarks">
              <div className="ea-field">
                <label className="ea-label" htmlFor="remarks">Remarks</label>
                <textarea
                  id="remarks"
                  name="remarks"
                  defaultValue={applicant.remarks || ""}
                  rows={5}
                  className="ea-textarea"
                />
              </div>
            </div>

            {/* Footer inside last card */}
            <div className="ea-footer">
              <Link href={`/applicants/${id}`} className="ea-btn-cancel">
                Cancel
              </Link>
              <button type="submit" className="ea-btn-submit">
                Save Changes
              </button>
            </div>
          </div>

        </form>
      </main>
    </>
  );
}

/* ── Plain text input ── */
function Field({
  label,
  name,
  defaultValue,
}: {
  label: string;
  name: string;
  defaultValue?: any;
}) {
  return (
    <div className="ea-field">
      <label className="ea-label" htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        defaultValue={defaultValue ?? ""}
        className="ea-input"
      />
    </div>
  );
}

/* ── Pending / Completed select ── */
function StatusField({
  label,
  name,
  defaultValue,
}: {
  label: string;
  name: string;
  defaultValue?: string;
}) {
  return (
    <div className="ea-field">
      <label className="ea-label" htmlFor={name}>{label}</label>
      <select
        id={name}
        name={name}
        defaultValue={defaultValue || ""}
        className="ea-select"
      >
        <option value="">— Select —</option>
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>
      </select>
    </div>
  );
}