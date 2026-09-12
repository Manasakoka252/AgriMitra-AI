"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { CROPS_DATA } from "@/data/crops";
import { MANDIS_DATA } from "@/data/markets";
import { ALL_MARKET_RECORDS, LATEST_DATA_DATE } from "@/data/marketRecords";
import { DATA_SOURCE_INFO } from "@/lib/api/marketService";
import {
  Search,
  Filter,
  ArrowUpDown,
  Database,
  MapPin,
  TrendingUp,
  TrendingDown,
  Minus,
  Sparkles,
  ChevronRight,
  Info,
} from "lucide-react";

export default function MarketExplorer() {
  const [selectedCrop, setSelectedCrop] = useState<string>("all");
  const [selectedState, setSelectedState] = useState<string>("all");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<"price-desc" | "price-asc" | "arrival-desc" | "distance-asc">("price-desc");

  // Extract unique states and districts for drop-downs
  const states = useMemo(() => {
    return Array.from(new Set(MANDIS_DATA.map((m) => m.state)));
  }, []);

  const districts = useMemo(() => {
    return Array.from(new Set(MANDIS_DATA.map((m) => m.district)));
  }, []);

  // Filter dataset
  const filteredRecords = useMemo(() => {
    return ALL_MARKET_RECORDS.filter((r) => {
      if (r.date !== LATEST_DATA_DATE) return false;
      if (selectedCrop !== "all" && r.cropId !== selectedCrop) return false;
      if (selectedState !== "all" && r.state !== selectedState) return false;
      if (selectedDistrict !== "all" && r.district !== selectedDistrict) return false;

      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        const matchMarket = r.market.toLowerCase().includes(q);
        const matchCrop = r.crop.toLowerCase().includes(q);
        const matchDistrict = r.district.toLowerCase().includes(q);
        if (!matchMarket && !matchCrop && !matchDistrict) return false;
      }

      return true;
    });
  }, [selectedCrop, selectedState, selectedDistrict, searchQuery]);

  // Sort records
  const sortedRecords = useMemo(() => {
    const records = [...filteredRecords];
    return records.sort((a, b) => {
      const mandiA = MANDIS_DATA.find((m) => m.id === a.marketId);
      const mandiB = MANDIS_DATA.find((m) => m.id === b.marketId);
      const distA = mandiA ? mandiA.distanceKm : 999;
      const distB = mandiB ? mandiB.distanceKm : 999;

      if (sortBy === "price-desc") return b.modalPrice - a.modalPrice;
      if (sortBy === "price-asc") return a.modalPrice - b.modalPrice;
      if (sortBy === "arrival-desc") return b.arrivalQuantity - a.arrivalQuantity;
      if (sortBy === "distance-asc") return distA - distB;
      return 0;
    });
  }, [filteredRecords, sortBy]);

  // Highest modal price in current set for highlighting
  const highestModalPrice = useMemo(() => {
    if (sortedRecords.length === 0) return 0;
    return Math.max(...sortedRecords.map((r) => r.modalPrice));
  }, [sortedRecords]);

  return (
    <div className="space-y-6 pb-12">
      {/* Page Title & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
            <Search className="w-6 h-6 text-brand-600" />
            <span>Market Explorer</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Browse and filter mandi prices, arrivals, and price trends across regions.
          </p>
        </div>

        {/* Data Source Badge */}
        <div className="flex items-center gap-2 bg-emerald-50 text-emerald-800 border border-emerald-200 px-3.5 py-1.5 rounded-full text-xs font-semibold self-start sm:self-auto">
          <Database className="w-4 h-4 text-emerald-600" />
          <span>{DATA_SOURCE_INFO.demoDataBadge}</span>
        </div>
      </div>

      {/* FILTER CONTROLS BAR */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100 text-xs font-bold text-slate-700 uppercase tracking-wider">
          <Filter className="w-4 h-4 text-brand-600" />
          <span>Filter & Search Market Prices</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
          {/* Search Query */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">Keyword Search</label>
            <input
              type="text"
              placeholder="Search crop, mandi, district..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 text-slate-900 font-medium px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          {/* Crop Selector */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">Crop / Commodity</label>
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="w-full bg-slate-50 text-slate-900 font-semibold px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="all">🌾 All Crops ({CROPS_DATA.length})</option>
              {CROPS_DATA.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.icon} {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* State Selector */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">State</label>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full bg-slate-50 text-slate-900 font-semibold px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="all">🗺️ All States</option>
              {states.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>

          {/* District Selector */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">District</label>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full bg-slate-50 text-slate-900 font-semibold px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="all">📍 All Districts</option>
              {districts.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Selector */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">Sort Results By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full bg-slate-50 text-slate-900 font-semibold px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="price-desc">Highest Price First</option>
              <option value="price-asc">Lowest Price First</option>
              <option value="arrival-desc">Highest Arrival Volume</option>
              <option value="distance-asc">Nearest Distance First</option>
            </select>
          </div>
        </div>
      </div>

      {/* RESULTS SUMMARY BAR */}
      <div className="flex items-center justify-between text-xs text-slate-600 px-1">
        <span>
          Showing <strong>{sortedRecords.length}</strong> market results
        </span>
        <span className="text-[11px] text-slate-400">
          Last dataset update: <strong>{DATA_SOURCE_INFO.lastUpdated}</strong>
        </span>
      </div>

      {/* MARKET EXPLORER TABLE */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {sortedRecords.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <Info className="w-10 h-10 text-slate-300 mx-auto" />
            <p className="font-bold text-base text-slate-700">No matching market records found</p>
            <p className="text-xs text-slate-500">
              Try adjusting your crop, state, or district filter parameters.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-4">Market / Mandi</th>
                  <th className="py-3.5 px-4">Crop & Variety</th>
                  <th className="py-3.5 px-4 text-right">Modal Price (₹/qtl)</th>
                  <th className="py-3.5 px-4 text-right">Min - Max Price</th>
                  <th className="py-3.5 px-4 text-right">Today's Arrival</th>
                  <th className="py-3.5 px-4 text-center">Price Trend</th>
                  <th className="py-3.5 px-4 text-center">Supply Status</th>
                  <th className="py-3.5 px-4 text-right">Distance</th>
                  <th className="py-3.5 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {sortedRecords.map((rec) => {
                  const mandi = MANDIS_DATA.find((m) => m.id === rec.marketId);
                  const isHighest = rec.modalPrice === highestModalPrice && highestModalPrice > 0;

                  return (
                    <tr
                      key={rec.id}
                      className={`hover:bg-slate-50/90 transition-colors ${
                        isHighest ? "bg-emerald-50/60" : ""
                      }`}
                    >
                      {/* Mandi Name */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900 flex items-center gap-1.5">
                          <span>{rec.market}</span>
                          {isHighest && (
                            <span className="bg-emerald-600 text-white text-[9px] font-extrabold px-1.5 py-0.2 rounded">
                              HIGHEST
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-slate-400">
                          {rec.district}, {rec.state}
                        </span>
                      </td>

                      {/* Crop & Variety */}
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-slate-800">{rec.crop}</span>
                        <p className="text-[11px] text-slate-500">{rec.variety}</p>
                      </td>

                      {/* Modal Price */}
                      <td className="py-3.5 px-4 text-right font-extrabold text-emerald-700 text-sm">
                        ₹{rec.modalPrice.toLocaleString("en-IN")}
                      </td>

                      {/* Min - Max */}
                      <td className="py-3.5 px-4 text-right text-slate-600">
                        ₹{rec.minPrice} - ₹{rec.maxPrice}
                      </td>

                      {/* Arrival */}
                      <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-800">
                        {rec.arrivalQuantity} qtl
                      </td>

                      {/* Price Trend */}
                      <td className="py-3.5 px-4 text-center">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold ${
                            rec.priceTrend === "increasing"
                              ? "bg-emerald-100 text-emerald-800"
                              : rec.priceTrend === "decreasing"
                              ? "bg-rose-100 text-rose-800"
                              : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {rec.priceTrend === "increasing" && <TrendingUp className="w-3 h-3" />}
                          {rec.priceTrend === "decreasing" && <TrendingDown className="w-3 h-3" />}
                          {rec.priceTrend === "stable" && <Minus className="w-3 h-3" />}
                          <span className="capitalize">{rec.priceTrend}</span>
                        </span>
                      </td>

                      {/* Supply Status */}
                      <td className="py-3.5 px-4 text-center">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            rec.arrivalTrend === "high"
                              ? "bg-amber-100 text-amber-800"
                              : rec.arrivalTrend === "low"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {rec.arrivalTrend} Supply
                        </span>
                      </td>

                      {/* Distance */}
                      <td className="py-3.5 px-4 text-right text-slate-600 font-mono">
                        {mandi ? `${mandi.distanceKm} km` : "N/A"}
                      </td>

                      {/* Action */}
                      <td className="py-3.5 px-4 text-right">
                        <Link
                          href={`/market/${rec.marketId}?crop=${rec.cropId}`}
                          className="inline-flex items-center gap-1 bg-slate-100 hover:bg-brand-50 hover:text-brand-700 text-slate-700 font-semibold px-2.5 py-1 rounded-lg text-xs transition-colors"
                        >
                          <span>View Detail</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
