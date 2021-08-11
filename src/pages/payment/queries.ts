import { get, patch, post, del } from '@/utils/httpMethods';
import { IPayment, IPaymentQueryParams } from '@/pages/payment/types';

export async function queryPaymentCreate(payload: IPayment): Promise<any> {
  return post({ url: '/payment', data: payload });
}

export async function queryPaymentGetById(paymentId: string): Promise<any> {
  return get({ url: `/payment/${paymentId}` });
}

export async function queryPaymentGetByOrderId(orderId: string): Promise<any> {
  return get({ url: `/payment/order/${orderId}` });
}

export async function queryPaymentUpdateById(payload: { paymentId: string; values: IPayment }): Promise<any> {
  return patch({ url: `/payment/${payload.paymentId}`, data: payload.values });
}

export async function queryPaymentDeleteById(paymentId: string): Promise<any> {
  return del({ url: `/payment/${paymentId}` });
}

export async function queryPaymentSearch(payload: IPaymentQueryParams): Promise<any> {
  return post({ url: '/payment/search', data: payload });
}

export async function queryPaymentGetAll(): Promise<any> {
  return get({ url: '/payment' });
}

export async function queryPaymentGetStats(): Promise<any> {
  return get({ url: `/payment/stats` });
}
