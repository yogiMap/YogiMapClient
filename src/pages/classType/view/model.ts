import { Effect, Reducer } from 'umi';

import { queryClassTypeGetById } from '@/pages/classType/queries';
import defaultReducers from '@/utils/defaultReducers';

export interface IState {}

export interface IModel {
  namespace: string;
  state: IState;
  effects: {
    classTypeGetById: Effect;
  };
  reducers: {
    save: Reducer<IState>;
  };
}

const Model: IModel = {
  namespace: 'ClassTypeView',

  state: {},

  effects: {
    *classTypeGetById({ payload }, { call, put }) {
      yield put({ type: 'save', payload: {} });
      const data = yield call(queryClassTypeGetById, payload);
      yield put({ type: 'save', payload: { ...data.payload } });
    },

    // *classTypeDeleteById({ payload }, { call, put }) {
    //   console.log(payload);
    //   yield call(queryClassTypeDeleteById, payload.classTypeId);
    //   yield put({ type: 'classTypeSearch', payload: payload.queryParams });
    // },
  },

  reducers: {
    ...defaultReducers,
  },
};

export default Model;
