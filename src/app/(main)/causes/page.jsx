"use client";
import ActivityChart from "@/components/custom/activity-chart";
import { Alert } from "@/components/custom/alert-dialog";
import { CausesCards } from "@/components/custom/causes-cards";
import CausesCarousel from "@/components/custom/causes-carousel";
import { ChooseOrVote } from "@/components/ui/custom/choose-or-vote";
import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/stores/sidebar-store";
import { useEffect } from "react";
import { useCausesStore } from "@/stores/causes-store";
import { getData } from "@/components/const";

const CausesPage = () => {
  const { isOpen } = useSidebarStore();

  const {
    tabs,
    activeTab,
    setActiveTab,
    setCausesVideoCards,
    alertMessage, 
    setCards,
     setTabs, 
     setNews } = useCausesStore();


  let isBusy = false;

  const updateCausesVideoCards=async()=>{
     if(isBusy) { return; }
     isBusy = true;
     const result = await getData("/api/causes");
     // @ts-expect-error no such error 
    setCausesVideoCards(result.data.causes);
    // @ts-expect-error no such error
    setCards(result.data.cards)
    // @ts-expect-error no such error
    setTabs(result.data.tabs);  
    // @ts-expect-error no such error
    setNews(result.data.news); 
    isBusy = false;

  }

  useEffect(()=>{
    updateCausesVideoCards();
  }, [])


  return (
    <div className="mx-4 py-6 space-y-6">

      <div className="flex justify-between max-md:flex-col-reverse gap-4">
        <h1 className="text-3xl font-bold">Causes</h1>
        <Alert>{alertMessage}</Alert>
      </div>

      {/* Tabs Section */}
      <div className="grid grid-cols-[repeat(auto-fit,_minmax(200px,340px))] max-sm:grid-cols-1 mt-4 gap-4">
        {tabs.map((tab, key) => (
          <div
            key={key}
            className={cn(
              "flex gap-4 items-center bg-background px-4 py-4 rounded-xl cursor-pointer transition-all duration-300",
              key === activeTab &&
                "bg-custom-slate border-4 text-primary border-primary"
            )}
            onClick={() => setActiveTab(key)}
          >
            <img src={tab.icon} className="w-6 h-6" />
            <div className="flex flex-col items-start">
              <span className="text-xl">{tab.title}</span>
              <p className="text-custom-light_text text-right text-xs">{tab.number} active projects</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts & Stats */}
      <div
        className={cn(
          "grid grid-cols-2 gap-4",
          isOpen ? "max-xl:grid-cols-1" : "max-xl:grid-cols-1"
        )}
      >
        <ActivityChart  /> {/* Pass chart data as prop */}
        <div className="p-5 bg-background rounded-xl flex flex-col gap-4">
          <h2>Impact & News</h2>
          <div className="flex gap-2 max-lg:flex-col max-lg:gap-6 h-fit">
            <div className="w-6/12 max-lg:w-full">
              <CausesCards  />
              {/* Pass cards data as prop */}
            </div>
            <div className="w-6/12 my-auto flex items-end max-lg:w-full">
              <div className="flex max-w-full h-full relative mt-auto">
                <CausesCarousel  />{" "}
                {/* Pass carousel items as prop */}
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