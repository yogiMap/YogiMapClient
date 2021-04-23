import { get, patch, post, del } from '@/utils/httpMethods';
import { IClass, IClassQueryParams } from '@/pages/class/types';

export async function queryClassCreate(payload: any): Promise<any> {
  return post({ url: '/class', data: payload });
}

export async function queryClassGetById(id: string): Promise<any> {
  return get({ url: `/class/${id}` });
}

export async function queryClassUpdateById(payload: { classId: string; values: IClass }): Promise<any> {
  return patch({ url: `/class/${payload.classId}`, data: payload.values });
}

export async function queryClassDeleteById(classId: string): Promise<any> {
  return del({ url: `/class/${classId}` });
}

export async function queryClassSearch(payload: IClassQueryParams): Promise<any> {
  return post({ url: '/class/search', data: payload });
}

export async function queryClassGetAll(): Promise<any> {
  return get({ url: '/class' });
}

export async function queryClassGetStats(): Promise<any> {
  return get({ url: `/class/stats` });
}
