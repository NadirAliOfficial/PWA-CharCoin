"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { InfoIcon, HelpCircle, AlertCircle } from "lucide-react";

export default function TooltipDemo() {
  return (
    <div className="p-12 bg-zinc-950 flex flex-col items-center justify-center space-y-6">
      {/* Basic Tooltip */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              className="border-zinc-700 hover:bg-zinc-800"
            >
              Hover me
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>This is a basic tooltip</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* Info Icon Tooltip */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <InfoIcon className="w-5 h-5 text-zinc-400 hover:text-zinc-300 cursor-help" />
          </TooltipTrigger>
          <TooltipContent>
            <p>Important information about this feature</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* Multi-line Tooltip */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              className="border-zinc-700 hover:bg-zinc-800"
            >
              More info
            </Button>
          </TooltipTrigger>
          <TooltipContent className="max-w-[250px]">
            <div className="flex items-start space-x-2">
              <HelpCircle className="w-4 h-4 text-teal-500 mt-0.5" />
              <div>
                <p className="font-medium mb-1">Feature status</p>
                <p className="text-zinc-400 text-xs">
                  This feature is currently in beta. Some functionality may be
                  limited.
                </p>
              </div>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* Warning Tooltip */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="destructive" size="sm">
              Delete
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <div className="flex items-center space-x-2 text-amber-500">
              <AlertCircle className="w-4 h-4" />
              <p>This action cannot be undone</p>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
