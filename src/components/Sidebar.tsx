import Link from "next/link";

export default function Sidebar() {
  return (
    <>
      <div className="hidden lg:flex flex-col h-screen w-72 bg-gray-800 text-white fixed">
        <div className="flex items-center justify-center h-16 bg-gray-900 text-2xl font-bold">
          My Dashboard
        </div>
        <nav className="flex-grow p-4">
          <ul className="space-y-2">
            <li>
              <Link
                href="/content"
                className="block p-3 rounded hover:bg-gray-700"
              >
                Contents
              </Link>
            </li>
            <li>
              <Link
                href="/create"
                className="block p-3 rounded hover:bg-gray-700"
              >
                Create Content
              </Link>
            </li>
          </ul>
        </nav>
        <div className="p-4">
          <button className="w-full p-3 bg-gray-700 rounded hover:bg-gray-600">
            Logout
          </button>
        </div>
      </div>

      <div className="lg:hidden bg-gray-800 text-white flex justify-between items-center p-2">
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link
                href="/dashboard"
                className="text-sm p-2 rounded hover:bg-gray-700"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/create"
                className="text-sm p-2 rounded hover:bg-gray-700"
              >
                Create
              </Link>
            </li>
          </ul>
        </nav>
        <button className="text-sm p-2 bg-gray-700 rounded hover:bg-gray-600">
          Logout
        </button>
      </div>
    </>
  );
}
