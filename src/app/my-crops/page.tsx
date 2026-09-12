"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSavedCrops } from "@/hooks/useSavedCrops";
import { CROPS_DATA } from "@/data/crops";
import { MANDIS_DATA } from "@/data/markets";
import { getLatestRecordsForCrop } from "@/data/marketRecords";
import {
  Wheat,
  Plus,
  Trash2,
  ChevronRight,
  TrendingUp,
  Sprout,
  Check,
} from "lucide-react";

export default function MyCropsPage() {
  const { savedCrops, toggleSavedCrop } = useSavedCrops();
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="space-y-6 pb-12">
      {/* HEADER BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
            <Wheat className="w-6 h-6 text-amber-500" />
            <span>My Saved Crops</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Personalize your daily dashboard with your active farm produce.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(!showAddModal)}
          className="inline-flex items-center gap-1.5 bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Crop to Watchlist</span>
        </button>
      </div>

      {/* ADD CROP PICKER INLINE EXPANDER */}
      {showAddModal && (
        <div className="bg-amber-50 p-5 rounded-2xl border border-amber-200 space-y-3">
          <h2 className="font-bold text-xs uppercase tracking-wider text-amber-900">
            Select Crops to Track on Your Dashboard:
          </h2>
          <div className="flex flex-wrap gap-2">
            {CROPS_DATA.map((crop) => {
              const isSaved = savedCrops.includes(crop.id);
              return (
                <button
                  key={crop.id}
                  onClick={() => toggleSavedCrop(crop.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                    isSaved
                      ? "bg-amber-500 text-slate-950 border-amber-600 shadow-xs"
                      : "bg-white text-slate-700 border-slate-200 hover:bg-amber-100"
                  }`}
                >
                  <span>{crop.icon}</span>
                  <span>{crop.name}</span>
                  {isSaved && <Check className="w-3.5 h-3.5" />}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* SAVED CROPS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {savedCrops.map((cropId) => {
          const crop = CROPS_DATA.find((c) => c.id === cropId);
          if (!crop) return null;

          const records = getLatestRecordsForCrop(crop.id);
          const bestRecord = [...records].sort((a, b) => b.modalPrice - a.modalPrice)[0];

          return (
            <div
              key={crop.id}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4 relative flex flex-col justify-between hover:shadow-md transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="text-3xl">{crop.icon}</span>
                    <div>
                      <h2 className="font-extrabold text-base text-slate-900">{crop.name}</h2>
                      <span className="text-[11px] text-slate-400">{crop.category}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleSavedCrop(crop.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50"
                    title="Remove crop"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2 text-xs">
                  <div className="flex justify-between items-center text-slate-600">
                    <span>Best Current Price:</span>
                    <span className="font-extrabold text-emerald-700 text-sm">
                      ₹{bestRecord ? bestRecord.modalPrice.toLocaleString("en-IN") : 0} /qtl
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-slate-600">
                    <span>Top Market:</span>
                    <span className="font-bold text-slate-900">
                      {bestRecord ? bestRecord.market : "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-slate-600">
                    <span>Latest Arrival:</span>
                    <span className="font-mono font-bold text-slate-800">
                      {bestRecord ? `${bestRecord.arrivalQuantity} qtl` : "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-slate-600 pt-1 border-t border-slate-200">
                    <span>Price Trend:</span>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded capitalize">
                      {bestRecord?.priceTrend || "Stable"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <Link
                  href={`/compare?crop=${crop.id}`}
                  className="w-full inline-flex items-center justify-center gap-1.5 bg-brand-600 hover:bg-brand-700 text-white font-bold py-2 rounded-xl text-xs transition-colors"
                >
                  <span>Compare Markets for {crop.name}</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
