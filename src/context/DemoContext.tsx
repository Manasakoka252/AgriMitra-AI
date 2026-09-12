"use client";

import React, { createContext, useContext, useState } from "react";
import { DemoScenario } from "@/types/market";

export const DEMO_SCENARIOS: DemoScenario[] = [
  {
    id: "kolar-tomato",
    title: "Scenario 1: Tomato Farmer (Kolar)",
    farmerName: "Ramesh Gowda",
    location: "Kolar, Karnataka",
    cropId: "tomato",
    quantityQuintals: 20,
    description: "Harvested 20 quintals of fresh tomatoes. Comparing Kolar vs Bengaluru vs Malur vs Madanapalle.",
    icon: "🍅",
  },
  {
    id: "chikkaballapur-onion",
    title: "Scenario 2: Onion Farmer (Chikkaballapur)",
    farmerName: "Venkateshappa",
    location: "Chikkaballapur, Karnataka",
    cropId: "onion",
    quantityQuintals: 50,
    description: "50 quintals of Red Onions. Weighing local yard vs Bangalore RMC vs Nashik export market.",
    icon: "🧅",
  },
  {
    id: "guntur-chilli",
    title: "Scenario 3: Red Chilli Farmer (Guntur)",
    farmerName: "Subba Rao",
    location: "Guntur, Andhra Pradesh",
    cropId: "chilli",
    quantityQuintals: 15,
    description: "15 quintals Teja dry red chilli. Evaluating Guntur Mirchi Yard vs Nizamabad.",
    icon: "🌶️",
  },
];

interface DemoContextType {
  activeScenario: DemoScenario;
  setScenario: (scenario: DemoScenario) => void;
  selectedCropId: string;
  setSelectedCropId: (cropId: string) => void;
  quantityQuintals: number;
  setQuantityQuintals: (qty: number) => void;
  farmerLocation: string;
  setFarmerLocation: (loc: string) => void;
  applyScenario: (scenarioId: string) => void;
}

const DemoContext = createContext<DemoContextType | undefined>(undefined);

export const DemoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeScenario, setActiveScenario] = useState<DemoScenario>(DEMO_SCENARIOS[0]);
  const [selectedCropId, setSelectedCropId] = useState<string>("tomato");
  const [quantityQuintals, setQuantityQuintals] = useState<number>(20);
  const [farmerLocation, setFarmerLocation] = useState<string>("Kolar, Karnataka");

  const applyScenario = (scenarioId: string) => {
    const sc = DEMO_SCENARIOS.find((s) => s.id === scenarioId) || DEMO_SCENARIOS[0];
    setActiveScenario(sc);
    setSelectedCropId(sc.cropId);
    setQuantityQuintals(sc.quantityQuintals);
    setFarmerLocation(sc.location);
  };

  const value = {
    activeScenario,
    setScenario: setActiveScenario,
    selectedCropId,
    setSelectedCropId,
    quantityQuintals,
    setQuantityQuintals,
    farmerLocation,
    setFarmerLocation,
    applyScenario,
  };

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
};

export function useDemo() {
  const context = useContext(DemoContext);
  if (!context) {
    throw new Error("useDemo must be used within a DemoProvider");
  }
  return context;
}
