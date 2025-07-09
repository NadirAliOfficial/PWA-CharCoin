"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, X } from "lucide-react"

interface StakingConfirmationModalProps {
  onClose: () => void
  onStake: () => void
  stakeAmount:number
  period:number
}

export const AddWallet = ({onClose, onStake, stakeAmount, period}: StakingConfirmationModalProps) => {


  return (
    <div >
      <div className=" text-white rounded-lg  w-full  relative">
      

        <div className="mb-6">
          <p className="text-sm text-gray-400 uppercase mb-2">CONFIRM TO CONTINUE</p>
          <h2 className="text-2xl font-bold mb-6">You will proceed to stake {stakeAmount} CCX tokens for {period} days </h2>

          <div className="mb-4">
            <h3 className="text-sm font-medium mb-2">Staking rules for governance participation</h3>
            <p className="text-sm text-gray-300 mb-4">
              By proceeding, you agree to stake the selected amount of CCX tokens, which will be blocked for the
              duration of the staking period.
            </p>

            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-300">
              <li>Staked tokens are locked and cannot be accessed until a withdrawal request is made.</li>
              <li>
                After requesting a withdrawal, a minimum of 48 hours is required for the tokens to reflect in your
                balance.
              </li>
              <li>
                Only staked (blocked) tokens are eligible for governance voting. To generate voting points, tokens must
                remain staked for at least 15 days.
              </li>
            </ul>
          </div>

          <p className="text-sm text-gray-300 mt-4">
            By staking, you earn rewards while also gaining the ability to vote and shape the future of the platform.
          </p>
        </div>
        <hr className="bg-custom-light_text mb-5" />

        {
          period>0 ? (<Button
          onClick={onStake}
          className="bg-cyan-400 hover:bg-cyan-500 text-black font-medium rounded-md px-4 py-2 flex items-center"
        >
          Stake tokens now
         <ArrowRight className="w-4 h-4 ml-2" />
        </Button>) : <span className="text-red-500 font-bold">Period is not set.</span>
        }
        
      </div>
    </div>
  )
}

