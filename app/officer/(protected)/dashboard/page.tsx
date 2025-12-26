"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
} from "lucide-react"

export default function OfficerDashboardPage() {
  const router = useRouter()
  const [officerName, setOfficerName] = useState("")

  useEffect(() => {
    const auth = localStorage.getItem("officerAuth")
    const badgeId = localStorage.getItem("officerBadgeId")
    if (!auth) {
      router.push("/officer/login")
    } else {
      setOfficerName(`Officer ${badgeId}`)
    }
  }, [router])

  const stats = [
    { label: "Active Cases", value: "12", icon: FileText, color: "text-blue-600" },
    { label: "Pending Reviews", value: "5", icon: Clock, color: "text-yellow-600" },
    { label: "Resolved Today", value: "3", icon: CheckCircle2, color: "text-green-600" },
    { label: "High Priority", value: "2", icon: AlertTriangle, color: "text-red-600" },
  ]

  const recentCases = [
    {
      id: "RPT-12345678",
      type: "Theft",
      location: "Main Street Market",
      status: "investigating",
      priority: "high",
      date: "2024-01-20",
      reporter: "Anonymous",
    },
    {
      id: "RPT-87654321",
      type: "Vandalism",
      location: "Central Park",
      status: "assigned",
      priority: "medium",
      date: "2024-01-19",
      reporter: "John Smith",
    },
    {
      id: "RPT-11223344",
      type: "Assault",
      location: "5th Avenue",
      status: "investigating",
      priority: "high",
      date: "2024-01-18",
      reporter: "Anonymous",
    },
    {
      id: "RPT-55667788",
      type: "Fraud",
      location: "Downtown District",
      status: "pending",
      priority: "low",
      date: "2024-01-17",
      reporter: "Sarah Johnson",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "investigating":
        return <Badge variant="default">Investigating</Badge>
      case "assigned":
        return <Badge variant="secondary">Assigned</Badge>
      case "pending":
        return <Badge variant="outline">Pending</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600 bg-red-50 dark:bg-red-950"
      case "medium":
        return "text-yellow-600 bg-yellow-50 dark:bg-yellow-950"
      case "low":
        return "text-blue-600 bg-blue-50 dark:bg-blue-950"
      default:
        return ""
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {officerName}</h1>
        <p className="text-muted-foreground">Here's what's happening with your cases today</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                  <div className="text-3xl font-bold">{stat.value}</div>
                </div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Cases */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Cases</CardTitle>
                  <CardDescription>Cases assigned to you</CardDescription>
                </div>
                <Link href="/officer/cases">
                  <Button variant="outline" size="sm">
                    View All
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentCases.map((case_) => (
                  <Link key={case_.id} href={`/officer/cases/${case_.id}`}>
                    <div className="p-4 border rounded-lg hover:bg-accent transition-colors cursor-pointer">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold">{case_.id}</h3>
                            {getStatusBadge(case_.status)}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{case_.type}</p>
                        </div>
                        <div
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(case_.priority)}`}
                        >
                          {case_.priority.toUpperCase()}
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {case_.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(case_.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {case_.reporter}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link href="/officer/cases">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <FileText className="mr-2 h-4 w-4" />
                  View All Cases
                </Button>
              </Link>
              <Link href="/officer/map">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <MapPin className="mr-2 h-4 w-4" />
                  Open Map View
                </Button>
              </Link>
              <Link href="/officer/notifications">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  View Notifications
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Performance</CardTitle>
              <CardDescription>This month</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Cases Resolved</span>
                  <span className="text-sm font-semibold">18/25</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: "72%" }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Response Time</span>
                  <span className="text-sm font-semibold text-green-600">12 min avg</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <TrendingUp className="h-3 w-3 text-green-600" />
                  15% faster than last month
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
