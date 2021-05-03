import { Effect, history, Reducer } from 'umi';

import { queryEventCreate, queryEventGetById, queryEventUpdateById } from '@/pages/event/queries';
import defaultReducers from '@/utils/defaultReducers';
import { queryStyleSearch } from '@/pages/style/queries';
import { get } from 'lodash';
import { queryTeacherSearch } from '@/pages/teacher/queries';
import { queryClassTypeSearch } from '@/pages/classType/queries';

export interface IState {}

export interface EventModelType {
  namespace: string;
  state: IState;
  effects: {
    create: Effect;
    getById: Effect;
    updateById: Effect;
    styleSearch: Effect;
    teacherSearch: Effect;
    classTypeSearch: Effect;
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

    *styleSearch(_, { call, put }) {
      const data = yield call(queryStyleSearch);
      yield put({
        type: 'save',
        payload: {
          styleList: get(data, 'payload.items'),
        },
      });
    },

    *teacherSearch(_, { call, put }) {
      const data = yield call(queryTeacherSearch);
      yield put({
        type: 'save',
        payload: {
          teacherList: get(data, 'payload.items'),
        },
      });
    },

    *classTypeSearch(_, { call, put }) {
      const data = yield call(queryClassTypeSearch);
      yield put({
        type: 'save',
        payload: {
          classTypeList: get(data, 'payload.items'),
        },
      });
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
