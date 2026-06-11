export default function Header() {
  return (
    <header className="flex items-center justify-between border-b bg-white px-8 py-4 shadow-sm">
      <div>
        <h1 className="text-xl font-bold text-gray-800">
          JobsContaq Recruitment Agency
        </h1>

        <p className="text-sm text-gray-500">
          Applicant & Worker Management System
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="font-medium text-gray-800">
            Administrator
          </p>

          <p className="text-sm text-gray-500">
            Online
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-700 text-white font-bold">
          A
        </div>
      </div>
    </header>
  );
}