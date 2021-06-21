import { IPhone } from '@/pages/user/types';

export interface IStudentAccount {
  _id: string;
  firstName: string;
  lastName: string;
  name: string;
  phoneNumber: IPhone;
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

export interface IStudentAccountQueryParams {
  limit?: number | string;
  page?: number | string;
  studentAccountSearchParam1?: string;
  studentAccountSearchParam2?: string;
}

export interface IStudentAccountStats {
  totalStudentAccount: number;
  todayStudentAccount: number;
  monthStudentAccount: number;
  averageStudentAccount: number;
}
