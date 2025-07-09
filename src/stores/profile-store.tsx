// stores/useProfile.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type UserProfile = {
  walletAddress: string | null;
  username: string;
  totalRewards: number;
  stakedAmount: number;
  isLoading: boolean;
};

type UserProfileState = UserProfile & {
  setWalletAddress: (address: string) => void;
  setUsername: (username: string) => void;
  setTotalRewards: (amount: number) => void;
  setStakedAmount: (amount: number) => void;
  setIsLoading: (loading: boolean) => void;
  resetProfile: () => void;
};

export const useProfile = create<UserProfileState>()(
  persist(
    (set) => ({
      walletAddress: null,
      username: 'New Wallet',
      totalRewards: 0,
      stakedAmount: 0,
      isLoading: false,

      setWalletAddress: (address) => set({ walletAddress: address }),
      setUsername: (username) => set({ username }),
      setTotalRewards: (amount) => set({ totalRewards: amount }),
      setStakedAmount: (amount) => set({ stakedAmount: amount }),
      setIsLoading: (loading) => set({ isLoading: loading }),

      resetProfile: () =>
        set({
          walletAddress: null,
          username: '',
          totalRewards: 0,
          stakedAmount: 0,
          isLoading: false,
        }),
    }),
    {
      name: 'user-profile-storage', // key in localStorage
      partialize: (state) => ({
        // Persist only specific fields (omit isLoading)
        walletAddress: state.walletAddress,
        username: state.username,
        totalRewards: state.totalRewards,
        stakedAmount: state.stakedAmount,
      }),
    }
  )
);
