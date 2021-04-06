import { Effect, Reducer } from 'umi';

import { queryClassesGetById } from '@/pages/classes/queries';
import defaultReducers from '@/utils/defaultReducers';

export interface IState {}

export interface IModel {
  namespace: string;
  state: IState;
  effects: {
    classesGetById: Effect;
  };
  reducers: {
    save: Reducer<IState>;
  };
}

const Model: IModel = {
  namespace: 'ClassesView',

  state: {},

  effects: {
    *classesGetById({ payload }, { call, put }) {
      yield put({ type: 'save', payload: {} });
      const data = yield call(queryClassesGetById, payload);
      yield put({ type: 'save', payload: { ...data.payload } });
    },

    // *classesDeleteById({ payload }, { call, put }) {
    //   console.log(payload);
    //   yield call(queryClassesDeleteById, payload.classesId);
    //   yield put({ type: 'classesSearch', payload: payload.queryParams });
    // },
  },

  reducers: {
    ...defaultReducers,
  },
};

export default Model;
