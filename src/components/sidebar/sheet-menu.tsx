import { MenuIcon } from "lucide-react";

import { Menu } from "@/components/sidebar/menu";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/stores/sidebar-store";
import { BrandTelegram, BrandTwitter } from "@mynaui/icons-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import LogoImage from "../custom/logo-image";

export function SheetMenu() {
  const sidebar = useSidebarStore();
  if (!sidebar) return null;
  const { isOpen, setIsOpen, getOpenState, setIsHover, settings } = sidebar;

  return (
    <Sheet >
      <SheetTrigger className="lg:hidden" asChild>
        <MenuIcon className="!w-6 !h-6 " />
      </SheetTrigger>
      <SheetContent className="sm:w-72 px-3 h-full flex flex-col" side="left">
        <SheetHeader>
          <VisuallyHidden>
            <SheetTitle>Menu</SheetTitle>
          </VisuallyHidden>
        </SheetHeader>
        <div
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          className="relative h-full flex flex-col  gap-4   overflow-y-auto ">
          <Button
            className={cn("transition-transform ease-in-out duration-300 mb-1",
              !getOpenState() ? "translate-x-1" : "translate-x-0"
            )} variant="link" asChild>
            <LogoImage className="mt-4" width={120} />
          </Button>
          <hr className="mx-4" />
          <Menu isOpen />
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
      </SheetContent>
    </Sheet>
  );
}
