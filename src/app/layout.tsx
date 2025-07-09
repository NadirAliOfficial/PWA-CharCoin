"use client"
import ProgressProvider from "@/components/custom/progress-provider";
import { SplashScreen } from "@/components/splash/screen";
import { ThemeProvider } from "@/components/theme-provider";
import {  Poppins } from "next/font/google";
import localFont from "next/font/local";
import { Suspense } from "react";
import { Toaster } from "sonner";
import { Toaster as ToasterShadcn } from "@/components/ui/toaster"
import "./globals.css";


import {  WalletProvider, ConnectionProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import '@solana/wallet-adapter-react-ui/styles.css';
import { useMemo } from 'react';
import { clusterApiUrl } from '@solana/web3.js';


const wfVisualSans = localFont({
  src: [
    {
      path: "../fonts/wf-visual-sans/WFVisualSans-Black.woff2",
      weight: "900",
      style: "normal",
    },
    {
      path: "../fonts/wf-visual-sans/WFVisualSans-BlackItalic.woff2",
      weight: "900",
      style: "italic",
    },
    {
      path: "../fonts/wf-visual-sans/WFVisualSans-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/wf-visual-sans/WFVisualSans-BoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
    {
      path: "../fonts/wf-visual-sans/WFVisualSans-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/wf-visual-sans/WFVisualSans-SemiBoldItalic.woff2",
      weight: "600",
      style: "italic",
    },
    {
      path: "../fonts/wf-visual-sans/WFVisualSans-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/wf-visual-sans/WFVisualSans-MediumItalic.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "../fonts/wf-visual-sans/WFVisualSans-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/wf-visual-sans/WFVisualSans-RegularItalic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../fonts/wf-visual-sans/WFVisualSans-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/wf-visual-sans/WFVisualSans-LightItalic.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "../fonts/wf-visual-sans/WFVisualSans-ExtraLight.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../fonts/wf-visual-sans/WFVisualSans-ExtraLightItalic.woff2",
      weight: "200",
      style: "italic",
    },
    {
      path: "../fonts/wf-visual-sans/WFVisualSans-Thin.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../fonts/wf-visual-sans/WFVisualSans-ThinItalic.woff2",
      weight: "100",
      style: "italic",
    },
  ],
  variable: "--font-wfsans",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});


export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) 
{

  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);


  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${wfVisualSans.className} antialiased`}
      >


    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
            <Suspense fallback={<SplashScreen />}>
                  <ProgressProvider>
                    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
                    
                      {children}
                    </ThemeProvider>
                  </ProgressProvider>
                  <Toaster />
                  <ToasterShadcn />
            </Suspense>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>

      </body>
    </html>
  );
}
