import { Effect, Reducer } from 'umi';
import { get } from 'lodash';

import { queryFocusGetAll, queryFocusSearch } from '@/pages/focus/queries';
import { IFocus, IFocusStats } from '@/pages/focus/types';
import { IPager } from '@/pages/utils/pager/types';
import defaultReducers from '@/utils/defaultReducers';

export interface IState {
  focusList?: IFocus[];
  focusStats?: IFocusStats;
  focusPager?: IPager;
}

export interface IModel {
  namespace: string;
  state: IState;
  effects: {
    // focusSearch: Effect;
    getAll: Effect;
    focusSearch: Effect;
    reset: Effect;
  };
  reducers: {
    save: Reducer<IState>;
    set: Reducer<IState>;
  };
}

const Model: IModel = {
  namespace: 'FocusDashboard',

  state: {},

  effects: {
    *focusSearch({ payload }, { call, put }) {
      yield put({ type: 'MobileMenu/close' });
      const data = yield call(queryFocusSearch, payload);
      yield put({
        type: 'save',
        payload: {
          focusList: get(data, 'payload.items'),
          // focusPager: get(data, 'payload.pager'),
        },
      });
    },

    *getAll(_, { call, put }) {
      const data = yield call(queryFocusGetAll);
      yield put({ type: 'save', payload: { focus: data.payload } });
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
