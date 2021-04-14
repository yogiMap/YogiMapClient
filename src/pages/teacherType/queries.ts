import { get, patch, post, del } from '@/utils/httpMethods';
import { ITeacherType, ITeacherTypeQueryParams } from '@/pages/teacherType/types';

export async function queryTeacherTypeCreate(payload: any): Promise<any> {
  return post({ url: '/teacherType', data: payload });
}

export async function queryTeacherTypeGetById(id: string): Promise<any> {
  return get({ url: `/teacherType/${id}` });
}

export async function queryTeacherTypeUpdateById(payload: { teacherTypeId: string; values: ITeacherType }): Promise<any> {
  return patch({ url: `/teacherType/${payload.teacherTypeId}`, data: payload.values });
}

export async function queryTeacherTypeDeleteById(teacherTypeId: string): Promise<any> {
  return del({ url: `/teacherType/${teacherTypeId}` });
}

export async function queryTeacherTypeSearch(payload: ITeacherTypeQueryParams): Promise<any> {
  return post({ url: '/teacherType/search', data: payload });
}

export async function queryTeacherTypeGetAll(): Promise<any> {
  return get({ url: '/teacherType' });
}

export async function queryTeacherTypeGetStats(): Promise<any> {
  return get({ url: `/teacherType/stats` });
}
