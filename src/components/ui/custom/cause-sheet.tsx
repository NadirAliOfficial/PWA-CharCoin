import { Alert } from "@/components/custom/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Like } from "@mynaui/icons-react";
import Image from "next/image";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

const CauseSheet = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="h-auto">
          Vote <Like className="!w-6 !h-6" />
        </Button>
      </SheetTrigger>
      <SheetContent className="[&>button]:left-4 [&>button]:bg-background [&>button]:w-8 [&>button]:h-8 [&>button]:flex [&>button]:justify-center [&>button]:items-center !max-w-3xl overflow-auto p-0 !w-full ">
        <VisuallyHidden>
          <SheetTitle> Vote for your cause</SheetTitle>
        </VisuallyHidden>
        <Image
          src={"/board.svg"}
          alt="board"
          width={500}
          height={300}
          className="w-full "
        />
        <div className="p-6 flex flex-col gap-4">
          <p className="uppercase text-xs">MALNUTRITION & HUNGER</p>
          <h1 className="text-2xl font-semibold ">
            100,000 nutrient-rich meals provided to support 10,000 families for
            10 days in East Africa.
          </h1>
          <span className="flex gap-2 text-xs font-semibold">
            Organization: <p className="text-primary">UNICEF</p> - 18,208 Points
          </span>
          <Alert closeHide>
            You can vote once per month, contributing <b>2,345 points</b>
            (one per token in staking) to your chosen cause.{" "}
            <b>Learn more about the voting process.</b>
          </Alert>
          <div className="flex gap-4">
            <div className="flex min-w-3 bg-custom-slate rounded-full" />
            <div className="py-4 flex flex-col gap-8">
              <p>
                By casting your vote, you contribute points equivalent to the
                number of tokens you have in staking. While your vote increases
                a cause’s chances of receiving a higher donation, it does not
                guarantee it will win.
              </p>
              <p>
                All causes for the month will receive a donation, but the amount
                will vary based on their final ranking when voting closes. The
                higher a cause ranks, the larger the donation it will receive.
              </p>
              <p>
                The community’s collective votes determine the final
                distribution of funds. Once you vote, you cannot change or vote
                for another cause within the same month. You’ll need to wait for
                the next voting cycle to participate again.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button>
              Vote up <Like />
            </Button>
            <p className="text-xs text-custom-light_text">
              This cause/project will earn 2,345 points
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export { CauseSheet };
