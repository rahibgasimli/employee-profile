"use client";

import { DatePicker } from "@/components/ui/date-picker";

interface FormDatePickerProps {
  label: string;
  value?: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
}

export function FormDatePicker({
  label,
  value,
  onChange,
  error,
  required,
  disabled,
  placeholder,
}: FormDatePickerProps) {
  const date = value ? new Date(value) : undefined;

  function handleSelect(d: Date | undefined) {
    onChange(d ? d.toISOString() : "");
  }

  return (
    <div className="space-y-0.5">
      <label className="text-xs text-gray-500">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <DatePicker
        value={date}
        onChange={handleSelect}
        placeholder={placeholder}
        disabled={disabled}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
