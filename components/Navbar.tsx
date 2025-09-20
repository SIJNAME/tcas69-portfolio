
import Link from "next/link";

export function Navbar() {
  return (
    <nav className="bg-blue-900 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold">TCAS69 PORTFOLIO</h1>
        <div className="flex gap-4">
          <Link
            href="/"
            className="px-3 py-2 rounded hover:bg-blue-700 transition"
          >
            Home
          </Link>
          <Link
            href="/admin"
            className="px-3 py-2 rounded hover:bg-blue-700 transition"
          >
            สำหรับอาจารย์
          </Link>
        </div>
      </div>
    </nav>
  );
}
