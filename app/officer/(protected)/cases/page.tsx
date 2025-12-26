"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, MapPin, Calendar, User, Eye } from "lucide-react"

export default function OfficerCasesPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const auth = localStorage.getItem("officerAuth")
    if (!auth) {
      router.push("/officer/login")
    }
  }, [router])

  const cases = [
    {
      id: "RPT-12345678",
      type: "Theft",
      location: "Main Street Market",
      status: "investigating",
      priority: "high",
      date: "2024-01-20",
      reporter: "Anonymous",
      description: "Multiple items stolen from market stall",
      evidence: 3,
    },
    {
      id: "RPT-87654321",
      type: "Vandalism",
      location: "Central Park",
      status: "assigned",
      priority: "medium",
      date: "2024-01-19",
      reporter: "John Smith",
      description: "Graffiti on park benches and walls",
      evidence: 5,
    },
    {
      id: "RPT-11223344",
      type: "Assault",
      location: "5th Avenue",
      status: "investigating",
      priority: "high",
      date: "2024-01-18",
      reporter: "Anonymous",
      description: "Physical altercation between two individuals",
      evidence: 2,
    },
    {
      id: "RPT-55667788",
      type: "Fraud",
      location: "Downtown District",
      status: "pending",
      priority: "low",
      date: "2024-01-17",
      reporter: "Sarah Johnson",
      description: "Suspected credit card fraud",
      evidence: 1,
    },
    {
      id: "RPT-99887766",
      type: "Burglary",
      location: "Residential Area",
      status: "investigating",
      priority: "high",
      date: "2024-01-16",
      reporter: "Michael Brown",
      description: "Home break-in, valuables stolen",
      evidence: 4,
    },
    {
      id: "RPT-44556677",
      type: "Noise Complaint",
      location: "Oak Street",
      status: "resolved",
      priority: "low",
      date: "2024-01-15",
      reporter: "Emily Davis",
      description: "Loud music disturbance late at night",
      evidence: 0,
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
      case "resolved":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-200">
            Resolved
          </Badge>
        )
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

  const filteredCases = cases.filter(
    (case_) =>
      case_.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      case_.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      case_.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Case Management</h1>
        <p className="text-muted-foreground">Manage and track all assigned cases</p>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by case ID, type, or location..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="bg-transparent">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Cases Grid */}
      <div className="space-y-4">
        {filteredCases.map((case_) => (
          <Card key={case_.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-lg">{case_.id}</h3>
                        {getStatusBadge(case_.status)}
                        <div
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityColor(case_.priority)}`}
                        >
                          {case_.priority.toUpperCase()}
                        </div>
                      </div>
                      <p className="text-sm font-medium text-muted-foreground mb-2">{case_.type}</p>
                      <p className="text-sm text-muted-foreground">{case_.description}</p>
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
                    {case_.evidence > 0 && (
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {case_.evidence} Evidence Files
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex lg:flex-col gap-2">
                  <Link href={`/officer/cases/${case_.id}`} className="flex-1 lg:flex-none">
                    <Button className="w-full">View Details</Button>
                  </Link>
                  <Button variant="outline" className="flex-1 lg:flex-none bg-transparent">
                    Update Status
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCases.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Cases Found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
