export interface IVendorType {
  _id: string;
  name: string;
  owner: {
    name: string;
    _id: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface IVendorTypeStats {
  totalVendorType: number;
  todayVendorType: number;
  monthVendorType: number;
  averageVendorType: number;
}

export interface IVendorTypeQueryParams {
  limit?: number | string;
  page?: number | string;
  vendorTypeSearchParam1?: string;
}
