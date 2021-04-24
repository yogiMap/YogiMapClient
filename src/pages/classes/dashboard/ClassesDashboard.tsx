import React, { useEffect } from 'react';
import { connect, history } from 'umi';
import { get, omitBy } from 'lodash';
import ClassesStats from '@/pages/classes/dashboard/stats/ClassesStats';
import ClassesFilterForm from '@/pages/classes/dashboard/search/ClassesFilterForm';
import Pager from '@/pages/utils/pager/Pager';
import { IClassesQueryParams } from '@/pages/classes/types';
import ClassesSearchList from '@/pages/classes/dashboard/search/ClassesSearchList';
import ClassesDashboardControls from '@/pages/classes/dashboard/controls/ClassesDashboardControls';
import { IState } from '@/pages/classes/dashboard/model';

const initialSearchForm = {
  classesSearchParam1: '',
  classesSearchParam2: '',
};

const initialSearchQuery = {
  limit: 20,
  page: 1,
  ...initialSearchForm,
};

interface IProps {
  classesGetStats: () => void;
  classesSearch: (arg: IClassesQueryParams) => void;
  classesReset: () => void;
  ClassesDashboard: IState;
}

const ClassesDashboard = (props: IProps) => {
  const classesStats = get(props, 'ClassesDashboard.classesStats', {});
  const classesList = get(props, 'ClassesDashboard.classesList', []);
  const classesPager = get(props, 'ClassesDashboard.classesPager', {});
  const queryParams = get(props, 'location.query', {});

  const getSearchQuery = (mixin = {}) => {
    const query = { ...initialSearchQuery, ...queryParams, ...mixin };
    return omitBy(query, (a) => !a); // удалить пустые ключи
  };

  useEffect(() => {
    props.classesGetStats();

    return () => {
      props.classesReset();
    };
  }, []);

  // поиск в зависимости от изменения параметров
  useEffect(() => {
    props.classesSearch(getSearchQuery());
  }, [queryParams]);

  const onFiltersChange = (values: null | IClassesQueryParams) => {
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
          <div className="h4 mr-4">Classes dashboard</div>
          <ClassesFilterForm filters={getSearchQuery()} onChange={onFiltersChange} />
        </div>

        <ClassesStats stats={classesStats} />

        <div>
          <ClassesDashboardControls />
        </div>
      </div>

      <ClassesSearchList items={classesList} />
      <Pager pager={classesPager} onChange={onPagerChange} />
    </>
  );
};

const mapStateToProps = (state: any) => ({
  ClassesDashboard: state.ClassesDashboard,
});

const mapDispatchToProps = (dispatch: any) => ({
  classesSearch: (payload: IClassesQueryParams) => dispatch({ type: 'ClassesDashboard/classesSearch', payload }),
  classesGetStats: () => dispatch({ type: 'ClassesDashboard/classesGetStats' }),
  classesReset: () => dispatch({ type: 'ClassesDashboard/reset' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClassesDashboard);
