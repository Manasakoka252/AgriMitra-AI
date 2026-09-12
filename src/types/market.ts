export type LanguageCode = "en" | "te" | "kn" | "hi";

export interface Crop {
  id: string;
  name: string;
  nameTranslations: Record<LanguageCode, string>;
  category: string;
  varietyDefault: string;
  icon: string;
  unit: string;
  typicalMinPrice: number;
  typicalMaxPrice: number;
  shelfLifeDays: number;
}

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

export interface MarketRecord {
  id: string;
  date: string;
  state: string;
  district: string;
  market: string;
  marketId: string;
  crop: string;
  cropId: string;
  variety: string;
  minPrice: number;
  maxPrice: number;
  modalPrice: number;
  arrivalQuantity: number;
  previousModalPrice?: number;
  priceTrend: "increasing" | "decreasing" | "stable";
  arrivalTrend: "high" | "moderate" | "low";
}

export interface MarketScore {
  totalScore: number;
  priceScore: number;
  transportScore: number;
  arrivalScore: number;
  trendScore: number;
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