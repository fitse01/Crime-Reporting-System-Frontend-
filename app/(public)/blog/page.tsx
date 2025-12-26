import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, User, ArrowRight, Newspaper } from "lucide-react"

// Mock blog posts data
const blogPosts = [
  {
    id: 1,
    title: "Community Policing Initiative Shows Positive Results",
    excerpt:
      "Our new community policing program has reduced crime rates by 23% in participating neighborhoods over the past six months.",
    category: "Community",
    author: "Chief Thompson",
    date: "2024-01-20",
    readTime: "5 min read",
    image: "/police-community-meeting.jpg",
  },
  {
    id: 2,
    title: "Top 10 Home Security Tips from Adama Police",
    excerpt:
      "Protect your home and family with these essential security measures recommended by our crime prevention unit.",
    category: "Safety Tips",
    author: "Officer Martinez",
    date: "2024-01-18",
    readTime: "7 min read",
    image: "/home-security-system.jpg",
  },
  {
    id: 3,
    title: "New K-9 Unit Joins the Force",
    excerpt:
      "Meet Rex and Luna, our newest four-legged officers specially trained for narcotics detection and search operations.",
    category: "Department News",
    author: "Officer Johnson",
    date: "2024-01-15",
    readTime: "4 min read",
    image: "/police-dog-k9-unit.jpg",
  },
  {
    id: 4,
    title: "Cybercrime Prevention: Protecting Your Digital Life",
    excerpt:
      "Learn how to identify and prevent common online scams, phishing attempts, and identity theft in the digital age.",
    category: "Safety Tips",
    author: "Detective Williams",
    date: "2024-01-12",
    readTime: "8 min read",
    image: "/cybersecurity-protection.jpg",
  },
  {
    id: 5,
    title: "Traffic Safety Campaign Reduces Accidents by 15%",
    excerpt:
      "Our month-long traffic safety awareness campaign has led to a significant decrease in traffic-related incidents.",
    category: "Traffic Safety",
    author: "Sergeant Brown",
    date: "2024-01-10",
    readTime: "6 min read",
    image: "/traffic-safety-campaign.jpg",
  },
  {
    id: 6,
    title: "Youth Outreach Program: Building Trust with the Next Generation",
    excerpt:
      "Our officers visit schools and youth centers to foster positive relationships and educate young people about safety.",
    category: "Community",
    author: "Officer Davis",
    date: "2024-01-08",
    readTime: "5 min read",
    image: "/police-youth-outreach.jpg",
  },
]

const categories = ["All", "Community", "Safety Tips", "Department News", "Traffic Safety"]

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-4 bg-accent/10 rounded-full mb-4">
            <Newspaper className="h-10 w-10 text-accent" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Police Blog</h1>
          <p className="text-lg text-muted-foreground">
            News, safety tips, and updates from the Adama City Police Department
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {categories.map((category) => (
            <Button key={category} variant={category === "All" ? "default" : "outline"} size="sm">
              {category}
            </Button>
          ))}
        </div>

        {/* Featured Post */}
        <Card className="mb-12 overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="relative h-64 md:h-auto">
              <img
                src={blogPosts[0].image || "/placeholder.svg"}
                alt={blogPosts[0].title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="p-8 flex flex-col justify-center">
              <Badge className="w-fit mb-4">{blogPosts[0].category}</Badge>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">{blogPosts[0].title}</h2>
              <p className="text-muted-foreground mb-6">{blogPosts[0].excerpt}</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {blogPosts[0].author}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(blogPosts[0].date).toLocaleDateString()}
                </div>
              </div>
              <Link href={`/blog/${blogPosts[0].id}`}>
                <Button>
                  Read More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </Card>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.slice(1).map((post) => (
            <Link key={post.id} href={`/blog/${post.id}`}>
              <Card className="h-full hover:shadow-lg transition-shadow overflow-hidden">
                <div className="relative h-48">
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <Badge className="w-fit mb-2">{post.category}</Badge>
                  <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                  <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {post.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(post.date).toLocaleDateString()}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Articles
          </Button>
        </div>
      </div>
    </div>
  )
}
