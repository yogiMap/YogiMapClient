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
import Loader from '@/pages/utils/Loader';
import { ILoadingEffects } from '@/types';

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
  loadingEffects: ILoadingEffects;
}

const ClassesDashboard = (props: IProps) => {
  const classesStats = get(props, 'ClassesDashboard.classesStats', {});
  const classesList = get(props, 'ClassesDashboard.classesList', []);
  const classesPager = get(props, 'ClassesDashboard.classesPager', {});
  const queryParams = get(props, 'location.query', {});
  const isLoadingGet = get(props, 'loadingEffects.ClientDashboard/search', true);

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
    <div className="container my-5">
      <div className="row my-5">
        <div className="col d-flex justify-content-center">
          <h1>Find Your Classes</h1>
        </div>
      </div>

      <div className="row my-5 d-flex justify-content-center">
        <div className="col d-flex justify-content-center">
          <ClassesFilterForm filters={getSearchQuery()} onChange={onFiltersChange} />
        </div>
      </div>

      {/*<ClassesStats stats={classesStats} />*/}

      <div className="row my-3">
        <div className="col">
          <ClassesSearchList items={classesList} />
          <Pager pager={classesPager} onChange={onPagerChange} />
        </div>
      </div>

      <div className="row my-3">
        <div className="col d-flex justify-content-end">
          {/*{isLoadingGet ? <Loader /> : */}
          <ClassesDashboardControls />
          {/*}*/}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  ClassesDashboard: state.ClassesDashboard,
  loadingEffects: state.loading.effects,
});

const mapDispatchToProps = (dispatch: any) => ({
  classesSearch: (payload: IClassesQueryParams) => dispatch({ type: 'ClassesDashboard/classesSearch', payload }),
  classesGetStats: () => dispatch({ type: 'ClassesDashboard/classesGetStats' }),
  classesReset: () => dispatch({ type: 'ClassesDashboard/reset' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClassesDashboard);
