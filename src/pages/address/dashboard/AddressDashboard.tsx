import React, { useEffect } from 'react';
import { connect, history } from 'umi';
import { get, omitBy } from 'lodash';
import AddressFilterForm from '@/pages/address/dashboard/search/AddressFilterForm';
import Pager from '@/pages/utils/pager/Pager';
import { IAddressQueryParams } from '@/pages/address/types';
import AddressSearchList from '@/pages/address/dashboard/search/AddressSearchList';
import AddressDashboardControls from '@/pages/address/dashboard/controls/AddressDashboardControls';
import { IState } from '@/pages/address/dashboard/model';
import AddressLanding from '@/pages/address/dashboard/AddressLanding';
import { ILoadingEffects } from '@/types';
import Loader from '@/pages/utils/Loader';

const initialSearchForm = {
  addressSearchParam1: '',
  addressSearchParam2: '',
};

const initialSearchQuery = {
  limit: 20,
  page: 1,
  ...initialSearchForm,
};

interface IProps {
  addressGetStats: () => void;
  addressSearch: (arg: IAddressQueryParams) => void;
  addressReset: () => void;
  AddressDashboard: IState;
  loadingEffects: ILoadingEffects;
  ClientDashboard: IState;
  clientGetStats: () => void;
}

const AddressDashboard = (props: IProps) => {
  const addressStats = get(props, 'AddressDashboard.addressStats', {});
  const addressList = get(props, 'AddressDashboard.addressList', []);
  const addressCount = get(props, 'AddressDashboard.addressStats.totalCount', 0);
  const clientCount = get(props, 'ClientDashboard.clientStats.totalCount', 0);
  const addressPager = get(props, 'AddressDashboard.addressPager', {});
  const queryParams = get(props, 'location.query', {});
  const isLoadingGet = get(props, 'loadingEffects.AddressDashboard/search', true);

  const getSearchQuery = (mixin = {}) => {
    const query = { ...initialSearchQuery, ...queryParams, ...mixin };
    return omitBy(query, (a) => !a); // удалить пустые ключи
  };

  useEffect(() => {
    props.addressGetStats();
    props.clientGetStats();
    return () => {
      props.addressReset();
    };
  }, []);

  // поиск в зависимости от изменения параметров
  useEffect(() => {
    search(getSearchQuery());
  }, [queryParams]);

  const search = (params: IAddressQueryParams) => {
    props.addressSearch(params);
  };

  const onFiltersChange = (values: null | IAddressQueryParams) => {
    // обнулять pager при каждом новом поиске
    const query = getSearchQuery({ ...values, page: 1 });
    history.push({ query });
  };

  const onPagerChange = (page: number) => {
    const query = getSearchQuery({ page });
    history.push({ query });
  };

  if (isLoadingGet) return <Loader />;
  if (!addressCount) return <AddressLanding clientCount={clientCount} />;

  return (
    <div>
      <div className="d-flex align-items-end justify-content-between mt-3 mb-2">
        <div>
          <div className="h4 mr-4">Address dashboard</div>
          <AddressFilterForm filters={getSearchQuery()} onChange={onFiltersChange} />
        </div>

        <div className="ml-auto-">
          <AddressDashboardControls />
        </div>
      </div>

      <AddressSearchList items={addressList} />
      <Pager pager={addressPager} onChange={onPagerChange} />
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  AddressDashboard: state.AddressDashboard,
  ClientDashboard: state.ClientDashboard,
  loadingEffects: state.loading.effects,
});

const mapDispatchToProps = (dispatch: any) => ({
  clientGetStats: () => dispatch({ type: 'ClientDashboard/getStats' }),
  addressSearch: (payload: IAddressQueryParams) => dispatch({ type: 'AddressDashboard/search', payload }),
  addressGetStats: () => dispatch({ type: 'AddressDashboard/getStats' }),
  addressReset: () => dispatch({ type: 'AddressDashboard/reset' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddressDashboard);
