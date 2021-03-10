import { get, patch, post, del } from '@/utils/httpMethods';
import { IVendorType, IVendorTypeQueryParams } from '@/pages/vendorType/types';

export async function queryVendorTypeCreate(payload: any): Promise<any> {
  return post({ url: '/vendorType', data: payload });
}

export async function queryVendorTypeGetById(id: string): Promise<any> {
  return get({ url: `/vendorType/${id}` });
}

export async function queryVendorTypeUpdateById(payload: { vendorTypeId: string; values: IVendorType }): Promise<any> {
  return patch({ url: `/vendorType/${payload.vendorTypeId}`, data: payload.values });
}

export async function queryVendorTypeDeleteById(vendorTypeId: string): Promise<any> {
  return del({ url: `/vendorType/${vendorTypeId}` });
}

export async function queryVendorTypeSearch(payload: IVendorTypeQueryParams): Promise<any> {
  return post({ url: '/vendorType/search', data: payload });
}

export async function queryVendorTypeGetAll(): Promise<any> {
  return get({ url: '/vendorType' });
}

export async function queryVendorTypeGetStats(): Promise<any> {
  return get({ url: `/vendorType/stats` });
}
