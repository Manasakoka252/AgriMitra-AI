"use client";

import { useState, useEffect } from "react";

const FAVORITES_KEY = "agrimitra_favorite_mandis";

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      if (stored) {
        setFavorites(JSON.parse(stored));
      } else {
        // Default seed favorites for demo
        const defaultFavs = ["kolar-apmc", "chikkaballapur-apmc", "bengaluru-yeshwanthpur"];
        setFavorites(defaultFavs);
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(defaultFavs));
      }
    } catch {
      // fallback
    } finally {
      setLoaded(true);
    }
  }, []);

  const toggleFavorite = (mandiId: string) => {
    const next = favorites.includes(mandiId)
      ? favorites.filter((id) => id !== mandiId)
      : [...favorites, mandiId];
    setFavorites(next);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
  };

  const isFavorite = (mandiId: string) => favorites.includes(mandiId);

  return { favorites, toggleFavorite, isFavorite, loaded };
}
