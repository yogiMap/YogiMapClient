import { Effect, Reducer } from 'umi';

import { queryFocusGetAll } from '@/pages/focus/queries';
import defaultReducers from '@/utils/defaultReducers';
import { get } from 'lodash';

export interface IState {}

export interface IModel {
  namespace: string;
  state: IState;
  effects: {
    focusSearch: Effect;
    // getById: Effect;
  };
  reducers: {
    save: Reducer<IState>;
  };
}

const Model: IModel = {
  namespace: 'FocusView',

  state: {},

  effects: {
    *focusSearch({ payload }, { call, put }) {
      // yield put({ type: 'MobileMenu/close' });
      const data = yield call(queryFocusGetAll, payload);
      yield put({
        type: 'save',
        payload: {
          focusList: get(data, 'payload.items'),
          // focusPager: get(data, 'payload.pager'),
        },
      });
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
