import { Effect, Reducer } from 'umi';

import { queryEventGetById } from '@/pages/event/queries';
import defaultReducers from '@/utils/defaultReducers';

export interface IState {}

export interface IModel {
  namespace: string;
  state: IState;
  effects: {
    eventGetById: Effect;
  };
  reducers: {
    save: Reducer<IState>;
  };
}

const Model: IModel = {
  namespace: 'EventView',

  state: {},

  effects: {
    *eventGetById({ payload }, { call, put }) {
      yield put({ type: 'save', payload: {} });
      const data = yield call(queryEventGetById, payload);
      yield put({ type: 'save', payload: { ...data.payload } });
    },

    // *eventDeleteById({ payload }, { call, put }) {
    //   console.log(payload);
    //   yield call(queryEventDeleteById, payload.eventId);
    //   yield put({ type: 'eventSearch', payload: payload.queryParams });
    // },
  },

  reducers: {
    ...defaultReducers,
  },
};

export default Model;
