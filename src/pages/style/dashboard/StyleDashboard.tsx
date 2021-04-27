import React, { useEffect } from 'react';
import { connect, history } from 'umi';
import { get, omitBy } from 'lodash';
import StyleStats from '@/pages/style/dashboard/stats/StyleStats';
import StyleFilterForm from '@/pages/style/dashboard/search/StyleFilterForm';
import Pager from '@/pages/utils/pager/Pager';
import { IStyleQueryParams } from '@/pages/style/types';
import StyleSearchList from '@/pages/style/dashboard/search/StyleSearchList';
import StyleDashboardControls from '@/pages/style/dashboard/controls/StyleDashboardControls';
import { IState } from '@/pages/style/dashboard/model';

const initialSearchForm = {
  styleSearchParam1: '',
  styleSearchParam2: '',
};

const initialSearchQuery = {
  limit: 20,
  page: 1,
  ...initialSearchForm,
};

interface IProps {
  styleGetStats: () => void;
  styleSearch: (arg: IStyleQueryParams) => void;
  styleReset: () => void;
  StyleDashboard: IState;
}

const StyleDashboard = (props: IProps) => {
  const styleStats = get(props, 'StyleDashboard.styleStats', {});
  const styleList = get(props, 'StyleDashboard.styleList', []);
  const stylePager = get(props, 'StyleDashboard.stylePager', {});
  const queryParams = get(props, 'location.query', {});

  const getSearchQuery = (mixin = {}) => {
    const query = { ...initialSearchQuery, ...queryParams, ...mixin };
    return omitBy(query, (a) => !a); // удалить пустые ключи
  };

  useEffect(() => {
    props.styleGetStats();

    return () => {
      props.styleReset();
    };
  }, []);

  // поиск в зависимости от изменения параметров
  useEffect(() => {
    props.styleSearch(getSearchQuery());
  }, [queryParams]);

  const onFiltersChange = (values: null | IStyleQueryParams) => {
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
          <h1>Find Yoga Style</h1>
        </div>
      </div>

      <div className="row my-5 d-flex justify-content-center">
        <div className="col d-flex justify-content-center">
          <StyleFilterForm filters={getSearchQuery()} onChange={onFiltersChange} />
        </div>
      </div>

      {/*<StyleStats stats={styleStats} />*/}

      <div className="row my-3">
        <div className="col">
          <StyleSearchList items={styleList} />
          <Pager pager={stylePager} onChange={onPagerChange} />
        </div>
      </div>

      <div className="row my-3">
        <div className="col d-flex justify-content-end">
          <StyleDashboardControls />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  StyleDashboard: state.StyleDashboard,
});

const mapDispatchToProps = (dispatch: any) => ({
  styleSearch: (payload: IStyleQueryParams) => dispatch({ type: 'StyleDashboard/styleSearch', payload }),
  styleGetStats: () => dispatch({ type: 'StyleDashboard/styleGetStats' }),
  styleReset: () => dispatch({ type: 'StyleDashboard/reset' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(StyleDashboard);
