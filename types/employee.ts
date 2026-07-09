export interface SelectOption {
  value: string;
  label: string;
  parentId?: string;
}

export interface EmploymentRecord {
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

export interface EmployeeFormData {
  fin: string;
  documentSeries: string;
  documentNumber: string;
  firstName: string;
  lastName: string;
  patronymic: string;
  gender: string;
  birthDate: string;
  birthPlace: string;
  maritalStatus: string;
  nationality: string;
  citizenship: string;
  issuingAuthority: string;
  issueDate: string;
  expiryDate: string;
  ssn: string;
  profilePhoto: File | null;
  documentScan: File | null;
  registrationAddress: string;
  sameAsRegistration: boolean;
  actualAddress: string;
  phonePrefix: string;
  phoneNumber: string;
  email: string;
  fax: string;
  postalCode: string;
  employmentRecords: EmploymentRecord[];
}
