import { get, patch, post, del } from '@/utils/httpMethods';
import { IClasses, IClassesQueryParams } from '@/pages/classes/types';

export async function queryClassesCreate(payload: any): Promise<any> {
  return post({ url: '/classes', data: payload });
}

export async function queryClassesGetById(classesId: string): Promise<any> {
  return get({ url: `/classes/${classesId}` });
}

export async function queryClassesUpdateById(payload: { classesId: string; values: IClasses }): Promise<any> {
  return patch({ url: `/classes/${payload.classesId}`, data: payload.values });
}

export async function queryClassesDeleteById(classesId: string): Promise<any> {
  return del({ url: `/classes/${classesId}` });
}

export async function queryClassesSearch(payload: IClassesQueryParams): Promise<any> {
  return post({ url: '/classes/search', data: payload });
}

export async function queryClassesGetAll(): Promise<any> {
  return get({ url: '/classes' });
}

export async function queryClassesGetStats(): Promise<any> {
  return get({ url: `/classes/stats` });
}
