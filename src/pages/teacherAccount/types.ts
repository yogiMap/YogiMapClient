import { IPhone } from '@/pages/user/types';

export interface ITeacherAccount {
  _id: string;
  // firstName: string;
  // lastName: string;
  name: string;
  focus: string;
  style: string;
  classType: string;
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

export interface ITeacherAccountQueryParams {
  limit?: number | string;
  page?: number | string;
  name?: string;
  focus?: string;
  style?: string;
  country?: string;
  city?: string;
}

export interface ITeacherAccountStats {
  totalTeacherAccount: number;
  todayTeacherAccount: number;
  monthTeacherAccount: number;
  averageTeacherAccount: number;
}
