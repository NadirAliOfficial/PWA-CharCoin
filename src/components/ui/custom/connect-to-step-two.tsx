"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2Icon, Clock6 } from "lucide-react";
import { Input } from "../input";

const StepTwo = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className="flex flex-col gap-4">
      <span className="text-xs text-slate">CONFIRM TO CONTINUE</span>
      <h1 className="text-2xl">Welcome to Char Coin! ❤</h1>

      <div className="flex gap-6 py-2">
        <span className="block min-w-2 h-full rounded-xl bg-gray-500" />
        <div className="flex gap-4 flex-col">
          <p>
            You’re now part of a decentralized movement dedicated to impact and
            innovation. Explore, contribute, and make a difference—all while
            staying fully anonymous and secure. Let’s shape the future
            together! 
          </p>

          <h2 className="text-primary">Choose a unique permanent username</h2>

          <div className="relative flex items-center">
            <Input className="bg-gray-500 border-none hover:ring-2 focus:ring-2 ring-primary  focus:!ring-primary !ring-offset-0" />
            <CheckCircle2Icon className="w-5 h-5 absolute right-3 text-primary" />
            <Clock6 className="w-5 h-5 absolute right-10 text-red-600 rotate-45" />
          </div>

          <hr className="bg-slate" />
          <Button className="w-fit ml-auto relative" onClick={onClick}>
            Finish <ArrowRight />
          </Button>
        </div>
      </div>
    </div>
  );
};

export { StepTwo };
