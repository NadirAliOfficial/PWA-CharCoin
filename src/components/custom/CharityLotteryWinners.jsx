const CharityLotteryWinners=({charityLotteryWinners})=>
{

    if(!charityLotteryWinners) return <></>
    
    return (
        <div className="bg-background flex-1 p-6 py-10 h-fit rounded-lg">
          <h2 className="text-lg text-primary font-medium mb-4">Charity Lottery</h2>
          <p className="text-gray-300 text-xs mb-3">
              Each month, 10 randomly selected wallets that used CHAR Coin receive an 
              exclusive reward, with winners announced on the last day of the month and
               prizes automatically distributed.  Check out the winners from last month.            
          </p>
          <div className="space-y-5">
            {charityLotteryWinners && charityLotteryWinners.length > 0 ? charityLotteryWinners.map((winner, index) => (
              <div key={winner?.id} className="flex my-2 py-3  items-center gap-4">

                <div className="space-y-1 min-w-0">
                  <div className="flex gap-2 text-xs text-gray-400">
                    <span>{winner?.name}</span>
                    <span> / </span>
                    <span>Won: ${winner?.won}</span>
                  </div>
                  <div className="text-primary text-sm font-mono truncate">
                      {winner?.wallet.slice(0, 20)} 
                      .... 
                      {winner?.wallet.slice(winner.wallet.length-15, winner.wallet.length)}
                  </div>
                </div>


              </div>
            )) : null}
          </div>
        </div>
    );
}


export default CharityLotteryWinners;