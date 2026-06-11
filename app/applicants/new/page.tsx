import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function NewApplicant() {
  async function createApplicant(formData: FormData) {
    "use server";

    const { error } = await supabase
      .from("applicants")
      .insert({
        worker_name: formData.get("worker_name"),
        position: formData.get("position"),
        country: formData.get("country"),
        employer: formData.get("employer"),
        fra: formData.get("fra"),
        passport_number: formData.get("passport_number"),
        contact_number: formData.get("contact_number"),
        province: formData.get("province"),

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
    <main className="p-8">
      <h1 className="mb-8 text-4xl font-bold text-green-700">
        New Applicant
      </h1>

      <form
        action={createApplicant}
        className="rounded-xl bg-white p-8 shadow"
      >
        <div className="grid gap-6 md:grid-cols-2">
          <Input label="Worker Name" name="worker_name" />
          <Input label="Position" name="position" />
          <Input label="Country" name="country" />
          <Input label="Employer" name="employer" />
          <Input label="FRA" name="fra" />
          <Input label="Passport Number" name="passport_number" />
          <Input label="Contact Number" name="contact_number" />
          <Input label="Province" name="province" />
        </div>

        <button
          type="submit"
          className="mt-8 rounded-lg bg-green-600 px-6 py-3 font-medium text-white hover:bg-green-700"
        >
          Save Applicant
        </button>
      </form>
    </main>
  );
}

function Input({
  label,
  name,
}: {
  label: string;
  name: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium">
        {label}
      </label>

      <input
        type="text"
        name={name}
        required
        className="w-full rounded-lg border p-3"
      />
    </div>
  );
}