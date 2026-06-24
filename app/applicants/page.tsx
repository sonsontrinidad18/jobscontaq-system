import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export default async function ApplicantsPage({
  searchParams,
}: {
  searchParams?: Promise<{
    status?: string;
    search?: string;
  }>;
}) {
  const params = await searchParams;
  const statusFilter = params?.status;
  const searchTerm = params?.search?.toLowerCase() || "";

  async function deleteApplicant(formData: FormData) {
    "use server";

    const id = formData.get("id");

    const { error } = await supabase
      .from("applicants")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);
      return;
    }

    revalidatePath("/applicants");
  }

  const { data: applicants } = await supabase
    .from("applicants")
    .select("*")
    .order("worker_name");

  const filteredApplicants = applicants?.filter((applicant) => {
  const matchesStatus =
    !statusFilter ||
    applicant.deployment_status === statusFilter;

  const matchesSearch =
    !searchTerm ||
    applicant.worker_name?.toLowerCase().includes(searchTerm) ||
    applicant.sr_code?.toLowerCase().includes(searchTerm) ||
    applicant.passport_number?.toLowerCase().includes(searchTerm) ||
    applicant.employer?.toLowerCase().includes(searchTerm);

  return matchesStatus && matchesSearch;
  });

  return (
    <>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Inter:wght@300;400;500;600&display=swap');

        .page-root {
          font-family: 'Inter', sans-serif;
          background-color: #F7F5F0;
          min-height: 100vh;
          color: #1a1a2e;
        }

        /* ── Page Header ── */
        .page-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 2.5rem;
        }

        .page-title {
          font-family: 'Playfair Display', serif;
          font-size: 2.5rem;
          font-weight: 700;
          color: #0F1C2E;
          letter-spacing: -0.5px;
          line-height: 1.1;
          margin: 0 0 0.35rem 0;
        }

        .page-subtitle {
          font-size: 0.875rem;
          color: #64748B;
          font-weight: 400;
          letter-spacing: 0.01em;
          margin: 0;
        }

        /* ── New Applicant Button ── */
        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background-color: #0F1C2E;
          color: #C9A84C;
          font-family: 'Inter', sans-serif;
          font-size: 0.8125rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 0.75rem 1.5rem;
          border-radius: 4px;
          text-decoration: none;
          transition: background-color 0.2s, color 0.2s;
          white-space: nowrap;
        }

        .btn-primary:hover {
          background-color: #C9A84C;
          color: #0F1C2E;
        }

        /* ── Search ── */
        .search-wrapper {
          position: relative;
          margin-bottom: 1.5rem;
        }

        .search-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: #94a3b8;
          font-size: 1rem;
          pointer-events: none;
        }

        .search-input {
          width: 100%;
          background: #ffffff;
          border: 1px solid #e2e0db;
          border-radius: 4px;
          padding: 0.8rem 1rem 0.8rem 2.75rem;
          font-family: 'Inter', sans-serif;
          font-size: 0.875rem;
          color: #0F1C2E;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          box-sizing: border-box;
        }

        .search-input::placeholder {
          color: #94a3b8;
        }

        .search-input:focus {
          border-color: #C9A84C;
          box-shadow: 0 0 0 3px rgba(201, 168, 76, 0.12);
        }

        /* ── Filter Pills ── */
        .filters {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 2.5rem;
          flex-wrap: wrap;
        }

        .filter-pill {
          font-family: 'Inter', sans-serif;
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 0.45rem 1.1rem;
          border-radius: 2px;
          text-decoration: none;
          border: 1px solid transparent;
          transition: all 0.18s;
        }

        .filter-all {
          background: #0F1C2E;
          color: #C9A84C;
          border-color: #0F1C2E;
        }

        .filter-all:hover {
          background: #C9A84C;
          color: #0F1C2E;
          border-color: #C9A84C;
        }

        .filter-processing {
          background: transparent;
          color: #B45309;
          border-color: #D97706;
        }

        .filter-processing:hover {
          background: #FEF3C7;
        }

        .filter-deployment {
          background: transparent;
          color: #1D4ED8;
          border-color: #3B82F6;
        }

        .filter-deployment:hover {
          background: #EFF6FF;
        }

        .filter-deployed {
          background: transparent;
          color: #166534;
          border-color: #22C55E;
        }

        .filter-deployed:hover {
          background: #F0FDF4;
        }

        /* ── Stat Cards ── */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.25rem;
          margin-bottom: 2.5rem;
        }

        @media (max-width: 900px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 500px) {
          .stats-grid { grid-template-columns: 1fr; }
        }

        .stat-card {
          background: #ffffff;
          border-radius: 4px;
          padding: 1.5rem 1.5rem 1.5rem 1.25rem;
          border-left: 3px solid #C9A84C;
          position: relative;
          overflow: hidden;
        }

        .stat-card::after {
          content: '';
          position: absolute;
          top: 0; right: 0;
          width: 60px; height: 60px;
          background: linear-gradient(135deg, transparent 50%, rgba(201,168,76,0.06) 50%);
        }

        .stat-label {
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #94A3B8;
          margin: 0 0 0.5rem 0;
        }

        .stat-number {
          font-family: 'Playfair Display', serif;
          font-size: 2.25rem;
          font-weight: 700;
          line-height: 1;
          margin: 0;
        }

        .stat-number.gold   { color: #0F1C2E; }
        .stat-number.amber  { color: #D97706; }
        .stat-number.blue   { color: #2563EB; }
        .stat-number.green  { color: #16A34A; }

        /* ── Table ── */
        .table-wrapper {
          background: #ffffff;
          border-radius: 4px;
          overflow-x: auto;
          border: 1px solid #e8e5df;
        }

        .data-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.8125rem;
        }

        .data-table thead tr {
          background-color: #0F1C2E;
        }

        .data-table thead th {
          padding: 1rem 1.1rem;
          text-align: left;
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #C9A84C;
          white-space: nowrap;
        }

        .data-table tbody tr {
          border-bottom: 1px solid #F1EFE9;
          transition: background-color 0.15s;
        }

        .data-table tbody tr:last-child {
          border-bottom: none;
        }

        .data-table tbody tr:hover {
          background-color: #FDFAF3;
        }

        .data-table td {
          padding: 0.9rem 1.1rem;
          color: #334155;
          white-space: nowrap;
        }

        .worker-link {
          font-weight: 600;
          color: #0F1C2E;
          text-decoration: none;
          letter-spacing: 0.01em;
        }

        .worker-link:hover {
          color: #C9A84C;
        }

        /* ── Status Badges ── */
        .badge {
          display: inline-block;
          padding: 0.25rem 0.65rem;
          border-radius: 2px;
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .badge-deployed    { background: #F0FDF4; color: #166534; border: 1px solid #BBF7D0; }
        .badge-deployment  { background: #EFF6FF; color: #1D4ED8; border: 1px solid #BFDBFE; }
        .badge-processing  { background: #FFFBEB; color: #B45309; border: 1px solid #FDE68A; }

        /* ── Action Buttons ── */
        .actions-cell {
          display: flex;
          gap: 0.4rem;
          align-items: center;
        }

        .btn-edit {
          font-family: 'Inter', sans-serif;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 0.3rem 0.75rem;
          border-radius: 2px;
          text-decoration: none;
          background: transparent;
          color: #0F1C2E;
          border: 1px solid #0F1C2E;
          transition: all 0.15s;
          cursor: pointer;
        }

        .btn-edit:hover {
          background: #0F1C2E;
          color: #C9A84C;
        }

        .btn-delete {
          font-family: 'Inter', sans-serif;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 0.3rem 0.75rem;
          border-radius: 2px;
          background: transparent;
          color: #DC2626;
          border: 1px solid #FCA5A5;
          transition: all 0.15s;
          cursor: pointer;
        }

        .btn-delete:hover {
          background: #FEF2F2;
          border-color: #DC2626;
        }

        /* ── Empty State ── */
        .empty-state {
          text-align: center;
          padding: 4rem 2rem;
          color: #94A3B8;
        }

        .empty-state p {
          font-family: 'Playfair Display', serif;
          font-size: 1.125rem;
          margin: 0 0 0.5rem;
          color: #64748B;
        }

        .empty-state span {
          font-size: 0.8125rem;
        }

        /* ── Divider line under header ── */
        .gold-rule {
          width: 2.5rem;
          height: 2px;
          background: #C9A84C;
          margin: 0.6rem 0 0 0;
          border: none;
        }
      `}</style>

      <main className="page-root" style={{ padding: "2.5rem 2.5rem 4rem" }}>

        {/* Header */}
        <div className="page-header">
          <div>
            <h1 className="page-title">Applicants</h1>
            <hr className="gold-rule" />
            <p className="page-subtitle" style={{ marginTop: "0.6rem" }}>
              Manage all applicant records and deployment progress
            </p>
          </div>

          <Link href="/applicants/new" className="btn-primary">
            + New Applicant
          </Link>
        </div>

        {/* Search */}
        <form method="GET" className="search-wrapper">
          <span className="search-icon">⌕</span>

          <input
            type="text"
            name="search"
            placeholder="Search SR Code, Name, Passport..."
            defaultValue={params?.search || ""}
            className="search-input"
          />
        </form>
        
        {/* Filters */}
        <div className="filters">
          <Link href="/applicants" className="filter-pill filter-all">All</Link>
          <Link href="/applicants?status=Processing" className="filter-pill filter-processing">Processing</Link>
          <Link href="/applicants?status=For Deployment" className="filter-pill filter-deployment">For Deployment</Link>
          <Link href="/applicants?status=Deployed" className="filter-pill filter-deployed">Deployed</Link>
        </div>

        {/* Stats */}
        <div className="stats-grid">
          <div className="stat-card">
            <p className="stat-label">Total Applicants</p>
            <p className="stat-number gold">{applicants?.length || 0}</p>
          </div>
          <div className="stat-card">
            <p className="stat-label">Processing</p>
            <p className="stat-number amber">
              {applicants?.filter((a) => a.deployment_status === "Processing").length || 0}
            </p>
          </div>
          <div className="stat-card">
            <p className="stat-label">For Deployment</p>
            <p className="stat-number blue">
              {applicants?.filter((a) => a.deployment_status === "For Deployment").length || 0}
            </p>
          </div>
          <div className="stat-card">
            <p className="stat-label">Deployed</p>
            <p className="stat-number green">
              {applicants?.filter((a) => a.deployment_status === "Deployed").length || 0}
            </p>
          </div>
        </div>

        {/* Table */}
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>SR Code</th>
                <th>Worker Name</th>
                <th>Position</th>
                <th>Country</th>
                <th>Employer</th>
                <th>FRA</th>
                <th>Passport No.</th>
                <th>Status</th>
                <th>Delete</th>
              </tr>
            </thead>

            <tbody>
              {filteredApplicants && filteredApplicants.length > 0 ? (
                filteredApplicants.map((applicant) => (
                  <tr key={applicant.id}>
                    <td style={{ fontWeight: 700, color: "#2563EB" }}>
                      {applicant.sr_code ?? "_"}
                    </td>

                    <td>
                      <Link
                        href={`/applicants/${applicant.id}`}
                        className="worker-link"
                      >
                        {applicant.worker_name}
                      </Link>
                    </td>
                    <td>{applicant.position}</td>
                    <td>{applicant.country}</td>
                    <td>{applicant.employer}</td>
                    <td>{applicant.fra}</td>
                    <td>{applicant.passport_number}</td>
                    <td>
                      <span
                        className={`badge ${
                          applicant.deployment_status === "Deployed"
                            ? "badge-deployed"
                            : applicant.deployment_status === "For Deployment"
                            ? "badge-deployment"
                            : "badge-processing"
                        }`}
                      >
                        {applicant.deployment_status || "Processing"}
                      </span>
                    </td>
                    <td style={{ textAlign: "center" }}>
                      <form action={deleteApplicant} style={{ margin: 0 }}>
                        <input type="hidden" name="id" value={applicant.id} />

                        <button
                          type="submit"
                          title="Delete Applicant"
                          style={{
                            border: "none",
                            background: "transparent",
                            color: "#DC2626",
                            fontSize: "20px",
                            fontWeight: "bold",
                            cursor: "pointer",
                          }}
                        >
                          ✕
                        </button>
                      </form>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={10}>
                    <div className="empty-state">
                      <p>No applicants found</p>
                      <span>Try adjusting your filter or add a new applicant.</span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </main>
    </>
  );
}