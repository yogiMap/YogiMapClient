import { get, patch, post, del } from '@/utils/httpMethods';
import { Iclass, IclassQueryParams } from '@/pages/class/types';

export async function queryclassCreate(payload: any): Promise<any> {
  return post({ url: '/class', data: payload });
}

export async function queryclassGetById(id: string): Promise<any> {
  return get({ url: `/class/${id}` });
}

export async function queryclassUpdateById(payload: { classId: string; values: Iclass }): Promise<any> {
  return patch({ url: `/class/${payload.classId}`, data: payload.values });
}

export async function queryclassDeleteById(classId: string): Promise<any> {
  return del({ url: `/class/${classId}` });
}

export async function queryclassSearch(payload: IclassQueryParams): Promise<any> {
  return post({ url: '/class/search', data: payload });
}

export async function queryclassGetAll(): Promise<any> {
  return get({ url: '/class' });
}

export async function queryclassGetStats(): Promise<any> {
  return get({ url: `/class/stats` });
}
