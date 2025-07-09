"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Icon } from "lucide-react"; // You can pass any icon here
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface DialogWithButtonProps {
  buttonText: string;
  dialogContent: React.ReactNode;
  icon: React.ComponentType<any>; // Icon component passed as prop
  searchParamsKey: string; // To handle dynamic step/connect logic
  defaultStep?: number; // Optional default step
  onStepChange?: (newStep: number) => void; // Optional callback for step change
  buttonVariant?: "default" | "secondary" | "ghost";
}

const DialogWithButton = ({
  buttonText,
  dialogContent,
  icon: IconComponent,
  searchParamsKey,
  defaultStep = 1,
  onStepChange,
  buttonVariant = "default",
}: DialogWithButtonProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Get the current step from search params or fallback to the default step
  const step = searchParams.get("step") === "2" ? 2 : defaultStep;

  // Function to update the search params and navigate
  const setStep = (newStep: number) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("step", newStep.toString());

    router.push(`${pathname}?${newSearchParams.toString()}`, {
      scroll: false,
    });
    onStepChange?.(newStep); // Optionally call the onStepChange callback
  };

  return (
    <Dialog
      open={!!searchParams.get(searchParamsKey)}
      onOpenChange={(open) => {
        if (!open) {
          router.push(pathname, { scroll: false });
        }
      }}
    >
      <DialogTrigger asChild>
        <Button
          size={"default"}
          variant={buttonVariant  || "default"}
          className=" text-start flex  justify-between  font-medium"
          onClick={() =>
            router.push(`${pathname}?${searchParamsKey}=true&step=${defaultStep}`, { scroll: false })
          }
        >
          {buttonText}
          <IconComponent
            size={32}
            className="!w-6 !h-6 "
          />
        </Button>
      </DialogTrigger>


    </Dialog>












  );
};

export { DialogWithButton };
