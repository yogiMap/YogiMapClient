import { Effect, Reducer } from 'umi';

import { queryTeacherAccountGetById, queryUploadTeacherLogo } from '@/pages/teacherAccount/queries';
import defaultReducers from '@/utils/defaultReducers';

export interface IState {}

export interface IModel {
  namespace: string;
  state: IState;
  effects: {
    teacherAccountGetById: Effect;
    teacherAccountUploadLogo: Effect;
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

    *teacherAccountUploadLogo({ payload }, { call, put }) {
      yield call(queryUploadTeacherLogo, payload);
      yield put({ type: 'teacherAccountGetById', payload: payload.teacherAccountId });
    },
  },

  reducers: {
    ...defaultReducers,
  },
};

export default Model;
