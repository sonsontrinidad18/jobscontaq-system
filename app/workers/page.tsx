import Link from "next/link";

import { supabase } from "@/lib/supabase";

export default async function WorkersPage() {
  const { data: workers, error } = await supabase
    .from("workers")
    .select("*")
    .order("sr_number", { ascending: true });

  console.log(error);

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-green-700">
          Worker Monitoring System
        </h1>

        <p className="mt-2 text-gray-600">
          Monitor deployed workers and applicant deployment progress.
        </p>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto rounded-xl bg-white shadow">
        <table className="min-w-full border-collapse text-sm">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="px-4 py-3 text-left">SR #</th>
              <th className="px-4 py-3 text-left">CV Code</th>
              <th className="px-4 py-3 text-left">Worker Name</th>
              <th className="px-4 py-3 text-left">Passport #</th>
              <th className="px-4 py-3 text-left">Employer</th>
              <th className="px-4 py-3 text-left">Medical</th>
              <th className="px-4 py-3 text-left">Contract</th>
              <th className="px-4 py-3 text-left">OWWA/PDOS</th>
              <th className="px-4 py-3 text-left">TESDA</th>
              <th className="px-4 py-3 text-left">NBI</th>
              <th className="px-4 py-3 text-left">Biometrics</th>
              <th className="px-4 py-3 text-left">OEC IN</th>
              <th className="px-4 py-3 text-left">OEC OUT</th>
              <th className="px-4 py-3 text-left">Visa Stamping</th>
              <th className="px-4 py-3 text-left">Remarks</th>
              <th className="px-4 py-3 text-left">Deployment</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {workers?.map((worker) => (
              <tr
                key={worker.id}
                className="border-b hover:bg-gray-50"
              >
                <td className="px-4 py-3">
                  {worker.sr_number}
                </td>

                <td className="px-4 py-3">
                  {worker.cv_code}
                </td>

                <td className="px-4 py-3 font-medium whitespace-nowrap">
                  <Link
                    href={`/workers/${worker.id}`}
                    className="text-green-700 hover:underline"
                  >
                    {worker.hsw_name}
                  </Link>
                </td>

                <td className="px-4 py-3">
                  {worker.passport_number}
                </td>

                <td className="px-4 py-3 whitespace-nowrap">
                  {worker.employer_name}
                </td>

                <td className="px-4 py-3">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                    {worker.medical || "-"}
                  </span>
                </td>

                <td className="px-4 py-3">
                  {worker.contract_status || "-"}
                </td>

                <td className="px-4 py-3">
                  {worker.owwa_pdos || "-"}
                </td>

                <td className="px-4 py-3">
                  {worker.tesda_infosheet || "-"}
                </td>

                <td className="px-4 py-3">
                  {worker.nbi || "-"}
                </td>

                <td className="px-4 py-3">
                  {worker.biometrics || "-"}
                </td>

                <td className="px-4 py-3">
                  {worker.oec_in || "-"}
                </td>

                <td className="px-4 py-3">
                  {worker.oec_out || "-"}
                </td>

                <td className="px-4 py-3">
                  {worker.visa_stamping || "-"}
                </td>

                <td className="px-4 py-3">
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                    {worker.remarks || worker.remarks_2 || "-"}
                  </span>
                </td>

                <td className="px-4 py-3 whitespace-nowrap">
                  {worker.deployment_date || "-"}
                </td>

                {/* ACTION BUTTONS */}
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex gap-2">
                    <Link
                      href={`/workers/${worker.id}`}
                      className="rounded bg-blue-500 px-3 py-1 text-xs font-medium text-white hover:bg-blue-600"
                    >
                      View
                    </Link>

                    <Link
                      href={`/workers/${worker.id}/edit`}
                      className="rounded bg-green-600 px-3 py-1 text-xs font-medium text-white hover:bg-green-700"
                    >
                      Edit
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}