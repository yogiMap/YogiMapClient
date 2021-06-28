import { get, patch, post, del } from '@/utils/httpMethods';
import { ISidPhone, ISidPhoneQueryParams } from '@/pages/sidPhone/types';

export async function querySidPhoneCreate(payload: any): Promise<any> {
  return post({ url: '/sidPhone', data: payload });
}

export async function querySidPhoneGetById(id: string): Promise<any> {
  return get({ url: `/sidPhone/${id}` });
}

export async function querySidPhoneUpdateById(payload: { sidPhoneId: string; values: ISidPhone }): Promise<any> {
  return patch({ url: `/sidPhone/${payload.sidPhoneId}`, data: payload.values });
}

export async function querySidPhoneDeleteById(sidPhoneId: string): Promise<any> {
  return del({ url: `/sidPhone/${sidPhoneId}` });
}

export async function querySidPhoneSearch(payload: ISidPhoneQueryParams): Promise<any> {
  return post({ url: '/sidPhone/search', data: payload });
}

export async function querySidPhoneGetAll(): Promise<any> {
  return get({ url: '/sidPhone' });
}

export async function querySidPhoneGetStats(): Promise<any> {
  return get({ url: `/sidPhone/stats` });
}
