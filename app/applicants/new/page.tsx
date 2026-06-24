import { redirect } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function NewApplicant() {
  async function createApplicant(formData: FormData) {
    "use server";

  const country = String(formData.get("country") || "")
    .trim()
    .toUpperCase();

      // Get latest SR Code for the selected country
  const { data: latestApplicant } = await supabase
    .from("applicants")
    .select("sr_code")
    .eq("country", country)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
      
  let nextNumber = 1;

  if (latestApplicant?.sr_code) {
    const match = latestApplicant.sr_code.match(/(\d+)$/);

    if (match) {
      nextNumber = parseInt(match[1], 10) + 1;
    }
  }

  const srCode = `${country}-${String(nextNumber).padStart(4, "0")}`;

    const { error } = await supabase
      .from("applicants")
      .insert({
        sr_code: formData.get("sr_code"),

        worker_name: formData.get("worker_name"),
        position: formData.get("position"),
        country: formData.get("country"),
        employer: formData.get("employer"),
        fra: formData.get("fra"),
        passport_number: formData.get("passport_number"),
        contact_number: formData.get("contact_number"),
        province: formData.get("province"),

        contract_start: formData.get("contract_start"),
        contract_end: formData.get("contract_end"),
        renewal_date: formData.get("renewal_date"),

        status: "Processing",
        deployment_status: "Processing",

        dmw_registration: "Pending",
        info_sheet: "Pending",
        cv_status: "Pending",
        medical: "Pending",
        peos: "Pending",
        biometrics: "Pending",
        visa: "Pending",
        contract_verified: "Pending",
        oec: "Pending",
        flight: "Pending",

        progress_percentage: 0,
        days_processing: 0,
      });

    if (error) {
      console.error(error);
      throw new Error(error.message);
    }

    redirect("/applicants");
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Inter:wght@300;400;500;600&display=swap');

        .na-root {
          font-family: 'Inter', sans-serif;
          background: #F7F5F0;
          min-height: 100vh;
          padding: 2.5rem 2.5rem 5rem;
          color: #0F1C2E;
        }

        /* ── Header ── */
        .na-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 2.5rem;
        }
        .na-title {
          font-family: 'Playfair Display', serif;
          font-size: 2rem;
          font-weight: 700;
          color: #0F1C2E;
          letter-spacing: -0.3px;
          margin: 0 0 0.2rem;
          line-height: 1.15;
        }
        .na-gold-rule {
          width: 2rem;
          height: 2px;
          background: #C9A84C;
          border: none;
          margin: 0 0 0.35rem;
        }
        .na-subtitle {
          font-size: 0.8125rem;
          color: #64748B;
          margin: 0;
        }
        .na-btn-back {
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
        .na-btn-back:hover {
          background: #F1F5F9;
          border-color: #94A3B8;
        }

        /* ── Card ── */
        .na-card {
          background: #ffffff;
          border-radius: 4px;
          border: 1px solid #E8E5DF;
          padding: 1.75rem 2rem;
          margin-bottom: 1.5rem;
        }
        .na-card-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #F1EFE9;
        }
        .na-card-icon {
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
        .na-card-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.2rem;
          font-weight: 600;
          color: #0F1C2E;
          margin: 0;
        }

        /* ── Grid ── */
        .na-grid-2 {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.25rem;
        }
        @media (max-width: 768px) {
          .na-grid-2 { grid-template-columns: 1fr; }
        }

        /* ── Field ── */
        .na-field { display: flex; flex-direction: column; gap: 0.4rem; }
        .na-label {
          font-size: 0.625rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #94A3B8;
        }
        .na-label span {
          color: #C9A84C;
          margin-left: 2px;
        }
        .na-input {
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
        .na-input::placeholder { color: #CBD5E1; }
        .na-input:focus {
          border-color: #C9A84C;
          box-shadow: 0 0 0 3px rgba(201,168,76,0.1);
          background: #ffffff;
        }
        .na-select {
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
          appearance: none;
          cursor: pointer;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394A3B8' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 0.85rem center;
          padding-right: 2.25rem;
        }
        .na-select:focus {
          border-color: #C9A84C;
          box-shadow: 0 0 0 3px rgba(201,168,76,0.1);
          background-color: #ffffff;
        }

        /* ── Info notice ── */
        .na-notice {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          background: #FAFAF8;
          border: 1px solid #E8E5DF;
          border-left: 3px solid #C9A84C;
          border-radius: 3px;
          padding: 1rem 1.25rem;
          margin-bottom: 1.5rem;
        }
        .na-notice-icon { font-size: 0.9rem; color: #C9A84C; margin-top: 1px; flex-shrink: 0; }
        .na-notice-text { font-size: 0.8125rem; color: #64748B; line-height: 1.5; margin: 0; }
        .na-notice-text strong { color: #0F1C2E; font-weight: 600; }

        /* ── Footer actions ── */
        .na-footer {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 0.75rem;
          padding-top: 1.5rem;
          border-top: 1px solid #F1EFE9;
          margin-top: 0.5rem;
        }
        .na-btn-cancel {
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
        .na-btn-cancel:hover { background: #F1F5F9; color: #0F1C2E; }
        .na-btn-submit {
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
        .na-btn-submit:hover { background: #C9A84C; color: #0F1C2E; border-color: #C9A84C; }
      `}</style>

      <main className="na-root">

        {/* Header */}
        <div className="na-header">
          <div>
            <h1 className="na-title">New Applicant</h1>
            <hr className="na-gold-rule" />
            <p className="na-subtitle">Fill in the details to register a new applicant</p>
          </div>
          <Link href="/applicants" className="na-btn-back">
            ← Back
          </Link>
        </div>

        {/* Notice */}
        <div className="na-notice">
          <span className="na-notice-icon">✦</span>
          <p className="na-notice-text">
            <strong>Processing fields are auto-filled.</strong> DMW Registration, Info Sheet, CV, Medical, PEOS, Biometrics, Visa, Contract, and OEC will all be set to <strong>Pending</strong> upon creation. You can update them anytime from the Edit page.
          </p>
        </div>

        <form action={createApplicant}>

          {/* Basic Information */}
          <div className="na-card">
            <div className="na-card-header">
              <div className="na-card-icon">✦</div>
              <h2 className="na-card-title">Basic Information</h2>
            </div>

            <div className="na-grid-2">

              <div className="field">
                <label htmlFor="sr_code">
                  SR Code <span>*</span>
                </label>

                <input
                  id="sr_code"
                  name="sr_code"
                  type="text"
                  required
                  placeholder="e.g. MAIN-001"
                  className="na-input"
                />
          
              </div>

              <div className="na-field">
                <label className="na-label" htmlFor="worker_name">
                  Worker Name <span>*</span>
                </label>
                <input
                  id="worker_name"
                  type="text"
                  name="worker_name"
                  required
                  placeholder="e.g. DELA CRUZ, MARIA"
                  className="na-input"
                />
              </div>

              <div className="na-field">
                <label className="na-label" htmlFor="position">
                  Position <span>*</span>
                </label>
                <input id="position" name="position" type="text" required placeholder="e.g HSW" className="na-input"
                />
              </div>

              <div className="na-field">
                <label className="na-label" htmlFor="country">
                  Country <span>*</span>
                </label>
                <input
                  id="country"
                  type="text"
                  name="country"
                  required
                  placeholder="e.g. KSA"
                  className="na-input"
                />
              </div>

              <div className="na-field">
                <label className="na-label">Contract Start</label>
                <input
                  type="date"
                  name="contract_start"
                  className="na-input"
                />
              </div>

              <div className="na-field">
                <label className="na-label">Contract End</label>
                <input
                  type="date"
                  name="contract_end"
                  className="na-input"
                />
              </div>

              <div className="na-field">
                <label className="na-label">Renewal Date</label>
                <input
                  type="date"
                  name="renewal_date"
                  className="na-input"
                />
              </div>

              <div className="na-field">
                <label className="na-label" htmlFor="employer">
                  Employer <span>*</span>
                </label>
                <input
                  id="employer"
                  type="text"
                  name="employer"
                  required
                  placeholder="e.g. ABDULAZIZ HANI A SAAB"
                  className="na-input"
                />
              </div>

              <div className="na-field">
                <label className="na-label" htmlFor="fra">
                  FRA <span>*</span>
                </label>
                <input
                  id="fra"
                  type="text"
                  name="fra"
                  required
                  placeholder="e.g. Wasel Almadina Recruitment Office"
                  className="na-input"
                />
              </div>

              <div className="na-field">
                <label className="na-label" htmlFor="passport_number">
                  Passport Number <span>*</span>
                </label>
                <input
                  id="passport_number"
                  type="text"
                  name="passport_number"
                  required
                  placeholder="e.g. P6423885A"
                  className="na-input"
                />
              </div>

              <div className="na-field">
                <label className="na-label" htmlFor="contact_number">
                  Contact Number <span>*</span>
                </label>
                <input
                  id="contact_number"
                  type="text"
                  name="contact_number"
                  required
                  placeholder="e.g. 09532741577"
                  className="na-input"
                />
              </div>

              <div className="na-field">
                <label className="na-label" htmlFor="province">
                  Province <span>*</span>
                </label>
                <input
                  id="province"
                  type="text"
                  name="province"
                  required
                  placeholder="e.g. Davao Oriental"
                  className="na-input"
                />
              </div>

            </div>

            {/* Footer */}
            <div className="na-footer">
              <Link href="/applicants" className="na-btn-cancel">
                Cancel
              </Link>
              <button type="submit" className="na-btn-submit">
                Save Applicant
              </button>
            </div>

          </div>

        </form>

      </main>
    </>
  );
}