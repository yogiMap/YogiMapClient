import { Effect, history, Reducer } from 'umi';

import { queryEventCreate, queryEventGetById, queryEventUpdateById } from '@/pages/event/queries';
import defaultReducers from '@/utils/defaultReducers';

export interface IState {}

export interface EventModelType {
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

const EventModel: EventModelType = {
  namespace: 'EventForm',

  state: initialState,

  effects: {
    *create({ payload }, { call, put }) {
      yield call(queryEventCreate, payload);
      yield put({ type: 'EventDashboard/eventSearch' });
      yield put({ type: 'Sidepanel/close' });
      history.push('/event');
    },

    *getById({ payload }, { call, put }) {
      yield put({ type: 'save', payload: { eventInfo: {} } });
      const data = yield call(queryEventGetById, payload);
      yield put({ type: 'save', payload: { eventInfo: data.payload } });
    },

    *updateById({ payload }, { call, put }) {
      yield call(queryEventUpdateById, payload);
      yield put({ type: 'Sidepanel/close' });
      yield put({ type: 'EventDashboard/eventSearch', payload: payload.queryParams });
    },

    *reset(_, { put }) {
      yield put({ type: 'save', payload: initialState });
    },
  },

  reducers: {
    ...defaultReducers,
  },
};

export default EventModel;
