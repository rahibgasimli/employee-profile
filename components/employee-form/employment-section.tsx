"use client";

import { ChevronDown, Trash2, Plus, Briefcase } from "lucide-react";
import { useState } from "react";
import type { FieldErrors } from "react-hook-form";
import { FormSelect } from "./form-select";
import { FormDatePicker } from "./form-date-picker";
import { FormCheckbox } from "./form-checkbox";
import { FileUpload } from "./file-upload";
import { Button } from "@/components/ui/button";
import type { SelectOption } from "@/types";
import type { EmployeeFormSchemaType } from "@/lib/form-schema";
import {
  useOrganizations,
  useStructuralDivisions,
  usePositions,
  useWorkTypes,
  useCivilServantOptions,
  useTerminationReasons,
} from "@/hooks/useReferenceData";

interface EmploymentRecordValues {
  id?: string;
  organizationId: string;
  structuralDivisionId: string;
  positionId: string;
  workType: string;
  document: File | null;
  isCivilServant: string;
  startDate: string;
  currentlyWorking: boolean;
  endDate: string;
  terminationReason: string;
}

interface EmploymentSectionProps {
  records: EmploymentRecordValues[];
  errors: FieldErrors<EmployeeFormSchemaType>;
  onAdd: () => void;
  onRemove: (index: number) => void;
  onUpdate: (index: number, field: string, value: unknown) => void;
  onUpdateField: (index: number, value: EmploymentRecordValues) => void;
}

export function EmploymentSection({
  records,
  errors,
  onAdd,
  onRemove,
  onUpdate,
  onUpdateField,
}: EmploymentSectionProps) {
  const [open, setOpen] = useState(true);

  const { data: organizations } = useOrganizations();
  const { data: workTypes } = useWorkTypes();
  const { data: civilServantOptions } = useCivilServantOptions();
  const { data: terminationReasons } = useTerminationReasons();

  return (
    <div className="rounded-xl bg-white p-6 sm:p-8">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between text-left"
      >
        <div className="flex items-center gap-2 mx-auto">
          <Briefcase className="h-5 w-5 text-gray-500" />
          <h2 className="text-sm sm:text-lg font-semibold text-gray-900">
            2. Əmək fəaliyyəti — Təhsil — Elmi dərəcə — Sertifikatlar
          </h2>
        </div>
        <ChevronDown
          className={`h-5 w-5 text-gray-400 transition-transform ${
            open ? "rotate-0" : "-rotate-90"
          }`}
        />
      </button>

      {open && (
        <div className="mt-6 space-y-6">
          <h3 className="text-sm font-medium text-gray-700">
            2.1 Əmək fəaliyyəti
          </h3>

          {records.map((record, index) => (
            <EmploymentBlock
              key={record.id || index}
              index={index}
              record={record}
              errors={errors.employmentRecords?.[index]}
              onRemove={onRemove}
              onUpdate={onUpdate}
              organizations={organizations}
              workTypes={workTypes}
              civilServantOptions={civilServantOptions}
              terminationReasons={terminationReasons}
              onUpdateField={onUpdateField}
            />
          ))}

          <Button
            type="button"
            variant="outline"
            className="w-full border-blue-300 text-blue-600 hover:bg-blue-50"
            onClick={onAdd}
          >
            <Plus className="mr-2 h-4 w-4" />
            Əmək fəaliyyəti əlavə et
          </Button>
        </div>
      )}
    </div>
  );
}

function EmploymentBlock({
  index,
  record,
  errors,
  onRemove,
  onUpdate,
  organizations,
  workTypes,
  civilServantOptions,
  terminationReasons,
  onUpdateField,
}: {
  index: number;
  record: EmploymentRecordValues;
  errors: unknown;
  onRemove: (index: number) => void;
  onUpdate: (index: number, field: string, value: unknown) => void;
  organizations: SelectOption[] | undefined;
  workTypes: SelectOption[] | undefined;
  civilServantOptions: SelectOption[] | undefined;
  terminationReasons: SelectOption[] | undefined;
  onUpdateField: (index: number, value: EmploymentRecordValues) => void;
}) {
  const { data: divisions, isLoading: divLoading } = useStructuralDivisions(
    record.organizationId || undefined
  );
  const { data: positions, isLoading: posLoading } = usePositions(
    record.structuralDivisionId || undefined
  );

  function upd(field: string, value: unknown) {
    const updated = { ...record, [field]: value };
    onUpdateField(index, updated);
  }

  function updMultiple(changes: Record<string, unknown>) {
    const updated = { ...record, ...changes };
    onUpdateField(index, updated);
  }

  const fieldError = errors as {
    organizationId?: { message?: string };
    structuralDivisionId?: { message?: string };
    positionId?: { message?: string };
    isCivilServant?: { message?: string };
    startDate?: { message?: string };
    endDate?: { message?: string };
    terminationReason?: { message?: string };
  };

  return (
    <div className="rounded-lg border border-gray-200 p-4 sm:px-6 space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-gray-800">
          Əmək fəaliyyəti — {index + 1}
        </h4>
        <div className="hidden sm:block">
          <Button
            type="button"
            variant="ghost"
            className="h-8 gap-1.5 bg-red-50 text-red-600 hover:bg-red-100 text-xs px-3"
            onClick={() => onRemove(index)}
          >
            <Trash2 className="h-3.5 w-3.5" />
            Əmək fəaliyyətini sil
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">

      <div className="sm:hidden flex justify-center w-full mt-4">
        <Button
          type="button"
          variant="ghost"
          className="h-8 gap-1.5 bg-red-50 text-red-600 hover:bg-red-100 text-xs px-3 w-full"
          onClick={() => onRemove(index)}
        >
          <Trash2 className="h-3.5 w-3.5" />
          Əmək fəaliyyətini sil
        </Button>
      </div>
        <FormSelect
          label="Təşkilatın adı"
          value={record.organizationId}
          onChange={(v) => {
            updMultiple({ organizationId: v, structuralDivisionId: "", positionId: "" });
          }}
          options={organizations}
          error={fieldError?.organizationId?.message}
          required
        />
        <FormSelect
          label="Struktur bölmə"
          value={record.structuralDivisionId}
          onChange={(v) => {
            updMultiple({ structuralDivisionId: v, positionId: "" });
          }}
          options={divisions}
          isLoading={divLoading}
          error={fieldError?.structuralDivisionId?.message}
          required
          disabled={!record.organizationId}
        />
        <FormSelect
          label="Vəzifə"
          value={record.positionId}
          onChange={(v) => upd("positionId", v)}
          options={positions}
          isLoading={posLoading}
          error={fieldError?.positionId?.message}
          required
          disabled={!record.structuralDivisionId}
        />
        <FormSelect
          label="Əsas/əlavə iş yeri"
          value={record.workType}
          onChange={(v) => upd("workType", v)}
          options={workTypes}
        />
        <FileUpload
          label="Əmək fəaliyyəti ilə bağlı sənəd əlavə et"
          hint="JPEG, PDF, PNG kimi formatları dəstəkləyir"
          accept=".jpeg,.jpg,.pdf,.png"
          value={record.document}
          onChange={(v) => upd("document", v)}
        />
        <FormSelect
          label="Dövlət qulluqçusu"
          value={record.isCivilServant}
          onChange={(v) => upd("isCivilServant", v)}
          options={civilServantOptions}
          error={fieldError?.isCivilServant?.message}
          required
        />
        <div>
          <FormDatePicker
            label="Başlama tarixi"
            value={record.startDate}
            onChange={(v) => upd("startDate", v)}
            error={fieldError?.startDate?.message}
            required
          />
          <div className="flex items-center gap-2">
            <FormCheckbox
              label="Hal-hazırda işləyir"
              checked={record.currentlyWorking}
              onCheckedChange={(v) => {
                if (v) {
                  updMultiple({ currentlyWorking: v, endDate: "", terminationReason: "" });
                } else {
                  upd("currentlyWorking", v);
                }
              }}
            />
          </div>
        </div>
        <FormDatePicker
          label="Bitmə tarixi"
          value={record.endDate}
          onChange={(v) => upd("endDate", v)}
          error={fieldError?.endDate?.message}
          disabled={record.currentlyWorking}
          required={!record.currentlyWorking}
        />
        <FormSelect
          label="Xitam maddəsi"
          value={record.terminationReason}
          onChange={(v) => upd("terminationReason", v)}
          options={terminationReasons}
          error={fieldError?.terminationReason?.message}
          disabled={record.currentlyWorking}
          required={!record.currentlyWorking}
        />
      </div>
    </div>
  );
}
