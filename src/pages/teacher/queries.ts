import { get, patch, post, del } from '@/utils/httpMethods';
import { ITeacher, ITeacherQueryParams } from '@/pages/teacher/types';

export async function queryTeacherCreate(payload: any): Promise<any> {
  return post({ url: '/teacher', data: payload });
}

export async function queryTeacherGetById(id: string): Promise<any> {
  return get({ url: `/teacher/${id}` });
}

export async function queryTeacherUpdateById(payload: { teacherId: string; values: ITeacher }): Promise<any> {
  return patch({ url: `/teacher/${payload.teacherId}`, data: payload.values });
}

export async function queryTeacherDeleteById(teacherId: string): Promise<any> {
  return del({ url: `/teacher/${teacherId}` });
}

export async function queryTeacherSearch(payload: ITeacherQueryParams): Promise<any> {
  return post({ url: '/teacher/search', data: payload });
}

export async function queryTeacherGetAll(): Promise<any> {
  return get({ url: '/teacher' });
}

export async function queryTeacherGetStats(): Promise<any> {
  return get({ url: `/teacher/stats` });
}
