// stores/useBadgeStore.ts
import { create } from 'zustand';

interface Badge {
  name: string;
  description: string;
  src: string;
}

interface BadgeStore {
  badges: Badge[];
  cta: {
    text: string;
    link: string;
  };
  setBadges: (badges: Badge[]) => void;
  setCtaText: (text: string) => void;
  setCtaLink: (link: string) => void;
  updateField: (field: string, value: any) => void;
  testFunction: () => void;
}

export const useBadgeStore = create<BadgeStore>((set) => ({
  badges: [
    {
      name: "Early Adapter",
      description: "Awarded to the first users who registered or participated in the initial voting rounds.",
      src: "/rewards/r1.svg",
    },
    {
      name: "Whale Watcher",
      description: "Earned to holders who stake or own a significant amount of CHAR Coin.",
      src: "/rewards/r2.svg",
    },
    {
      name: "Light of Impact",
      description: "Earned by users who have donated to more than 5 verified causes.",
      src: "/rewards/r3.svg",
    },
    {
      name: "DAO Influencer",
      description: "Earned by those who actively participate in governance by voting on at least 10 causes.",
      src: "/rewards/r4.svg",
    },
    {
      name: "Staking Master",
      description: "Earned by users who have kept their CHAR Coin staked for over 6 months.",
      src: "/rewards/r5.svg",
    },
    {
      name: "Transaction King",
      description: "Earned by users who have completed more than 100 transactions using CHAR Coin.",
      src: "/rewards/r6.svg",
    },
    {
      name: "Rescuer",
      description: "Earned by users who donate to emergencies detected by Chai (CHAR Coin AI).",
      src: "/rewards/r7.svg",
    },
    {
      name: "HODL Warrior",
      description: "Earned by users who hold CHAR Coin for two consecutive years without selling.",
      src: "/rewards/r8.svg",
    },
    {
      name: "Genesis Legend",
      description: "Earned by users who participated in the initial sale or airdrop of CHAR Coin.",
      src: "/rewards/r9.svg",
    },
    {
      name: "Hedgehog Holder",
      description: "Earned by users who haven't sold any CHAR Coin for an entire year.",
      src: "/rewards/r10.svg",
    },
  ],
  cta: {
    text: "Make your account wallets, balance, stats and badges public",
    link: "https://charoainq.org/wallet_profile/powersonic72",
  },

  // Setters
  setBadges: (badges) => set({ badges }),
  setCtaText: (text) => set((state) => ({ cta: { ...state.cta, text } })),
  setCtaLink: (link) => set((state) => ({ cta: { ...state.cta, link } })),
  testFunction:async()=> {
      alert(" test burn ");
  },
  // Match-case style updater
  updateField: (field, value) => {
    set((state) => {
      switch (field) {
        case 'badges':
          return { badges: value };
        case 'cta.text':
          return { cta: { ...state.cta, text: value } };
        case 'cta.link':
          return { cta: { ...state.cta, link: value } };
        default:
          console.warn(`Unknown field: ${field}`);
          return state;
      }
    });
  },
}));
