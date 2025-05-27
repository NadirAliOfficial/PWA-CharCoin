import LogoImage from "../custom/logo-image";
import { SheetMenu } from "./sheet-menu";

export function Navbar() {
  return (
    <header className="sticky flex justify-between px-8 py-4 top-0 z-10 w-full bg-background  lg:hidden">
      <LogoImage width={100} />
      <SheetMenu />
    </header>
  );
}

//  <div className="mx-4 sm:mx-8 flex h-14 items-center">
//    <div className="flex items-center space-x-4 lg:space-x-0">
//      <SheetMenu />
//      <div>
//        <h1 className="font-bold">{title}</h1>
//        <p className="text-xs text-muted-foreground/70">{description}</p>
//      </div>
//    </div>
//    <div className="flex flex-1  gap-2 items-center justify-end">
//      {/* <SearchBar /> */}
//      {/* <Notification /> */}
//      {/* <ModeToggle /> */}
//      {/* <ProfileSwitch /> */}
//      {/* <UserNav /> */}
//    </div>
//  </div>;
