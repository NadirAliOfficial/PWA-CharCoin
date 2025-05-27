"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Gitlab } from "lucide-react";
import { useState } from "react";
import { StepOne } from "./connect-to-step-one";
import { StepTwo } from "./connect-to-step-two";

const ConnectTo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<number>(1);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          size={"main_btn"}
          className="mx-4 text-start flex h-auto justify-between px-6 text-lg"
        >
          Connect your wallet
          <Gitlab
            size={32}
            className="!w-6 !h-6 text-background !fill-background"
          />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-3xl border-none px-10">
        {step == 1 ? (
          <StepOne onClick={() => setStep(2)} />
        ) : (
          <StepTwo onClick={() => setStep(1)} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export { ConnectTo };
