import { Effect, Reducer } from 'umi';
import { get } from 'lodash';

// import { queryOrderDeleteById, queryOrderGetStats, queryOrderSearch } from '@/pages/schedule/queries';
import { IOrder, IOrderStats } from '@/pages/schedule/types';
import { IPager } from '@/pages/utils/pager/types';
import defaultReducers from '@/utils/defaultReducers';
import {
  queryClassesDeleteById,
  queryClassesGetStats,
  queryClassesSearch,
  queryClassesUpdateById,
} from '@/pages/classes/queries';
// import { queryOrderUpdateById } from '@/pages/order/queries';

export interface IState {
  orderList?: IOrder[];
  orderStats?: IOrderStats;
  orderPager?: IPager;
}

export interface IModel {
  namespace: string;
  state: IState;
  effects: {
    search: Effect;
    getStats: Effect;
    deleteById: Effect;
    reset: Effect;
    updateById: Effect;
  };
  reducers: {
    save: Reducer<IState>;
    set: Reducer<IState>;
  };
}

const Model: IModel = {
  namespace: 'ScheduleDashboard',

  state: {},

  effects: {
    *search({ payload }, { call, put }) {
      const data = yield call(queryClassesSearch, payload);
      yield put({
        type: 'save',
        payload: {
          orderList: get(data, 'payload.items'),
          calendar: get(data, 'payload.calendar'), // - might be useless as we dont have pagination in schedule
        },
      });
    },

    *updateById({ payload }, { call, put }) {
      yield call(queryClassesUpdateById, payload);
      yield put({ type: 'Sidepanel/close' });
      yield put({ type: 'search', payload: payload.queryParams });
    },

    *getStats(_, { call, put }) {
      const data = yield call(queryClassesGetStats);
      yield put({
        type: 'save',
        payload: { orderStats: data.payload },
      });
    },

    *deleteById({ payload }, { call, put }) {
      yield call(queryClassesDeleteById, payload.orderId);
      yield put({ type: 'orderSearch', payload: payload.queryParams });
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
