import { cn } from "@/lib/utils";
import Link from "next/link";

const LogoImage = ({
  width = 376,
  className,
}: {
  width?: number;
  className?: string;
}) => {
  const aspectRatio = 376 / 115;

  return (
    <Link href="/" className={cn("flex items-center  justify-center", className)}>
      <img
        alt="Charcoin"
        src="/logo.svg"
        width={width}
        height={width / aspectRatio}
        className="h-auto"
      />
    </Link>
  );
};

export default LogoImage;
