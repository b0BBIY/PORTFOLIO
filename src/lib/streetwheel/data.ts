export type Borough =
  | "Manhattan"
  | "Brooklyn"
  | "Queens"
  | "Bronx"
  | "Staten Island";

export const BOROUGHS: Borough[] = [
  "Manhattan",
  "Brooklyn",
  "Queens",
  "Bronx",
  "Staten Island",
];

export const BOROUGH_COLORS: Record<Borough, string> = {
  Manhattan: "#D63838",
  Brooklyn: "#3B82F6",
  Queens: "#22C55E",
  Bronx: "#A855F7",
  "Staten Island": "#F59E0B",
};

export interface Neighborhood {
  id: string;
  name: string;
  borough: Borough;
  /** sq mi */
  area: number;
  lat: number;
  lng: number;
  /** popularity rank, lower = more photographed */
  rank: number;
}

// Centroids approximated from NYC OpenData neighborhood tabulation areas.
export const NEIGHBORHOODS: Neighborhood[] = [
  { id: "soho", name: "SoHo", borough: "Manhattan", area: 0.28, lat: 40.7233, lng: -74.0030, rank: 3 },
  { id: "les", name: "Lower East Side", borough: "Manhattan", area: 0.42, lat: 40.7150, lng: -73.9843, rank: 11 },
  { id: "harlem", name: "Harlem", borough: "Manhattan", area: 1.42, lat: 40.8116, lng: -73.9465, rank: 18 },
  { id: "west-village", name: "West Village", borough: "Manhattan", area: 0.33, lat: 40.7358, lng: -74.0036, rank: 5 },
  { id: "chinatown", name: "Chinatown", borough: "Manhattan", area: 0.31, lat: 40.7158, lng: -73.9970, rank: 9 },
  { id: "tribeca", name: "Tribeca", borough: "Manhattan", area: 0.28, lat: 40.7163, lng: -74.0086, rank: 14 },
  { id: "east-harlem", name: "East Harlem", borough: "Manhattan", area: 0.97, lat: 40.7957, lng: -73.9389, rank: 33 },
  { id: "inwood", name: "Inwood", borough: "Manhattan", area: 0.71, lat: 40.8677, lng: -73.9212, rank: 41 },
  { id: "hells-kitchen", name: "Hell's Kitchen", borough: "Manhattan", area: 0.57, lat: 40.7638, lng: -73.9918, rank: 16 },
  { id: "dumbo", name: "DUMBO", borough: "Brooklyn", area: 0.11, lat: 40.7033, lng: -73.9881, rank: 2 },
  { id: "williamsburg", name: "Williamsburg", borough: "Brooklyn", area: 1.45, lat: 40.7081, lng: -73.9571, rank: 4 },
  { id: "bushwick", name: "Bushwick", borough: "Brooklyn", area: 1.31, lat: 40.6944, lng: -73.9213, rank: 12 },
  { id: "park-slope", name: "Park Slope", borough: "Brooklyn", area: 0.69, lat: 40.6710, lng: -73.9814, rank: 8 },
  { id: "bed-stuy", name: "Bedford-Stuyvesant", borough: "Brooklyn", area: 1.91, lat: 40.6872, lng: -73.9418, rank: 19 },
  { id: "red-hook", name: "Red Hook", borough: "Brooklyn", area: 0.62, lat: 40.6754, lng: -74.0094, rank: 23 },
  { id: "coney-island", name: "Coney Island", borough: "Brooklyn", area: 0.93, lat: 40.5755, lng: -73.9707, rank: 7 },
  { id: "greenpoint", name: "Greenpoint", borough: "Brooklyn", area: 0.85, lat: 40.7304, lng: -73.9510, rank: 15 },
  { id: "brooklyn-heights", name: "Brooklyn Heights", borough: "Brooklyn", area: 0.27, lat: 40.6959, lng: -73.9936, rank: 10 },
  { id: "sunset-park", name: "Sunset Park", borough: "Brooklyn", area: 1.42, lat: 40.6479, lng: -74.0134, rank: 29 },
  { id: "astoria", name: "Astoria", borough: "Queens", area: 2.51, lat: 40.7644, lng: -73.9235, rank: 13 },
  { id: "long-island-city", name: "Long Island City", borough: "Queens", area: 1.43, lat: 40.7447, lng: -73.9485, rank: 6 },
  { id: "flushing", name: "Flushing", borough: "Queens", area: 2.81, lat: 40.7654, lng: -73.8318, rank: 21 },
  { id: "jackson-heights", name: "Jackson Heights", borough: "Queens", area: 0.96, lat: 40.7556, lng: -73.8830, rank: 27 },
  { id: "rockaway-beach", name: "Rockaway Beach", borough: "Queens", area: 1.12, lat: 40.5860, lng: -73.8120, rank: 17 },
  { id: "forest-hills", name: "Forest Hills", borough: "Queens", area: 1.71, lat: 40.7196, lng: -73.8448, rank: 34 },
  { id: "ridgewood", name: "Ridgewood", borough: "Queens", area: 1.32, lat: 40.7003, lng: -73.9061, rank: 25 },
  { id: "sunnyside", name: "Sunnyside", borough: "Queens", area: 0.78, lat: 40.7434, lng: -73.9196, rank: 31 },
  { id: "south-bronx", name: "South Bronx", borough: "Bronx", area: 1.18, lat: 40.8169, lng: -73.9192, rank: 22 },
  { id: "fordham", name: "Fordham", borough: "Bronx", area: 0.84, lat: 40.8610, lng: -73.8990, rank: 38 },
  { id: "riverdale", name: "Riverdale", borough: "Bronx", area: 2.21, lat: 40.8901, lng: -73.9126, rank: 30 },
  { id: "hunts-point", name: "Hunts Point", borough: "Bronx", area: 1.41, lat: 40.8090, lng: -73.8840, rank: 26 },
  { id: "city-island", name: "City Island", borough: "Bronx", area: 0.41, lat: 40.8466, lng: -73.7873, rank: 20 },
  { id: "mott-haven", name: "Mott Haven", borough: "Bronx", area: 0.74, lat: 40.8090, lng: -73.9229, rank: 35 },
  { id: "st-george", name: "St. George", borough: "Staten Island", area: 0.66, lat: 40.6437, lng: -74.0765, rank: 24 },
  { id: "stapleton", name: "Stapleton", borough: "Staten Island", area: 0.79, lat: 40.6271, lng: -74.0759, rank: 39 },
  { id: "tottenville", name: "Tottenville", borough: "Staten Island", area: 1.84, lat: 40.5083, lng: -74.2418, rank: 37 },
  { id: "st-george-2", name: "Snug Harbor", borough: "Staten Island", area: 0.51, lat: 40.6432, lng: -74.1018, rank: 28 },
  { id: "great-kills", name: "Great Kills", borough: "Staten Island", area: 2.13, lat: 40.5543, lng: -74.1510, rank: 40 },
];

export function getNeighborhood(id: string): Neighborhood | undefined {
  return NEIGHBORHOODS.find((n) => n.id === id);
}
