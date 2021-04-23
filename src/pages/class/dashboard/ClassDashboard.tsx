import React, { useEffect } from 'react';
import { connect, history } from 'umi';
import { get, omitBy } from 'lodash';
import classStats from '@/pages/class/dashboard/stats/classStats';
import classFilterForm from '@/pages/class/dashboard/search/classFilterForm';
import Pager from '@/pages/utils/pager/Pager';
import { IclassQueryParams } from '@/pages/class/types';
import classSearchList from '@/pages/class/dashboard/search/classSearchList';
import classDashboardControls from '@/pages/class/dashboard/controls/classDashboardControls';
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
  classSearch: (arg: IclassQueryParams) => void;
  classReset: () => void;
  classDashboard: IState;
}

const classDashboard = (props: IProps) => {
  const classStats = get(props, 'classDashboard.classStats', {});
  const classList = get(props, 'classDashboard.classList', []);
  const classPager = get(props, 'classDashboard.classPager', {});
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

  const onFiltersChange = (values: null | IclassQueryParams) => {
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
          <div className="h4 mr-4">class dashboard</div>
          <classFilterForm filters={getSearchQuery()} onChange={onFiltersChange} />
        </div>

        <classStats stats={classStats} />

        <div>
          <classDashboardControls />
        </div>
      </div>

      <classSearchList items={classList} />
      <Pager pager={classPager} onChange={onPagerChange} />
    </>
  );
};

const mapStateToProps = (state: any) => ({
  classDashboard: state.classDashboard,
});

const mapDispatchToProps = (dispatch: any) => ({
  classSearch: (payload: IclassQueryParams) => dispatch({ type: 'classDashboard/classSearch', payload }),
  classGetStats: () => dispatch({ type: 'classDashboard/classGetStats' }),
  classReset: () => dispatch({ type: 'classDashboard/reset' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(classDashboard);
