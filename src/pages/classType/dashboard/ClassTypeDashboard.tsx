import React, { useEffect } from 'react';
import { connect, history } from 'umi';
import { get, omitBy } from 'lodash';
import ClassTypeStats from '@/pages/classType/dashboard/stats/ClassTypeStats';
import ClassTypeFilterForm from '@/pages/classType/dashboard/search/ClassTypeFilterForm';
import Pager from '@/pages/utils/pager/Pager';
import { IClassTypeQueryParams } from '@/pages/classType/types';
import ClassTypeSearchList from '@/pages/classType/dashboard/search/ClassTypeSearchList';
import ClassTypeDashboardControls from '@/pages/classType/dashboard/controls/ClassTypeDashboardControls';
import { IState } from '@/pages/classType/dashboard/model';

const initialSearchForm = {
  classTypeSearchParam1: '',
};

const initialSearchQuery = {
  limit: 20,
  page: 1,
  ...initialSearchForm,
};

interface IProps {
  classTypeGetStats: () => void;
  classTypeSearch: (arg: IClassTypeQueryParams) => void;
  classTypeReset: () => void;
  ClassTypeDashboard: IState;
}

const ClassTypeDashboard = (props: IProps) => {
  const classTypeStats = get(props, 'ClassTypeDashboard.classTypeStats', {});
  const classTypeList = get(props, 'ClassTypeDashboard.classTypeList', []);
  const classTypePager = get(props, 'ClassTypeDashboard.classTypePager', {});
  const queryParams = get(props, 'location.query', {});

  const getSearchQuery = (mixin = {}) => {
    const query = { ...initialSearchQuery, ...queryParams, ...mixin };
    return omitBy(query, (a) => !a); // удалить пустые ключи
  };

  useEffect(() => {
    props.classTypeGetStats();

    return () => {
      props.classTypeReset();
    };
  }, []);

  // поиск в зависимости от изменения параметров
  useEffect(() => {
    props.classTypeSearch(getSearchQuery());
  }, [queryParams]);

  const onFiltersChange = (values: null | IClassTypeQueryParams) => {
    // обнулять pager при каждом новом поиске
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
          <h1>Types of Yoga</h1>
        </div>
      </div>

      <div className="row my-5 d-flex justify-content-center">
        <div className="col d-flex justify-content-center">
          <ClassTypeFilterForm filters={getSearchQuery()} onChange={onFiltersChange} />
        </div>
      </div>

      {/*<ClassTypeStats stats={classTypeStats} />*/}

      <div className="row my-3">
        <div className="col-flex justify-content-center">
          <ClassTypeSearchList items={classTypeList} />
          <Pager pager={classTypePager} onChange={onPagerChange} />
        </div>
      </div>

    {/*  <div className="row my-3">*/}
    {/*    <div className="col d-flex justify-content-end">*/}
    {/*      <ClassTypeDashboardControls />*/}
    {/*    </div>*/}
    {/*  </div>*/}
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  ClassTypeDashboard: state.ClassTypeDashboard,
});

const mapDispatchToProps = (dispatch: any) => ({
  classTypeSearch: (payload: IClassTypeQueryParams) =>
    dispatch({ type: 'ClassTypeDashboard/classTypeSearch', payload }),
  classTypeGetStats: () => dispatch({ type: 'ClassTypeDashboard/classTypeGetStats' }),
  classTypeReset: () => dispatch({ type: 'ClassTypeDashboard/reset' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClassTypeDashboard);
