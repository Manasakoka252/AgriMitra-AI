"use client";

import React, { useState } from "react";
import { CROPS_DATA } from "@/data/crops";
import { MANDIS_DATA } from "@/data/markets";
import { calculateNetValue } from "@/lib/engine/calculations";
import {
  Truck,
  Calculator,
  Info,
  MapPin,
  ShieldCheck,
  Scale,
} from "lucide-react";

export default function TransportCalculatorPage() {
  const [selectedCropId, setSelectedCropId] = useState("tomato");
  const [quantityQuintals, setQuantityQuintals] = useState(20);
  const [mandiId, setMandiId] = useState("kolar-apmc");
  const [modalPrice, setModalPrice] = useState(2850);
  const [customDistanceKm, setCustomDistanceKm] = useState(12);

  const mandi = MANDIS_DATA.find((m) => m.id === mandiId) || MANDIS_DATA[0];
  const crop = CROPS_DATA.find((c) => c.id === selectedCropId) || CROPS_DATA[0];

  const netCalc = calculateNetValue(quantityQuintals, modalPrice, customDistanceKm);

  const handleMandiChange = (id: string) => {
    setMandiId(id);
    const selected = MANDIS_DATA.find((m) => m.id === id);
    if (selected) {
      setCustomDistanceKm(selected.distanceKm);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* HEADER BAR */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
            <Truck className="w-6 h-6 text-teal-600" />
            <span>Transport & Net Return Calculator</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Estimate freight costs based on distance, truck load weight, and calculate net value after transport.
          </p>
        </div>
      </div>

      {/* INPUT FORM CARD */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700">
          Transport Calculation Inputs
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          {/* Crop Selector */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">Produce Crop</label>
            <select
              value={selectedCropId}
              onChange={(e) => setSelectedCropId(e.target.value)}
              className="w-full bg-slate-50 text-slate-900 font-bold px-3 py-2.5 rounded-xl border border-slate-200"
            >
              {CROPS_DATA.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.icon} {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">Quantity (Quintals)</label>
            <input
              type="number"
              min={1}
              value={quantityQuintals}
              onChange={(e) => setQuantityQuintals(Number(e.target.value))}
              className="w-full bg-slate-50 text-slate-900 font-bold px-3 py-2.5 rounded-xl border border-slate-200"
            />
          </div>

          {/* Mandi Selector */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">Destination Mandi</label>
            <select
              value={mandiId}
              onChange={(e) => handleMandiChange(e.target.value)}
              className="w-full bg-slate-50 text-slate-900 font-bold px-3 py-2.5 rounded-xl border border-slate-200"
            >
              {MANDIS_DATA.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} ({m.distanceKm} km)
                </option>
              ))}
            </select>
          </div>

          {/* Modal Price Input */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">Modal Price (₹/qtl)</label>
            <input
              type="number"
              min={100}
              value={modalPrice}
              onChange={(e) => setModalPrice(Number(e.target.value))}
              className="w-full bg-slate-50 text-slate-900 font-bold px-3 py-2.5 rounded-xl border border-slate-200"
            />
          </div>
        </div>

        {/* Distance Slider */}
        <div className="pt-3 border-t border-slate-100 space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-slate-700">Estimated Transport Distance (km):</span>
            <span className="font-mono font-extrabold text-brand-700 text-sm">
              {customDistanceKm} km
            </span>
          </div>
          <input
            type="range"
            min={1}
            max={700}
            value={customDistanceKm}
            onChange={(e) => setCustomDistanceKm(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-600"
          />
        </div>
      </div>

      {/* RESULTS DISPLAY GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Gross Value */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Estimated Gross Value
          </span>
          <p className="text-3xl font-extrabold text-slate-900">
            ₹{netCalc.grossValue.toLocaleString("en-IN")}
          </p>
          <p className="text-xs text-slate-500">
            {quantityQuintals} qtl × ₹{modalPrice}/qtl
          </p>
        </div>

        {/* Transport Details */}
        <div className="bg-rose-500/10 border border-rose-500/30 p-6 rounded-2xl space-y-2">
          <span className="text-xs font-semibold text-rose-800 uppercase tracking-wider flex items-center gap-1.5">
            <Truck className="w-4 h-4 text-rose-600" />
            Estimated Freight Cost
          </span>
          <p className="text-3xl font-extrabold text-rose-700">
            - ₹{netCalc.transportDetails.totalEstimatedCost.toLocaleString("en-IN")}
          </p>
          <p className="text-xs text-slate-700 font-medium">
            Vehicle: <strong>{netCalc.transportDetails.vehicleType}</strong>
          </p>
          <p className="text-[11px] text-slate-500">
            Base ₹{netCalc.transportDetails.baseCharge} + ₹{netCalc.transportDetails.perKmRate}/km
          </p>
        </div>

        {/* Net Value */}
        <div className="bg-gradient-to-br from-brand-900 to-emerald-950 text-white p-6 rounded-2xl shadow-lg space-y-2">
          <span className="text-xs font-semibold text-brand-300 uppercase tracking-wider">
            Estimated Net Return
          </span>
          <p className="text-3xl font-extrabold text-amber-400">
            ₹{netCalc.netValue.toLocaleString("en-IN")}
          </p>
          <p className="text-xs text-slate-200">
            Effective realization: <strong>₹{netCalc.effectivePricePerQuintal}/qtl</strong>
          </p>
        </div>
      </div>

      {/* Mandatory Disclaimer */}
      <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-xs text-amber-900 flex items-start gap-2">
        <Info className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
        <p>
          <strong>Notice:</strong> This is an estimate based on standard regional freight rates. Actual transportation, driver unloading fees, loading labor, and APMC market commission charges may differ at the physical mandi yard.
        </p>
      </div>
    </div>
  );
}
