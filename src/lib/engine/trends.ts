import { MarketRecord } from "@/types/market";

export interface TrendAnalysisResult {
  priceChangeAmount: number;
  priceChangePercent: number;
  direction: "up" | "down" | "flat";
  arrivalAverage: number;
  summaryText: string;
}

export function analyzePriceTrend(historyRecords: MarketRecord[]): TrendAnalysisResult {
  if (!historyRecords || historyRecords.length < 2) {
    return {
      priceChangeAmount: 0,
      priceChangePercent: 0,
      direction: "flat",
      arrivalAverage: 0,
      summaryText: "Insufficient historical data available for trend calculation.",
    };
  }

  const sorted = [...historyRecords].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const oldest = sorted[0];
  const newest = sorted[sorted.length - 1];

  const priceChangeAmount = newest.modalPrice - oldest.modalPrice;
  const priceChangePercent = Number(
    ((priceChangeAmount / oldest.modalPrice) * 100).toFixed(1)
  );

  let direction: "up" | "down" | "flat" = "flat";
  if (priceChangePercent > 1.5) direction = "up";
  else if (priceChangePercent < -1.5) direction = "down";

  const totalArrivals = sorted.reduce((acc, curr) => acc + curr.arrivalQuantity, 0);
  const arrivalAverage = Math.round(totalArrivals / sorted.length);

  let summaryText = "";
  if (direction === "up") {
    summaryText = `${newest.crop} prices at ${newest.market} increased by ₹${priceChangeAmount} (${priceChangePercent}%) over the past ${sorted.length} days while daily arrivals averaged ${arrivalAverage} quintals.`;
  } else if (direction === "down") {
    summaryText = `${newest.crop} prices at ${newest.market} decreased by ₹${Math.abs(priceChangeAmount)} (${priceChangePercent}%) over the past ${sorted.length} days amid arrival volume of ~${arrivalAverage} quintals per day.`;
  } else {
    summaryText = `${newest.crop} prices at ${newest.market} remained steady around ₹${newest.modalPrice}/quintal with consistent daily market supply.`;
  }

  return {
    priceChangeAmount,
    priceChangePercent,
    direction,
    arrivalAverage,
    summaryText,
  };
}
