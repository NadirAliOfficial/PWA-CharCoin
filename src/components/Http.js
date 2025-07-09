

import { getData, apiUrl } from "./const";


const updateCharityLotteryWinners=async(callback)=>{
    const url = apiUrl+"/api/charity-lottery-winners";
    const response = await fetch(url);
    const data = await response.json();
    callback(data);
}

const updateTopTierWallets=async(callback)=>{
    const url = apiUrl+"/api/top-tier-wallets";
    const response = await fetch(url);
    const data = await response.json();
    callback(data);
}


export default  {
    updateCharityLotteryWinners, 
    updateTopTierWallets,
    updateStakings,
}

