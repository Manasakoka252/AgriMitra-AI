"use client";

import React, { useState, useMemo } from "react";
import { useDemo } from "@/context/DemoContext";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { CROPS_DATA } from "@/data/crops";
import { MANDIS_DATA } from "@/data/markets";
import { getLatestRecordsForCrop } from "@/data/marketRecords";
import { generateMarketInsight, AIAdvisorResponse } from "@/lib/engine/aiAdvisor";
import {
  Bot,
  Sparkles,
  Send,
  CheckCircle2,
  AlertTriangle,
  Info,
  Scale,
  MessageSquare,
  HelpCircle,
  TrendingUp,
} from "lucide-react";

export default function AIAdvisorPage() {
  const { t } = useLanguage();
  const {
    selectedCropId,
    setSelectedCropId,
    quantityQuintals,
    setQuantityQuintals,
    farmerLocation,
    setFarmerLocation,
  } = useDemo();

  const [customQuestion, setCustomQuestion] = useState("");
  const [activeQuestion, setActiveQuestion] = useState<string | null>(null);

  const activeCrop = CROPS_DATA.find((c) => c.id === selectedCropId) || CROPS_DATA[0];
  const records = getLatestRecordsForCrop(activeCrop.id);

  // Example prompt suggestions
  const exampleQuestions = [
    `Where should I consider selling my ${activeCrop.name.toLowerCase()}s?`,
    "Which market currently has the best modal price?",
    "Which mandi is closest to my location?",
    "Is market arrival volume currently high or low?",
    `What is the best market strategy for my ${quantityQuintals} quintals?`,
  ];

  // Synthesize AI Advisor response
  const aiResponse: AIAdvisorResponse = useMemo(() => {
    return generateMarketInsight(
      {
        crop: activeCrop,
        quantityQuintals,
        farmerLocation,
        customQuestion: activeQuestion || customQuestion,
      },
      MANDIS_DATA,
      records
    );
  }, [activeCrop, quantityQuintals, farmerLocation, activeQuestion, customQuestion, records]);

  const handleAskQuestion = (questionText: string) => {
    setActiveQuestion(questionText);
    setCustomQuestion(questionText);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customQuestion.trim()) {
      setActiveQuestion(customQuestion);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* HEADER SECTION */}
      <div className="bg-gradient-to-r from-brand-950 via-slate-900 to-brand-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-3">
        <div className="inline-flex items-center gap-2 bg-brand-500/20 text-brand-300 px-3 py-1 rounded-full text-xs font-semibold border border-brand-500/30">
          <Bot className="w-4 h-4 text-emerald-400" />
          <span>Core AI Feature • Natural Market Advisor</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
          Ask AgriMitra AI Market Advisor
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
          Ask natural questions about mandi prices, arrivals, transport freight tradeoffs, and market trends. Our analytical engine breaks down decision factors clearly for farmers.
        </p>
      </div>

      {/* INPUT CONTEXT BAR */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700">
          Active Decision Context
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">Crop</label>
            <select
              value={selectedCropId}
              onChange={(e) => setSelectedCropId(e.target.value)}
              className="w-full bg-slate-50 text-slate-900 font-bold px-3 py-2 rounded-xl border border-slate-200"
            >
              {CROPS_DATA.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.icon} {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">Quantity (qtl)</label>
            <input
              type="number"
              min={1}
              value={quantityQuintals}
              onChange={(e) => setQuantityQuintals(Number(e.target.value))}
              className="w-full bg-slate-50 text-slate-900 font-bold px-3 py-2 rounded-xl border border-slate-200"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">Location</label>
            <input
              type="text"
              value={farmerLocation}
              onChange={(e) => setFarmerLocation(e.target.value)}
              className="w-full bg-slate-50 text-slate-900 font-bold px-3 py-2 rounded-xl border border-slate-200"
            />
          </div>
        </div>
      </div>

      {/* EXAMPLE QUESTIONS CHIPS */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
          <HelpCircle className="w-3.5 h-3.5 text-brand-600" />
          <span>Click to ask example questions:</span>
        </span>
        <div className="flex flex-wrap gap-2">
          {exampleQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleAskQuestion(q)}
              className={`px-3 py-2 rounded-xl text-xs font-medium transition-all text-left border ${
                activeQuestion === q
                  ? "bg-brand-600 text-white border-brand-600 shadow-sm"
                  : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
              }`}
            >
              💬 "{q}"
            </button>
          ))}
        </div>
      </div>

      {/* CUSTOM QUESTION INPUT FORM */}
      <form onSubmit={handleFormSubmit} className="bg-white p-2 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-2">
        <input
          type="text"
          placeholder="Ask anything about current mandi prices, distance, transport, or trends..."
          value={customQuestion}
          onChange={(e) => setCustomQuestion(e.target.value)}
          className="flex-1 bg-transparent text-xs font-medium px-4 py-2.5 focus:outline-none text-slate-900"
        />
        <button
          type="submit"
          className="bg-brand-600 hover:bg-brand-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm"
        >
          <span>Ask AI</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>

      {/* AI ADVISOR RESPONSE CONTAINER */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-500 to-amber-500 text-white flex items-center justify-center shadow-lg shadow-brand-500/30">
              <Bot className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg text-white">AgriMitra AI Response</span>
                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-500/30">
                  Data Grounded
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Evaluating {activeCrop.name} market data across {records.length} regional mandis
              </p>
            </div>
          </div>
        </div>

        {/* Question Echo */}
        {activeQuestion && (
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs text-amber-300 font-mono">
            <strong>Farmer Asked:</strong> "{activeQuestion}"
          </div>
        )}

        {/* AI Answer & Headline */}
        <div className="space-y-3">
          <h2 className="text-2xl font-extrabold text-amber-400">
            {aiResponse.headline}
          </h2>
          <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
            {aiResponse.explanation}
          </p>
        </div>

        {/* DIAGNOSTIC FACTORS BOX ("Why this recommendation?") */}
        <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Why this recommendation? (Factor Breakdown)</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {aiResponse.factors.map((fac, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 bg-slate-900 p-3 rounded-xl border border-slate-800"
              >
                {fac.type === "positive" ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                ) : fac.type === "warning" ? (
                  <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                ) : (
                  <Info className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                )}
                <span className="text-slate-200">{fac.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* COMPARISON SUMMARY MATRIX */}
        <div className="space-y-3 pt-2">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Evaluated Markets Ranking Matrix
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            {aiResponse.comparisonSummary.map((item, iIdx) => (
              <div
                key={iIdx}
                className={`p-3.5 rounded-xl border space-y-1.5 ${
                  iIdx === 0
                    ? "bg-slate-950 border-brand-500/60 ring-1 ring-brand-500/30"
                    : "bg-slate-950/60 border-slate-800"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white truncate">{item.marketName}</span>
                  <span className="text-[10px] font-mono text-amber-400 font-bold">
                    Score: {item.score}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 flex justify-between">
                  <span>Price: ₹{item.modalPrice}/qtl</span>
                  <span>{item.distanceKm} km</span>
                </div>
                <div className="text-xs font-bold text-emerald-400 pt-1 border-t border-slate-800 flex justify-between">
                  <span>Est. Net:</span>
                  <span>₹{item.estimatedNetValue.toLocaleString("en-IN")}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Transparent Disclaimer */}
        <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-400 italic">
          * {aiResponse.disclaimer}
        </div>
      </div>
    </div>
  );
}
