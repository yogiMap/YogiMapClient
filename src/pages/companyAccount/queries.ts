import { get, patch, post, del } from '@/utils/httpMethods';
import { ICompanyAccount, ICompanyAccountQueryParams } from '@/pages/companyAccount/types';

export async function queryCompanyAccountCreate(payload: ICompanyAccount): Promise<any> {
  return post({ url: '/companyAccount', data: payload });
}

export async function queryCompanyAccountGetById(companyAccountId: string): Promise<any> {
  return get({ url: `/companyAccount/${companyAccountId}` });
}

export async function queryCompanyAccountUpdateById(payload: {
  companyAccountId: string;
  values: ICompanyAccount;
}): Promise<any> {
  return patch({ url: `/companyAccount/${payload.companyAccountId}`, data: payload.values });
}

export async function queryCompanyAccountDeleteById(companyAccountId: string): Promise<any> {
  return del({ url: `/companyAccount/${companyAccountId}` });
}

export async function queryCompanyAccountSearch(payload: ICompanyAccountQueryParams): Promise<any> {
  return post({ url: '/companyAccount/search', data: payload });
}

export async function queryCompanyAccountGetAll(): Promise<any> {
  return get({ url: '/companyAccount' });
}

export async function queryCompanyAccountGetStats(): Promise<any> {
  return get({ url: `/companyAccount/stats` });
}

export async function queryCompanyAccountGetCountryList(): Promise<any> {
  return get({ url: `/list/countries` });
}

export async function queryCompanyAccountGetCountryStatesList(country: string): Promise<any> {
  return get({ url: `/list/states/${country}` });
}

export async function queryCompanyAccountGetTimeZoneList(payload: string): Promise<any> {
  return get({ url: `/list/timeZone`, data: payload });
}

export async function queryCompanyAccountGetFocusList(payload: string): Promise<any> {
  return get({ url: `/list/focus`, data: payload });
}
