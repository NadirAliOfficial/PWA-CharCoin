import { cn } from "@/lib/utils";
import { CauseSheet } from "./cause-sheet";
import { SingleVideo } from "./single-video";
import { Button } from "../button";
import { Sort } from "@mynaui/icons-react";
import { useState } from "react";

const data = [
  {
    label: "Disaster & emergency aid",
    title: "Historical fire-sides in the Los Angeles, California region.",
    image: "/images/image-01.png",
    points: 21245,
  },
  {
    label: "MALNUTRITION & HUNGER",
    image: "/images/image-02.png",

    title:
      "100,000 nutrient-rich meals provided to support 10,000 families for 10 days in East Africa.",
    points: 18208,
  },
  {
    label: "Educational / Disaster & Emergency Aid",
    image: "/images/image-03.png",

    title:
      "Rebuilding a school and 50 homes after a hurricane in northern Peru.",
    points: 8147,
  },
  {
    label: "Disaster & emergency aid",
    title: "Historical fire-sides in the Los Angeles, California region.",
    image: "/images/image-01.png",
    points: 21245,
  },
  {
    label: "MALNUTRITION & HUNGER",
    image: "/images/image-02.png",

    title:
      "100,000 nutrient-rich meals provided to support 10,000 families for 10 days in East Africa.",
    points: 18208,
  },
  {
    label: "Educational / Disaster & Emergency Aid",
    image: "/images/image-03.png",

    title:
      "Rebuilding a school and 50 homes after a hurricane in northern Peru.",
    points: 8147,
  },
];

const ChooseOrVote = () => {
  const [isAsc, setIsAsc] = useState<boolean>(true);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center gap-4">
        <div>
          <h2 className="text-xl font-semibold">Choose and vote</h2>
          <h3 className="text-custom-light_text">Only your tokens in staking are eligible to generate points for your selected cause.</h3>
        </div>
        <Button variant={"newly_secondary"} onClick={() => setIsAsc(prev => !prev)}>
          Sort by votes: {isAsc ? "Ascending" : "Descending"} 
          <Sort className={`!w-6 !h-6 ${isAsc ? "rotate-180" : ""}`} />
        </Button>
     </div>

      <div className=" gap-6 grid grid-cols-[repeat(auto-fit,_minmax(350px,1fr))]  mt-4">
        {data.map((item, key) => (
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
              <SingleVideo />
              <CauseSheet />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export { ChooseOrVote };
