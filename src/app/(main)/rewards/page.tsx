import { StackWithPurpose } from "@/components/custom/stack-with-purpose";

const RewardsPage = () => {
  return (
    <div className="mx-4 py-6 space-y-6">
      <div className=" flex justify-between gap-4">
        <h1 className="text-3xl font-bold ">Rewards</h1>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,_minmax(250px,1fr))] gap-4">
        <StackWithPurpose />
        <div className="bg-background p-6 py-10 h-fit rounded-lg">
          <h2 className="text-lg font-medium text-primary mb-4">
            Top Tier Wallets
          </h2>
          <div className="space-y-5">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="flex items-start min-w-[40px]">
                  <span className="text-3xl font-bold text-primary mr-0.5">
                    {String(i + 1).charAt(0)}
                  </span>
                  <span className="text-sm text-gray-500">
                    {String(i + 1).slice(1)}
                    {getOrdinal(i + 1)}
                  </span>
                </div>
                <div className="space-y-1 min-w-0">
                  <div className="text-primary text-sm font-mono truncate">
                    0xd7f2cg...j7H8k9L
                  </div>
                  <div className="flex gap-2 text-xs text-gray-400">
                    <span>Volume: $120,550</span>
                    <span>•</span>
                    <span>Winning: $15,230</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Charity Lottery */}
        <div className="bg-background p-6 py-10 h-fit rounded-lg">
          <h2 className="text-lg text-primary font-medium mb-4">
            Charity Lottery
          </h2>
          <div className="space-y-5">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="flex items-start min-w-[40px]">
                  <span className="text-3xl font-bold text-primary mr-0.5">
                    {String(i + 1).charAt(0)}
                  </span>
                  <span className="text-sm text-gray-500">
                    {String(i + 1).slice(1)}
                    {getOrdinal(i + 1)}
                  </span>
                </div>
                <div className="space-y-1 min-w-0">
                  <div className="text-primary text-sm font-mono truncate">
                    0xb4f9m...k2N7p9R
                  </div>
                  <div className="flex gap-2 text-xs text-gray-400">
                    <span>Won: $8,450</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

function getOrdinal(n: number) {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return s[(v - 20) % 10] || s[v] || s[0];
}

export default RewardsPage;
