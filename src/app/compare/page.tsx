"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useDemo } from "@/context/DemoContext";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { CROPS_DATA } from "@/data/crops";
import { MANDIS_DATA } from "@/data/markets";
import { FARMER_LOCATIONS } from "@/data/farmerLocations";
import { getLatestRecordsForCrop } from "@/data/marketRecords";
import { calculateNetValue } from "@/lib/engine/calculations";
import { calculateMarketScore } from "@/lib/engine/marketScore";
import { generateMarketInsight } from "@/lib/engine/aiAdvisor";
import {
  Scale,
  Sparkles,
  Truck,
  MapPin,
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  Info,
  ChevronRight,
  ShieldAlert,
  ArrowRight,
} from "lucide-react";

/**
 * Calculate approximate distance between two locations
 * using the Haversine formula.
 */
function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const earthRadiusKm = 6371;

  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Math.round(earthRadiusKm * c);
}

export default function MarketComparisonPage() {
  const { t } = useLanguage();

  const {
    selectedCropId,
    setSelectedCropId,
    quantityQuintals,
    setQuantityQuintals,
    farmerLocation,
    setFarmerLocation,
  } = useDemo();

  const [localQty, setLocalQty] = useState<number>(quantityQuintals);
  const [localLocation, setLocalLocation] =
    useState<string>(farmerLocation);

  const activeCrop =
    CROPS_DATA.find((c) => c.id === selectedCropId) || CROPS_DATA[0];

  const records = getLatestRecordsForCrop(activeCrop.id);

  const maxPriceInRegion = useMemo(() => {
    if (records.length === 0) return 0;

    return Math.max(...records.map((r) => r.modalPrice));
  }, [records]);

  // Compute detailed comparisons
  const comparisons = useMemo(() => {
    const selectedLocation = FARMER_LOCATIONS.find(
      (location) => location.name === localLocation
    );

    return records
      .map((rec) => {
        const mandi = MANDIS_DATA.find(
          (m) => m.id === rec.marketId
        ) || {
          id: rec.marketId,
          name: rec.market,
          district: rec.district,
          state: rec.state,
          distanceKm: 25,
          latitude: 13.1367,
          longitude: 78.1291,
          operatingDays: "Mon - Sat",
          gradingAvailable: true,
          facilities: [],
        };

        // Calculate distance from farmer location to mandi
        const calculatedDistance = selectedLocation
          ? calculateDistance(
              selectedLocation.latitude,
              selectedLocation.longitude,
              mandi.latitude,
              mandi.longitude
            )
          : mandi.distanceKm;

        // Calculate financial values using calculated distance
        const netCalc = calculateNetValue(
          localQty,
          rec.modalPrice,
          calculatedDistance
        );
        const score = calculateMarketScore(
          {
            ...mandi,
            distanceKm: calculatedDistance,
          },
          rec,
        localQty,
        maxPriceInRegion
        );
        

        return {
          mandi: {
            ...mandi,
            distanceKm: calculatedDistance,
          },
          record: rec,
          grossValue: netCalc.grossValue,
          transport: netCalc.transportDetails,
          netValue: netCalc.netValue,
          score,
        };
      })
      .sort((a, b) => b.netValue - a.netValue);
  }, [records, localQty, localLocation, maxPriceInRegion]);

  // Generate AI Insight
  const aiInsight = useMemo(() => {
    return generateMarketInsight(
      {
        crop: activeCrop,
        quantityQuintals: localQty,
        farmerLocation: localLocation,
      },
      MANDIS_DATA,
      records
    );
  }, [activeCrop, localQty, localLocation, records]);

  // Apply handler
  const handleUpdate = () => {
    setQuantityQuintals(localQty);
    setFarmerLocation(localLocation);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* HEADER BAR */}
      <div className="bg-gradient-to-r from-slate-900 via-brand-950 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-3">
        <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
          <Scale className="w-5 h-5 text-amber-400" />
          <span>Core Feature • Compare Before You Go</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
          Where Should I Consider Selling My Harvest?
        </h1>

        <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
          Don't just pick the highest modal price! AgriMitra factors in
          freight distance, load weight, arrival congestion, and price trends
          to show estimated <strong>Net Realization Value</strong>.
        </p>
      </div>

      {/* INPUT CONTROLS CARD */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700">
          Step 1: Enter Your Produce Details
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          {/* Crop Selector */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">
              {t.selectCrop}
            </label>

            <select
              value={selectedCropId}
              onChange={(e) => setSelectedCropId(e.target.value)}
              className="w-full bg-slate-50 text-slate-900 font-bold px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              {CROPS_DATA.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.icon} {c.name} ({c.category})
                </option>
              ))}
            </select>
          </div>

          {/* Quantity Input */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">
              Harvest Quantity (Quintals)
            </label>

            <input
              type="number"
              min={1}
              max={500}
              value={localQty}
              onChange={(e) => setLocalQty(Number(e.target.value))}
              onBlur={handleUpdate}
              className="w-full bg-slate-50 text-slate-900 font-bold px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />

            <span className="text-[10px] text-slate-400 mt-0.5 block">
              1 Quintal = 100 kg (~
              {(localQty * 100).toLocaleString()} kg total)
            </span>
          </div>

          {/* Location Selector */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">
              {t.enterLocation}
            </label>

            <select
              value={localLocation}
              onChange={(e) => {
                setLocalLocation(e.target.value);
                setFarmerLocation(e.target.value);
              }}
              className="w-full bg-slate-50 text-slate-900 font-bold px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="">Select your location</option>

              <optgroup label="Karnataka">
                {FARMER_LOCATIONS.filter(
                  (location) => location.state === "Karnataka"
                ).map((location) => (
                  <option key={location.id} value={location.name}>
                    {location.name}, {location.state}
                  </option>
                ))}
              </optgroup>

              <optgroup label="Andhra Pradesh">
                {FARMER_LOCATIONS.filter(
                  (location) => location.state === "Andhra Pradesh"
                ).map((location) => (
                  <option key={location.id} value={location.name}>
                    {location.name}, {location.state}
                  </option>
                ))}
              </optgroup>
            </select>
          </div>
        </div>
      </div>

      {/* COMPARISON CARDS / GRID */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-700 px-1">
          <h2 className="font-bold text-sm text-slate-900 flex items-center gap-2">
            <span>Market Side-by-Side Evaluation</span>

            <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2 py-0.5 rounded-full">
              Sorted by Net Value
            </span>
          </h2>

          <span className="text-slate-500">
            {comparisons.length} Mandis Evaluated
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {comparisons.map((c, idx) => {
            const isRank1 = idx === 0;

            return (
              <div
                key={c.mandi.id}
                className={`bg-white rounded-2xl border transition-all relative overflow-hidden flex flex-col justify-between ${
                  isRank1
                    ? "border-brand-500 shadow-xl ring-2 ring-brand-500/20"
                    : "border-slate-200 shadow-sm hover:shadow-md"
                }`}
              >
                {/* Rank Badge */}
                {isRank1 && (
                  <div className="bg-gradient-to-r from-brand-600 to-amber-500 text-white text-[11px] font-extrabold px-3 py-1 text-center shadow-sm flex items-center justify-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>#1 TOP ESTIMATED NET RETURN</span>
                  </div>
                )}

                <div className="p-5 space-y-4">
                  {/* Mandi Title & Score */}
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-extrabold text-base text-slate-900">
                        {c.mandi.name}
                      </h3>

                      <p className="text-xs text-slate-500">
                        {c.mandi.district}, {c.mandi.state} •{" "}
                        {c.mandi.distanceKm} km away
                      </p>
                    </div>

                    {/* Market Score Pill */}
                    <div className="text-center bg-slate-900 text-white p-2 rounded-xl border border-slate-700 min-w-[3.5rem]">
                      <span className="text-[10px] text-slate-400 block uppercase font-bold">
                        Score
                      </span>

                      <span className="text-base font-extrabold text-amber-400">
                        {c.score.totalScore}
                      </span>

                      <span className="text-[9px] text-slate-400">
                        /100
                      </span>
                    </div>
                  </div>

                  {/* Financial Breakdown Table */}
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2 text-xs">
                    <div className="flex justify-between items-center text-slate-600">
                      <span>Modal Price:</span>

                      <span className="font-extrabold text-slate-900">
                        ₹{c.record.modalPrice.toLocaleString("en-IN")} /qtl
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-slate-600">
                      <span>
                        Gross Produce Value ({localQty} qtl):
                      </span>

                      <span className="font-bold text-slate-800">
                        ₹{c.grossValue.toLocaleString("en-IN")}
                      </span>
                    </div>

                    <div className="flex justify-between items-center text-rose-700">
                      <span className="flex items-center gap-1">
                        <Truck className="w-3.5 h-3.5" />
                        Est. Freight ({c.mandi.distanceKm} km):
                      </span>

                      <span className="font-bold">
                        - ₹
                        {c.transport.totalEstimatedCost.toLocaleString(
                          "en-IN"
                        )}
                      </span>
                    </div>

                    <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-slate-900 font-extrabold text-sm">
                      <span className="text-brand-800">
                        Net Estimated Return:
                      </span>

                      <span className="text-emerald-700 text-base">
                        ₹{c.netValue.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>

                  {/* Mandi Metrics Badges */}
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div className="bg-slate-100 p-2 rounded-lg text-slate-700">
                      <span className="text-slate-400 block text-[10px]">
                        Today's Arrival
                      </span>

                      <strong className="text-slate-900">
                        {c.record.arrivalQuantity} qtl
                      </strong>{" "}
                      ({c.record.arrivalTrend})
                    </div>

                    <div className="bg-slate-100 p-2 rounded-lg text-slate-700">
                      <span className="text-slate-400 block text-[10px]">
                        Price Trend
                      </span>

                      <strong className="capitalize text-slate-900">
                        {c.record.priceTrend}
                      </strong>
                    </div>
                  </div>

                  {/* Transparent Score Reason */}
                  <div className="space-y-1 text-[11px]">
                    <span className="font-bold text-slate-700 block">
                      Score Breakdown:
                    </span>

                    <ul className="space-y-1 text-slate-600">
                      {c.score.explanation.slice(0, 2).map((exp, eIdx) => (
                        <li
                          key={eIdx}
                          className="flex items-center gap-1.5"
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              exp.status === "positive"
                                ? "bg-emerald-500"
                                : exp.status === "neutral"
                                ? "bg-amber-500"
                                : "bg-rose-500"
                            }`}
                          />

                          <span className="truncate">
                            {exp.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-4 bg-slate-50 border-t border-slate-100">
                  <Link
                    href={`/market/${c.mandi.id}?crop=${activeCrop.id}`}
                    className="w-full inline-flex items-center justify-center gap-1.5 bg-white hover:bg-slate-100 text-slate-800 font-semibold px-4 py-2 rounded-xl border border-slate-200 text-xs transition-colors shadow-xs"
                  >
                    <span>View Market Detail & Charts</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* AI MARKET INSIGHT BOX */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-500/20 text-brand-400 flex items-center justify-center border border-brand-500/30">
              <Sparkles className="w-6 h-6" />
            </div>

            <div>
              <h2 className="font-extrabold text-lg text-white">
                AI Market Decision Insight
              </h2>

              <p className="text-xs text-slate-400">
                Synthesized based on recorded price vectors, freight
                algorithms, and supply volume
              </p>
            </div>
          </div>

          <span className="bg-brand-500/20 text-brand-300 text-xs font-bold px-3 py-1 rounded-full border border-brand-500/30 hidden sm:inline">
            Decision Support Heuristic
          </span>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold text-amber-300">
            {aiInsight.headline}
          </h3>

          <p className="text-sm text-slate-200 leading-relaxed">
            {aiInsight.explanation}
          </p>
        </div>

        {/* Diagnostic Factors Box */}
        <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-3">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />

            <span>{t.whyRecommendation}</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {aiInsight.factors.map((fac, fIdx) => (
              <div
                key={fIdx}
                className="flex items-start gap-2.5 bg-slate-900 p-3 rounded-xl border border-slate-800"
              >
                {fac.type === "positive" ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                ) : fac.type === "warning" ? (
                  <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                ) : (
                  <Info className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                )}

                <span className="text-slate-200">
                  {fac.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer Note */}
        <p className="text-[11px] text-slate-400 italic pt-2 border-t border-slate-800">
          * {aiInsight.disclaimer}
        </p>
      </div>
    </div>
  );
}