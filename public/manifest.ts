import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Charcoin - Solana NFT Marketplace Coin',
    short_name: 'Charcoin',
    description: 'A progress web app to charcoin NFT marketplace',
    start_url: '/',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#fff',
   
  }
}