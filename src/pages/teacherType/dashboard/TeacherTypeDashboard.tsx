import React, { useEffect } from 'react';
import { connect, history } from 'umi';
import { get, omitBy } from 'lodash';
import TeacherTypeStats from '@/pages/teacherType/dashboard/stats/TeacherTypeStats';
import TeacherTypeFilterForm from '@/pages/teacherType/dashboard/search/TeacherTypeFilterForm';
import Pager from '@/pages/utils/pager/Pager';
import { ITeacherTypeQueryParams } from '@/pages/teacherType/types';
import TeacherTypeSearchList from '@/pages/teacherType/dashboard/search/TeacherTypeSearchList';
import TeacherTypeDashboardControls from '@/pages/teacherType/dashboard/controls/TeacherTypeDashboardControls';
import { IState } from '@/pages/teacherType/dashboard/model';

const initialSearchForm = {
  teacherTypeSearchParam1: '',
};

const initialSearchQuery = {
  limit: 20,
  page: 1,
  ...initialSearchForm,
};

interface IProps {
  teacherTypeGetStats: () => void;
  teacherTypeSearch: (arg: ITeacherTypeQueryParams) => void;
  teacherTypeReset: () => void;
  TeacherTypeDashboard: IState;
}

const TeacherTypeDashboard = (props: IProps) => {
  const teacherTypeStats = get(props, 'TeacherTypeDashboard.teacherTypeStats', {});
  const teacherTypeList = get(props, 'TeacherTypeDashboard.teacherTypeList', []);
  const teacherTypePager = get(props, 'TeacherTypeDashboard.teacherTypePager', {});
  const queryParams = get(props, 'location.query', {});

  const getSearchQuery = (mixin = {}) => {
    const query = { ...initialSearchQuery, ...queryParams, ...mixin };
    return omitBy(query, (a) => !a); // удалить пустые ключи
  };

  useEffect(() => {
    props.teacherTypeGetStats();

    return () => {
      props.teacherTypeReset();
    };
  }, []);

  // поиск в зависимости от изменения параметров
  useEffect(() => {
    props.teacherTypeSearch(getSearchQuery());
  }, [queryParams]);

  const onFiltersChange = (values: null | ITeacherTypeQueryParams) => {
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
          <h3>Types of Yoga</h3>
          <TeacherTypeFilterForm filters={getSearchQuery()} onChange={onFiltersChange} />
        </div>

        <TeacherTypeStats stats={teacherTypeStats} />

        <div>
          <TeacherTypeDashboardControls />
        </div>
      </div>

      <TeacherTypeSearchList items={teacherTypeList} />
      <Pager pager={teacherTypePager} onChange={onPagerChange} />
    </>
  );
};

const mapStateToProps = (state: any) => ({
  TeacherTypeDashboard: state.TeacherTypeDashboard,
});

const mapDispatchToProps = (dispatch: any) => ({
  teacherTypeSearch: (payload: ITeacherTypeQueryParams) => dispatch({ type: 'TeacherTypeDashboard/teacherTypeSearch', payload }),
  teacherTypeGetStats: () => dispatch({ type: 'TeacherTypeDashboard/teacherTypeGetStats' }),
  teacherTypeReset: () => dispatch({ type: 'TeacherTypeDashboard/reset' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(TeacherTypeDashboard);
