import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useMyImpactStore = create(
  persist(
    (set) => ({
      impactSummaries:[],
      impactChartData:[],
      myMonthImpactSummary:[], 
      setAllValues: (data) => set({
            impactSummaries:data.impactSummaries,
            impactChartData:data.impactChartData,
            myMonthImpactSummary:data.myMonthImpactSummary, 
        })
    }),
    {
      name: 'my-impact-storage',
    }
  )
)

export default useMyImpactStore
