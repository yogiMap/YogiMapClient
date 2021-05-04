import { Effect, Reducer } from 'umi';

import { queryTeacherAccountGetById } from '@/pages/teacherAccount/queries';
import defaultReducers from '@/utils/defaultReducers';

export interface IState {}

export interface IModel {
  namespace: string;
  state: IState;
  effects: {
    teacherAccountGetById: Effect;
  };
  reducers: {
    save: Reducer<IState>;
  };
}

const Model: IModel = {
  namespace: 'TeacherAccountView',

  state: {},

  effects: {
    *teacherAccountGetById({ payload }, { call, put }) {
      yield put({ type: 'save', payload: {} });
      const data = yield call(queryTeacherAccountGetById, payload);
      yield put({ type: 'save', payload: { ...data.payload } });
    },
  },

  reducers: {
    ...defaultReducers,
  },
};

export default Model;
