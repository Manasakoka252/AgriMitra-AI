/**
 * Agricultural calculation utility for Gross Value, Transportation Costs, and Net Values.
 */

export interface TransportCostDetails {
  vehicleType: string;
  baseCharge: number;
  perKmRate: number;
  distanceKm: number;
  totalEstimatedCost: number;
}

/**
 * Calculates Gross Value: quantity (quintals) * price (₹/quintal)
 */
export function calculateGrossValue(quantityQuintals: number, pricePerQuintal: number): number {
  if (quantityQuintals <= 0 || pricePerQuintal <= 0) return 0;
  return Math.round(quantityQuintals * pricePerQuintal);
}

/**
 * Estimates transportation cost based on distance and load size (quintals).
 * 1 quintal = 100 kg.
 * Small Pickup (up to 25 quintals / 2.5 tons): ₹350 base + ₹18/km
 * Medium Truck (25 - 60 quintals / 6 tons): ₹750 base + ₹28/km
 * Heavy Freight Truck (> 60 quintals): ₹1400 base + ₹42/km
 */
export function calculateTransportCost(
  distanceKm: number,
  quantityQuintals: number
): TransportCostDetails {
  const dist = Math.max(1, distanceKm);
  const qty = Math.max(1, quantityQuintals);

  let vehicleType = "Small Pickup (Bolero / Ace)";
  let baseCharge = 350;
  let perKmRate = 18;

  if (qty > 60) {
    vehicleType = "Heavy Freight Truck (10 Ton)";
    baseCharge = 1400;
    perKmRate = 42;
  } else if (qty > 25) {
    vehicleType = "Medium Eicher Commercial Truck";
    baseCharge = 750;
    perKmRate = 28;
  }

  const totalEstimatedCost = Math.round(baseCharge + dist * perKmRate);

  return {
    vehicleType,
    baseCharge,
    perKmRate,
    distanceKm: dist,
    totalEstimatedCost,
  };
}

/**
 * Calculates Net Value after transportation: Gross Value - Estimated Transport Cost
 */
export function calculateNetValue(
  quantityQuintals: number,
  modalPrice: number,
  distanceKm: number
): {
  grossValue: number;
  transportDetails: TransportCostDetails;
  netValue: number;
  effectivePricePerQuintal: number;
} {
  const grossValue = calculateGrossValue(quantityQuintals, modalPrice);
  const transportDetails = calculateTransportCost(distanceKm, quantityQuintals);
  const netValue = Math.max(0, grossValue - transportDetails.totalEstimatedCost);
  const effectivePricePerQuintal = quantityQuintals > 0 ? Math.round(netValue / quantityQuintals) : 0;

  return {
    grossValue,
    transportDetails,
    netValue,
    effectivePricePerQuintal,
  };
}
