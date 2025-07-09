"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Gitlab } from "lucide-react";

const ConnectTo = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const step = searchParams.get("step") === "2" ? 2 : 1;

  const setStep = (newStep: number) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("step", newStep.toString());

    router.push(`${pathname}?${newSearchParams.toString()}`, {
      scroll: false,
    });
  };


  return (
    <Dialog
      open={!!searchParams.get("connect")}
      onOpenChange={(open) => {
        if (!open) {
          router.push(pathname, { scroll: false });
        }
      }}
    >
      <DialogTrigger asChild>
        <Button
          size={"default"}
          className="mx-4 text-start flex h-auto justify-between px-6 text-lg"
          onClick={() =>
            router.push(`${pathname}?connect=true&step=1`, { scroll: false })
          }
        >
          Connect your wallet
          <Gitlab
            size={32}
            className="!w-6 !h-6 text-background !fill-background"
          />
        </Button>
      </DialogTrigger>

      {/* <DialogContent className="sm:max-w-3xl  max-md:px-4  h-auto max-h-[100vh] overflow-auto  border-none px-10">
        {step === 1 ? (
          <StepOne onClick={() => setStep(2)} />
        ) : (
          <StepTwo onClick={() => router.push("/dashboard")} />
        )}
      </DialogContent> */}
    </Dialog>
  );
};

export { ConnectTo };
