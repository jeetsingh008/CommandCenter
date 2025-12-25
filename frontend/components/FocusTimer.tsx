"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Pause, Square, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LogWorkModal } from "@/components/logWorKModal";
import { useSidebar } from "@/components/ui/sidebar"; // 👈 1. Import Hook
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip"; // Optional: for hover on collapsed state

export function FocusTimer({ projects }: { projects: any[] }) {
  const { state } = useSidebar(); // 👈 2. Get State
  const isCollapsed = state === "collapsed";

  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Toggle Timer
  const toggle = () => setIsActive(!isActive);

  // Stop Timer
  const handleStopClick = () => {
    setIsActive(false);
  };

  const handleLogSuccess = () => {
    setSeconds(0);
  };

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive, seconds]);

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${secs
        .toString()
        .padStart(2, "0")}`;
    }
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const minutesEarned = Math.max(1, Math.floor(seconds / 60));

  // --- 3. RENDER COMPACT VIEW (COLLAPSED) ---
  if (isCollapsed) {
    return (
      <div className="flex justify-center w-full py-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                size="icon"
                onClick={toggle}
                className={
                  isActive
                    ? "animate-pulse text-blue-500 bg-blue-500/10"
                    : "text-muted-foreground"
                }
              >
                {/* If active, show Pause, else show Clock */}
                {isActive ? (
                  <Pause className="w-4 h-4" />
                ) : (
                  <Clock className="w-4 h-4" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>
                {isActive
                  ? `Focusing: ${formatTime(seconds)}`
                  : "Start Focus Timer"}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    );
  }

  // --- 4. RENDER FULL VIEW (EXPANDED) ---
  return (
    <div className="w-full px-2 mb-4 transition-all duration-300 ease-in-out">
      <Card className="bg-sidebar-accent/50 border-sidebar-border shadow-inner">
        <CardContent className="p-3 flex flex-col items-center gap-2">
          {/* Header */}
          <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
            <Clock className="w-3 h-3" />
            Focus Mode
          </div>

          {/* Time Display */}
          <div
            className={`text-4xl font-mono font-bold tracking-tighter tabular-nums ${
              isActive ? "text-primary animate-pulse" : "text-foreground"
            }`}
          >
            {formatTime(seconds)}
          </div>

          {/* Controls - Fixed Width Issue */}
          <div className="flex w-full gap-2">
            {/* Play/Pause Button - Changed w-full to flex-1 */}
            <Button
              size="sm"
              variant={isActive ? "secondary" : "default"}
              className="flex-1"
              onClick={toggle}
            >
              {isActive ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4" />
              )}
            </Button>

            {/* Stop Button - Wrapped in Modal */}
            <LogWorkModal
              projects={projects}
              initialDuration={minutesEarned}
              onSuccess={handleLogSuccess}
              trigger={
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={handleStopClick}
                  disabled={seconds === 0}
                  className="px-3" // Keep this one small/square-ish
                >
                  <Square className="w-4 h-4" />
                </Button>
              }
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
