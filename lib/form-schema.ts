import * as yup from "yup";

const requiredMessage = "Bu sahə məcburidir";
const minChars = (n: number) => `Minimum ${n} simvol`;
const phonePrefixPattern = /^(050|051|055|070|077|099)$/;
const phoneNumberPattern = /^\d{7}$/;
const finPattern = /^[a-zA-Z0-9]{7}$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ssnPattern = /^\d+$/;
const documentNumberPattern = /^\d+$/;

function stringDate() {
  return yup
    .string()
    .transform((v) => (v ? v : undefined))
    .test("is-valid-date", (value) => {
      if (!value) return true;
      return !isNaN(Date.parse(value));
    });
}

function requiredStringDate() {
  return stringDate().required(requiredMessage);
}

const employmentRecordSchema = yup.object().shape({
  organizationId: yup.string().required(requiredMessage),
  structuralDivisionId: yup.string().required(requiredMessage),
  positionId: yup.string().required(requiredMessage),
  workType: yup.string().defined().default(""),
  document: yup.mixed<File>().nullable().defined().default(null),
  isCivilServant: yup.string().required(requiredMessage),
  startDate: requiredStringDate().test(
    "max-today",
    "Başlama tarixi bugünkü tarixdən böyük ola bilməz",
    (v) => {
      if (!v) return false;
      return new Date(v) <= new Date();
    }
  ),
  currentlyWorking: yup.boolean().defined().default(false),
  endDate: yup.string().defined().default("").when("currentlyWorking", {
    is: false,
    then: () =>
      requiredStringDate()
        .test(
          "after-start",
          "Bitmə tarixi başlama tarixindən sonra olmalıdır",
          function (v) {
            if (!v || !this.parent.startDate) return true;
            return new Date(v) > new Date(this.parent.startDate);
          }
        ),
    otherwise: (schema) => schema.notRequired().defined().default(""),
  }),
  terminationReason: yup.string().defined().default("").when("currentlyWorking", {
    is: false,
    then: (schema) => schema.required(requiredMessage),
    otherwise: (schema) => schema.notRequired().defined().default(""),
  }),
});

export const employeeFormSchema = yup.object().shape({
  fin: yup
    .string()
    .required(requiredMessage)
    .matches(finPattern, "FİN 7 simvol, hərf və rəqəm qarışığı olmalıdır"),
  documentSeries: yup.string().required(requiredMessage),
  documentNumber: yup
    .string()
    .required(requiredMessage)
    .matches(documentNumberPattern, "Yalnız rəqəm daxil edin"),
  firstName: yup.string().required(requiredMessage).min(2, minChars(2)),
  lastName: yup.string().required(requiredMessage).min(2, minChars(2)),
  patronymic: yup.string().defined().default(""),
  gender: yup.string().required(requiredMessage),
  birthDate: requiredStringDate().test(
    "min-age-18",
    "Yaş minimum 18 olmalıdır",
    (v) => {
      if (!v) return false;
      const eighteenYearsAgo = new Date();
      eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);
      return new Date(v) <= eighteenYearsAgo;
    }
  ),
  birthPlace: yup.string().required(requiredMessage),
  maritalStatus: yup.string().required(requiredMessage),
  nationality: yup.string().required(requiredMessage),
  citizenship: yup.string().required(requiredMessage),
  issuingAuthority: yup.string().required(requiredMessage),
  issueDate: requiredStringDate()
    .test(
      "after-birth",
      "Sənədin verilmə tarixi doğum tarixindən əvvəl ola bilməz",
      function (v) {
        if (!v || !this.parent.birthDate) return true;
        return new Date(v) >= new Date(this.parent.birthDate);
      }
    )
    .test(
      "max-today",
      "Sənədin verilmə tarixi bugünkü tarixdən böyük ola bilməz",
      (v) => {
        if (!v) return false;
        return new Date(v) <= new Date();
      }
    ),
  expiryDate: yup
    .string()
    .defined()
    .default("")
    .transform((v) => (v ? v : ""))
    .test(
      "after-issue",
      "Son etibarlılıq tarixi verilmə tarixindən sonra olmalıdır",
      function (v) {
        if (!v) return true;
        if (!this.parent.issueDate) return true;
        return new Date(v) > new Date(this.parent.issueDate);
      }
    ),
  ssn: yup
    .string()
    .defined()
    .default("")
    .test("ssn-format", "SSN yalnız rəqəm formatında olmalıdır", (v) => {
      if (!v) return true;
      return ssnPattern.test(v);
    }),
  profilePhoto: yup.mixed<File>().nullable().defined().default(null),
  documentScan: yup.mixed<File>().nullable().defined().default(null),
  registrationAddress: yup.string().required(requiredMessage),
  sameAsRegistration: yup.boolean().defined().default(false),
  actualAddress: yup
    .string()
    .defined()
    .default("")
    .when("sameAsRegistration", {
      is: true,
      then: (schema) => schema.notRequired(),
      otherwise: (schema) => schema.required(requiredMessage),
    }),
  phonePrefix: yup
    .string()
    .required(requiredMessage)
    .matches(phonePrefixPattern, "Düzgün prefiks seçin"),
  phoneNumber: yup
    .string()
    .required(requiredMessage)
    .matches(phoneNumberPattern, "7 rəqəm daxil edin"),
  email: yup
    .string()
    .required(requiredMessage)
    .matches(emailPattern, "Düzgün email formatı daxil edin"),
  fax: yup.string().defined().default(""),
  postalCode: yup.string().defined().default(""),
  employmentRecords: yup.array().of(employmentRecordSchema).defined().default([]),
});

export type EmployeeFormSchemaType = yup.InferType<typeof employeeFormSchema>;
