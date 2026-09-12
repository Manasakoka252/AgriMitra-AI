"use client";

import React from "react";
import Link from "next/link";
import { useFavorites } from "@/hooks/useFavorites";
import { MANDIS_DATA } from "@/data/markets";
import { getLatestRecord } from "@/data/marketRecords";
import { DATA_SOURCE_INFO } from "@/lib/api/marketService";
import {
  Star,
  Trash2,
  MapPin,
  ChevronRight,
  Building2,
  Calendar,
  Clock,
} from "lucide-react";

export default function FavoriteMarketsPage() {
  const { favorites, toggleFavorite } = useFavorites();

  return (
    <div className="space-y-6 pb-12">
      {/* HEADER BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
            <Star className="w-6 h-6 text-yellow-500 fill-yellow-400" />
            <span>Favorite Markets (Saved APMCs)</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Bookmarked mandis saved in your local browser storage for quick access.
          </p>
        </div>
      </div>

      {/* FAVORITES GRID */}
      {favorites.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-3">
          <Star className="w-10 h-10 text-slate-300 mx-auto" />
          <p className="font-bold text-base text-slate-700">No favorite markets bookmarked yet</p>
          <p className="text-xs text-slate-500">
            Click the star icon on any mandi card in Market Explorer to save it here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((mandiId) => {
            const mandi = MANDIS_DATA.find((m) => m.id === mandiId);
            if (!mandi) return null;

            const record = getLatestRecord(mandi.id, "tomato");

            return (
              <div
                key={mandi.id}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4 relative flex flex-col justify-between hover:shadow-md transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="font-extrabold text-base text-slate-900">{mandi.name}</h2>
                      <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{mandi.district}, {mandi.state}</span>
                      </p>
                    </div>

                    <button
                      onClick={() => toggleFavorite(mandi.id)}
                      className="p-1.5 text-yellow-500 hover:text-slate-400 rounded-lg hover:bg-slate-50"
                      title="Remove from favorites"
                    >
                      <Star className="w-5 h-5 fill-yellow-400" />
                    </button>
                  </div>

                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2 text-xs">
                    <div className="flex justify-between items-center text-slate-600">
                      <span>Distance:</span>
                      <span className="font-bold text-slate-900">{mandi.distanceKm} km</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-600">
                      <span>Operating Hours:</span>
                      <span className="font-medium text-slate-800">{mandi.operatingDays}</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-600 pt-1 border-t border-slate-200">
                      <span>Latest Tomato Modal:</span>
                      <span className="font-extrabold text-emerald-700 text-sm">
                        ₹{record ? record.modalPrice : 2800} /qtl
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-slate-600">
                      <span>Data Last Updated:</span>
                      <span className="text-[11px] text-slate-400 font-mono">
                        {DATA_SOURCE_INFO.lastUpdated}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <Link
                    href={`/market/${mandi.id}?crop=tomato`}
                    className="w-full inline-flex items-center justify-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold py-2 rounded-xl text-xs transition-colors"
                  >
                    <span>View Mandi Detail & Charts</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
