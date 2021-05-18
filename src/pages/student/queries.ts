import { get, patch, post, del } from '@/utils/httpMethods';
import { IStudent, IStudentQueryParams } from '@/pages/student/types';

export async function queryStudentCreate(payload: IStudent): Promise<any> {
  return post({ url: '/student', data: payload });
}

export async function queryStudentGetById(studentId: string): Promise<any> {
  return get({ url: `/student/${studentId}` });
}

export async function queryStudentUpdateById(payload: { studentId: string; values: IStudent }): Promise<any> {
  return patch({ url: `/student/${payload.studentId}`, data: payload.values });
}

export async function queryStudentDeleteById(studentId: string): Promise<any> {
  return del({ url: `/student/${studentId}` });
}

export async function queryStudentSearch(payload: IStudentQueryParams): Promise<any> {
  return post({ url: '/student/search', data: payload });
}

export async function queryStudentGetAll(): Promise<any> {
  return get({ url: '/student' });
}

export async function queryStudentGetStats(): Promise<any> {
  return get({ url: `/student/stats` });
}

export async function queryStudentGetCountryList(): Promise<any> {
  return get({ url: `/list/countries` });
}

export async function queryStudentGetCountryStatesList(country: string): Promise<any> {
  return get({ url: `/list/states/${country}` });
}

export async function queryStudentGetTimeZoneList(payload: string): Promise<any> {
  return get({ url: `/list/timeZone`, data: payload });
}

export async function queryStudentGetFocusList(payload: string): Promise<any> {
  return get({ url: `/list/focus`, data: payload });
}
