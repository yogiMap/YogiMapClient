import React, { useEffect } from 'react';
import { connect, history } from 'umi';
import { get, omitBy } from 'lodash';
import VendorTypeStats from '@/pages/vendorType/dashboard/stats/VendorTypeStats';
import VendorTypeFilterForm from '@/pages/vendorType/dashboard/search/VendorTypeFilterForm';
import Pager from '@/pages/utils/pager/Pager';
import { IVendorTypeQueryParams } from '@/pages/vendorType/types';
import VendorTypeSearchList from '@/pages/vendorType/dashboard/search/VendorTypeSearchList';
import VendorTypeDashboardControls from '@/pages/vendorType/dashboard/controls/VendorTypeDashboardControls';
import { IState } from '@/pages/vendorType/dashboard/model';

const initialSearchForm = {
  vendorTypeSearchParam1: '',
  vendorTypeSearchParam2: '',
};

const initialSearchQuery = {
  limit: 20,
  page: 1,
  ...initialSearchForm,
};

interface IProps {
  vendorTypeGetStats: () => void;
  vendorTypeSearch: (arg: IVendorTypeQueryParams) => void;
  vendorTypeReset: () => void;
  VendorTypeDashboard: IState;
}

const VendorTypeDashboard = (props: IProps) => {
  const vendorTypeStats = get(props, 'VendorTypeDashboard.vendorTypeStats', {});
  const vendorTypeList = get(props, 'VendorTypeDashboard.vendorTypeList', []);
  const vendorTypePager = get(props, 'VendorTypeDashboard.vendorTypePager', {});
  const queryParams = get(props, 'location.query', {});

  const getSearchQuery = (mixin = {}) => {
    const query = { ...initialSearchQuery, ...queryParams, ...mixin };
    return omitBy(query, (a) => !a); // удалить пустые ключи
  };

  useEffect(() => {
    props.vendorTypeGetStats();

    return () => {
      props.vendorTypeReset();
    };
  }, []);

  // поиск в зависимости от изменения параметров
  useEffect(() => {
    props.vendorTypeSearch(getSearchQuery());
  }, [queryParams]);

  const onFiltersChange = (values: null | IVendorTypeQueryParams) => {
    // обнулять pager при каждом новом поиске
    const query = getSearchQuery({ ...values, page: 1 });
    history.push({ query });
  };

  const onPagerChange = (page: number) => {
    const query = getSearchQuery({ page });
    history.push({ query });
  };

  return (
    <>
      <div className="d-flex align-items-end justify-content-between mt-3 mb-2">
        <div>
          <div className="h4 mr-4">VendorType dashboard</div>
          <VendorTypeFilterForm filters={getSearchQuery()} onChange={onFiltersChange} />
        </div>

        <VendorTypeStats stats={vendorTypeStats} />

        <div>
          <VendorTypeDashboardControls />
        </div>
      </div>

      <VendorTypeSearchList items={vendorTypeList} />
      <Pager pager={vendorTypePager} onChange={onPagerChange} />
    </>
  );
};

const mapStateToProps = (state: any) => ({
  VendorTypeDashboard: state.VendorTypeDashboard,
});

const mapDispatchToProps = (dispatch: any) => ({
  vendorTypeSearch: (payload: IVendorTypeQueryParams) => dispatch({ type: 'VendorTypeDashboard/vendorTypeSearch', payload }),
  vendorTypeGetStats: () => dispatch({ type: 'VendorTypeDashboard/vendorTypeGetStats' }),
  vendorTypeReset: () => dispatch({ type: 'VendorTypeDashboard/reset' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(VendorTypeDashboard);
