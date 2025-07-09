// store.ts
import { create } from "zustand";

type RewardsStore = {
  topTierWallets: Array<{ id: number; address: string; volume: string; winnings: string }>;
  charityLotteryWinners: Array<{ id: number; address: string; won: string }>;
  stakeAmount: number; // <-- add this
  withdrawalAmount: number; // <-- add this
  setStakeAmount: (amount: number) => void; // <-- add this
  setWithdrawalAmount: (amount: number) => void; // <-- add this
  addTopTierWallet: (wallet: { id: number; address: string; volume: string; winnings: string }) => void;
  addCharityLotteryWinner: (winner: { id: number; address: string; won: string }) => void;
  [key: string]: any;
};



export const useRewardsStore = create<RewardsStore>((set) => ({


  topTierWallets: [],
  setTopTierWallets: (_topTierWallets:Array<{ id: number; address: string; volume: string; winnings: string }>) => set({ topTierWallets: _topTierWallets }),
  charityLotteryWinners: [],
  setCharityLotteryWinners: (_charityLotteryWinners:Array<{ id: number; address: string; won: string }>) => set({ charityLotteryWinners: _charityLotteryWinners }),

  stakings:[],
  setStakings: (_stakings:any) => set({ stakings: _stakings }),
  
  refresh:false,
  setRefresh: (_status:any) => set({ setRefresh: _status }),

  stakeAmount: 0, // <-- initial value
  withdrawalAmount: 0, // <-- initial value
  tokenBalance:0,
  setTokenBalance: (_amount:any) => set({ tokenBalance: _amount }),

  stakedAmount:0,
  setStakedAmount: (_amount:any) => set({ stakedAmount: _amount }), 

  reward:0,
  setReward: (_value:any) => set({reward: _value }),

  tokenValue:0,

  setStakeAmount: (amount) => set({ stakeAmount: amount }), // <-- function to set stakeAmount
  setWithdrawalAmount: (amount) => set({ withdrawalAmount: amount }), // <-- function to set withdrawalAmount
  
  addTopTierWallet: (wallet) =>
    set((state) => ({
      topTierWallets: [...state.topTierWallets, wallet],
    })),

  addCharityLotteryWinner: (winner) =>
    set((state) => ({
      charityLotteryWinners: [...state.charityLotteryWinners, winner],
    })),

    period: null,

    setPeriod: (period: string) => set({ period }),


}));
