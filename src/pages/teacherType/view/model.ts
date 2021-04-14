import { Effect, Reducer } from 'umi';

import { queryTeacherTypeGetById } from '@/pages/teacherType/queries';
import defaultReducers from '@/utils/defaultReducers';

export interface IState {}

export interface IModel {
  namespace: string;
  state: IState;
  effects: {
    teacherTypeGetById: Effect;
  };
  reducers: {
    save: Reducer<IState>;
  };
}

const Model: IModel = {
  namespace: 'TeacherTypeView',

  state: {},

  effects: {
    *teacherTypeGetById({ payload }, { call, put }) {
      yield put({ type: 'save', payload: {} });
      const data = yield call(queryTeacherTypeGetById, payload);
      yield put({ type: 'save', payload: { ...data.payload } });
    },

    // *teacherTypeDeleteById({ payload }, { call, put }) {
    //   console.log(payload);
    //   yield call(queryTeacherTypeDeleteById, payload.teacherTypeId);
    //   yield put({ type: 'teacherTypeSearch', payload: payload.queryParams });
    // },
  },

  reducers: {
    ...defaultReducers,
  },
};

export default Model;
