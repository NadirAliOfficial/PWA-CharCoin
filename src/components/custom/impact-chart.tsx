"use client";

import { Line, LineChart, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import useImpactStore  from "@/stores/my-impact-store";

function ImpactChart() {

  const { impactChartData } = useImpactStore();



  return (
    <div className="w-4/6 max-md:w-full h-auto">
      <ChartContainer
        config={{
          line1: { label: "Line 1", color: "rgb(45, 212, 191)" },
          line2: { label: "Line 2", color: "rgb(168, 85, 247)" },
          line3: { label: "Line 3", color: "rgb(236, 72, 153)" },
        }}
      >
        <LineChart
          data={impactChartData}
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
            dot={{ r: 4, fill: "rgb(45, 212, 191)", stroke: "rgb(45, 212, 191)", strokeWidth: 2 }}
            activeDot={{ r: 6, fill: "rgb(45, 212, 191)", stroke: "#fff", strokeWidth: 2 }}
          />
          <Line
            type="monotone"
            dataKey="line2"
            stroke="rgb(168, 85, 247)"
            strokeWidth={2}
            dot={{ r: 4, fill: "rgb(168, 85, 247)", stroke: "rgb(168, 85, 247)", strokeWidth: 2 }}
            activeDot={{ r: 6, fill: "rgb(168, 85, 247)", stroke: "#fff", strokeWidth: 2 }}
          />
          <Line
            type="monotone"
            dataKey="line3"
            stroke="rgb(236, 72, 153)"
            strokeWidth={2}
            dot={{ r: 4, fill: "rgb(236, 72, 153)", stroke: "rgb(236, 72, 153)", strokeWidth: 2 }}
            activeDot={{ r: 6, fill: "rgb(236, 72, 153)", stroke: "#fff", strokeWidth: 2 }}
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
}

export { ImpactChart };
