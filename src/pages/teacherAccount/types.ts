export interface ITeacherAccount {
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

export interface ITeacherAccountQueryParams {
  limit?: number | string;
  page?: number | string;
  teacherAccountSearchParam1?: string;
  teacherAccountSearchParam2?: string;
}

export interface ITeacherAccountStats {
  totalTeacherAccount: number;
  todayTeacherAccount: number;
  monthTeacherAccount: number;
  averageTeacherAccount: number;
}
