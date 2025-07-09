"use client"

import { Button } from "@/components/ui/button"
import { useWallet } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/navigation'
import { getData, toDHM, toNaturalFormat } from "@/components/const";
import { useEffect } from "react";
import { useRewardsStore } from "@/stores/reward-store";
import { PublicKey } from '@solana/web3.js';
import { Program, } from '@coral-xyz/anchor';
import idl from './../../../components/idl.json';

import {  getOrCreateAssociatedTokenAccount,  TOKEN_PROGRAM_ID }  from "@solana/spl-token";

import { TOKEN_MINT as tokenMint,  
         getConfig,
         postData,
      } from './../../../components/const';
import * as anchor from '@coral-xyz/anchor';



type RowProps = {
  title: string;
  value: string | number | any;
};


const Row = ({ title, value }: RowProps) => {
  return <div  className="flex px-2 py-2" style={{borderBottom:"solid 1px rgba(58, 53, 53, 0.37)"}}>
          <div className="px-2">{title}</div>
          <div>:</div>
          <div className="font-bold underline px-2">{value}</div>
      </div>;
};


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
     // @ts-expect-error no such issue. 
    setStakings(result.data);
  };




 const requestUnstakeTokens= async(index:number) => 
    {
    

    const { provider } = await getConfig(wallet);
    const program = new Program(idl, provider);

    const [stakingPool] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from('staking_pool'), tokenMint.toBuffer()],
      program.programId
    );
    
    const userAta = await getOrCreateAssociatedTokenAccount(
      program.provider.connection,
       // @ts-expect-error no such issue. 
      wallet,
      tokenMint,
      wallet.publicKey
    );



    const[userStakePDA] = anchor.web3.PublicKey.findProgramAddressSync(
       // @ts-expect-error no such issue. 
      [Buffer.from('user'), wallet.publicKey.toBuffer()],
      program.programId
    );



    const [userStake] = anchor.web3.PublicKey.findProgramAddressSync(
       // @ts-expect-error no such issue. 
      [Buffer.from('user_stake'), wallet.publicKey.toBuffer(), new anchor.BN(index).toArrayLike(Buffer, "le", 8)],
      program.programId
    );


    const [configAccount, bump] =  PublicKey.findProgramAddressSync(
    [Buffer.from('config')],
    program.programId
    );      
            
    const tx =  await program.methods
      .requestUnstakeHandler(new anchor.BN(index)) // stake id
      .accounts({
        configAccount: configAccount,
        stakingPool: stakingPool,
        user: userStakePDA,
        userStake: userStake,
         // @ts-expect-error no such issue. 
        userAuthority: wallet.publicKey,
      })
      .rpc();
      await postData("/api/staking/req-unstake", {index, tx, type:"request unstake"})
      updateState();
  };




   


  const unstakeTokens= async(index:number) => 
    {

    const { provider } = await getConfig(wallet);
    const program = new Program(idl, provider);      

    const[stakingPool] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from('staking_pool'), tokenMint.toBuffer()],
      program.programId
    );


    const[stakingRewardAccount] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from('staking_reward')], 
      program.programId
    );




    const stakingRewardAta = await getOrCreateAssociatedTokenAccount(
      program.provider.connection,
       // @ts-expect-error no such issue. 
      wallet,
      tokenMint,
      stakingRewardAccount,
      true
    );



    const userAta = await getOrCreateAssociatedTokenAccount(
      program.provider.connection,
       // @ts-expect-error no such issue. 
      wallet,
      tokenMint,
      wallet.publicKey
    );


    const stakingPoolAta = await getOrCreateAssociatedTokenAccount(
      program.provider.connection,
       // @ts-expect-error no such issue. 
      wallet,
      tokenMint,
      stakingPool,
      true
    );

 
    const[userStakePDA] = anchor.web3.PublicKey.findProgramAddressSync(
       // @ts-expect-error no such issue. 
      [Buffer.from('user'), wallet.publicKey.toBuffer()],
      program.programId
    );

     

    const[userStake] = anchor.web3.PublicKey.findProgramAddressSync(
       // @ts-expect-error no such issue. 
      [Buffer.from('user_stake'), wallet.publicKey.toBuffer(),new anchor.BN(index).toArrayLike(Buffer, "le", 8)],
      program.programId
    );

    const [configAccount, bump] =  PublicKey.findProgramAddressSync(
    [Buffer.from('config')],
    program.programId
    );   
    

 const tx = await program.methods
        .unstakeTokensHandler(new anchor.BN(index)) 
        .accounts({
          configAccount: configAccount,
          stakingPool: stakingPool,
          userStake:userStake,
          user: userStakePDA,
           // @ts-expect-error no such issue. 
          userAuthority: wallet.publicKey,
          userTokenAccount: userAta.address,
          poolTokenAccount: stakingPoolAta.address,
          stakingRewardAta:stakingRewardAta.address,
          systemProgram: anchor.web3.SystemProgram.programId,
          tokenProgram: TOKEN_PROGRAM_ID,
        })
        .rpc();
        await postData("/api/staking/unstake", {index, tx, type:"unstake"})
        updateState();
  };  




  
  
      const claimReward= async(index:number) => 
      {
        const { provider } = await getConfig(wallet);
        const program = new Program(idl, provider); 

      const [configAccount, bump] =  PublicKey.findProgramAddressSync(
      [Buffer.from('config')],
      program.programId
      );
  
      const[stakingPool] = anchor.web3.PublicKey.findProgramAddressSync(
        [Buffer.from('staking_pool'), tokenMint.toBuffer()],
        program.programId
      );
  
  
      
      const[userStakePDA] = anchor.web3.PublicKey.findProgramAddressSync(
         // @ts-expect-error no such issue. 
        [Buffer.from('user'), wallet.publicKey.toBuffer()],
        program.programId
      );    
          
  
      const[userStake] = anchor.web3.PublicKey.findProgramAddressSync(
         // @ts-expect-error no such issue. 
        [Buffer.from('user_stake'), wallet.publicKey.toBuffer(),new anchor.BN(index).toArrayLike(Buffer, "le", 8)],
        program.programId
      );
  
  
      const userAta = await getOrCreateAssociatedTokenAccount(
        program.provider.connection,
         // @ts-expect-error no such issue. 
        wallet,
        tokenMint,
        wallet.publicKey
      );
  
      const[stakingRewardAccount] = anchor.web3.PublicKey.findProgramAddressSync(
        [Buffer.from('staking_reward')], 
        program.programId
      );    
  
      const stakingRewardAta = await getOrCreateAssociatedTokenAccount(
        program.provider.connection,
         // @ts-expect-error no such issue. 
        wallet,
        tokenMint,
        stakingRewardAccount,
        true
      );
  
      const _context = {
            configAccount: configAccount,
            stakingPool: stakingPool,
            user: userStakePDA,
            userAuthority: wallet.publicKey,
            userStake: userStake,
            userTokenAccount: userAta.address,
            stakingRewardAta: stakingRewardAta.address,
            tokenProgram: TOKEN_PROGRAM_ID,
          }
  
      const tx = await program.methods
          .claimRewardHandler(new anchor.BN(index))
           // @ts-expect-error no such issue. 
          .accounts(_context)
          .rpc();
  }
  

  

  useEffect(()=>{
    if(wallet)
    {
      updateState();
    }
  }, [wallet])

  return (

    <div className="mx-4 py-6 space-y-6">
      <div className="flex justify-between max-md:flex-col-reverse gap-4">
        <h1 className="text-3xl px-2 font-bold">My Stakes</h1>
      </div>

      <div className=''>        
              <div className="py-3">
                <div className='lg:flex' style={{flexWrap:"wrap"}}>

                {stakings && stakings?.length>0 && stakings?.map((row:any, index:number)=>{
                  if(row.staked_amount<0.000001) return;
                  if(row.status=="un") return;
                  const timestampNow = Date.now();
                  
                  const date = new Date(row.end_date);
                  const endTimestamp = date.getTime();            

                  let isPeriodCompleted = false;
                  let days = "";

                  if(timestampNow>endTimestamp) {
                    isPeriodCompleted = true;
                  } else {
                    const span = (endTimestamp-timestampNow)/1000;
                    days =  toDHM(span);
                  }
                
                  return <div style={{backgroundColor:"#1d1c21", minWidth:"360px", maxWidth:"420px"}} className="px-2 mx-2 my-2 py-3 my-5 rounded-md border border-1 border-gray-500" key={index}>
                      
                      <Row title="Staking Index"  value={row.indeks} />
                      <Row title="Staked Amount"  value={row.staked_amount} />
                      <Row title="Expected Reward"  value={<span>{Math.round(row.staked_amount*0.1)} (<span className='text-green-300'>{days}) </span></span>} />
                      <Row title="Duration"  value={row.duration+" Days"}  />
                      <Row title="Staked From"  value={toNaturalFormat(row.start_date)}  />
                      <Row title="Staked To"  value={toNaturalFormat(row.end_date)}  />

                      <Row title="Transaction"  value={<a target="_blank" href={"https://explorer.solana.com/tx/"+row.hash+"?cluster=devnet"}>Go to Explorer 
                        <svg className="inline mx-1" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 2C2.44772 2 2 2.44772 2 3V12C2 12.5523 2.44772 13 3 13H12C12.5523 13 13 12.5523 13 12V8.5C13 8.22386 12.7761 8 12.5 8C12.2239 8 12 8.22386 12 8.5V12H3V3L6.5 3C6.77614 3 7 2.77614 7 2.5C7 2.22386 6.77614 2 6.5 2H3ZM12.8536 2.14645C12.9015 2.19439 12.9377 2.24964 12.9621 2.30861C12.9861 2.36669 12.9996 2.4303 13 2.497L13 2.5V2.50049V5.5C13 5.77614 12.7761 6 12.5 6C12.2239 6 12 5.77614 12 5.5V3.70711L6.85355 8.85355C6.65829 9.04882 6.34171 9.04882 6.14645 8.85355C5.95118 8.65829 5.95118 8.34171 6.14645 8.14645L11.2929 3H9.5C9.22386 3 9 2.77614 9 2.5C9 2.22386 9.22386 2 9.5 2H12.4999H12.5C12.5678 2 12.6324 2.01349 12.6914 2.03794C12.7504 2.06234 12.8056 2.09851 12.8536 2.14645Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                      </a>}  />


                      <div className="py-1">

                        { row.status=='ur' ? <span className='px-1 font-bold text-green-500'>Unstake Requested</span>  : <Button onClick={()=>requestUnstakeTokens(row.indeks)} className="mx-2 my-2">Request UnStake</Button> }
                        
                        { row.status=='ur' ? <Button onClick={()=>unstakeTokens(row.indeks)} className="mx-2 my-2">UnStake</Button>   : <></> }
                        
                        { isPeriodCompleted ? <Button  onClick={()=>claimReward(row.indeks)}  className="mx-2 my-2">Claim Reward</Button> : null }  

                      </div>

                  </div>
                })}

        </div>
      </div>










      </div>

    </div>
  )
}



export default MyStakesModal;