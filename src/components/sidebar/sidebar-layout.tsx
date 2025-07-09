"use client";

import { Sidebar } from "@/components/sidebar/sidebar";
import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/stores/sidebar-store";
import { Navbar } from "./navbar";

export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sidebar = useSidebarStore();

  if (!sidebar) return null;
  const { getOpenState, settings } = sidebar;
  return (
    <>
      <Sidebar />
      <main
        className={cn(
          "min-h-screen bg-custom-slate      transition-[margin-left] ease-in-out duration-300 max-lg:!ml-0",
          !settings.disabled && (!getOpenState() ? "ml-[88px] " : "ml-72")
        )}
      >
        <Navbar />

        <div className="p-4 max-md:p-0  min-h-screen max-w-[1680px] mx-auto ">
          {children}
        </div>
      </main>
      {/* <footer
        className={cn(
          "transition-[margin-left] ease-in-out duration-300",
          !settings.disabled && (!getOpenState() ? "lg:ml-[90px]" : "lg:ml-72")
        )}
      ></footer> */}
    </>
  );
}
