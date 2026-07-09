import { useQuery } from "@tanstack/react-query";
import { useReferenceDataApi } from "@/lib/api";
import type { SelectOption } from "@/types";

function useOptions(key: string, fetcher: () => Promise<SelectOption[]>) {
  return useQuery({
    queryKey: ["referenceData", key],
    queryFn: fetcher,
    staleTime: 10 * 60 * 1000,
  });
}

export function useFinCodes() {
  const api = useReferenceDataApi();
  return useOptions("finCodes", api.getFinCodes);
}

export function useDocumentSeries() {
  const api = useReferenceDataApi();
  return useOptions("documentSeries", api.getDocumentSeries);
}

export function useGenders() {
  const api = useReferenceDataApi();
  return useOptions("genders", api.getGenders);
}

export function useCities() {
  const api = useReferenceDataApi();
  return useOptions("cities", api.getCities);
}

export function useMaritalStatuses() {
  const api = useReferenceDataApi();
  return useOptions("maritalStatuses", api.getMaritalStatuses);
}

export function useNationalities() {
  const api = useReferenceDataApi();
  return useOptions("nationalities", api.getNationalities);
}

export function useCitizenships() {
  const api = useReferenceDataApi();
  return useOptions("citizenships", api.getCitizenships);
}

export function useIssuingAuthorities() {
  const api = useReferenceDataApi();
  return useOptions("issuingAuthorities", api.getIssuingAuthorities);
}

export function usePhonePrefixes() {
  const api = useReferenceDataApi();
  return useOptions("phonePrefixes", api.getPhonePrefixes);
}

export function useOrganizations() {
  const api = useReferenceDataApi();
  return useOptions("organizations", api.getOrganizations);
}

export function useStructuralDivisions(organizationId?: string) {
  const api = useReferenceDataApi();
  return useQuery({
    queryKey: ["referenceData", "structuralDivisions", organizationId],
    queryFn: async () => {
      const all = await api.getStructuralDivisions();
      if (!organizationId) return [];
      return all.filter((d: SelectOption) => d.parentId === organizationId);
    },
    enabled: !!organizationId,
  });
}

export function usePositions(divisionId?: string) {
  const api = useReferenceDataApi();
  return useQuery({
    queryKey: ["referenceData", "positions", divisionId],
    queryFn: async () => {
      const all = await api.getPositions();
      if (!divisionId) return [];
      return all.filter((p: SelectOption) => p.parentId === divisionId);
    },
    enabled: !!divisionId,
  });
}

export function useWorkTypes() {
  const api = useReferenceDataApi();
  return useOptions("workTypes", api.getWorkTypes);
}

export function useCivilServantOptions() {
  const api = useReferenceDataApi();
  return useOptions("civilServantOptions", api.getCivilServantOptions);
}

export function useTerminationReasons() {
  const api = useReferenceDataApi();
  return useOptions("terminationReasons", api.getTerminationReasons);
}
