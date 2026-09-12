export type LanguageCode = "en" | "te" | "kn" | "hi";

export interface Mandi {
  id: string;
  name: string;
  district: string;
  state: string;
  distanceKm: number;
  latitude: number;
  longitude: number;
  operatingDays: string;
  gradingAvailable: boolean;
  facilities: string[];
}

export interface Mandi {
  id: string;
  name: string;
  district: string;
  state: string;
  distanceKm: number; // default distance relative to regional hub (e.g. Kolar)
  operatingDays: string;
  gradingAvailable: boolean;
  facilities: string[];
}

export interface MarketRecord {
  id: string;
  date: string; // YYYY-MM-DD
  state: string;
  district: string;
  market: string;
  marketId: string;
  crop: string;
  cropId: string;
  variety: string;
  minPrice: number; // ₹ per quintal
  maxPrice: number; // ₹ per quintal
  modalPrice: number; // ₹ per quintal
  arrivalQuantity: number; // in quintals
  previousModalPrice?: number;
  priceTrend: "increasing" | "decreasing" | "stable";
  arrivalTrend: "high" | "moderate" | "low";
}

export interface MarketScore {
  totalScore: number; // 0-100
  priceScore: number; // max 40
  transportScore: number; // max 25
  arrivalScore: number; // max 20
  trendScore: number; // max 15
  explanation: {
    label: string;
    score: number;
    max: number;
    status: "positive" | "neutral" | "warning";
    text: string;
  }[];
}

export interface MarketComparisonResult {
  mandi: Mandi;
  record: MarketRecord;
  quantityQuintals: number;
  grossValue: number;
  estimatedTransportCost: number;
  estimatedNetValue: number;
  marketScore: MarketScore;
  distanceKm: number;
  netRank: number;
}

export interface MarketAlert {
  id: string;
  type: "opportunity" | "arrival" | "drop" | "change";
  title: string;
  description: string;
  marketName: string;
  cropName: string;
  severity: "high" | "medium" | "info";
  date: string;
}

export interface DemoScenario {
  id: string;
  title: string;
  farmerName: string;
  location: string;
  cropId: string;
  quantityQuintals: number;
  description: string;
  icon: string;
}
