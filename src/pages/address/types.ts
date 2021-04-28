export interface IAddress {
  _id: string;
  client: string;
  address: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  countryName: string;
  countryCode: string;
  zipCode: string;
  addressAdditionalInfo: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IAddressStats {
  totalAddress: number;
  todayAddress: number;
  monthAddress: number;
  averageAddress: number;
}

export interface IAddressQueryParams {
  limit?: number | string;
  page?: number | string;
  addressSearchParam1?: string;
  addressSearchParam2?: string;
}
