import React, { useEffect } from 'react';
import { connect, history } from 'umi';
import { get, omitBy } from 'lodash';
import Pager from '@/pages/utils/pager/Pager';
import { IClient, IClientQueryParams } from '@/pages/client/types';
import ClientSearchList from '@/pages/client/dashboard/search/ClientSearchList';
import ClientDashboardControls from '@/pages/client/dashboard/controls/ClientDashboardControls';
import { IState } from '@/pages/client/dashboard/model';
import ClientLanding from '@/pages/client/dashboard/ClientLanding';
import { ILoadingEffects } from '@/types';
import Loader from '@/pages/utils/Loader';
import ClientFilterForm from '@/pages/client/dashboard/search/ClientFilterForm';

const initialSearchForm = {
  name: '',
  company: '',
};

const initialSearchQuery = {
  limit: 20,
  page: 1,
  ...initialSearchForm,
};

interface IProps {
  clientGetStats: () => void;
  clientSearch: (arg: IClientQueryParams) => void;
  clientResetDashboard: () => void;
  ClientDashboard: IState;
  loadingEffects: ILoadingEffects;
}

const ClientDashboard = (props: IProps) => {
  const clientList: IClient[] = get(props, 'ClientDashboard.clientList', []);
  const clientCount = get(props, 'ClientDashboard.clientStats.totalCount', 0);
  const clientPager = get(props, 'ClientDashboard.clientPager', {});
  const queryParams = get(props, 'location.query', {});

  const isLoadingGet = get(props, 'loadingEffects.ClientDashboard/search', true);

  const getSearchQuery = (mixin = {}) => {
    const query = { ...initialSearchQuery, ...queryParams, ...mixin };
    return omitBy(query, (a) => !a); // удалить пустые ключи
  };

  useEffect(() => {
    props.clientGetStats();

    return () => {
      props.clientResetDashboard();
    };
  }, []);

  // поиск в зависимости от изменения параметров
  useEffect(() => {
    search(getSearchQuery());
  }, [queryParams]);

  // change query param to redirect to previous page
  useEffect(() => {
    if (clientPager.itemsCount % clientPager.limit === 0) {
      onPagerChange(clientPager.pageCount);
    }
  }, [clientPager.itemsCount]);

  const search = (params: IClientQueryParams) => {
    props.clientSearch(params);
  };

  const onFiltersChange = (values: null | IClientQueryParams) => {
    // обнулять pager при каждом новом поиске
    const query = getSearchQuery({ ...values, page: 1 });
    history.push({ query });
  };

  const onPagerChange = (page: number) => {
    const query = getSearchQuery({ page });
    history.push({ query });
  };

  if (!clientCount) return <ClientLanding />;

  return (
    <div className="container">
      <div className="row my-5">
        <div className="col d-flex justify-content-center">
          <h1>Clients</h1>
        </div>
      </div>

      <div className="row my-5 d-flex justify-content-center">
        <div className="col d-flex justify-content-center">
          <ClientFilterForm filters={getSearchQuery()} onChange={onFiltersChange} />
        </div>
      </div>

      <div className="row my-3">
        <div className="col">
          <ClientSearchList items={clientList} />
        </div>
      </div>

      <div className="row my-3">
        <div className="col d-flex justify-content-end">{isLoadingGet ? <Loader /> : <ClientDashboardControls />}</div>
      </div>
      <Pager pager={clientPager} onChange={onPagerChange} />
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  ClientDashboard: state.ClientDashboard,
  loadingEffects: state.loading.effects,
});

const mapDispatchToProps = (dispatch: any) => ({
  clientSearch: (payload: IClientQueryParams) => dispatch({ type: 'ClientDashboard/search', payload }),
  clientGetStats: () => dispatch({ type: 'ClientDashboard/getStats' }),
  clientResetDashboard: () => dispatch({ type: 'ClientDashboard/reset' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClientDashboard);
