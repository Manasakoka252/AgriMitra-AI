# 🌱 AgriMitra AI

### Know the market. Choose smarter. Earn better.

> AgriMitra AI is an agricultural market decision-support platform that helps farmers compare mandi prices, distance, transportation costs, arrivals, and market trends before deciding where to consider selling their produce.

### 🚀 Live Demo

👉 **[Try AgriMitra AI](https://agri-mitra-ai-xi.vercel.app/)**

🌐 **Live Website:** https://agri-mitra-ai-xi.vercel.app/

💻 **Source Code:** https://github.com/Manasakoka252/AgriMitra-AI

---

## 📌 Problem Statement

Farmers often need to consider more than just the highest market price when deciding where to sell their produce.

A market offering a higher price may not always be the better option if it is much farther away or involves higher transportation costs.

AgriMitra AI addresses this problem by bringing multiple market factors together and presenting them in a simple decision-support interface.

---

## 💡 Solution

AgriMitra AI allows a farmer to select:

- 📍 Farmer location
- 🌾 Crop
- 📦 Quantity of produce

The application then compares suitable mandis using factors such as:

- Market price
- Distance from the farmer's location
- Estimated transportation cost
- Market arrivals
- Price trends
- Arrival trends

The application calculates an estimated net value and market score to help the farmer identify markets worth considering.

> **Note:** AgriMitra AI provides decision support and estimates. It does not guarantee future prices, profits, or a particular selling outcome.

---

## ✨ Key Features

### 🌾 Market Explorer

Explore available agricultural markets and view information such as:

- Market name
- District and state
- Crop prices
- Market facilities
- Operating days
- Market trends

### 📊 Compare Markets

Compare multiple mandis based on:

- Modal price
- Distance
- Estimated transportation cost
- Gross value
- Estimated net value
- Market score

### 📍 Location-Based Comparison

The farmer can select a supported location.

The application calculates the approximate distance between the farmer's location and each mandi using geographical coordinates.

Distance is calculated using the **Haversine formula**.

This allows transportation estimates and market comparisons to change based on the selected farmer location.

### 🚚 Transport Calculator

Estimate transportation costs based on:

- Distance
- Quantity
- Transport-related assumptions

The estimated transport cost is considered when calculating the potential net value.

### 🤖 AI Advisor

AgriMitra AI includes a **TypeScript-based rule-driven decision engine** that evaluates market information and provides recommendations.

The advisor considers factors including:

- Price competitiveness
- Transportation impact
- Market arrivals
- Price trends
- Overall market score

The goal is to convert market information into simpler, actionable insights.

### 📈 Market Trends

View market trends and changes in:

- Prices
- Arrivals
- Market performance

### 🔔 Market Alerts

View market-related alerts and highlights based on the available market information.

### ⭐ Favorites

Save preferred markets for easier access.

### 🌱 My Crops

Save crop information and use it when exploring market options.

### 🌐 Multilingual Interface

The application supports:

- English
- Telugu
- Kannada
- Hindi

---

## 🧠 How the Recommendation Works

AgriMitra AI does not simply select the mandi with the highest price.

A simplified workflow is:

```text
Farmer Location
       +
     Crop
       +
   Quantity
       ↓
Find Relevant Market Records
       ↓
Calculate Market Distance
       ↓
Estimate Transportation Cost
       ↓
Evaluate Price & Market Conditions
       ↓
Calculate Market Score
       ↓
Estimate Net Value
       ↓
Rank Markets
       ↓
Provide Decision Support
```


### Market Score

The current scoring model considers:

| Factor | Maximum Score |
|---|---:|
| Price | 40 |
| Transportation | 25 |
| Market Arrivals | 20 |
| Price/Market Trend | 15 |
| **Total** | **100** |

This scoring approach considers multiple market factors instead of relying on price alone.

---

## 📊 Data

The current version uses **structured demo/historical agricultural market data**.

The application is designed around agricultural market information such as:

- Crop
- Market
- District
- State
- Minimum price
- Maximum price
- Modal price
- Arrival quantity
- Price trend
- Arrival trend

The data model is designed to support integration with official agricultural market datasets.

### Data Sources / References

The project is based on the structure and concepts used in Indian agricultural market information systems such as:

- [AGMARKNET](https://agmarknet.gov.in/)
- [e-NAM](https://enam.gov.in/)
- [data.gov.in](https://www.data.gov.in/)

> **Important:** The current deployed version does not fetch live mandi prices directly from these sources. It uses structured demo/historical data for the current implementation.

---

## 🛠️ Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui

### Data Visualization

- Recharts

### UI & Interaction

- Lucide React
- Framer Motion / CSS animations
- React Hooks

### Application Logic

- TypeScript-based decision engine
- Haversine distance calculation
- Market scoring
- Transportation cost estimation
- Local storage for user preferences

### Development & Deployment

- VS Code
- Git
- GitHub
- Vercel

---

## 📁 Project Structure

```text
AgriMitra-AI/
│
├── src/
│   ├── app/
│   │   ├── ai-advisor/
│   │   ├── alerts/
│   │   ├── compare/
│   │   ├── dashboard/
│   │   ├── explorer/
│   │   ├── favorites/
│   │   ├── market/
│   │   ├── my-crops/
│   │   ├── transport-calculator/
│   │   ├── trends/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── components/
│   │   └── layout/
│   │
│   ├── context/
│   │   └── DemoContext.tsx
│   │
│   ├── data/
│   │   ├── crops.ts
│   │   ├── farmerLocations.ts
│   │   ├── marketRecords.ts
│   │   └── markets.ts
│   │
│   ├── hooks/
│   │   ├── useFavorites.ts
│   │   └── useSavedCrops.ts
│   │
│   ├── lib/
│   │   ├── api/
│   │   ├── engine/
│   │   └── i18n/
│   │
│   └── types/
│       └── market.ts
│
├── public/
├── .gitignore
├── package.json
├── next.config.mjs
├── postcss.config.js
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

---

## ⚙️ Getting Started

### Prerequisites

Make sure you have installed:

- Node.js
- npm
- Git

### 1. Clone the repository

```bash
git clone https://github.com/Manasakoka252/AgriMitra-AI.git
```

### 2. Navigate to the project

```bash
cd AgriMitra-AI
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## 🏗️ Production Build

To create a production build locally:

```bash
npm run build
```

To start the production server:

```bash
npm start
```

---
## 🚀 Deployment

The project is deployed using **Vercel** and connected to the GitHub repository.

### Deployment Workflow

```text
Local Development
       ↓
      Git
       ↓
    GitHub
       ↓
    Vercel
       ↓
 Live Application
```

Updates can be committed and pushed to the `main` branch, allowing Vercel to build and deploy the updated application.

### Live Application

👉 **[Open AgriMitra AI](https://agri-mitra-ai-xi.vercel.app/)**

---
## 🔮 Future Improvements

### 📡 Live Market Data

Integrate official agricultural market APIs/data services where available so that market prices and arrivals can be updated automatically.

### 🗺️ Road-Based Distance

Replace approximate geographical distance with actual road distance and travel time using a suitable maps/routing service.

### 🚛 Improved Transport Estimation

Allow users to select:

- Vehicle type
- Vehicle capacity
- Fuel assumptions
- Transport rate

for more realistic transportation estimates.

### 📊 Historical Analytics

Add more historical market data to improve:

- Price trend analysis
- Seasonal pattern analysis
- Market comparisons

### 🤖 Advanced AI

The current recommendation engine is rule-based. Future versions could explore machine learning models for:

- Price forecasting
- Demand/arrival prediction
- Personalized market recommendations

Any predictive model would be presented as an estimate rather than a guaranteed future price.

---

## ⚠️ Current Limitations

- Market data in the current version is demo/historical data.
- Live mandi price updates are not currently connected.
- Distance is based on geographical coordinates rather than live road routing.
- Transportation costs are estimates and may differ from actual local transport charges.
- Market recommendations are decision-support suggestions and should not be treated as guaranteed profit predictions.

---

## 🏆 Project Achievement

### 🥇 1st Prize — AI Innovation Challenge

AgriMitra AI was developed as an AI-focused solution to address a practical agricultural market decision-making problem.

---

## 👩‍💻 Author

### Koka Manasa

## 📄 License

This project is intended for educational, demonstration, and portfolio purposes.
