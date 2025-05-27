"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

interface WalletOption {
  id: string;
  name: string;
  icon: string;
}

const wallets: WalletOption[] = [
  { id: "phantom", name: "Phantom", icon: "👻" },
  { id: "solflare", name: "Solflare", icon: "⭐" },
  { id: "slope", name: "Slope", icon: "⚡" },
  { id: "glow", name: "Glow", icon: "🔆" },
];

const StepOne = ({ onClick }: { onClick: () => void }) => {
  const [selectedWallet, setSelectedWallet] = useState<string>("phantom");

  return (
    <div className="flex flex-col gap-4">
      <span className="text-xs text-slate">CONFIRM TO CONTINUE</span>
      <h1 className="text-2xl">Select a Wallet to Sign Up or Log In</h1>

      <div className="flex gap-6 py-2">
        <span className="block min-w-2 h-full rounded-xl bg-gray-500" />
        <div className="flex gap-4 flex-col">
          <h2 className="text-primary">
            Secure & Anonymous Access with Your Wallet. Why we do this?
          </h2>
          <p>
            By connecting your wallet, you eliminate the need for
            passwords—ensuring a seamless and secure experience. Your data
            remains completely anonymous, and you won’t be required to provide
            personal details. You can instantly access CHAR Coin using any
            compatible wallet.
          </p>

          <h2 className="text-primary">Choose a Solana Wallet to Continue</h2>

          <div className="grid grid-cols-3 gap-3">
            {wallets.map((wallet) => (
              <Button
                key={wallet.id}
                size={"main_btn"}
                variant="secondary"
                className={`w-full flex justify-between text-lg px-6 font-bold h-auto ${
                  selectedWallet === wallet.id
                    ? "bg-teal-400/20 border-2 border-teal-400"
                    : "bg-gray-500"
                }`}
                onClick={() => setSelectedWallet(wallet.id)}
              >
                {wallet.name} <span>{wallet.icon}</span>
              </Button>
            ))}
          </div>

          <hr className="bg-slate" />
          <Button className="w-fit ml-auto relative" onClick={onClick}>
            Continue with {selectedWallet} <ArrowRight />
          </Button>
        </div>
      </div>
    </div>
  );
};

export { StepOne };
