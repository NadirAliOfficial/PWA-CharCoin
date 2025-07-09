import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import { AnchorProvider } from '@coral-xyz/anchor';
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import idl from './idl.json';




const PROGRAM_ID = new PublicKey("5qojvegehAfNjtSQbjRsqoHCfs85s71bT6daQZa5qNg6");
const TOKEN_MINT = new PublicKey("cEb3afMqdN1DCGUFQswEJB5iTACuX7fzJZaND7dYyAx");
const STAKING_POOL = new PublicKey("ACtkQQFYJu4Z5SmXcjFrGJNxiPpyt2vwBjngDYoQ1ZJo");
const POOL_TOKEN_ACCOUNT = new PublicKey("7pJVjxJJXJokTMKBHkns2sW9QnCk5SbX9T4gAJWcoF4h");
const configAccount = new PublicKey("CAmRVvVDQPD8eNSGjtrMKpmPTVdUtCqnzndJdjakpAh9");
const TOKEN_NAME = "CCX";

const apiUrl = "http://145.79.7.227:3000";

const network =  clusterApiUrl('devnet'); //"https://go.getblock.io/4136d34f90a6488b84214ae26f0ed5f4";

const opts = { preflightCommitment: 'processed' };

const getConfig = (wallet) => {
    const connection = new Connection(network, opts.preflightCommitment);
    const provider = new AnchorProvider(connection, wallet, opts);
    return {provider, connection};
  };


  async function getTokenAccount(connection, owner, mint) {
    const accounts = await connection.getParsedTokenAccountsByOwner(owner, { mint });
    if (accounts.value.length === 0) throw new Error("Token account not found");
    return accounts.value[0].pubkey;
}


function toPeriod(totalSeconds) {
  const days = Math.floor(totalSeconds / (24 * 3600)); // 1 day = 86400 seconds
  const remainingSecondsAfterDays = totalSeconds % (24 * 3600);

  const hours = Math.floor(remainingSecondsAfterDays / 3600); // 1 hour = 3600 seconds
  const remainingSecondsAfterHours = remainingSecondsAfterDays % 3600;

  const minutes = Math.floor(remainingSecondsAfterHours / 60); // 1 minute = 60 seconds
  
  let str = "";
  if(days>0) { str += days+"day "; }
  if(days>0 && hours>0) { str += ", ";  }
  if(hours>0) { str += hours+"hr "; }
  if((days>0 || hours>0) && minutes>0) { str += ", ";  }
  if(minutes>0) { str += minutes+"min"; }
  return str;
}



async function getSolanaTimestamp(connection) {
  try {
      const slot = await connection.getSlot();
      const blockTime = await connection.getBlockTime(slot);
      return blockTime;
  } catch (error) {
      console.error("Error fetching timestamp:", error);
      return 0;
  }
}


const getTokenBalance=async(wallet, TOKEN_MINT, callback)=> {
  try {
      const { connection } = await getConfig(wallet);
      const tokenAccounts = await connection.getParsedTokenAccountsByOwner(wallet, { mint: TOKEN_MINT });
      if (tokenAccounts.value.length === 0) 
      {
        callback(67);
      } 
      else 
      {
        const balance = tokenAccounts.value[0].account.data.parsed.info.tokenAmount.uiAmount;
        callback(balance);
      }
  } catch (error) 
  {
      alert(error.message);
      console.error("Error getting token balance:", error);
      callback(68);
      return;
  }
}

function toDate(timestamp) 
{
    if (timestamp.toString().length === 10) 
    {
      timestamp *= 1000;
    }
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}




async function postData(url, data) {
  let result = await getCookie("accessToken");
  alert(JSON.stringify(result));
  data = JSON.stringify(data);
  try {
    const response = await fetch(apiUrl+url, {
      method: 'POST', // HTTP method
      headers: {
        'Content-Type': 'application/json', 
      },
      credentials: "include", 
      body: data,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json(); 
    return result;
  } catch (error) {
    console.error('Error posting data:', error);
    return {status:"error", message:error.message}
  }
}


function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
}



function isTokenExpired(token) {
  if (!token) return true;
  const now = Date.now() / 1000;
  return token.exp < now;
}


function decodeJWT(token) {
  try {
    const payload = token.split('.')[1];
    const decoded = atob(payload);
    return JSON.parse(decoded);
  } catch (e) {
    console.error("Invalid token", e);
    return null;
  }
}


const signOut=async()=>{

    const url = apiUrl+"/api/auth/token";

  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: "include", 
    });
    const result = await response.json(); 
    return result;
  } catch (error) {
    console.error('Error posting data:', error);
    return {status:"error", message:error.message}
  }  
};


async function getNewAccessToken() 
{
  try 
  {
    const response = await fetch(apiUrl+"/api/auth/token", 
    {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: "include", 
        body: ""
    });

    if (!response.ok) { return { status:"error", statusCode:403 }; }

    const result = await response.json();

    return  {...result, status:"success", statusCode:200 };

  } 
  catch (error) 
  {
    console.error('Error posting data:', error);
    return {status:"error", statusCode:0, message:error.message}
  }
}



const checkToken=async()=> {

  const atoken = getCookie("accessToken");
  
  const data = decodeJWT(atoken);
  const b = isTokenExpired(data);
  if(b) 
  {
    const result = await getNewAccessToken();
    if(result.statusCode==200) 
    {
        const atoken = getCookie("accessToken");
        const data = decodeJWT(atoken);
        const _b = isTokenExpired(data);     
        if(_b) 
        { 
          return { status:"success", statusCode:403 }; 
        } 
        else 
        {
          return { status:"success", statusCode:200 };
        }
    } 
    else 
    {
      return { status:"error", statusCode:403 }
    }
  } 
  else 
  {
    return { status:"success", statusCode:200 };
  }
}





async function getData(url) 
{
  
  const result  = await checkToken();
    
  if(result.statusCode != 200) { 
    return result; 
  }
  try {
    const response = await fetch(apiUrl+url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: "include", 
    });


    if(!response.ok) 
    {
        return {status:"error",  statusCode:response.status, message:"Falied to authenticate"}
    }
    const result = await response.json();
    
    return {data:result, status:"success", statusCode:200};
  } 
  catch (error) 
  {
    console.error('Error posting data:', error);
    return {status:"error", statusCode:0, message:error.message}
  }
}


function getOrdinalSuffix(n) 
{
  const remainder10 = n % 10;
  const remainder100 = n % 100;
  if (remainder100 >= 11 && remainder100 <= 13) {
    return 'th';
  }
  switch (remainder10) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
}

const round=(val)=>{
   return Math.round(1000*val)/1000;
}


function toNaturalFormat(isoDate) {
  const date = new Date(isoDate);
  
  const options = {
    year: 'numeric',
    month: 'long', // e.g., June
    day: 'numeric',
    // hour: '2-digit',
    // minute: '2-digit',
    // second: '2-digit',
    // hour12: true, // for AM/PM format
 };

  return date.toLocaleString(undefined, options); // use user's local time zone
}



function toDHM(seconds) {
  const days = Math.floor(seconds / (24 * 60 * 60));
  seconds %= 24 * 60 * 60;

  const hours = Math.floor(seconds / 3600);
  seconds %= 3600;

  let output = "";

  if(days>0) { 
    output += days+" days";
     return output;
  }
  
  if(hours>0 && days>0) { output += ", " }
  if(hours>0) { output += ""+hours+" hrs" }

  return output;
}

export { 
    PROGRAM_ID, 
    TOKEN_MINT, 
    STAKING_POOL, 
    POOL_TOKEN_ACCOUNT, 
    TOKEN_PROGRAM_ID, 
    TOKEN_NAME, 
    getConfig, 
    getTokenAccount, 
    toPeriod, 
    getSolanaTimestamp, 
    getTokenBalance,
    round,
    apiUrl,
    configAccount,
    postData,
    getData,
    toDate,
    toNaturalFormat,
    toDHM,
    signOut,
    getOrdinalSuffix
};