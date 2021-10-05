import { get, post, patch, put } from '@/utils/httpMethods';
import { IUser } from '@/pages/user/userSearch/types';
import { IResetPasswordArg, IValidResetPasswordLink } from '@/pages/user/types';
import { IVerifyEmail } from '@/pages/user/account/UserEmailVerify';
import { ISupportEmail } from '@/pages/infoPages/supportPage/types';
import { IRegisterForm } from '@/pages/user/account/UserRegister';

export async function queryUserAuth(): Promise<any> {
  return get({ url: '/user/auth' });
}

export async function queryUserLogin(payload: any): Promise<any> {
  return post({ url: '/user/login', data: payload });
}

export async function queryUserLogout(): Promise<any> {
  return get({ url: '/user/logout' });
}

export async function queryUserRegister(payload: IRegisterForm): Promise<any> {
  return post({ url: '/user', data: payload });
}

export async function queryUserPasswordReset(payload: any): Promise<any> {
  return post({ url: '/user/password/reset/request', data: payload });
}

export async function queryUserEmailVerify(payload: IVerifyEmail): Promise<any> {
  return get({ url: `/user/verify/email/${payload.userId}/${payload.hash}` });
}

export async function queryIsValidResetPasswordLink(payload: IValidResetPasswordLink): Promise<any> {
  return post({ url: '/user/password/reset/valid', data: payload });
}

export async function queryUserPasswordResetNew(payload: IResetPasswordArg): Promise<any> {
  return post({ url: `/user/password/reset/new`, data: payload });
}

export async function queryUserSendSupportEmail(payload: ISupportEmail): Promise<any> {
  return post({ url: `/user/support/email`, data: payload });
}

export async function queryUserGetById(userId: string): Promise<any> {
  return get({ url: `/user/${userId}` });
}

export async function queryUserUpdateSelf(payload: IUser): Promise<any> {
  return patch({ url: `/user/`, data: payload });
}

export async function queryUserUpdateById(payload: { userId: string; values: IUser }): Promise<any> {
  return patch({ url: `/user/`, data: payload.values });
}

export async function queryUserPasswordUpdate(payload: any): Promise<any> {
  return post({ url: `/user/password/update/`, data: payload });
}

export async function queryUserUploadAvatar(payload: { userId: string; data: object }): Promise<any> {
  return put({
    url: `/user/${payload.userId}/avatar`,
    data: payload.data,
    type: 'multipart/form-data; boundary=<calculated when request is sent>',
  });
}
