import { Effect, Reducer } from 'umi';

import { queryClassGetById } from '@/pages/class/queries';
import defaultReducers from '@/utils/defaultReducers';

export interface IState {}

export interface IModel {
  namespace: string;
  state: IState;
  effects: {
    classGetById: Effect;
  };
  reducers: {
    save: Reducer<IState>;
  };
}

const Model: IModel = {
  namespace: 'ClassView',

  state: {},

  effects: {
    *classGetById({ payload }, { call, put }) {
      yield put({ type: 'save', payload: {} });
      const data = yield call(queryClassGetById, payload);
      yield put({ type: 'save', payload: { ...data.payload } });
    },

    // *classDeleteById({ payload }, { call, put }) {
    //   console.log(payload);
    //   yield call(queryClassDeleteById, payload.classId);
    //   yield put({ type: 'classSearch', payload: payload.queryParams });
    // },
  },

  reducers: {
    ...defaultReducers,
  },
};

export default Model;
