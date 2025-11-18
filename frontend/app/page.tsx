import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  GitBranchPlus,
  BarChart3Icon,
  ClipboardPenLineIcon,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* === Hero Section === */}
      <section className="container grid max-w-5xl place-items-center gap-6 py-20 text-center md:py-32">
        <h1 className="text-4xl font-extrabold tracking-tighter md:text-6xl lg:text-7xl">
          Your Entire Developer Life,
          <span className="block">in One Dashboard.</span>
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
        </div>
      </section>

      {/* === Dashboard Preview === */}
      <section className="container mb-20 md:mb-32">
        <div className="relative rounded-lg border bg-card shadow-lg">
          <div className="absolute -top-3 left-3 flex space-x-1.5">
            <span className="h-3 w-3 rounded-full bg-red-500"></span>
            <span className="h-3 w-3 rounded-full bg-yellow-500"></span>
            <span className="h-3 w-3 rounded-full bg-green-500"></span>
          </div>
          <div
            // This placeholder is styled to match your dark dashboard theme.
            // Replace this with a real screenshot of your app!
            // src="https://placehold.co/1200x800/27272a/e5e5e5?text=Your%20Beautiful%20Dashboard%0A(Screenshot)"
            // alt="DevPulse Dashboard Preview"
            className="w-full rounded-lg bg-muted p-2"
          />
        </div>
      </section>

      {/* === Features Section === */}
      <section id="features" className="w-full bg-muted/50 py-20 md:py-28">
        <div className="container grid max-w-5xl gap-12">
          <div className="grid gap-2 text-center">
            <span className="text-sm font-semibold uppercase text-primary">
              Features
            </span>
            <h2 className="text-3xl font-extrabold tracking-tighter md:text-4xl">
              A Command Center, Not a To-Do List.
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Feature 1 */}
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="rounded-full bg-primary p-4 text-primary-foreground">
                <GitBranchPlus className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-bold">Automatic GitHub Sync</h3>
              <p className="text-muted-foreground">
                Connect your GitHub account and DevPulse automatically ingests
                your commits, pull requests, and repo activity. No manual entry.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="rounded-full bg-primary p-4 text-primary-foreground">
                <ClipboardPenLineIcon className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-bold">Manual Logging</h3>
              <p className="text-muted-foreground">
                Log learning sessions, job applications, or project notes.
                Capture the &quot;invisible&quot; work that GitHub can&apos;t
                see.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="rounded-full bg-primary p-4 text-primary-foreground">
                <BarChart3Icon className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-bold">Powerful Visualizations</h3>
              <p className="text-muted-foreground">
                See your progress come to life. Your beautiful dashboard shows
                you exactly where your time and effort are going.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* === Final CTA Section === */}
      <section className="container grid max-w-5xl place-items-center gap-6 py-20 text-center md:py-32">
        <h2 className="text-3xl font-extrabold tracking-tighter md:text-5xl">
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
