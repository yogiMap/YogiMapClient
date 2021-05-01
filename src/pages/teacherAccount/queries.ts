import { get, patch, post, del } from '@/utils/httpMethods';
import { ITeacherAccount, ITeacherAccountQueryParams } from '@/pages/teacherAccount/types';

export async function queryTeacherAccountCreate(payload: ITeacherAccount): Promise<any> {
  return post({ url: '/teacherAccount', data: payload });
}

export async function queryTeacherAccountGetById(teacherAccountId: string): Promise<any> {
  return get({ url: `/teacherAccount/${teacherAccountId}` });
}

export async function queryTeacherAccountUpdateById(payload: {
  teacherAccountId: string;
  values: ITeacherAccount;
}): Promise<any> {
  return patch({ url: `/teacherAccount/${payload.teacherAccountId}`, data: payload.values });
}

export async function queryTeacherAccountDeleteById(teacherAccountId: string): Promise<any> {
  return del({ url: `/teacherAccount/${teacherAccountId}` });
}

export async function queryTeacherAccountSearch(payload: ITeacherAccountQueryParams): Promise<any> {
  return post({ url: '/teacherAccount/search', data: payload });
}

export async function queryTeacherAccountGetAll(): Promise<any> {
  return get({ url: '/teacherAccount' });
}

export async function queryTeacherAccountGetStats(): Promise<any> {
  return get({ url: `/teacherAccount/stats` });
}

export async function queryTeacherAccountGetCountryList(): Promise<any> {
  return get({ url: `/list/countries` });
}

export async function queryTeacherAccountGetCountryStatesList(country: string): Promise<any> {
  return get({ url: `/list/states/${country}` });
}

export async function queryTeacherAccountGetTimeZoneList(payload: string): Promise<any> {
  return get({ url: `/list/timeZone`, data: payload });
}

export async function queryTeacherAccountGetFocusList(payload: string): Promise<any> {
  return get({ url: `/list/focus`, data: payload });
}
