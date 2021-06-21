import { Effect, Reducer } from 'umi';

import { queryStudentAccountGetById } from '@/pages/studentAccount/queries';
import defaultReducers from '@/utils/defaultReducers';

export interface IState {}

export interface IModel {
  namespace: string;
  state: IState;
  effects: {
    studentAccountGetById: Effect;
  };
  reducers: {
    save: Reducer<IState>;
  };
}

const Model: IModel = {
  namespace: 'StudentAccountView',

  state: {},

  effects: {
    *studentAccountGetById({ payload }, { call, put }) {
      yield put({ type: 'save', payload: {} });
      const data = yield call(queryStudentAccountGetById, payload);
      yield put({ type: 'save', payload: { ...data.payload } });
    },
  },

  reducers: {
    ...defaultReducers,
  },
};

export default Model;
