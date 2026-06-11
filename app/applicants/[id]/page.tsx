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
      <main className="p-8">
        <h1>Applicant not found</h1>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </main>
    );
  }

  return (
    <main className="p-8">

      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-green-700">
            {applicant.worker_name}
          </h1>

          <p className="mt-2 text-gray-600">
            Applicant Profile
          </p>
        </div>

        <div className="flex gap-3">
          <Link
            href="/applicants"
            className="rounded-lg border px-4 py-2"
          >
            Back
          </Link>

          <Link
            href={`/applicants/${applicant.id}/edit`}
            className="rounded-lg bg-green-600 px-4 py-2 text-white"
          >
            Edit Applicant
          </Link>
        </div>
      </div>

      <div className="mb-8 rounded-xl bg-white p-6 shadow">
        <h2 className="mb-6 text-2xl font-bold">
          Basic Information
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          <Info label="Worker Name" value={applicant.worker_name} />
          <Info label="Position" value={applicant.position} />
          <Info label="Country" value={applicant.country} />
          <Info label="Employer" value={applicant.employer} />
          <Info label="FRA" value={applicant.fra} />
          <Info label="Passport Number" value={applicant.passport_number} />
          <Info label="Contact Number" value={applicant.contact_number} />
          <Info label="Province" value={applicant.province} />
        </div>
      </div>

      <div className="mb-8 rounded-xl bg-white p-6 shadow">
        <h2 className="mb-6 text-2xl font-bold">
          Processing Status
        </h2>

        <div className="grid gap-4 md:grid-cols-3">
          <Info label="DMW E-Registration" value={applicant.dmw_registration} />
          <Info label="Info Sheet" value={applicant.info_sheet} />
          <Info label="CV" value={applicant.cv_status} />
          <Info label="Medical" value={applicant.medical} />
          <Info label="PEOS" value={applicant.peos} />
          <Info label="Biometrics" value={applicant.biometrics} />
          <Info label="Visa" value={applicant.visa} />
          <Info label="Contract Verified" value={applicant.contract_verified} />
          <Info label="OEC" value={applicant.oec} />
        </div>
      </div>

      <div className="rounded-xl bg-white p-6 shadow">
        <h2 className="mb-6 text-2xl font-bold">
          Deployment
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          <Info label="Flight" value={applicant.flight} />
          <Info label="Deployment Status" value={applicant.deployment_status} />
          <Info label="Start Date" value={applicant.start_date} />
          <Info label="Days Processing" value={applicant.days_processing} />
          <Info label="Progress %" value={applicant.progress_percentage} />
          <Info label="Remarks" value={applicant.remarks} />
        </div>
      </div>
    </main>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value: any;
}) {
  return (
    <div className="rounded-lg border p-4">
      <p className="text-sm text-gray-500">
        {label}
      </p>

      <p className="mt-1 font-semibold">
        {value || "-"}
      </p>
    </div>
  );
}