import { Effect, Reducer } from 'umi';

import { queryStyleGetById } from '@/pages/style/queries';
import defaultReducers from '@/utils/defaultReducers';

export interface IState {}

export interface IModel {
  namespace: string;
  state: IState;
  effects: {
    styleGetById: Effect;
  };
  reducers: {
    save: Reducer<IState>;
  };
}

const Model: IModel = {
  namespace: 'StyleView',

  state: {},

  effects: {
    *styleGetById({ payload }, { call, put }) {
      yield put({ type: 'save', payload: {} });
      const data = yield call(queryStyleGetById, payload);
      yield put({ type: 'save', payload: { ...data.payload } });
    },

    // *styleDeleteById({ payload }, { call, put }) {
    //   console.log(payload);
    //   yield call(queryStyleDeleteById, payload.styleId);
    //   yield put({ type: 'styleSearch', payload: payload.queryParams });
    // },
  },

  reducers: {
    ...defaultReducers,
  },
};

export default Model;
