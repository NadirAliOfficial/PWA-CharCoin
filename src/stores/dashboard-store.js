import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Create the dashboard store with persistence
const useDashboardStore = create(



        
  persist(
    (set) => ({

        tokenBalance: 0,
        marketValue: 0,
        recentUp: 0,
        recentDonation: 0,
        globalDonation: 0,
        usdBalance: 0,
        myTotalStaked: 0,
        causesSupported: 0,
        totalVolume: 0,
        totalTransactions: 0,
        canVoteAmount:22, 
        canWithdrawAmount:2,
        donatedSoFar:232432,
        causesSupported:4,
        projectsSupported:12,        
        winningCause: {
          title: "Clear Water for All children in Africa",
          points: 11,
          image: "/images/winning-cause.png"
        },

        lastNft: {
          title: "The NFT will be randomly awarded to one of the currently staking wallets.",
          releaseDate: "12 June 2025",
          image: "/images/nft-of-the-month.png"
        },
        nextNft:{
          title: "The NFT will be randomly awarded to one of the currently staking wallets.",
          releaseDate: "12 June 2025",
          image: "/images/nft-of-the-month.png"
        },
        totalStaked:1247398,
        user:{
          name: "",
          username: "",
          wallet: "",
          joining_date: "2025-06-16T20:12:23:234"
        },
        
        // { myTotalStaked, marketValue, causesSupported, projectsSupported, toBalance }
        
      setTokenBalance: (balance) => set({ tokenBalance: balance }),
      
      setMarketValue: (value) => set({ marketValue: value }),

      setAllValues: (data) =>  set({
                recentUp: data.recentUp,
                recentDonation: data.recentDonation,
                marketValue: data.marketValue,
                globalDonation: data.globalDonation,
                tokenBalance: data.tokenBalance,
                usdBalance: data.usdBalance,
                myTotalStaked: data.myTotalStaked,
                causesSupported: data.causesSupported,
                totalVolume: data.totalVolume,
                totalTransactions: data.totalTransactions,
                winningCause: data.winningCause,
                nextNft: data.nextNft,
                lastNft: data.lastNft,
                totalStaked:data.totalStaked,
                canVoteAmount:data.canVoteAmount, 
                canWithdrawAmount:data.canWithdrawAmount,   
                donatedSoFar:data.donatedSoFar,
                causesSupported:data.causesSupported,
                projectsSupported:data.projectsSupported,                 
                user:data.user
      }),
      setTotalDonation: (value) => set({ totalDonation: value }),
      setTotalCauses: (value) => set({ totalCauses: value }),
      setTotalVolume: (value) => set({ totalVolume: value }),
      setTotalTransactions: (value) => set({ totalTransactions: value }),

      setSolBalance: (balance) => set({ solBalance: balance }),
      setUsdBalance: (balance) => set({ usdBalance: balance }),
      
      setRecentUp: (value) => set({ recentUp: value }),
      setRecentDonation: (value) => set({ recentDonation: value }),
      setGlobalDonation: (value) => set({ globalDonation: value }),
      resetBalances: () => set({ tokenBalance: 0, solBalance: 0 }),
    }),
    {
      name: 'dashboard-storage',
    }
  )
)

export default useDashboardStore
