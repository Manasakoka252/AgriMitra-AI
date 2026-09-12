import { Crop, Mandi, MarketRecord } from "@/types/market";
import { CROPS_DATA } from "@/data/crops";
import { MANDIS_DATA } from "@/data/markets";
import {
  ALL_MARKET_RECORDS,
  LATEST_DATA_DATE,
  getHistoryForMandiCrop,
  getLatestRecord,
  getLatestRecordsForCrop,
} from "@/data/marketRecords";

export interface DataSourceMetadata {
  providerName: string;
  isDemoData: boolean;
  demoDataBadge: string;
  lastUpdated: string;
  latestDataDate: string;
  sourceNote: string;
}

export const DATA_SOURCE_INFO: DataSourceMetadata = {
  providerName: "AGMARKNET / e-NAM Architecture Ready (Demo Engine)",
  isDemoData: true,
  demoDataBadge: "Demo / Historical Market Data",
  lastUpdated: "Today, 06:00 AM IST",
  latestDataDate: LATEST_DATA_DATE,
  sourceNote: "Demo / Historical Market Data based on typical AGMARKNET mandi arrival and modal price structures.",
};

export class MarketService {
  static async getCrops(): Promise<Crop[]> {
    return CROPS_DATA;
  }

  static async getCropById(cropId: string): Promise<Crop | undefined> {
    return CROPS_DATA.find((c) => c.id === cropId);
  }

  static async getMandis(): Promise<Mandi[]> {
    return MANDIS_DATA;
  }

  static async getMandiById(mandiId: string): Promise<Mandi | undefined> {
    return MANDIS_DATA.find((m) => m.id === mandiId);
  }

  static async getLatestMarketRecords(cropId?: string): Promise<MarketRecord[]> {
    if (cropId) {
      return getLatestRecordsForCrop(cropId);
    }
    return ALL_MARKET_RECORDS.filter((r) => r.date === LATEST_DATA_DATE);
  }

  static async getMarketRecord(
    mandiId: string,
    cropId: string
  ): Promise<MarketRecord | undefined> {
    return getLatestRecord(mandiId, cropId);
  }

  static async getMarketHistory(
    mandiId: string,
    cropId: string,
    days: number = 30
  ): Promise<MarketRecord[]> {
    return getHistoryForMandiCrop(mandiId, cropId, days);
  }

  static getDataSourceMeta(): DataSourceMetadata {
    return DATA_SOURCE_INFO;
  }
}
