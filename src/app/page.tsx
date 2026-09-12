"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import {
  Sprout,
  ArrowRight,
  Search,
  Scale,
  Bot,
  CheckCircle2,
  AlertTriangle,
  Database,
  BarChart3,
  Truck,
  TrendingUp,
  Globe2,
  ShieldCheck,
} from "lucide-react";

export default function RedesignedHomepage() {
  const { t } = useLanguage();

  return (
    <div className="w-full bg-slate-50 text-slate-900 font-sans pb-20">
      {/* CLEAN HERO SECTION */}
      <section className="relative bg-gradient-to-b from-slate-900 via-slate-900 to-brand-950 text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Subtle Background Radial Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-600/20 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
          {/* Brand Badge */}
          <div className="inline-flex items-center gap-2 bg-brand-500/20 text-brand-300 px-4 py-1.5 rounded-full text-xs font-semibold border border-brand-500/30 backdrop-blur">
            <Sprout className="w-4 h-4 text-emerald-400" />
            <span>AgriMitra AI • Decision Support System</span>
          </div>

          {/* Heading & Tagline */}
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight font-sans">
              AgriMitra <span className="text-brand-400">AI</span>
            </h1>

            <p className="text-xl sm:text-3xl font-bold text-amber-300 tracking-tight">
              "Know the market. Choose smarter. Earn better."
            </p>
          </div>

          {/* Short Supporting Description */}
          <p className="text-sm sm:text-lg text-slate-300 font-normal max-w-2xl mx-auto leading-relaxed">
            Simple market information and AI-powered decision support for farmers.
          </p>

          {/* TWO PRIMARY ACTION CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8 text-left max-w-3xl mx-auto">
            {/* Card 1: Check Market Prices */}
            <div className="bg-white text-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl flex flex-col justify-between space-y-6 hover:shadow-2xl hover:border-brand-500/50 transition-all group">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform">
                  <Search className="w-6 h-6" />
                </div>

                <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                  <span>🔎 Check Market Prices</span>
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  Quickly check crop prices and market arrivals across regional mandis.
                </p>
              </div>

              <div>
                <Link
                  href="/explorer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-md group-hover:bg-brand-700 text-xs sm:text-sm"
                >
                  <span>Check Prices</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Card 2: Find the Better Market */}
            <div className="bg-gradient-to-br from-brand-900 to-emerald-950 text-white p-6 sm:p-8 rounded-3xl border border-brand-700/80 shadow-xl flex flex-col justify-between space-y-6 hover:shadow-2xl hover:border-amber-400 transition-all group">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-400/20 text-amber-300 flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform border border-amber-400/30">
                  <Bot className="w-6 h-6" />
                </div>

                <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
                  <span>🤖 Find the Better Market</span>
                </h2>

                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                  Compare markets using price, arrivals, distance and estimated transport cost.
                </p>
              </div>

              <div>
                <Link
                  href="/compare"
                  className="w-full inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold py-3.5 px-6 rounded-xl transition-all shadow-lg text-xs sm:text-sm"
                >
                  <span>Find Better Market</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          {/* Data Grounding Trust Badge */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Decision Support Only • No Profit Claims</span>
            </div>
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-emerald-400" />
              <span>AGMARKNET / e-NAM Data Compatible</span>
            </div>
          </div>
        </div>
      </section>

      {/* BELOW THE FOLD SECTION 1: HOW IT WORKS */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-600">
            Farmer-Centric Design
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            How AgriMitra Simplifies Market Decisions
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Two simple pathways tailored to your immediate intention.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Intention 1 */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-800 text-xs font-bold px-3 py-1 rounded-full">
              INTENTION 1: QUICK PRICE CHECK
            </div>
            <h3 className="text-lg font-bold text-slate-900">"I only want to know today's price."</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Instantly view current minimum, maximum, and modal mandi prices and daily arrival volumes without entering quantities or sharing location.
            </p>
            <Link
              href="/explorer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 hover:text-brand-700"
            >
              <span>Explore Prices & Arrivals</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Intention 2 */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-900 text-xs font-bold px-3 py-1 rounded-full">
              INTENTION 2: PERSONALIZED COMPARISON
            </div>
            <h3 className="text-lg font-bold text-slate-900">"I want help deciding where to sell."</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Enter your crop, location, and produce weight to compare side-by-side Gross Produce Value, Estimated Transport Freight, and 0-100 Market Scores.
            </p>
            <Link
              href="/compare"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-800"
            >
              <span>Compare Markets & Net Returns</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* BELOW THE FOLD SECTION 2: WHY COMPARISON MATTERS */}
      <section className="py-16 bg-slate-900 text-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full text-xs font-semibold">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>Real Agricultural Friction</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              Higher reported price doesn't guarantee higher profit.
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Freight transport costs, vehicle load sizes, and heavy morning market arrivals (gluts) often swallow nominal price advantages at distant mandis.
            </p>
          </div>

          <div className="lg:col-span-6 bg-slate-800 p-6 rounded-2xl border border-slate-700 space-y-3 text-xs">
            <h3 className="font-bold text-sm text-amber-300">Compare Before You Load Your Produce</h3>
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-700 space-y-2">
              <div className="flex justify-between text-slate-300">
                <span>Local Mandi (15 km @ ₹2,800/qtl):</span>
                <span className="font-bold text-emerald-400">Net: ₹55,450</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Distant Mandi (90 km @ ₹2,900/qtl):</span>
                <span className="text-rose-400">Net: ₹53,800</span>
              </div>
              <p className="text-[11px] text-amber-300 pt-2 border-t border-slate-800">
                ✓ Result: Local Mandi yields <strong>₹1,650 MORE</strong> net return due to lower freight!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* DATA TRANSPARENCY STATEMENT */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center space-y-3">
        <div className="inline-flex items-center gap-2 text-slate-500 text-xs font-semibold">
          <Database className="w-4 h-4 text-emerald-600" />
          <span>Demo / Historical Market Data Grounding</span>
        </div>
        <p className="text-xs text-slate-500 leading-relaxed max-w-2xl mx-auto">
          AgriMitra AI uses structured historical mandi price data inspired by AGMARKNET structures. All figures are estimates provided for decision support.
        </p>
      </section>
    </div>
  );
}
