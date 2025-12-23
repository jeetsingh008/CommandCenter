import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Log {
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

export function RecentActivityList({ logs }: { logs: Log[] }) {
  if (logs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[300px] text-muted-foreground opacity-50">
        <p>No activity recorded yet.</p>
        <p className="text-xs">Start by logging your first session.</p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[300px] pr-4">
      <div className="space-y-4">
        {logs.map((log) => (
          <div key={log._id} className="flex items-center justify-between p-4 border rounded-lg bg-card/50 hover:bg-card transition-colors">
            <div className="flex items-center gap-4">
              <Avatar className="h-9 w-9">
                <AvatarFallback className="bg-primary/10 text-primary text-xs">
                  {log.category.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none text-white">
                  {log.title}
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  {log.project && (
                    <span className="flex items-center gap-1">
                      <span 
                        className="w-1.5 h-1.5 rounded-full" 
                        style={{ backgroundColor: log.project.color }}
                      />
                      {log.project.title}
                    </span>
                  )}
                  <span>•</span>
                  <span>{new Date(log.date).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <div className="text-sm font-bold text-white bg-secondary px-2 py-1 rounded">
              {log.durationMinutes}m
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}