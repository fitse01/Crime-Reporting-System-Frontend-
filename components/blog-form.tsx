// "use client";

// import type React from "react";

// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import { useMutation, useQuery } from "@tanstack/react-query";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Switch } from "@/components/ui/switch";
// import { toast } from "sonner";
// import { Loader2, X } from "lucide-react";
// import { useState } from "react";
// import Image from "next/image";

// const blogSchema = z.object({
//   title: z.string().min(5, "Title must be at least 5 characters"),
//   summary: z.string().min(10, "Summary must be at least 10 characters"),
//   content: z.string().min(50, "Content must be at least 50 characters"),
//   status: z.enum(["PUBLISHED", "DRAFT"]),
//   categoryId: z.number({ required_error: "Category is required" }),
//   crimeTypeId: z.number().optional(),
//   locationId: z.number().optional(),
//   isPublic: z.boolean().default(true),
//   isPinned: z.boolean().default(false),
//   tags: z.array(z.number()).optional(),
// });

// type BlogFormData = z.infer<typeof blogSchema>;

// interface BlogFormProps {
//   post?: any;
//   onSuccess: () => void;
//   onCancel: () => void;
// }

// export function BlogForm({ post, onSuccess, onCancel }: BlogFormProps) {
//   const [coverImage, setCoverImage] = useState<File | null>(null);
//   const [coverImagePreview, setCoverImagePreview] = useState<string | null>(
//     post?.coverImageUrl || null
//   );
//   const [mediaFiles, setMediaFiles] = useState<File[]>([]);
//   const [mediaPreview, setMediaPreview] = useState<string[]>(
//     post?.media?.map((m: any) => m.url) || []
//   );

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     setValue,
//     watch,
//   } = useForm<BlogFormData>({
//     resolver: zodResolver(blogSchema),
//     defaultValues: post
//       ? {
//           title: post.title,
//           summary: post.summary,
//           content: post.content,
//           status: post.status,
//           categoryId: post.category.id,
//           crimeTypeId: post.crimeType?.id,
//           locationId: post.location?.id,
//           isPublic: post.isPublic,
//           isPinned: post.isPinned,
//           tags: post.tags?.map((t: any) => t.tag.id),
//         }
//       : {
//           status: "DRAFT",
//           isPublic: true,
//           isPinned: false,
//         },
//   });

//   // Fetch categories, crime types, locations, and tags
//   const { data: categoriesData } = useQuery({
//     queryKey: ["categories"],
//     queryFn: async () => {
//       const response = await fetch("http://localhost:4000/api/categories");
//       if (!response.ok) throw new Error("Failed to fetch categories");
//       return response.json();
//     },
//   });

//   const { data: crimeTypesData } = useQuery({
//     queryKey: ["crime-types"],
//     queryFn: async () => {
//       const response = await fetch("http://localhost:4000/api/crime-types");
//       if (!response.ok) throw new Error("Failed to fetch crime types");
//       return response.json();
//     },
//   });

//   const { data: locationsData } = useQuery({
//     queryKey: ["locations"],
//     queryFn: async () => {
//       const response = await fetch("http://localhost:4000/api/locations");
//       if (!response.ok) throw new Error("Failed to fetch locations");
//       return response.json();
//     },
//   });

//   const { data: tagsData } = useQuery({
//     queryKey: ["tags"],
//     queryFn: async () => {
//       const response = await fetch("http://localhost:4000/api/tags");
//       if (!response.ok) throw new Error("Failed to fetch tags");
//       return response.json();
//     },
//   });

//   const mutation = useMutation({
//     mutationFn: async (data: BlogFormData) => {
//       const formData = new FormData();

//       // Append text fields
//       Object.entries(data).forEach(([key, value]) => {
//         if (value !== undefined && value !== null) {
//           if (key === "tags" && Array.isArray(value)) {
//             formData.append(key, JSON.stringify(value));
//           } else {
//             formData.append(key, value.toString());
//           }
//         }
//       });

//       // Append cover image
//       if (coverImage) {
//         formData.append("coverImage", coverImage);
//       }

//       // Append media files
//       mediaFiles.forEach((file) => {
//         formData.append("media", file);
//       });

//       const url = post
//         ? `http://localhost:4000/api/blog/${post.id}`
//         : "http://localhost:4000/api/blog";

//       const response = await fetch(url, {
//         method: post ? "PUT" : "POST",
//         body: formData,
//       });

//       if (!response.ok) throw new Error("Failed to save blog post");
//       return response.json();
//     },
//     onSuccess: () => {
//       toast.success(
//         post
//           ? "Blog post updated successfully"
//           : "Blog post created successfully"
//       );
//       onSuccess();
//     },
//     onError: () => {
//       toast.error("Failed to save blog post");
//     },
//   });

//   const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setCoverImage(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setCoverImagePreview(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = Array.from(e.target.files || []);
//     setMediaFiles((prev) => [...prev, ...files]);

//     files.forEach((file) => {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setMediaPreview((prev) => [...prev, reader.result as string]);
//       };
//       reader.readAsDataURL(file);
//     });
//   };

//   const removeMedia = (index: number) => {
//     setMediaFiles((prev) => prev.filter((_, i) => i !== index));
//     setMediaPreview((prev) => prev.filter((_, i) => i !== index));
//   };

//   const onSubmit = (data: BlogFormData) => {
//     mutation.mutate(data);
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//       {/* Title */}
//       <div className="space-y-2">
//         <Label htmlFor="title">Title *</Label>
//         <Input
//           id="title"
//           {...register("title")}
//           placeholder="Enter blog post title"
//         />
//         {errors.title && (
//           <p className="text-sm text-red-600">{errors.title.message}</p>
//         )}
//       </div>

//       {/* Summary */}
//       <div className="space-y-2">
//         <Label htmlFor="summary">Summary *</Label>
//         <Textarea
//           id="summary"
//           {...register("summary")}
//           placeholder="Brief summary of the post"
//           rows={3}
//         />
//         {errors.summary && (
//           <p className="text-sm text-red-600">{errors.summary.message}</p>
//         )}
//       </div>

//       {/* Content */}
//       <div className="space-y-2">
//         <Label htmlFor="content">Content *</Label>
//         <Textarea
//           id="content"
//           {...register("content")}
//           placeholder="Full blog post content (Markdown/HTML supported)"
//           rows={8}
//         />
//         {errors.content && (
//           <p className="text-sm text-red-600">{errors.content.message}</p>
//         )}
//       </div>

//       {/* Cover Image */}
//       <div className="space-y-2">
//         <Label htmlFor="coverImage">Cover Image</Label>
//         <div className="flex items-center gap-4">
//           <Input
//             id="coverImage"
//             type="file"
//             accept="image/*"
//             onChange={handleCoverImageChange}
//             className="flex-1"
//           />
//           {coverImagePreview && (
//             <div className="relative h-20 w-32">
//               <Image
//                 src={coverImagePreview || "/placeholder.svg"}
//                 alt="Cover preview"
//                 fill
//                 className="object-cover rounded"
//               />
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Media Gallery */}
//       <div className="space-y-2">
//         <Label htmlFor="media">Additional Media</Label>
//         <Input
//           id="media"
//           type="file"
//           accept="image/*"
//           multiple
//           onChange={handleMediaChange}
//         />
//         {mediaPreview.length > 0 && (
//           <div className="grid grid-cols-4 gap-2 mt-2">
//             {mediaPreview.map((preview, index) => (
//               <div key={index} className="relative h-20">
//                 <Image
//                   src={preview || "/placeholder.svg"}
//                   alt={`Media ${index + 1}`}
//                   fill
//                   className="object-cover rounded"
//                 />
//                 <Button
//                   type="button"
//                   variant="destructive"
//                   size="icon"
//                   className="absolute -top-2 -right-2 h-6 w-6"
//                   onClick={() => removeMedia(index)}
//                 >
//                   <X className="h-4 w-4" />
//                 </Button>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       <div className="grid grid-cols-2 gap-4">
//         {/* Category */}
//         <div className="space-y-2">
//           <Label htmlFor="categoryId">Category *</Label>
//           <Select
//             value={watch("categoryId")?.toString()}
//             onValueChange={(value) =>
//               setValue("categoryId", Number.parseInt(value))
//             }
//           >
//             <SelectTrigger>
//               <SelectValue placeholder="Select category" />
//             </SelectTrigger>
//             <SelectContent>
//               {categoriesData?.categories?.map((cat: any) => (
//                 <SelectItem key={cat.id} value={cat.id.toString()}>
//                   {cat.name}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//           {errors.categoryId && (
//             <p className="text-sm text-red-600">{errors.categoryId.message}</p>
//           )}
//         </div>

//         {/* Crime Type */}
//         <div className="space-y-2">
//           <Label htmlFor="crimeTypeId">Crime Type</Label>
//           <Select
//             value={watch("crimeTypeId")?.toString()}
//             onValueChange={(value) =>
//               setValue("crimeTypeId", Number.parseInt(value))
//             }
//           >
//             <SelectTrigger>
//               <SelectValue placeholder="Select crime type" />
//             </SelectTrigger>
//             <SelectContent>
//               {crimeTypesData?.crimeTypes?.map((type: any) => (
//                 <SelectItem key={type.id} value={type.id.toString()}>
//                   {type.name}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </div>

//         {/* Location */}
//         <div className="space-y-2">
//           <Label htmlFor="locationId">Location</Label>
//           <Select
//             value={watch("locationId")?.toString()}
//             onValueChange={(value) =>
//               setValue("locationId", Number.parseInt(value))
//             }
//           >
//             <SelectTrigger>
//               <SelectValue placeholder="Select location" />
//             </SelectTrigger>
//             <SelectContent>
//               {locationsData?.locations?.map((loc: any) => (
//                 <SelectItem key={loc.id} value={loc.id.toString()}>
//                   {loc.city}, {loc.subCity}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </div>

//         {/* Status */}
//         <div className="space-y-2">
//           <Label htmlFor="status">Status *</Label>
//           <Select
//             value={watch("status")}
//             onValueChange={(value) =>
//               setValue("status", value as "PUBLISHED" | "DRAFT")
//             }
//           >
//             <SelectTrigger>
//               <SelectValue placeholder="Select status" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="DRAFT">Draft</SelectItem>
//               <SelectItem value="PUBLISHED">Published</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>
//       </div>

//       {/* Toggles */}
//       <div className="flex items-center gap-8">
//         <div className="flex items-center gap-2">
//           <Switch
//             id="isPublic"
//             checked={watch("isPublic")}
//             onCheckedChange={(checked) => setValue("isPublic", checked)}
//           />
//           <Label htmlFor="isPublic">Public</Label>
//         </div>
//         <div className="flex items-center gap-2">
//           <Switch
//             id="isPinned"
//             checked={watch("isPinned")}
//             onCheckedChange={(checked) => setValue("isPinned", checked)}
//           />
//           <Label htmlFor="isPinned">Pinned</Label>
//         </div>
//       </div>

//       {/* Actions */}
//       <div className="flex justify-end gap-2 pt-4">
//         <Button type="button" variant="outline" onClick={onCancel}>
//           Cancel
//         </Button>
//         <Button
//           type="submit"
//           disabled={mutation.isPending}
//           className="bg-blue-600 hover:bg-blue-700"
//         >
//           {mutation.isPending && (
//             <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//           )}
//           {post ? "Update Post" : "Create Post"}
//         </Button>
//       </div>
//     </form>
//   );
// }
"use client";

import { useState, useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2, Upload, X } from "lucide-react";
import Image from "next/image";

const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  summary: z.string().min(20, "Summary must be at least 20 characters"),
  categoryId: z.string().min(1, "Category is required"),
  crimeTypeId: z.string().optional().nullable(),
  locationId: z.string().optional().nullable(),
  status: z.enum(["PUBLISHED", "DRAFT"]),
  isPublic: z.boolean(),
  isPinned: z.boolean(),
});

type FormValues = z.infer<typeof formSchema>;

export function BlogForm({ post, onSuccess, onCancel }: any) {
  const queryClient = useQueryClient();
  const isEdit = !!post;

  // --- 1. FIXED: Correct Location Path & Mapping ---
  const { data: catRes } = useQuery({
    queryKey: ["blog-categories"],
    queryFn: () =>
      fetch("http://localhost:4000/api/blog/categories").then((res) =>
        res.json()
      ),
  });
  const { data: crimeRes } = useQuery({
    queryKey: ["crime-types"],
    queryFn: () =>
      fetch("http://localhost:4000/api/blog/crime-types").then((res) =>
        res.json()
      ),
  });
  const { data: locRes } = useQuery({
    queryKey: ["locations"],
    queryFn: () =>
      fetch("http://localhost:4000/api/blog/locations").then((res) =>
        res.json()
      ),
  });

  // Extract arrays with correct object keys
  const categories = catRes?.categories || [];
  const crimeTypes = crimeRes?.crimeTypes || [];
  const locations = locRes?.locations || []; // Matches backend: { locations: [...] }

  const extensions = useMemo(() => [StarterKit, Underline], []);
  const editor = useEditor({
    extensions,
    content: post?.content || "",
    immediatelyRender: false,
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: post?.title || "",
      summary: post?.summary || "",
      categoryId: post?.category?.id?.toString() || "",
      crimeTypeId: post?.crimeType?.id?.toString() || "",
      locationId: post?.location?.id?.toString() || "",
      status: post?.status || "DRAFT",
      isPublic: post?.isPublic ?? true,
      isPinned: post?.isPinned ?? false,
    },
  });

  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(
    post?.coverImageUrl || null
  );

  // --- 2. FIXED: Improved Mutation to prevent 500 Errors ---
  const mutation = useMutation({
    mutationFn: async (data: FormValues) => {
      const rawToken = localStorage.getItem("officerToken");
      const token = rawToken?.startsWith("Bearer ")
        ? rawToken
        : `Bearer ${rawToken}`;
      const formData = new FormData();

      // Append data, but filter out empty strings for optional IDs
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          formData.append(key, value.toString());
        }
      });

      formData.append("content", editor?.getHTML() || "");
      if (coverFile) formData.append("coverImage", coverFile);

      // Send an empty array for tags if none exist to prevent backend crash
      formData.append("tagIds", JSON.stringify([]));

      const url = isEdit
        ? `http://localhost:4000/api/blog/${post.id}`
        : "http://localhost:4000/api/blog";
      const res = await fetch(url, {
        method: isEdit ? "PATCH" : "POST",
        body: formData,
        headers: { Authorization: token },
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(
          errData.error || "Server failed to process request (500)"
        );
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blog-posts"] });
      toast.success(isEdit ? "Post updated!" : "Post created!");
      onSuccess();
    },
    onError: (err: any) => toast.error(err.message),
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => mutation.mutate(data))}
        className="space-y-6"
      >
        <ScrollArea className="h-[75vh] pr-4">
          <div className="space-y-6">
            {/* Cover Image Upload */}
            <div className="space-y-2">
              <Label>Cover Image</Label>
              {coverPreview ? (
                <div className="relative h-48 w-full">
                  <Image
                    src={coverPreview}
                    alt="Preview"
                    fill
                    className="object-cover rounded-md"
                  />
                  <Button
                    type="button"
                    size="icon"
                    variant="destructive"
                    className="absolute top-2 right-2"
                    onClick={() => {
                      setCoverPreview(null);
                      setCoverFile(null);
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-muted hover:bg-muted/50">
                  <Upload className="h-8 w-8 text-muted-foreground" />
                  <span className="text-sm">Upload Cover</span>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setCoverFile(file);
                        setCoverPreview(URL.createObjectURL(file));
                      }
                    }}
                  />
                </Label>
              )}
            </div>

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="summary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Summary</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <Label>Content</Label>
              <div className="border rounded-md p-3 min-h-[300px] bg-white text-black prose prose-sm max-w-none">
                <EditorContent editor={editor} />
              </div>
            </div>

            {/* Dropdowns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((c: any) => (
                          <SelectItem key={c.id} value={c.id.toString()}>
                            {c.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="crimeTypeId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Crime Type (Optional)</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value || ""}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Crime Type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {crimeTypes.map((t: any) => (
                          <SelectItem key={t.id} value={t.id.toString()}>
                            {t.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>

            {/* FIXED: Location dropdown logic */}
            <FormField
              control={form.control}
              name="locationId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location (Optional)</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value || ""}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Location" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {locations.map((l: any) => (
                        <SelectItem key={l.id} value={l.id.toString()}>
                          {l.city} - {l.subCity}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <div className="flex flex-wrap gap-4 items-end">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="DRAFT">Draft</SelectItem>
                        <SelectItem value="PUBLISHED">Published</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isPublic"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-2 space-y-0 border p-2 rounded-md">
                    <FormLabel>Public</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
        </ScrollArea>

        <div className="flex justify-end gap-3 border-t pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Save Post
          </Button>
        </div>
      </form>
    </Form>
  );
}
