// pages/dashboard.tsx
"use client"

import GridLayout from '@/components/GridLayout';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const router = useRouter()
  
  const {user, loading} = useAuth()


  if(loading) return <h1>loading...</h1>

  if(!user) router.push('/signin')
  
  if(user)
  return (
    <GridLayout>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <pre>
        {JSON.stringify(user, null, 2)}
      </pre>
      {/* Konten dashboard di sini */}
    </GridLayout>
  );
};

export default Dashboard;
