import { get, patch, post, del } from '@/utils/httpMethods';
import { IClient, IClientQueryParams } from '@/pages/client/types';

export async function queryClientCreate(payload: any): Promise<any> {
  return post({ url: '/client', data: payload });
}

export async function queryClientGetInfoById(clientId: string): Promise<any> {
  return get({ url: `/client/info/${clientId}` });
}

export async function queryClientCreateAddresses(clientId: string): Promise<any> {
  return post({ url: `/client/address/${clientId}` });
}

export async function queryClientGetDefaultAddress(clientId: string): Promise<any> {
  return get({ url: `/address/default/${clientId}` });
}

export async function queryClientUpdateById(payload: { clientId: string; values: IClient }): Promise<any> {
  return patch({ url: `/client/${payload.clientId}`, data: payload.values });
}

export async function queryClientDeleteById(clientId: string): Promise<any> {
  return del({ url: `/client/${clientId}` });
}

export async function queryClientSearch(payload: IClientQueryParams): Promise<any> {
  return post({ url: '/client/search', data: payload });
}

export async function queryClientGetStats(): Promise<any> {
  return get({ url: `/client/stats` });
}

export async function generateTwilioAccessToken(_: any): Promise<any> {
  return get({ url: `/telephony/calls/generateAccessToken` });
}
