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
  Bell,
} from "lucide-react";

export const MobileNav: React.FC = () => {
  const pathname = usePathname();
  const { t } = useLanguage();

  const mobileItems = [
    { href: "/dashboard", label: t.navDashboard, icon: LayoutDashboard },
    { href: "/explorer", label: "Explorer", icon: Search },
    { href: "/compare", label: "Compare", icon: Scale, isPrimary: true },
    { href: "/ai-advisor", label: "Ask AI", icon: Bot },
    { href: "/alerts", label: "Alerts", icon: Bell },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-900 border-t border-slate-800 shadow-2xl px-2 py-1.5">
      <div className="flex items-center justify-around">
        {mobileItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          const Icon = item.icon;

          if (item.isPrimary) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center -mt-5"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-brand-600 to-amber-500 text-white flex items-center justify-center shadow-lg shadow-brand-600/40 ring-4 ring-slate-900 active:scale-95 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold text-amber-300 mt-1">
                  {item.label}
                </span>
              </Link>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center py-1 px-2.5 rounded-lg transition-colors ${
                isActive ? "text-brand-400 font-bold" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] mt-0.5">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
