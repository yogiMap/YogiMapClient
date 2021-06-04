import React, { useEffect } from 'react';
import { connect, history } from 'umi';
import { get, omitBy } from 'lodash';
import StudentStats from '@/pages/student/dashboard/stats/StudentStats';
import StudentFilterForm from '@/pages/student/dashboard/search/StudentFilterForm';
import Pager from '@/pages/utils/pager/Pager';
import { IStudentQueryParams } from '@/pages/student/types';
import StudentSearchList from '@/pages/student/dashboard/search/StudentSearchList';
import { IState } from '@/pages/student/dashboard/model';

const initialSearchForm = {
  studentSearchParam1: '',
  studentSearchParam2: '',
};

const initialSearchQuery = {
  limit: 20,
  page: 1,
  ...initialSearchForm,
};

interface IProps {
  studentGetStats: () => void;
  studentSearch: (arg: IStudentQueryParams) => void;
  studentReset: () => void;
  studentDashboard: IState;
}

const StudentDashboard = (props: IProps) => {
  const studentStats = get(props, 'StudentDashboard.studentStats', {});
  const studentList = get(props, 'StudentDashboard.studentList', []);
  const studentPager = get(props, 'StudentDashboard.studentPager', {});
  const queryParams = get(props, 'location.query', {});

  const getSearchQuery = (mixin = {}) => {
    const query = { ...initialSearchQuery, ...queryParams, ...mixin };
    return omitBy(query, (a) => !a);
  };

  useEffect(() => {
    props.studentGetStats();

    return () => {
      props.studentReset();
    };
  }, []);

  useEffect(() => {
    props.studentSearch(getSearchQuery());
  }, [queryParams]);

  const onFiltersChange = (values: null | IStudentQueryParams) => {
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
          <h1>Student`s Dashboard</h1>
        </div>
      </div>

      <div className="row my-5 d-flex justify-content-center">
        <div className="col d-flex justify-content-center">
          <StudentFilterForm filters={getSearchQuery()} onChange={onFiltersChange} />
        </div>
      </div>

      <div className="row my-3">
        <div className="col">
          <StudentSearchList items={studentList} />
          <Pager pager={studentPager} onChange={onPagerChange} />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  StudentDashboard: state.StudentDashboard,
});

const mapDispatchToProps = (dispatch: any) => ({
  studentSearch: (payload: IStudentQueryParams) => dispatch({ type: 'StudentDashboard/studentSearch', payload }),
  studentGetStats: () => dispatch({ type: 'StudentDashboard/accountGetStats' }),
  studentReset: () => dispatch({ type: 'StudentDashboard/reset' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(StudentDashboard);
