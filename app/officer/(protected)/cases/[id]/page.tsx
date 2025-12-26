"use client"

import { useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { MapPin, Calendar, User, FileText, ImageIcon, Video, Download } from "lucide-react"

export default function CaseDetailPage() {
  const router = useRouter()
  const params = useParams()
  const caseId = params?.id as string

  useEffect(() => {
    const auth = localStorage.getItem("officerAuth")
    if (!auth) {
      router.push("/officer/login")
    }
  }, [router])

  // Mock case data
  const caseData = {
    id: caseId,
    type: "Theft",
    location: "Main Street Market, Stall #15",
    coordinates: { lat: 8.54, lng: 39.27 },
    status: "investigating",
    priority: "high",
    date: "2024-01-20",
    time: "14:30",
    reporter: {
      name: "Anonymous",
      contact: "Not provided",
    },
    description:
      "Multiple items were stolen from the market stall including electronics and cash. The suspect was wearing a black hoodie and jeans. CCTV footage is available from nearby shops.",
    suspects:
      "Male, approximately 25-30 years old, 5'10\", wearing black hoodie and blue jeans, last seen heading south.",
    witnesses: "Market vendor from adjacent stall witnessed the incident. Contact: 0912-345-678",
    evidence: [
      { type: "image", name: "scene_photo_1.jpg", size: "2.4 MB" },
      { type: "image", name: "scene_photo_2.jpg", size: "1.8 MB" },
      { type: "video", name: "cctv_footage.mp4", size: "15.2 MB" },
    ],
    timeline: [
      { date: "2024-01-20T14:45:00", status: "Submitted", officer: "System", note: "Report received" },
      {
        date: "2024-01-20T15:00:00",
        status: "Assigned",
        officer: "Sergeant Brown",
        note: "Case assigned to Officer Martinez",
      },
      {
        date: "2024-01-20T16:30:00",
        status: "Investigating",
        officer: "Officer Martinez",
        note: "Evidence collected from scene",
      },
      {
        date: "2024-01-21T09:00:00",
        status: "Investigating",
        officer: "Officer Martinez",
        note: "Witness interviews conducted",
      },
    ],
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <Button variant="ghost" onClick={() => router.back()} className="mb-4">
            ← Back to Cases
          </Button>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Case {caseData.id}</h1>
              <p className="text-muted-foreground">{caseData.type}</p>
            </div>
            <div className="flex gap-2">
              <Badge variant="default">Investigating</Badge>
              <Badge variant="destructive">High Priority</Badge>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Case Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Case Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Location</p>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <p className="font-medium">{caseData.location}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Date & Time</p>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <p className="font-medium">
                        {new Date(caseData.date).toLocaleDateString()} at {caseData.time}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Reporter</p>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <p className="font-medium">{caseData.reporter.name}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Contact</p>
                    <p className="font-medium">{caseData.reporter.contact}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>Incident Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{caseData.description}</p>
              </CardContent>
            </Card>

            {/* Suspect Information */}
            <Card>
              <CardHeader>
                <CardTitle>Suspect Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{caseData.suspects}</p>
              </CardContent>
            </Card>

            {/* Witnesses */}
            <Card>
              <CardHeader>
                <CardTitle>Witnesses</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{caseData.witnesses}</p>
              </CardContent>
            </Card>

            {/* Evidence */}
            <Card>
              <CardHeader>
                <CardTitle>Evidence Files</CardTitle>
                <CardDescription>{caseData.evidence.length} files attached</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {caseData.evidence.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center gap-3">
                        {file.type === "image" && <ImageIcon className="h-5 w-5 text-muted-foreground" />}
                        {file.type === "video" && <Video className="h-5 w-5 text-muted-foreground" />}
                        <div>
                          <p className="font-medium text-sm">{file.name}</p>
                          <p className="text-xs text-muted-foreground">{file.size}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Add Note */}
            <Card>
              <CardHeader>
                <CardTitle>Add Investigation Note</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="note">Note</Label>
                    <Textarea
                      id="note"
                      placeholder="Add details about investigation progress..."
                      className="min-h-[100px]"
                    />
                  </div>
                  <Button>Add Note</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full">Update Status</Button>
                <Button variant="outline" className="w-full bg-transparent">
                  <MapPin className="mr-2 h-4 w-4" />
                  View on Map
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  <FileText className="mr-2 h-4 w-4" />
                  Generate Report
                </Button>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Case Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {caseData.timeline.map((event, index) => (
                    <div key={index} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-2 h-2 rounded-full ${index === caseData.timeline.length - 1 ? "bg-primary" : "bg-muted-foreground"}`}
                        />
                        {index < caseData.timeline.length - 1 && <div className="w-0.5 h-full bg-border mt-1" />}
                      </div>
                      <div className="flex-1 pb-4">
                        <p className="font-semibold text-sm mb-1">{event.status}</p>
                        <p className="text-xs text-muted-foreground mb-1">{new Date(event.date).toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground mb-1">by {event.officer}</p>
                        <p className="text-sm">{event.note}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
