"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  GitBranchPlus,
  BarChart3Icon,
  ClipboardPenLineIcon,
  Terminal,
  Zap,
  Globe,
} from "lucide-react";
import GrayBox from "@/components/GrayBox";
import { BOX_DATA } from "@/constants/constant";
import { useTheme } from "next-themes";
import Image from "next/image";

export default function HomePage() {
  const { theme, setTheme } = useTheme();
  return (
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

      {/* === Hero Section === */}
      <section className="container mx-auto grid max-w-5xl place-items-center gap-6 py-20 text-center md:py-32">
        <h1 className="text-4xl font-bold tracking-tighter md:text-6xl lg:text-7xl">
          Your Entire Developer Life,
          <span className="block">
            in One <span className="text-primary">Dashboard.</span>
          </span>
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground md:text-xl">
          DevPulse automatically syncs your GitHub activity, tracks your
          learning, and visualizes your progress. Stop guessing, start knowing.
        </p>
        <div className="flex gap-4">
          <Button asChild size="lg">
            <Link href="/register">Get Started for Free</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="#features">Learn More</Link>
          </Button>
          <Button size="lg" onClick={() => setTheme("dark")}>
            setDarkMode
          </Button>
        </div>
      </section>

      {/* === Dashboard Preview === */}
      <section className="container mx-auto px-4 md:px-6">
        <div className="relative rounded-xl border bg-background shadow-2xl">
          <div className="absolute -top-3 left-4 flex space-x-1.5">
            <span className="h-3 w-3 rounded-full bg-red-500"></span>
            <span className="h-3 w-3 rounded-full bg-yellow-500"></span>
            <span className="h-3 w-3 rounded-full bg-green-500"></span>
          </div>
          {/* Placeholder for image */}
          <div className="aspect-video w-full rounded-lg bg-muted/50 p-2 flex items-center justify-center text-muted-foreground">
            <Image
              src="/images/dashboard-preview.jpg"
              alt="Dashboard Preview"
              width={1700}
              height={900}
              className="rounded-md object-cover"
            />
          </div>
        </div>
      </section>

      {/* === Features Section === */}
      <section
        id="features"
        className="w-full bg-muted/50 py-20 md:py-28 mt-20"
      >
        <div className="container mx-auto grid max-w-5xl gap-12 px-4 md:px-6">
          <div className="grid gap-2 text-center">
            <span className="text-sm font-semibold uppercase text-primary">
              Features
            </span>
            <h2 className="text-3xl font-bold md:text-4xl">
              A <span className="text-primary">Command Center</span>, Not a
              To-Do List.
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Feature 1 */}
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="rounded-full bg-primary p-4 text-primary-foreground">
                <GitBranchPlus className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold">Automatic GitHub Sync</h3>
              <p className="text-muted-foreground">
                Connect your GitHub account and DevPulse automatically ingests
                your commits, pull requests, and repo activity.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="rounded-full bg-primary p-4 text-primary-foreground">
                <ClipboardPenLineIcon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold">Manual Logging</h3>
              <p className="text-muted-foreground">
                Log learning sessions, job applications, or project notes.
                Capture the &quot;invisible&quot; work that GitHub can&apos;t
                see.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="rounded-full bg-primary p-4 text-primary-foreground">
                <BarChart3Icon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold">Powerful Visualizations</h3>
              <p className="text-muted-foreground">
                See your progress come to life. Your beautiful dashboard shows
                you exactly where your time and effort are going.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* === NEW SECTION 1: How It Works (Workflow) === */}
      <section className="w-full py-20 md:py-28">
        <div className="container mx-auto grid max-w-5xl gap-12 px-4 md:px-6">
          <div className="grid gap-2 text-center">
            <span className="text-sm font-semibold uppercase text-primary">
              Workflow
            </span>
            <h2 className="text-3xl font-bold md:text-4xl">
              Zero Friction Setup
            </h2>
            <p className="mx-auto max-w-[600px] text-muted-foreground">
              We know you hate manual data entry. So we made it automatic.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Step 1 */}
            <div className="relative flex flex-col items-start gap-4 rounded-lg border bg-background p-6 shadow-sm transition-all hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Globe className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-bold">1. Connect Accounts</h3>
                <p className="text-muted-foreground">
                  Sign in with GitHub. We securely access your public and
                  private contributions.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative flex flex-col items-start gap-4 rounded-lg border bg-background p-6 shadow-sm transition-all hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Terminal className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-bold">2. Just Code</h3>
                <p className="text-muted-foreground">
                  Work as usual. Push commits, open PRs, and review code. We
                  track it all in the background.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative flex flex-col items-start gap-4 rounded-lg border bg-background p-6 shadow-sm transition-all hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Zap className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-bold">3. See Insights</h3>
                <p className="text-muted-foreground">
                  Watch your dashboard update in real-time. Spot trends and
                  optimize your workflow.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === NEW SECTION 2: Testimonials === */}
      <section className="w-full bg-muted/50 py-20 md:py-28">
        <div className="container mx-auto grid max-w-5xl gap-12 px-4 md:px-6">
          <div className="grid gap-2 text-center">
            <h2 className="text-3xl font-bold md:text-4xl">
              Built for Developers, by Developers
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Testimonial 1 */}
            <div className="flex flex-col justify-between rounded-xl border bg-background p-6 shadow-sm">
              <p className="mb-4 text-muted-foreground italic">
                &quot;I used to manually track my hours in a spreadsheet.
                DevPulse automated everything. The radar chart helped me realize
                I was neglecting code reviews.&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-linear-to-br from-blue-500 to-purple-500"></div>
                <div>
                  <p className="font-semibold text-sm">Alex Chen</p>
                  <p className="text-xs text-muted-foreground">
                    Full Stack Developer
                  </p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="flex flex-col justify-between rounded-xl border bg-background p-6 shadow-sm">
              <p className="mb-4 text-muted-foreground italic">
                &quot;The manual logging feature is a game changer. I can
                finally track my &apos;learning time&apos; alongside my actual
                coding time. Best portfolio addition ever.&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-linear-to-br from-green-500 to-emerald-500"></div>
                <div>
                  <p className="font-semibold text-sm">Sarah Miller</p>
                  <p className="text-xs text-muted-foreground">
                    Frontend Engineer
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === Final CTA Section === */}
      <section className="container mx-auto grid max-w-5xl place-items-center gap-6 py-20 text-center md:py-32">
        <h2 className="text-3xl font-bold tracking-tighter md:text-5xl">
          Ready to take control?
        </h2>
        <p className="max-w-[600px] text-lg text-muted-foreground md:text-xl">
          Start tracking your developer journey for free. See your progress in
          one week.
        </p>
        <Button asChild size="lg">
          <Link href="/register">Get Started Now</Link>
        </Button>
      </section>
    </div>
  );
}
