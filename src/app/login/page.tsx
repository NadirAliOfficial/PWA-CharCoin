"use client";
import { ArrowLeft, Twitter } from "lucide-react";
import Link from "next/link";

import WalletButton from "@/components/WalletButton"
import Web3Login from "@/components/Web3Login"



const LoginPage = () => {
  return (
    <div className="flex min-h-screen  relative  ">
      <div className="w-5/12 max-lg:w-full  p-5">
        <Link  href="/dashboard" className="flex">
          <ArrowLeft /> 
          <span className="px-2">Dashboard</span>
        </Link>
        <div className="flex flex-col  max-w-sm gap-4 mx-auto justify-center  h-5/6 mt-4 ">
          <img
            src={"/logo.svg"}
            alt="Charcoin"
            width={376 / 2}
            height={115 / 2}
          />
          <h1>
            A global community passionate about investing while making a
            positive impact on the world.{" "}
          </h1>
          <hr />
          {/* <ConnectTo /> */}

          <div className="flex">
              <WalletButton />
              <div className="py-1 px-3">
                <Web3Login />
              </div>
          </div>


          <hr />
          <span>
            By login or joining you agree with our{" "}
            <Link className="text-primary hover:underline" href={"/"}>
            Privacy Policies
            </Link>
            ,{" "}
            <Link className="text-primary hover:underline" href={"/"}>
              GDPR and Terms and Conditions
            </Link>{" "}
            .
          </span>
        </div>
        <div className="flex gap-4  flex-col">
          <hr />
          <div className="flex justify-between px-4 items-center">
            <span className="text-slate text-sm">
              Follow only the official channels
            </span>
            <span className="flex gap-4">
              <Twitter size={24} className=" fill-background" />
              <Twitter size={24} className=" fill-background" />
            </span>
          </div>
        </div>
      </div>
      <div className="max-lg:hidden  w-full">
        <img
          src={"/feature-image.png"}
          alt="Feature Image"
          width={500}
          height={500}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="w-20 h-20 z-50 bg-primary absolute right-3 top-3"></div>
      <div className="w-20 h-20 z-50 bg-secondary absolute right-5 top-5"></div>
    </div>
  );
};

export default LoginPage;
