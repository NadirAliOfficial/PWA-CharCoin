"use client";
import LogoImage from "@/components/custom/logo-image";
import { Button } from "@/components/ui/button";
import { formatNumberWithOrdinal, getOrdinalSuffix } from "@/lib/helper";
import { cn } from "@/lib/utils";
import {
  ArrowDiagonalTwo,
  BrandTelegram,
  BrandTwitter,
  ChartGraph,
  HeartCircle,
  Home as HomeIcon,
  Menu,
  X,
} from "@mynaui/icons-react";
import { useWallet } from "@solana/wallet-adapter-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="grid grid-cols-[2px,_1fr,_2px,_1fr,_2px,_1fr] max-md:grid-cols-[2px,_1fr] mx-auto max-w-7xl px-4 py-4 gap-8">
        <div className="flex flex-col w-[2px] sticky top-10 h-[calc(100vh-120px)] gap-4 items-center">
          <div className="w-full min-h-40 h-full bg-foreground rounded-xl" />
          <BrandTwitter className="shrink-0" />
          <BrandTelegram className="shrink-0" />
        </div>
        <SectionOne />
        <div className="bg-custom-light_text max-md:opacity-0" />
        <SectionTwo />
        <div className="bg-custom-light_text max-md:opacity-0" />
        <SectionThird />
      </div>
    </div>
  );
};

const Navbar = () => {
  const { publicKey } = useWallet();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter()

  return (
    <div className="flex justify-between px-4 max-w-7xl mx-auto py-4 gap-4 relative">
      <div>
        <LogoImage width={100} />
      </div>
      <div className="flex items-center gap-10 max-md:hidden">
        <Link href={"/"} className="hover:underline hover:text-primary text-xs">
          The Coin
        </Link>
        <Link href={"/"} className="hover:underline hover:text-primary text-xs">
          The Causes
        </Link>
        <Link href={"/"} className="hover:underline hover:text-primary text-xs">
          How it works?
        </Link>
        <Button onClick={() => router.push("/login")}>Access Account</Button>
      </div>
      <Button

        variant={"newly_secondary"}
        size={"xs"}
        className="hidden max-md:flex"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>
      {isMenuOpen && (
        <div className="absolute top-full z-50 left-0 w-full bg-background  shadow-lg p-4 flex flex-col gap-4 max-md:flex">
          <Link
            href={"/"}
            className="block hover:underline hover:text-primary text-xs"
          >
            The Coin
          </Link>
          <Link
            href={"/"}
            className="block hover:underline hover:text-primary text-xs"
          >
            The Causes
          </Link>
          <Link
            href={"/"}
            className="block hover:underline hover:text-primary text-xs"
          >
            How it works?
          </Link>
          <Button onClick={() => router.push("/login")}>Access Account</Button>

        </div>
      )}
    </div>
  );
};

const SectionOne = () => {
  const cards = [
    {
      icon: HeartCircle,
      title: "$1,420",
      description: "Donated so far",
      bgColor: "bg-custom-card-01",
    },
    {
      icon: HomeIcon,
      title: "4",
      description: "Causes supported",
      bgColor: "bg-custom-card-02",
    },
    {
      icon: ChartGraph,
      title: "$142K",
      description: "Total volume",
      bgColor: "bg-custom-card-03",
    },
    {
      icon: ArrowDiagonalTwo,
      title: "181",
      description: "Total transactions",
      bgColor: "bg-custom-card-04",
    },
  ];

  return (
    <div className="flex flex-col gap-4 py-8">
      <h1 className="text-3xl font-bold uppercase">
        Every Transaction MATTERS
      </h1>
      <p className="text-sm">
        With CHAR Coin, 1% of every transaction supports global charities— every
        trade makes an impact!
      </p>
      <Button className="w-max">Latest impact report</Button>
      <div className="grid grid-cols-2 max-md:grid-cols-1 gap-4 mt-4">
        {cards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={index}
              className={cn(
                "rounded-xl text-black flex justify-center py-10 items-center flex-col gap-4",
                card.bgColor
              )}
            >
              <Icon className="w-10 h-10" />
              <div className="flex flex-col gap-1 text-center">
                <div className="text-2xl font-bold">{card.title}</div>
                <p className="text-xs">{card.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const SectionTwo = () => {
  const cards = [
    {
      image: "/board.svg",
      label: "Clean water in Guatemala’s most affected community",
      points: 23345,
    },
    {
      label: "Public school building in Nicaragua",
      points: 172200,
    },
    {
      label: "Malnutrition fight in El Congo",
      points: 144875,
    },
    {
      label: "Aid Supply for Chile’s 7.8 earthquake",
      points: 10458,
    },
    {
      label: "Flu vaccines in Haití’s most affected zone",
      points: 7745,
    },
    ,
  ];
  return (
    <div className="flex flex-col gap-4 py-8">
      <div className="flex flex-col gap-4 py-8">
        <h1 className="text-3xl font-bold uppercase">OPEN now FOR VOTING</h1>
        <p className="text-custom-light_text">
          Vote for your favorite causes! Only staked tokens can vote. Voting
          runs from the 1st to the 20th of each month.
        </p>
        <Button className="w-max">Vote now</Button>
        {cards.map((card, index) => {
          return (
            <div
              key={index}
              className={cn(
                "rounded-xl hover:bg-secondary hover:text-primary flex p-5 cursor-pointer  items-stretch  gap-4 "
              )}
            >
              <h2 className="flex justify-start">
                <p className="text-xl">{index + 1}</p>
                {getOrdinalSuffix(index + 1)}
              </h2>
              {card?.image && (
                <div
                  className=" aspect-[3/4] w-24 rounded-xl"
                  style={{ backgroundImage: `url(${card?.image})` }}
                ></div>
              )}
              <div className="flex flex-col gap-1 ">
                <div> {card?.label} </div>
                <p className="text-custom-light_text text-xs">
                  {formatNumberWithOrdinal(card?.points || 0)} points
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const SectionThird = () => {
  const cards = [
    {
      header: "Staking",
      label:
        "Earn impressive passive rewards by holding and staking CHAR Coin in your wallet.",
    },
    {
      header: "Top Tier Wallets",
      label:
        "The 10 most active wallets of the month/year get exclusive perks and rewards.",
    },
    {
      header: "Lucky Wallets",
      label:
        "10 random wallets with transactions in the month/year win surprise rewards.",
    },
    {
      header: "Unique NFT Collections",
      label:
        "Own exclusive CHAR-themed NFTs with unique utilities! A new limited-edition NFT is revealed each month and randomly gifted to holders.",
    },
    {
      header: "Token valuation",
      label:
        "Stay informed with real-time market value and performance insights—watch your investment grow alongside the token and its community.",
    },
    {
      header: "Global and local events",
      label:
        "Compete in worldwide and country-specific challenges for exciting rewards!",
    },
  ];
  return (
    <div className="flex flex-col gap-4 py-8">
      <h1 className="text-3xl font-bold uppercase">Token as investment</h1>
      <p className="text-custom-light_text">
        CharCoin offers multiple ways to earn: staking, NFTs, rewards,
        lotteries, and more. All while anonymously supporting causes.
      </p>
      <Button className="w-max">How do I earn?</Button>
      {cards.map((card, index) => {
        return (
          <div
            key={index}
            className={cn(
              "rounded-xl hover:bg-secondary hover:text-primary flex p-5 py-3 cursor-pointer  items-stretch  gap-4 "
            )}
          >
            <div className="flex flex-col gap-1 ">
              <div className="text-sm"> {card?.header} </div>
              <p className="text-custom-light_text text-xs">{card?.label}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
