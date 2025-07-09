
import { getOrdinalSuffix  } from '@/components/const'

const TopTierWallets=({topTierWallets})=>{

    if(!topTierWallets) return <></>

    return (
        <div className="bg-background p-6 py-10 flex-1 h-fit rounded-lg">
          <h2 className="text-lg font-medium text-primary mb-4">Top Tier Wallets</h2>
          <p className="text-gray-300 text-xs mb-3">
              The 10 most active wallets of the month/year earn exclusive perks and rewards. 
              Check the real-time leaderboard—prizes are automatically distributed on the 
              last day of each month.
          </p>
          <div className="space-y-5">
            {topTierWallets && topTierWallets.length>0 ? topTierWallets.map((topWallet, index) => (
              <div key={topWallet.id} className="flex items-center my-2 py-3 gap-4">
                <div className="flex items-start min-w-[40px]">
                  <span className="text-xl font-bold text-primary mr-0.5">
                    {index+1} 
                  </span>
                  <span className='text-xs text-gray-300'>{getOrdinalSuffix(index+1)}</span>
                </div>
                <div className="space-y-1 min-w-0">
                  <div className="flex gap-2 text-xs text-gray-400">
                    <span>{topWallet.name}</span> 
                    <span> / </span>
                    <span>Volume: ${topWallet.volume}</span>
                    <span> / </span>
                    <span>Winning: {topWallet.winnings}</span>
                  </div>
                  <div className="text-primary text-sm font-mono truncate">
                      {topWallet.wallet.slice(0, 20)} 
                      .... 
                      {topWallet.wallet.slice(topWallet.wallet.length-15, topWallet.wallet.length)}
                  </div>                  
                </div>
              </div>
            )) : null }
          </div>
        </div>
    )
}


export default TopTierWallets;