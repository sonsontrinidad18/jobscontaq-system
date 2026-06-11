import Link from "next/link";
import Image from "next/image";

export default function Sidebar() {
  return (
    <aside className="min-h-screen w-64 bg-green-700 p-6 text-white">

      <div className="mb-8 text-center">
        <Image
          src="/jobscontaq-logo.jpg"
          alt="JobsContaq Manpower Corp"
          width={220}
          height={80}
          priority
          className="mx-auto rounded bg-white p-2"
        />

        <p className="mt-3 text-xs text-green-100">
          Applicant & Worker Management System
        </p>
      </div>

      <nav className="space-y-4">
        <Link
          href="/"
          className="block rounded-lg p-3 transition hover:bg-green-600"
        >
          Dashboard
        </Link>

        <Link
          href="/applicants"
          className="block rounded-lg p-3 transition hover:bg-green-600"
        >
          Applicants
        </Link>

        <Link
          href="/workers"
          className="block rounded-lg p-3 transition hover:bg-green-600"
        >
          Workers
        </Link>
      </nav>

    </aside>
  );
}