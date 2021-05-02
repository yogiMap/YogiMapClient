import React, { useEffect } from 'react';
import { connect, history } from 'umi';
import { get, omitBy } from 'lodash';
import FocusFilterForm from '@/pages/focus/dashboard/search/FocusFilterForm';
import Pager from '@/pages/utils/pager/Pager';
import { IFocusQueryParams } from '@/pages/focus/types';
import FocusSearchList from '@/pages/focus/dashboard/search/FocusSearchList';
import FocusDashboardControls from '@/pages/focus/dashboard/controls/FocusDashboardControls';
import { IState } from '@/pages/focus/dashboard/model';

const initialSearchForm = {
  focusSearchParam1: '',
};

const initialSearchQuery = {
  limit: 20,
  page: 1,
  ...initialSearchForm,
};

interface IProps {
  focusGetStats: () => void;
  focusSearch: (arg: IFocusQueryParams) => void;
  focusReset: () => void;
  FocusDashboard: IState;
}

const FocusDashboard = (props: IProps) => {
  const focusStats = get(props, 'FocusDashboard.focusStats', {});
  const focusList = get(props, 'FocusDashboard.focusList', []);
  const focusPager = get(props, 'FocusDashboard.focusPager', {});
  const queryParams = get(props, 'location.query', {});

  const getSearchQuery = (mixin = {}) => {
    const query = { ...initialSearchQuery, ...queryParams, ...mixin };
    return omitBy(query, (a) => !a); // удалить пустые ключи
  };

  useEffect(() => {
    props.focusGetStats();

    return () => {
      props.focusReset();
    };
  }, []);

  // поиск в зависимости от изменения параметров
  useEffect(() => {
    props.focusSearch(getSearchQuery());
  }, [queryParams]);

  const onFiltersChange = (values: null | IFocusQueryParams) => {
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
          <h1>Focus Of Yoga</h1>
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
          <Pager pager={focusPager} onChange={onPagerChange} />
        </div>
      </div>

    </div>
  );
};

const mapStateToProps = (state: any) => ({
  FocusDashboard: state.FocusDashboard,
});

const mapDispatchToProps = (dispatch: any) => ({
  focusSearch: (payload: IFocusQueryParams) =>
    dispatch({ type: 'FocusDashboard/focusSearch', payload }),
  focusGetStats: () => dispatch({ type: 'FocusDashboard/focusGetStats' }),
  focusReset: () => dispatch({ type: 'FocusDashboard/reset' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(FocusDashboard);
