export interface IState {}

export interface IUser {
  _id: string;
  emailConfirmation: { confirmed: boolean };
  phoneConfirmation: { confirmed: boolean };
  lastLogin: { date: string };
  personalAddress: IPersonalAddress;
  name: string;
  firstName: string;
  lastName: string;
  roles: string[];
  active: boolean;
  resetPassword: { history: [] };
  phone: string;
  createdAt: string;
  updatedAt: string;
  image: string;
  avatar: string;

  acl: string[];
}

export interface IPersonalAddress {
  countryName: string;
  countryCode: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface IUsersStats {
  total?: number;
  registeredLast10Days?: number;
}

export interface IUsersSearchTerms {
  name: string;
  email: string;
  phone: string;
  role: string;
  limit: number;
  page: number;
}

export interface IPagination {
  pageCurrent: number;
  pageCount: number;
  limit: number;
  itemsCount: number;
  isFirst: boolean;
  isLast: boolean;
}

export interface IUserQueryParams {
  limit?: number | string;
  page?: number | string;
  userSearchParam1?: string;
  userSearchParam2?: string;
}
export interface IState {}

export interface IUser {
  _id: string;
  emailConfirmation: { confirmed: boolean };
  phoneConfirmation: { confirmed: boolean };
  lastLogin: { date: string };
  personalAddress: IPersonalAddress;
  name: string;
  firstName: string;
  lastName: string;
  roles: string[];
  active: boolean;
  resetPassword: { history: [] };
  phone: string;
  createdAt: string;
  updatedAt: string;
  image: string;

  acl: string[];
}

export interface IPersonalAddress {
  countryName: string;
  countryCode: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface IUsersStats {
  total?: number;
  registeredLast10Days?: number;
}

export interface IUsersSearchTerms {
  name: string;
  email: string;
  phone: string;
  role: string;
  limit: number;
  page: number;
}

export interface IPagination {
  pageCurrent: number;
  pageCount: number;
  limit: number;
  itemsCount: number;
  isFirst: boolean;
  isLast: boolean;
}

export interface IUserQueryParams {
  limit?: number | string;
  page?: number | string;
  userSearchParam1?: string;
  userSearchParam2?: string;
}
