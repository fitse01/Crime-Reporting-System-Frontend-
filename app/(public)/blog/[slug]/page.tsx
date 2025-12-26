"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, MapPin, Tag, ArrowLeft, FileText } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  summary: string;
  content: string;
  coverImageUrl: string;
  category: {
    id: number;
    name: string;
  };
  crimeType: {
    id: number;
    name: string;
  };
  location: {
    id: number;
    name: string;
  };
  author: {
    id: number;
    name: string;
    email: string;
  };
  tags: string[];
  media: Array<{
    id: number;
    url: string;
    type: string;
  }>;
  status: string;
  isPinned: boolean;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

async function fetchBlogPosts(): Promise<BlogPost[]> {
  const response = await fetch("http://localhost:4000/api/blog");
  if (!response.ok) {
    throw new Error("Failed to fetch blog posts");
  }
  return response.json();
}

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ["blog-posts"],
    queryFn: fetchBlogPosts,
  });

  const post = posts.find((p) => p.slug === slug);
  const relatedPosts = posts
    .filter(
      (p) =>
        p.category.id === post?.category.id &&
        p.slug !== slug &&
        p.status === "PUBLISHED"
    )
    .slice(0, 3);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <Skeleton className="h-96 w-full mb-8" />
          <Skeleton className="h-10 w-3/4 mb-4" />
          <Skeleton className="h-6 w-full mb-2" />
          <Skeleton className="h-6 w-full mb-2" />
          <Skeleton className="h-6 w-2/3" />
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <FileText className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The blog post you're looking for doesn't exist.
          </p>
          <Link href="/blog">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <Link href="/blog" className="inline-block mb-6">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Button>
        </Link>

        {/* Cover Image */}
        <div className="relative h-96 rounded-lg overflow-hidden mb-8">
          <Image
            src={post.coverImageUrl || "/placeholder.svg"}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Post Header */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Badge>{post.category.name}</Badge>
            <Badge variant="secondary">{post.crimeType.name}</Badge>
            {post.isPinned && <Badge variant="outline">Featured</Badge>}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              {post.author.name}
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {format(new Date(post.publishedAt), "MMMM dd, yyyy")}
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {post.location.name}
            </div>
          </div>

          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <Badge key={index} variant="outline">
                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="bg-accent/10 border-l-4 border-accent p-6 rounded-r-lg mb-8">
          <p className="text-lg font-medium text-balance">{post.summary}</p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none mb-12">
          <div className="whitespace-pre-wrap leading-relaxed">
            {post.content}
          </div>
        </div>

        {/* Media Gallery */}
        {post.media.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Media Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {post.media.map((item) => (
                <div
                  key={item.id}
                  className="relative h-64 rounded-lg overflow-hidden"
                >
                  <Image
                    src={item.url || "/placeholder.svg"}
                    alt={`Media ${item.id}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`}>
                  <Card className="h-full hover:shadow-lg transition-shadow overflow-hidden">
                    <div className="relative h-40">
                      <Image
                        src={relatedPost.coverImageUrl || "/placeholder.svg"}
                        alt={relatedPost.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardHeader>
                      <Badge className="w-fit mb-2">
                        {relatedPost.category.name}
                      </Badge>
                      <CardTitle className="line-clamp-2 text-base">
                        {relatedPost.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {relatedPost.summary}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
