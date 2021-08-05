import { Effect, Reducer } from 'umi';

import { queryTeacherAccountSipPhone } from '@/pages/teacherAccount/queries';
import defaultReducers from '@/utils/defaultReducers';
import { querySipPhoneCreate, querySipPhoneGetById, querySipPhoneUpdateById } from '@/pages/telephony/queries';

export interface IState {}

export interface IModel {
  namespace: string;
  state: IState;
  effects: {
    teacherAccountGetSipPhone: Effect;
    create: Effect;
    getById: Effect;
    updateById: Effect;
    reset: Effect;
  };
  reducers: {
    save: Reducer<IState>;
  };
}

const Model: IModel = {
  namespace: 'Telephony',

  state: {},

  effects: {
    *teacherAccountGetSipPhone({ payload }, { call, put }) {
      yield put({ type: 'save', payload: {} });
      const data = yield call(queryTeacherAccountSipPhone, payload);
      yield put({ type: 'save', payload: { teacherSipPhone: data.payload } });
    },

    *create({ payload }, { call, put }) {
      yield call(querySipPhoneCreate, payload);
      yield put({ type: 'Sidepanel/close' });
      yield put({ type: 'companyAccountGetSipPhone', payload: payload.companyAccount });
    },

    *getById({ payload }, { call, put }) {
      yield put({ type: 'save', payload: { sipPhoneInfo: {} } });
      const data = yield call(querySipPhoneGetById, payload);
      yield put({ type: 'save', payload: { sipPhoneInfo: data.payload } });
    },

    *updateById({ payload }, { call, put }) {
      yield call(querySipPhoneUpdateById, payload);
      yield put({ type: 'Sidepanel/close' });
      yield put({ type: 'companyAccountGetSipPhone', payload: payload.companyAccountId });
    },

    *reset(_, { put }) {
      yield put({ type: 'save', payload: {} });
    },
  },

  reducers: {
    ...defaultReducers,
  },
};

export default Model;
