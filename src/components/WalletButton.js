"use client"
import dynamic from 'next/dynamic';
import React from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const WalletButton = () => <><WalletMultiButton /></>;

export default dynamic(() => Promise.resolve(WalletButton), {
  ssr: false,
});

