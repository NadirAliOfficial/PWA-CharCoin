"use client";
import ActivityChart from "@/components/custom/activity-chart";
import NewsCarousel from "@/components/custom/carousel";
import UpcomingReminders from "@/components/custom/upcomming-remainder";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/stores/sidebar-store";
import useDashboardStore from "@/stores/dashboard-store";
import { useEffect } from 'react'
import { ArrowRight } from "lucide-react";

import { SingleCard } from "@/components/custom/single-card";
import { getData } from "@/components/const";
import { useRouter } from "next/navigation"



const Page = () => {
const router = useRouter();
const { setAllValues, 
        marketValue, 
        recentUp, 
        recentDonation, 
        tokenBalance,
        globalDonation, 
        causesSupported, 
        totalVolume, 
        totalTransactions } = useDashboardStore();
        
let isBusy = false;

const getNewsItems=async()=>{
     if(isBusy) return;
     isBusy = true;
    const result = await getData("/api/dashboard");
    if(result.statusCode != 200) 
    {
      router.push("/login");
    }
    // @ts-expect-error no such error
    setAllValues(result.data);
    isBusy = false;
};



useEffect(()=>{ 
  getNewsItems();
}, []);
 

  const { isOpen } = useSidebarStore();

  return (
    <div className="mx-4 max-md:px-0 py-6 space-y-6">
     
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
            <div className="text-3xl">${marketValue}</div>
            <p className="text-custom-light_text text-xs">
              CHAR Coin Market Value
            </p>
          </span>
          <hr className="min-w-[2px] h-full bg-custom-slate" />
          <span className="space-y-2">
            {" "}
            <div className="text-3xl flex justify-center items-center">
              {" "}
              <ArrowRight className="-rotate-45 text-primary" size={32} /> {recentUp}%
            </div>
            <p className="text-custom-light_text text-xs">
              Up in the last 24 hours
            </p>
          </span>
        </div>
        <div className="bg-background text-center gap-4   p-4 py-8 rounded-xl grid grid-cols-[1fr_,2px,_1fr] ">
          <span className="space-y-2 ">
            {" "}
            <div className="text-2xl">${recentDonation}</div>
            <p className="text-custom-light_text text-xs">
              CHAR Coin Latest Donation
            </p>
          </span>
          <hr className="min-w-[2px] h-full bg-custom-slate" />
          <span className="space-y-2">
            {" "}
            <div className="text-2xl "> ${globalDonation} </div>
            <p className="text-custom-light_text text-xs">
              CHAR Coin Global Donation
            </p>
          </span>
        </div>
        <div className="text-primary border-4 border-primary text-center gap-4  p-4 py-8 rounded-xl grid grid-cols-[1fr_,2px,_1fr] ">
          <span className="space-y-2 ">
            {" "}
            <div className="text-2xl">{Math.round(1000*tokenBalance)/1000}</div>
            <p className="text-sm">Your Tokens Balance</p>
          </span>
          <hr className="min-w-[2px] h-full bg-background" />
          <span className="space-y-2 text-center">
            {" "}
            <div className="text-2xl"> ${Math.round(1000*tokenBalance*marketValue)/1000} </div>
            <p className="text-sm">USD Value</p>
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

            <div
              className={cn(
                "grid grid-cols-2 h-fit max-sm:grid-cols-2 max-xs:grid-cols-2 gap-5 mt-4",
                isOpen ? "max-xl:grid-cols-3" : "max-lg:grid-cols-4"
              )}>

                
              <SingleCard card_no={0}  icon="/images/heart-circle.svg" title={"$"+globalDonation} description="Donated so far" />
              <SingleCard card_no={1}  icon="/images/home.svg" title={causesSupported+""} description="Causes supported" />
              <SingleCard card_no={2}  icon="/images/volume.svg" title={"$"+totalVolume} description="Total volume" />
              <SingleCard card_no={3}  icon="/images/transactions.svg" title={totalTransactions+""} description="Total transactions" />
            </div>
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
        <ActivityChart   />
      </div> 
    </div>
  );
};

export default Page;
