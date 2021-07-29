import { Effect, history, Reducer } from 'umi';

import { querySipPhoneCreate, querySipPhoneGetById, querySipPhoneUpdateById } from '@/pages/sipPhone/queries';
import defaultReducers from '@/utils/defaultReducers';
import { queryTeacherAccountSipPhone } from '@/pages/teacherAccount/queries';

export interface IState {}

export interface SipPhoneModelType {
  namespace: string;
  state: IState;
  effects: {
    create: Effect;
    getById: Effect;
    updateById: Effect;
    reset: Effect;
  };
  reducers: {
    save: Reducer<IState>;
  };
}

const initialState = {};

const SipPhoneModel: SipPhoneModelType = {
  namespace: 'SipPhoneForm',

  state: initialState,

  effects: {
    *create({ payload }, { call, put }) {
      yield call(querySipPhoneCreate, payload);
      //yield put({ type: 'SipPhoneDashboard/sipPhoneSearch' });
      yield put({ type: 'Sidepanel/close' });
    },

    *getById({ payload }, { call, put }) {
      yield put({ type: 'save', payload: { sipPhoneInfo: {} } });
      const data = yield call(querySipPhoneGetById, payload);
      yield put({ type: 'save', payload: { sipPhoneInfo: data.payload } });
    },

    *updateById({ payload }, { call, put }) {
      yield call(querySipPhoneUpdateById, payload);
      yield put({ type: 'Sidepanel/close' });
      yield put({ type: 'TeacherAccountSipPhone/teacherAccountGetSipPhone', payload: payload.teacherAccountId });
    },

    *reset(_, { put }) {
      yield put({ type: 'save', payload: initialState });
    },
  },

  reducers: {
    ...defaultReducers,
  },
};

export default SipPhoneModel;
