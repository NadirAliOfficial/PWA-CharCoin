"use client"
import { useState, useEffect } from "react"
import { TOKEN_MINT, getConfig } from "./const";
import { useWallet } from '@solana/wallet-adapter-react';
import { useRewardsStore } from "@/stores/reward-store";


function Component() 
{
    const[bal, setBal] = useState("~");
    const wallet = useWallet();
    const { setTokenBalance, refresh } = useRewardsStore();

    async function getTokenBalance(TOKEN_MINT, wallet) {
        try {
            const { connection } = await getConfig(wallet);
            const tokenAccounts = await connection.getParsedTokenAccountsByOwner(wallet, { mint: TOKEN_MINT });
            if (tokenAccounts.value.length === 0) 
            {
                setBal(0);
                setTokenBalance(0);
                return;
            }
            const balance = tokenAccounts.value[0].account.data.parsed.info.tokenAmount.uiAmount;
            setBal(balance);
            setTokenBalance(balance);
        } catch (error) {
            console.error("Error getting token balance:", error);
            setBal(0);
            return;
        }
    }

    useEffect(()=>{
        if(wallet.connected)
        {
            getTokenBalance(TOKEN_MINT, wallet.publicKey);
        }

    }, [wallet.connected, refresh])


    return (<div></div>);
}


export default Component;
