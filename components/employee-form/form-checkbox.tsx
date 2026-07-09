"use client";

import { Checkbox } from "@/components/ui/checkbox";

interface FormCheckboxProps {
  label: string;
  checked?: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export function FormCheckbox({ label, checked, onCheckedChange }: FormCheckboxProps) {
  return (
    <div className="flex items-center gap-2 pt-6">
      <Checkbox
        id={label}
        checked={checked}
        onCheckedChange={(v) => onCheckedChange(v === true)}
        className="data-checked:bg-blue-500 data-checked:border-blue-500"
      />
      <label htmlFor={label} className="text-sm text-gray-600 cursor-pointer">
        {label}
      </label>
    </div>
  );
}
