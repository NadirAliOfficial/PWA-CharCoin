"use client"
// import { DialogWithButton } from "@/components/custom/stake-dialog";
// import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { useBadgeStore } from "@/stores/account-store";
// import { ArrowRight, HeartCircle } from "@mynaui/icons-react";
import useDashboardStore from "@/stores/dashboard-store";

import { toNaturalFormat } from "@/components/const";


import Link from "next/link";
import {  useState } from "react";




const AccountPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {badges, testFunction } = useBadgeStore()

  const { 
      user, 
      myTotalStaked, 
      canVoteAmount, 
      canWithdrawAmount, 
      tokenBalance, 
      marketValue,
      donatedSoFar, 
      causesSupported, 
      projectsSupported } = useDashboardStore();


  
  return (
    <div className="mx-4 max-md:mx-4 py-6 space-y-6">
      <div className=" flex justify-between max-lg:flex-col  flex-col gap-4">
        <h1 className="text-3xl font-bold " onClick={testFunction}>Account</h1>
        <div className="grid grid-cols-[450px,_1fr] max-xl:grid-cols-1 mt-1 gap-4">
          <div className="flex flex-col gap-4 mt-4">
            <div className="flex items-center gap-4">
              <h2 className="text-primary">{user.username}</h2> - {" "}
              <span className="text-xs"> Account Profile</span>
            </div>
            <div className="text-primary border-4 border-primary text-center gap-4  p-4 py-8 rounded-xl grid grid-cols-[1fr_,2px,_1fr] ">
              <span className="space-y-2 ">
                {" "}
                <div className="text-2xl">{Math.round(1000*tokenBalance)/1000}</div>
                <p className="text-custom-light_text text-xs">
                  Your Tokens Balance
                </p>
              </span>
              <hr className="min-w-[2px] h-full bg-background" />
              <span className="space-y-2 text-center">
                {" "}
                <div className="text-2xl"> ${Math.round(1000*tokenBalance*marketValue)/1000} </div>
                <p className="text-custom-light_text text-xs">
                  Tokens USD Value
                </p>
              </span>
            </div>


            
            <div>
              <h3>Account Stats</h3>
              <div className=" gap-4 grid grid-cols-2 max-sm:grid-cols-1 ">

                    <div
                      className="flex bg-background p-5 py-8 rounded-xl gap-4 items-center">
                      <img src="/images/heart-white.svg" className="text-xl stroke-[1px]" />
                      <div className="flex flex-col ">
                        <h1 className="text-xl font-semibold">${donatedSoFar}</h1>
                        <p className="text-sm">Donated so far</p>
                      </div>
                    </div>

                    <div
                      className="flex bg-background p-5 py-8 rounded-xl gap-4 items-center">
                      <img src="/images/home-white.svg" className="text-xl stroke-[1px]" />
                      <div className="flex flex-col ">
                        <h1 className="text-xl font-semibold">{causesSupported}</h1>
                        <p className="text-sm">Causes supported</p>
                      </div>
                    </div>

                    <div
                      className="flex bg-background p-5 py-8 rounded-xl gap-4 items-center">
                      <img src="/images/projects.svg" className="text-xl stroke-[1px]" />
                      <div className="flex flex-col ">
                        <h1 className="text-xl font-semibold">{projectsSupported}</h1>
                        <p className="text-sm">Projects supported</p>
                      </div>
                    </div>

                    <div
                      className="flex bg-background p-5 py-8 rounded-xl gap-4 items-center">
                      <img src="/images/calendar.svg" className="text-xl stroke-[1px]" />
                      <div className="flex text-pink-200 flex-col ">
                        <h1 className="text-xl  font-semibold">{toNaturalFormat(user.joining_date)}</h1>
                        <p className="text-sm">Member since</p>
                      </div>
                    </div>                                                            

              </div>
            </div>
            <hr />
            <div className="p-5 bg-background rounded-xl shadow-sm">
              <h2 className="text-lg font-semibold">Your Account Insights </h2>
              <h4 className="text-xs">Private</h4>
              <ul className="list-disc list-inside  mt-4">
                <li>
                  You currently have {myTotalStaked} tokens staked (${myTotalStaked*marketValue} at today&#39;s
                  value).
                </li>
                <li>
                  {" "}
                  At this moment, {canVoteAmount} of your tokens qualify for voting
                  points.
                </li>
                <li>You have {canWithdrawAmount} tokens (${canWithdrawAmount*marketValue}) elegible for withdrawal.</li>
                <li>
                  {" "}
                  Your current estimated monthly return for staking is
                  approximately 15%.
                </li>
              </ul>
            </div>
            <div className="p-5 bg-background rounded-xl  shadow-sm">
              <h2 className="text-lg font-semibold">Your Account Wallets </h2>
              <h4 className="text-xs">Private</h4>
              <div className=" mt-4 flex flex-col gap-1 text-sm">
                <span className="flex gap-2">
                  Main wallet:
                  <p className="text-primary break-words">
                    {user.wallet}
                  </p>
                </span>
              </div>
              <div className="flex gap-4">
                {/* <DialogWithButton
                  buttonText="Connect more Wallets"
                  dialogContent={<ConnectWalletModal
                    onSuccess={() => {
                      console.log("Wallet connected successfully")
                    }}
                  />}
                  icon={ArrowRight}
                  searchParamsKey="connect"
                  defaultStep={1}
                  onStepChange={(newStep) => {
                    console.log("Step changed to:", newStep);
                  }}
                /> */}

                {/* <Button>
                  Connect more wallets <ArrowRight className="!w-6 !h-6 ml-2" />
                </Button> */}
                {/* <DialogWithButton
                  buttonText="Manage"
                  buttonVariant="ghost"
                  dialogContent={
                    <ManageWalletsModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    initialWallets={connectedWallets}
                    onSave={handleSaveWallets}
                  />
                  }
                  icon={ArrowRight}
                  searchParamsKey="manage-wallet"
                  defaultStep={1}
                  onStepChange={(newStep) => {
                    console.log("Step changed to:", newStep);
                  }}
                /> */}
                
              
              </div>
            </div>
          </div>


          <div className="bg-[#28272D] show flex flex-col gap-8 p-5 rounded-xl shadow-sm">
            <h2 className="text-xl flex gap-2">
              <p className="text-primary">Awarded Badges</p> - 5 of 10
            </h2>
            <p className="text-sm">
              CHAR Coin badges are exclusive, non-transferable rewards that
              recognize your contributions within the ecosystem. Earn them
              automatically by staking, voting, donating, trading, or
              participating in events—no manual claiming needed. Your profile
              remains private by default, but you can generate a public link to
              showcase your achievements if desired. Start earning badges and
              build your legacy in CHAR Coin today!
            </p>
            <hr />
            <div className="grid grid-cols-2 max-md:grid-cols-1">
              {badges?.map((bdg, index) => (
                <div
                  className={cn(
                    "flex gap-4 hover:bg-background p-4 rounded-xl cursor-pointer",
                    index % 3 && "opacity-50"
                  )}
                  key={index}
                >
                  <img
                    src={bdg.src}
                    width={100}
                    height={100}
                    alt="badge"
                  />
                  <div>
                    <h2 className="text-primary">{bdg.name}</h2>
                    <p className="text-xs">{bdg.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <hr className="mt-auto" />
            <div className="flex justify-between max-md:flex-col gap-4 ">
              <div className="flex items-center space-x-2">
                <Switch id="airplane-mode" />
                <Label htmlFor="airplane-mode" className="text-sm">
                  Make your account wallets, balance, stats and badges public
                </Label>
              </div>
              <Link href={"/"} className="text-primary text-xs">
                https://charcoin.org/wallet_profile/powersonic72
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AccountPage;
