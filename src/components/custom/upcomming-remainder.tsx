"use client";

import { ThumbsUp } from "lucide-react";
import Image from "next/image";

export default function UpcomingReminders() {
  return (
    <div className="bg-background p-6 rounded-lg">
      <h2 className="text-zinc-100 text-sm font-medium mb-6">
        Upcoming & Reminders
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Left Section */}
        <div className="space-y-4">
          <div className="bg-custom-slate p-6 rounded-lg">
            <div className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center mb-4">
              <ThumbsUp className="w-5 h-5 text-teal-500" />
            </div>
            <div className="space-y-2">
              <p className="text-teal-500 text-sm">
                Voting to support charitable causes closes on the 20th of each
                month.
              </p>
              <p className="text-teal-500 text-sm">Make your choice!</p>
              <div className="border-t border-dotted border-zinc-800 my-4" />
              <p className="text-zinc-400 text-sm">
                You have{" "}
                <span className="text-zinc-100 font-medium">20,390 tokens</span>{" "}
                staked! Make an impact by voting for a cause you believe in
                before time runs out.
              </p>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="space-y-4">
          {/* Winning Cause Card */}
          <div className=" rounded-lg overflow-hidden">
            <div className="flex gap-4 hover:bg-custom-slate p-4">
              <Image
                src="/feature-image.png"
                width={80}
                height={80}
                alt="Clean water project"
                className="w-20   rounded-lg  object-cover"
              />
              <div className="flex-1">
                <h3 className="text-zinc-100 text-sm font-medium mb-1">
                  Winning cause
                </h3>
                <p className="text-zinc-400 text-sm line-clamp-3 mb-2">
                  Clean water in Guatemala's most affected community
                </p>
                <p className="text-zinc-500 text-sm">23,345 points</p>
              </div>
            </div>
          </div>

          {/* NFT Card */}
          <div className=" rounded-lg overflow-hidden">
            <div className="flex gap-4 hover:bg-custom-slate p-4">
              <Image
                src="/feature-image.png"
                width={80}
                height={80}
                alt="Clean water project"
                className="w-20   rounded-lg  object-cover"
              />
              <div className="flex-1">
                <h3 className="text-zinc-100 text-sm font-medium mb-1">
                  NFT of the month
                </h3>
                <p className="text-zinc-400 text-sm line-clamp-3 mb-2">
                  The NFT will be randomly awarded to one of the currently
                  staking wallets.
                </p>
                <p className="text-zinc-500 text-[9px]">
                  NFT will be given away on the 25th of the month
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
