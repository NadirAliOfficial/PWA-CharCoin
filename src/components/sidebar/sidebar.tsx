"use client";
import { Menu } from "@/components/sidebar/menu";
// import { SidebarToggle } from "@/components/sidebar/sidebar-toggle";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/stores/sidebar-store";
import { BrandTelegram, BrandTwitter } from "@mynaui/icons-react";
import LogoImage from "../custom/logo-image";
import { SidebarToggle } from "./sidebar-toggle";

export function Sidebar() {
  const sidebar = useSidebarStore();
  if (!sidebar) return null;
  const { isOpen, toggleOpen, getOpenState, setIsHover, settings } = sidebar;
  return (
    <aside
      className={cn(
        "fixed top-0 left-0 z-20 h-screen       -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300",
        !getOpenState() ? "w-[88px] " : "w-72",
        settings.disabled && "hidden"
      )}
    >

      <SidebarToggle isOpen={isOpen} setIsOpen={toggleOpen} />
      
      <div
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className="relative h-full flex flex-col  gap-4   overflow-y-auto "
      >
        <Button
          className={cn(
            "transition-transform ease-in-out duration-300 mb-1",
            !getOpenState() ? "translate-x-1" : "translate-x-0"
          )}
          variant="link"
          asChild
        >
          <LogoImage className="mt-4" width={120} />
        </Button>
        <hr className="mx-4" />
        <Menu isOpen={getOpenState()} />
        {isOpen && (
          <div className="flex gap-4 mx-4 py-2 mb-4  flex-col">
            <hr />
            <div className="flex gap-4 flex-col px-4">
              <span className="text-slate text-sm">
                Follow only the official channels
              </span>
              <span className="flex gap-4">
                <BrandTelegram className="w-6 h-6 hover:text-primary" />
                <BrandTwitter className="w-6 h-6 hover:text-primary" />
              </span>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
