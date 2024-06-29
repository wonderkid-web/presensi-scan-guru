"use client"
// components/Sidebar.tsx

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import logo from "@/../public/favicon.ico"
import Image from 'next/image';

const Sidebar = () => {
  const pathname = usePathname()
  

  return (
    <div className="h-screen bg-gray-800 text-white p-4">
       <div className='relative w-8 h-8 mx-auto mb-2'>
        <Image src={logo} alt='logo' objectFit='cover' />
      </div>
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
