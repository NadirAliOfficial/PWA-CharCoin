"use client"
import SidebarLayout from "@/components/sidebar/sidebar-layout";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <SidebarLayout>{children}</SidebarLayout>;
};

export default Layout;
