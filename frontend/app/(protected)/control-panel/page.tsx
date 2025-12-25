import { api } from "@/lib/api";
// import Link from "next/link";
import { AlertCircle } from "lucide-react";

// Shadcn UI Imports
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Custom Components
import { CreateProjectModal } from "@/components/CreateProjectModal";
import { LogWorkModal } from "@/components/logWorKModal"; // Fixed casing import
import { RecentActivityList } from "@/components/RecentActivityList";
import { ActivityChart } from "@/components/ActivityChart";

interface DashboardData {
  user: {
    name: string;
    email: string;
  };
  projects: any[];
}

interface LogData {
  _id: string;
  title: string;
  project?: {
    title: string;
    color: string;
  };
  durationMinutes: number;
  date: string;
  category: string;
}

export default async function ControlPanelPage() {
  let dashboardData: DashboardData | null = null;
  let recentLogs: LogData[] = [];
  let error = null;
  let weeklyStats: any[] = [];
  let totalHours = "0.0";

  try {
    const [userRes, logsRes, analyticsRes] = await Promise.all([
      api.get("users/me"),
      api.get("logs?limit=10"),
      api.get("analytics/weekly"),
    ]);

    if ((userRes as any).success && (userRes as any).data) {
      dashboardData = (userRes as any).data;
    } else {
      error = "Failed to load user data";
    }

    if ((logsRes as any).success && (logsRes as any).data) {
      recentLogs = (logsRes as any).data;
    }

    if ((analyticsRes as any).success) {
      weeklyStats = (analyticsRes as any).data.weekly; 
      totalHours = (analyticsRes as any).data.totalHours;
    }
  } catch (err: any) {
    console.error("Dashboard Load Error:", err.message);
    error = "System offline";
  }

  // --- Error State ---
  if (error || !dashboardData) {
    return (
      <div className="p-12 flex justify-center">
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Connection Error</AlertTitle>
          <AlertDescription>
            Unable to establish link with Command Center API.
            <div className="mt-2 text-xs opacity-75 font-mono">
              Debug: {error}
            </div>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const { user, projects } = dashboardData;

  // --- Main Render ---
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Control Panel</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back,{" "}
            <span className="text-primary font-semibold">{user.name}</span>.
            System operational.
          </p>
        </div>
        <CreateProjectModal />
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Active Projects" value={projects.length} icon="📂" />
        <StatCard label="Recent Logs" value={recentLogs.length} icon="⚡" />
        <StatCard label="Coding Hours" value={`${totalHours}h`} icon="⏱️" />
        <StatCard label="Efficiency" value="94%" icon="🚀" />
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Activity Log (Main Chart Area) */}
        <Card className="lg:col-span-2 flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Activity Feed
            </CardTitle>
            <CardDescription>Your recent development sessions.</CardDescription>
          </CardHeader>
          
          {/* 👇 KEY FIX: Removed flex-1, added explicit p-0 and inner div with explicit height */}
          <CardContent className="p-0">
             <div className="h-[300px] w-full p-4">
                <ActivityChart data={weeklyStats} />
             </div>
          </CardContent>

          <div className="px-6 pb-6 pt-4 border-t border-gray-800/50">
            <h3 className="text-sm font-medium mb-4 text-muted-foreground">
              Recent History
            </h3>
            <RecentActivityList logs={recentLogs} />
          </div>
        </Card>

        {/* Side Panel */}
        <div className="space-y-6">
          {/* Recent Projects List */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Access</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {projects.length > 0 ? (
                projects.slice(0, 3).map((proj: any) => (
                  <Button
                    key={proj._id}
                    variant="secondary"
                    className="w-full justify-between h-auto py-3 px-4 group"
                  >
                    <span>{proj.title}</span>
                    <span
                      className="w-2 h-2 rounded-full ring-2 ring-transparent group-hover:ring-offset-2 transition-all"
                      style={{ backgroundColor: proj.color || "#3b82f6" }}
                    ></span>
                  </Button>
                ))
              ) : (
                <p className="text-sm text-muted-foreground italic">
                  No projects found
                </p>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <LogWorkModal projects={projects} />
              <QuickAction label="View Team Settings" />
              <QuickAction label="System Report" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// --- Local Components ---

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string | number;
  icon: string;
}) {
  return (
    <Card>
      <CardContent className="p-6 flex items-center gap-4">
        <div className="text-2xl p-3 bg-secondary rounded-lg">{icon}</div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <h3 className="text-2xl font-bold tracking-tight">{value}</h3>
        </div>
      </CardContent>
    </Card>
  );
}

function QuickAction({ label }: { label: string }) {
  return (
    <Button
      variant="ghost"
      className="w-full justify-start text-left font-normal"
    >
      {label}
    </Button>
  );
}