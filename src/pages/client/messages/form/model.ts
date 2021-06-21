import { Effect, history, Reducer } from 'umi';
import defaultReducers from '@/utils/defaultReducers';
import { queryClientMessageSend } from '../queries';
import { get } from 'lodash';
export interface IState {}

export interface MessagePhoneFormModelType {
  namespace: string;
  state: IState;
  effects: {
    send: Effect;
  };
  reducers: {
    save: Reducer<IState>;
  };
}

const initialState = {};

const MessagePhoneFormModel: MessagePhoneFormModelType = {
  namespace: 'ClientMessageForm',
  state: initialState,
  effects: {
    *send({ payload }, { call, put }) {
      yield call(queryClientMessageSend, payload);
      yield put({ type: 'ClientMessage/search', payload: { clientId: payload.client } });
      yield put({ type: 'ClientInfo/getInfoById', payload: payload.client });
    },
  },

  reducers: {
    ...defaultReducers,
  },
};

export default MessagePhoneFormModel;
