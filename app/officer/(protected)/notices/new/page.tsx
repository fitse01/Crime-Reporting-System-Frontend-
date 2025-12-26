// // app/officer/notices/new/page.tsx
// "use client";

// import { useState, useEffect } from "react";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Switch } from "@/components/ui/switch";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { toast } from "sonner";
// import { Editor, EditorContent } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import Underline from "@tiptap/extension-underline";

// const getUser = () => {
//   if (typeof window === "undefined") return null;
//   const user = localStorage.getItem("officerUser");
//   return user ? JSON.parse(user) : null;
// };

// export default function CreateNoticePage() {
//   const user = getUser();
//   const router = useRouter();
//   const queryClient = useQueryClient();

//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [description, setDescription] = useState("");
//   const [type, setType] = useState("");
//   const [severity, setSeverity] = useState("");
//   const [isPublished, setIsPublished] = useState(false);
//   const [image, setImage] = useState<File | null>(null);
//   const [imagePreview, setImagePreview] = useState<string | null>(null);

//   const [editor, setEditor] = useState<Editor | null>(null);

//   useEffect(() => {
//     const newEditor = new Editor({
//       content: description,
//       extensions: [StarterKit, Underline],
//       onUpdate: ({ editor }) => {
//         setDescription(editor.getHTML());
//       },
//     });

//     setEditor(newEditor);

//     return () => {
//       newEditor.destroy();
//     };
//   }, []);

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setImage(file);
//       setImagePreview(URL.createObjectURL(file));
//     }
//   };

//   const mutation = useMutation({
//     mutationFn: async () => {
//       const formData = new FormData();
//       formData.append("title", title);
//       formData.append("content", content);
//       formData.append("description", description);
//       formData.append("type", type);
//       formData.append("severity", severity);
//       formData.append("isPublished", String(isPublished));
//       if (image) formData.append("image", image);

//       const res = await fetch("http://localhost:4000/api/notices", {
//         method: "POST",
//         body: formData,
//       });

//       if (!res.ok) throw new Error("Failed to create notice");
//       return res.json();
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["notices"] });
//       toast.success("Notice created successfully");
//       router.push("/officer/notices");
//     },
//     onError: () => {
//       toast.error("Failed to create notice");
//     },
//   });

//   if (!user || !["SUPER_ADMIN", "ADMIN"].includes(user.role)) {
//     return <div className="p-8">Access denied</div>;
//   }

//   return (
//     <div className="container mx-auto p-8">
//       <h1 className="text-3xl font-bold mb-8">Create Safety Notice</h1>

//       <Card>
//         <CardHeader>
//           <CardTitle>Notice Details</CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-6">
//           <div>
//             <Label htmlFor="title">Title</Label>
//             <Input
//               id="title"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//             />
//           </div>

//           <div>
//             <Label htmlFor="content">Content (short summary)</Label>
//             <Textarea
//               id="content"
//               value={content}
//               onChange={(e) => setContent(e.target.value)}
//               rows={3}
//             />
//           </div>

//           <div>
//             <Label>Description</Label>
//             {editor && (
//               <div className="border rounded-md">
//                 <div className="border-b p-2 flex gap-2">
//                   <Button
//                     size="sm"
//                     variant="ghost"
//                     onClick={() => editor.chain().focus().toggleBold().run()}
//                   >
//                     Bold
//                   </Button>
//                   <Button
//                     size="sm"
//                     variant="ghost"
//                     onClick={() => editor.chain().focus().toggleItalic().run()}
//                   >
//                     Italic
//                   </Button>
//                   <Button
//                     size="sm"
//                     variant="ghost"
//                     onClick={() =>
//                       editor.chain().focus().toggleUnderline().run()
//                     }
//                   >
//                     Underline
//                   </Button>
//                   <Button
//                     size="sm"
//                     variant="ghost"
//                     onClick={() =>
//                       editor.chain().focus().toggleBulletList().run()
//                     }
//                   >
//                     Bullet List
//                   </Button>
//                   <Button
//                     size="sm"
//                     variant="ghost"
//                     onClick={() =>
//                       editor.chain().focus().toggleHeading({ level: 2 }).run()
//                     }
//                   >
//                     H2
//                   </Button>
//                 </div>
//                 <div className="p-4 prose prose-sm max-w-none">
//                   <div dangerouslySetInnerHTML={{ __html: editor.getHTML() }} />
//                 </div>
//                 <EditorContent editor={editor} className="min-h-[200px]" />
//               </div>
//             )}
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <Label>Type</Label>
//               <Select value={type} onValueChange={setType}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select type" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="ALERT">Alert</SelectItem>
//                   <SelectItem value="NOTICE">Notice</SelectItem>
//                   <SelectItem value="EVENT">Event</SelectItem>
//                   <SelectItem value="WANTED">Wanted</SelectItem>
//                   <SelectItem value="INFO">Info</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             <div>
//               <Label>Severity</Label>
//               <Select value={severity} onValueChange={setSeverity}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select severity" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="HIGH">High</SelectItem>
//                   <SelectItem value="MEDIUM">Medium</SelectItem>
//                   <SelectItem value="LOW">Low</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>

//           <div>
//             <Label>Image</Label>
//             <Input type="file" accept="image/*" onChange={handleImageChange} />
//             {imagePreview && (
//               <img
//                 src={imagePreview}
//                 alt="Preview"
//                 className="mt-4 h-64 object-cover rounded"
//               />
//             )}
//           </div>

//           <div className="flex items-center gap-3">
//             <Switch
//               id="published"
//               checked={isPublished}
//               onCheckedChange={setIsPublished}
//             />
//             <Label htmlFor="published">Publish immediately</Label>
//           </div>

//           <div className="flex gap-4">
//             <Button
//               onClick={() => mutation.mutate()}
//               disabled={mutation.isPending}
//             >
//               {mutation.isPending ? "Creating..." : "Create Notice"}
//             </Button>
//             <Button variant="outline" onClick={() => router.back()}>
//               Cancel
//             </Button>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
// app/officer/notices/new/page.tsx

// "use client";

// import { useState } from "react";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { useRouter } from "next/navigation";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Switch } from "@/components/ui/switch";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { toast } from "sonner";
// import { Loader2 } from "lucide-react";
// import { useEditor, EditorContent } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import Underline from "@tiptap/extension-underline";

// const getUser = () => {
//   if (typeof window === "undefined") return null;
//   const user = localStorage.getItem("officerUser");
//   return user ? JSON.parse(user) : null;
// };

// const getToken = () => {
//   if (typeof window === "undefined") return null;
//   return localStorage.getItem("officerToken");
// };

// export default function CreateNoticePage() {
//   const user = getUser();
//   const token = getToken();
//   const router = useRouter();
//   const queryClient = useQueryClient();

//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [type, setType] = useState("");
//   const [severity, setSeverity] = useState("");
//   const [isPublished, setIsPublished] = useState(false);
//   const [image, setImage] = useState<File | null>(null);
//   const [imagePreview, setImagePreview] = useState<string | null>(null);

//   const editor = useEditor({
//     extensions: [StarterKit, Underline],
//     content: "",
//     immediatelyRender: false, // Prevents SSR hydration error
//     editorProps: {
//       attributes: {
//         class: "prose prose-sm max-w-none focus:outline-none min-h-[300px] p-4",
//       },
//     },
//   });

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setImage(file);
//       setImagePreview(URL.createObjectURL(file));
//     }
//   };

//   const mutation = useMutation({
//     mutationFn: async () => {
//       if (!token) {
//         throw new Error("You must be logged in to create a notice");
//       }

//       const formData = new FormData();
//       formData.append("title", title);
//       formData.append("content", content);
//       formData.append("description", editor?.getHTML() || "");
//       formData.append("type", type);
//       formData.append("severity", severity);
//       formData.append("isPublished", String(isPublished));
//       if (image) {
//         formData.append("image", image);
//       }

//       const res = await fetch("http://localhost:4000/api/notices", {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           // DO NOT set Content-Type — let browser set it with boundary
//         },
//         body: formData,
//       });

//       if (!res.ok) {
//         const errorData = await res.json().catch(() => ({}));
//         throw new Error(errorData.error || "Failed to create notice");
//       }

//       return res.json();
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["notices"] });
//       toast.success("Safety notice created successfully!");
//       router.push("/officer/notices");
//     },
//     onError: (error: Error) => {
//       toast.error(error.message || "Failed to create notice");
//     },
//   });

//   // Role check
//   if (!user || !["SUPER_ADMIN", "ADMIN"].includes(user.role)) {
//     return (
//       <div className="container mx-auto p-8 text-center">
//         <Card>
//           <CardContent className="pt-10">
//             <h2 className="text-2xl font-bold text-red-600">Access Denied</h2>
//             <p className="mt-4 text-muted-foreground">
//               Only Super Admin and Admin can create safety notices.
//             </p>
//           </CardContent>
//         </Card>
//       </div>
//     );
//   }

//   const isFormValid = title.trim() && content.trim() && type && severity;

//   return (
//     <div className="container mx-auto p-8 max-w-5xl">
//       <h1 className="text-3xl font-bold mb-8">Create Safety Notice</h1>

//       <Card>
//         <CardHeader>
//           <CardTitle>Notice Details</CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-8">
//           {/* Title */}
//           <div className="space-y-2">
//             <Label htmlFor="title">Title *</Label>
//             <Input
//               id="title"
//               placeholder="e.g. Armed Robbery Suspect at Large"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//             />
//           </div>

//           {/* Short Summary */}
//           <div className="space-y-2">
//             <Label htmlFor="content">Short Summary *</Label>
//             <Textarea
//               id="content"
//               placeholder="Brief summary shown on the public card"
//               rows={3}
//               value={content}
//               onChange={(e) => setContent(e.target.value)}
//             />
//           </div>

//           {/* Rich Text Description */}
//           <div className="space-y-2">
//             <Label>Description (Rich Text)</Label>
//             <div className="border rounded-lg overflow-hidden">
//               <div className="border-b bg-muted/50 p-2 flex flex-wrap gap-1">
//                 <Button
//                   size="sm"
//                   variant="ghost"
//                   onClick={() => editor?.chain().focus().toggleBold().run()}
//                   className={editor?.isActive("bold") ? "bg-accent" : ""}
//                 >
//                   Bold
//                 </Button>
//                 <Button
//                   size="sm"
//                   variant="ghost"
//                   onClick={() => editor?.chain().focus().toggleItalic().run()}
//                   className={editor?.isActive("italic") ? "bg-accent" : ""}
//                 >
//                   Italic
//                 </Button>
//                 <Button
//                   size="sm"
//                   variant="ghost"
//                   onClick={() =>
//                     editor?.chain().focus().toggleUnderline().run()
//                   }
//                   className={editor?.isActive("underline") ? "bg-accent" : ""}
//                 >
//                   Underline
//                 </Button>
//                 <Button
//                   size="sm"
//                   variant="ghost"
//                   onClick={() =>
//                     editor?.chain().focus().toggleBulletList().run()
//                   }
//                   className={editor?.isActive("bulletList") ? "bg-accent" : ""}
//                 >
//                   • List
//                 </Button>
//                 <Button
//                   size="sm"
//                   variant="ghost"
//                   onClick={() =>
//                     editor?.chain().focus().toggleHeading({ level: 2 }).run()
//                   }
//                   className={
//                     editor?.isActive("heading", { level: 2 }) ? "bg-accent" : ""
//                   }
//                 >
//                   H2
//                 </Button>
//               </div>
//               <EditorContent
//                 editor={editor}
//                 className="min-h-[300px] p-4 prose prose-sm max-w-none focus:outline-none"
//               />
//             </div>
//           </div>

//           {/* Type & Severity */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="space-y-2">
//               <Label>Type *</Label>
//               <Select value={type} onValueChange={setType}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select type" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="ALERT">Alert</SelectItem>
//                   <SelectItem value="NOTICE">Notice</SelectItem>
//                   <SelectItem value="EVENT">Event</SelectItem>
//                   <SelectItem value="WANTED">Wanted</SelectItem>
//                   <SelectItem value="INFO">Info</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             <div className="space-y-2">
//               <Label>Severity *</Label>
//               <Select value={severity} onValueChange={setSeverity}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select severity" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="HIGH">High</SelectItem>
//                   <SelectItem value="MEDIUM">Medium</SelectItem>
//                   <SelectItem value="LOW">Low</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>

//           {/* Image Upload */}
//           <div className="space-y-2">
//             <Label>Image (Optional)</Label>
//             <Input
//               type="file"
//               accept="image/*"
//               onChange={handleImageChange}
//               className="cursor-pointer"
//             />
//             {imagePreview && (
//               <div className="mt-4">
//                 <p className="text-sm text-muted-foreground mb-2">Preview:</p>
//                 <img
//                   src={imagePreview}
//                   alt="Upload preview"
//                   className="max-h-96 rounded-lg border object-contain"
//                 />
//               </div>
//             )}
//           </div>

//           {/* Publish Toggle */}
//           <div className="flex items-center space-x-3">
//             <Switch
//               id="published"
//               checked={isPublished}
//               onCheckedChange={setIsPublished}
//             />
//             <Label htmlFor="published" className="cursor-pointer">
//               Publish immediately
//             </Label>
//           </div>

//           {/* Action Buttons */}
//           <div className="flex justify-end gap-4 pt-8 border-t">
//             <Button variant="outline" onClick={() => router.back()}>
//               Cancel
//             </Button>
//             <Button
//               onClick={() => mutation.mutate()}
//               disabled={mutation.isPending || !isFormValid}
//             >
//               {mutation.isPending ? (
//                 <>
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                   Creating...
//                 </>
//               ) : (
//                 "Create Notice"
//               )}
//             </Button>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { OfficerSidebar } from "@/components/officer-sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useRichTextEditor } from "@/hooks/use-rich-text-editor";
import RichTextEditor from "@/components/rich-text-editor";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const API_BASE = "http://localhost:4000/api";

export default function CreateNoticePage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false); // Fix for hydration
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    description: "",
    type: "ALERT",
    severity: "MEDIUM",
    isPublished: false,
    imageUrl: "",
  });

  const { editorContent, setEditorContent } = useRichTextEditor("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    setMounted(true); // Signal that we are now on the client
    const storedUser = localStorage.getItem("officerUser");

    if (!storedUser) {
      router.push("/officer/login");
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    if (!["SUPER_ADMIN", "ADMIN"].includes(parsedUser.role)) {
      toast.error("Unauthorized");
      router.push("/officer/notices");
      return;
    }
    setUser(parsedUser);
  }, [router]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.content || !editorContent) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setLoading(true);
      const data = new FormData();
      data.append("title", formData.title);
      data.append("content", formData.content);
      data.append("description", editorContent);
      data.append("type", formData.type);
      data.append("severity", formData.severity);
      data.append("isPublished", String(formData.isPublished));
      if (imageFile) data.append("image", imageFile);

      const response = await fetch(`${API_BASE}/notices`, {
        method: "POST",
        body: data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("officerToken")}`,
        },
      });

      if (!response.ok) throw new Error("Failed to create notice");

      toast.success("Notice created successfully");
      router.push("/officer/notices");
    } catch (error) {
      toast.error("Failed to create notice");
    } finally {
      setLoading(false);
    }
  };

  // 1. Prevent rendering during SSR
  if (!mounted) return null;

  // 2. Only show content if user is verified
  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background">
      <OfficerSidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="p-8 max-w-2xl">
          <h1 className="text-3xl font-bold mb-2">Create Safety Notice</h1>
          <p className="text-muted-foreground mb-8">
            Add a new safety notice to the system
          </p>

          <Card>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* ... (Rest of your form JSX remains the same) ... */}
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="content">Short Summary *</Label>
                  <Textarea
                    id="content"
                    placeholder="Brief summary of the notice"
                    value={formData.content}
                    onChange={(e) =>
                      setFormData({ ...formData, content: e.target.value })
                    }
                    rows={3}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">Full Description *</Label>
                  <RichTextEditor
                    content={editorContent}
                    onChange={setEditorContent}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="type">Type *</Label>
                    <Select
                      value={formData.type}
                      onValueChange={(value) =>
                        setFormData({ ...formData, type: value })
                      }
                    >
                      <SelectTrigger id="type">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ALERT">Alert</SelectItem>
                        <SelectItem value="NOTICE">Notice</SelectItem>
                        <SelectItem value="EVENT">Event</SelectItem>
                        <SelectItem value="WANTED">Wanted</SelectItem>
                        <SelectItem value="INFO">Info</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="severity">Severity *</Label>
                    <Select
                      value={formData.severity}
                      onValueChange={(value) =>
                        setFormData({ ...formData, severity: value })
                      }
                    >
                      <SelectTrigger id="severity">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="HIGH">High</SelectItem>
                        <SelectItem value="MEDIUM">Medium</SelectItem>
                        <SelectItem value="LOW">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="image">Image</Label>
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  {imagePreview && (
                    <div className="mt-4">
                      <img
                        src={imagePreview || "/placeholder.svg"}
                        alt="Preview"
                        className="w-48 h-48 object-cover rounded"
                      />
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <Switch
                    id="publish"
                    checked={formData.isPublished}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, isPublished: checked })
                    }
                  />
                  <Label htmlFor="publish" className="cursor-pointer">
                    Publish immediately
                  </Label>
                </div>

                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    "Create Notice"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
