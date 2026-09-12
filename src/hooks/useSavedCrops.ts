"use client";

import { useState, useEffect } from "react";

const SAVED_CROPS_KEY = "agrimitra_saved_crops";

export function useSavedCrops() {
  const [savedCrops, setSavedCrops] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(SAVED_CROPS_KEY);
      if (stored) {
        setSavedCrops(JSON.parse(stored));
      } else {
        // Default seed crops for demo
        const defaultCrops = ["tomato", "onion", "chilli"];
        setSavedCrops(defaultCrops);
        localStorage.setItem(SAVED_CROPS_KEY, JSON.stringify(defaultCrops));
      }
    } catch {
      // fallback
    } finally {
      setLoaded(true);
    }
  }, []);

  const toggleSavedCrop = (cropId: string) => {
    const next = savedCrops.includes(cropId)
      ? savedCrops.filter((id) => id !== cropId)
      : [...savedCrops, cropId];
    setSavedCrops(next);
    localStorage.setItem(SAVED_CROPS_KEY, JSON.stringify(next));
  };

  const isSavedCrop = (cropId: string) => savedCrops.includes(cropId);

  return { savedCrops, toggleSavedCrop, isSavedCrop, loaded };
}
