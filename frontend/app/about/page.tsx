"use client";
import { Navbar } from "@/components/Navbar";
import GrayBox from "@/components/GrayBox";
import { BOX_DATA } from "@/constants/constant";

export default function AboutPage() {
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

        <section className="container mx-auto grid max-w-4xl gap-8 px-4 py-20 md:py-32">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter md:text-6xl">
              About <span className="text-primary">Command Center</span>
            </h1>
            <p className="mx-auto max-w-[700px] text-lg text-muted-foreground md:text-xl">
              Built by developers, for developers. We're on a mission to bring clarity to your workflow.
            </p>
          </div>

          <div className="mt-12 space-y-12">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Our Story</h2>
              <p className="text-muted-foreground leading-relaxed">
                Command Center started as an internal tool to solve a simple problem: developer workflows are too fragmented. Between project management apps, time trackers, and code repositories, it was impossible to get a clear, unified view of our daily productivity.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We built this platform to integrate seamlessly with the tools you already use (like GitHub), while providing manual logging for the invisible work—learning, planning, and debugging—that doesn't always result in a commit.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                We believe that developers do their best work when they can visualize their progress. By combining a beautiful interface with powerful analytics, we aim to help you optimize your time, avoid burnout, and take control of your career trajectory.
              </p>
            </div>
            
            <div className="rounded-xl border bg-card p-8 text-center space-y-4 mt-8 shadow-sm">
              <h3 className="text-xl font-semibold">Join the journey</h3>
              <p className="text-muted-foreground">We are constantly evolving. Connect your GitHub account today and see the difference.</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
