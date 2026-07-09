const API_BASE = "http://localhost:3001";

async function fetchOptions(endpoint: string) {
  const res = await fetch(`${API_BASE}/${endpoint}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${endpoint}`);
  }
  return res.json();
}

export function useReferenceDataApi() {
  return {
    getFinCodes: () => fetchOptions("finCodes"),
    getDocumentSeries: () => fetchOptions("documentSeries"),
    getGenders: () => fetchOptions("genders"),
    getCities: () => fetchOptions("cities"),
    getMaritalStatuses: () => fetchOptions("maritalStatuses"),
    getNationalities: () => fetchOptions("nationalities"),
    getCitizenships: () => fetchOptions("citizenships"),
    getIssuingAuthorities: () => fetchOptions("issuingAuthorities"),
    getPhonePrefixes: () => fetchOptions("phonePrefixes"),
    getOrganizations: () => fetchOptions("organizations"),
    getStructuralDivisions: () => fetchOptions("structuralDivisions"),
    getPositions: () => fetchOptions("positions"),
    getWorkTypes: () => fetchOptions("workTypes"),
    getCivilServantOptions: () => fetchOptions("civilServantOptions"),
    getTerminationReasons: () => fetchOptions("terminationReasons"),
  };
}
