"use client";

import {
    RadarChart,
    Radar,
    PolarGrid,
    PolarAngleAxis,
    ResponsiveContainer,
    Tooltip,
} from "recharts";

interface CategoryData {
    category: string;
    minutes: number;
}

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        const { category, minutes } = payload[0].payload;
        return (
            <div className="rounded-md border border-border bg-card px-3 py-2 text-xs shadow-md">
                <p className="font-medium text-foreground">{category}</p>
                <p className="text-muted-foreground">
                    {minutes >= 60
                        ? `${(minutes / 60).toFixed(1)}h`
                        : `${minutes}m`}
                </p>
            </div>
        );
    }
    return null;
};

export function CategoryRadarChart({ data }: { data: CategoryData[] }) {
    const hasData = data.some((d) => d.minutes > 0);

    if (!hasData) {
        return (
            <div className="h-full flex items-center justify-center text-xs text-muted-foreground">
                No category data yet. Log some work!
            </div>
        );
    }

    return (
        <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={data} cx="50%" cy="50%" outerRadius="70%">
                <PolarGrid
                    stroke="var(--border)"
                    strokeOpacity={0.6}
                    radialLines={false}
                />
                <PolarAngleAxis
                    dataKey="category"
                    tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
                    tickLine={false}
                />
                <Radar
                    dataKey="minutes"
                    stroke="var(--primary)"
                    fill="var(--primary)"
                    fillOpacity={0.15}
                    strokeWidth={1.5}
                    dot={{ r: 3, fill: "var(--primary)", strokeWidth: 0 }}
                />
                <Tooltip content={<CustomTooltip />} cursor={false} />
            </RadarChart>
        </ResponsiveContainer>
    );
}
