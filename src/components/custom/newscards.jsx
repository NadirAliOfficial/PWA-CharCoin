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

const NewsCards = () => {
  const { isOpen } = useSidebarStore();
  return (
    <div
      className={cn(
        "grid grid-cols-2 h-fit max-sm:grid-cols-2 max-xs:grid-cols-2 gap-5 mt-4",
        isOpen ? "max-xl:grid-cols-3" : "max-lg:grid-cols-4"
      )}
    >
      {cards?.map((card, index) => {
        return <SingleCard key={index} card_no={index + 1} {...card} />;
      })}
    </div>
  );
};

export { NewsCards };
