export interface FarmerLocation {
  id: string;
  name: string;
  district: string;
  state: string;
  latitude: number;
  longitude: number;
}

export const FARMER_LOCATIONS: FarmerLocation[] = [
  // Karnataka
  {
    id: "kolar",
    name: "Kolar",
    district: "Kolar",
    state: "Karnataka",
    latitude: 13.1367,
    longitude: 78.1291,
  },
  {
    id: "bengaluru",
    name: "Bengaluru",
    district: "Bengaluru Urban",
    state: "Karnataka",
    latitude: 12.9716,
    longitude: 77.5946,
  },
  {
    id: "chikkaballapur",
    name: "Chikkaballapur",
    district: "Chikkaballapur",
    state: "Karnataka",
    latitude: 13.4355,
    longitude: 77.7315,
  },
  {
    id: "malur",
    name: "Malur",
    district: "Kolar",
    state: "Karnataka",
    latitude: 13.0034,
    longitude: 77.9370,
  },
  {
    id: "ramanagara",
    name: "Ramanagara",
    district: "Ramanagara",
    state: "Karnataka",
    latitude: 12.7150,
    longitude: 77.2800,
  },

  // Andhra Pradesh
  {
    id: "guntur",
    name: "Guntur",
    district: "Guntur",
    state: "Andhra Pradesh",
    latitude: 16.3067,
    longitude: 80.4365,
  },
  {
    id: "vijayawada",
    name: "Vijayawada",
    district: "NTR",
    state: "Andhra Pradesh",
    latitude: 16.5062,
    longitude: 80.6480,
  },
  {
    id: "kurnool",
    name: "Kurnool",
    district: "Kurnool",
    state: "Andhra Pradesh",
    latitude: 15.8281,
    longitude: 78.0373,
  },
  {
    id: "anantapur",
    name: "Anantapur",
    district: "Anantapur",
    state: "Andhra Pradesh",
    latitude: 14.6819,
    longitude: 77.6006,
  },
  {
    id: "tirupati",
    name: "Tirupati",
    district: "Tirupati",
    state: "Andhra Pradesh",
    latitude: 13.6288,
    longitude: 79.4192,
  },
  {
    id: "nellore",
    name: "Nellore",
    district: "Nellore",
    state: "Andhra Pradesh",
    latitude: 14.4426,
    longitude: 79.9865,
  },
  {
    id: "kadapa",
    name: "Kadapa",
    district: "YSR Kadapa",
    state: "Andhra Pradesh",
    latitude: 14.4673,
    longitude: 78.8242,
  },
  {
    id: "ongole",
    name: "Ongole",
    district: "Prakasam",
    state: "Andhra Pradesh",
    latitude: 15.5057,
    longitude: 80.0499,
  },
  {
    id: "madanapalle",
    name: "Madanapalle",
    district: "Annamayya",
    state: "Andhra Pradesh",
    latitude: 13.5503,
    longitude: 78.5029,
  },
];