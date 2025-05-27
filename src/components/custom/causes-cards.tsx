import { SingleCard } from "@/components/custom/single-card";
import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/stores/sidebar-store";
import {
  ArrowDiagonalTwo,
  ChartGraph,
  HeartCircle,
  Home,
} from "@mynaui/icons-react";

const cards = [
  {
    icon: HeartCircle,
    title: "$1,420",
    description: "Donated so far",
  },
  {
    icon: Home,
    title: "4",
    description: "Causes supported",
  },
  {
    icon: ChartGraph,
    title: "$142K",
    description: "Total volume",
  },
  {
    icon: ArrowDiagonalTwo,
    title: "181",
    description: "Total transactions",
  },
];

const CausesCards = () => {
  const { isOpen } = useSidebarStore();
  return (
    <div
      className={cn(
        "grid grid-cols-2 h-fit max-lg:grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-1 gap-5 mt-4",
        isOpen ? "max-xl:grid-cols-3" : "max-xl:grid-cols-3"
      )}
    >
      {cards?.map((card, index) => {
        return <SingleCard key={index} card_no={index + 1} {...card} />;
      })}
    </div>
  );
};

export { CausesCards };
