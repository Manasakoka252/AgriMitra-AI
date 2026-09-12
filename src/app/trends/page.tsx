"use client";

import React, { useState, useMemo } from "react";
import { CROPS_DATA } from "@/data/crops";
import { MANDIS_DATA } from "@/data/markets";
import { getHistoryForMandiCrop, getLatestRecordsForCrop } from "@/data/marketRecords";
import { analyzePriceTrend } from "@/lib/engine/trends";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ScatterChart,
  Scatter,
} from "recharts";
import {
  TrendingUp,
  BarChart3,
  Calendar,
  Sparkles,
  Info,
  Layers,
} from "lucide-react";

export default function TrendsPage() {
  const [selectedCropId, setSelectedCropId] = useState<string>("tomato");
  const [timeframe, setTimeframe] = useState<7 | 30 | 90>(30);

  const crop = CROPS_DATA.find((c) => c.id === selectedCropId) || CROPS_DATA[0];
  const primaryMandi = MANDIS_DATA[0]; // Kolar APMC

  const history = getHistoryForMandiCrop(primaryMandi.id, crop.id, timeframe);
  const trendResult = useMemo(() => analyzePriceTrend(history), [history]);

  // Comparative data for top 3 mandis
  const mandi1History = getHistoryForMandiCrop("kolar-apmc", crop.id, timeframe);
  const mandi2History = getHistoryForMandiCrop("bengaluru-yeshwanthpur", crop.id, timeframe);
  const mandi3History = getHistoryForMandiCrop("chikkaballapur-apmc", crop.id, timeframe);

  // Combine histories for comparison chart
  const comparisonData = useMemo(() => {
    return mandi1History.map((m1, idx) => {
      const m2 = mandi2History[idx] || m1;
      const m3 = mandi3History[idx] || m1;
      return {
        date: m1.date.split("-").slice(1).join("/"),
        Kolar: m1.modalPrice,
        Bengaluru: m2.modalPrice,
        Chikkaballapur: m3.modalPrice,
        arrivalKolar: m1.arrivalQuantity,
      };
    });
  }, [mandi1History, mandi2History, mandi3History]);

  const latestRecords = getLatestRecordsForCrop(crop.id);

  return (
    <div className="space-y-6 pb-12">
      {/* HEADER SECTION */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-brand-600" />
            <span>Price & Arrival Trend Analytics</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Historical price trends, arrival correlations, and comparative mandi trajectory analysis.
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3 flex-wrap">
          <select
            value={selectedCropId}
            onChange={(e) => setSelectedCropId(e.target.value)}
            className="bg-slate-50 text-slate-900 text-xs font-bold px-3 py-2 rounded-xl border border-slate-200"
          >
            {CROPS_DATA.map((c) => (
              <option key={c.id} value={c.id}>
                {c.icon} {c.name}
              </option>
            ))}
          </select>

          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setTimeframe(7)}
              className={`px-3 py-1 text-xs font-bold rounded-lg ${
                timeframe === 7 ? "bg-white text-slate-900 shadow-xs" : "text-slate-600"
              }`}
            >
              7D
            </button>
            <button
              onClick={() => setTimeframe(30)}
              className={`px-3 py-1 text-xs font-bold rounded-lg ${
                timeframe === 30 ? "bg-white text-slate-900 shadow-xs" : "text-slate-600"
              }`}
            >
              30D
            </button>
            <button
              onClick={() => setTimeframe(90)}
              className={`px-3 py-1 text-xs font-bold rounded-lg ${
                timeframe === 90 ? "bg-white text-slate-900 shadow-xs" : "text-slate-600"
              }`}
            >
              90D
            </button>
          </div>
        </div>
      </div>

      {/* AI PLAIN LANGUAGE OBSERVATIONS CARD */}
      <div className="bg-gradient-to-r from-brand-900 to-slate-900 text-white p-5 rounded-2xl border border-brand-800 shadow-md space-y-2">
        <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
          <Sparkles className="w-4 h-4" />
          <span>AI Automated Observation</span>
        </div>
        <p className="text-sm text-slate-200 leading-relaxed font-medium">
          {trendResult.summaryText}
        </p>
      </div>

      {/* CHARTS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Multi-Mandi Price Comparison */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900">
              1. Multi-Mandi Price Comparison ({crop.name})
            </h3>
            <span className="text-xs text-slate-400">Modal Price (₹/qtl)</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={comparisonData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: "#64748b" }} />
                <YAxis tick={{ fontSize: 10, fill: "#64748b" }} />
                <Tooltip
                  formatter={(val: any) => [`₹${val}/qtl`]}
                  contentStyle={{ backgroundColor: "#0f172a", color: "#fff", borderRadius: "8px", fontSize: "12px" }}
                />
                <Legend />
                <Line type="monotone" dataKey="Kolar" stroke="#16a34a" strokeWidth={2.5} dot={false} />
                <Line type="monotone" dataKey="Bengaluru" stroke="#3b82f6" strokeWidth={2.5} dot={false} />
                <Line type="monotone" dataKey="Chikkaballapur" stroke="#f59e0b" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Price vs Arrival Volume Correlation */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900">
              2. Price vs. Arrival Volume Relationship
            </h3>
            <span className="text-xs text-slate-400">Kolar APMC</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={comparisonData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: "#64748b" }} />
                <YAxis yAxisId="left" orientation="left" stroke="#16a34a" tick={{ fontSize: 10 }} />
                <YAxis yAxisId="right" orientation="right" stroke="#8b5cf6" tick={{ fontSize: 10 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#0f172a", color: "#fff", borderRadius: "8px", fontSize: "12px" }}
                />
                <Legend />
                <Bar yAxisId="right" dataKey="arrivalKolar" name="Arrival (qtl)" fill="#8b5cf6" opacity={0.6} />
                <Line yAxisId="left" type="monotone" dataKey="Kolar" name="Price (₹)" stroke="#16a34a" strokeWidth={3} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* MARKET RANKING MATRIX TABLE */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="font-bold text-sm text-slate-900">
          Today's Regional Mandi Ranking Matrix ({crop.name})
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] tracking-wider border-y border-slate-200">
              <tr>
                <th className="py-3 px-4">Rank</th>
                <th className="py-3 px-4">Market</th>
                <th className="py-3 px-4 text-right">Modal Price</th>
                <th className="py-3 px-4 text-right">Arrival Volume</th>
                <th className="py-3 px-4 text-center">30-Day Trajectory</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {latestRecords
                .sort((a, b) => b.modalPrice - a.modalPrice)
                .map((rec, rIdx) => (
                  <tr key={rec.id} className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-bold text-slate-400">#{rIdx + 1}</td>
                    <td className="py-3 px-4 font-bold text-slate-900">
                      {rec.market} <span className="text-slate-400 text-[11px]">({rec.district})</span>
                    </td>
                    <td className="py-3 px-4 text-right font-extrabold text-emerald-700">
                      ₹{rec.modalPrice.toLocaleString("en-IN")}/qtl
                    </td>
                    <td className="py-3 px-4 text-right font-mono text-slate-700">
                      {rec.arrivalQuantity} qtl
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded capitalize">
                        {rec.priceTrend}
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
