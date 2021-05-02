import React, { useEffect } from 'react';
import { connect, history } from 'umi';
import { get, omitBy } from 'lodash';
import TeacherStats from '@/pages/teacher/dashboard/stats/TeacherStats';
import TeacherFilterForm from '@/pages/teacher/dashboard/search/TeacherFilterForm';
import Pager from '@/pages/utils/pager/Pager';
import { ITeacher, ITeacherQueryParams } from '@/pages/teacher/types';
import TeacherSearchList from '@/pages/teacher/dashboard/search/TeacherSearchList';
import TeacherDashboardControls from '@/pages/teacher/dashboard/controls/TeacherDashboardControls';
import { IState } from '@/pages/teacher/dashboard/model';

const initialSearchForm = {
  teacherSearchParam1: '',
  teacherSearchParam2: '',
};

const initialSearchQuery = {
  limit: 20,
  page: 1,
  ...initialSearchForm,
};

interface IProps {
  teacherGetStats: () => void;
  teacherSearch: (arg: ITeacherQueryParams) => void;
  teacherReset: () => void;
  TeacherDashboard: IState;
}

const TeacherDashboard = (props: IProps) => {
  const teacherStats = get(props, 'TeacherDashboard.teacherStats', {});
  const teacherList = get(props, 'TeacherDashboard.teacherList', []);
  const teacherPager = get(props, 'TeacherDashboard.teacherPager', {});
  const queryParams = get(props, 'location.query', {});

  const getSearchQuery = (mixin = {}) => {
    const query = { ...initialSearchQuery, ...queryParams, ...mixin };
    return omitBy(query, (a) => !a); // удалить пустые ключи
  };

  useEffect(() => {
    props.teacherGetStats();

    return () => {
      props.teacherReset();
    };
  }, []);

  // поиск в зависимости от изменения параметров
  useEffect(() => {
    props.teacherSearch(getSearchQuery());
  }, [queryParams]);

  const onFiltersChange = (values: null | ITeacherQueryParams) => {
    // обнулять pager при каждом новом поиске
    const query = getSearchQuery({ ...values, page: 1 });
    history.push({ query });
  };

  const onPagerChange = (page: number) => {
    const query = getSearchQuery({ page });
    history.push({ query });
  };

  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  return (
    <div className="container">
      <div className="row my-5">
        <div className="col d-flex justify-content-center">
          <h1>Find Your Teacher</h1>
        </div>
      </div>

      <div className="row my-5 d-flex justify-content-center" >
        <div className="col d-flex justify-content-center">
          <TeacherFilterForm filters={getSearchQuery()} onChange={onFiltersChange} />
        </div>
      </div>

      {/*<TeacherStats stats={teacherStats} />*/}

      <div className="row my-3">
        <div className="col">
          <TeacherSearchList items={teacherList} />
          <Pager pager={teacherPager} onChange={onPagerChange} />
        </div>
      </div>

      <div className="row my-3">
        <div className="col d-flex justify-content-end">
          <TeacherDashboardControls />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  TeacherDashboard: state.TeacherDashboard,
});

const mapDispatchToProps = (dispatch: any) => ({
  teacherSearch: (payload: ITeacherQueryParams) => dispatch({ type: 'TeacherDashboard/teacherSearch', payload }),
  teacherGetStats: () => dispatch({ type: 'TeacherDashboard/teacherGetStats' }),
  teacherReset: () => dispatch({ type: 'TeacherDashboard/reset' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(TeacherDashboard);
