import { get, patch, post, del } from '@/utils/httpMethods';
import { Ievent, IeventQueryParams } from '@/pages/event/types';

export async function queryeventCreate(payload: any): Promise<any> {
  return post({ url: '/event', data: payload });
}

export async function queryeventGetById(id: string): Promise<any> {
  return get({ url: `/event/${id}` });
}

export async function queryeventUpdateById(payload: { eventId: string; values: Ievent }): Promise<any> {
  return patch({ url: `/event/${payload.eventId}`, data: payload.values });
}

export async function queryeventDeleteById(eventId: string): Promise<any> {
  return del({ url: `/event/${eventId}` });
}

export async function queryeventSearch(payload: IeventQueryParams): Promise<any> {
  return post({ url: '/event/search', data: payload });
}

export async function queryeventGetAll(): Promise<any> {
  return get({ url: '/event' });
}

export async function queryeventGetStats(): Promise<any> {
  return get({ url: `/event/stats` });
}
