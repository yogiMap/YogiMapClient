import { Effect, Reducer } from 'umi';
import { get } from 'lodash';
import defaultReducers from '@/utils/defaultReducers';
import { queryAddressSearch } from '@/pages/address/queries';
import {
  queryCompanyAccountGetCountryList,
  queryCompanyAccountGetCountryStatesList,
  queryCompanyAccountGetFocusList,
  queryCompanyAccountGetTimeZoneList,
} from '@/pages/companyAccount/queries';

export interface IState {}

export interface IModel {
  namespace: string;
  state: IState;
  effects: {
    countrySearch: Effect;
    addressSearch: Effect;
    stateSearch: Effect;
    timeZoneSearch: Effect;
    focusSearch: Effect;
    open: Effect;
  };
  reducers: {
    save: Reducer<IState>;
    set: Reducer<IState>;
  };
}

const Model: IModel = {
  namespace: 'SearchInput',

  state: {},

  effects: {
    *countrySearch(_, { call, put }) {
      const data = yield call(queryCompanyAccountGetCountryList);
      yield put({
        type: 'save',
        payload: {
          countryList: get(data, 'payload'),
        },
      });
    },

    *stateSearch({ payload }, { call, put }) {
      const data = yield call(queryCompanyAccountGetCountryStatesList, payload);
      yield put({
        type: 'save',
        payload: {
          stateList: get(data, 'payload'),
        },
      });
    },


    *addressSearch({ payload }, { call, put }) {
      const data = yield call(queryAddressSearch, payload);
      yield put({
        type: 'save',
        payload: {
          address: {
            list: get(data, 'payload.items'),
          },
        },
      });
    },

    *timeZoneSearch({ payload }, { call, put }) {
      const data = yield call(queryCompanyAccountGetTimeZoneList, payload);
      yield put({
        type: 'save',
        payload: {
          timeZoneList: get(data, 'payload'),
        },
      });
    },

    *focusSearch({ payload }, { call, put }) {
      const data = yield call(queryCompanyAccountGetFocusList, payload);
      yield put({
        type: 'save',
        payload: {
          focusList: get(data, 'payload'),
        },
      });
    },

    *open({ payload }, { put }) {
      yield put({ type: 'save', payload: { open: true, ...payload } });
    },
  },

  reducers: {
    ...defaultReducers,
  },
};

export default Model;
