"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ChartData {
  _id: string;
  totalMinutes: number;
}

export function ActivityChart({ data }: { data: ChartData[] }) {
  const chartData = data.map((item) => ({
    date: new Date(item._id).toLocaleDateString("en-US", { weekday: "short" }),
    minutes: item.totalMinutes,
  }));

  if (data.length === 0) {
    return (
      <div className="h-full flex items-center justify-center text-muted-foreground opacity-50 text-sm">
        No data for the chart yet. Log some work!
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={chartData}>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="#374151"
          vertical={false}
        />
        <XAxis
          dataKey="date"
          stroke="#9CA3AF"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#9CA3AF"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}m`}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "#1F2937",
            border: "none",
            borderRadius: "8px",
            color: "#fff",
          }}
          cursor={{ fill: "#374151", opacity: 0.4 }}
        />
        <Bar
          dataKey="minutes"
          fill="#3B82F6"
          radius={[4, 4, 0, 0]}
          barSize={40}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
