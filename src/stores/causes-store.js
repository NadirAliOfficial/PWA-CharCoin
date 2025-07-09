
import { create } from "zustand";


export const useCausesStore = create((set) => ({
  tabs: [],
  setTabs: (_tabs) => set({ tabs: _tabs }),

  news: [],
  setNews: (_news) => set({ news: _news }),


  activeTab: 0,
  setActiveTab: (index) => set({ activeTab: index }),

  activityChartData: [
    { date: "Jan", value: 10 },
    { date: "Feb", value: 15 },
    { date: "Mar", value: 7 },
    { date: "Apr", value: 20 },
    { date: "May", value: 12 },
  ],

  chartTabs: [
    { id: "donations", label: "Donations" },
    { id: "stakingValue", label: "Staking Value" },
    { id: "marketValue", label: "Market Value" },
  ],
  activeChartTab: "donations",
  chartData: [
    { month: "Jan", donations: 15000, stakingValue: 20000, marketValue: 18000 },
    { month: "Feb", donations: 20000, stakingValue: 22000, marketValue: 21000 },
    { month: "Mar", donations: 25000, stakingValue: 24000, marketValue: 26000 },
    { month: "Apr", donations: 30000, stakingValue: 28000, marketValue: 31000 },
    { month: "May", donations: 35000, stakingValue: 34000, marketValue: 37000 },
    { month: "Jun", donations: 32000, stakingValue: 36000, marketValue: 39000 },
    { month: "Jul", donations: 35000, stakingValue: 38000, marketValue: 40000 },
    { month: "Aug", donations: 45000, stakingValue: 41000, marketValue: 42000 },
    { month: "Sep", donations: 48000, stakingValue: 45000, marketValue: 47000 },
    { month: "Oct", donations: 65000, stakingValue: 50000, marketValue: 52000 },
    { month: "Nov", donations: 75000, stakingValue: 55000, marketValue: 54000 },
    { month: "Dec", donations: 90000, stakingValue: 60000, marketValue: 56000 },
  ],
  setActiveChartTab: (tabId) => set({ activeChartTab: tabId }),
  cards: [],
  setCards: (_data) => set({ cards: _data }),

  cardData: {
    totalPoints: 0,
    myVotes: 0,
  },

  carouselItems:[],


  statistics:{},
  setCausesData: (_data) => set({ statistics: _data }),

  causesVideoCards: [],
  setCausesVideoCards: (_causesVideoCards) => set({ causesVideoCards: _causesVideoCards }),
  alertMessage: "You can vote once per month, contributing <b>2,345 points</b> (one per token in staking) to your chosen cause. <b>Learn more about the voting process.</b>",
}));