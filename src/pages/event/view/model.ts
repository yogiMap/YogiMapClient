import { Effect, Reducer } from 'umi';

import { queryeventGetById } from '@/pages/event/queries';
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
  namespace: 'eventView',

  state: {},

  effects: {
    *eventGetById({ payload }, { call, put }) {
      yield put({ type: 'save', payload: {} });
      const data = yield call(queryeventGetById, payload);
      yield put({ type: 'save', payload: { ...data.payload } });
    },

    // *eventDeleteById({ payload }, { call, put }) {
    //   console.log(payload);
    //   yield call(queryeventDeleteById, payload.eventId);
    //   yield put({ type: 'eventSearch', payload: payload.queryParams });
    // },
  },

  reducers: {
    ...defaultReducers,
  },
};

export default Model;
