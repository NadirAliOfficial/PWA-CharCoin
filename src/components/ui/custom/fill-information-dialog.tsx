"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

interface FillInformationProps {
  setIsOpen: (value: boolean) => void;
  selectedWallet: string;
}

const FillInformation = ({
  setIsOpen,
  selectedWallet,
}: FillInformationProps) => {
  const [isOpen, setIsOpenLocal] = useState(false);

  return (
    <>
      <Button
        className="w-fit ml-auto relative"
        onClick={() => {
          setIsOpen(false);
          setIsOpenLocal(true);
        }}
      >
        Continue with {selectedWallet} <ArrowRight />
      </Button>

      <Dialog
        open={isOpen}
        onOpenChange={(value) => {
          setIsOpen(false);
          setIsOpenLocal(value);
        }}
      >
        <DialogContent className="sm:max-w-3xl border-none px-10">
          <div className="flex flex-col gap-4">
            <span className="text-xs text-slate">CONFIRM TO CONTINUE</span>
            <h1 className="text-2xl">Confirm Your Wallet Selection</h1>
            <p className="text-gray-600">
              You have selected {selectedWallet}. Please proceed to sign up or
              log in.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export { FillInformation };
