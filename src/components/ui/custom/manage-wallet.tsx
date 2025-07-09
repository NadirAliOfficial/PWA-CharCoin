"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Trash2, ArrowRight, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface WalletData {
  id: string;
  address: string;
  type: "Phantom" | "Solflare" | "Coinbase" | "Glow";
  isPrimary: boolean;
}

interface ManageWalletsModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialWallets?: WalletData[];
  onSave?: (wallets: WalletData[]) => void;
}

export function ManageWalletsModal({
  isOpen,
  onClose,
  initialWallets = [],
  onSave,
}: ManageWalletsModalProps) {
  const [wallets, setWallets] = useState<WalletData[]>(
    initialWallets.length > 0
      ? initialWallets
      : [
          {
            id: "1",
            address: "8JuXNcYHKPEKZnLXGD7K9QqV3VIL2nYMSTQKTfFp",
            type: "Phantom",
            isPrimary: false,
          },
          {
            id: "2",
            address: "5LnMWYZZSc4KXWbLDsUAYBayVqFZMiQRJSWGLtBTF",
            type: "Phantom",
            isPrimary: true,
          },
          {
            id: "3",
            address: "2gFTbWXMJPqVNkzVVT7pGJtZ4cPYqTVXRXsYYWMF",
            type: "Solflare",
            isPrimary: false,
          },
        ]
  );

  const setPrimaryWallet = (id: string) => {
    setWallets(
      wallets.map((wallet) => ({
        ...wallet,
        isPrimary: wallet.id === id,
      }))
    );
  };

  const deleteWallet = (id: string) => {
    const walletToDelete = wallets.find((wallet) => wallet.id === id);
    if (walletToDelete?.isPrimary) {
      toast.error("You cannot delete your primary wallet. Please set another wallet as primary first.");
      return;
    }

    if (confirm("Are you sure you want to delete this wallet? This action cannot be undone.")) {
      setWallets(wallets.filter((wallet) => wallet.id !== id));
      toast.success("Wallet removed successfully");
    }
  };

  const handleSave = () => {
    const hasPrimary = wallets.some((wallet) => wallet.isPrimary);
    if (!hasPrimary && wallets.length > 0) {
      toast.error("Please select a primary wallet before saving");
      return;
    }

    onSave?.(wallets);
    toast.success("Wallet preferences saved");
    onClose();
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center border-b border-[#30363d]">
        <div>
          <div className="text-xs text-gray-400 uppercase">CONFIRM TO CONTINUE</div>
          <h2 className="text-xl font-semibold">Manage your account wallets</h2>
        </div>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-primary font-medium">Choose your main wallet</h3>
          <p className="text-sm text-gray-300">
            Your main wallet serves as the primary identity of your CHAR Coin account, used for account certification
            and key verifications. Additional wallets can be linked for convenience, allowing you to access your
            account from multiple wallets while maintaining a single balance. No matter which wallet you use to log
            in, your total holdings and activity remain the same, but only the main wallet holds the official status
            for verification and certifications.
          </p>
        </div>

        <div className="bg-secondary border border-[#30363d] rounded-md p-4 space-y-2">
          <div className="flex items-start gap-2">
            <div className="bg-[#f85149] p-1 rounded-md mt-0.5">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-medium">Wallet Deletion Notice</h4>
              <p className="text-sm text-gray-300">
                Only certain wallets can be deleted from your account. Removing a wallet will erase all its details
                from your CHAR Coin account and cannot be undone. Deleted wallets cannot be re-added to any CHAR Coin
                account for 365 days, so we highly recommend keeping them linked unless absolutely necessary.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <RadioGroup
            value={wallets.find((wallet) => wallet.isPrimary)?.id} // Set the default value to the primary wallet's ID
            onValueChange={setPrimaryWallet}
          >
            {wallets.map((wallet) => (
              <div key={wallet.id} className="flex items-center justify-between p-3 border-b border-[#30363d] last:border-b-0">
                <div className="flex items-center gap-3">
                  <RadioGroupItem value={wallet.id} id={`wallet-${wallet.id}`} />
                  <Label htmlFor={`wallet-${wallet.id}`} className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span>{wallet.type}</span>
                      {wallet.isPrimary && (
                        <span className="text-xs bg-primary text-black px-2 py-0.5 rounded">Primary</span>
                      )}
                    </div>
                    <div className="text-sm text-gray-400 font-mono">{wallet.address}</div>
                  </Label>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteWallet(wallet.id)}
                  className="hover:text-primary"
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              </div>
            ))}
          </RadioGroup>
        </div>
      </div>

      <div className="p-4 border-t border-[#30363d] flex justify-end">
        <Button onClick={handleSave} className="bg-primary hover:bg-[#00DDDD] text-black flex items-center gap-2">
          Save preferences
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
