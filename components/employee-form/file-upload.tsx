"use client";

import { Upload, X } from "lucide-react";
import { useState, useRef } from "react";

interface FileUploadProps {
  label: string;
  hint?: string;
  accept?: string;
  maxSizeMB?: number;
  value?: File | null;
  onChange: (file: File | null) => void;
}

export function FileUpload({
  label,
  hint,
  accept,
  maxSizeMB = 5,
  value,
  onChange,
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(file: File | null) {
    if (file && file.size > maxSizeMB * 1024 * 1024) {
      alert(`Fayl ölçüsü ${maxSizeMB}MB-dan böyük ola bilməz`);
      return;
    }
    onChange(file);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    handleFile(file);
  }

  return (
    <div className="space-y-1.5">
      <label className="text-xs text-gray-500">
        {label}
      </label>
      <div className="relative">
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={handleFileChange}
        />
        {value ? (
          <div className="flex h-8 w-full items-center rounded-lg border border-gray-200 bg-white px-2.5 text-sm text-gray-700">
            <span className="flex-1 truncate">{value.name}</span>
            <button
              type="button"
              onClick={() => onChange(null)}
              className="ml-1 flex size-5 items-center justify-center rounded hover:bg-gray-100"
            >
              <X className="h-3.5 w-3.5 text-gray-400" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="flex h-8 w-full items-center gap-2 rounded-lg border border-gray-200 bg-white px-2.5 text-sm text-gray-500 hover:border-gray-300"
          >
            <Upload className="h-3.5 w-3.5" />
            <span>Seç</span>
          </button>
        )}
      </div>
      {hint && (
        <p className="text-[10px] text-gray-400">{hint}</p>
      )}
    </div>
  );
}
