import React, { useEffect } from 'react';
import { connect, history } from 'umi';
import { get, omitBy } from 'lodash';
import TeacherAccountStats from '@/pages/teacherAccount/dashboard/stats/TeacherAccountStats';
import TeacherAccountFilterForm from '@/pages/teacherAccount/dashboard/search/TeacherAccountFilterForm';
import Pager from '@/pages/utils/pager/Pager';
import { ITeacherAccountQueryParams } from '@/pages/teacherAccount/types';
import TeacherAccountSearchList from '@/pages/teacherAccount/dashboard/search/TeacherAccountSearchList';
import { IState } from '@/pages/teacherAccount/dashboard/model';

const initialSearchForm = {
  teacherAccountSearchParam1: '',
  teacherAccountSearchParam2: '',
};

const initialSearchQuery = {
  limit: 20,
  page: 1,
  ...initialSearchForm,
};

interface IProps {
  teacherAccountGetStats: () => void;
  teacherAccountSearch: (arg: ITeacherAccountQueryParams) => void;
  teacherAccountReset: () => void;
  teacherAccountDashboard: IState;
}

const TeacherAccountDashboard = (props: IProps) => {
  const teacherAccountStats = get(props, 'TeacherAccountDashboard.teacherAccountStats', {});
  const teacherAccountList = get(props, 'TeacherAccountDashboard.teacherAccountList', []);
  const teacherAccountPager = get(props, 'TeacherAccountDashboard.teacherAccountPager', {});
  const queryParams = get(props, 'location.query', {});

  const getSearchQuery = (mixin = {}) => {
    const query = { ...initialSearchQuery, ...queryParams, ...mixin };
    return omitBy(query, (a) => !a);
  };

  useEffect(() => {
    props.teacherAccountGetStats();

    return () => {
      props.teacherAccountReset();
    };
  }, []);

  useEffect(() => {
    props.teacherAccountSearch(getSearchQuery());
  }, [queryParams]);

  const onFiltersChange = (values: null | ITeacherAccountQueryParams) => {
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
          <TeacherAccountFilterForm filters={getSearchQuery()} onChange={onFiltersChange} />
        </div>

        <TeacherAccountStats stats={teacherAccountStats} />
      </div>

      <TeacherAccountSearchList items={teacherAccountList} />

      <Pager pager={teacherAccountPager} onChange={onPagerChange} />
    </>
  );
};

const mapStateToProps = (state: any) => ({
  TeacherAccountDashboard: state.TeacherAccountDashboard,
});

const mapDispatchToProps = (dispatch: any) => ({
  teacherAccountSearch: (payload: ITeacherAccountQueryParams) =>
    dispatch({ type: 'TeacherAccountDashboard/teacherAccountSearch', payload }),
  teacherAccountGetStats: () => dispatch({ type: 'TeacherAccountDashboard/accountGetStats' }),
  teacherAccountReset: () => dispatch({ type: 'TeacherAccountDashboard/reset' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(TeacherAccountDashboard);
