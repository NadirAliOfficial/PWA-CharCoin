import { Sort } from "@mynaui/icons-react";
import { Button } from "../ui/button";
import { CaseFilterDropdown } from "./filter-cases";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { SingleVideo } from "../ui/custom/single-video";
import useMyImpactStore from "@/stores/my-impact-store";


const ImpactProgressTrack = () => {
  
  const {  myMonthImpactSummary } = useMyImpactStore();

  const [isAsc, setIsAsc] = useState(true);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between  w-full max-md:flex-col  items-center gap-4">
        <div>
          <h2 className="text-xl font-semibold">Discover your impact</h2>
          <h3 className="text-custom-light_text">
            Track the progress of the projects you’ve supported
          </h3>
        </div>
        <div className="flex gap-4  max-sm:flex-col ">
          <CaseFilterDropdown />
          <Button
            variant={"newly_secondary"}
            onClick={() => setIsAsc((prev) => !prev)}
          >
            Sort by date: {isAsc ? "Ascending" : "Descending"}
            <Sort className={`!w-6 !h-6 ${isAsc ? "rotate-180" : ""}`} />
          </Button>
        </div>
      </div>
      <div className=" gap-6 grid grid-cols-[repeat(auto-fit,_minmax(350px,1fr))]  mt-4">
        {myMonthImpactSummary && myMonthImpactSummary.map((item, key) => (
          <div
            key={key}
            className={cn(
              "flex flex-col gap-4 justify-end bg-background p-4 py-4 aspect-[4/3] rounded-xl bg-cover bg-no-repeat"
            )}
            style={{
              backgroundImage: `url(${item.image})`,
            }}
          >
            <div className="text-custom-light_text text-sm">{item.label}</div>
            <div className="flex flex-col ">
              <span className="text-xl">{item.title}</span>
              <p className="text-custom-light_text text-start  text-xs">
                {item.points} points
              </p>
            </div>

            <div className="flex gap-1">
              <SingleVideo url={item.videoUrl} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export { ImpactProgressTrack };
