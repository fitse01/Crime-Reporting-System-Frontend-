// // app/officer/notices/page.tsx
// "use client";

// import { useQuery } from "@tanstack/react-query";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import Link from "next/link";
// import { formatDistanceToNow } from "date-fns";

// const getUser = () => {
//   if (typeof window === "undefined") return null;
//   const user = localStorage.getItem("officerUser");
//   return user ? JSON.parse(user) : null;
// };

// export default function NoticesListPage() {
//   const user = getUser();
//   const isAdmin = user && ["SUPER_ADMIN", "ADMIN"].includes(user.role);

//   const { data: notices = [], isLoading } = useQuery({
//     queryKey: ["notices"],
//     queryFn: async () => {
//       const res = await fetch("http://localhost:4000/api/notices");
//       if (!res.ok) throw new Error("Failed to fetch notices");
//       const data = await res.json();
//       return data.notices || data;
//     },
//   });

//   if (isLoading) {
//     return <div className="p-8">Loading...</div>;
//   }

//   return (
//     <div className="container mx-auto p-8">
//       <div className="mb-8 flex justify-between items-center">
//         <div>
//           <h1 className="text-3xl font-bold">Safety Notices</h1>
//           <p className="text-muted-foreground">
//             Manage public safety notices and alerts
//           </p>
//         </div>
//         {isAdmin && (
//           <Button asChild>
//             <Link href="/officer/notices/new">Create Notice</Link>
//           </Button>
//         )}
//       </div>

//       <Card>
//         <CardHeader>
//           <CardTitle>All Notices ({notices.length})</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="rounded-md border">
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Image</TableHead>
//                   <TableHead>Title</TableHead>
//                   <TableHead>Type</TableHead>
//                   <TableHead>Severity</TableHead>
//                   <TableHead>Published</TableHead>
//                   <TableHead>Created By</TableHead>
//                   <TableHead>Date</TableHead>
//                   <TableHead>Actions</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {notices.length === 0 ? (
//                   <TableRow>
//                     <TableCell colSpan={8} className="text-center py-8">
//                       No notices found
//                     </TableCell>
//                   </TableRow>
//                 ) : (
//                   notices.map((notice: any) => (
//                     <TableRow key={notice.id}>
//                       <TableCell>
//                         {notice.imageUrl ? (
//                           <img
//                             src={notice.imageUrl}
//                             alt={notice.title}
//                             className="h-16 w-16 object-cover rounded"
//                           />
//                         ) : (
//                           <div className="h-16 w-16 bg-gray-200 rounded flex items-center justify-center">
//                             <span className="text-gray-500 text-xs">
//                               No image
//                             </span>
//                           </div>
//                         )}
//                       </TableCell>
//                       <TableCell className="font-medium">
//                         {notice.title}
//                       </TableCell>
//                       <TableCell>
//                         <Badge>{notice.type}</Badge>
//                       </TableCell>
//                       <TableCell>
//                         <Badge
//                           variant={
//                             notice.severity === "HIGH"
//                               ? "destructive"
//                               : notice.severity === "MEDIUM"
//                               ? "secondary"
//                               : "outline"
//                           }
//                         >
//                           {notice.severity}
//                         </Badge>
//                       </TableCell>
//                       <TableCell>
//                         <Badge
//                           variant={notice.isPublished ? "default" : "secondary"}
//                         >
//                           {notice.isPublished ? "Published" : "Draft"}
//                         </Badge>
//                       </TableCell>
//                       <TableCell>{notice.createdBy.fullName}</TableCell>
//                       <TableCell>
//                         {formatDistanceToNow(new Date(notice.createdAt), {
//                           addSuffix: true,
//                         })}
//                       </TableCell>
//                       <TableCell>
//                         <Button variant="ghost" size="sm" asChild>
//                           <Link href={`/officer/notices/${notice.id}`}>
//                             View
//                           </Link>
//                         </Button>
//                         {isAdmin && (
//                           <>
//                             <Button variant="ghost" size="sm" asChild>
//                               <Link href={`/officer/notices/${notice.id}/edit`}>
//                                 Edit
//                               </Link>
//                             </Button>
//                           </>
//                         )}
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 )}
//               </TableBody>
//             </Table>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// "use client";

// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { toast } from "sonner";
// import { formatDistanceToNow } from "date-fns";
// import Link from "next/link";
// import { Switch } from "@/components/ui/switch";

// interface Notice {
//   id: string;
//   title: string;
//   type: string;
//   severity: string;
//   isPublished: boolean;
//   createdBy: { fullName: string };
//   createdAt: string;
//   imageUrl: string;
// }

// const getUser = () => {
//   const user = localStorage.getItem("officerUser");
//   return user ? JSON.parse(user) : null;
// };

// export default function NoticesPage() {
//   const user = getUser();
//   const isAdmin = ["SUPER_ADMIN", "ADMIN"].includes(user?.role);

//   const { data: notices = [] } = useQuery<Notice[]>({
//     queryKey: ["notices"],
//     queryFn: async () => {
//       const token = localStorage.getItem("officerToken");
//       const res = await fetch("http://localhost:4000/api/notices", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       if (!res.ok) throw new Error("Failed to fetch notices");
//       return res.json().then((d) => d.notices);
//     },
//   });

//   const mutation = useMutation({
//     mutationFn: async ({
//       id,
//       isPublished,
//     }: {
//       id: string;
//       isPublished: boolean;
//     }) => {
//       const token = localStorage.getItem("officerToken");
//       const res = await fetch(`http://localhost:4000/api/notices/${id}`, {
//         method: "PATCH",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ isPublished }),
//       });
//       if (!res.ok) throw new Error("Failed to update notice");
//       return res.json();
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["notices"] });
//     },
//   });

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Safety Notices</CardTitle>
//       </CardHeader>
//       <CardContent>
//         {isAdmin && (
//           <Link href="/officer/notices/new">
//             <Button>Create New</Button>
//           </Link>
//         )}
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Image</TableHead>
//               <TableHead>Title</TableHead>
//               <TableHead>Type</TableHead>
//               <TableHead>Severity</TableHead>
//               <TableHead>Published</TableHead>
//               <TableHead>Created By</TableHead>
//               <TableHead>Created At</TableHead>
//               <TableHead>Actions</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {notices.map((n) => (
//               <TableRow key={n.id}>
//                 <TableCell>
//                   {n.imageUrl ? (
//                     <img
//                       src={n.imageUrl}
//                       alt="Thumbnail"
//                       className="h-10 w-10 object-cover"
//                     />
//                   ) : (
//                     "No Image"
//                   )}
//                 </TableCell>
//                 <TableCell>{n.title}</TableCell>
//                 <TableCell>{n.type}</TableCell>
//                 <TableCell>
//                   <Badge
//                     variant={
//                       n.severity === "HIGH"
//                         ? "destructive"
//                         : n.severity === "MEDIUM"
//                         ? "secondary"
//                         : "default"
//                     }
//                   >
//                     {n.severity}
//                   </Badge>
//                 </TableCell>
//                 <TableCell>
//                   {isAdmin ? (
//                     <Switch
//                       checked={n.isPublished}
//                       onCheckedChange={(checked) =>
//                         mutation.mutate({ id: n.id, isPublished: checked })
//                       }
//                     />
//                   ) : n.isPublished ? (
//                     "Yes"
//                   ) : (
//                     "No"
//                   )}
//                 </TableCell>
//                 <TableCell>{n.createdBy.fullName}</TableCell>
//                 <TableCell>
//                   {formatDistanceToNow(new Date(n.createdAt), {
//                     addSuffix: true,
//                   })}
//                 </TableCell>
//                 <TableCell>
//                   <Link href={`/officer/notices/${n.id}`}>
//                     <Button variant="ghost">View</Button>
//                   </Link>
//                   {isAdmin && (
//                     <Link href={`/officer/notices/${n.id}/edit`}>
//                       <Button variant="ghost">Edit</Button>
//                     </Link>
//                   )}
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </CardContent>
//     </Card>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { OfficerSidebar } from "@/components/officer-sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Eye, Edit, Trash2, Plus } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

interface User {
  id: string;
  fullName: string;
  email: string;
  role: string;
}

interface Notice {
  id: string;
  title: string;
  type: string;
  severity: string;
  isPublished: boolean;
  imageUrl?: string;
  createdBy: User;
  createdAt: string;
  updatedAt: string;
}

const API_BASE = "http://localhost:4000/api";

export default function NoticesPage() {
  const router = useRouter();
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("officerUser");
    if (!storedUser) {
      router.push("/officer/login");
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);
    fetchNotices();
  }, [router]);

  const fetchNotices = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE}/notices`);
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      setNotices(data.notices || data || []);
    } catch (error) {
      toast.error("Failed to load notices");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // const handleDelete = async (id: string) => {
  //   if (!user || !["SUPER_ADMIN", "ADMIN"].includes(user.role)) {
  //     toast.error("Unauthorized");
  //     return;
  //   }

  //   if (!confirm("Are you sure?")) return;

  //   try {
  //     const response = await fetch(`${API_BASE}/notices/${id}`, {
  //       method: "DELETE",
  //     });
  //     if (!response.ok) throw new Error("Delete failed");
  //     toast.success("Notice deleted");
  //     fetchNotices();
  //   } catch (error) {
  //     toast.error("Failed to delete notice");
  //   }
  // };
  const handleDelete = async (id: string) => {
    if (!user || !["SUPER_ADMIN", "ADMIN"].includes(user.role)) {
      toast.error("Unauthorized");
      return;
    }

    if (!confirm("Are you sure?")) return;

    // Use the proper way to get the token
    const token = localStorage.getItem("officerToken");

    if (!token) {
      toast.error("Session expired. Please login again.");
      router.push("/officer/login");
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/notices/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 401) {
        toast.error("Session expired. Please login again.");
        localStorage.removeItem("officerToken");
        localStorage.removeItem("officerUser");
        router.push("/officer/login");
        return;
      }

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || "Delete failed");
      }

      toast.success("Notice deleted");
      fetchNotices();
    } catch (error) {
      toast.error("Failed to delete notice");
      console.error(error);
    }
  };
  const handleTogglePublish = async (id: string, isPublished: boolean) => {
    if (!user || !["SUPER_ADMIN", "ADMIN"].includes(user.role)) {
      toast.error("Unauthorized");
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/notices/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPublished: !isPublished }),
      });
      if (!response.ok) throw new Error("Update failed");
      toast.success("Published status updated");
      fetchNotices();
    } catch (error) {
      toast.error("Failed to update notice");
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "HIGH":
        return "destructive";
      case "MEDIUM":
        return "secondary";
      case "LOW":
        return "outline";
      default:
        return "default";
    }
  };

  const canEdit = user && ["SUPER_ADMIN", "ADMIN"].includes(user.role);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );

  return (
    <div className="flex h-screen bg-background">
      <OfficerSidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Safety Notices</h1>
              <p className="text-muted-foreground">
                Manage and publish safety notices
              </p>
            </div>
            {canEdit && (
              <Button
                onClick={() => router.push("/officer/notices/new")}
                className="gap-2"
              >
                <Plus className="w-4 h-4" />
                Create Notice
              </Button>
            )}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>All Notices</CardTitle>
            </CardHeader>
            <CardContent>
              {notices.length === 0 ? (
                <p className="text-center py-8 text-muted-foreground">
                  No notices yet
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Image</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Severity</TableHead>
                        <TableHead>Created By</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Published</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {notices.map((notice) => (
                        <TableRow key={notice.id}>
                          <TableCell>
                            {notice.imageUrl && (
                              <img
                                src={notice.imageUrl || "/placeholder.svg"}
                                alt={notice.title}
                                className="w-10 h-10 rounded object-cover"
                              />
                            )}
                          </TableCell>
                          <TableCell className="font-medium">
                            {notice.title}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{notice.type}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={getSeverityColor(notice.severity)}>
                              {notice.severity}
                            </Badge>
                          </TableCell>
                          <TableCell>{notice.createdBy.fullName}</TableCell>
                          <TableCell>
                            {format(new Date(notice.createdAt), "MMM dd, yyyy")}
                          </TableCell>
                          <TableCell>
                            {canEdit ? (
                              <Switch
                                checked={notice.isPublished}
                                onCheckedChange={() =>
                                  handleTogglePublish(
                                    notice.id,
                                    notice.isPublished
                                  )
                                }
                              />
                            ) : (
                              <Badge
                                variant={
                                  notice.isPublished ? "default" : "secondary"
                                }
                              >
                                {notice.isPublished ? "Published" : "Draft"}
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  router.push(`/officer/notices/${notice.id}`)
                                }
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                              {canEdit && (
                                <>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() =>
                                      router.push(
                                        `/officer/notices/${notice.id}/edit`
                                      )
                                    }
                                  >
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => handleDelete(notice.id)}
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </Button>
                                </>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
