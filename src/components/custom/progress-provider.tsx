"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

const ProgressProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <ProgressBar
        height="6px"
        color="linear-gradient(hsla(258, 75%, 80%, 1), hsla(173, 100%, 61%, 1))" // Light to dark gradient
        options={{}}
        shallowRouting
      />
    </>
  );
};

export default ProgressProvider;
