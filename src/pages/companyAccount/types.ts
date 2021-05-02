export interface ICompanyAccount {
  _id: string;
  teacherName: string;
  phoneNumber1: string;
  phoneNumber2: string;
  fax: string;
  email: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  timeZone: string;
  currency: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ICompanyAccountQueryParams {
  limit?: number | string;
  page?: number | string;
  companyAccountSearchParam1?: string;
  companyAccountSearchParam2?: string;
}

export interface ICompanyAccountStats {
  totalCompanyAccount: number;
  todayCompanyAccount: number;
  monthCompanyAccount: number;
  averageCompanyAccount: number;
}
