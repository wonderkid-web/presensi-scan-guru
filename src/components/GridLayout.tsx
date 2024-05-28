
import React, { ReactNode } from "react";
import { Inter } from "next/font/google";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { supabase } from "@/lib/supabaseClient";

const inter = Inter({ subsets: ["latin"] });

function GridLayout({children}:{children: React.ReactNode}) {
  // const user = await supabase.auth.getSession() 

  return (
    <body className={inter.className}>
      <div className="h-screen grid grid-cols-[150px_1fr_1fr_1fr_1fr] grid-rows-[75px_1fr_1fr_1fr_1fr] gap-4">
        <div className="border row-span-5"><Sidebar /></div>
        <div className="col-span-4"><Navbar /></div>
        <div className="col-span-4 row-span-4 col-start-2 row-start-2">
          {children}
        </div>
      </div>
    </body>
  );
}

export default GridLayout;
