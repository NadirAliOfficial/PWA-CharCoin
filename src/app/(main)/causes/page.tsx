"use client";
import ActivityChart from "@/components/custom/activity-chart";
import { Alert } from "@/components/custom/alert-dialog";
import { CausesCards } from "@/components/custom/causes-cards";
import CausesCarousel from "@/components/custom/causes-carousel";
import { ChooseOrVote } from "@/components/ui/custom/choose-or-vote";
import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/stores/sidebar-store";
import { SquareDashedBottomCodeIcon } from "lucide-react";
import { useState } from "react";

const tabs = [
  {
    icon: SquareDashedBottomCodeIcon,
    title: "All Causes",
    description: "24 active project",
  },
  {
    icon: SquareDashedBottomCodeIcon,
    title: "All Causes",
    description: "24 active project",
  },
  {
    icon: SquareDashedBottomCodeIcon,
    title: "All Causes",
    description: "24 active project",
  },
];

const CausesPage = () => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const { isOpen } = useSidebarStore();
  return (
    <div className="mx-4 py-6 space-y-6">
      <div className=" flex justify-between gap-4">
        <h1 className="text-3xl font-bold ">Causes</h1>
        <Alert>
          You can vote once per month, contributing <b>2,345 points</b>
          (one per token in staking) to your chosen cause.{" "}
          <b>Learn more about the voting process.</b>
        </Alert>
      </div>
      <div className=" gap-4 grid grid-cols-[repeat(auto-fit,_minmax(200px,240px))] mt-4">
        {tabs?.map((tab, key) => (
          <div
            key={key}
            className={cn(
              "flex gap-4 items-center bg-background px-4 py-4 rounded-xl ",
              key == activeTab &&
                "bg-custom-slate border-4 text-primary border-primary"
            )}
            onClick={() => setActiveTab(key)}
          >
            <tab.icon />

            <div className="flex  flex-col items-center">
              <span className="text-xl">{tab.title}</span>
              <p className="text-custom-light_text text-xs">
                {tab.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div
        className={cn(
          "grid grid-cols-2 gap-4",
          isOpen ? "max-xl:grid-cols-1" : "max-xl:grid-cols-1"
        )}
      >
        <ActivityChart />
        <div className="p-5  bg-background  rounded-xl flex flex-col gap-4">
          <h2>Personal Stats</h2>
          <div className="flex gap-2 max-lg:flex-col max-lg:gap-6 h-fit ">
            <div className="w-6/12  max-lg:w-full">
              <CausesCards />
            </div>
            <div className="w-6/12 my-auto flex items-end max-lg:w-full">
              <div className="flex max-w-full h-full  relative mt-auto">
                <CausesCarousel />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ChooseOrVote />
    </div>
  );
};
export default CausesPage;
