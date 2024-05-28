"use client";

// pages/profile.tsx
import GridLayout from "@/components/GridLayout";
import useAuth from "@/hooks/useAuth";
import React, { useEffect, useState } from "react";
import { IFormInput } from "../register/page";
import { supabase } from "@/lib/supabaseClient";
import { PostgrestSingleResponse } from "@supabase/supabase-js";

const Profile = () => {
  const [user, setUser] = useState<IFormInput | null>();
  const { user: sessionUser } = useAuth();

  useEffect(() => {
    if (sessionUser?.email) {
      getUser();
    }
  }, [sessionUser]);

  const getUser = async () => {
    const { data }: PostgrestSingleResponse<IFormInput[]> = await supabase
      .from("user")
      .select("*");
    const isUserExist = data?.find((u) => u.email == sessionUser.email);

    console.log(isUserExist);

    if (isUserExist) {
      setUser(isUserExist);
    }
  };

  if (!user)
    return (
      <GridLayout>
        <p>Loading...</p>
      </GridLayout>
    );

  return (
    <GridLayout>
      <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Profile Pengguna</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <p className="mt-1 text-gray-900">{user?.name}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              NIP
            </label>
            <p className="mt-1 text-gray-900">{user?.nip}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Job Title
            </label>
            <p className="mt-1 text-gray-900">{user?.job_title}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <p className="mt-1 text-gray-900">{user?.address}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Contact
            </label>
            <p className="mt-1 text-gray-900">{user?.contact}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Created At
            </label>
            <p className="mt-1 text-gray-900">
              {user?.created_at
                ? new Date(user?.created_at).toLocaleString()
                : "N/A"}
            </p>
          </div>
        </div>
      </div>
      {/* Konten profil di sini */}
    </GridLayout>
  );
};

export default Profile;
