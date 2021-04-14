import { Effect, Reducer } from 'umi';

import { queryTeacherGetById } from '@/pages/teacher/queries';
import defaultReducers from '@/utils/defaultReducers';

export interface IState {}

export interface IModel {
  namespace: string;
  state: IState;
  effects: {
    teacherGetById: Effect;
  };
  reducers: {
    save: Reducer<IState>;
  };
}

const Model: IModel = {
  namespace: 'TeacherView',

  state: {},

  effects: {
    *teacherGetById({ payload }, { call, put }) {
      yield put({ type: 'save', payload: {} });
      const data = yield call(queryTeacherGetById, payload);
      yield put({ type: 'save', payload: { ...data.payload } });
    },

    // *teacherDeleteById({ payload }, { call, put }) {
    //   console.log(payload);
    //   yield call(queryTeacherDeleteById, payload.teacherId);
    //   yield put({ type: 'teacherSearch', payload: payload.queryParams });
    // },
  },

  reducers: {
    ...defaultReducers,
  },
};

export default Model;
