import { api } from "@/lib/api";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, MoreVertical, Hash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RecentActivityList } from "@/components/RecentActivityList";
import { ActivityChart } from "@/components/ActivityChart";

function formatDuration(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m}m`;
}

export default async function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const projectId = (await params).id;

  let project: any = null;
  let logs: any[] = [];
  let weeklyStats: any[] = [];
  let error = null;

  try {
    const [projectRes, logsRes] = await Promise.all([
      api.get(`projects/${projectId}`),
      api.get(`logs?projectId=${projectId}&limit=50`),
    ]);
    console.log(projectRes);

    if ((projectRes as any).success) {
      project = (projectRes as any).data;
    }
    if ((logsRes as any).success) {
      logs = (logsRes as any).data;
    }

    const statsMap = new Map();
    logs.forEach((log: any) => {
      const date = log.date.split("T")[0];
      const current = statsMap.get(date) || 0;
      statsMap.set(date, current + log.durationMinutes);
    });

    weeklyStats = Array.from(statsMap, ([date, totalMinutes]) => ({
      _id: date,
      totalMinutes,
    }))
      .sort((a, b) => a._id.localeCompare(b._id))
      .slice(-7);
  } catch (err) {
    error = "Failed to load project";
  }

  if (!project)
    return (
      <div className="p-12 text-center text-red-500">Project not found</div>
    );

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* --- Header Section --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-muted-foreground mb-2 text-sm">
            <Link
              href="/control-panel"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Dashboard
            </Link>
          </div>
          <h1 className="text-4xl font-bold tracking-tight flex items-center gap-3">
            {project.title}
            <Badge
              variant="outline"
              className="text-base px-3 py-1 border-gray-700"
              style={{ borderColor: project.color, color: project.color }}
            >
              Active
            </Badge>
          </h1>
          <p className="text-muted-foreground max-w-2xl text-lg">
            {project.description || "No mission briefing provided."}
          </p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline">Edit Project</Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="text-red-500">
                Archive Project
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-card/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Time Invested
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatDuration(project.stats?.totalMinutes || 0)}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Sessions Logged
            </CardTitle>
            <Hash className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {project.stats?.sessionCount || 0}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last Activity</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {logs.length > 0
                ? new Date(logs[0].date).toLocaleDateString()
                : "Never"}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* --- Tabs Section --- */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="history">Full History</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* TAB 1: OVERVIEW */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chart Area */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Project Velocity</CardTitle>
                <CardDescription>
                  Recent coding volume on this project
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-[300px] w-full p-4">
                  <ActivityChart data={weeklyStats} />
                </div>
              </CardContent>
            </Card>

            {/* Recent Logs (Mini) */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>Recent Sessions</CardTitle>
              </CardHeader>
              <CardContent className="p-0 px-2">
                <RecentActivityList logs={logs.slice(0, 5)} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* TAB 2: HISTORY */}
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Session Log</CardTitle>
              <CardDescription>
                A complete record of every minute spent.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RecentActivityList logs={logs} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 3: SETTINGS Placeholder */}
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Project Settings</CardTitle>
              <CardDescription>Update your mission parameters.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Settings form coming soon...
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
