"use client";

import { ChevronDown, User } from "lucide-react";
import { useState } from "react";
import type { UseFormSetValue, FieldErrors } from "react-hook-form";
import { FormInput } from "./form-input";
import { FormSelect } from "./form-select";
import { FormDatePicker } from "./form-date-picker";
import { FileUpload } from "./file-upload";
import type { EmployeeFormSchemaType } from "@/lib/form-schema";
import {
  useDocumentSeries,
  useGenders,
  useCities,
  useMaritalStatuses,
  useNationalities,
  useCitizenships,
  useIssuingAuthorities,
} from "@/hooks/useReferenceData";

interface PersonalInfoSectionProps {
  form: {
    values: EmployeeFormSchemaType;
    errors: FieldErrors<EmployeeFormSchemaType>;
    setValue: UseFormSetValue<EmployeeFormSchemaType>;
  };
}

export function PersonalInfoSection({ form }: PersonalInfoSectionProps) {
  const [open, setOpen] = useState(true);
  const { values, errors, setValue } = form;

  const { data: series, isLoading: seriesLoading } = useDocumentSeries();
  const { data: genders } = useGenders();
  const { data: cities } = useCities();
  const { data: maritalStatuses } = useMaritalStatuses();
  const { data: nationalities } = useNationalities();
  const { data: citizenships } = useCitizenships();
  const { data: authorities, isLoading: authLoading } = useIssuingAuthorities();

  return (
    <div className="rounded-xl bg-white p-6 sm:p-8">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between text-left"
      >
        <div className="flex items-center gap-2 mx-auto">
          <User className="h-5 w-5 text-gray-500" />
          <h2 className="text-sm sm:text-lg font-semibold text-gray-900">
            1. Şəxsi məlumatlar — Əlaqə Məlumatları
          </h2>
        </div>
        <ChevronDown
          className={`h-5 w-5 text-gray-400 transition-transform ${
            open ? "rotate-0" : "-rotate-90"
          }`}
        />
      </button>

      {open && (
        <div className="mt-6 space-y-8">
          {/* 1.1 Şəxsi məlumatlar */}
          <div>
            <h3 className="mb-4 text-sm font-medium text-gray-700">
              1.1. Şəxsi məlumatlar
            </h3>
            <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
              <FormInput
                label="FİN"
                value={values.fin}
                onChange={(v) => setValue("fin", v)}
                placeholder="məs. 123ABC4"
                error={errors.fin?.message}
                required
              />
              <FormSelect
                label="Ş.V. seriya"
                value={values.documentSeries}
                onChange={(v) => setValue("documentSeries", v)}
                options={series}
                isLoading={seriesLoading}
                error={errors.documentSeries?.message}
                required
              />
              <FormInput
                label="Ş.V. nömrəsi"
                value={values.documentNumber}
                onChange={(v) => setValue("documentNumber", v)}
                placeholder="məs. 0454876"
                error={errors.documentNumber?.message}
                required
              />
              <FormInput
                label="Ad"
                value={values.firstName}
                onChange={(v) => setValue("firstName", v)}
                placeholder="Adınızı daxil edin"
                error={errors.firstName?.message}
                required
              />
              <FormInput
                label="Soyad"
                value={values.lastName}
                onChange={(v) => setValue("lastName", v)}
                placeholder="Soyadınızı daxil edin"
                error={errors.lastName?.message}
                required
              />
              <FormInput
                label="Ata adı"
                value={values.patronymic}
                onChange={(v) => setValue("patronymic", v)}
                placeholder="Ata adınızı daxil edin"
              />
              <FormSelect
                label="Cinsi"
                value={values.gender}
                onChange={(v) => setValue("gender", v)}
                options={genders}
                error={errors.gender?.message}
                required
              />
              <FormDatePicker
                label="Doğum tarixi"
                value={values.birthDate}
                onChange={(v) => setValue("birthDate", v)}
                error={errors.birthDate?.message}
                required
              />
              <FormSelect
                label="Doğulduğu yer"
                value={values.birthPlace}
                onChange={(v) => setValue("birthPlace", v)}
                options={cities}
                error={errors.birthPlace?.message}
                required
              />
              <FormSelect
                label="Ailə vəziyyəti"
                value={values.maritalStatus}
                onChange={(v) => setValue("maritalStatus", v)}
                options={maritalStatuses}
                error={errors.maritalStatus?.message}
                required
              />
              <FormSelect
                label="Milliyyəti"
                value={values.nationality}
                onChange={(v) => setValue("nationality", v)}
                options={nationalities}
                error={errors.nationality?.message}
                required
              />
              <FormSelect
                label="Vətəndaşlığı"
                value={values.citizenship}
                onChange={(v) => setValue("citizenship", v)}
                options={citizenships}
                error={errors.citizenship?.message}
                required
              />
              <FormSelect
                label="Sənədi verən qurum"
                value={values.issuingAuthority}
                onChange={(v) => setValue("issuingAuthority", v)}
                options={authorities}
                isLoading={authLoading}
                error={errors.issuingAuthority?.message}
                required
              />
              <FormDatePicker
                label="Sənədin verilmə tarixi"
                value={values.issueDate}
                onChange={(v) => setValue("issueDate", v)}
                error={errors.issueDate?.message}
                required
              />
              <FormDatePicker
                label="Son etibarlılıq tarixi"
                value={values.expiryDate}
                onChange={(v) => setValue("expiryDate", v)}
                error={errors.expiryDate?.message}
              />
              <FormInput
                label="SSN — Sosial Sığorta Nömrəsi"
                value={values.ssn}
                onChange={(v) => setValue("ssn", v)}
                placeholder="SSN nömrənizi daxil edin"
                error={errors.ssn?.message}
              />
              <FileUpload
                label="Profil şəkli"
                hint={`Max size: 5MB`}
                accept="image/*"
                value={values.profilePhoto}
                onChange={(v) => setValue("profilePhoto", v)}
              />
              <FileUpload
                label="Sənəd skanı əlavə et"
                hint={`Max size: 5MB`}
                accept="image/*,.pdf"
                value={values.documentScan}
                onChange={(v) => setValue("documentScan", v)}
              />
            </div>
          </div>

          {/* 1.2 Əlaqə və ünvan məlumatları */}
          <div>
            <h3 className="mb-4 text-sm font-medium text-gray-700">
              1.2. Əlaqə və ünvan məlumatları
            </h3>
            <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <FormSelect
                  label="Qeydiyyat ünvanı"
                  value={values.registrationAddress}
                  onChange={(v) => setValue("registrationAddress", v)}
                  options={cities}
                  error={errors.registrationAddress?.message}
                  required
                />
                <div className="mt-2 flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="sameAsRegistration"
                    checked={values.sameAsRegistration}
                    onChange={(e) => {
                      setValue("sameAsRegistration", e.target.checked);
                      if (e.target.checked) {
                        setValue("actualAddress", values.registrationAddress);
                      }
                    }}
                    className="h-4 w-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                  />
                  <label
                    htmlFor="sameAsRegistration"
                    className="text-sm text-gray-600 cursor-pointer"
                  >
                    Qeydiyyat və faktiki ünvan ilə eynidir
                  </label>
                </div>
              </div>
              <FormSelect
                label="Faktiki ünvan"
                value={values.actualAddress}
                onChange={(v) => setValue("actualAddress", v)}
                options={cities}
                error={errors.actualAddress?.message}
                required
                disabled={values.sameAsRegistration}
              />
              <FormSelect
                label="Mobil nömrə-prefiks"
                value={values.phonePrefix}
                onChange={(v) => setValue("phonePrefix", v)}
                options={[
                  { value: "050", label: "050" },
                  { value: "051", label: "051" },
                  { value: "055", label: "055" },
                  { value: "070", label: "070" },
                  { value: "077", label: "077" },
                  { value: "099", label: "099" },
                ]}
                error={errors.phonePrefix?.message}
                required
              />
              <FormInput
                label="Mobil nömrə"
                value={values.phoneNumber}
                onChange={(v) => setValue("phoneNumber", v)}
                placeholder="Nömrənizi daxil edin"
                error={errors.phoneNumber?.message}
                required
              />
              <FormInput
                label="E-mail"
                value={values.email}
                onChange={(v) => setValue("email", v)}
                placeholder="example@mail.com"
                error={errors.email?.message}
                required
              />
              <FormInput
                label="Fax"
                value={values.fax}
                onChange={(v) => setValue("fax", v)}
                placeholder="Fax nömrənizi daxil edin"
              />
              <FormInput
                label="Poçt indeksi"
                value={values.postalCode}
                onChange={(v) => setValue("postalCode", v)}
                placeholder="Poçt indeksini daxil edin"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
