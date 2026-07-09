"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { employeeFormSchema, type EmployeeFormSchemaType } from "@/lib/form-schema";
import { PersonalInfoSection } from "@/components/employee-form/personal-info-section";
import { EmploymentSection } from "@/components/employee-form/employment-section";
import { FormFooter } from "@/components/employee-form/form-footer";
import { toast } from "sonner";
import { useCallback } from "react";
import type { FieldPath } from "react-hook-form";

type FormValues = EmployeeFormSchemaType;

const defaultValues: FormValues = {
  fin: "",
  documentSeries: "",
  documentNumber: "",
  firstName: "",
  lastName: "",
  patronymic: "",
  gender: "",
  birthDate: "" as unknown as FormValues["birthDate"],
  birthPlace: "",
  maritalStatus: "",
  nationality: "",
  citizenship: "",
  issuingAuthority: "",
  issueDate: "" as unknown as FormValues["issueDate"],
  expiryDate: "" as unknown as FormValues["expiryDate"],
  ssn: "",
  profilePhoto: null,
  documentScan: null,
  registrationAddress: "",
  sameAsRegistration: false,
  actualAddress: "",
  phonePrefix: "",
  phoneNumber: "",
  email: "",
  fax: "",
  postalCode: "",
  employmentRecords: [],
};

export default function CreateEmployeePage() {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: yupResolver(employeeFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "employmentRecords",
  });

  const values = watch();

  const formAdapter = {
    values,
    errors,
    setValue,
  };

  const handleCancel = useCallback(() => {
    window.history.back();
  }, []);

  function handleSaveDraft() {
    const data = watch();
    localStorage.setItem("employee-draft", JSON.stringify(data));
    toast.success("Draft uğurla saxlanıldı");
  }

  const onSubmit = useCallback(
    (data: FormValues) => {
      console.log("Submitting:", data);
      toast.success("Form təsdiqləndi!");
    },
    []
  );

  function onAddEmployment() {
    append({
      organizationId: "",
      structuralDivisionId: "",
      positionId: "",
      workType: "",
      document: null,
      isCivilServant: "",
      startDate: "" as unknown as FormValues["employmentRecords"][number]["startDate"],
      currentlyWorking: false,
      endDate: "" as unknown as FormValues["employmentRecords"][number]["endDate"],
      terminationReason: "",
    });
  }

  function onRemoveEmployment(index: number) {
    remove(index);
  }

  function onUpdateEmployment(
    index: number,
    field: string,
    value: unknown
  ) {
    setValue(
      `employmentRecords.${index}.${field}` as FieldPath<FormValues>,
      value as FormValues["employmentRecords"][number][keyof FormValues["employmentRecords"][number]]
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Əməkdaşın qeydiyyatı
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <PersonalInfoSection form={formAdapter} />
          <EmploymentSection
            records={fields as unknown as FormValues["employmentRecords"]}
            errors={errors}
            onAdd={onAddEmployment}
            onRemove={onRemoveEmployment}
            onUpdate={onUpdateEmployment}
            onUpdateField={update}
          />
          <FormFooter
            onCancel={handleCancel}
            onSaveDraft={handleSaveDraft}
            onSubmit={handleSubmit(onSubmit)}
            isValid={isValid}
          />
        </form>
      </div>
    </div>
  );
}
