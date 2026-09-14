"use client";
import { Navbar } from "@/components/Navbar";
import { GitBranchPlus, BarChart3Icon, ClipboardPenLineIcon, Terminal, Zap, Globe } from "lucide-react";
import GrayBox from "@/components/GrayBox";
import { BOX_DATA } from "@/constants/constant";

export default function FeaturesPage() {
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
          <div className="grid gap-4 text-center">
            <h1 className="text-4xl font-bold tracking-tighter md:text-6xl">
              Command Center <span className="text-primary">Features</span>
            </h1>
            <p className="mx-auto max-w-[700px] text-lg text-muted-foreground md:text-xl">
              Everything you need to track your productivity, analyze your workflows, and manage your projects in one place.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 mt-8">
            <div className="flex flex-col items-start gap-4 rounded-lg border bg-background p-6 shadow-sm transition-all hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <GitBranchPlus className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Automatic GitHub Sync</h3>
                <p className="text-muted-foreground">
                  Connect your GitHub account and we'll automatically ingest your commits, pull requests, and repo activity.
                </p>
              </div>
            </div>

            <div className="flex flex-col items-start gap-4 rounded-lg border bg-background p-6 shadow-sm transition-all hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <ClipboardPenLineIcon className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Manual Logging</h3>
                <p className="text-muted-foreground">
                  Log learning sessions, job applications, or project notes. Capture the work that GitHub can't see.
                </p>
              </div>
            </div>

            <div className="flex flex-col items-start gap-4 rounded-lg border bg-background p-6 shadow-sm transition-all hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <BarChart3Icon className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Powerful Visualizations</h3>
                <p className="text-muted-foreground">
                  See your progress come to life. Your beautiful dashboard shows you exactly where your time is going.
                </p>
              </div>
            </div>

            <div className="flex flex-col items-start gap-4 rounded-lg border bg-background p-6 shadow-sm transition-all hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Terminal className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Focus Mode</h3>
                <p className="text-muted-foreground">
                  Integrated Pomodoro timer with auto-logging. Work efficiently without leaving the dashboard.
                </p>
              </div>
            </div>

            <div className="flex flex-col items-start gap-4 rounded-lg border bg-background p-6 shadow-sm transition-all hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Zap className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Real-time Velocity</h3>
                <p className="text-muted-foreground">
                  Track your coding minutes against your goals and optimize your workflow for maximum efficiency.
                </p>
              </div>
            </div>

            <div className="flex flex-col items-start gap-4 rounded-lg border bg-background p-6 shadow-sm transition-all hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Globe className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Project Management</h3>
                <p className="text-muted-foreground">
                  Organize your tasks by project and category. Get deep insights into time spent per specific project.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
