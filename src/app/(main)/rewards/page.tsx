"use client";
import { StackWithPurpose } from "@/components/custom/StackWithPurpose";
import TopTierWallets from "@/components/custom/TopTierWallets";
import CharityLotteryWinners from "@/components/custom/CharityLotteryWinners";
import useDashboardStore from "@/stores/dashboard-store";
import { getData } from "@/components/const";
import { useState, useEffect } from "react";

type TopWallet = {
  		id:string;
			name:string;
			wallet:string;
			volume:string;
			winnings:string;
			created_on:string;
}

const RewardsPage = () => {

  const[topTierWallets, setTopTierWallets] = useState();
  const[charityLotteryWinners, setCharityLotteryWinners] = useState();
  const { winningCause, nextNft, lastNft } = useDashboardStore();

  const updateStates=async()=>{
      const response = await getData("/api/top-and-winner");
       // @ts-expect-error no such issue. 
      const _topTierWallets = response.data.topTierWallets;
      setTopTierWallets(_topTierWallets);
       // @ts-expect-error no such issue. 
      setCharityLotteryWinners(response.data.charityLotteryWinners);
  };

  useEffect(()=>{
    updateStates();
  }, []);


  return (
    <div className="mx-4 py-6 space-y-6">
      <div className="flex justify-between gap-4">
        <h1 className="text-3xl font-bold">Rewards</h1>
      </div>
      <div className="lg:flex gap-8">

        <StackWithPurpose />

        <div className="flex-1">
          <div className="lg:flex gap-8">
            <TopTierWallets topTierWallets={topTierWallets} />
            <CharityLotteryWinners charityLotteryWinners={charityLotteryWinners}  />
          </div>

          <hr />

          {/* Right Section */}
          <div className="lg:flex mt-8">

            {/* NFT Card */}

              <div className="flex-1 mx-1 rounded-lg bg-[#28272D] overflow-hidden">
                <div className="flex gap-4 hover:bg-custom-slate p-4">
                  <img
                    src={nextNft.image}
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
                       The NFT will be randomly awarded to one 
                       of the currently staking wallets.
                    </p>
                    <p className="text-zinc-500 text-[9px]">
                      NFT will be given away on the 20th of the month
                    </p>
                  </div>
                </div>
              </div>


              <div className="flex-1 mx-1 rounded-lg bg-[#28272D] rounded-lg overflow-hidden">
                <div className="flex gap-4 hover:bg-custom-slate p-4">
                  <img
                    src={lastNft.image}
                    width={80}
                    height={80}
                    alt="Clean water project"
                    className="w-20   rounded-lg  object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-zinc-100 text-sm font-medium mb-1">
                      NFT of the previous month
                    </h3>
                    <p className="text-zinc-400 text-sm line-clamp-3 mb-2">
                      The NFT of the previous month has been successfully granted to Wallet ID:
                    </p>
                    <p className="text-zinc-500 text-[9px]">
                      {lastNft.address}
                    </p>
                  </div>
                </div>
              </div>


            </div>          


        </div>

      </div>

    </div>
  );
};

export default RewardsPage;