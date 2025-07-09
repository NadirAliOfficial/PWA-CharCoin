"use client"

import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { useRewardsStore } from "@/stores/reward-store";



interface WithdrawalConfirmationModalProps {
  onClose: () => void
  onUnstake: () => void
}

export const WithdrawalConfirmationModal = ({ onClose, onUnstake }: WithdrawalConfirmationModalProps) => {

  const {
    stakedAmount
  } = useRewardsStore();
  return (
    <div >
      <div className="mb-6">
        <p className="text-sm text-gray-400 uppercase mb-2">CONFIRM TO CONTINUE</p>
        <h2 className="text-2xl font-bold mb-6">You will proceed to withdraw {stakedAmount} CCX tokens</h2>

        <h2 className="text-2xl font-bold mb-6">On early (before three days) unstaking {stakedAmount/10} CCX tokens will be deducted.</h2>


        <div className="mb-4">
          <h3 className="text-sm font-medium mb-2">Withdrawal rules for governance participation</h3>
          <p className="text-sm text-gray-300 mb-4">
            By proceeding, you agree to withdraw the selected amount of CCX tokens, which will be unblocked for your
            personal use.
          </p>

          <ul className="list-disc pl-5 space-y-2 text-sm text-gray-300">
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
          Remember that is by staking that you earn rewards while also gaining the ability to vote and shape the
          future of the platform.
        </p>
      </div>

      <hr className="bg-custom-light_text mb-5" />

      <Button onClick={onUnstake}>
        Unstake Tokens
        <svg
          className="ml-2"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 12H19M19 12L12 5M19 12L12 19"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Button>
    </div>
  )
}