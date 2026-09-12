"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useDemo } from "@/context/DemoContext";
import { useFavorites } from "@/hooks/useFavorites";
import { useSavedCrops } from "@/hooks/useSavedCrops";
import { CROPS_DATA } from "@/data/crops";
import { MANDIS_DATA } from "@/data/markets";
import { getLatestRecord, getLatestRecordsForCrop } from "@/data/marketRecords";
import {
  Sprout,
  Search,
  Scale,
  TrendingUp,
  MapPin,
  Sparkles,
  ArrowRight,
  Star,
  Wheat,
  Calendar,
  Layers,
  Bot,
  ChevronRight,
  TrendingDown,
  Minus,
} from "lucide-react";

export default function FarmerDashboard() {
  const { t } = useLanguage();
  const { selectedCropId, setSelectedCropId, farmerLocation, quantityQuintals } = useDemo();
  const { favorites } = useFavorites();
  const { savedCrops } = useSavedCrops();

  const [searchQuery, setSearchQuery] = useState("");

  const activeCrop = CROPS_DATA.find((c) => c.id === selectedCropId) || CROPS_DATA[0];
  const activeRecords = getLatestRecordsForCrop(activeCrop.id);

  // Best available price in region for active crop
  const bestRecord = [...activeRecords].sort((a, b) => b.modalPrice - a.modalPrice)[0];
  
  // Mandi with highest arrival
  const highestArrivalRecord = [...activeRecords].sort((a, b) => b.arrivalQuantity - a.arrivalQuantity)[0];

  // Filter crops by search query if typed
  const filteredCrops = CROPS_DATA.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12">
      {/* TOP HEADER SECTION */}
      <div className="bg-gradient-to-r from-brand-900 via-brand-800 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-brand-300 text-xs font-semibold">
              <Calendar className="w-3.5 h-3.5" />
              <span>Today: Sept 11, 2026</span>
              <span className="text-slate-500">•</span>
              <span className="bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded text-[11px]">
                Demo Market Data
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              {t.greetingAfternoon}
            </h1>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
              <MapPin className="w-4 h-4 text-brand-400" />
              <span>Location: <strong>{farmerLocation}</strong></span>
              <span className="text-slate-500">•</span>
              <span>Crop: <strong>{activeCrop.icon} {activeCrop.name}</strong> ({quantityQuintals} qtl)</span>
            </div>
          </div>

          {/* Prominent Action Button */}
          <div>
            <Link
              href="/compare"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold px-6 py-3.5 rounded-2xl shadow-lg hover:shadow-amber-500/25 transition-all text-sm group"
            >
              <Scale className="w-5 h-5 text-slate-950" />
              <span>{t.findBestMarketBtn}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* QUICK CROP SEARCH */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
            <Search className="w-4 h-4 text-brand-600" />
            <span>Select Crop for Today's Market Snapshot</span>
          </label>
          <span className="text-xs text-slate-500">
            Active: <strong>{activeCrop.name}</strong>
          </span>
        </div>

        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search crops (e.g. Tomato, Onion, Chilli, Rice, Wheat)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 text-slate-900 text-xs font-medium pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>

        {/* Horizontal Crop Selection Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
          {filteredCrops.map((crop) => {
            const isSelected = crop.id === activeCrop.id;
            return (
              <button
                key={crop.id}
                onClick={() => setSelectedCropId(crop.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  isSelected
                    ? "bg-brand-600 text-white shadow-md shadow-brand-600/20"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                <span>{crop.icon}</span>
                <span>{crop.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* SUMMARY STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Today's Markets */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Today's Markets</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-extrabold text-slate-900">
              {activeRecords.length} <span className="text-xs font-normal text-slate-500">Mandis Reporting</span>
            </p>
            <p className="text-[11px] text-slate-500 mt-1">
              All mandis active today for {activeCrop.name}
            </p>
          </div>
        </div>

        {/* Card 2: Best Available Price */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Best Regional Price</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Sprout className="w-4 h-4" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-extrabold text-emerald-600">
              ₹{bestRecord ? bestRecord.modalPrice.toLocaleString("en-IN") : 0}{" "}
              <span className="text-xs font-normal text-slate-500">/ quintal</span>
            </p>
            <p className="text-[11px] font-medium text-slate-700 mt-1 truncate">
              At {bestRecord ? bestRecord.market : "N/A"}
            </p>
          </div>
        </div>

        {/* Card 3: Highest Arrival */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Highest Supply Volume</span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-extrabold text-slate-900">
              {highestArrivalRecord ? highestArrivalRecord.arrivalQuantity.toLocaleString("en-IN") : 0}{" "}
              <span className="text-xs font-normal text-slate-500">quintals</span>
            </p>
            <p className="text-[11px] text-slate-500 mt-1 truncate">
              {highestArrivalRecord ? highestArrivalRecord.market : "N/A"}
            </p>
          </div>
        </div>

        {/* Card 4: Price Trend */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Overall Price Trend</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold capitalize text-slate-900">
                {bestRecord?.priceTrend || "Stable"}
              </span>
              {bestRecord?.priceTrend === "increasing" ? (
                <span className="inline-flex items-center text-xs text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                  ▲ Up
                </span>
              ) : bestRecord?.priceTrend === "decreasing" ? (
                <span className="inline-flex items-center text-xs text-rose-600 font-bold bg-rose-50 px-2 py-0.5 rounded">
                  ▼ Down
                </span>
              ) : (
                <span className="inline-flex items-center text-xs text-slate-600 font-bold bg-slate-100 px-2 py-0.5 rounded">
                  ▶ Stable
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Compared with previous trading days</p>
          </div>
        </div>
      </div>

      {/* QUICK PREVIEW TABLE OF TOP MARKETS FOR SELECTED CROP */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-4 p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="font-bold text-base text-slate-900 flex items-center gap-2">
              <span>Today's Market Comparison Snapshot</span>
              <span className="bg-slate-100 text-slate-700 text-xs px-2 py-0.5 rounded-full font-mono">
                {activeCrop.name}
              </span>
            </h2>
            <p className="text-xs text-slate-500">
              Comparing modal prices, distances, and net realization estimates for {quantityQuintals} qtl produce.
            </p>
          </div>

          <Link
            href="/compare"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 hover:text-brand-700"
          >
            <span>Full Comparison View</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold uppercase text-[10px] tracking-wider border-y border-slate-200">
              <tr>
                <th className="py-3 px-4">Market / Mandi</th>
                <th className="py-3 px-4">State & District</th>
                <th className="py-3 px-4 text-right">Modal Price</th>
                <th className="py-3 px-4 text-right">Min - Max</th>
                <th className="py-3 px-4 text-right">Today's Arrival</th>
                <th className="py-3 px-4 text-center">Trend</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {activeRecords.slice(0, 5).map((rec) => {
                const mandi = MANDIS_DATA.find((m) => m.id === rec.marketId);
                const isBest = bestRecord && rec.id === bestRecord.id;

                return (
                  <tr
                    key={rec.id}
                    className={`hover:bg-slate-50/80 transition-colors ${
                      isBest ? "bg-emerald-50/50" : ""
                    }`}
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">{rec.market}</span>
                        {isBest && (
                          <span className="bg-emerald-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                            TOP PRICE
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-400">
                        {mandi ? `${mandi.distanceKm} km from location` : "Regional Mandi"}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-600">
                      {rec.district}, {rec.state}
                    </td>
                    <td className="py-3 px-4 text-right font-extrabold text-emerald-700 text-sm">
                      ₹{rec.modalPrice.toLocaleString("en-IN")}
                    </td>
                    <td className="py-3 px-4 text-right text-slate-600">
                      ₹{rec.minPrice} - ₹{rec.maxPrice}
                    </td>
                    <td className="py-3 px-4 text-right font-mono text-slate-700">
                      {rec.arrivalQuantity} qtl
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold capitalize ${
                          rec.priceTrend === "increasing"
                            ? "bg-emerald-100 text-emerald-800"
                            : rec.priceTrend === "decreasing"
                            ? "bg-rose-100 text-rose-800"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {rec.priceTrend}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Link
                        href={`/market/${rec.marketId}?crop=${rec.cropId}`}
                        className="inline-flex items-center gap-1 text-xs text-brand-600 hover:underline font-semibold"
                      >
                        <span>Details</span>
                        <ChevronRight className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* QUICK SHORTCUTS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Saved Crops Widget */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Wheat className="w-4 h-4 text-amber-500" />
              <span>My Saved Crops</span>
            </h3>
            <Link href="/my-crops" className="text-xs font-semibold text-brand-600 hover:underline">
              Manage
            </Link>
          </div>
          <div className="flex flex-wrap gap-2">
            {savedCrops.map((cId) => {
              const c = CROPS_DATA.find((item) => item.id === cId);
              if (!c) return null;
              return (
                <button
                  key={c.id}
                  onClick={() => setSelectedCropId(c.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                    c.id === selectedCropId
                      ? "bg-amber-50 border-amber-300 text-amber-900"
                      : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <span>{c.icon}</span>
                  <span>{c.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Favorite Markets Widget */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-400" />
              <span>Favorite Markets</span>
            </h3>
            <Link href="/favorites" className="text-xs font-semibold text-brand-600 hover:underline">
              View All
            </Link>
          </div>
          <div className="space-y-2">
            {favorites.slice(0, 3).map((fId) => {
              const mandi = MANDIS_DATA.find((m) => m.id === fId);
              const record = mandi ? getLatestRecord(mandi.id, activeCrop.id) : null;
              if (!mandi) return null;
              return (
                <div
                  key={mandi.id}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                >
                  <div>
                    <span className="font-bold text-slate-900">{mandi.name}</span>
                    <p className="text-[11px] text-slate-500">{mandi.district}, {mandi.state}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-extrabold text-emerald-700">
                      ₹{record ? record.modalPrice : mandi.distanceKm * 10}/qtl
                    </span>
                    <p className="text-[10px] text-slate-400">{mandi.distanceKm} km away</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
