"use client";

import { Line, LineChart, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";

const data = [
  { month: "Dec", line1: 0, line2: 0, line3: 0 },
  { month: "Jan", line1: 10, line2: 12, line3: 10 },
  { month: "Feb", line1: 20, line2: 18, line3: 15 },
  { month: "Mar", line1: 30, line2: 28, line3: 25 },
  { month: "Apr", line1: 28, line2: 30, line3: 20 },
  { month: "May", line1: 40, line2: 32, line3: 28 },
  { month: "Jun", line1: 42, line2: 35, line3: 32 },
  { month: "Jul", line1: 45, line2: 40, line3: 35 },
  { month: "Aug", line1: 50, line2: 42, line3: 38 },
  { month: "Sep", line1: 48, line2: 45, line3: 40 },
  { month: "Oct", line1: 70, line2: 60, line3: 42 },
  { month: "Nov", line1: 72, line2: 61, line3: 40 },
  { month: "Dec", line1: 90, line2: 55, line3: 48 },
];

function ImpactChart() {
  return (
    <div className="w-4/6 h-auto  ">
      <ChartContainer
        config={{
          line1: {
            label: "Line 1",
            color: "rgb(45, 212, 191)",
          },
          line2: {
            label: "Line 2",
            color: "rgb(168, 85, 247)",
          },
          line3: {
            label: "Line 3",
            color: "rgb(236, 72, 153)",
          },
        }}
      >
        <LineChart
          data={data}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          className="h-[300px] [&_.recharts-cartesian-grid-horizontal_line]:stroke-muted [&_.recharts-cartesian-grid-vertical_line]:stroke-muted"
        >
          <XAxis
            dataKey="month"
            stroke="hsl(var(--muted-foreground))"
            tick={{ fill: "hsl(var(--muted-foreground))" }}
          />
          <YAxis
            stroke="hsl(var(--muted-foreground))"
            tick={{ fill: "hsl(var(--muted-foreground))" }}
            tickFormatter={(value) => `${value}K`}
          />
          <ChartTooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-lg border bg-black p-2 shadow-sm">
                    <div className="grid grid-cols-2 gap-2">
                      {payload.map((p) => (
                        <div key={p.name} className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">
                            {p.name}
                          </span>
                          <span className="font-bold text-muted-foreground">
                            {p.value}K
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />
          <Line
            type="monotone"
            dataKey="line1"
            stroke="rgb(45, 212, 191)"
            strokeWidth={2}
            dot={{
              r: 4,
              fill: "rgb(45, 212, 191)",
              stroke: "rgb(45, 212, 191)",
              strokeWidth: 2,
            }}
            activeDot={{
              r: 6,
              fill: "rgb(45, 212, 191)",
              stroke: "#fff",
              strokeWidth: 2,
            }}
          />
          <Line
            type="monotone"
            dataKey="line2"
            stroke="rgb(168, 85, 247)"
            strokeWidth={2}
            dot={{
              r: 4,
              fill: "rgb(168, 85, 247)",
              stroke: "rgb(168, 85, 247)",
              strokeWidth: 2,
            }}
            activeDot={{
              r: 6,
              fill: "rgb(168, 85, 247)",
              stroke: "#fff",
              strokeWidth: 2,
            }}
          />
          <Line
            type="monotone"
            dataKey="line3"
            stroke="rgb(236, 72, 153)"
            strokeWidth={2}
            dot={{
              r: 4,
              fill: "rgb(236, 72, 153)",
              stroke: "rgb(236, 72, 153)",
              strokeWidth: 2,
            }}
            activeDot={{
              r: 6,
              fill: "rgb(236, 72, 153)",
              stroke: "#fff",
              strokeWidth: 2,
            }}
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
}

export { ImpactChart };
