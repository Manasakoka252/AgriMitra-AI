"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { LanguageCode } from "@/types/market";
import { DATA_SOURCE_INFO } from "@/lib/api/marketService";
import { useDemo, DEMO_SCENARIOS } from "@/context/DemoContext";
import { Sprout, Globe, Database, Sparkles, Menu, X, PlayCircle, Check, ArrowRight } from "lucide-react";

interface NavbarProps {
  onToggleMobileSidebar?: () => void;
  isMobileSidebarOpen?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onToggleMobileSidebar,
  isMobileSidebarOpen,
}) => {
  const { language, setLanguage, t } = useLanguage();
  const { activeScenario, applyScenario } = useDemo();
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const router = useRouter();

  const handleSelectScenario = (scenarioId: string) => {
    applyScenario(scenarioId);
    setIsDemoModalOpen(false);
    router.push("/compare");
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo & Mobile Menu Toggle */}
            <div className="flex items-center gap-3">
              <button
                onClick={onToggleMobileSidebar}
                className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
                aria-label="Toggle Navigation"
              >
                {isMobileSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

              <Link href="/" className="flex items-center gap-2.5 group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-600 to-brand-800 text-white flex items-center justify-center shadow-md shadow-brand-600/20 group-hover:scale-105 transition-transform">
                  <Sprout className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-lg text-slate-900 tracking-tight leading-none font-sans">
                      AgriMitra <span className="text-brand-600">AI</span>
                    </span>
                    <span className="bg-brand-100 text-brand-800 text-[10px] font-bold px-1.5 py-0.5 rounded border border-brand-200">
                      MVP
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 hidden sm:block">
                    {t.tagline}
                  </p>
                </div>
              </Link>
            </div>

            {/* Right Header Actions */}
            <div className="flex items-center gap-2.5">
              {/* Compact Judge Demo Button */}
              <button
                onClick={() => setIsDemoModalOpen(true)}
                className="inline-flex items-center gap-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-900 border border-amber-500/30 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-xs"
                title="Launch Judge Demo Scenarios"
              >
                <PlayCircle className="w-4 h-4 text-amber-600" />
                <span>🎬 Judge Demo</span>
              </button>

              {/* Data Source Indicator */}
              <div className="hidden xl:flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-full px-3 py-1 text-xs text-slate-600">
                <Database className="w-3.5 h-3.5 text-emerald-600" />
                <span>{t.demoDataBadge}</span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-500 font-mono text-[11px]">{DATA_SOURCE_INFO.lastUpdated}</span>
              </div>

              {/* Language Switcher */}
              <div className="relative flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200">
                <Globe className="w-4 h-4 text-slate-500 ml-1.5 mr-1 hidden xs:block" />
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as LanguageCode)}
                  className="bg-transparent text-xs font-semibold text-slate-800 focus:outline-none cursor-pointer pr-1 py-0.5"
                  aria-label="Select Language"
                >
                  <option value="en">English (EN)</option>
                  <option value="te">తెలుగు (TE)</option>
                  <option value="kn">ಕನ್ನಡ (KN)</option>
                  <option value="hi">हिंदी (HI)</option>
                </select>
              </div>

              <Link
                href="/ai-advisor"
                className="hidden sm:inline-flex items-center gap-1.5 bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors shadow-sm shadow-brand-600/30"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Ask AI</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Sleek Modal for Judge Demo Scenarios */}
      {isDemoModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsDemoModalOpen(false)}
        >
          <div
            className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-5 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-slate-900">Judge Demo Scenarios</h3>
                  <p className="text-xs text-slate-500">Evaluate AgriMitra decision support in 30 seconds</p>
                </div>
              </div>
              <button
                onClick={() => setIsDemoModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              {DEMO_SCENARIOS.map((sc) => {
                const isActive = activeScenario.id === sc.id;
                return (
                  <button
                    key={sc.id}
                    onClick={() => handleSelectScenario(sc.id)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start justify-between gap-3 ${
                      isActive
                        ? "bg-amber-50/80 border-amber-400 ring-2 ring-amber-400/20"
                        : "bg-slate-50 hover:bg-slate-100 border-slate-200"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl pt-0.5">{sc.icon}</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-sm text-slate-900">{sc.title}</h4>
                          {isActive && (
                            <span className="bg-amber-500 text-slate-950 text-[10px] font-extrabold px-1.5 py-0.2 rounded">
                              ACTIVE
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-600 mt-1 leading-snug">{sc.description}</p>
                        <p className="text-[11px] text-slate-400 mt-1 font-mono">
                          Farmer: {sc.farmerName} • Location: {sc.location}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-400 flex-shrink-0 mt-1" />
                  </button>
                );
              })}
            </div>

            <div className="pt-2 text-center text-[11px] text-slate-400 border-t border-slate-100">
              Clicking any scenario pre-populates harvest context and opens Market Comparison.
            </div>
          </div>
        </div>
      )}
    </>
  );
};
