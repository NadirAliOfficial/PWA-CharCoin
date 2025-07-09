import {
  Confetti,
  Hash,
  HeartCircle,
  Leaves,
  UserCircle,
} from "@mynaui/icons-react";

import { Label } from "@mynaui/icons-react";

type Submenu = {
  href: string;
  label: string;
  active?: boolean;
};

type Menu = {
  href: string;
  label: string;
  active?: boolean;
  icon: any;
  submenus?: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          icon: Hash,
          submenus: [],
        },
        {
          href: "/causes",
          label: "Causes",
          icon: Leaves,
          submenus: [],
        },      
        {
          href: "/rewards",
          label: "Rewards",
          icon: Confetti,
          submenus: [],
        },
        {
          href: "/my-impact",
          label: "My Impact",
          icon: HeartCircle,
          submenus: [],
        },
        {
          href: "/account",
          label: "My Account",
          icon: UserCircle,
          submenus: [],
        },
      ],
    },
  ];
}
