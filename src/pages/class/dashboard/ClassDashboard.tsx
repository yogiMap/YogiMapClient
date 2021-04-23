import React, { useEffect } from 'react';
import { connect, history } from 'umi';
import { get, omitBy } from 'lodash';
import ClassStats from '@/pages/class/dashboard/stats/ClassStats';
import ClassFilterForm from '@/pages/class/dashboard/search/ClassFilterForm';
import Pager from '@/pages/utils/pager/Pager';
import { IClassQueryParams } from '@/pages/class/types';
import ClassSearchList from '@/pages/class/dashboard/search/ClassSearchList';
import ClassDashboardControls from '@/pages/class/dashboard/controls/ClassDashboardControls';
import { IState } from '@/pages/class/dashboard/model';

const initialSearchForm = {
  classSearchParam1: '',
  classSearchParam2: '',
};

const initialSearchQuery = {
  limit: 20,
  page: 1,
  ...initialSearchForm,
};

interface IProps {
  classGetStats: () => void;
  classSearch: (arg: IClassQueryParams) => void;
  classReset: () => void;
  ClassDashboard: IState;
}

const ClassDashboard = (props: IProps) => {
  const classStats = get(props, 'ClassDashboard.classStats', {});
  const classList = get(props, 'ClassDashboard.classList', []);
  const classPager = get(props, 'ClassDashboard.classPager', {});
  const queryParams = get(props, 'location.query', {});

  const getSearchQuery = (mixin = {}) => {
    const query = { ...initialSearchQuery, ...queryParams, ...mixin };
    return omitBy(query, (a) => !a); // удалить пустые ключи
  };

  useEffect(() => {
    props.classGetStats();

    return () => {
      props.classReset();
    };
  }, []);

  // поиск в зависимости от изменения параметров
  useEffect(() => {
    props.classSearch(getSearchQuery());
  }, [queryParams]);

  const onFiltersChange = (values: null | IClassQueryParams) => {
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
          <div className="h4 mr-4">Class dashboard</div>
          <ClassFilterForm filters={getSearchQuery()} onChange={onFiltersChange} />
        </div>

        <ClassStats stats={classStats} />

        <div>
          <ClassDashboardControls />
        </div>
      </div>

      <ClassSearchList items={classList} />
      <Pager pager={classPager} onChange={onPagerChange} />
    </>
  );
};

const mapStateToProps = (state: any) => ({
  ClassDashboard: state.ClassDashboard,
});

const mapDispatchToProps = (dispatch: any) => ({
  classSearch: (payload: IClassQueryParams) => dispatch({ type: 'ClassDashboard/classSearch', payload }),
  classGetStats: () => dispatch({ type: 'ClassDashboard/classGetStats' }),
  classReset: () => dispatch({ type: 'ClassDashboard/reset' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClassDashboard);
