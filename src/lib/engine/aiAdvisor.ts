import { Crop, Mandi, MarketRecord } from "@/types/market";
import { calculateNetValue } from "./calculations";
import { calculateMarketScore } from "./marketScore";

export interface AIAdvisorRequest {
  crop: Crop;
  quantityQuintals: number;
  farmerLocation: string;
  queryType?: string;
  customQuestion?: string;
}

export interface AIReasonFactor {
  type: "positive" | "warning" | "info";
  icon: "check" | "alert" | "info";
  text: string;
}

export interface AIAdvisorResponse {
  headline: string;
  explanation: string;
  bestMarketName?: string;
  bestEstimatedNetValue?: number;
  factors: AIReasonFactor[];
  comparisonSummary: {
    marketName: string;
    modalPrice: number;
    estimatedNetValue: number;
    distanceKm: number;
    score: number;
    badge: string;
  }[];
  disclaimer: string;
}

export function generateMarketInsight(
  request: AIAdvisorRequest,
  mandis: Mandi[],
  records: MarketRecord[]
): AIAdvisorResponse {
  const { crop, quantityQuintals, farmerLocation, customQuestion } = request;

  // Filter records for the specified crop
  const validRecords = records.filter((r) => r.cropId === crop.id);

  if (!validRecords || validRecords.length === 0) {
    return {
      headline: `No active market records found for ${crop.name}`,
      explanation: `Currently, we do not have recorded arrivals or price points for ${crop.name} in nearby mandis. Please check back when new market reports are published.`,
      factors: [
        {
          type: "info",
          icon: "info",
          text: "Data updating periodically from official mandis.",
        },
      ],
      comparisonSummary: [],
      disclaimer: "Market data updates daily. All figures are indicative.",
    };
  }

  // Calculate net returns and scores for each market
  const maxPriceInRegion = Math.max(...validRecords.map((r) => r.modalPrice));

  const comparisons = validRecords.map((rec) => {
    const mandi = mandis.find((m) => m.id === rec.marketId) || {
      id: rec.marketId,
      name: rec.market,
      district: rec.district,
      state: rec.state,
      distanceKm: 25,
      latitude: 0,
      longitude: 0,
      operatingDays: "Mon - Sat",
      gradingAvailable: true,
      facilities: [],
    };


    

    const netCalc = calculateNetValue(quantityQuintals, rec.modalPrice, mandi.distanceKm);
    const score = calculateMarketScore(mandi, rec, quantityQuintals, maxPriceInRegion);

    let badge = "Competitive Price";
    if (netCalc.netValue === Math.max(...validRecords.map(r => r.modalPrice * quantityQuintals))) {
      badge = "Highest Gross Value";
    }

    return {
      mandi,
      record: rec,
      grossValue: netCalc.grossValue,
      transportCost: netCalc.transportDetails.totalEstimatedCost,
      netValue: netCalc.netValue,
      score: score.totalScore,
      distanceKm: mandi.distanceKm,
      badge,
    };
  });

  // Sort by net value descending
  comparisons.sort((a, b) => b.netValue - a.netValue);

  const best = comparisons[0];
  const secondBest = comparisons.length > 1 ? comparisons[1] : null;

  // Custom question matching logic
  let customContext = "";
  if (customQuestion) {
    const qLower = customQuestion.toLowerCase();
    if (qLower.includes("closest") || qLower.includes("near")) {
      const closest = [...comparisons].sort((a, b) => a.distanceKm - b.distanceKm)[0];
      customContext = `Regarding nearest location: ${closest.mandi.name} is closest (${closest.distanceKm} km) with a modal price of ₹${closest.record.modalPrice}/qtl. `;
    } else if (qLower.includes("arrival") || qLower.includes("volume")) {
      customContext = `Regarding market volume: ${best.mandi.name} reported ${best.record.arrivalQuantity} quintals today with a ${best.record.arrivalTrend} supply level. `;
    }
  }

  // Generate plain-language summary suitable for farmers
  const headline = `Consider ${best.mandi.name} for your ${quantityQuintals} qtl of ${crop.name}`;

  let explanation = `${customContext}Based on current market data, ${best.mandi.name} offers the best estimated net return of ₹${best.netValue.toLocaleString("en-IN")} (modal price ₹${best.record.modalPrice}/qtl minus ₹${best.transportCost.toLocaleString("en-IN")} transport cost from ${farmerLocation}).`;

  if (secondBest) {
    explanation += ` Alternatively, ${secondBest.mandi.name} is ${secondBest.distanceKm} km away with a price of ₹${secondBest.record.modalPrice}/qtl (net return ~₹${secondBest.netValue.toLocaleString("en-IN")}).`;
  }

  // Transparent diagnostic factors list ("Why this recommendation?")
  const factors: AIReasonFactor[] = [];

  if (best.record.modalPrice >= maxPriceInRegion * 0.95) {
    factors.push({
      type: "positive",
      icon: "check",
      text: `Highest / Top regional modal price of ₹${best.record.modalPrice}/quintal`,
    });
  } else {
    factors.push({
      type: "positive",
      icon: "check",
      text: `Solid price of ₹${best.record.modalPrice}/quintal after transport evaluation`,
    });
  }

  if (best.distanceKm <= 30) {
    factors.push({
      type: "positive",
      icon: "check",
      text: `Low transport distance (${best.distanceKm} km from ${farmerLocation})`,
    });
  } else {
    factors.push({
      type: "info",
      icon: "info",
      text: `Distance is ${best.distanceKm} km; estimated transport cost is ₹${best.transportCost.toLocaleString("en-IN")}`,
    });
  }

  if (best.record.arrivalTrend === "high") {
    factors.push({
      type: "warning",
      icon: "alert",
      text: `High market arrival volume (${best.record.arrivalQuantity} qtl today) — expect busy bidding yards`,
    });
  } else {
    factors.push({
      type: "positive",
      icon: "check",
      text: `Normal to steady market arrivals (${best.record.arrivalQuantity} qtl today)`,
    });
  }

  if (best.record.priceTrend === "increasing") {
    factors.push({
      type: "positive",
      icon: "check",
      text: "Prices have been trending upwards over recent trading sessions",
    });
  } else if (best.record.priceTrend === "decreasing") {
    factors.push({
      type: "warning",
      icon: "alert",
      text: "Recent price trend has dipped slightly; verify live yard quotes upon arrival",
    });
  } else {
    factors.push({
      type: "info",
      icon: "info",
      text: "Prices have remained steady with minimal fluctuation",
    });
  }

  const comparisonSummary = comparisons.slice(0, 4).map((c) => ({
    marketName: c.mandi.name,
    modalPrice: c.record.modalPrice,
    estimatedNetValue: c.netValue,
    distanceKm: c.distanceKm,
    score: c.score,
    badge: c.badge,
  }));

  return {
    headline,
    explanation,
    bestMarketName: best.mandi.name,
    bestEstimatedNetValue: best.netValue,
    factors,
    comparisonSummary,
    disclaimer:
      "This is AI decision support based on recorded mandi data. Actual commission fees, grading variations, and final auction bids at the mandi may alter net realization. Never guarantees future prices.",
  };
}
