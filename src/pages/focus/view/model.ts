import { Effect, Reducer } from 'umi';

import { queryFocusGetById } from '@/pages/focus/queries';
import defaultReducers from '@/utils/defaultReducers';

export interface IState {}

export interface IModel {
  namespace: string;
  state: IState;
  effects: {
    focusGetById: Effect;
  };
  reducers: {
    save: Reducer<IState>;
  };
}

const Model: IModel = {
  namespace: 'FocusView',

  state: {},

  effects: {
    *focusGetById({ payload }, { call, put }) {
      yield put({ type: 'save', payload: {} });
      const data = yield call(queryFocusGetById, payload);
      yield put({ type: 'save', payload: { ...data.payload } });
    },

    // *focusDeleteById({ payload }, { call, put }) {
    //   console.log(payload);
    //   yield call(queryFocusDeleteById, payload.focusId);
    //   yield put({ type: 'focusSearch', payload: payload.queryParams });
    // },
  },

  reducers: {
    ...defaultReducers,
  },
};

export default Model;
