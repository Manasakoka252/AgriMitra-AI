"use client";

import React, { useState } from "react";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import { DemoProvider } from "@/context/DemoContext";
import { DemoBanner } from "./DemoBanner";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Search,
  Scale,
  Bot,
  TrendingUp,
  Bell,
  Wheat,
  Star,
  Truck,
  Home,
  X,
  Database,
} from "lucide-react";
import { DATA_SOURCE_INFO } from "@/lib/api/marketService";

function AppShellContent({ children }: { children: React.ReactNode }) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const pathname = usePathname();

  const isLandingPage = pathname === "/";

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900">
      {/* Top Demo Scenario Preset Banner */}
      <DemoBanner />

      {/* Main Navbar */}
      <Navbar
        onToggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
        isMobileSidebarOpen={mobileSidebarOpen}
      />

      {/* Mobile Drawer */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm lg:hidden flex"
          onClick={() => setMobileSidebarOpen(false)}
        >
          <div
            className="w-72 bg-slate-900 text-slate-100 h-full p-4 flex flex-col justify-between shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
                <span className="font-bold text-lg text-white">Navigation Menu</span>
                <button
                  onClick={() => setMobileSidebarOpen(false)}
                  className="p-1 text-slate-400 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-1">
                <Link
                  href="/"
                  onClick={() => setMobileSidebarOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-800"
                >
                  <Home className="w-5 h-5 text-emerald-400" />
                  <span>Landing Page</span>
                </Link>
                <Link
                  href="/dashboard"
                  onClick={() => setMobileSidebarOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-800"
                >
                  <LayoutDashboard className="w-5 h-5 text-brand-400" />
                  <span>Dashboard</span>
                </Link>
                <Link
                  href="/explorer"
                  onClick={() => setMobileSidebarOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-800"
                >
                  <Search className="w-5 h-5 text-blue-400" />
                  <span>Market Explorer</span>
                </Link>
                <Link
                  href="/compare"
                  onClick={() => setMobileSidebarOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium bg-amber-500/20 text-amber-300 font-semibold"
                >
                  <Scale className="w-5 h-5 text-amber-400" />
                  <span>Compare Markets (Hot)</span>
                </Link>
                <Link
                  href="/ai-advisor"
                  onClick={() => setMobileSidebarOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-800"
                >
                  <Bot className="w-5 h-5 text-emerald-400" />
                  <span>AI Market Advisor</span>
                </Link>
                <Link
                  href="/trends"
                  onClick={() => setMobileSidebarOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-800"
                >
                  <TrendingUp className="w-5 h-5 text-purple-400" />
                  <span>Price Trends</span>
                </Link>
                <Link
                  href="/alerts"
                  onClick={() => setMobileSidebarOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-800"
                >
                  <Bell className="w-5 h-5 text-rose-400" />
                  <span>Market Alerts</span>
                </Link>
                <Link
                  href="/my-crops"
                  onClick={() => setMobileSidebarOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-800"
                >
                  <Wheat className="w-5 h-5 text-amber-400" />
                  <span>My Crops</span>
                </Link>
                <Link
                  href="/favorites"
                  onClick={() => setMobileSidebarOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-800"
                >
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span>Favorite Markets</span>
                </Link>
                <Link
                  href="/transport-calculator"
                  onClick={() => setMobileSidebarOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-800"
                >
                  <Truck className="w-5 h-5 text-teal-400" />
                  <span>Transport Calculator</span>
                </Link>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 text-xs text-slate-400">
              <p className="font-semibold text-white">AgriMitra AI</p>
              <p>Know the market. Choose smarter.</p>
            </div>
          </div>
        </div>
      )}

      {/* Main Body Area */}
      <div className="flex flex-1">
        {/* Desktop Sidebar (hidden on Landing Page to give full width startup hero experience, visible on app pages) */}
        {!isLandingPage && <Sidebar />}

        {/* Page Content */}
        <main className={`flex-1 ${isLandingPage ? "w-full" : "p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto"} mb-16 lg:mb-0`}>
          {children}

          {/* Persistent Data Transparency Footer Note on App Pages */}
          {!isLandingPage && (
            <footer className="mt-12 pt-6 border-t border-slate-200 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-brand-600" />
                <span>
                  <strong>Data Source:</strong> {DATA_SOURCE_INFO.sourceNote}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                AgriMitra AI • AGMARKNET / e-NAM Architecture Compatible
              </p>
            </footer>
          )}
        </main>
      </div>

      {/* Mobile Bottom Bar */}
      <MobileNav />
    </div>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <DemoProvider>
        <AppShellContent>{children}</AppShellContent>
      </DemoProvider>
    </LanguageProvider>
  );
}
