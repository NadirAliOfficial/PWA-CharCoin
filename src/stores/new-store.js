// src/stores/causes-store.ts
import { ArrowDiagonalTwo, ChartGraph, HeartCircle, Home } from "@mynaui/icons-react";
import { create } from "zustand";
// src/stores/causes-store.ts

interface ChartTab {
  id: string;
  label: string;
}

interface ChartDataPoint {
  month: string;
  donations?: number;
  stakingValue?: number;
  marketValue?: number;
}

interface CardData {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

type Tab = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
};

type CarouselItem = {
  id: any;
  title: string;
  description: string;
  image: string;
  postedDate: Date;

};

type ActivityChartDataPoint = {
  date: string;
  value: number;
};

export interface CausesState {
  // Tabs
  tabs: Tab[];
  activeTab: number;
  setActiveTab: (index: number) => void;

  // Cards
  cards: CardData[];

  // Activity Chart
  activityChartData: ActivityChartDataPoint[];

  // Statistics Chart
  chartTabs: ChartTab[];
  activeChartTab: string;
  chartData: ChartDataPoint[];
  setActiveChartTab: (tabId: string) => void;

  // Carousel
  carouselItems: CarouselItem[];

  // Alert message
  alertMessage: string;

  // for the ... 
  causesVideoCards: CardDataPoint[];
  

}


// Initial Values 
const causesCarousel: CarouselItem[] = [
  {
    id: 1,
    title: "Supplements to clean water",
    description:
      "CHAR Coin has donated 500 gallons of specialized chemicals to purify the Río Hondo in Guatemala, removing bacteria and harmful waste. In response, the community has implemented new policies for responsible river use. Watch video",
    image: "/feature-image.png?height=600&width=1200",
    postedDate: new Date(),
  },
  {
    id: 2,
    title: "Supplements to clean water",
    description:
      "CHAR Coin has donated 500 gallons of specialized chemicals to purify the Río Hondo in Guatemala, removing bacteria and harmful waste. In response, the community has implemented new policies for responsible river use. Watch video",
    image: "/feature-image.png?height=600&width=1200",
    postedDate: new Date(),
  },
  {
    id: 3,
    title: "Supplements to clean water",
    description:
      "CHAR Coin has donated 500 gallons of specialized chemicals to purify the Río Hondo in Guatemala, removing bacteria and harmful waste. In response, the community has implemented new policies for responsible river use. Watch video",
    image: "/feature-image.png?height=600&width=1200",
    postedDate: new Date(),
  },
  {
    id: 4,
    title: "Supplements to clean water",
    description:
      "CHAR Coin has donated 500 gallons of specialized chemicals to purify the Río Hondo in Guatemala, removing bacteria and harmful waste. In response, the community has implemented new policies for responsible river use. Watch video",
    image: "/feature-image.png?height=600&width=1200",
    postedDate: new Date(),
  },
];

interface CardDataPoint {
  id:number,
  label: string;
  title: string;
  image: string;
  points: number;
  videoUrl: string;
}


const causesVideoCards: CardDataPoint[] =  []

export const useCausesStore = create<CausesState>((set) => ({
  tabs: [
    {
      icon: ({ className }: { className?: string }) => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M8 3v18" />
        </svg>
      ),
      title: "All Causes",
      description: "24 active projects",
    },
    {
      icon: ({ className }: { className?: string }) => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
          <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
        </svg>
      ),
      title: "Funded Causes",
      description: "8 funded projects",
    },
    {
      icon: ({ className }: { className?: string }) => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8v4l3 3" />
        </svg>
      ),
      title: "Voting Soon",
      description: "5 upcoming",
    },
  ],
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
  cards: [
    {
      icon: HeartCircle,
      title: "$1,420",
      description: "Donated so far",
    },
    {
      icon: Home,
      title: "4",
      description: "Causes supported",
    },
    {
      icon: ChartGraph,
      title: "$142K",
      description: "Total volume",
    },
    {
      icon: ArrowDiagonalTwo,
      title: "181",
      description: "Total transactions",
    },
  ],
  cardData: {
    totalPoints: 2345,
    myVotes: 12,
  },

  causesVideoCards: causesVideoCards,
  setCausesVideoCards: (_causesVideoCards) => set({ causesVideoCards: _causesVideoCards }),
}));