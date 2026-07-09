"use client";

import { Input } from "@/components/ui/input";

interface FormInputProps {
  label: string;
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  type?: string;
  disabled?: boolean;
}

export function FormInput({
  label,
  value,
  onChange,
  placeholder,
  error,
  required,
  type = "text",
  disabled,
}: FormInputProps) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs text-gray-500">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <Input
        type={type}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="border-gray-200"
        disabled={disabled}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
