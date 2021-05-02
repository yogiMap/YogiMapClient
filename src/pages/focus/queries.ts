import { get, post } from '@/utils/httpMethods';
import { IFocus, IFocusQueryParams } from '@/pages/focus/types';

export async function queryFocusSearch(payload: IFocusQueryParams): Promise<any> {
  return post({ url: 'list/focus/search', data: payload });
}

export async function queryFocusGetById(id: string): Promise<any> {
  return get({ url: `list/focus/${id}` });
}

export async function queryFocusGetAll(): Promise<any> {
  return get({ url: 'list/focus' });
}
