import { get, patch, post, del } from '@/utils/httpMethods';
import { IClassType, IClassTypeQueryParams } from '@/pages/classType/types';

export async function queryClassTypeCreate(payload: any): Promise<any> {
  return post({ url: '/classType', data: payload });
}

export async function queryClassTypeGetById(id: string): Promise<any> {
  return get({ url: `/classType/${id}` });
}

export async function queryClassTypeUpdateById(payload: { classTypeId: string; values: IClassType }): Promise<any> {
  return patch({ url: `/classType/${payload.classTypeId}`, data: payload.values });
}

export async function queryClassTypeDeleteById(classTypeId: string): Promise<any> {
  return del({ url: `/classType/${classTypeId}` });
}

export async function queryClassTypeSearch(payload: IClassTypeQueryParams): Promise<any> {
  return post({ url: '/classType/search', data: payload });
}

export async function queryClassTypeGetAll(): Promise<any> {
  return get({ url: '/classType' });
}

export async function queryClassTypeGetStats(): Promise<any> {
  return get({ url: `/classType/stats` });
}
