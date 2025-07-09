"use client";

import { ImpactChart } from "@/components/custom/impact-chart";
import { ImpactProgressTrack } from "@/components/custom/impact-progress-track";
import useMyImpactStore from "@/stores/my-impact-store";
import useDashboardStore from "@/stores/dashboard-store";
import { useEffect } from "react";
import { getData } from "@/components/const";

const MyImpactPage = () => {

  const { impactSummaries, setAllValues } = useMyImpactStore();
  const { donatedSoFar, causesSupported, projectsSupported } = useDashboardStore();

  let isBusy = false;
  const updateState=async()=>{
      if(isBusy) return;
      isBusy = true;
      const result = await getData("/api/my-impact");
      // @ts-expect-error no such issue. 
      setAllValues(result.data);
       isBusy = false;
  }    

  useEffect(()=>{ updateState();  }, [])

  return (
    <div className="py-6 px-3 space-y-6">
      <div className="flex justify-between gap-4">
        <h1 className="text-3xl font-bold">Impact</h1>
      </div>
      <div className="grid grid-cols-[300px,_1fr] max-md:grid-cols-1 gap-4">
        <div className="flex flex-col gap-4">
          <h2>Personal Stats</h2>
            <div className="flex flex-col gap-4">

              <div className="flex bg-background p-5 py-8 rounded-xl gap-4 items-center">
                <img src="/images/heart-white.svg" />
                <div className="flex flex-col">
                  <h1 className="text-2xl text-blue-200 font-semibold">
                    ${donatedSoFar}
                  </h1>
                  <p className="text-blue-200">Donated so far</p>
                </div>
              </div>

              <div className="flex bg-background p-5 py-8 rounded-xl gap-4 items-center">
                <img src="/images/home-white.svg" />
                <div className="flex flex-col">
                  <h1 className="text-2xl font-semibold">
                    {causesSupported}
                  </h1>
                  <p>Causes supported</p>
                </div>
              </div>

              <div className="flex bg-background p-5 py-8 rounded-xl gap-4 items-center">
                <img src="/images/projects.svg" />
                <div className="flex flex-col">
                  <h1 className="text-2xl font-semibold">
                    {projectsSupported}
                  </h1>
                  <p>Projects supported</p>
                </div>
              </div>
          </div>
        </div>





        <div className="bg-background p-5 rounded-xl flex flex-col gap-4">
          <h2 className="flex gap-4 text-sm text-custom-light_text items-center">
            <p className="text-xl font-bold text-foreground">Statistics</p>
            <span className="min-w-[1px] rounded-xl bg-custom-light_text !h-full block" />
            Your donation history
          </h2>
          <div className="flex gap-4 max-md:flex-col">
            <div className="flex flex-col gap-8 mt-8">
              {impactSummaries &&  impactSummaries?.map((item, index) => (
                <div key={index} className="flex h-full gap-4">
                  <div
                    className="min-w-1 rounded-xl h-full"
                    style={{ background: item.color }}
                  />
                  <div className="flex flex-col">
                    <h1
                      className="text-xl font-semibold"
                      style={{ color: item.color }}
                    >
                      {item.label}
                    </h1>
                    <p className="text-sm text-custom-light_text">
                      This month: ${item.thisMonthAmount.toLocaleString()} / All time: ${item.allTimeAmount.toLocaleString()} / {item.projectCount} Projects
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <ImpactChart />
          </div>
        </div>
      </div>
      <hr className="bg-custom-light_text" />
      <ImpactProgressTrack />
    </div>
  );
};

export default MyImpactPage;
