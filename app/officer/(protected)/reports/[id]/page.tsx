"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { OfficerSidebar } from "@/components/officer-sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatDistanceToNow, format } from "date-fns";
import {
  AlertCircle,
  Loader2,
  ArrowLeft,
  MapPin,
  Calendar,
  User,
  Phone,
  Download,
  Eye,
  ChevronDown,
} from "lucide-react";

interface CrimeType {
  id: number;
  name: string;
  description: string;
}

interface Location {
  city: string;
  subCity: string;
  kebele: string;
}

interface AssignedOfficer {
  user: {
    fullName: string;
  };
}

interface Evidence {
  id: string;
  reportId: string;
  type: "IMAGE" | "VIDEO" | "DOCUMENT" | "AUDIO";
  url: string;
  publicId: string;
  format: string;
  sizeBytes: number;
  createdById: string | null;
  createdAt: string;
}

interface Report {
  id: string;
  title: string;
  description: string;
  reporterName: string | null;
  reporterPhone: string | null;
  reporterEmail: string | null;
  isAnonymous: boolean;
  crimeTypeId: number;
  status: "NEW" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";
  priority: "HIGH" | "MEDIUM" | "LOW";
  channel: string;
  locationId: string | null;
  lat: number;
  lng: number;
  aiCrimeTypeSuggestion: string | null;
  aiSeverityScore: number | null;
  aiSummary: string | null;
  createdById: string | null;
  assignedOfficerId: string;
  createdAt: string;
  updatedAt: string;
  caseNumber: string;
  crimeType: CrimeType;
  location: Location | null;
  createdBy: any | null;
  assignedOfficer: AssignedOfficer;
  evidence: Evidence[];
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "HIGH":
      return "destructive";
    case "MEDIUM":
      return "default";
    case "LOW":
      return "secondary";
    default:
      return "outline";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "NEW":
      return "destructive";
    case "IN_PROGRESS":
      return "default";
    case "RESOLVED":
      return "secondary";
    case "CLOSED":
      return "outline";
    default:
      return "secondary";
  }
};

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
};

const ReportDetailSkeleton = () => (
  <div className="space-y-6 max-w-4xl">
    {[1, 2, 3, 4, 5].map((i) => (
      <Card key={i}>
        <CardHeader>
          <Skeleton className="h-8 w-48" />
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
);

export default function ReportDetailPage() {
  const router = useRouter();
  const params = useParams();
  const reportId = params.id as string;

  const [user, setUser] = useState<any>(null);
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [noteText, setNoteText] = useState("");
  const [submittingNote, setSubmittingNote] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("officerUser");
    if (!storedUser) {
      router.push("/officer/login");
      return;
    }
    setUser(JSON.parse(storedUser));
  }, [router]);

  useEffect(() => {
    if (!user || !reportId) return;

    const fetchReport = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:4000/api/reports/${reportId}`
        );

        if (!response.ok) {
          if (response.status === 404) {
            setError("Report not found");
            return;
          }
          throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        if (data.success && data.report) {
          setReport(data.report);
        } else {
          throw new Error("Invalid API response format");
        }
      } catch (err) {
        console.error("Error fetching report:", err);
        setError(err instanceof Error ? err.message : "Failed to load report");
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [user, reportId]);

  const handleAddNote = async () => {
    if (!noteText.trim() || !report) return;

    try {
      setSubmittingNote(true);
      const response = await fetch(
        `http://localhost:4000/api/reports/${report.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ notes: noteText }),
        }
      );

      if (response.ok) {
        setNoteText("");
        // Refresh report data
        const updatedResponse = await fetch(
          `http://localhost:4000/api/reports/${report.id}`
        );
        const data = await updatedResponse.json();
        if (data.success && data.report) {
          setReport(data.report);
        }
      }
    } catch (err) {
      console.error("Error adding note:", err);
    } finally {
      setSubmittingNote(false);
    }
  };

  const handleStatusUpdate = async (newStatus: string) => {
    if (!report) return;

    try {
      setUpdatingStatus(true);
      const response = await fetch(
        `http://localhost:4000/api/reports/${report.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (response.ok) {
        const updatedResponse = await fetch(
          `http://localhost:4000/api/reports/${report.id}`
        );
        const data = await updatedResponse.json();
        if (data.success && data.report) {
          setReport(data.report);
        }
      }
    } catch (err) {
      console.error("Error updating status:", err);
    } finally {
      setUpdatingStatus(false);
    }
  };

  if (!user) return null;

  return (
    <div className="flex h-screen bg-background">
      <OfficerSidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-3">
          <div className="p-8 w-full col-span-2">
            <Button
              variant="ghost"
              onClick={() => router.push("/officer/reports")}
              className="mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Cases
            </Button>

            {loading && <ReportDetailSkeleton />}

            {error && (
              <Card className="border-destructive mb-6">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                    <div>
                      <p className="font-semibold">Error loading report</p>
                      <p className="text-sm text-muted-foreground">{error}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {!loading && !error && report && (
              <div className="space-y-6 max-w-4xl">
                <Card className="border-0 shadow-sm">
                  <CardHeader className="pb-4 border-b">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold text-muted-foreground mb-2">
                          Case {report.caseNumber}
                        </p>
                        <h1 className="text-3xl font-bold">{report.title}</h1>
                        <p className="text-base font-semibold text-primary mt-2">
                          {report.crimeType.name}
                        </p>
                      </div>
                      <div className="flex gap-2 flex-wrap justify-end">
                        <Badge
                          variant={getStatusColor(report.status)}
                          className="text-sm"
                        >
                          {report.status}
                        </Badge>
                        <Badge
                          variant={getPriorityColor(report.priority)}
                          className="text-sm"
                        >
                          {report.priority}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                </Card>

                <Card className="border-0 shadow-sm">
                  <CardHeader className="pb-4 border-b">
                    <CardTitle className="text-lg">Case Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Location */}
                      <div className="flex gap-3">
                        <MapPin className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-semibold text-muted-foreground mb-1">
                            Location
                          </p>
                          <p className="text-sm">
                            {report.location
                              ? `${report.location.city}, ${report.location.subCity}`
                              : "Not specified"}
                          </p>
                        </div>
                      </div>

                      {/* Date & Time */}
                      <div className="flex gap-3">
                        <Calendar className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-semibold text-muted-foreground mb-1">
                            Date & Time
                          </p>
                          <p className="text-sm">
                            {format(
                              new Date(report.createdAt),
                              "MMM d, yyyy HH:mm"
                            )}
                          </p>
                        </div>
                      </div>

                      {/* Reporter */}
                      <div className="flex gap-3">
                        <User className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-semibold text-muted-foreground mb-1">
                            Reporter
                          </p>
                          <p className="text-sm">
                            {report.isAnonymous
                              ? "Anonymous"
                              : report.reporterName || "Not provided"}
                          </p>
                        </div>
                      </div>

                      {/* Contact */}
                      <div className="flex gap-3">
                        <Phone className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-semibold text-muted-foreground mb-1">
                            Contact
                          </p>
                          <p className="text-sm">
                            {report.reporterPhone ||
                              report.reporterEmail ||
                              "Not provided"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-b shadow-sm">
                  <CardHeader className="">
                    <CardTitle className="text-lg">
                      Incident Description
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="">
                    <p className="text-sm leading-relaxed">
                      {report.description}
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-b shadow-sm">
                  <CardHeader className="">
                    <CardTitle className="text-lg">
                      Suspect Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="">
                    <p className="text-sm leading-relaxed">
                      {report.aiSummary ||
                        "No suspect information available at this time. Investigation in progress."}
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-b shadow-sm">
                  <CardHeader className="">
                    <CardTitle className="text-lg">Witnesses</CardTitle>
                  </CardHeader>
                  <CardContent className="">
                    <p className="text-sm leading-relaxed">
                      Witness information will be updated as the investigation
                      progresses.
                    </p>
                  </CardContent>
                </Card>

                {report.evidence && report.evidence.length > 0 && (
                  <Card className="border-0 shadow-sm">
                    <CardHeader className="pb-4 border-b">
                      <CardTitle className="text-lg">Evidence Files</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="space-y-3">
                        {report.evidence.map((file) => (
                          <div
                            key={file.id}
                            className="flex items-center justify-between p-4 bg-muted rounded-lg border"
                          >
                            <div className="flex-1">
                              <p className="text-sm font-semibold">
                                {file.publicId.split("/").pop()}
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {file.type} • {formatFileSize(file.sizeBytes)}
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" variant="ghost" asChild>
                                <a
                                  href={file.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <Eye className="w-4 h-4" />
                                </a>
                              </Button>
                              <Button size="sm" variant="ghost" asChild>
                                <a href={file.url} download>
                                  <Download className="w-4 h-4" />
                                </a>
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                <Card className="border-0 shadow-sm">
                  <CardHeader className="pb-4 border-b">
                    <CardTitle className="text-lg">
                      Add Investigation Note
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-4">
                    <Textarea
                      placeholder="Add your investigation notes here..."
                      value={noteText}
                      onChange={(e) => setNoteText(e.target.value)}
                      className="min-h-24 resize-none"
                    />
                    <Button
                      onClick={handleAddNote}
                      disabled={submittingNote || !noteText.trim()}
                      className="w-full"
                    >
                      {submittingNote ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Adding Note...
                        </>
                      ) : (
                        "Add Note"
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          <div className="w-full mt-20 flex flex-col gap-0">
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-4 border-b">
                <CardTitle className="text-lg">Actions</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-1 gap-3">
                  {/* Update Status Button */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full bg-transparent"
                        disabled={updatingStatus}
                      >
                        {updatingStatus ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Updating...
                          </>
                        ) : (
                          <>
                            Update Status
                            <ChevronDown className="w-4 h-4 ml-2" />
                          </>
                        )}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-40">
                      <DropdownMenuItem
                        onClick={() => handleStatusUpdate("NEW")}
                      >
                        NEW
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleStatusUpdate("IN_PROGRESS")}
                      >
                        IN_PROGRESS
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleStatusUpdate("RESOLVED")}
                      >
                        RESOLVED
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleStatusUpdate("CLOSED")}
                      >
                        CLOSED
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  {/* View on Map Button */}
                  <Button
                    variant="outline"
                    className="w-full bg-transparent"
                    onClick={() =>
                      router.push(
                        `/officer/map-two?lat=${report.lat}&lng=${report.lng}`
                      )
                    }
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    View on Map
                  </Button>

                  {/* Generate Report Button */}
                  <Button
                    variant="outline"
                    className="w-full bg-transparent"
                    disabled
                  >
                    Generate Report
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-4 border-b">
                <CardTitle className="text-lg">Case Timeline</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                {report ? (
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 bg-primary rounded-full mt-1.5"></div>
                        <div className="w-0.5 h-12 bg-muted my-1"></div>
                      </div>
                      <div>
                        <p className="font-semibold text-sm">
                          Report Submitted
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(report.createdAt), {
                            addSuffix: true,
                          })}
                        </p>
                      </div>
                    </div>

                    {report.status !== "NEW" && (
                      <div className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="w-3 h-3 bg-blue-500 rounded-full mt-1.5"></div>
                          <div className="w-0.5 h-12 bg-muted my-1"></div>
                        </div>
                        <div>
                          <p className="font-semibold text-sm">
                            Status: {report.status}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatDistanceToNow(new Date(report.updatedAt), {
                              addSuffix: true,
                            })}
                          </p>
                        </div>
                      </div>
                    )}

                    {report.assignedOfficerId && (
                      <div className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="w-3 h-3 bg-green-500 rounded-full mt-1.5"></div>
                        </div>
                        <div>
                          <p className="font-semibold text-sm">
                            Assigned to Officer
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {report.assignedOfficer?.user?.fullName ??
                              "Unassigned"}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No timeline available
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
