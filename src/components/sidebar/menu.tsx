"use client";

import { Ellipsis } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { CollapseMenuButton } from "@/components/sidebar/collapse-menu-button";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getMenuList } from "@/lib/menu-list";
import { cn } from "@/lib/utils";
import { Logout } from "@mynaui/icons-react";
import { signOut } from "@/components/const";

import { useRouter } from 'next/navigation';

interface MenuProps {
  isOpen: boolean | undefined;
}

export function Menu({ isOpen }: MenuProps) {
  const pathname = usePathname();
  const menuList = getMenuList();
  const router = useRouter();

  return (
    <ScrollArea className="[&>div>div[style]]:!block  ">
      <nav className="mt-2 px-2  h-full w-full">
        <ul className="flex flex-col min-h-[calc(100vh-48px-36px-16px-40px)] lg:min-h-[calc(100vh-32px-40px-60px)] items-start space-y-1 px-2">
          {menuList.map(({ groupLabel, menus }, index) => (
            <li className={cn("w-full", groupLabel ? "pt-5" : "")} key={index}>
              {(isOpen && groupLabel) || isOpen === undefined ? (
                <p className="text-sm font-medium text-muted-foreground px-4 pb-2 max-w-[248px] truncate">
                  {groupLabel}
                </p>
              ) : !isOpen && isOpen !== undefined && groupLabel ? (
                <TooltipProvider>
                  <Tooltip delayDuration={100}>
                    <TooltipTrigger className="w-full">
                      <div className="w-full flex justify-center items-center">
                        <Ellipsis className="h-5 w-5" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>{groupLabel}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <p className="pb-2"></p>
              )}
              {menus.map(
                ({ href, label, icon: Icon, active, submenus }, index) =>
                  !submenus || submenus.length === 0 ? (
                    <div className="w-full" key={index}>
                      <TooltipProvider disableHoverableContent>
                        <Tooltip delayDuration={100}>
                          <TooltipTrigger asChild>
                            <Button
                              variant={"ghost"}
                              className={cn(
                                "w-full  font-normal border-transparent h-auto group mb-1  hover:border-primary  hover:bg-slate-500 hover:text-primary    justify-start  ",
                                (active === undefined &&
                                  pathname.startsWith(href)) ||
                                  active
                                  ? "border-primary     bg-primary/10 !fill-primary   !text-primary"
                                  : ""
                              )}
                              asChild
                            >
                              <Link href={href} className="flex">
                                <span
                                  className={cn(isOpen === false ? "" : "mr-4")}
                                >
                                  <Icon className="!w-6 !h-6" />
                                  {/* <LazySvg name={Icon} width={20} height={20} /> */}
                                </span>
                                <p
                                  className={cn(
                                    "max-w-[200px] truncate",
                                    isOpen === false
                                      ? "-translate-x-96 opacity-0"
                                      : "translate-x-0 opacity-100"
                                  )}
                                >
                                  {label}
                                </p>
                              </Link>
                            </Button>
                          </TooltipTrigger>
                          {isOpen === false && (
                            <TooltipContent side="right">
                              {label}
                            </TooltipContent>
                          )}
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  ) : (
                    <div className="w-full" key={index}>
                      <CollapseMenuButton
                        icon={Icon}
                        label={label}
                        active={
                          active === undefined
                            ? pathname.startsWith(href)
                            : active
                        }
                        submenus={submenus}
                        isOpen={isOpen}
                      />
                    </div>
                  )
              )}
            </li>
          ))}
          <hr className="my-4" />
          <TooltipProvider disableHoverableContent>
            <Tooltip delayDuration={100}>
              <TooltipTrigger asChild>
                <Button
                  variant={"ghost"}
                  className={cn(
                    "w-full  font-normal border-transparent group mb-1  hover:border-primary   hover:bg-slate-500 hover:text-primary    justify-start  "
                  )}
                  onClick={async () => {
                    const result = await signOut();
                    alert(JSON.stringify(result));
                    router.push('/login')
                  }}
                >
                  <span className={cn(isOpen === false ? "" : "mr-4")}>
                    <Logout className="!w-5 !h-5" />
                    {/* <LazySvg name={Icon} width={20} height={20} /> */}
                  </span>
                  <p
                    className={cn(
                      "max-w-[200px] truncate",
                      isOpen === false
                        ? "-translate-x-96 opacity-0"
                        : "translate-x-0 opacity-100"
                    )}
                  >
                    Logout
                  </p>
                </Button>
              </TooltipTrigger>
              {isOpen === false && (
                <TooltipContent side="right">Logout</TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        </ul>
      </nav>
    </ScrollArea>
  );
}
