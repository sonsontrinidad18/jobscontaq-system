import { supabase } from "@/lib/supabase";

export default async function EditWorkerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: worker } = await supabase
    .from("workers")
    .select("*")
    .eq("id", id)
    .single();

  if (!worker) {
    return <div>Worker not found</div>;
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-4xl rounded-xl bg-white p-8 shadow">

        <h1 className="mb-6 text-3xl font-bold text-green-700">
          Edit Worker
        </h1>

        <form
          action={`/api/workers/${worker.id}`}
          method="POST"
          className="space-y-4"
        >
          <div>
            <label className="block font-medium">
              Worker Name
            </label>

            <input
              name="hsw_name"
              defaultValue={worker.hsw_name}
              className="w-full rounded border p-2"
            />
          </div>

          <div>
            <label className="block font-medium">
              Medical
            </label>

            <input
              name="medical"
              defaultValue={worker.medical}
              className="w-full rounded border p-2"
            />
          </div>

          <div>
            <label className="block font-medium">
              Contract Status
            </label>

            <input
              name="contract_status"
              defaultValue={worker.contract_status}
              className="w-full rounded border p-2"
            />
          </div>

          <div>
            <label className="block font-medium">
              OWWA / PDOS
            </label>

            <input
              name="owwa_pdos"
              defaultValue={worker.owwa_pdos}
              className="w-full rounded border p-2"
            />
          </div>

          <div>
            <label className="block font-medium">
              TESDA
            </label>

            <input
              name="tesda_infosheet"
              defaultValue={worker.tesda_infosheet}
              className="w-full rounded border p-2"
            />
          </div>

          <div>
            <label className="block font-medium">
              NBI
            </label>

            <input
              name="nbi"
              defaultValue={worker.nbi}
              className="w-full rounded border p-2"
            />
          </div>

          <div>
            <label className="block font-medium">
              Biometrics
            </label>

            <input
              name="biometrics"
              defaultValue={worker.biometrics}
              className="w-full rounded border p-2"
            />
          </div>

          <div>
            <label className="block font-medium">
              OEC IN
            </label>

            <input
              name="oec_in"
              defaultValue={worker.oec_in}
              className="w-full rounded border p-2"
            />
          </div>

          <div>
            <label className="block font-medium">
              OEC OUT
            </label>

            <input
              name="oec_out"
              defaultValue={worker.oec_out}
              className="w-full rounded border p-2"
            />
          </div>

          <div>
            <label className="block font-medium">
              Visa Stamping
            </label>

            <input
              name="visa_stamping"
              defaultValue={worker.visa_stamping}
              className="w-full rounded border p-2"
            />
          </div>

          <div>
            <label className="block font-medium">
              Remarks
            </label>

            <textarea
              name="remarks_2"
              defaultValue={worker.remarks_2}
              className="w-full rounded border p-2"
              rows={4}
            />
          </div>

          <div>
            <label className="block font-medium">
              Deployment Date
            </label>

            <input
              name="deployment_date"
              defaultValue={worker.deployment_date}
              className="w-full rounded border p-2"
            />
          </div>

          <button
            type="submit"
            className="rounded bg-green-600 px-6 py-3 text-white"
          >
            Save Changes
          </button>
        </form>

      </div>
    </main>
  );
}