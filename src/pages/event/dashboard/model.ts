import { Effect, Reducer } from 'umi';
import { get } from 'lodash';

import { queryEventDeleteById, queryEventGetStats, queryEventSearch } from '@/pages/event/queries';
import { IEvent, IEventStats } from '@/pages/event/types';
import { IPager } from '@/pages/utils/pager/types';
import defaultReducers from '@/utils/defaultReducers';

export interface IState {
  eventList?: IEvent[];
  eventStats?: IEventStats;
  eventPager?: IPager;
}

export interface IModel {
  namespace: string;
  state: IState;
  effects: {
    eventSearch: Effect;
    eventGetStats: Effect;
    eventDeleteById: Effect;
    reset: Effect;
  };
  reducers: {
    save: Reducer<IState>;
    set: Reducer<IState>;
  };
}

const Model: IModel = {
  namespace: 'EventDashboard',

  state: {},

  effects: {
    *eventSearch({ payload }, { call, put }) {
      yield put({ type: 'MobileMenu/close' });
      const data = yield call(queryEventSearch, payload);
      yield put({
        type: 'save',
        payload: {
          eventList: get(data, 'payload.items'),
          eventPager: get(data, 'payload.pager'),
        },
      });
    },

    *eventGetStats(_, { call, put }) {
      const data = yield call(queryEventGetStats);
      yield put({
        type: 'save',
        payload: { eventStats: data.payload },
      });
    },

    *eventDeleteById({ payload }, { call, put }) {
      yield call(queryEventDeleteById, payload.eventId);
      yield put({ type: 'eventSearch', payload: payload.queryParams });
    },

    *reset(_, { put }) {
      yield put({ type: 'set', payload: {} });
    },
  },

  reducers: {
    ...defaultReducers,
  },
};

export default Model;
