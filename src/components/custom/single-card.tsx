import { cn } from "@/lib/utils";
import { Icon, LucideLayoutDashboard } from "lucide-react";

const cardColors = {
  1: "bg-custom-card-01",
  2: "bg-custom-card-02",
  3: "bg-custom-card-03",
  4: "bg-custom-card-04",
};

const SingleCard = ({
  icon: Icon,
  title,
  description,
  card_no,
}: {
  icon: typeof Icon;
  title: string;
  description: string;
  card_no: number;
}) => {
  return (
    <div
      className={cn(
        "  aspect-square rounded-xl text-black bg-[red] flex justify-center items-center flex-col gap-4  ",
        cardColors[card_no] || "bg-gray-200"
      )}
    >
      <Icon className={"w-8 h-8"} />
      <div className="flex flex-col gap-1 text-center">
        <div className="text-2xl font-bold "> {title} </div>
        <p className="text-xs">{description}</p>
      </div>
    </div>
  );
};

export { SingleCard };
