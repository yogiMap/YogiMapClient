import { get } from '@/utils/httpMethods';
import { IFocus, IFocusQueryParams } from '@/pages/focus/types';


export async function queryFocusGetById(id: string): Promise<any> {
  return get({ url: `list/focus/${id}` });
}

export async function queryFocusGetAll(): Promise<any> {
  return get({ url: 'list/focus' });
}

export class queryFocusSearch {
}
