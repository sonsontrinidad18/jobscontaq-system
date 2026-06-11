import { supabase } from "@/lib/supabase";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

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
      <main className="p-8">
        <h1 className="text-2xl font-bold text-red-600">
          Applicant not found
        </h1>
      </main>
    );
  }

  async function updateApplicant(formData: FormData) {
    "use server";

    const applicantData = {
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

      days_processing:
        Number(formData.get("days_processing")) || 0,

      progress_percentage:
        Number(formData.get("progress_percentage")) || 0,

      remarks: formData.get("remarks"),
    };

    const { data, error } = await supabase
      .from("applicants")
      .update(applicantData)
      .eq("id", id)
      .select();

    console.log("UPDATED DATA:", data);
    console.log("UPDATE ERROR:", error);

    if (error) {
      throw new Error(error.message);
    }

    revalidatePath("/applicants");
    revalidatePath(`/applicants/${id}`);

    redirect(`/applicants/${id}`);
  }

  return (
    <main className="p-8">
      <h1 className="mb-8 text-4xl font-bold text-green-700">
        Edit Applicant
      </h1>

      <form action={updateApplicant} className="space-y-8">

        {/* Basic Information */}
        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="mb-4 text-2xl font-bold">
            Basic Information
          </h2>

          <div className="grid gap-4 md:grid-cols-2">

            <Input
              label="Worker Name"
              name="worker_name"
              defaultValue={applicant.worker_name}
            />

            <SelectInput
              label="Position"
              name="position"
              defaultValue={applicant.position}
              options={[
                "HSW",
                "Caregiver",
                "Driver",
                "Cleaner",
              ]}
            />

            <Input
              label="Country"
              name="country"
              defaultValue={applicant.country}
            />

            <Input
              label="Employer"
              name="employer"
              defaultValue={applicant.employer}
            />

            <Input
              label="FRA"
              name="fra"
              defaultValue={applicant.fra}
            />

            <Input
              label="Passport Number"
              name="passport_number"
              defaultValue={applicant.passport_number}
            />

            <Input
              label="Contact Number"
              name="contact_number"
              defaultValue={applicant.contact_number}
            />

            <Input
              label="Province"
              name="province"
              defaultValue={applicant.province}
            />
          </div>
        </div>

        {/* Processing Status */}
        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="mb-4 text-2xl font-bold">
            Processing Status
          </h2>

          <div className="grid gap-4 md:grid-cols-3">

            <StatusSelect
              label="DMW Registration"
              name="dmw_registration"
              defaultValue={applicant.dmw_registration}
            />

            <StatusSelect
              label="Info Sheet"
              name="info_sheet"
              defaultValue={applicant.info_sheet}
            />

            <StatusSelect
              label="CV"
              name="cv_status"
              defaultValue={applicant.cv_status}
            />

            <StatusSelect
              label="Medical"
              name="medical"
              defaultValue={applicant.medical}
            />

            <StatusSelect
              label="PEOS"
              name="peos"
              defaultValue={applicant.peos}
            />

            <StatusSelect
              label="Biometrics"
              name="biometrics"
              defaultValue={applicant.biometrics}
            />

            <StatusSelect
              label="Visa"
              name="visa"
              defaultValue={applicant.visa}
            />

            <StatusSelect
              label="Contract Verified"
              name="contract_verified"
              defaultValue={applicant.contract_verified}
            />

            <StatusSelect
              label="OEC"
              name="oec"
              defaultValue={applicant.oec}
            />
          </div>
        </div>

        {/* Deployment */}
        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="mb-4 text-2xl font-bold">
            Deployment
          </h2>

          <div className="grid gap-4 md:grid-cols-2">

            <Input
              label="Flight"
              name="flight"
              defaultValue={applicant.flight}
            />

            <SelectInput
              label="Deployment Status"
              name="deployment_status"
              defaultValue={applicant.deployment_status}
              options={[
                "Processing",
                "For Deployment",
                "Deployed",
              ]}
            />

            <Input
              label="Start Date"
              name="start_date"
              defaultValue={applicant.start_date}
            />

            <Input
              label="Days Processing"
              name="days_processing"
              defaultValue={applicant.days_processing}
            />

            <Input
              label="Progress %"
              name="progress_percentage"
              defaultValue={applicant.progress_percentage}
            />

          </div>

          <div className="mt-4">
            <label className="mb-2 block">
              Remarks
            </label>

            <textarea
              name="remarks"
              defaultValue={applicant.remarks || ""}
              rows={5}
              className="w-full rounded-lg border p-3"
            />
          </div>
        </div>

        <button
          type="submit"
          className="rounded-lg bg-green-600 px-6 py-3 font-medium text-white hover:bg-green-700"
        >
          Save Changes
        </button>
      </form>
    </main>
  );
}

function Input({
  label,
  name,
  defaultValue,
}: {
  label: string;
  name: string;
  defaultValue?: any;
}) {
  return (
    <div>
      <label className="mb-2 block">{label}</label>

      <input
        name={name}
        defaultValue={defaultValue ?? ""}
        className="w-full rounded-lg border p-3"
      />
    </div>
  );
}

function SelectInput({
  label,
  name,
  defaultValue,
  options,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  options: string[];
}) {
  return (
    <div>
      <label className="mb-2 block">{label}</label>

      <select
        name={name}
        defaultValue={defaultValue || ""}
        className="w-full rounded-lg border p-3"
      >
        <option value="">-- Select --</option>

        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

function StatusSelect({
  label,
  name,
  defaultValue,
}: {
  label: string;
  name: string;
  defaultValue?: string;
}) {
  return (
    <div>
      <label className="mb-2 block">{label}</label>

      <select
        name={name}
        defaultValue={defaultValue || ""}
        className="w-full rounded-lg border p-3"
      >
        <option value="">-- Select --</option>
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>
      </select>
    </div>
  );
}