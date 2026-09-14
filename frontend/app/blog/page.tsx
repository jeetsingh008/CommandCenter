"use client";
import { Navbar } from "@/components/Navbar";
import GrayBox from "@/components/GrayBox";
import { BOX_DATA } from "@/constants/constant";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function BlogPage() {
  const posts = [
    {
      id: 1,
      title: "Why You Need to Track Your 'Invisible' Work",
      excerpt: "Not all work ends up in a GitHub commit. Learn why tracking your reading, planning, and debugging time is crucial for avoiding burnout.",
      date: "Oct 12, 2023",
      category: "Productivity",
    },
    {
      id: 2,
      title: "Introducing the Dual-Token Architecture",
      excerpt: "A deep dive into how Command Center handles enterprise-grade security using Access and Refresh tokens stored in HTTP-only cookies.",
      date: "Sep 28, 2023",
      category: "Engineering",
    },
    {
      id: 3,
      title: "How to Optimize Your Pomodoro Sessions",
      excerpt: "Discover the best ways to structure your Focus Mode intervals to maximize your deep work and maintain high energy throughout the day.",
      date: "Sep 15, 2023",
      category: "Workflow",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="flex flex-col relative overflow-hidden min-h-screen">
        {/* Background Pattern */}
        {BOX_DATA.map((box) => (
          <GrayBox
            key={box.id}
            size={box.size}
            isFilled={box.isFilled}
            rotateBy={box.rotateBy}
            topBy={box.top}
            leftBy={box.left}
          />
        ))}

        <section className="container mx-auto grid max-w-5xl gap-12 px-4 py-20 md:py-32">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter md:text-6xl">
              The <span className="text-primary">Command Center</span> Blog
            </h1>
            <p className="mx-auto max-w-[700px] text-lg text-muted-foreground md:text-xl">
              Insights, engineering deep dives, and productivity tips for developers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {posts.map((post) => (
              <div key={post.id} className="group flex flex-col justify-between rounded-xl border bg-background p-6 shadow-sm transition-all hover:shadow-md hover:border-primary/50">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase text-primary tracking-wider">{post.category}</span>
                    <span className="text-xs text-muted-foreground">{post.date}</span>
                  </div>
                  <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors">{post.title}</h3>
                  <p className="text-muted-foreground text-sm line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
                <div className="mt-6 pt-6 border-t flex items-center justify-between">
                  <Link href={`/blog/${post.id}`} className="text-sm font-medium inline-flex items-center gap-2 hover:text-primary transition-colors">
                    Read more <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
