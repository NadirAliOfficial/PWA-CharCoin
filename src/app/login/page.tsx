import { ArrowLeft, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ConnectTo } from "@/components/ui/custom/connect-to-dialog";

const LoginPage = () => {
  return (
    <div className="flex min-h-screen  relative  ">
      <div className="w-5/12 max-lg:w-full  p-5">
        <Button variant={"newly_secondary"} className="font-bold">
          <ArrowLeft />
          Back
        </Button>
        <div className="flex flex-col  max-w-sm gap-4 mx-auto justify-center  h-5/6 mt-4 ">
          <Image
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
          <ConnectTo />
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
        {" "}
        <Image
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
