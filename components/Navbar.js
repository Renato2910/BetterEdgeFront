import Link from "next/link";

export default function Navbar() {
  return (
    <nav
      className="bg-gray-800 p-4 rounded-md mb-4"
      aria-label="Navegação principal"
    >
      <ul className="flex space-x-4" role="menubar">
        <li role="none">
          <Link
            href="/"
            className="text-white hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded"
            role="menuitem"
          >
            Clientes
          </Link>
        </li>
        <li role="none">
          <Link
            href="/ativos"
            className="text-white hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded"
            role="menuitem"
          >
            Ativos
          </Link>
        </li>
      </ul>
    </nav>
  );
}
