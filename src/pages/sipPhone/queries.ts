import { get, patch, post, del } from '@/utils/httpMethods';
import { ISipPhone, ISipPhoneQueryParams } from '@/pages/sipPhone/types';

export async function querySipPhoneCreate(payload: any): Promise<any> {
  return post({ url: '/sipPhone', data: payload });
}

export async function querySipPhoneGetById(id: string): Promise<any> {
  return get({ url: `/sipPhone/${id}` });
}

export async function querySipPhoneUpdateById(payload: { sipPhoneId: string; values: ISipPhone }): Promise<any> {
  return patch({ url: `/sipPhone/${payload.sipPhoneId}`, data: payload.values });
}

export async function querySipPhoneDeleteById(sipPhoneId: string): Promise<any> {
  return del({ url: `/sipPhone/${sipPhoneId}` });
}

export async function querySipPhoneSearch(payload: ISipPhoneQueryParams): Promise<any> {
  return post({ url: '/sipPhone/search', data: payload });
}

export async function querySipPhoneGetAll(): Promise<any> {
  return get({ url: '/sipPhone' });
}

export async function querySipPhoneGetStats(): Promise<any> {
  return get({ url: `/sipPhone/stats` });
}
