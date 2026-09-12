import type { Metadata } from "next";
import "./globals.css";
import { AppShell } from "@/components/layout/AppShell";

export const metadata: Metadata = {
  title: "AgriMitra AI - Agricultural Market Decision Support for Farmers",
  description: "Know the market. Choose smarter. Earn better. AI-powered mandi price comparison, arrival tracking, transportation cost estimation, and decision support for Indian farmers.",
  keywords: ["AgriMitra", "AGMARKNET", "e-NAM", "Mandi Prices", "Farmer Decision Support", "Crop Prices India", "Kolar APMC", "Agriculture AI"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased selection:bg-brand-500 selection:text-white">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
