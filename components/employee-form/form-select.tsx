"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { SelectOption } from "@/types";
import { Loader2 } from "lucide-react";

interface FormSelectProps {
  label: string;
  value?: string;
  onChange: (value: string) => void;
  options?: SelectOption[];
  isLoading?: boolean;
  isError?: boolean;
  error?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
}

export function FormSelect({
  label,
  value,
  onChange,
  options,
  isLoading,
  isError,
  error,
  placeholder = "Seçin",
  required,
  disabled,
}: FormSelectProps) {
  const errorMessage = error || (isError ? "Məlumat yüklənərkən xəta baş verdi" : undefined);

  return (
    <div className="space-y-1.5">
      <label className="text-xs text-gray-500">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <Select
        value={value || ""}
        onValueChange={onChange}
        disabled={disabled || isLoading}
      >
        <SelectTrigger className="w-full border-gray-200">
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
          ) : (
            <SelectValue placeholder={placeholder} />
          )}
        </SelectTrigger>
        <SelectContent>
          {options?.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {errorMessage && (
        <p className="text-xs text-red-500">{errorMessage}</p>
      )}
    </div>
  );
}
