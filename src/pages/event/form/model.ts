import { Effect, history, Reducer } from 'umi';

import { queryeventCreate, queryeventGetById, queryeventUpdateById } from '@/pages/event/queries';
import defaultReducers from '@/utils/defaultReducers';

export interface IState {}

export interface eventModelType {
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

const eventModel: eventModelType = {
  namespace: 'eventForm',

  state: initialState,

  effects: {
    *create({ payload }, { call, put }) {
      yield call(queryeventCreate, payload);
      yield put({ type: 'eventDashboard/eventSearch' });
      yield put({ type: 'Sidepanel/close' });
      history.push('/event');
    },

    *getById({ payload }, { call, put }) {
      yield put({ type: 'save', payload: { eventInfo: {} } });
      const data = yield call(queryeventGetById, payload);
      yield put({ type: 'save', payload: { eventInfo: data.payload } });
    },

    *updateById({ payload }, { call, put }) {
      yield call(queryeventUpdateById, payload);
      yield put({ type: 'Sidepanel/close' });
      yield put({ type: 'eventDashboard/eventSearch', payload: payload.queryParams });
    },

    *reset(_, { put }) {
      yield put({ type: 'save', payload: initialState });
    },
  },

  reducers: {
    ...defaultReducers,
  },
};

export default eventModel;
