export const dynamic = "force-dynamic";
import { api } from "@/lib/api";
import {
  AlertCircle,
  FolderOpen,
  Zap,
  Clock3,
  TrendingUp,
  ArrowRight,
  PlusCircle,
  FileText,
  Settings2,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { CreateProjectModal } from "@/components/CreateProjectModal";
import { LogWorkModal } from "@/components/logWorKModal";
import { RecentActivityList } from "@/components/RecentActivityList";
import { ActivityChart } from "@/components/ActivityChart";
import { CategoryRadarChart } from "@/components/CategoryRadarChart";
import Link from "next/link";

interface DashboardData {
  user: { name: string; email: string };
  projects: any[];
}

interface LogData {
  _id: string;
  title: string;
  project?: { title: string; color: string };
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
  let categoryStats: { category: string; minutes: number }[] = [];

  try {
    const [userRes, logsRes, analyticsRes, categoryRes] = await Promise.all([
      api.get("users/me"),
      api.get("logs?limit=10"),
      api.get("analytics/weekly"),
      api.get("analytics/categories"),
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

    if ((categoryRes as any).success) {
      categoryStats = (categoryRes as any).data.categories;
    }
  } catch (err: any) {
    console.error("Dashboard Load Error:", err.message);
    error = "System offline";
  }

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

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">

      {/* ── HEADER ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">Control Panel</h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>
              Welcome back,{" "}
              <span className="text-primary font-medium">{user.name}</span>
            </span>
            <span className="text-border">·</span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              System online
            </span>
          </div>
        </div>
        <CreateProjectModal />
      </div>

      {/* ── STATS ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label="Active Projects" value={projects.length} Icon={FolderOpen} accent="#4ade80" />
        <StatCard label="Recent Logs" value={recentLogs.length} Icon={Zap} accent="#a78bfa" />
        <StatCard label="Coding Hours" value={`${totalHours}h`} Icon={Clock3} accent="#38bdf8" />
        <StatCard label="Efficiency" value="94%" Icon={TrendingUp} accent="#fb923c" />
      </div>

      {/* ── CHARTS ROW ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Bar chart — spans 2 cols */}
        <div className="lg:col-span-2 rounded-lg border border-border bg-card">
          <div className="flex items-center gap-2 px-5 py-4 border-b border-border">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <h2 className="font-medium text-sm">Activity Feed</h2>
            <span className="ml-auto text-xs text-muted-foreground">Last 7 days</span>
          </div>
          <div className="p-4 h-64">
            <ActivityChart data={weeklyStats} />
          </div>
        </div>

        {/* Radar chart — spans 1 col */}
        <div className="rounded-lg border border-border bg-card">
          <div className="flex items-center gap-2 px-5 py-4 border-b border-border">
            <span className="w-2 h-2 rounded-full bg-purple-400" />
            <h2 className="font-medium text-sm">Focus Areas</h2>
            <span className="ml-auto text-xs text-muted-foreground">All time</span>
          </div>
          <div className="p-4 h-64">
            <CategoryRadarChart data={categoryStats} />
          </div>
        </div>

      </div>

      {/* ── BOTTOM ROW ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Recent history — spans 2 cols */}
        <div className="lg:col-span-2 rounded-lg border border-border bg-card">
          <div className="px-5 py-4 border-b border-border">
            <p className="text-xs text-muted-foreground uppercase tracking-widest">
              Recent History
            </p>
          </div>
          <div className="px-5 py-4">
            <RecentActivityList logs={recentLogs} />
          </div>
        </div>

        {/* Side panel — spans 1 col */}
        <div className="space-y-4">

          {/* Quick Access */}
          <div className="rounded-lg border border-border bg-card">
            <div className="px-4 py-3 border-b border-border">
              <h2 className="text-sm font-medium">Quick Access</h2>
            </div>
            <div className="p-2">
              {projects.length > 0 ? (
                projects.slice(0, 4).map((proj: any) => (
                  <Link
                    key={proj._id}
                    href={`/control-panel/projects/${proj._id}`}
                    className="flex items-center justify-between w-full rounded-md px-3 py-2
                               text-sm text-muted-foreground hover:text-foreground
                               hover:bg-accent transition-colors duration-100 group"
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ backgroundColor: proj.color || "#4ade80" }}
                      />
                      <span className="truncate">{proj.title}</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-60 transition-opacity" />
                  </Link>
                ))
              ) : (
                <p className="text-xs text-muted-foreground italic px-3 py-4 text-center">
                  No projects yet
                </p>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="rounded-lg border border-border bg-card">
            <div className="px-4 py-3 border-b border-border">
              <h2 className="text-sm font-medium">Actions</h2>
            </div>
            <div className="p-2 space-y-0.5">
              <LogWorkModal projects={projects} />
              <ActionButton Icon={PlusCircle} label="New Project" />
              <ActionButton Icon={FileText} label="System Report" />
              <ActionButton Icon={Settings2} label="Team Settings" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

/* ── StatCard ── */
function StatCard({
  label,
  value,
  Icon,
  accent,
}: {
  label: string;
  value: string | number;
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  accent: string;
}) {
  return (
    <div className="rounded-lg border border-border bg-card p-5 flex items-center gap-4">
      <div
        className="flex-shrink-0 w-9 h-9 rounded-md flex items-center justify-center"
        style={{ backgroundColor: `${accent}18`, border: `1px solid ${accent}35` }}
      >
        <Icon className="w-4 h-4" style={{ color: accent }} />
      </div>
      <div>
        <p className="text-xs text-muted-foreground mb-0.5">{label}</p>
        <p className="text-xl font-semibold tracking-tight">{value}</p>
      </div>
    </div>
  );
}

/* ── ActionButton ── */
function ActionButton({
  label,
  Icon,
}: {
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <Button
      variant="ghost"
      className="w-full justify-start font-normal text-muted-foreground hover:text-foreground gap-2.5 h-9"
    >
      <Icon className="w-4 h-4 opacity-50" />
      {label}
    </Button>
  );
}
