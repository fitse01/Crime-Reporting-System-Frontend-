// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { AlertTriangle, AlertCircle, Info, MapPin, Calendar } from "lucide-react"

// // Mock safety notices data
// const safetyNotices = [
//   {
//     id: 1,
//     title: "Increased Theft Reports in Market District",
//     severity: "high",
//     category: "Alert",
//     location: "Market District",
//     date: "2024-01-20",
//     description:
//       "We have received multiple reports of theft in the Market District area. Please be vigilant with your belongings and report any suspicious activity immediately.",
//     tips: [
//       "Keep valuables secure and out of sight",
//       "Be aware of your surroundings",
//       "Report suspicious individuals to police",
//       "Use well-lit and populated areas",
//     ],
//   },
//   {
//     id: 2,
//     title: "Traffic Diversion on Main Street",
//     severity: "medium",
//     category: "Notice",
//     location: "Main Street",
//     date: "2024-01-18",
//     description:
//       "Due to road construction, Main Street will be closed between 5th and 8th Avenue from January 22-30. Please use alternative routes.",
//     tips: ["Use 6th Avenue as alternative route", "Expect delays during peak hours", "Follow temporary traffic signs"],
//   },
//   {
//     id: 3,
//     title: "Community Safety Workshop",
//     severity: "low",
//     category: "Event",
//     location: "Police Headquarters",
//     date: "2024-01-15",
//     description:
//       "Join us for a free community safety workshop on January 28th at 2:00 PM. Learn about home security, personal safety, and emergency preparedness.",
//     tips: [
//       "Free admission for all residents",
//       "Bring questions for Q&A session",
//       "Refreshments will be provided",
//       "Register at adamapolice.gov",
//     ],
//   },
//   {
//     id: 4,
//     title: "Scam Alert: Fake Police Officers",
//     severity: "high",
//     category: "Alert",
//     location: "Citywide",
//     date: "2024-01-12",
//     description:
//       "Reports of individuals impersonating police officers to demand payments. Real officers will never demand immediate payment or threaten arrest over the phone.",
//     tips: [
//       "Always ask for badge number and department",
//       "Call official police line to verify",
//       "Never provide personal information over phone",
//       "Report suspicious calls immediately",
//     ],
//   },
//   {
//     id: 5,
//     title: "Neighborhood Watch Program Launch",
//     severity: "low",
//     category: "Info",
//     location: "Residential Areas",
//     date: "2024-01-10",
//     description:
//       "We are launching a new Neighborhood Watch program to strengthen community safety. Interested residents can sign up at their local police station.",
//     tips: [
//       "Build relationships with neighbors",
//       "Report unusual activity",
//       "Attend monthly meetings",
//       "Receive crime prevention training",
//     ],
//   },
//   {
//     id: 6,
//     title: "Heavy Rainfall Warning - Flooding Risk",
//     severity: "medium",
//     category: "Warning",
//     location: "Low-lying Areas",
//     date: "2024-01-08",
//     description:
//       "Heavy rainfall expected this weekend. Residents in low-lying areas should take precautions against potential flooding.",
//     tips: [
//       "Move vehicles to higher ground",
//       "Prepare emergency supplies",
//       "Avoid driving through flooded areas",
//       "Monitor weather updates",
//     ],
//   },
// ]

// export default function SafetyPage() {
//   const getSeverityColor = (severity: string) => {
//     switch (severity) {
//       case "high":
//         return "destructive"
//       case "medium":
//         return "default"
//       case "low":
//         return "secondary"
//       default:
//         return "outline"
//     }
//   }

//   const getSeverityIcon = (severity: string) => {
//     switch (severity) {
//       case "high":
//         return <AlertTriangle className="h-5 w-5" />
//       case "medium":
//         return <AlertCircle className="h-5 w-5" />
//       default:
//         return <Info className="h-5 w-5" />
//     }
//   }

//   return (
//     <div className="container mx-auto px-4 py-12">
//       <div className="max-w-5xl mx-auto">
//         <div className="text-center mb-12">
//           <div className="inline-flex items-center justify-center p-4 bg-accent/10 rounded-full mb-4">
//             <AlertTriangle className="h-10 w-10 text-accent" />
//           </div>
//           <h1 className="text-3xl md:text-4xl font-bold mb-4">Safety Notices</h1>
//           <p className="text-lg text-muted-foreground">
//             Stay informed about important safety alerts, warnings, and community updates
//           </p>
//         </div>

//         {/* Stats Bar */}
//         <div className="grid grid-cols-3 gap-4 mb-8">
//           <Card>
//             <CardContent className="p-4 text-center">
//               <div className="text-2xl font-bold text-destructive">
//                 {safetyNotices.filter((n) => n.severity === "high").length}
//               </div>
//               <div className="text-sm text-muted-foreground">High Priority</div>
//             </CardContent>
//           </Card>
//           <Card>
//             <CardContent className="p-4 text-center">
//               <div className="text-2xl font-bold text-primary">
//                 {safetyNotices.filter((n) => n.severity === "medium").length}
//               </div>
//               <div className="text-sm text-muted-foreground">Medium Priority</div>
//             </CardContent>
//           </Card>
//           <Card>
//             <CardContent className="p-4 text-center">
//               <div className="text-2xl font-bold text-secondary-foreground">
//                 {safetyNotices.filter((n) => n.severity === "low").length}
//               </div>
//               <div className="text-sm text-muted-foreground">Informational</div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Safety Notices List */}
//         <div className="space-y-6">
//           {safetyNotices.map((notice) => (
//             <Card key={notice.id} className="overflow-hidden">
//               <CardHeader className="pb-4">
//                 <div className="flex items-start justify-between gap-4">
//                   <div className="flex items-start gap-3 flex-1">
//                     <div
//                       className={`p-2 rounded-lg ${notice.severity === "high" ? "bg-destructive/10" : notice.severity === "medium" ? "bg-primary/10" : "bg-secondary/50"}`}
//                     >
//                       {getSeverityIcon(notice.severity)}
//                     </div>
//                     <div className="flex-1">
//                       <div className="flex items-center gap-2 mb-2 flex-wrap">
//                         <CardTitle className="text-xl">{notice.title}</CardTitle>
//                         <Badge variant={getSeverityColor(notice.severity)}>{notice.category}</Badge>
//                       </div>
//                       <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
//                         <div className="flex items-center gap-1">
//                           <MapPin className="h-4 w-4" />
//                           {notice.location}
//                         </div>
//                         <div className="flex items-center gap-1">
//                           <Calendar className="h-4 w-4" />
//                           {new Date(notice.date).toLocaleDateString()}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <CardDescription className="text-base">{notice.description}</CardDescription>
//                 <div className="bg-muted p-4 rounded-lg">
//                   <p className="font-semibold text-sm mb-2">Safety Tips:</p>
//                   <ul className="space-y-1">
//                     {notice.tips.map((tip, index) => (
//                       <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
//                         <span className="text-accent mt-1">•</span>
//                         <span>{tip}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>

//         {/* Subscribe Section */}
//         <Card className="mt-12 bg-accent/5">
//           <CardHeader className="text-center">
//             <CardTitle>Stay Updated</CardTitle>
//             <CardDescription>
//               Want to receive safety alerts directly? Sign up for notifications at your local police station or follow
//               us on social media.
//             </CardDescription>
//           </CardHeader>
//           <CardContent className="text-center">
//             <p className="text-sm text-muted-foreground">
//               For immediate emergencies, always call <strong>911</strong>
//             </p>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   )
// }

// app/(public)/safety/page.tsx

// "use client";

// import { useQuery } from "@tanstack/react-query";
// import { Badge } from "@/components/ui/badge";
// import { Card } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { format } from "date-fns";
// import { cn } from "@/lib/utils";
// import { AlertTriangle } from "lucide-react";

// export default function SafetyNoticesPage() {
//   const { data: notices = [], isLoading } = useQuery({
//     queryKey: ["public-notices"],
//     queryFn: async () => {
//       const res = await fetch("http://localhost:4000/api/notices");
//       if (!res.ok) throw new Error("Failed");
//       const data = await res.json();
//       return data.notices.filter((n: any) => n.isPublished);
//     },
//   });

//   const high = notices.filter((n: any) => n.severity === "HIGH");
//   const medium = notices.filter((n: any) => n.severity === "MEDIUM");
//   const low = notices.filter((n: any) => n.severity === "LOW");

//   const renderNotice = (notice: any) => (
//     <Card key={notice.id} className="mb-8">
//       <div
//         className={cn(
//           "border-l-8 p-6",
//           notice.severity === "HIGH"
//             ? "border-l-red-500"
//             : notice.severity === "MEDIUM"
//             ? "border-l-orange-500"
//             : "border-l-blue-500"
//         )}
//       >
//         <div className="flex items-start justify-between mb-4">
//           <div className="flex items-center gap-3">
//             <Badge>{notice.type}</Badge>
//             <span className="text-sm text-muted-foreground">
//               {notice.location || "Citywide"} •{" "}
//               {format(new Date(notice.createdAt), "MMM d, yyyy")}
//             </span>
//           </div>
//           <Badge variant="outline" className="text-red-600">
//             N 3 Issues
//           </Badge>
//         </div>

//         <h3 className="text-xl font-bold mb-4">{notice.title}</h3>

//         <p className="mb-6">{notice.content}</p>

//         {notice.imageUrl && (
//           <img
//             src={notice.imageUrl}
//             alt={notice.title}
//             className="w-full h-64 object-cover rounded mb-6"
//           />
//         )}

//         <div
//           className="prose prose-lg max-w-none"
//           dangerouslySetInnerHTML={{ __html: notice.description }}
//         />

//         <div className="mt-6 p-4 bg-muted rounded">
//           <p className="font-semibold mb-2">Safety Tips:</p>
//           <div
//             className="prose"
//             dangerouslySetInnerHTML={{ __html: notice.description }}
//           />
//         </div>
//       </div>
//     </Card>
//   );

//   if (isLoading) return <div className="p-8">Loading safety notices...</div>;

//   return (
//     <div className="container mx-auto p-8">
//       <div className="text-center mb-12">
//         <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
//           <AlertTriangle className="h-8 w-8 text-blue-600" />
//         </div>
//         <h1 className="text-4xl font-bold mb-4">Safety Notices</h1>
//         <p className="text-xl text-muted-foreground">
//           Stay informed about important safety alerts, warnings, and community
//           updates
//         </p>
//       </div>

//       <Tabs defaultValue="high" className="mb-8">
//         <TabsList className="grid w-full max-w-2xl mx-auto h-auto grid-cols-2 md:grid-cols-4 p-1 bg-muted/50">
//           {/* All Notices */}
//           <TabsTrigger
//             value="all"
//             className="py-2 data-[state=active]:bg-background"
//           >
//             All
//             <Badge
//               className="ml-2 bg-slate-200 text-slate-700"
//               variant="secondary"
//             >
//               {notices.length}
//             </Badge>
//           </TabsTrigger>

//           {/* High Priority */}
//           <TabsTrigger
//             value="high"
//             className="py-2 data-[state=active]:bg-background"
//           >
//             High
//             <Badge
//               className="ml-2 bg-red-100 text-red-700 hover:bg-red-100"
//               variant="outline"
//             >
//               {high.length}
//             </Badge>
//           </TabsTrigger>

//           {/* Medium Priority */}
//           <TabsTrigger
//             value="medium"
//             className="py-2 data-[state=active]:bg-background"
//           >
//             Medium
//             <Badge
//               className="ml-2 bg-orange-100 text-orange-700 hover:bg-orange-100"
//               variant="outline"
//             >
//               {medium.length}
//             </Badge>
//           </TabsTrigger>

//           {/* Informational */}
//           <TabsTrigger
//             value="informational"
//             className="py-2 data-[state=active]:bg-background"
//           >
//             Low
//             <Badge
//               className="ml-2 bg-blue-100 text-blue-700 hover:bg-blue-100"
//               variant="outline"
//             >
//               {low.length}
//             </Badge>
//           </TabsTrigger>
//         </TabsList>
//         {/* /* Updated Part */}
//         <TabsContent value="all" className="mt-6">
//           {notices.length === 0 ? (
//             <p className="text-center py-12">No notices available.</p>
//           ) : (
//             notices.map(renderNotice)
//           )}
//         </TabsContent>
//         <TabsContent value="high">
//           {high.length === 0 ? (
//             <p className="text-center py-12">No high priority notices</p>
//           ) : (
//             high.map(renderNotice)
//           )}
//         </TabsContent>
//         <TabsContent value="medium">
//           {medium.length === 0 ? (
//             <p className="text-center py-12">No medium priority notices</p>
//           ) : (
//             medium.map(renderNotice)
//           )}
//         </TabsContent>
//         <TabsContent value="informational">
//           {low.length === 0 ? (
//             <p className="text-center py-12">No informational notices</p>
//           ) : (
//             low.map(renderNotice)
//           )}
//         </TabsContent>
//       </Tabs>

//       <Card className="mt-12 p-8 text-center">
//         <h3 className="text-xl font-bold mb-4">Stay Updated</h3>
//         <p className="text-muted-foreground mb-6">
//           Want to receive safety alerts directly? Sign up for notifications at
//           your local police station or follow us on social media.
//         </p>
//         <p className="text-sm text-muted-foreground">
//           For immediate emergencies, always call 911
//         </p>
//       </Card>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, Info, Clock, MapPin } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
// import { AIChat } from "@/components/ai-chat";

interface Notice {
  id: string;
  title: string;
  content: string;
  description: string;
  type: string;
  severity: string;
  isPublished: boolean;
  imageUrl?: string;
  location?: string;
  createdBy: any;
  createdAt: string;
}

const API_BASE = "http://localhost:4000/api";

export default function SafetyPage() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSeverity, setSelectedSeverity] = useState("HIGH");
  const [showAIChat, setShowAIChat] = useState(false);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/notices`);
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      const publishedNotices = (data.notices || data || []).filter(
        (n: Notice) => n.isPublished
      );
      setNotices(publishedNotices);
    } catch (error) {
      toast.error("Failed to load notices");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "HIGH":
        return "bg-red-100 border-l-4 border-red-500";
      case "MEDIUM":
        return "bg-orange-100 border-l-4 border-orange-500";
      case "LOW":
        return "bg-blue-100 border-l-4 border-blue-500";
      default:
        return "bg-gray-100 border-l-4 border-gray-500";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "ALERT":
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      case "INFO":
        return <Info className="w-5 h-5 text-blue-600" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-600" />;
    }
  };

  const filteredNotices = notices.filter((n) => {
    if (selectedSeverity === "HIGH") return n.severity === "HIGH";
    if (selectedSeverity === "MEDIUM") return n.severity === "MEDIUM";
    if (selectedSeverity === "LOW")
      return n.severity !== "HIGH" && n.severity !== "MEDIUM";
    return true;
  });

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-3 text-slate-900">
            Public Safety Notices
          </h1>
          <p className="text-lg text-slate-600 mb-6">
            Stay informed about important safety alerts and notices in your
            area.
          </p>
          <Button
            onClick={() => setShowAIChat(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
          >
            <Info className="w-4 h-4" />
            Ask AI About Safety
          </Button>
        </div>

        <Tabs
          defaultValue="HIGH"
          className="mb-8"
          onValueChange={setSelectedSeverity}
        >
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="HIGH" className="gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500"></span>
              High Priority
            </TabsTrigger>
            <TabsTrigger value="MEDIUM" className="gap-2">
              <span className="w-3 h-3 rounded-full bg-orange-500"></span>
              Medium Priority
            </TabsTrigger>
            <TabsTrigger value="LOW" className="gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-500"></span>
              Informational
            </TabsTrigger>
          </TabsList>

          <TabsContent value={selectedSeverity} className="space-y-4 mt-6">
            {filteredNotices.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground text-lg">
                    No notices in this category
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredNotices.map((notice) => (
                <div
                  key={notice.id}
                  className={`rounded-lg p-6 ${getSeverityColor(
                    notice.severity
                  )} transition-all hover:shadow-lg`}
                >
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      {getTypeIcon(notice.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-xl font-bold text-slate-900">
                            {notice.title}
                          </h3>
                          <div className="flex gap-2 mt-2">
                            <Badge variant="outline">{notice.type}</Badge>
                            {notice.location && (
                              <Badge variant="outline" className="gap-1">
                                <MapPin className="w-3 h-3" />
                                {notice.location}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <Badge className="bg-slate-600 text-white">
                          {filteredNotices.length} Issues
                        </Badge>
                      </div>

                      <p className="text-slate-700 mb-4">{notice.content}</p>

                      <div
                        className="text-sm text-slate-700 mb-4 prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: notice.description }}
                      />

                      {notice.imageUrl && (
                        <img
                          src={notice.imageUrl || "/placeholder.svg"}
                          alt={notice.title}
                          className="rounded-lg mb-4 w-full max-h-64 object-cover"
                        />
                      )}

                      <div className="flex items-center justify-between text-sm text-slate-600">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          {format(
                            new Date(notice.createdAt),
                            "MMM dd, yyyy HH:mm"
                          )}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-blue-600 hover:text-blue-700 bg-transparent"
                        >
                          Read More
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>

      {showAIChat && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl h-96 shadow-lg">
            {/* <AIChat onClose={() => setShowAIChat(false)} role="public" /> */}
          </Card>
        </div>
      )}
    </main>
  );
}
