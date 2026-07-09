"use client";

import { X, Save, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FormFooterProps {
  onCancel: () => void;
  onSaveDraft: () => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
  isValid?: boolean;
}

export function FormFooter({
  onCancel,
  onSaveDraft,
  onSubmit,
  isSubmitting,
  isValid,
}: FormFooterProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-end gap-3 rounded-xl bg-white px-6 py-4 sm:px-8">
      <div className="flex flex-col sm:hidden w-full gap-3">
        <Button
          type="button"
          variant="outline"
          className="border-blue-200 bg-blue-50 text-blue-600 hover:bg-blue-100 gap-2"
          onClick={onSaveDraft}
        >
          Yadda saxla
          <Save className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="outline"
          className="border-red-200 bg-red-50 text-red-600 hover:bg-red-100 gap-2"
          onClick={onCancel}
        >
          Ləğv et
          <X className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          className="bg-blue-600 text-white hover:bg-blue-700 gap-2"
          onClick={onSubmit}
          disabled={isSubmitting || !isValid}
        >
          {isSubmitting ? "Gözləyin..." : "Əməkdaşı təsdiqlə"}
          {!isSubmitting && <Check className="h-4 w-4" />}
        </Button>
      </div>
      <div className="hidden sm:flex items-center gap-3">
        <Button
          type="button"
          variant="outline"
          className="border-red-200 bg-red-50 text-red-600 hover:bg-red-100 gap-2"
          onClick={onCancel}
        >
          Ləğv et
          <X className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="outline"
          className="border-blue-200 bg-blue-50 text-blue-600 hover:bg-blue-100 gap-2"
          onClick={onSaveDraft}
        >
          Yadda saxla
          <Save className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          className="bg-blue-600 text-white hover:bg-blue-700 gap-2"
          onClick={onSubmit}
          disabled={isSubmitting || !isValid}
        >
          {isSubmitting ? "Gözləyin..." : "Əməkdaşı təsdiqlə"}
          {!isSubmitting && <Check className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
}
