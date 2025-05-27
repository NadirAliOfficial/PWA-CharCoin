"use client";

import { useState } from "react";
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

const data = [
  { month: "Jan", value: 15000 },
  { month: "Feb", value: 20000 },
  { month: "Mar", value: 25000 },
  { month: "Apr", value: 30000 },
  { month: "May", value: 35000 },
  { month: "Jun", value: 32000 },
  { month: "Jul", value: 35000 },
  { month: "Aug", value: 45000 },
  { month: "Sep", value: 48000 },
  { month: "Oct", value: 65000 },
  { month: "Nov", value: 75000 },
  { month: "Dec", value: 90000 },
];

const CustomDot = (props: any) => {
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
  const [activeTab, setActiveTab] = useState("Donations");

  return (
    <Card className="bg-background p-0 border-none">
      <div className="flex justify-between items-center mb-6 px-5 mt-4">
        <h2 className="text-zinc-100 text-sm font-medium">Statistics</h2>
        <div className="flex gap-2">
          {["Donations", "Striking Value", "Market Value"].map((tab) => (
            <Button
              key={tab}
              variant="ghost"
              size="sm"
              className={`text-xs ${
                activeTab === tab
                  ? "text-teal-500 hover:text-teal-400"
                  : "text-zinc-400 hover:text-zinc-300"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </Button>
          ))}
        </div>
      </div>

      <div className="h-[300px]  w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
          >
            <CartesianGrid
              stroke="#333"
              strokeDasharray="none"
              vertical={false}
            />
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
              formatter={(value: number) => [
                `${value.toLocaleString()}`,
                "Value",
              ]}
            />
            <Line
              type="monotone"
              dataKey="value"
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
