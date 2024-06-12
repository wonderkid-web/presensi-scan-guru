"use client"
// components/Sidebar.tsx

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
  const pathname = usePathname()
  

  return (
    <div className="h-screen bg-gray-800 text-white p-4">
      <div className="text-center text-xl font-bold mb-8">E-Presensi</div>
      <nav className="space-y-4">
        <Link href="/" className={`block px-4 py-2 rounded hover:bg-gray-700 ${pathname === '/dashboard' && 'bg-gray-700'}`}>
            Dashboard
        </Link>
        <Link href="/profile" className={`block px-4 py-2 rounded hover:bg-gray-700 ${pathname === '/profile' && 'bg-gray-700'}`}>
            Profile
        </Link>
        <Link href="/presensi-masuk" className={`block px-4 py-2 rounded hover:bg-gray-700 ${pathname === '/presensi-masuk' && 'bg-gray-700'}`}>
            Presensi Masuk
        </Link>
        <Link href="/presensi-keluar" className={`block px-4 py-2 rounded hover:bg-gray-700 ${pathname === '/presensi-keluar' && 'bg-gray-700'}`}>
            Presensi Pulang
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
