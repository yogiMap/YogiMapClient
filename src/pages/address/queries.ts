import { get, patch, post, del } from '@/utils/httpMethods';
import { IAddress, IAddressQueryParams } from '@/pages/address/types';

export async function queryAddressCreate(payload: IAddress): Promise<any> {
  return post({ url: '/address', data: payload });
}

export async function queryAddressGetById(id: string): Promise<any> {
  return get({ url: `/address/${id}` });
}

export async function queryAddressUpdateById(payload: { addressId: string; values: IAddress }): Promise<any> {
  return patch({ url: `/address/${payload.addressId}`, data: payload.values });
}

export async function queryAddressSetDefaultById(payload: { addressId: string; clientId: string }): Promise<any> {
  return patch({ url: `/address/${payload.addressId}/${payload.clientId}` });
}

export async function queryAddressDeleteById(addressId: string): Promise<any> {
  return del({ url: `/address/${addressId}` });
}

export async function queryAddressSearch(payload: IAddressQueryParams): Promise<any> {
  return post({ url: '/address/search', data: payload });
}

export async function queryAddressGetAll(): Promise<any> {
  return get({ url: '/address' });
}

export async function queryAddressGetStats(): Promise<any> {
  return get({ url: `/address/stats` });
}
