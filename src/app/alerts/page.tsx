"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MarketAlert } from "@/types/market";
import {
  Bell,
  TrendingUp,
  TrendingDown,
  Package,
  AlertTriangle,
  Info,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

export default function AlertsPage() {
  const [filterSeverity, setFilterSeverity] = useState<string>("all");

  const sampleAlerts: MarketAlert[] = [
    {
      id: "alt-1",
      type: "opportunity",
      title: "📈 Price Opportunity Alert (Tomato)",
      description: "Kolar APMC currently reports a modal price of ₹2,850/qtl, which is ₹180 higher than nearby regional yards.",
      marketName: "Kolar APMC Market",
      cropName: "Tomato",
      severity: "high",
      date: "Today, 06:15 AM",
    },
    {
      id: "alt-2",
      type: "arrival",
      title: "📦 High Arrival Alert (Onion)",
      description: "Arrival volume at Bengaluru (Yeshwanthpur RMC) reached 1,250 quintals today (~35% above daily average). Auction delays possible.",
      marketName: "Bengaluru Yeshwanthpur RMC",
      cropName: "Onion",
      severity: "medium",
      date: "Today, 05:45 AM",
    },
    {
      id: "alt-3",
      type: "drop",
      title: "📉 Price Drop Warning (Green Chilli)",
      description: "Chikkaballapur APMC green chilli modal price dipped by ₹600/qtl due to heavy morning inflow.",
      marketName: "Chikkaballapur APMC",
      cropName: "Chilli",
      severity: "medium",
      date: "Yesterday",
    },
    {
      id: "alt-4",
      type: "change",
      title: "⚠ Market Condition Change (Potato)",
      description: "Lasalgaon market grading rules updated for summer crop varieties. Check export quality specifications.",
      marketName: "Lasalgaon APMC",
      cropName: "Potato",
      severity: "info",
      date: "2 days ago",
    },
  ];

  const filteredAlerts = sampleAlerts.filter((alt) => {
    if (filterSeverity !== "all" && alt.severity !== filterSeverity) return false;
    return true;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* HEADER BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
            <Bell className="w-6 h-6 text-rose-600" />
            <span>Market Alert Center</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time market opportunity alerts, sudden price spikes, glut warnings, and supply notices.
          </p>
        </div>

        {/* Severity filter */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-bold text-slate-600">Filter:</label>
          <select
            value={filterSeverity}
            onChange={(e) => setFilterSeverity(e.target.value)}
            className="bg-slate-50 text-slate-900 text-xs font-bold px-3 py-2 rounded-xl border border-slate-200"
          >
            <option value="all">All Alerts ({sampleAlerts.length})</option>
            <option value="high">High Priority Only</option>
            <option value="medium">Medium Priority</option>
            <option value="info">Informational</option>
          </select>
        </div>
      </div>

      {/* ALERTS LIST */}
      <div className="space-y-4">
        {filteredAlerts.map((alt) => {
          let badgeColor = "bg-rose-100 text-rose-800 border-rose-200";
          let Icon = TrendingUp;

          if (alt.type === "opportunity") {
            badgeColor = "bg-emerald-100 text-emerald-800 border-emerald-200";
            Icon = TrendingUp;
          } else if (alt.type === "arrival") {
            badgeColor = "bg-amber-100 text-amber-800 border-amber-200";
            Icon = Package;
          } else if (alt.type === "drop") {
            badgeColor = "bg-rose-100 text-rose-800 border-rose-200";
            Icon = TrendingDown;
          } else {
            badgeColor = "bg-blue-100 text-blue-800 border-blue-200";
            Icon = Info;
          }

          return (
            <div
              key={alt.id}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3 relative hover:shadow-md transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2">
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${badgeColor}`}>
                    {alt.severity.toUpperCase()} PRIORITY
                  </span>
                  <span className="text-xs text-slate-400 font-mono">{alt.date}</span>
                </div>
                <span className="text-xs font-semibold text-slate-600">
                  {alt.marketName} • {alt.cropName}
                </span>
              </div>

              <div>
                <h2 className="font-extrabold text-base text-slate-900">{alt.title}</h2>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{alt.description}</p>
              </div>

              <div className="pt-2 flex justify-end">
                <Link
                  href="/compare"
                  className="inline-flex items-center gap-1 text-xs font-bold text-brand-600 hover:underline"
                >
                  <span>Evaluate Market in Compare</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Transparency Note */}
      <div className="bg-slate-100 p-4 rounded-xl text-xs text-slate-600 flex items-start gap-2">
        <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
        <p>
          <strong>Decision Support Notice:</strong> Alerts are calculated using statistical standard deviations in arrival and price data. They do not constitute guaranteed price promises.
        </p>
      </div>
    </div>
  );
}
