// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { cn } from "@/lib/utils";
// import {
//   LayoutDashboard,
//   FileText,
//   Map,
//   Bell,
//   Users,
//   Shield,
//   ChevronLeft,
//   ChevronRight,
//   BookOpen,
//   ShieldAlert,
//   Mail,
// } from "lucide-react";
// import { useState } from "react";
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// const navLinks = [
//   { href: "/officer/dashboard", label: "Dashboard", icon: LayoutDashboard },
//   { href: "/officer/reports", label: "Reports", icon: ShieldAlert },
//   { href: "/officer/cases", label: "Cases", icon: FileText },
//   { href: "/officer/blog", label: "Community Blog", icon: BookOpen },
//   { href: "/officer/contact", label: "Contact Messages", icon: Mail }, // Added Contact Messages link
//   { href: "/officer/map", label: "Map View", icon: Map },
//   { href: "/officer/notifications", label: "Notifications", icon: Bell },
//   { href: "/officer/officers", label: "Officers", icon: Users },
// ];

// export function OfficerSidebar() {
//   const pathname = usePathname();
//   const [collapsed, setCollapsed] = useState(false);

//   return (
//     <aside
//       className={cn(
//         "fixed left-0 top-0 z-40 h-screen bg-blue-900 text-white transition-all duration-300 flex flex-col",
//         collapsed ? "w-16" : "w-64"
//       )}
//     >
//       {/* Header */}
//       <div className="flex items-center justify-between p-4 border-b border-blue-800">
//         {!collapsed && (
//           <Link href="/officer/dashboard" className="flex items-center gap-3">
//             <Shield className="h-8 w-8" />
//             <span className="text-xl font-bold">Officer Portal</span>
//           </Link>
//         )}
//         {collapsed && (
//           <Link
//             href="/officer/dashboard"
//             className="flex justify-center w-full"
//           >
//             <Shield className="h-8 w-8" />
//           </Link>
//         )}
//       </div>

//       {/* Navigation */}
//       <nav className="flex-1 p-4 space-y-2">
//         {navLinks.map((link) => {
//           const Icon = link.icon;
//           const isActive =
//             pathname === link.href || pathname.startsWith(link.href + "/");
//           return (
//             <Link key={link.href} href={link.href}>
//               <Button
//                 variant="ghost"
//                 className={cn(
//                   "w-full justify-start gap-4 text-white hover:bg-blue-800",
//                   isActive && "bg-blue-800",
//                   collapsed && "justify-center px-3"
//                 )}
//               >
//                 <Icon className="h-5 w-5 flex-shrink-0" />
//                 {!collapsed && <span className="text-base">{link.label}</span>}
//               </Button>
//             </Link>
//           );
//         })}
//       </nav>

//       {/* User Profile */}
//       <div className="p-4 border-t border-blue-800">
//         {!collapsed && (
//           <div className="flex items-center gap-3 mb-4">
//             <Avatar className="h-10 w-10">
//               <AvatarFallback className="bg-cyan-500 text-white font-semibold">
//                 AA
//               </AvatarFallback>
//             </Avatar>
//             <div className="flex-1 min-w-0">
//               <p className="text-sm font-medium truncate">Officer Ahmed Ali</p>
//               <p className="text-xs text-blue-300 truncate">Officer</p>
//             </div>
//           </div>
//         )}

//         {/* Collapse Toggle */}
//         <Button
//           variant="ghost"
//           size="icon"
//           className="w-full text-white hover:bg-blue-800"
//           onClick={() => setCollapsed(!collapsed)}
//         >
//           {collapsed ? (
//             <ChevronRight className="h-5 w-5" />
//           ) : (
//             <ChevronLeft className="h-5 w-5" />
//           )}
//         </Button>
//       </div>
//     </aside>
//   );
// }

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FileText,
  Map,
  Bell,
  Users,
  Shield,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  ShieldAlert,
  Mail,
  LogOut,
  Bot,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getUser, getUserInitials, logout, type OfficerUser } from "@/lib/auth";
import { toast } from "sonner";

const navLinks = [
  { href: "/officer/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/officer/reports", label: "Reports", icon: ShieldAlert },
  { href: "/officer/cases", label: "Cases", icon: FileText },
  { href: "/officer/blog", label: "Community Blog", icon: BookOpen },
  { href: "/officer/contact", label: "Contact Messages", icon: Mail },
  { href: "/officer/map", label: "Map View", icon: Map },
  { href: "/officer/notifications", label: "Notifications", icon: Bell },
  { href: "/officer/officers", label: "Officers", icon: Users },
  { href: "/officer/notices", label: "Safety Notices", icon: Bell }, // New link
  { href: "/officer/ai-analysis", label: "AI Analysis", icon: Bot }, // New AI link
];

export function OfficerSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState<OfficerUser | null>(null);

  useEffect(() => {
    const currentUser = getUser();
    setUser(currentUser);
  }, []);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-blue-900 text-white transition-all duration-300 flex flex-col",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-blue-800">
        {!collapsed && (
          <Link href="/officer/dashboard" className="flex items-center gap-3">
            <Shield className="h-8 w-8" />
            <span className="text-xl font-bold">Officer Portal</span>
          </Link>
        )}
        {collapsed && (
          <Link
            href="/officer/dashboard"
            className="flex justify-center w-full"
          >
            <Shield className="h-8 w-8" />
          </Link>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive =
            pathname === link.href || pathname.startsWith(link.href + "/");
          return (
            <Link key={link.href} href={link.href}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-4 text-white hover:bg-blue-800",
                  isActive && "bg-blue-800",
                  collapsed && "justify-center px-3"
                )}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                {!collapsed && <span className="text-base">{link.label}</span>}
              </Button>
            </Link>
          );
        })}
      </nav>

      {/* User Profile with Dropdown */}
      <div className="p-4 border-t border-blue-800">
        {!collapsed && user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 mb-2 h-auto py-3 px-3 hover:bg-blue-800"
              >
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-cyan-500 text-white font-semibold">
                    {getUserInitials(user.fullName)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-sm font-medium truncate">
                    {user.fullName}
                  </p>
                  <p className="text-xs text-blue-300 truncate capitalize">
                    {user.role.replace(/_/g, " ").toLowerCase()}
                  </p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <span className="text-sm">
                  <strong>Email:</strong> {user.email}
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span className="text-sm">
                  <strong>Role:</strong> {user.role.replace(/_/g, " ")}
                </span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
                className="text-red-600 focus:text-red-600"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        {/* Collapse Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="w-full text-white hover:bg-blue-800"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </Button>
      </div>
    </aside>
  );
}
