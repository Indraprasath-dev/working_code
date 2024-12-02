// Regions
export const REGIONS = ["Africa", "Asia", "Europe", "NorthAmerica", "NotDefined", "Oceania", "SouthAmerica"];

// Countries
export const COUNTRIES = ["Argentina", "Armenia", "Australia", "Belarus", "Belgium", "Brazil", "Cambodia", "Cameroon", "Canada", "Chile"];

// Base URL for API
export const API_BASE_URL = "https://stag-protocol-labs-network-api.herokuapp.com/v1/members";

// Default limit for pagination in API request
export const DEFAULT_LIMIT = 60;

export const REGION_COUNTRY_MAP = {
    Africa: ["Cameroon"],
    Asia: ["Armenia", "Cambodia"],
    Europe: ["Belarus", "Belgium"],
    NorthAmerica: ["Canada"],
    NotDefined: [],
    Oceania: ["Australia"],
    SouthAmerica: ["Argentina", "Brazil", "Chile"],
};
  