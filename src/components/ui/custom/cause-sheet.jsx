import { Alert } from "@/components/custom/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Like } from "@mynaui/icons-react";
import { useEffect, useState } from "react";
import { getData } from "@/components/const";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

const CauseSheet = ({cause}) => {

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
        <img
          src={cause?.image}
          alt="board"
          width={500}
          height={300}
          className="w-full "
        />
        <div className="p-6 flex flex-col gap-4">
          <p className="uppercase text-xs">{cause?.label}</p>
          <h1 className="text-2xl font-semibold ">
            {cause?.title}
          </h1>
          <span className="flex gap-2 text-xs font-semibold">
            Organization: <p className="text-primary">{cause?.organization}</p> - {cause?.points} Points
          </span>
          <Alert closeHide>
            You can vote once per month, contributing <b>{cause?.points} points</b>
            (one per token in staking) to your chosen cause.{" "}
            <b>Learn more about the voting process.</b>
          </Alert>
          <div className="flex gap-4">
            <div className="flex min-w-3 bg-custom-slate rounded-full" />
            <div className="py-4 flex flex-col gap-8">
              <p>{cause?.detail}</p>
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
