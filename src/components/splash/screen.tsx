import Image from "next/image";

const SplashScreen = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center ">
      <Image
        alt="Charcoin"
        src={"/logo.svg"}
        className="w-64"
        width={376}
        height={115}
      />
    </div>
  );
};

export { SplashScreen };
