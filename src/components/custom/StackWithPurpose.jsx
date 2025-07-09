"use client";
import { useEffect, useState } from 'react';
import { PublicKey } from '@solana/web3.js';
import { Program, } from '@coral-xyz/anchor';
import idl from '../idl.json';
const {  getOrCreateAssociatedTokenAccount,  TOKEN_PROGRAM_ID } = require("@solana/spl-token");

import { PROGRAM_ID, 
         getSolanaTimestamp, STAKING_POOL, 
         POOL_TOKEN_ACCOUNT, TOKEN_MINT as tokenMint, 
         getTokenAccount, 
         getConfig, getTokenBalance,
         round,
         postData,
         toDate
      } from '../const';

import { useWallet } from '@solana/wallet-adapter-react';
import * as anchor from '@coral-xyz/anchor';
import TokenBal from '../TokenBal';
import { useToast } from "@/hooks/use-toast"

import { ArrowRight } from "@mynaui/icons-react";
import { Button } from "@/components/ui/button"
import { Slider } from "../ui/slider";
import Link from "next/link";
import { AddWallet } from "./add-wallet";
import { WithdrawalConfirmationModal } from "./on-withdraw";
import MyStakesModal from "./MyStakesModal";
import { useRewardsStore } from "@/stores/reward-store"; 
import { useProfile } from "@/stores/profile-store"; 


import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import useDashboardStore from '@/stores/dashboard-store';


const StackWithPurpose = () => {

  const { 
    stakeAmount, 
    setStakeAmount, 
    period, 
    setStakings,
    setPeriod } = useRewardsStore();    
    
    const { marketValue, tokenBalance, setTokenBalance } = useDashboardStore();
  
  const { 
    username
  } = useProfile()

  const { toast } = useToast();
  const[unstakeOpen, setUnstakeOpen] = useState(false);
  const[claimOpen, setClaimOpen] = useState(false);
  const[stakeOpen, setStakeOpen] = useState(false);
  
    const wallet = useWallet();





    const getUserState=async()=>{
      const { provider } = await getConfig(wallet);
      const program = new Program(idl, provider);      
      const [userStakePDA] = anchor.web3.PublicKey.findProgramAddressSync(
            [Buffer.from('user'), wallet.publicKey.toBuffer()],
            program.programId
          );
    
      try 
      {
        const userStakeInfo = await program.account.userStakeInfo.fetch(userStakePDA);
        const stakedAmount = userStakeInfo.totalAmount.toNumber()/1000_000_000;
        const stakingPool = userStakeInfo.stakingPool;
        const stakeCount = userStakeInfo.stakeCount.toNumber();
        const rewardIssued = userStakeInfo.rewardIssued.toNumber()/1000_000_000;
        const firstStakedAt = userStakeInfo.firstStakedAt.toNumber();
        
        //setStakingData({stakedAmount, stakingPool, stakeCount, rewardIssued, firstStakedAt});
      } 
      catch (error) 
      {
        console.error('Error fetching message:', error);
      }  
    }






  const stakeTokens = async(amount, __period) => 
    {
            const { provider } = await getConfig(wallet);
            const program = new Program(idl, provider);
            const _amount = parseFloat(amount+"") * 10 ** 9;

            let userAta;
            let stakingPoolAta;
            let stakingPool;
            let userStakePDA;
            let stakeInfo;


            const [configAccount, bump] =  PublicKey.findProgramAddressSync(
            [Buffer.from('config')],
            program.programId
            );            

            [stakingPool] = anchor.web3.PublicKey.findProgramAddressSync(
              [Buffer.from('staking_pool'), tokenMint.toBuffer()],
              program.programId
            );

            [userStakePDA] = anchor.web3.PublicKey.findProgramAddressSync(
              [Buffer.from('user'), wallet.publicKey.toBuffer()],
              program.programId
            );

            let index = 0;

            try 
            {
               stakeInfo = await program.account.userStakeInfo.fetch(userStakePDA);
               index = stakeInfo.stakeCount.toNumber();
               
            } 
            catch(error) 
            {
                index = 0;
            }

            let [userStake] = anchor.web3.PublicKey.findProgramAddressSync(
              [Buffer.from('user_stake'), wallet.publicKey.toBuffer(), new anchor.BN(index).toArrayLike(Buffer, "le", 8)],
              program.programId
            );
          
            userAta = await getOrCreateAssociatedTokenAccount(
              program.provider.connection,
              wallet,
              tokenMint,
              wallet.publicKey
            );


            stakingPoolAta = await getOrCreateAssociatedTokenAccount(
              program.provider.connection,
              wallet,
              tokenMint,
              stakingPool,
              true
            );


        const _accounts = {
        configAccount: configAccount,
        stakingPool: stakingPool,
        user: userStakePDA,
        userStake: userStake,
        userAuthority: wallet.publicKey,
        userTokenAccount: userAta.address,
        poolTokenAccount: stakingPoolAta.address,
        systemProgram: anchor.web3.SystemProgram.programId,
        tokenProgram: TOKEN_PROGRAM_ID,
      }


    try {

      const tx = await program
            .methods
            .stakeTokensHandler(new anchor.BN(_amount), new anchor.BN(__period))
            .accounts(_accounts)
            .rpc();


            const data = {
                name:username,
                indeks:index,
                wallet: wallet.publicKey,
                staked_amount: amount,
                start_date: toDate(Date.now()),
                end_date: toDate((Date.now())+(__period*86400)*1000),
                duration: __period,
                voting_power:Math.floor(((_amount/1000_000_000)/1000)/10),
                hash:tx,
            }


            if(tx.length>20) 
            {
              
              const result = await postData("/api/staking", data);

              if(result.rows.length>0)
              {
                setStakings(result.rows);
              }

            }
            
            setStakeOpen(false);
            setStakeAmount(0);

            toast({
              title: "CCX Staked",
              description: "Token Staked successfully. Txn: "+tx,
              variant: "default",
            });
            getTokenBalance(wallet.publicKey, tokenMint, setTokenBalance);
            getUserState();
        } 
        catch (error) 
        {
            console.error("Error staking tokens:", error);
        }

      return;
  }
  

  
    const getTimestamp=async()=>{
      const { connection } = await getConfig(wallet);
      const _timestamp = await getSolanaTimestamp(connection);
      return _timestamp;
    }
  
  
    useEffect(()=>{
      if(wallet.connected) { 
        getUserState(); 
      }
    }, [wallet.connected])
  

    useEffect(()=>{
      if(wallet.connected)
      {
        getTokenBalance(wallet.publicKey, tokenMint, setTokenBalance);
      } 
    }, [wallet.connected])


  return (
    <div className="flex flex-col gap-6" style={{maxWidth:"450px"}}>
      <TokenBal />
      <h1 className="text-lg text-primary">Staking with purpose</h1>
      <p className="text-sm text-custom-light_text">
        CHAR Coin takes the concept of a meme coin beyond speculation, offering
        real utility with a positive global impact. Through staking, you not
        only gain benefits as a holder but also become part of an ecosystem that
        funds charitable projects worldwide.
      </p>

      {/* <button onClick={getUserState}>getUserState</button> */}
      {/* Balance Section */}
      <div className="bg-background gap-4 p-4 py-12 rounded-xl grid grid-cols-[1fr_,2px,_1fr]">
        <span className="space-y-2">
          <div className="text-2xl">
            {round(tokenBalance)}
          </div>
          <p className="text-custom-light_text text-xs">Your CHAR Coin balance</p>
        </span>
        <hr className="min-w-[2px] h-full bg-custom-slate" />
        <span className="space-y-2">
          <div className="text-2xl">${round(tokenBalance*marketValue)}</div>
          <p className="text-custom-light_text text-xs">Your balance in USD</p>
        </span>
      </div>


      {/* Stake Tokens Section */}
      <div className="flex justify-between flex-col gap-4 items-end">
        <div className="flex flex-col w-full text-sm">
          <p className="text-xl">Stake Tokens</p>
          <p className="text-custom-light_text text-lg mb-2">
            <input 
                  onChange={(e)=>setStakeAmount(e.target.value)}
                  value={stakeAmount} 
                  className='px-3 py-2 w-full' 
                  style={{border:"none", backgroundColor:"#FFFFFF00"}}  />
          </p>
          <Slider
            step={0.001}
            min={0.0001}
            max={tokenBalance}
            value={[stakeAmount]}
            onValueChange={(value) => setStakeAmount(value[0])}
            className="my-5"
          />
        </div>

        <div>

        <p>
          Select your staking period—longer staking durations grant more voting power per token.
        </p>
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-full bg-secondary mt-2">
            <SelectValue placeholder="Select a period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">30 days (1 vote per token / Maximum of 7% monthly return)</SelectItem>
            <SelectItem value="2">90 days (1 vote per token / Maximum of 7% monthly return)</SelectItem>
            <SelectItem value="3">180 days (1 vote per token / Maximum of 7% monthly return)</SelectItem>
          </SelectContent>
        </Select>          
        </div>


          <Dialog open={stakeOpen} onOpenChange={setStakeOpen}>
              <DialogTrigger asChild>
                <Button className="font-bold" onClick={()=> setStakeOpen(true)}>
                  Stake Tokens
                  <ArrowRight />
                </Button>
              </DialogTrigger>
              
              <DialogContent className="sm:max-w-[425px]">
                <DialogTitle className="DialogTitle">Stake Tokens</DialogTitle>
                <AddWallet 
                          stakeAmount={stakeAmount} period={period} 
                          onStake={()=>{stakeTokens(stakeAmount, period)}}  
                          onClose={() => { setStakeOpen(false);}} />
              </DialogContent>
          </Dialog>        


      </div>





      <hr />

      {/* Duplicate Balance Section (If needed) */}
      <div className="bg-background gap-4 p-4 py-12 rounded-xl grid grid-cols-[1fr_,2px,_1fr]">
        <span className="space-y-2">
          <div className="text-2xl">{round(stakeAmount)}</div>
          <p className="text-custom-light_text text-xs">Your CHAR Coin balance (CCX)</p>
        </span>
        <hr className="min-w-[2px] h-full bg-custom-slate" />
        <span className="space-y-2">
          <div className="text-2xl">${round(stakeAmount*marketValue)}</div>
          <p className="text-custom-light_text text-xs">Value in USD</p>
        </span>
      </div>


      <div className='text-right'>
        <Link className="text-primary my-2 px-2 underline-offset-4 hover:underline" href="/my-stakes">
            My All Stakes
            <ArrowRight className='inline' />
        </Link>
      </div>



      {/* Insights Section */}
      <div>
        <h3>Insights</h3>
        <ul className="list-disc text-custom-light_text list-inside space-y-2">
          <li>You currently have <b>{round(tokenBalance)}</b> tokens staked (${round(marketValue*tokenBalance)} at today&#39;s value).</li>
          <li>Only tokens staked for at least 15 days are eligible to generate points when voting for your chosen causes. At this moment, 1,123 of your tokens qualify for voting points.</li>
          <li>Withdrawing your staked tokens and earned rewards requires a minimum of 48 hours before they reflect in your balance.</li>
          <li>You have <b>{round(tokenBalance)} tokens</b> (${round(marketValue*tokenBalance)}) eligible for withdrawal.</li>
          <li>You have <b>{round(tokenBalance)} tokens</b> staked.</li>
          <li>Your current estimated monthly return is approximately 15%.</li>
          <li>
            Check your{" "}
            <Link href={"/"} className="underline text-primary">
              staking history.
            </Link>
          </li>
        </ul>
      </div>



    </div>
  );
};

export { StackWithPurpose };
