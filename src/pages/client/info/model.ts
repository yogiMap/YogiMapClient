import { Effect, Reducer } from 'umi';

import { queryClientGetInfoById, queryClientUpdateById } from '@/pages/client/queries';
import defaultReducers from '@/utils/defaultReducers';
import { IAddress } from '@/pages/address/types';

export interface IState {
  defaultAddress?: IAddress;
}

export interface IModel {
  namespace: string;
  state: IState;
  effects: {
    getInfoById: Effect;
    updateById: Effect;
    reset: Effect;
  };
  reducers: {
    save: Reducer<IState>;
    set: Reducer<IState>;
  };
}

const Model: IModel = {
  namespace: 'ClientInfo',

  state: {},

  effects: {
    *getInfoById({ payload }, { call, put }) {
      yield put({ type: 'save', payload: {} });
      const data = yield call(queryClientGetInfoById, payload);
      yield put({ type: 'save', payload: { ...data.payload } });
    },

    *updateById({ payload }, { call, put }) {
      const updateResult = yield call(queryClientUpdateById, payload);
      if (!(updateResult instanceof Error)) {
        yield put({ type: 'Sidepanel/close' });
        yield put({ type: 'ClientInfo/getInfoById', payload: payload.clientId });
        //yield put({ type: 'ClientDashboard/clientSearch', payload: payload.queryParams });
      }
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
