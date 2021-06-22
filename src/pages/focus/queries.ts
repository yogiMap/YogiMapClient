import { get, post } from '@/utils/httpMethods';
import { IFocus, IFocusQueryParams } from '@/pages/focus/types';

export async function queryFocusGetAll(payload: string): Promise<any> {
  return get({ url: 'list/focus' });
}
//
// export async function queryFocusSearch(payload: IFocusQueryParams): Promise<any> {
//   return post({ url: 'list/focus', data: payload });
// }

// export async function queryFocusGetById(id: string): Promise<any> {
//   return get({ url: `list/focus/${id}` });
// }
