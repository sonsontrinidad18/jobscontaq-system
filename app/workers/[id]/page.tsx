import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default async function WorkerProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: worker, error } = await supabase
    .from("workers")
    .select("*")
    .eq("id", id)
    .single();

  console.log(error);

  if (!worker) {
    return (
      <main className="p-10">
        <h1 className="text-2xl font-bold">
          Worker not found
        </h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6 md:p-8">
      {/* TOP HEADER */}
      <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-green-700">
            {worker.hsw_name}
          </h1>

          <p className="mt-2 text-gray-600">
            Worker Profile Dashboard
          </p>
        </div>

        <div className="flex gap-3">
          <Link
            href="/workers"
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50"
          >
            Back
          </Link>

          <Link
            href={`/workers/${worker.id}/edit`}
            className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
          >
            Edit Worker
          </Link>
        </div>
      </div>

      {/* PROFILE SUMMARY */}
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
        <SummaryCard
          label="Medical"
          value={worker.medical}
        />

        <SummaryCard
          label="Contract"
          value={worker.contract_status}
        />

        <SummaryCard
          label="Visa"
          value={worker.visa_stamping}
        />

        <SummaryCard
          label="Deployment"
          value={worker.deployment_date}
        />
      </div>

      {/* BASIC INFO */}
      <div className="mb-6 rounded-xl bg-white p-6 shadow">
        <h2 className="mb-6 text-xl font-bold text-gray-800">
          Basic Information
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <InfoCard
            label="SR Number"
            value={worker.sr_number}
          />

          <InfoCard
            label="CV Code"
            value={worker.cv_code}
          />

          <InfoCard
            label="Passport Number"
            value={worker.passport_number}
          />

          <InfoCard
            label="Employer Name"
            value={worker.employer_name}
          />

          <InfoCard
            label="Visa Number"
            value={worker.visa_number}
          />

          <InfoCard
            label="ID Number"
            value={worker.id_number}
          />
        </div>
      </div>

      {/* PROCESS TRACKING */}
      <div className="mb-6 rounded-xl bg-white p-6 shadow">
        <h2 className="mb-6 text-xl font-bold text-gray-800">
          Process Tracking
        </h2>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          <StatusCard
            label="Medical"
            value={worker.medical}
          />

          <StatusCard
            label="Contract Status"
            value={worker.contract_status}
          />

          <StatusCard
            label="OWWA / PDOS"
            value={worker.owwa_pdos}
          />

          <StatusCard
            label="TESDA"
            value={worker.tesda_infosheet}
          />

          <StatusCard
            label="NBI"
            value={worker.nbi}
          />

          <StatusCard
            label="Biometrics"
            value={worker.biometrics}
          />

          <StatusCard
            label="OEC IN"
            value={worker.oec_in}
          />

          <StatusCard
            label="OEC OUT"
            value={worker.oec_out}
          />

          <StatusCard
            label="Visa Stamping"
            value={worker.visa_stamping}
          />

          <StatusCard
            label="Contract Received"
            value={worker.contract_received}
          />
        </div>
      </div>

      {/* REMARKS */}
      <div className="mb-6 rounded-xl bg-white p-6 shadow">
        <h2 className="mb-4 text-xl font-bold text-gray-800">
          Remarks
        </h2>

        <div className="rounded-lg border border-green-200 bg-green-50 p-4">
          <p className="leading-relaxed text-gray-700">
            {worker.remarks_2 ||
              worker.remarks ||
              "No remarks available."}
          </p>
        </div>
      </div>

      {/* DEPLOYMENT INFO */}
      <div className="rounded-xl bg-white p-6 shadow">
        <h2 className="mb-6 text-xl font-bold text-gray-800">
          Deployment Information
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <InfoCard
            label="Deployment Date"
            value={worker.deployment_date}
          />

          <InfoCard
            label="Created At"
            value={
              worker.created_at
                ? new Date(
                    worker.created_at
                  ).toLocaleDateString()
                : "-"
            }
          />
        </div>
      </div>
    </main>
  );
}

/* =========================================
   SUMMARY CARD
========================================= */

function SummaryCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-white p-5 shadow">
      <p className="text-sm text-gray-500">
        {label}
      </p>

      <p className="mt-2 text-lg font-bold text-gray-800">
        {value || "-"}
      </p>
    </div>
  );
}

/* =========================================
   INFO CARD
========================================= */

function InfoCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-gray-200 p-4">
      <p className="text-sm text-gray-500">
        {label}
      </p>

      <p className="mt-2 font-semibold text-gray-800">
        {value || "-"}
      </p>
    </div>
  );
}

/* =========================================
   STATUS CARD
========================================= */

function StatusCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  const status = value?.toLowerCase();

  let color =
    "bg-gray-100 text-gray-700 border-gray-200";

  if (
    status?.includes("fit") ||
    status?.includes("done") ||
    status?.includes("approved") ||
    status?.includes("ok")
  ) {
    color =
      "bg-green-100 text-green-700 border-green-200";
  }

  if (
    status?.includes("pending") ||
    status?.includes("processing")
  ) {
    color =
      "bg-yellow-100 text-yellow-700 border-yellow-200";
  }

  if (
    status?.includes("unfit") ||
    status?.includes("return")
  ) {
    color =
      "bg-red-100 text-red-700 border-red-200";
  }

  return (
    <div
      className={`rounded-xl border p-4 ${color}`}
    >
      <p className="text-sm font-medium">
        {label}
      </p>

      <p className="mt-3 text-lg font-bold">
        {value || "-"}
      </p>
    </div>
  );
}