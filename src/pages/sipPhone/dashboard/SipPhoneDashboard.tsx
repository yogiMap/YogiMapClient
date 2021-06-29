import React, { useEffect } from 'react';
import { connect, history } from 'umi';
import { get, omitBy } from 'lodash';
import SipPhoneStats from '@/pages/sipPhone/dashboard/stats/SipPhoneStats';
import SipPhoneFilterForm from '@/pages/sipPhone/dashboard/search/SipPhoneFilterForm';
import Pager from '@/pages/utils/pager/Pager';
import { ISipPhoneQueryParams } from '@/pages/sipPhone/types';
import SipPhoneSearchList from '@/pages/sipPhone/dashboard/search/SipPhoneSearchList';
import SipPhoneDashboardControls from '@/pages/sipPhone/dashboard/controls/SipPhoneDashboardControls';
import { IState } from '@/pages/sipPhone/dashboard/model';

const initialSearchForm = {
  sipPhoneSearchParam1: '',
  sipPhoneSearchParam2: '',
};

const initialSearchQuery = {
  limit: 20,
  page: 1,
  ...initialSearchForm,
};

interface IProps {
  sipPhoneGetStats: () => void;
  sipPhoneSearch: (arg: ISipPhoneQueryParams) => void;
  sipPhoneReset: () => void;
  SipPhoneDashboard: IState;
}

const SipPhoneDashboard = (props: IProps) => {
  const sipPhoneStats = get(props, 'SipPhoneDashboard.sipPhoneStats', {});
  const sipPhoneList = get(props, 'SipPhoneDashboard.sipPhoneList', []);
  const sipPhonePager = get(props, 'SipPhoneDashboard.sipPhonePager', {});
  const queryParams = get(props, 'location.query', {});

  const getSearchQuery = (mixin = {}) => {
    const query = { ...initialSearchQuery, ...queryParams, ...mixin };
    return omitBy(query, (a) => !a); // удалить пустые ключи
  };

  useEffect(() => {
    props.sipPhoneGetStats();

    return () => {
      props.sipPhoneReset();
    };
  }, []);

  // поиск в зависимости от изменения параметров
  useEffect(() => {
    props.sipPhoneSearch(getSearchQuery());
  }, [queryParams]);

  const onFiltersChange = (values: null | ISipPhoneQueryParams) => {
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
          <div className="h4 mr-4">SipPhone dashboard</div>
          <SipPhoneFilterForm filters={getSearchQuery()} onChange={onFiltersChange} />
        </div>

        <SipPhoneStats stats={sipPhoneStats} />

        <div>
          <SipPhoneDashboardControls />
        </div>
      </div>

      <SipPhoneSearchList items={sipPhoneList} />
      <Pager pager={sipPhonePager} onChange={onPagerChange} />
    </>
  );
};

const mapStateToProps = (state: any) => ({
  SipPhoneDashboard: state.SipPhoneDashboard,
});

const mapDispatchToProps = (dispatch: any) => ({
  sipPhoneSearch: (payload: ISipPhoneQueryParams) => dispatch({ type: 'SipPhoneDashboard/sipPhoneSearch', payload }),
  sipPhoneGetStats: () => dispatch({ type: 'SipPhoneDashboard/sipPhoneGetStats' }),
  sipPhoneReset: () => dispatch({ type: 'SipPhoneDashboard/reset' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(SipPhoneDashboard);
