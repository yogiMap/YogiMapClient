import React, { useEffect } from 'react';
import { connect, history } from 'umi';
import { get, omitBy } from 'lodash';
import StudentAccountStats from '@/pages/studentAccount/dashboard/stats/StudentAccountStats';
import StudentAccountFilterForm from '@/pages/studentAccount/dashboard/search/StudentAccountFilterForm';
import Pager from '@/pages/utils/pager/Pager';
import { IStudentAccountQueryParams } from '@/pages/studentAccount/types';
import StudentAccountSearchList from '@/pages/studentAccount/dashboard/search/StudentAccountSearchList';
import { IState } from '@/pages/studentAccount/dashboard/model';

const initialSearchForm = {
  studentAccountSearchParam1: '',
  studentAccountSearchParam2: '',
};

const initialSearchQuery = {
  limit: 20,
  page: 1,
  ...initialSearchForm,
};

interface IProps {
  studentAccountGetStats: () => void;
  studentAccountSearch: (arg: IStudentAccountQueryParams) => void;
  studentAccountReset: () => void;
  studentAccountDashboard: IState;
}

const StudentAccountDashboard = (props: IProps) => {
  const studentAccountStats = get(props, 'StudentAccountDashboard.studentAccountStats', {});
  const studentAccountList = get(props, 'StudentAccountDashboard.studentAccountList', []);
  const studentAccountPager = get(props, 'StudentAccountDashboard.studentAccountPager', {});
  const queryParams = get(props, 'location.query', {});

  const getSearchQuery = (mixin = {}) => {
    const query = { ...initialSearchQuery, ...queryParams, ...mixin };
    return omitBy(query, (a) => !a);
  };

  useEffect(() => {
    props.studentAccountGetStats();

    return () => {
      props.studentAccountReset();
    };
  }, []);

  useEffect(() => {
    props.studentAccountSearch(getSearchQuery());
  }, [queryParams]);

  const onFiltersChange = (values: null | IStudentAccountQueryParams) => {
    const query = getSearchQuery({ ...values, page: 1 });
    history.push({ query });
  };

  const onPagerChange = (page: number) => {
    const query = getSearchQuery({ page });
    history.push({ query });
  };

  return (
    <div className="container">
      <div className="row my-5">
        <div className="col d-flex justify-content-center">
          <h1>StudentAccount`s Dashboard</h1>
        </div>
      </div>

      <div className="row my-5 d-flex justify-content-center">
        <div className="col d-flex justify-content-center">
          <StudentAccountFilterForm filters={getSearchQuery()} onChange={onFiltersChange} />
        </div>
      </div>

      <div className="row my-3">
        <div className="col">
          <StudentAccountSearchList items={studentAccountList} />
          <Pager pager={studentAccountPager} onChange={onPagerChange} />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  StudentAccountDashboard: state.StudentAccountDashboard,
});

const mapDispatchToProps = (dispatch: any) => ({
  studentAccountSearch: (payload: IStudentAccountQueryParams) =>
    dispatch({ type: 'StudentAccountDashboard/studentAccountSearch', payload }),
  studentAccountGetStats: () => dispatch({ type: 'StudentAccountDashboard/accountGetStats' }),
  studentAccountReset: () => dispatch({ type: 'StudentAccountDashboard/reset' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(StudentAccountDashboard);
