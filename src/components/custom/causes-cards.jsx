import { SingleCard } from "@/components/custom/single-card";
import { cn } from "@/lib/utils";
import { CausesState, useCausesStore } from "@/stores/causes-store";
import { useSidebarStore } from "@/stores/sidebar-store";


const CausesCards = () => {
  const { isOpen } = useSidebarStore();
  const { cards } = useCausesStore();
  return (
    <div
      className={cn(
        "grid grid-cols-2 h-fit max-lg:grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-2 gap-5 mt-4",
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
