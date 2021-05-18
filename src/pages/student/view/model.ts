import { Effect, Reducer } from 'umi';

import { queryStudentGetById } from '@/pages/student/queries';
import defaultReducers from '@/utils/defaultReducers';

export interface IState {}

export interface IModel {
  namespace: string;
  state: IState;
  effects: {
    studentGetById: Effect;
  };
  reducers: {
    save: Reducer<IState>;
  };
}

const Model: IModel = {
  namespace: 'StudentView',

  state: {},

  effects: {
    *studentGetById({ payload }, { call, put }) {
      yield put({ type: 'save', payload: {} });
      const data = yield call(queryStudentGetById, payload);
      yield put({ type: 'save', payload: { ...data.payload } });
    },
  },

  reducers: {
    ...defaultReducers,
  },
};

export default Model;
