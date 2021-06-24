import { IAddress, IAddressQueryParams } from '@/pages/address/types';

export interface IPhone {
  code: string;
  number: string;
  ext: string;
}

export interface IClient {
  _id: string;
  name?: string;
  owner?: {
    name: string;
    _id: string;
  };

  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phoneNumber: IPhone;
  // addresses:IAddress[];
  createdAt?: string;
  updatedAt?: string;
}

export interface IClientStats {
  totalClient: number;
  todayClient: number;
  monthClient: number;
  averageClient: number;
}

export interface IClientQueryParams {
  limit?: number | string;
  page?: number | string;
  name?: string;
  company?: string;
}
