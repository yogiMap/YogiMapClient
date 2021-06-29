import { ITeacherAccount } from '@/pages/teacherAccount/types';

export interface ISipPhone {
  _id: string;
  description: string;
  phoneNumber: string;
  companyAccount: ITeacherAccount | string;
  owner: {
    name: string;
    _id: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ISipPhoneStats {
  totalSipPhone: number;
  todaySipPhone: number;
  monthSipPhone: number;
  averageSipPhone: number;
}

export interface ISipPhoneQueryParams {
  limit?: number | string;
  page?: number | string;
  sipPhoneSearchParam1?: string;
  sipPhoneSearchParam2?: string;
}
