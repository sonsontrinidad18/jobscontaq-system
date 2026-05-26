export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 p-10">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-green-700">
          JobsContaq Manpower System
        </h1>

        <p className="mt-2 text-gray-600">
          Applicant Tracking & Worker Monitoring System
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="text-lg font-semibold">Total Applicants</h2>
          <p className="mt-4 text-3xl font-bold text-green-600">0</p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="text-lg font-semibold">Pending Medical</h2>
          <p className="mt-4 text-3xl font-bold text-yellow-500">0</p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="text-lg font-semibold">Ready For Flight</h2>
          <p className="mt-4 text-3xl font-bold text-blue-600">0</p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="text-lg font-semibold">Workers in KSA</h2>
          <p className="mt-4 text-3xl font-bold text-red-500">0</p>
        </div>
      </div>
    </main>
  );
}