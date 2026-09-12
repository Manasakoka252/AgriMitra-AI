"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { CROPS_DATA } from "@/data/crops";
import { MANDIS_DATA } from "@/data/markets";
import { getHistoryForMandiCrop, getLatestRecord } from "@/data/marketRecords";
import { analyzePriceTrend } from "@/lib/engine/trends";
import { useFavorites } from "@/hooks/useFavorites";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import {
  MapPin,
  Calendar,
  Star,
  TrendingUp,
  TrendingDown,
  Minus,
  HelpCircle,
  ArrowLeft,
  Share2,
  Database,
  Building2,
} from "lucide-react";

export default function MarketDetailPage() {
  const params = useParams();
  const searchParams = useSearchParams();

  const mandiId = (params.id as string) || "kolar-apmc";
  const cropId = searchParams.get("crop") || "tomato";

  const [timeframe, setTimeframe] = useState<7 | 30 | 90>(30);
  const { isFavorite, toggleFavorite } = useFavorites();

  const mandi = MANDIS_DATA.find((m) => m.id === mandiId) || MANDIS_DATA[0];
  const crop = CROPS_DATA.find((c) => c.id === cropId) || CROPS_DATA[0];

  const latestRecord = getLatestRecord(mandi.id, crop.id);
  const rawHistory = getHistoryForMandiCrop(mandi.id, crop.id, timeframe);

  const trendAnalysis = useMemo(() => analyzePriceTrend(rawHistory), [rawHistory]);

  const favoriteActive = isFavorite(mandi.id);

  // Format chart data for Recharts
  const chartData = useMemo(() => {
    return rawHistory.map((r) => ({
      date: r.date.split("-").slice(1).join("/"),
      modalPrice: r.modalPrice,
      minPrice: r.minPrice,
      maxPrice: r.maxPrice,
      arrivalQuantity: r.arrivalQuantity,
    }));
  }, [rawHistory]);

  return (
    <div className="space-y-6 pb-12">
      {/* Top Back Navigation Bar */}
      <div className="flex items-center justify-between">
        <Link
          href="/explorer"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Market Explorer</span>
        </Link>

        <button
          onClick={() => toggleFavorite(mandi.id)}
          className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg border transition-all ${
            favoriteActive
              ? "bg-amber-50 text-amber-900 border-amber-300"
              : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
          }`}
        >
          <Star
            className={`w-4 h-4 ${
              favoriteActive ? "text-yellow-500 fill-yellow-400" : "text-slate-400"
            }`}
          />
          <span>{favoriteActive ? "Saved in Favorites" : "Save Market"}</span>
        </button>
      </div>

      {/* MANDI HEADER CARD */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">{crop.icon}</span>
              <h1 className="text-2xl font-extrabold text-slate-900">{mandi.name}</h1>
            </div>
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>
                {mandi.district}, {mandi.state} • Distance: <strong>{mandi.distanceKm} km</strong>
              </span>
            </p>
          </div>

          {/* Timeframe Toggle Buttons */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 self-start sm:self-auto">
            <button
              onClick={() => setTimeframe(7)}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                timeframe === 7 ? "bg-white text-slate-900 shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              7 Days
            </button>
            <button
              onClick={() => setTimeframe(30)}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                timeframe === 30 ? "bg-white text-slate-900 shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              30 Days
            </button>
            <button
              onClick={() => setTimeframe(90)}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                timeframe === 90 ? "bg-white text-slate-900 shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              90 Days
            </button>
          </div>
        </div>
      </div>

      {/* TODAY'S PRICE CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Modal Price */}
        <div className="bg-gradient-to-br from-brand-900 to-emerald-950 text-white p-5 rounded-2xl shadow-md space-y-1">
          <span className="text-xs text-brand-300 font-semibold uppercase tracking-wider">
            Today's Modal Price
          </span>
          <p className="text-3xl font-extrabold text-amber-400">
            ₹{latestRecord ? latestRecord.modalPrice.toLocaleString("en-IN") : 0}
            <span className="text-xs font-normal text-slate-300"> / quintal</span>
          </p>
          <p className="text-[11px] text-brand-200 font-medium">Most frequent trading price</p>
        </div>

        {/* Min Price */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
            Minimum Price
          </span>
          <p className="text-2xl font-extrabold text-slate-800">
            ₹{latestRecord ? latestRecord.minPrice.toLocaleString("en-IN") : 0}
            <span className="text-xs font-normal text-slate-400"> / qtl</span>
          </p>
          <p className="text-[11px] text-slate-400">Lowest bid recorded today</p>
        </div>

        {/* Max Price */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
            Maximum Price
          </span>
          <p className="text-2xl font-extrabold text-slate-800">
            ₹{latestRecord ? latestRecord.maxPrice.toLocaleString("en-IN") : 0}
            <span className="text-xs font-normal text-slate-400"> / qtl</span>
          </p>
          <p className="text-[11px] text-slate-400">Peak bid for top-graded produce</p>
        </div>

        {/* Today's Arrival */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
            Market Arrival Volume
          </span>
          <p className="text-2xl font-extrabold text-slate-900">
            {latestRecord ? latestRecord.arrivalQuantity.toLocaleString("en-IN") : 0}
            <span className="text-xs font-normal text-slate-500"> quintals</span>
          </p>
          <span className="inline-block bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded capitalize">
            {latestRecord?.arrivalTrend || "Moderate"} Supply Level
          </span>
        </div>
      </div>

      {/* PLAIN LANGUAGE "WHAT DOES THIS MEAN?" SECTION */}
      <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-5 space-y-2">
        <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
          <HelpCircle className="w-4 h-4 text-amber-600" />
          <span>What does this mean for a farmer?</span>
        </div>
        <p className="text-xs text-slate-800 leading-relaxed">
          {trendAnalysis.summaryText}
        </p>
      </div>

      {/* RECHARTS SECTION: PRICE & ARRIVAL HISTORY */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Price History Chart */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-slate-900">
                Price Trajectory ({timeframe} Days)
              </h3>
              <p className="text-xs text-slate-500">Modal price in ₹ per quintal over time</p>
            </div>
            <span className="text-xs font-bold text-emerald-700">
              {trendAnalysis.priceChangePercent >= 0 ? "+" : ""}
              {trendAnalysis.priceChangePercent}%
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="priceColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#16a34a" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#16a34a" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: "#64748b" }} />
                <YAxis domain={["auto", "auto"]} tick={{ fontSize: 10, fill: "#64748b" }} />
                <Tooltip
                  formatter={(val: any) => [`₹${val}/qtl`, "Modal Price"]}
                  contentStyle={{ backgroundColor: "#0f172a", color: "#fff", borderRadius: "8px", fontSize: "12px" }}
                />
                <Area
                  type="monotone"
                  dataKey="modalPrice"
                  stroke="#16a34a"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#priceColor)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Arrival Volume Chart */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-slate-900">
                Arrival Volume History ({timeframe} Days)
              </h3>
              <p className="text-xs text-slate-500">Daily crop supply entering mandi in quintals</p>
            </div>
            <span className="text-xs font-mono text-slate-600">
              Avg: {trendAnalysis.arrivalAverage} qtl/day
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: "#64748b" }} />
                <YAxis tick={{ fontSize: 10, fill: "#64748b" }} />
                <Tooltip
                  formatter={(val: any) => [`${val} quintals`, "Arrival Volume"]}
                  contentStyle={{ backgroundColor: "#0f172a", color: "#fff", borderRadius: "8px", fontSize: "12px" }}
                />
                <Bar dataKey="arrivalQuantity" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* MANDI FACILITIES INFO CARD */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
        <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
          <Building2 className="w-4 h-4 text-brand-600" />
          <span>Mandi Infrastructure & Operating Details</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
            <span className="text-slate-400 block text-[11px]">Operating Hours</span>
            <strong className="text-slate-800">{mandi.operatingDays}</strong>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
            <span className="text-slate-400 block text-[11px]">Grading & Quality Lab</span>
            <strong className="text-slate-800">
              {mandi.gradingAvailable ? "Available on-site" : "Manual trader assaying"}
            </strong>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
            <span className="text-slate-400 block text-[11px]">Yard Facilities</span>
            <span className="text-slate-700">{mandi.facilities.join(" • ")}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
