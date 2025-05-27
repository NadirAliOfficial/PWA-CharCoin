"use client";
import ActivityChart from "@/components/custom/activity-chart";
import NewsCarousel from "@/components/custom/carousel";
import { NewsCards } from "@/components/custom/newscards";
import UpcomingReminders from "@/components/custom/upcomming-remainder";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/stores/sidebar-store";
import { ArrowRight } from "lucide-react";

const DashboardPage = () => {
  const { isOpen } = useSidebarStore();
  return (
    <div className="mx-4 py-6 space-y-6">
      <div className=" flex justify-between">
        <h1 className="text-3xl font-bold ">Dashboard</h1>
        <Button>
          View Exchanges <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,_minmax(320px,+1fr))] gap-8">
        <div className="bg-background text-center gap-4  p-4 py-8 rounded-xl grid grid-cols-[1fr_,2px,_1fr] ">
          <span className="space-y-2">
            {" "}
            <div className="text-3xl">0.0006587</div>
            <p className="text-custom-light_text text-xs">
              CHAR Coin Market Value
            </p>
          </span>
          <hr className="min-w-[2px] h-full bg-custom-slate" />
          <span className="space-y-2">
            {" "}
            <div className="text-3xl flex justify-center items-center">
              {" "}
              <ArrowRight className="-rotate-45 text-primary" size={32} /> 12%
            </div>
            <p className="text-custom-light_text text-xs">
              Up in the last 24 hours
            </p>
          </span>
        </div>
        <div className="bg-background text-center gap-4   p-4 py-8 rounded-xl grid grid-cols-[1fr_,2px,_1fr] ">
          <span className="space-y-2 ">
            {" "}
            <div className="text-2xl">$1,420.00</div>
            <p className="text-custom-light_text text-xs">
              CHAR Coin Latest Donation
            </p>
          </span>
          <hr className="min-w-[2px] h-full bg-custom-slate" />
          <span className="space-y-2">
            {" "}
            <div className="text-2xl "> $260,000.00 </div>
            <p className="text-custom-light_text text-xs">
              CHAR Coin Global Donation
            </p>
          </span>
        </div>
        <div className="text-primary border-4 border-primary text-center gap-4  p-4 py-8 rounded-xl grid grid-cols-[1fr_,2px,_1fr] ">
          <span className="space-y-2 ">
            {" "}
            <div className="text-2xl">215,580,780</div>
            <p className="text-custom-light_text text-xs">
              Your Tokens Balance
            </p>
          </span>
          <hr className="min-w-[2px] h-full bg-background" />
          <span className="space-y-2 text-center">
            {" "}
            <div className="text-2xl"> $142,003.06 </div>
            <p className="text-custom-light_text text-xs">Your USD Balance</p>
          </span>
        </div>
      </div>
      <div
        className={cn(
          "grid grid-cols-[2fr,1fr]   gap-4",
          isOpen ? "max-xl:grid-cols-1" : "max-lg:grid-cols-1"
        )}
      >
        <NewsCarousel />
        <div className="ml-4">
          <div className="flex gap-4 flex-col">
            <h2>Personal Stats</h2>
            <NewsCards />
          </div>
        </div>
      </div>
      <div
        className={cn(
          "grid grid-cols-2 gap-4",
          isOpen ? "max-xl:grid-cols-1" : "max-lg:grid-cols-1"
        )}
      >
        <UpcomingReminders />
        <ActivityChart />
      </div>
    </div>
  );
};

export default DashboardPage;
