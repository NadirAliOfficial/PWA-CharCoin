"use client"
import dynamic from 'next/dynamic';
import React from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const ConnectWallet = ({ children }) => <><WalletMultiButton /></>;

export default dynamic(() => Promise.resolve(ConnectWallet), {
  ssr: false,
});

