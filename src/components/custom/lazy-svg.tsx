"use client";
import { ComponentProps } from "react";

import dynamic from "next/dynamic";

interface LazySvgProps extends ComponentProps<"svg"> {
  name: string;
}

export const LazySvg = ({ name, ...props }: LazySvgProps) => {
  const Svg = dynamic(() => import(`public/${name}.svg`));

  return <Svg {...props} />;
};
