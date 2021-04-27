import { Effect, history, Reducer } from 'umi';

import { queryStyleCreate, queryStyleGetById, queryStyleUpdateById } from '@/pages/style/queries';
import defaultReducers from '@/utils/defaultReducers';

export interface IState {}

export interface StyleModelType {
  namespace: string;
  state: IState;
  effects: {
    create: Effect;
    getById: Effect;
    updateById: Effect;
    reset: Effect;
  };
  reducers: {
    save: Reducer<IState>;
  };
}

const initialState = {};

const StyleModel: StyleModelType = {
  namespace: 'StyleForm',

  state: initialState,

  effects: {
    *create({ payload }, { call, put }) {
      yield call(queryStyleCreate, payload);
      yield put({ type: 'StyleDashboard/styleSearch' });
      yield put({ type: 'Sidepanel/close' });
      history.push('/style');
    },

    *getById({ payload }, { call, put }) {
      yield put({ type: 'save', payload: { styleInfo: {} } });
      const data = yield call(queryStyleGetById, payload);
      yield put({ type: 'save', payload: { styleInfo: data.payload } });
    },

    *updateById({ payload }, { call, put }) {
      yield call(queryStyleUpdateById, payload);
      yield put({ type: 'Sidepanel/close' });
      yield put({ type: 'StyleDashboard/styleSearch', payload: payload.queryParams });
    },

    *reset(_, { put }) {
      yield put({ type: 'save', payload: initialState });
    },
  },

  reducers: {
    ...defaultReducers,
  },
};

export default StyleModel;
