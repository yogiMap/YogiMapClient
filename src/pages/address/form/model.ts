import { Effect, history, Reducer } from 'umi';

import { queryAddressCreate, queryAddressGetById, queryAddressUpdateById } from '@/pages/address/queries';
import defaultReducers from '@/utils/defaultReducers';

export interface IState {}

export interface AddressModelType {
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

const AddressModel: AddressModelType = {
  namespace: 'AddressForm',

  state: initialState,

  effects: {
    *create({ payload }, { call, put }) {
      const createResult = yield call(queryAddressCreate, payload);
      if (!(createResult instanceof Error)) {
        yield put({ type: 'AddressDashboard/search' });
        yield put({ type: 'AddressDashboard/getStats' });
        yield put({ type: 'Sidepanel/close' });
        history.push('/address');
      }
    },

    *getById({ payload }, { call, put }) {
      yield put({ type: 'save', payload: { addressInfo: {} } });
      const data = yield call(queryAddressGetById, payload);
      yield put({ type: 'save', payload: { addressInfo: data.payload } });
    },

    *updateById({ payload }, { call, put }) {
      const updateResult = yield call(queryAddressUpdateById, payload);
      if (!(updateResult instanceof Error)) {
        yield put({ type: 'Sidepanel/close' });
        yield put({ type: 'AddressDashboard/search', payload: payload.queryParams });
      }
    },

    *reset(_, { put }) {
      yield put({ type: 'save', payload: initialState });
    },
  },

  reducers: {
    ...defaultReducers,
  },
};

export default AddressModel;
