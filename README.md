# AgriMitra AI 🌾🤖

> **Tagline:** Know the market. Choose smarter. Earn better.  
> **Purpose:** AI-powered agricultural market decision-support application that converts complex mandi price data, arrival volumes, transportation freight, and trading trends into plain-language decision support for Indian farmers.

---

## 🌟 Key Problem Solved

Farmers often lack a simple way to compare prices and market conditions across different mandis. A higher nominal price does not necessarily mean higher net income because transportation distance, freight load size, market arrival volume (glut risk), and price trends significantly impact final returns.

AgriMitra AI helps answer:
> **"Where should I consider selling my crop?"**

---

## 🚀 Features Overview

1. **Compare Before You Go**: Side-by-side comparison of Gross Produce Value vs. Estimated Transport Cost vs. Net Realization Value for any crop and harvest quantity.
2. **AI Market Advisor ("Ask AgriMitra")**: Interactive conversational assistant with prompt suggestions and transparent **"Why this recommendation?"** factor breakdowns (✓ Higher modal price, ✓ Lower freight cost, ⚠ High arrivals, ✓ Price trend).
3. **Market Explorer**: Multi-crop, multi-state, and multi-district filterable mandi table with sortable columns and price/arrival status badges.
4. **Market Score (0 - 100)**: Transparent decision-support scoring based on 4 key dimensions:
   - Price competitiveness (up to 40 pts)
   - Freight impact (up to 25 pts)
   - Arrival supply volume (up to 20 pts)
   - Recent price trend (up to 15 pts)
5. **Interactive Recharts**: 7-day, 30-day, and 90-day price history, arrival volume trends, and price vs. arrival supply correlation charts.
6. **Market Alert Center**: Automated notifications for Price Opportunities, High Arrival Gluts, Price Drops, and Market Condition changes.
7. **Multilingual Support**: Instant switching between English, Telugu (తెలుగు), Kannada (ಕನ್ನಡ), and Hindi (हिंदी).
8. **Judge Demo Mode**: 30-second judge evaluation presets:
   - *Scenario 1: Tomato Farmer in Kolar (20 quintals)*
   - *Scenario 2: Onion Farmer in Chikkaballapur (50 quintals)*
   - *Scenario 3: Red Chilli Farmer in Guntur (15 quintals)*
9. **LocalStorage Persistence**: Save favorite mandis and personal crops locally.
10. **Data Transparency**: Clearly labeled as *"Demo / Historical Market Data"* with decoupled API service hooks ready for official AGMARKNET / e-NAM integration.

---

## 🛠️ Technology Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide Icons (`lucide-react`)
- **Charts**: Recharts (`recharts`)
- **Animations**: Framer Motion (`framer-motion`) & smooth CSS transitions
- **Deployment**: Vercel-ready static/API architecture (zero database dependencies required for MVP)

---

## 🏃 Local Development

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

3. **Build for Production**:
   ```bash
   npm run build
   ```

4. **Start Production Server**:
   ```bash
   npm start
   ```

---

## 🔒 Data Transparency & Compliance

- **No Profit Promises**: AgriMitra AI provides decision support based on available mandi data. It never guarantees future prices or profits.
- **Data Source Labeling**: Demo dataset is explicitly labeled as *"Demo / Historical Market Data"*.
- **Decoupled Architecture**: All market data passes through `lib/api/marketService.ts`, making it easy to plug in live government endpoints (AGMARKNET/e-NAM) without rebuilding UI components.
