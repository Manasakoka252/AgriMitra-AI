import { MarketRecord } from "@/types/market";
import { MANDIS_DATA } from "./markets";
import { CROPS_DATA } from "./crops";

// Utility to generate dates for the last 90 days
function getPastDateStr(daysAgo: number): string {
  const date = new Date(2026, 8, 11);
  date.setDate(date.getDate() - daysAgo);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
// Deterministic pseudo-random multiplier for consistent data across renders
function pseudoRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// Generate realistic dataset dynamically for all crops across mandis
export function generateMarketRecords(): MarketRecord[] {
  const records: MarketRecord[] = [];
  const totalDays = 90;

  CROPS_DATA.forEach((crop, cIdx) => {
    MANDIS_DATA.forEach((mandi, mIdx) => {
      // Mandi price bias (some mandis consistently command premium or lower transport friction)
      const mandiBias = 1 + ((mIdx % 5) - 2) * 0.05; // -10% to +10%
      const baseModal = Math.round(
        ((crop.typicalMinPrice + crop.typicalMaxPrice) / 2) * mandiBias
      );

      for (let day = 0; day < totalDays; day++) {
        const dateStr = getPastDateStr(day);
        const seed = (cIdx + 1) * 1000 + (mIdx + 1) * 100 + day;
        
        // Cyclic sine wave + pseudo-random noise for price trend
        const wave = Math.sin(day / 6) * 0.12;
        const noise = (pseudoRandom(seed) - 0.5) * 0.08;
        const currentModal = Math.round(baseModal * (1 + wave + noise));

        const spread = Math.round(currentModal * 0.15);
        const minPrice = Math.round(currentModal - spread * (0.8 + pseudoRandom(seed + 1) * 0.4));
        const maxPrice = Math.round(currentModal + spread * (0.8 + pseudoRandom(seed + 2) * 0.4));

        // Arrival quantity inversely correlated with price spikes, with seasonal waves
        const baseArrival = crop.category === "Vegetables" ? 450 : crop.category === "Spices" ? 85 : 280;
        const arrivalNoise = (pseudoRandom(seed + 3) - 0.5) * 0.4;
        const arrivalWave = -Math.sin(day / 6) * 0.25; 
        const arrivalQuantity = Math.max(15, Math.round(baseArrival * (1 + arrivalWave + arrivalNoise)));

        // Trend calculation comparing with 3 days prior
        const prevSeed = (cIdx + 1) * 1000 + (mIdx + 1) * 100 + (day + 3);
        const prevWave = Math.sin((day + 3) / 6) * 0.12;
        const prevNoise = (pseudoRandom(prevSeed) - 0.5) * 0.08;
        const prevModal = Math.round(baseModal * (1 + prevWave + prevNoise));

        let priceTrend: "increasing" | "decreasing" | "stable" = "stable";
        if (currentModal > prevModal * 1.02) priceTrend = "increasing";
        else if (currentModal < prevModal * 0.98) priceTrend = "decreasing";

        let arrivalTrend: "high" | "moderate" | "low" = "moderate";
        if (arrivalQuantity > baseArrival * 1.25) arrivalTrend = "high";
        else if (arrivalQuantity < baseArrival * 0.75) arrivalTrend = "low";

        records.push({
          id: `${mandi.id}-${crop.id}-${dateStr}`,
          date: dateStr,
          state: mandi.state,
          district: mandi.district,
          market: mandi.name,
          marketId: mandi.id,
          crop: crop.name,
          cropId: crop.id,
          variety: crop.varietyDefault,
          minPrice,
          maxPrice,
          modalPrice: currentModal,
          arrivalQuantity,
          previousModalPrice: prevModal,
          priceTrend,
          arrivalTrend,
        });
      }
    });
  });

  return records;
}

export const ALL_MARKET_RECORDS = generateMarketRecords();

// Latest date in dataset
export const LATEST_DATA_DATE = "2026-09-11";

// Helper to get latest records for all markets matching crop
export function getLatestRecordsForCrop(cropId: string): MarketRecord[] {
  return ALL_MARKET_RECORDS.filter(
    (r) => r.cropId === cropId && r.date === LATEST_DATA_DATE
  );
}

// Helper to get latest record for specific mandi & crop
export function getLatestRecord(mandiId: string, cropId: string): MarketRecord | undefined {
  return ALL_MARKET_RECORDS.find(
    (r) => r.marketId === mandiId && r.cropId === cropId && r.date === LATEST_DATA_DATE
  );
}

// Helper to get price & arrival history for specific mandi & crop (e.g. 7, 30, 90 days)
export function getHistoryForMandiCrop(
  mandiId: string,
  cropId: string,
  days: number = 30
): MarketRecord[] {
  const subset = ALL_MARKET_RECORDS.filter(
    (r) => r.marketId === mandiId && r.cropId === cropId
  );
  // Sort by date ascending for charts
  return subset
    .slice(0, days)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}
