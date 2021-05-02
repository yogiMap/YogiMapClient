import React, { useEffect } from 'react';
import { connect, history } from 'umi';
import { get, omitBy } from 'lodash';
import CompanyAccountStats from '@/pages/companyAccount/dashboard/stats/CompanyAccountStats';
import CompanyAccountFilterForm from '@/pages/companyAccount/dashboard/search/CompanyAccountFilterForm';
import Pager from '@/pages/utils/pager/Pager';
import { ICompanyAccountQueryParams } from '@/pages/companyAccount/types';
import CompanyAccountSearchList from '@/pages/companyAccount/dashboard/search/CompanyAccountSearchList';
import { IState } from '@/pages/companyAccount/dashboard/model';

const initialSearchForm = {
  companyAccountSearchParam1: '',
  companyAccountSearchParam2: '',
};

const initialSearchQuery = {
  limit: 20,
  page: 1,
  ...initialSearchForm,
};

interface IProps {
  companyAccountGetStats: () => void;
  companyAccountSearch: (arg: ICompanyAccountQueryParams) => void;
  companyAccountReset: () => void;
  companyAccountDashboard: IState;
}

const CompanyAccountDashboard = (props: IProps) => {
  const companyAccountStats = get(props, 'CompanyAccountDashboard.companyAccountStats', {});
  const companyAccountList = get(props, 'CompanyAccountDashboard.companyAccountList', []);
  const companyAccountPager = get(props, 'CompanyAccountDashboard.companyAccountPager', {});
  const queryParams = get(props, 'location.query', {});

  const getSearchQuery = (mixin = {}) => {
    const query = { ...initialSearchQuery, ...queryParams, ...mixin };
    return omitBy(query, (a) => !a);
  };

  useEffect(() => {
    props.companyAccountGetStats();

    return () => {
      props.companyAccountReset();
    };
  }, []);

  useEffect(() => {
    props.companyAccountSearch(getSearchQuery());
  }, [queryParams]);

  const onFiltersChange = (values: null | ICompanyAccountQueryParams) => {
    const query = getSearchQuery({ ...values, page: 1 });
    history.push({ query });
  };

  const onPagerChange = (page: number) => {
    const query = getSearchQuery({ page });
    history.push({ query });
  };

  return (
    <>
      <div className="d-flex align-items-end justify-content-between mb-2">
        <div>
          <div className="h4 mr-4">Teacher Account dashboard</div>
          <CompanyAccountFilterForm filters={getSearchQuery()} onChange={onFiltersChange} />
        </div>

        <CompanyAccountStats stats={companyAccountStats} />
      </div>

      <CompanyAccountSearchList items={companyAccountList} />

      <Pager pager={companyAccountPager} onChange={onPagerChange} />
    </>
  );
};

const mapStateToProps = (state: any) => ({
  CompanyAccountDashboard: state.CompanyAccountDashboard,
});

const mapDispatchToProps = (dispatch: any) => ({
  companyAccountSearch: (payload: ICompanyAccountQueryParams) =>
    dispatch({ type: 'CompanyAccountDashboard/companyAccountSearch', payload }),
  companyAccountGetStats: () => dispatch({ type: 'CompanyAccountDashboard/accountGetStats' }),
  companyAccountReset: () => dispatch({ type: 'CompanyAccountDashboard/reset' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(CompanyAccountDashboard);
