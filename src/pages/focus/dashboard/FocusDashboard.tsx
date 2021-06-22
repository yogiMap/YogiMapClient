import React, { useEffect } from 'react';
import { connect, history } from 'umi';
import { get, omitBy } from 'lodash';
import FocusFilterForm from '@/pages/focus/dashboard/search/FocusFilterForm';
import { IFocusQueryParams } from '@/pages/focus/types';
import FocusSearchList from '@/pages/focus/dashboard/search/FocusSearchList';
import { IState } from '@/pages/focus/dashboard/model';
import { ILoadingEffects } from '@/types';

const initialSearchForm = {
  focusSearchParam1: '',
};

const initialSearchQuery = {
  limit: 20,
  page: 1,
  ...initialSearchForm,
};

type IFocusSearch = { focus: string } | '';

interface IProps {
  focusReset: () => void;
  focusSearch: (arg: IFocusSearch) => void;
  loadingEffects: ILoadingEffects;
  FocusDashboard: IState;
}

const FocusDashboard = (props: IProps) => {
  const focusList = get(props, 'FocusDashboard.focusList', []);
  const focusPager = get(props, 'FocusDashboard.focusPager', {});
  const queryParams = get(props, 'location.query', {});

  const getSearchQuery = (mixin = {}) => {
    const query = { ...initialSearchQuery, ...queryParams, ...mixin };
    return omitBy(query, (a) => !a); // удалить пустые ключи
  };

  const isLoading = get(props, 'loadingEffects.FocusDashboard/focusSearch', false);

  // useEffect(() => {
  //   return () => {
  //     props.focusReset();
  //   };
  // }, []);

  // поиск в зависимости от изменения параметров
  // useEffect(() => {
  //   props.getAll();
  // }, []);

  const onFiltersChange = (values: null | IFocusQueryParams) => {
    // обнулять pager при каждом новом поиске
    const query = getSearchQuery({ ...values, page: 1 });
    history.push({ query });
  };
  useEffect(() => {
    props.focusSearch(getSearchQuery());
  }, [queryParams]);

  // const onPagerChange = (page: number) => {
  //   const query = getSearchQuery({ page });
  //   history.push({ query });
  // };

  // @ts-ignore
  // @ts-ignore
  return (
    <div className="container">
      <div className="row my-5">
        <div className="col d-flex justify-content-center">
          <h1>Yoga Focus</h1>
        </div>
      </div>

      <div className="row my-5 d-flex justify-content-center">
        <div className="col d-flex justify-content-center">
          <FocusFilterForm filters={getSearchQuery()} onChange={onFiltersChange} />
        </div>
      </div>

      <div className="row my-3">
        <div className="col-flex justify-content-center">
          <FocusSearchList items={focusList} />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  FocusDashboard: state.FocusDashboard,
  loadingEffects: state.loading.effects,
});

const mapDispatchToProps = (dispatch: any) => ({
  focusSearch: (payload: IFocusSearch) => dispatch({ type: 'FocusDashboard/focusSearch', payload }),
  focusReset: () => dispatch({ type: 'FocusDashboard/reset' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(FocusDashboard);
