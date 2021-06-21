import { get, patch, post, del } from '@/utils/httpMethods';

export async function queryClientMessageSend(payload: any): Promise<any> {
  return post({ url: '/telephony/message/send-sms', data: payload });
}

export async function queryClientMessageSearch(payload: any): Promise<any> {
  console.log('MESSAGES SEARCH PAYLOAD: ', payload);
  return post({ url: '/telephony/message/search', data: payload });
}
