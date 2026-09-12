"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/i18n/LanguageContext";
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
  ChevronRight,
  Info,
} from "lucide-react";

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { t } = useLanguage();

  const navItems = [
    { href: "/dashboard", label: t.navDashboard, icon: LayoutDashboard },
    { href: "/explorer", label: t.navExplorer, icon: Search },
    { href: "/compare", label: t.navCompare, icon: Scale, highlight: true },
    { href: "/ai-advisor", label: t.navAdvisor, icon: Bot },
    { href: "/trends", label: t.navTrends, icon: TrendingUp },
    { href: "/alerts", label: t.navAlerts, icon: Bell },
    { href: "/my-crops", label: t.navMyCrops, icon: Wheat },
    { href: "/favorites", label: t.navFavorites, icon: Star },
    { href: "/transport-calculator", label: t.navTransport, icon: Truck },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex-shrink-0 flex flex-col justify-between hidden lg:flex border-r border-slate-800 min-h-[calc(100vh-4rem)]">
      <div className="py-4 px-3 space-y-6">
        {/* Main Navigation */}
        <div className="space-y-1">
          <p className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
            Main Features
          </p>

          <Link
            href="/"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-colors ${
              pathname === "/"
                ? "bg-slate-800 text-white font-semibold"
                : "text-slate-400 hover:bg-slate-800/60 hover:text-white"
            }`}
          >
            <Home className="w-4 h-4 text-emerald-400" />
            <span>Landing Page</span>
          </Link>

          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-colors group ${
                  isActive
                    ? "bg-brand-600/20 text-brand-300 font-semibold border-l-4 border-brand-500 pl-2"
                    : item.highlight
                    ? "bg-amber-500/10 text-amber-300 hover:bg-amber-500/20"
                    : "text-slate-300 hover:bg-slate-800/70 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 ${
                      isActive
                        ? "text-brand-400"
                        : item.highlight
                        ? "text-amber-400"
                        : "text-slate-400 group-hover:text-white"
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
                {item.highlight && (
                  <span className="bg-amber-500/20 text-amber-300 text-[10px] px-1.5 py-0.5 rounded font-mono font-bold">
                    HOT
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Footer Info Box */}
      <div className="p-3 border-t border-slate-800 m-3 bg-slate-950/60 rounded-xl border border-slate-800/80">
        <div className="flex items-start gap-2 text-xs">
          <Info className="w-4 h-4 text-brand-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-slate-200 text-[11px]">AgriMitra Core Promise</p>
            <p className="text-[11px] text-slate-400 leading-tight mt-1">
              Know the market. Choose smarter. Earn better.
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};
