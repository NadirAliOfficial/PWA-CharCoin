import { cn } from "@/lib/utils";
import { CauseSheet } from "./cause-sheet";
import { SingleVideo } from "./single-video";
import { Button } from "../button";
import { Sort } from "@mynaui/icons-react";
import { useEffect, useState } from "react";
import { useCausesStore } from "@/stores/causes-store";
import { getData } from "@/components/const";


const ChooseOrVote = () => {
  const [isAsc, setIsAsc] = useState(true);
  const { causesVideoCards } = useCausesStore();

  // var isBusy = false;

  // const updateCausesVideoCards=async()=>{
  //    if(isBusy) { return; }
  //    isBusy = true;
  //    const result = await getData("/api/causes");
  //    setCausesVideoCards(result.data.causes);

  //    const { globalDonation, projectsSupported, peopleImpacted, benefactors, allCauses, latestNews } = result.data;
  //    const statistics = {globalDonation, projectsSupported, peopleImpacted, benefactors, allCauses, latestNews};
  //    alert(JSON.stringify(statistics));
  //    setCards(result.data.cards)
  //    isBusy = false;
  // }

  // useEffect(()=>{
  //   updateCausesVideoCards();
  // }, [])

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between max-md:flex-col items-center gap-4">
        <div>
          <h2 className="text-xl font-semibold">Choose and vote</h2>
          <h3 className="text-custom-light_text">Only your tokens in staking are eligible to generate points for your selected cause.</h3>
        </div>
        <Button variant={"newly_secondary"} onClick={() => setIsAsc(prev => !prev)} className="ml-auto">
          Sort by votes: {isAsc ? "Ascending" : "Descending"} 
          <Sort className={`!w-6 !h-6 ${isAsc ? "rotate-180" : ""}`} />
        </Button>
     </div>

      <div className=" gap-6 grid grid-cols-[repeat(auto-fit,_minmax(350px,1fr))]  mt-4">
        {causesVideoCards && causesVideoCards.length>0 && causesVideoCards.map((item, key) => (
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
              ID: {item?.id}  
              <SingleVideo url={"https://res.cloudinary.com/dx2tjofpa/video/upload/v1739566194/Getting_diamonds_in_under_2_minutes_v6qzpo.mp4"} />
              <CauseSheet  cause={item} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export { ChooseOrVote };
