import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export default async function ApplicantsPage({
  searchParams,
}: {
  searchParams?: Promise<{
    status?: string;
  }>;
}) {
  const params = await searchParams;
  const statusFilter = params?.status;

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

  const filteredApplicants = statusFilter
    ? applicants?.filter(
        (a) => a.deployment_status === statusFilter
      )
    : applicants;

  return (
    <main className="p-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-green-700">
            Applicants
          </h1>

          <p className="mt-2 text-gray-600">
            Manage all applicant records and deployment progress
          </p>
        </div>

        <Link
          href="/applicants/new"
          className="rounded-lg bg-green-600 px-5 py-3 font-medium text-white hover:bg-green-700"
        >
          + New Applicant
        </Link>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search applicant name..."
          className="w-full rounded-lg border p-3"
        />
      </div>

      {/* Filters */}
      <div className="mb-8 flex gap-3">
        <Link
          href="/applicants"
          className="rounded-lg bg-gray-200 px-4 py-2"
        >
          All
        </Link>

        <Link
          href="/applicants?status=Processing"
          className="rounded-lg bg-yellow-100 px-4 py-2 text-yellow-700"
        >
          Processing
        </Link>

        <Link
          href="/applicants?status=For Deployment"
          className="rounded-lg bg-blue-100 px-4 py-2 text-blue-700"
        >
          For Deployment
        </Link>

        <Link
          href="/applicants?status=Deployed"
          className="rounded-lg bg-green-100 px-4 py-2 text-green-700"
        >
          Deployed
        </Link>
      </div>

      {/* Stats */}
      <div className="mb-8 grid gap-6 md:grid-cols-4">
        <div className="rounded-xl bg-white p-6 shadow">
          <p className="text-sm text-gray-500">
            Total Applicants
          </p>

          <h2 className="mt-2 text-3xl font-bold text-green-700">
            {applicants?.length || 0}
          </h2>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <p className="text-sm text-gray-500">
            Processing
          </p>

          <h2 className="mt-2 text-3xl font-bold text-yellow-600">
            {
              applicants?.filter(
                (a) => a.deployment_status === "Processing"
              ).length || 0
            }
          </h2>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <p className="text-sm text-gray-500">
            For Deployment
          </p>

          <h2 className="mt-2 text-3xl font-bold text-blue-600">
            {
              applicants?.filter(
                (a) =>
                  a.deployment_status ===
                  "For Deployment"
              ).length || 0
            }
          </h2>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <p className="text-sm text-gray-500">
            Deployed
          </p>

          <h2 className="mt-2 text-3xl font-bold text-green-600">
            {
              applicants?.filter(
                (a) => a.deployment_status === "Deployed"
              ).length || 0
            }
          </h2>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl bg-white shadow">
        <table className="w-full">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="p-4 text-left">Worker Name</th>
              <th className="p-4 text-left">Position</th>
              <th className="p-4 text-left">Country</th>
              <th className="p-4 text-left">Employer</th>
              <th className="p-4 text-left">FRA</th>
              <th className="p-4 text-left">Passport No.</th>
              <th className="p-4 text-left">Contact No.</th>
              <th className="p-4 text-left">Province</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredApplicants?.map((applicant) => (
              <tr
                key={applicant.id}
                className="border-b hover:bg-gray-50"
              >
                <td className="p-4">
                  <Link
                    href={`/applicants/${applicant.id}`}
                    className="font-medium text-green-700 hover:underline"
                  >
                    {applicant.worker_name}
                  </Link>
                </td>

                <td className="p-4">
                  {applicant.position}
                </td>

                <td className="p-4">
                  {applicant.country}
                </td>

                <td className="p-4">
                  {applicant.employer}
                </td>

                <td className="p-4">
                  {applicant.fra}
                </td>

                <td className="p-4">
                  {applicant.passport_number}
                </td>

                <td className="p-4">
                  {applicant.contact_number}
                </td>

                <td className="p-4">
                  {applicant.province}
                </td>

                <td className="p-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      applicant.deployment_status ===
                      "Deployed"
                        ? "bg-green-100 text-green-700"
                        : applicant.deployment_status ===
                          "For Deployment"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {applicant.deployment_status ||
                      "Processing"}
                  </span>
                </td>

                <td className="p-4">
                  <div className="flex gap-2">
                    <Link
                      href={`/applicants/${applicant.id}/edit`}
                      className="rounded bg-blue-600 px-3 py-1 text-white hover:bg-blue-700"
                      >
                        Edit
                      </Link>

                      <form action={deleteApplicant}>
                       <input
                          type="hidden"
                          name="id"
                          value={applicant.id}
                        />

                    <button
                      type="submit"
                      className="rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </form>
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
