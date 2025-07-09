"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCausesStore } from "@/stores/causes-store";

const CustomDot = (props) => {
  const { cx, cy } = props;
  return (
    <circle
      cx={cx}
      cy={cy}
      r={4}
      fill="white"
      stroke="#2DD4BF"
      strokeWidth={2}
    />
  );
};

export default function StatisticsChart() {
  const {
    chartTabs,
    activeChartTab,
    chartData,
    setActiveChartTab,
  } = useCausesStore();

  const getDataKey = () => {
    switch (activeChartTab) {
      case "donations":
        return "donations";
      case "stakingValue":
        return "stakingValue";
      case "marketValue":
        return "marketValue";
      default:
        return "donations";
    }
  };

  const dataKey = getDataKey();

  return (
    <Card className="bg-background p-0 border-none">
      <div className="flex justify-between items-center mb-6 px-5 mt-4">
        <h2 className="text-zinc-100 text-sm font-medium">Statistics</h2>
        <div className="flex gap-2">
          {chartTabs.map((tab) => (
            <Button
              key={tab.id}
              variant="ghost"
              size="sm"
              className={`text-xs ${
                activeChartTab === tab.id
                  ? "text-teal-500 hover:text-teal-400"
                  : "text-zinc-400 hover:text-zinc-300"
              }`}
              onClick={() => setActiveChartTab(tab.id)}
            >
              {tab.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
          >
            <CartesianGrid stroke="#333" strokeDasharray="none" vertical={false} />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#666", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#666", fontSize: 12 }}
              tickFormatter={(value) => `${value / 1000}K`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#18181b",
                border: "1px solid #333",
                borderRadius: "6px",
              }}
              itemStyle={{ color: "#fff" }}
              labelStyle={{ color: "#666" }}
              formatter={(value) => [
                `${value.toLocaleString()}`,
                "Value",
              ]}
            />
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke="#2DD4BF"
              strokeWidth={2}
              dot={<CustomDot />}
              activeDot={{ r: 6, fill: "#2DD4BF" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}