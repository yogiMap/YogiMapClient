import { ICompanyAccount } from '@/pages/companyAccount/types';

export interface ISidPhone {
  _id: string;
  description: string;
  phoneNumber: string;
  companyAccount: ICompanyAccount | string;
  owner: {
    name: string;
    _id: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ISidPhoneStats {
  totalSidPhone: number;
  todaySidPhone: number;
  monthSidPhone: number;
  averageSidPhone: number;
}

export interface ISidPhoneQueryParams {
  limit?: number | string;
  page?: number | string;
  sidPhoneSearchParam1?: string;
  sidPhoneSearchParam2?: string;
}
