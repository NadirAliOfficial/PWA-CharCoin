"use client"

import { Button } from "@/components/ui/button"
import { useWallet } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/navigation'
import { getData, toDHM, toNaturalFormat } from "@/components/const";
import { useEffect } from "react";
import { useRewardsStore } from "@/stores/reward-store";


const MyStakesModal =()=> {

  const wallet = useWallet();
  const router = useRouter();
  const { stakings, setStakings } = useRewardsStore();

  const gotoLogin=()=>{
    router.push("/login");
  };

  const updateState=async()=>{
    const _wallet = wallet.publicKey;
    const result = await getData("/api/staking/"+_wallet);
    if(result.statusCode >= 300) 
    {
       gotoLogin();
    }
    setStakings(result.data);
  };


  useEffect(()=>{
    if(wallet)
    {
      updateState();
    }
  }, [wallet])

  return (
    <div >
      <div className="mb-6">
        <p className="text-sm text-gray-400 uppercase mb-2">CONFIRM TO CONTINUE</p>
        <h2 className="text-2xl font-bold mb-6">You will proceed to claim 1,000 CCX tokens</h2>

        <div className="mb-4">









        </div>

      </div>

    </div>
  )
}



export default MyStakesModal;