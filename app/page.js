// import { getServerSession } from "next-auth/next";
// import { authOptions } from "./api/[...nextauth]/route";
import LandingPage from "@/components/LandingPage";
// import { useEffect, useState } from "react";

export default async function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      
        <LandingPage/>

    </main>
  );
}
