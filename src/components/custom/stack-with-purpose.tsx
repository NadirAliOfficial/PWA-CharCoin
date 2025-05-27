import { ArrowRight } from "@mynaui/icons-react";
import { Button } from "../ui/button";
import { Slider } from "../ui/slider";
import Link from "next/link";

const StackWithPurpose = () => {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-lg text-primary">Staking with purpose</h1>
      <p className="text-sm text-custom-light_text">
        CHAR Coin takes the concept of a meme coin beyond speculation, offering
        real utility with a positive global impact. Through staking, you not
        only gain benefits as a holder but also become part of an ecosystem that
        funds charitable projects worldwide.
      </p>
      <div className="flex justify-between gap-4 items-end">
        <div className="flex flex-col w-full text-xs ">
          <p>Stake Tokens</p>
          <p className="text-custom-light_text mb-2 ">10,000 ($235.00)</p>
          <Slider step={1} className="my-5" />
        </div>

        <Button size={"sm"}>
          Stake tokens now <ArrowRight />
        </Button>
      </div>
      <div className="bg-background  gap-4   p-4 py-12 rounded-xl grid grid-cols-[1fr_,2px,_1fr] ">
        <span className="space-y-2 ">
          {" "}
          <div className="text-2xl">124,158</div>
          <p className="text-custom-light_text text-xs">
            Your CHAR Coin balance (CCX){" "}
          </p>
        </span>
        <hr className="min-w-[2px] h-full bg-custom-slate" />
        <span className="space-y-2">
          {" "}
          <div className="text-2xl "> $5,478.04 </div>
          <p className="text-custom-light_text text-xs">Your balance in USD </p>
        </span>
      </div>
      <hr />
      <div className="bg-background  gap-4   p-4 py-12 rounded-xl grid grid-cols-[1fr_,2px,_1fr] ">
        <span className="space-y-2 ">
          {" "}
          <div className="text-2xl">124,158</div>
          <p className="text-custom-light_text text-xs">
            Your CHAR Coin balance (CCX){" "}
          </p>
        </span>
        <hr className="min-w-[2px] h-full bg-custom-slate" />
        <span className="space-y-2">
          {" "}
          <div className="text-2xl "> $5,478.04 </div>
          <p className="text-custom-light_text text-xs">Your balance in USD </p>
        </span>
      </div>{" "}
      <div>
        <h3>Insights</h3>
        <ul className="list-disc text-custom-light_text list-inside space-y-2">
          <li>
            You currently have 2,145 tokens staked ($84.14 at today’s value).
          </li>
          <li>
            Only tokens staked for at least 15 days are eligible to generate
            points when voting for your chosen causes. At this moment, 1,123 of
            your tokens qualify for voting points.
          </li>
          <li>
            Withdrawing your staked tokens and earned rewards requires a minimum
            of 48 hours before they reflect in your balance.
          </li>
          <li>
            You have <b>2,145 tokens</b> ($84.14) eligible for withdrawal.{" "}
          </li>
          <li>
            You have <b>0 tokens</b> blocked.
          </li>
          <li> Your current estimated monthly return is approximately 15%. </li>
          <li>
            Check your
            <Link href={"/"} className="underline text-primary">
              staking history.
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex justify-between gap-4 items-end">
        <div className="flex flex-col w-full text-xs ">
          <p>Withdraw Staked Tokens</p>
          <p className="text-custom-light_text mb-2 ">500 ($24.17)</p>
          <Slider step={1} className="my-5" />
        </div>

        <Button size={"sm"}>
          Withdraw tokens <ArrowRight />
        </Button>
      </div>
    </div>
  );
};

export { StackWithPurpose };
