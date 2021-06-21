import { get, patch, post, del } from '@/utils/httpMethods';
import { IStudentAccount, IStudentAccountQueryParams } from '@/pages/studentAccount/types';

export async function queryStudentAccountCreate(payload: IStudentAccount): Promise<any> {
  return post({ url: '/studentAccount', data: payload });
}

export async function queryStudentAccountGetById(studentAccountId: string): Promise<any> {
  return get({ url: `/studentAccount/${studentAccountId}` });
}

export async function queryStudentAccountUpdateById(payload: {
  studentAccountId: string;
  values: IStudentAccount;
}): Promise<any> {
  return patch({ url: `/studentAccount/${payload.studentAccountId}`, data: payload.values });
}

export async function queryStudentAccountDeleteById(studentAccountId: string): Promise<any> {
  return del({ url: `/studentAccount/${studentAccountId}` });
}

export async function queryStudentAccountSearch(payload: IStudentAccountQueryParams): Promise<any> {
  return post({ url: '/studentAccount/search', data: payload });
}

export async function queryStudentAccountGetAll(): Promise<any> {
  return get({ url: '/studentAccount' });
}

export async function queryStudentAccountGetStats(): Promise<any> {
  return get({ url: `/studentAccount/stats` });
}

export async function queryStudentAccountGetCountryList(): Promise<any> {
  return get({ url: `/list/countries` });
}

export async function queryStudentAccountGetCountryStatesList(country: string): Promise<any> {
  return get({ url: `/list/states/${country}` });
}

export async function queryStudentAccountGetTimeZoneList(payload: string): Promise<any> {
  return get({ url: `/list/timeZone`, data: payload });
}

export async function queryStudentAccountGetFocusList(payload: string): Promise<any> {
  return get({ url: `/list/focus`, data: payload });
}
