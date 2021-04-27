import { get, patch, post, del } from '@/utils/httpMethods';
import { IStyle, IStyleQueryParams } from '@/pages/style/types';

export async function queryStyleCreate(payload: any): Promise<any> {
  return post({ url: '/style', data: payload });
}

export async function queryStyleGetById(id: string): Promise<any> {
  return get({ url: `/style/${id}` });
}

export async function queryStyleUpdateById(payload: { styleId: string; values: IStyle }): Promise<any> {
  return patch({ url: `/style/${payload.styleId}`, data: payload.values });
}

export async function queryStyleDeleteById(styleId: string): Promise<any> {
  return del({ url: `/style/${styleId}` });
}

export async function queryStyleSearch(payload: IStyleQueryParams): Promise<any> {
  return post({ url: '/style/search', data: payload });
}

export async function queryStyleGetAll(): Promise<any> {
  return get({ url: '/style' });
}

export async function queryStyleGetStats(): Promise<any> {
  return get({ url: `/style/stats` });
}
