import { Mandi, MarketRecord, MarketScore } from "@/types/market";
import { calculateTransportCost } from "./calculations";

/**
 * Calculates a transparent Decision-Support Market Score (0 - 100).
 * NOTE: This is a decision-support heuristic score, NOT a profit guarantee.
 */
export function calculateMarketScore(
  mandi: Mandi,
  record: MarketRecord,
  quantityQuintals: number,
  maxRegionalPrice: number
): MarketScore {
  const quantity = Math.max(1, quantityQuintals);
  const grossVal = quantity * record.modalPrice;
  const transport = calculateTransportCost(mandi.distanceKm, quantity);

  // 1. Price Competitiveness (Max 40 points)
  const priceRatio = maxRegionalPrice > 0 ? record.modalPrice / maxRegionalPrice : 1;
  const priceScore = Math.min(40, Math.round(priceRatio * 40));

  // 2. Transport Impact (Max 25 points)
  const transportPercent = grossVal > 0 ? (transport.totalEstimatedCost / grossVal) * 100 : 0;
  let transportScore = 25;
  if (transportPercent > 15) transportScore = 10;
  else if (transportPercent > 10) transportScore = 15;
  else if (transportPercent > 5) transportScore = 20;

  // 3. Arrival Condition (Max 20 points)
  let arrivalScore = 15; // default moderate
  if (record.arrivalTrend === "low") {
    arrivalScore = 20; // Low supply = good bargaining power for farmer
  } else if (record.arrivalTrend === "moderate") {
    arrivalScore = 16;
  } else if (record.arrivalTrend === "high") {
    arrivalScore = 10; // Glut risk
  }

  // 4. Trend Score (Max 15 points)
  let trendScore = 10;
  if (record.priceTrend === "increasing") trendScore = 15;
  else if (record.priceTrend === "stable") trendScore = 11;
  else if (record.priceTrend === "decreasing") trendScore = 5;

  const totalScore = priceScore + transportScore + arrivalScore + trendScore;

  const explanation = [
    {
      label: "Price Competitiveness",
      score: priceScore,
      max: 40,
      status: priceScore >= 34 ? ("positive" as const) : priceScore >= 28 ? ("neutral" as const) : ("warning" as const),
      text: `Modal price of ₹${record.modalPrice}/qtl is ${Math.round(priceRatio * 100)}% of regional peak.`,
    },
    {
      label: "Transport Cost Impact",
      score: transportScore,
      max: 25,
      status: transportScore >= 20 ? ("positive" as const) : transportScore >= 15 ? ("neutral" as const) : ("warning" as const),
      text: `Estimated freight cost is ₹${transport.totalEstimatedCost} (~${transportPercent.toFixed(1)}% of gross crop value).`,
    },
    {
      label: "Market Arrival Volume",
      score: arrivalScore,
      max: 20,
      status: arrivalScore >= 16 ? ("positive" as const) : ("warning" as const),
      text: `${record.arrivalQuantity} qtl today (${record.arrivalTrend} arrival volume).`,
    },
    {
      label: "Recent Price Trend",
      score: trendScore,
      max: 15,
      status: trendScore >= 12 ? ("positive" as const) : trendScore >= 8 ? ("neutral" as const) : ("warning" as const),
      text: `Prices have been ${record.priceTrend} over recent trading days.`,
    },
  ];

  return {
    totalScore,
    priceScore,
    transportScore,
    arrivalScore,
    trendScore,
    explanation,
  };
}
