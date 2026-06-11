import { supabase } from "@/lib/supabase";

export default async function DashboardPage() {
  const { count: workersCount } = await supabase
    .from("workers")
    .select("*", { count: "exact", head: true });

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-green-700">
          JobsContaq Dashboard
        </h1>

        <p className="mt-2 text-gray-600">
          Worker Monitoring and Applicant Tracking System
        </p>
      </div>

      {/* DASHBOARD CARDS */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">

        <div className="rounded-xl bg-white p-6 shadow">
          <p className="text-sm text-gray-500">
            Total Workers
          </p>

          <h2 className="mt-2 text-3xl font-bold text-green-700">
            {workersCount || 0}
          </h2>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <p className="text-sm text-gray-500">
            Deployed Workers
          </p>

          <h2 className="mt-2 text-3xl font-bold text-blue-600">
            --
          </h2>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <p className="text-sm text-gray-500">
            Transfers
          </p>

          <h2 className="mt-2 text-3xl font-bold text-yellow-500">
            --
          </h2>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <p className="text-sm text-gray-500">
            Out of KSA
          </p>

          <h2 className="mt-2 text-3xl font-bold text-red-500">
            --
          </h2>
        </div>

      </div>

      {/* RECENT ACTIVITY SECTION */}
      <div className="mt-8 rounded-xl bg-white p-6 shadow">
        <h2 className="mb-4 text-xl font-semibold">
          Recent Activity
        </h2>

        <p className="text-gray-500">
          Activity logs will appear here.
        </p>
      </div>
    </main>
  );
}