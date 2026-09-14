"use client";
import { Navbar } from "@/components/Navbar";
import GrayBox from "@/components/GrayBox";
import { BOX_DATA } from "@/constants/constant";
import Link from "next/link";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { notFound } from "next/navigation";
import { use } from "react";

// Mock data matching the blog list
const posts = [
  {
    id: "1",
    title: "Why You Need to Track Your 'Invisible' Work",
    excerpt: "Not all work ends up in a GitHub commit. Learn why tracking your reading, planning, and debugging time is crucial for avoiding burnout.",
    content: `
      <p>As developers, we often equate productivity directly with the number of lines of code we write or the number of commits we push. But what about the hours spent reading documentation, planning out architecture on a whiteboard, or tracking down an elusive bug?</p>
      
      <h2>The Problem with Commit-Only Tracking</h2>
      <p>If you only measure your worth by your GitHub heatmap, you're missing at least half the picture. This can lead to serious burnout, as you push yourself to write code when you should be planning, just to keep the streak alive.</p>
      
      <h2>Making the Invisible Visible</h2>
      <p>This is exactly why Command Center includes manual logging features. By categorizing your time into "Learning", "Debugging", and "Planning", you can start to see the real shape of your week.</p>
      
      <ul>
        <li><strong>Learning:</strong> Time spent reading docs, watching tutorials, or experimenting.</li>
        <li><strong>Planning:</strong> Architecture design, sprint planning, and writing tickets.</li>
        <li><strong>Debugging:</strong> The time spent figuring out why something isn't working before you even write a single line of a fix.</li>
      </ul>
      
      <p>Start tracking these metrics, and you'll realize you're doing much more work than your commit history suggests.</p>
    `,
    date: "Oct 12, 2023",
    category: "Productivity",
    author: {
      name: "Alex Chen",
      role: "Lead Developer",
    }
  },
  {
    id: "2",
    title: "Introducing the Dual-Token Architecture",
    excerpt: "A deep dive into how Command Center handles enterprise-grade security using Access and Refresh tokens stored in HTTP-only cookies.",
    content: `
      <p>Security isn't just an afterthought at Command Center; it's built into the foundation of our authentication system. Today, we're doing a deep dive into our Dual-Token Architecture.</p>
      
      <h2>Why not just use a simple JWT?</h2>
      <p>A standard JWT stored in local storage is vulnerable to Cross-Site Scripting (XSS) attacks. If malicious JavaScript gets onto your page, it can read local storage and steal your token.</p>
      
      <h2>The Dual-Token Solution</h2>
      <p>Instead, we use two tokens:</p>
      <ol>
        <li><strong>Access Token:</strong> Short-lived (e.g., 15 minutes). Used to access protected API routes.</li>
        <li><strong>Refresh Token:</strong> Long-lived (e.g., 7 days). Used only to get a new Access Token.</li>
      </ol>
      
      <h2>HTTP-Only Cookies</h2>
      <p>Crucially, both tokens are stored in <strong>HTTP-Only cookies</strong>. This means JavaScript cannot read them, completely eliminating the risk of XSS token theft. Our Axios interceptors handle the silent refreshing in the background, providing a seamless and highly secure user experience.</p>
    `,
    date: "Sep 28, 2023",
    category: "Engineering",
    author: {
      name: "Sarah Miller",
      role: "Security Engineer",
    }
  },
  {
    id: "3",
    title: "How to Optimize Your Pomodoro Sessions",
    excerpt: "Discover the best ways to structure your Focus Mode intervals to maximize your deep work and maintain high energy throughout the day.",
    content: `
      <p>The Pomodoro technique is famous for a reason: it works. But out of the box, a strict 25/5 minute split doesn't work for every type of developer task.</p>
      
      <h2>Match the Interval to the Task</h2>
      <p>If you are writing boilerplate or doing CSS tweaks, a 25-minute Pomodoro might be perfect. But if you are diving deep into complex algorithmic logic, 25 minutes might interrupt your flow state just as you enter it.</p>
      
      <h2>The 50/10 Rule for Deep Work</h2>
      <p>For intense focus, try expanding your timer. A 50-minute work session followed by a 10-minute break allows you enough uninterrupted time to hold complex mental models in your head without being jarred by a timer.</p>
      
      <h2>Using Command Center's Focus Mode</h2>
      <p>Our built-in Focus Mode timer allows you to customize these intervals. Even better, when the timer ends, it automatically logs the session to your chosen project and category, keeping your analytics perfectly updated without any manual entry.</p>
    `,
    date: "Sep 15, 2023",
    category: "Workflow",
    author: {
      name: "Jeet Singh",
      role: "Product Manager",
    }
  }
];

export default function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const post = posts.find((p) => p.id === resolvedParams.id);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col relative overflow-hidden min-h-screen bg-background">
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

        <article className="container mx-auto max-w-3xl px-4 py-20 md:py-28 relative z-10">
          <Link 
            href="/blog" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to all posts
          </Link>

          <header className="space-y-6 mb-12 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5 text-primary font-medium bg-primary/10 px-2.5 py-0.5 rounded-full">
                <Tag className="h-3.5 w-3.5" />
                {post.category}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                {post.date}
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
              {post.title}
            </h1>
            
            <p className="text-xl text-muted-foreground">
              {post.excerpt}
            </p>

            <div className="flex items-center justify-center md:justify-start gap-3 pt-6 border-t border-border/50">
              <div className="h-10 w-10 rounded-full bg-linear-to-br from-primary/80 to-primary/20 flex items-center justify-center text-primary-foreground font-bold">
                {post.author.name.charAt(0)}
              </div>
              <div className="text-left">
                <p className="font-semibold text-sm">{post.author.name}</p>
                <p className="text-xs text-muted-foreground">{post.author.role}</p>
              </div>
            </div>
          </header>

          <div 
            className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary prose-p:leading-relaxed prose-li:leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </div>
    </>
  );
}
