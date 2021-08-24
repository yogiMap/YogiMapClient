import { get, patch, post, del } from '@/utils/httpMethods';
import { IVerifyEmailArg } from '@/pages/teacherAccount/onboarding/TeacherOnboarding';

export async function queryUsersSearch(payload: any): Promise<any> {
  return post({ url: '/user/search', data: payload });
}

export async function queryUsersGetStats(): Promise<any> {
  return get({ url: '/user/stats' });
}

export async function queryUsersGetRolesList(): Promise<any> {
  return get({ url: '/user/roles' });
}

export async function queryUserVerifyEmailSend(data: IVerifyEmailArg): Promise<any> {
  return post({ url: '/user/verify/email/send', data });
}

export async function queryUserUpdateRoleById(payload: any): Promise<any> {
  return patch({ url: `/user/${payload.userId}`, data: { roles: payload.roles } });
}

export async function queryUserDeleteById(userId: string): Promise<any> {
  return del({ url: `/user/${userId}` });
}

export async function queryUserUpdateSlackMemberId(payload: any): Promise<any> {
  return post({ url: `/user/${payload}/slack/member` });
}

export async function queryUserImpersonate(payload: any): Promise<any> {
  return post({ url: `/user/impersonate`, data: { userId: payload } });
}
