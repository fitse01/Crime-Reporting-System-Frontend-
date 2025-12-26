// import type React from "react";
// import { OfficerSidebar } from "@/components/officer-sidebar";

// export default function ProtectedLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="flex min-h-screen bg-background">
//       <OfficerSidebar />
//       <main className="flex-1 ml-64 transition-all duration-300 p-6">
//         {children}
//       </main>
//     </div>
//   );
// }
"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { OfficerSidebar } from "@/components/officer-sidebar";
import { isAuthenticated } from "@/lib/auth";
import { Loader2 } from "lucide-react";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      if (!isAuthenticated()) {
        router.replace("/officer/login");
      } else {
        setIsChecking(false);
      }
    };

    checkAuth();
  }, [router]);

  // Show loading while checking auth
  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-blue-900" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background">
      <OfficerSidebar />
      <main className="flex-1 ml-64 transition-all duration-300 p-6">
        {children}
      </main>
    </div>
  );
}
