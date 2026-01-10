// "use client"

// import { useEffect, useState } from "react"
// import { useRouter } from "next/navigation"
// import Link from "next/link"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import {
//   FileText,
//   Clock,
//   CheckCircle2,
//   AlertTriangle,
//   TrendingUp,
//   MapPin,
//   Calendar,
//   User,
//   ArrowRight,
// } from "lucide-react"

// export default function OfficerDashboardPage() {
//   const router = useRouter()
//   const [officerName, setOfficerName] = useState("")

//   useEffect(() => {
//     const auth = localStorage.getItem("officerAuth")
//     const badgeId = localStorage.getItem("officerBadgeId")
//     if (!auth) {
//       router.push("/officer/login")
//     } else {
//       setOfficerName(`Officer ${badgeId}`)
//     }
//   }, [router])

//   const stats = [
//     { label: "Active Cases", value: "12", icon: FileText, color: "text-blue-600" },
//     { label: "Pending Reviews", value: "5", icon: Clock, color: "text-yellow-600" },
//     { label: "Resolved Today", value: "3", icon: CheckCircle2, color: "text-green-600" },
//     { label: "High Priority", value: "2", icon: AlertTriangle, color: "text-red-600" },
//   ]

//   const recentCases = [
//     {
//       id: "RPT-12345678",
//       type: "Theft",
//       location: "Main Street Market",
//       status: "investigating",
//       priority: "high",
//       date: "2024-01-20",
//       reporter: "Anonymous",
//     },
//     {
//       id: "RPT-87654321",
//       type: "Vandalism",
//       location: "Central Park",
//       status: "assigned",
//       priority: "medium",
//       date: "2024-01-19",
//       reporter: "John Smith",
//     },
//     {
//       id: "RPT-11223344",
//       type: "Assault",
//       location: "5th Avenue",
//       status: "investigating",
//       priority: "high",
//       date: "2024-01-18",
//       reporter: "Anonymous",
//     },
//     {
//       id: "RPT-55667788",
//       type: "Fraud",
//       location: "Downtown District",
//       status: "pending",
//       priority: "low",
//       date: "2024-01-17",
//       reporter: "Sarah Johnson",
//     },
//   ]

//   const getStatusBadge = (status: string) => {
//     switch (status) {
//       case "investigating":
//         return <Badge variant="default">Investigating</Badge>
//       case "assigned":
//         return <Badge variant="secondary">Assigned</Badge>
//       case "pending":
//         return <Badge variant="outline">Pending</Badge>
//       default:
//         return <Badge>{status}</Badge>
//     }
//   }

//   const getPriorityColor = (priority: string) => {
//     switch (priority) {
//       case "high":
//         return "text-red-600 bg-red-50 dark:bg-red-950"
//       case "medium":
//         return "text-yellow-600 bg-yellow-50 dark:bg-yellow-950"
//       case "low":
//         return "text-blue-600 bg-blue-50 dark:bg-blue-950"
//       default:
//         return ""
//     }
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold mb-2">Welcome back, {officerName}</h1>
//         <p className="text-muted-foreground">Here's what's happening with your cases today</p>
//       </div>

//       {/* Stats Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         {stats.map((stat, index) => {
//           const Icon = stat.icon
//           return (
//             <Card key={index}>
//               <CardContent className="p-6">
//                 <div className="flex items-center justify-between mb-4">
//                   <Icon className={`h-8 w-8 ${stat.color}`} />
//                   <div className="text-3xl font-bold">{stat.value}</div>
//                 </div>
//                 <p className="text-sm text-muted-foreground">{stat.label}</p>
//               </CardContent>
//             </Card>
//           )
//         })}
//       </div>

//       <div className="grid lg:grid-cols-3 gap-8">
//         {/* Recent Cases */}
//         <div className="lg:col-span-2">
//           <Card>
//             <CardHeader>
//               <div className="flex items-center justify-between">
//                 <div>
//                   <CardTitle>Recent Cases</CardTitle>
//                   <CardDescription>Cases assigned to you</CardDescription>
//                 </div>
//                 <Link href="/officer/cases">
//                   <Button variant="outline" size="sm">
//                     View All
//                     <ArrowRight className="ml-2 h-4 w-4" />
//                   </Button>
//                 </Link>
//               </div>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 {recentCases.map((case_) => (
//                   <Link key={case_.id} href={`/officer/cases/${case_.id}`}>
//                     <div className="p-4 border rounded-lg hover:bg-accent transition-colors cursor-pointer">
//                       <div className="flex items-start justify-between mb-3">
//                         <div className="flex-1">
//                           <div className="flex items-center gap-2 mb-2">
//                             <h3 className="font-semibold">{case_.id}</h3>
//                             {getStatusBadge(case_.status)}
//                           </div>
//                           <p className="text-sm text-muted-foreground mb-2">{case_.type}</p>
//                         </div>
//                         <div
//                           className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(case_.priority)}`}
//                         >
//                           {case_.priority.toUpperCase()}
//                         </div>
//                       </div>
//                       <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
//                         <div className="flex items-center gap-1">
//                           <MapPin className="h-4 w-4" />
//                           {case_.location}
//                         </div>
//                         <div className="flex items-center gap-1">
//                           <Calendar className="h-4 w-4" />
//                           {new Date(case_.date).toLocaleDateString()}
//                         </div>
//                         <div className="flex items-center gap-1">
//                           <User className="h-4 w-4" />
//                           {case_.reporter}
//                         </div>
//                       </div>
//                     </div>
//                   </Link>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Quick Actions */}
//         <div className="space-y-6">
//           <Card>
//             <CardHeader>
//               <CardTitle>Quick Actions</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-2">
//               <Link href="/officer/cases">
//                 <Button variant="outline" className="w-full justify-start bg-transparent">
//                   <FileText className="mr-2 h-4 w-4" />
//                   View All Cases
//                 </Button>
//               </Link>
//               <Link href="/officer/map">
//                 <Button variant="outline" className="w-full justify-start bg-transparent">
//                   <MapPin className="mr-2 h-4 w-4" />
//                   Open Map View
//                 </Button>
//               </Link>
//               <Link href="/officer/notifications">
//                 <Button variant="outline" className="w-full justify-start bg-transparent">
//                   <AlertTriangle className="mr-2 h-4 w-4" />
//                   View Notifications
//                 </Button>
//               </Link>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader>
//               <CardTitle>Performance</CardTitle>
//               <CardDescription>This month</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div>
//                 <div className="flex items-center justify-between mb-2">
//                   <span className="text-sm">Cases Resolved</span>
//                   <span className="text-sm font-semibold">18/25</span>
//                 </div>
//                 <div className="w-full bg-muted rounded-full h-2">
//                   <div className="bg-primary h-2 rounded-full" style={{ width: "72%" }} />
//                 </div>
//               </div>
//               <div>
//                 <div className="flex items-center justify-between mb-2">
//                   <span className="text-sm">Response Time</span>
//                   <span className="text-sm font-semibold text-green-600">12 min avg</span>
//                 </div>
//                 <div className="flex items-center gap-2 text-xs text-muted-foreground">
//                   <TrendingUp className="h-3 w-3 text-green-600" />
//                   15% faster than last month
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   )
// }
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton"; // Assuming shadcn skeleton
import {
  FileText,
  Clock,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  MapPin,
  Calendar,
  User,
  ArrowRight,
  Bell,
  Shield,
  Activity,
} from "lucide-react";

export default function OfficerDashboardPage() {
  const router = useRouter();
  const [officerName, setOfficerName] = useState("Officer");
  const [stats, setStats] = useState<any[]>([]);
  const [recentCases, setRecentCases] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const auth = localStorage.getItem("officerAuth");
    const badgeId = localStorage.getItem("officerBadgeId");

    if (!auth) {
      router.push("/officer/login");
      return;
    }

    setOfficerName(`Officer ${badgeId}`);

    // REAL DATA FETCHING
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const headers = { Authorization: `Bearer ${auth}` };

        const [statsRes, casesRes] = await Promise.all([
          fetch("/api/officer/stats", { headers }),
          fetch("/api/reports?limit=5", { headers }),
        ]);

        const statsData = await statsRes.json();
        const casesData = await casesRes.json();

        setStats([
          {
            label: "Active Cases",
            value: statsData.active,
            icon: FileText,
            color: "text-blue-600",
          },
          {
            label: "Pending Reviews",
            value: statsData.pending,
            icon: Clock,
            color: "text-yellow-600",
          },
          {
            label: "Resolved Today",
            value: statsData.resolved,
            icon: CheckCircle2,
            color: "text-green-600",
          },
          {
            label: "High Priority",
            value: statsData.urgent,
            icon: AlertTriangle,
            color: "text-red-600",
          },
        ]);
        setRecentCases(casesData);
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [router]);

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight">
            System Overview
          </h1>
          <p className="text-muted-foreground mt-1">
            Welcome back, {officerName}. Monitoring precinct activity.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full border-2 border-background"></span>
          </Button>
          <Button className="font-semibold">
            <Shield className="mr-2 h-4 w-4" /> Dispatch Backup
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading
          ? [...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-32 w-full rounded-xl" />
            ))
          : stats.map((stat, index) => (
              <Card
                key={index}
                className="border-l-4 border-l-primary/50 shadow-sm hover:shadow-md transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                    <span className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" /> +2%
                    </span>
                  </div>
                  <div className="text-3xl font-bold">{stat.value}</div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Recent Cases - Main Feed */}
        <div className="lg:col-span-8">
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Case Management</CardTitle>
                <CardDescription>
                  Live feed of reports assigned to your unit
                </CardDescription>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/officer/cases">View Full Registry</Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {isLoading
                  ? [...Array(3)].map((_, i) => (
                      <Skeleton key={i} className="h-24 w-full" />
                    ))
                  : recentCases.map((case_) => (
                      <Link
                        key={case_.id}
                        href={`/officer/cases/${case_.id}`}
                        className="block group"
                      >
                        <div className="p-4 border rounded-xl group-hover:bg-accent/50 group-hover:border-primary/50 transition-all">
                          {/* Case Content Here (Same as your original template but with dynamic data) */}
                          <div className="flex justify-between items-center">
                            <h3 className="font-mono text-sm font-bold text-primary">
                              {case_.caseNumber}
                            </h3>
                            <Badge
                              variant={
                                case_.status === "active"
                                  ? "default"
                                  : "secondary"
                              }
                            >
                              {case_.status}
                            </Badge>
                          </div>
                          <p className="mt-2 text-sm font-medium">
                            {case_.description}
                          </p>
                          <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" /> {case_.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" /> {case_.timestamp}
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Info - Quick Actions & Performance */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="bg-primary text-primary-foreground overflow-hidden">
            <CardHeader>
              <CardTitle className="text-lg">Patrol Status</CardTitle>
              <CardDescription className="text-primary-foreground/80">
                Current Sector: Downtown
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
                  <Activity className="h-6 w-6 animate-pulse" />
                </div>
                <div>
                  <div className="text-2xl font-bold">On Duty</div>
                  <div className="text-xs opacity-70">Shift ends in 4h 22m</div>
                </div>
              </div>
              <Button variant="secondary" className="w-full">
                Update Status
              </Button>
            </CardContent>
          </Card>

          {/* Performance Card (As per your request for 'Best Dashboard UI') */}
          <Card>
            <CardHeader>
              <CardTitle>Precinct Analytics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Unit Efficiency</span>
                  <span className="font-bold">92%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 w-[92%]" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-muted rounded-lg text-center">
                  <div className="text-xl font-bold">14</div>
                  <div className="text-[10px] uppercase text-muted-foreground">
                    Arrests
                  </div>
                </div>
                <div className="p-3 bg-muted rounded-lg text-center">
                  <div className="text-xl font-bold">102</div>
                  <div className="text-[10px] uppercase text-muted-foreground">
                    Patrol Km
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
