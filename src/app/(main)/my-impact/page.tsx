"use client";
import { CaseFilterDropdown } from "@/components/custom/filter-cases";
import { ImpactChart } from "@/components/custom/impact-chart";
import { ImpactProgressTrack } from "@/components/custom/impact-progress-track";
import { Button } from "@/components/ui/button";
import { Filter, HeartCircle, Sort } from "@mynaui/icons-react";
import { useState } from "react";

const data = [
  {
    label: "All causes summary",
    description: "This month: $371.23  /  All time: $4,600.10  /  4 Projects",
    color: "#37FFE8",
  },
  {
    label: "All causes summary",
    description: "This month: $371.23  /  All time: $4,600.10  /  4 Projects",
    color: "#7337FF",
  },
  {
    label: "All causes summary",
    description: "This month: $371.23  /  All time: $4,600.10  /  4 Projects",
    color: "#FF37B6",
  },
];

const MyImpactPage = () => {
  const [isAsc, setIsAsc] = useState<boolean>(true);
  return (
    <div className="mx-4 py-6 space-y-6">
      <div className=" flex justify-between gap-4">
        <h1 className="text-3xl font-bold ">Impact</h1>
      </div>
      <div className="grid grid-cols-[300px,_1fr] gap-4">
        <div className="flex flex-col gap-4">
          <h2>Personal Stats</h2>
          <div className="flex flex-col gap-4">
            {[...Array(3)]?.map((_, i) => {
              return (
                <div
                  key={i}
                  className="flex bg-background p-5 py-8 rounded-xl gap-4 items-center"
                >
                  <HeartCircle size={54} className="text-xl stroke-[1px]" />
                  <div className="flex flex-col ">
                    <h1 className="text-2xl font-semibold">$4,600.10</h1>
                    <p>Donated so far</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="bg-background p-5 rounded-xl flex flex-col gap-4">
          <h2 className="flex gap-4 text-sm text-custom-light_text items-center ">
            <p className="text-xl font-bold text-foreground ">Statistics</p>
            <span className="min-w-[1px] rounded-xl bg-custom-light_text  !h-full block" />
            Your donation history
          </h2>
          <div className="flex gap-4">
            <div className="flex flex-col gap-8 mt-8">
              {data?.map((item) => (
                <div key={item.label} className=" flex h-full gap-4 ">
                  <div
                    className={`min-w-1 rounded-xl h-full  `}
                    style={{
                      background: item?.color,
                    }}
                  />
                  <div className="flex flex-col ">
                    <h1
                      className={`text-xl  font-semibold bg-[${item?.color}]`}
                      style={{ color: item?.color }}
                    >
                      {item.label}
                    </h1>
                    <p className="text-sm text-custom-light_text">
                      {item.description}
                    </p>
                  </div>
                  <hr className="bg-custom-light_text" />
                </div>
              ))}
            </div>
            <ImpactChart />
          </div>
        </div>
      </div>
      <hr className="bg-custom-light_text " />
      <ImpactProgressTrack />
    </div>
  );
};
export default MyImpactPage;
