import { Effect, Reducer } from 'umi';

import { queryclassGetById } from '@/pages/class/queries';
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
  namespace: 'classView',

  state: {},

  effects: {
    *classGetById({ payload }, { call, put }) {
      yield put({ type: 'save', payload: {} });
      const data = yield call(queryclassGetById, payload);
      yield put({ type: 'save', payload: { ...data.payload } });
    },

    // *classDeleteById({ payload }, { call, put }) {
    //   console.log(payload);
    //   yield call(queryclassDeleteById, payload.classId);
    //   yield put({ type: 'classSearch', payload: payload.queryParams });
    // },
  },

  reducers: {
    ...defaultReducers,
  },
};

export default Model;
