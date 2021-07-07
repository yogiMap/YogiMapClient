import { Effect, Reducer } from 'umi';

import { queryTeacherAccountSipPhone } from '@/pages/teacherAccount/queries';
import defaultReducers from '@/utils/defaultReducers';

export interface IState {}

export interface IModel {
  namespace: string;
  state: IState;
  effects: {
    teacherAccountGetSipPhone: Effect;
  };
  reducers: {
    save: Reducer<IState>;
  };
}

const Model: IModel = {
  namespace: 'TeacherAccountSipPhone',

  state: {},

  effects: {
    *teacherAccountGetSipPhone({ payload }, { call, put }) {
      yield put({ type: 'save', payload: {} });
      const data = yield call(queryTeacherAccountSipPhone, payload);
      console.log(payload);
      yield put({ type: 'save', payload: { teacherSipPhone: data.payload } });
    },
  },

  reducers: {
    ...defaultReducers,
  },
};

export default Model;
