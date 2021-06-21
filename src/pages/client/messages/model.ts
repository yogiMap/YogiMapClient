import { Effect, history, Reducer } from 'umi';
import defaultReducers from '@/utils/defaultReducers';
import { queryClientMessageSearch } from './queries';
import { get } from 'lodash';
export interface IState {}

export interface MessagePhoneModelType {
  namespace: string;
  state: IState;
  effects: {
    search: Effect;
  };
  reducers: {
    save: Reducer<IState>;
  };
}

const initialState = {};

const MessagePhoneModel: MessagePhoneModelType = {
  namespace: 'ClientMessage',
  state: initialState,
  effects: {
    *search({ payload }, { call, put }) {
      const data = yield call(queryClientMessageSearch, payload);
      yield put({
        type: 'save',
        payload: {
          messageList: get(data, 'payload.items'),
          messagePager: get(data, 'payload.pager'),
        },
      });
    },
  },

  reducers: {
    ...defaultReducers,
  },
};

export default MessagePhoneModel;
