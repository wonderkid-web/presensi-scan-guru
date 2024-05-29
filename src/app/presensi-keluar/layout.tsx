"use client";
// components/TabComponent.tsx
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import useAuth from "@/hooks/useAuth";
import GridLayout from "@/components/GridLayout";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { PostgrestSingleResponse } from "@supabase/supabase-js";

export interface User {
  name: string;
  jam: string;
  type: "masuk" | "pulang";
  id: string;
}

export interface SingleUser {
  id: string;
  username: string;
  name: string;
  nip: string;
  job_title: string;
  address: string;
  contact: string;
  created_at: string;
  email: string;
}

function Layout({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState<SingleUser | null>(null);
  const { user: sessionUser } = useAuth();

  useEffect(() => {
    if (sessionUser?.email) {
      getSingleUser();
      getUsers();
    }
  }, [sessionUser]);

  const getUsers = async () => {
    const raw = await fetch(`https://660159c687c91a11641aa8d1.mockapi.io/user`);
    const users: User[] = await raw.json();

    const filteredUsers = users.filter(
      (u) => u.name === sessionUser.email && u.type === "pulang"
    );

    console.log(filteredUsers);

    if (filteredUsers.length > 0) {
      setUsers(filteredUsers);
    }
  };

  const getSingleUser = async () => {
    const { data: rawSingleUser }: PostgrestSingleResponse<SingleUser[]> =
      await supabase.from("user").select("*");

    const singleUser = rawSingleUser?.find((u) => u.email === sessionUser.email);

    setUser(singleUser || null);
  };

  if (!user) {
    return (
      <GridLayout>
        <p>Loading...</p>
      </GridLayout>
    );
  }

  return (
    <GridLayout>
      <div className="flex justify-between px-4">
        <h1 className="text-2xl font-bold">Presensi Masuk</h1>
        <Link
          href={"presensi-keluar/scan"}
          className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-700"
        >
          Buka Scanner
        </Link>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Nama</th>
            <th className="py-2 px-4 border-b">NIP</th>
            <th className="py-2 px-4 border-b">Jabatan</th>
            <th className="py-2 px-4 border-b">Tanggal</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((u) => (
              <tr className="text-center" key={u.id}>
                <td className="py-2 px-4 border-b">{user.name}</td>
                <td className="py-2 px-4 border-b">{user.nip}</td>
                <td className="py-2 px-4 border-b">{user.job_title}</td>
                <td className="py-2 px-4 border-b">
                  {format(new Date(u.jam), "dd MMMM yyyy HH:mm", {
                    locale: id,
                  })}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>
                <h1 className="text-center text-md">Absen Kosong</h1>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {children}
    </GridLayout>
  );
}

export default Layout;
