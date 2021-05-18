import { IPhone } from '@/pages/user/types';

export interface IStudent {
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

export interface IStudentQueryParams {
  limit?: number | string;
  page?: number | string;
  studentSearchParam1?: string;
  studentSearchParam2?: string;
}

export interface IStudentStats {
  totalStudent: number;
  todayStudent: number;
  monthStudent: number;
  averageStudent: number;
}
