import { Button } from "@/components/ui/button";
import { useWallet } from '@solana/wallet-adapter-react';
import { apiUrl } from "@/components/const"
import bs58 from "bs58";
import { useRouter } from 'next/navigation';
import { useState } from "react";

const _web3Auth=async(wallet, redirectToDashboard)=>{
        const publicKey = wallet.publicKey;
        const nonceResp = await fetch(apiUrl+'/api/auth/get-nonce', 
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({publicKey})
        });

      const { nonce } = await nonceResp.json();
      const encodedMessage = new TextEncoder().encode(nonce);
      const signedMessage = await window.solana.signMessage(encodedMessage, 'utf8'); 
      const signatureBase58 = bs58.encode(signedMessage.signature);     

    const verifyResp = await fetch(apiUrl+'/api/auth/verify-signature', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: "include", 
        body: JSON.stringify({
          signature: signatureBase58,
          publicKey
        })
    });      

    const result = await verifyResp.json();
    if (result.status=="success") 
    {
        redirectToDashboard();
    } 
    else 
    {
        alert("❌ Signature invalid!");
    }

};


const Web3Login=()=>{

    const router = useRouter();
    const[isLogin, setIsLogin] = useState(false); 
    const redirectToDashboard = ()=>{ 
        setIsLogin(true);
        setTimeout(()=>router.push('/dashboard'), 500); 
    }
    const wallet = useWallet();
    return <Button variant={"default"} onClick={()=>_web3Auth(wallet, redirectToDashboard)} >
        { isLogin ? 'Logged In ' : 'Web3 Login' }
    </Button>
}

export default Web3Login;
