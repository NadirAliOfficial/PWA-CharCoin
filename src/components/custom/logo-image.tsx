import { cn } from "@/lib/utils";
import Image from "next/image";

const LogoImage = ({
  width = 376,
  className,
}: {
  width?: number;
  className?: string;
}) => {
  const aspectRatio = 376 / 115;

  return (
    <div className={cn("flex items-center  justify-center", className)}>
      <Image
        alt="Charcoin"
        src="/logo.svg"
        width={width}
        height={width / aspectRatio}
        className="h-auto"
      />
    </div>
  );
};

export default LogoImage;
