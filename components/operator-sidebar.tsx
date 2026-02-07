"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FileText,
  Bell,
  ShieldAlert,
  Mail,
  LogOut,
  Files,
  ShieldCheck,
  ChevronRight,
  ChevronLeft
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
import { NotificationBadge } from "@/components/ui/notification-badge";

const navLinks = [
  {
    href: "/operator/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/officer/reports", // Sharing reports view for now, or could be /operator/reports
    label: "Reports Queue",
    icon: ShieldAlert,
  },
  {
    href: "/officer/cases", // Sharing cases
    label: "Case Verification",
    icon: FileText,
  },
  {
    href: "/officer/contact",
    label: "Contact Messages",
    icon: Mail,
  },
  {
    href: "/officer/notifications",
    label: "Notifications",
    icon: Bell,
  },
];

export function OperatorSidebar() {
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
        "fixed left-0 top-0 z-40 h-screen bg-[#1a202c] text-white transition-all duration-300 flex flex-col", // Darker/different shade for Operator? Using similar dark theme
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {!collapsed && (
          <Link href="/operator/dashboard" className="flex items-center gap-3">
            <ShieldCheck className="h-8 w-8 text-cyan-400" />
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Operator</span>
          </Link>
        )}
        {collapsed && (
          <Link
            href="/operator/dashboard"
            className="flex justify-center w-full"
          >
            <ShieldCheck className="h-8 w-8 text-cyan-400" />
          </Link>
        )}
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive =
            pathname === link.href || pathname.startsWith(link.href + "/");
          return (
            <Link key={link.href} href={link.href}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-4 text-gray-300 hover:bg-gray-800 hover:text-white",
                  isActive && "bg-gray-800 text-cyan-400 border-l-4 border-cyan-400",
                  collapsed && "justify-center px-3"
                )}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                {!collapsed && (
                    <span className="text-base w-full flex items-center justify-between">
                        {link.label}
                        {link.label === "Notifications" && <NotificationBadge />}
                    </span>
                )}
              </Button>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-700">
        {!collapsed && user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 mb-2 h-auto py-3 px-3 hover:bg-gray-800"
              >
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-cyan-600 text-white font-semibold">
                    {getUserInitials(user.fullName)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-sm font-medium truncate text-white">
                    {user.fullName}
                  </p>
                  <p className="text-xs text-cyan-400 truncate capitalize">
                    {user.role}
                  </p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-gray-900 border-gray-700 text-white">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-gray-700" />
              <DropdownMenuItem className="cursor-default focus:bg-gray-800 focus:text-white">
                <span className="text-xs truncate text-gray-400">
                  {user.email}
                </span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-gray-700" />
              <DropdownMenuItem
                onClick={handleLogout}
                className="text-red-400 focus:text-red-300 focus:bg-gray-800 cursor-pointer"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        <Button
          variant="ghost"
          size="icon"
          className="w-full text-gray-400 hover:bg-gray-800 hover:text-white"
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
