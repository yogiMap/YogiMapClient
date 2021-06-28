import React, { useEffect } from 'react';
import { connect, history } from 'umi';
import { get, omitBy } from 'lodash';
import SidPhoneStats from '@/pages/sidPhone/dashboard/stats/SidPhoneStats';
import SidPhoneFilterForm from '@/pages/sidPhone/dashboard/search/SidPhoneFilterForm';
import Pager from '@/pages/utils/pager/Pager';
import { ISidPhoneQueryParams } from '@/pages/sidPhone/types';
import SidPhoneSearchList from '@/pages/sidPhone/dashboard/search/SidPhoneSearchList';
import SidPhoneDashboardControls from '@/pages/sidPhone/dashboard/controls/SidPhoneDashboardControls';
import { IState } from '@/pages/sidPhone/dashboard/model';

const initialSearchForm = {
  sidPhoneSearchParam1: '',
  sidPhoneSearchParam2: '',
};

const initialSearchQuery = {
  limit: 20,
  page: 1,
  ...initialSearchForm,
};

interface IProps {
  sidPhoneGetStats: () => void;
  sidPhoneSearch: (arg: ISidPhoneQueryParams) => void;
  sidPhoneReset: () => void;
  SidPhoneDashboard: IState;
}

const SidPhoneDashboard = (props: IProps) => {
  const sidPhoneStats = get(props, 'SidPhoneDashboard.sidPhoneStats', {});
  const sidPhoneList = get(props, 'SidPhoneDashboard.sidPhoneList', []);
  const sidPhonePager = get(props, 'SidPhoneDashboard.sidPhonePager', {});
  const queryParams = get(props, 'location.query', {});

  const getSearchQuery = (mixin = {}) => {
    const query = { ...initialSearchQuery, ...queryParams, ...mixin };
    return omitBy(query, (a) => !a); // удалить пустые ключи
  };

  useEffect(() => {
    props.sidPhoneGetStats();

    return () => {
      props.sidPhoneReset();
    };
  }, []);

  // поиск в зависимости от изменения параметров
  useEffect(() => {
    props.sidPhoneSearch(getSearchQuery());
  }, [queryParams]);

  const onFiltersChange = (values: null | ISidPhoneQueryParams) => {
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
          <div className="h4 mr-4">SidPhone dashboard</div>
          <SidPhoneFilterForm filters={getSearchQuery()} onChange={onFiltersChange} />
        </div>

        <SidPhoneStats stats={sidPhoneStats} />

        <div>
          <SidPhoneDashboardControls />
        </div>
      </div>

      <SidPhoneSearchList items={sidPhoneList} />
      <Pager pager={sidPhonePager} onChange={onPagerChange} />
    </>
  );
};

const mapStateToProps = (state: any) => ({
  SidPhoneDashboard: state.SidPhoneDashboard,
});

const mapDispatchToProps = (dispatch: any) => ({
  sidPhoneSearch: (payload: ISidPhoneQueryParams) => dispatch({ type: 'SidPhoneDashboard/sidPhoneSearch', payload }),
  sidPhoneGetStats: () => dispatch({ type: 'SidPhoneDashboard/sidPhoneGetStats' }),
  sidPhoneReset: () => dispatch({ type: 'SidPhoneDashboard/reset' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(SidPhoneDashboard);
