// Country name → [latitude, longitude] lookup
// Searches by partial match (case-insensitive)

const COUNTRIES = {
  nigeria: [9.082, 8.6753],
  lagos: [6.5244, 3.3792],
  abuja: [9.0765, 7.3986],
  "united kingdom": [55.3781, -3.436],
  uk: [55.3781, -3.436],
  london: [51.5072, -0.1276],
  england: [52.3555, -1.1743],
  "united states": [37.0902, -95.7129],
  usa: [37.0902, -95.7129],
  america: [37.0902, -95.7129],
  "new york": [40.7128, -74.006],
  "los angeles": [34.0522, -118.2437],
  dubai: [25.2048, 55.2708],
  uae: [23.4241, 53.8478],
  "united arab emirates": [23.4241, 53.8478],
  china: [35.8617, 104.1954],
  beijing: [39.9042, 116.4074],
  shanghai: [31.2304, 121.4737],
  india: [20.5937, 78.9629],
  mumbai: [19.076, 72.8777],
  delhi: [28.7041, 77.1025],
  germany: [51.1657, 10.4515],
  berlin: [52.52, 13.405],
  frankfurt: [50.1109, 8.6821],
  france: [46.6034, 1.8883],
  paris: [48.8566, 2.3522],
  canada: [56.1304, -106.3468],
  toronto: [43.6532, -79.3832],
  australia: [-25.2744, 133.7751],
  sydney: [-33.8688, 151.2093],
  japan: [36.2048, 138.2529],
  tokyo: [35.6762, 139.6503],
  brazil: [-14.235, -51.9253],
  "sao paulo": [-23.5505, -46.6333],
  "south africa": [-30.5595, 22.9375],
  johannesburg: [-26.2041, 28.0473],
  "cape town": [-33.9249, 18.4241],
  kenya: [-0.0236, 37.9062],
  nairobi: [-1.2921, 36.8219],
  ghana: [7.9465, -1.0232],
  accra: [5.6037, -0.187],
  egypt: [26.8206, 30.8025],
  cairo: [30.0444, 31.2357],
  turkey: [38.9637, 35.2433],
  istanbul: [41.0082, 28.9784],
  italy: [41.8719, 12.5674],
  rome: [41.9028, 12.4964],
  spain: [40.4637, -3.7492],
  madrid: [40.4168, -3.7038],
  netherlands: [52.1326, 5.2913],
  amsterdam: [52.3676, 4.9041],
  singapore: [1.3521, 103.8198],
  malaysia: [4.2105, 101.9758],
  "kuala lumpur": [3.139, 101.6869],
  indonesia: [-0.7893, 113.9213],
  jakarta: [-6.2088, 106.8456],
  philippines: [12.8797, 121.774],
  manila: [14.5995, 120.9842],
  mexico: [23.6345, -102.5528],
  "mexico city": [19.4326, -99.1332],
  "saudi arabia": [23.8859, 45.0792],
  riyadh: [24.7136, 46.6753],
  qatar: [25.3548, 51.1839],
  doha: [25.2854, 51.531],
  belgium: [50.5039, 4.4699],
  brussels: [50.8503, 4.3517],
  switzerland: [46.8182, 8.2275],
  zurich: [47.3769, 8.5417],
  sweden: [60.1282, 18.6435],
  russia: [61.524, 105.3188],
  moscow: [55.7558, 37.6173],
  "south korea": [35.9078, 127.7669],
  seoul: [37.5665, 126.978],
  "hong kong": [22.3193, 114.1694],
  vietnam: [14.0583, 108.2772],
  thailand: [15.87, 100.9925],
  bangkok: [13.7563, 100.5018],
  pakistan: [30.3753, 69.3451],
  karachi: [24.8607, 67.0011],
  bangladesh: [23.685, 90.3563],
  poland: [51.9194, 19.1451],
  warsaw: [52.2297, 21.0122],
  ukraine: [48.3794, 31.1656],
  argentina: [-38.4161, -63.6167],
  chile: [-35.6751, -71.543],
  colombia: [4.5709, -74.2973],
  peru: [-9.19, -75.0152],
  portugal: [39.3999, -8.2245],
  lisbon: [38.7223, -9.1393],
  ireland: [53.4129, -8.2439],
  dublin: [53.3498, -6.2603],
  norway: [60.472, 8.4689],
  denmark: [56.2639, 9.5018],
  finland: [61.9241, 25.7482],
  austria: [47.5162, 14.5501],
  greece: [39.0742, 21.8243],
  czech: [49.8175, 15.473],
  romania: [45.9432, 24.9668],
  hungary: [47.1625, 19.5033],
  morocco: [31.7917, -7.0926],
  algeria: [28.0339, 1.6596],
  ethiopia: [9.145, 40.4897],
  tanzania: [-6.369, 34.8888],
  uganda: [1.3733, 32.2903],
  rwanda: [-1.9403, 29.8739],
  senegal: [14.4974, -14.4524],
  "ivory coast": [7.54, -5.5471],
  "cote d'ivoire": [7.54, -5.5471],
  cameroon: [7.3697, 12.3547],
  zimbabwe: [-19.0154, 29.1549],
  zambia: [-13.1339, 27.8493],
  botswana: [-22.3285, 24.6849],
  namibia: [-22.9576, 18.4904],
  angola: [-11.2027, 17.8739],
  mozambique: [-18.6657, 35.5296],
  madagascar: [-18.7669, 46.8691],
  "new zealand": [-40.9006, 174.886],
  auckland: [-36.8485, 174.7633],
};

export function getCoordinates(countryName) {
  if (!countryName) return null;
  const name = countryName.toLowerCase().trim();

  // Exact match first
  for (const [key, coords] of Object.entries(COUNTRIES)) {
    if (name === key) return { latitude: coords[0], longitude: coords[1] };
  }

  // Partial match
  for (const [key, coords] of Object.entries(COUNTRIES)) {
    if (name.includes(key) || key.includes(name)) {
      return { latitude: coords[0], longitude: coords[1] };
    }
  }

  return null;
}

export function searchLocations(query) {
  if (!query) return [];
  const q = query.toLowerCase().trim();
  return Object.entries(COUNTRIES)
    .filter(([key]) => key.includes(q))
    .map(([key, coords]) => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      latitude: coords[0],
      longitude: coords[1],
    }))
    .slice(0, 10);
}
