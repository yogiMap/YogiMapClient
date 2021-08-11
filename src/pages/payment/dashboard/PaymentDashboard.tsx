import React, { useEffect } from 'react';
import { connect, history } from 'umi';
import { get, omitBy } from 'lodash';
import PaymentFilterForm from '@/pages/payment/dashboard/search/PaymentFilterForm';
import Pager from '@/pages/utils/pager/Pager';
import { IPaymentQueryParams } from '@/pages/payment/types';
import PaymentSearchList from '@/pages/payment/dashboard/search/PaymentSearchList';
import PaymentDashboardControls from '@/pages/payment/dashboard/controls/PaymentDashboardControls';
import { IState } from '@/pages/payment/dashboard/model';
import PaymentLanding from '@/pages/payment/dashboard/PaymentLanding';
import { ILoadingEffects } from '@/types';
import Loader from '@/pages/utils/Loader';

const initialSearchForm = {
  paymentSearchParam1: '',
  paymentSearchParam2: '',
};

const initialSearchQuery = {
  limit: 20,
  page: 1,
  ...initialSearchForm,
};

interface IProps {
  paymentGetStats: () => void;
  paymentSearch: (arg: IPaymentQueryParams) => void;
  paymentReset: () => void;
  PaymentDashboard: IState;
  loadingEffects: ILoadingEffects;
  clientGetStats: () => void;
  orderGetStats: () => void;
}

const PaymentDashboard = (props: IProps) => {
  const paymentStats = get(props, 'PaymentDashboard.paymentStats', {});
  const paymentList = get(props, 'PaymentDashboard.paymentList', []);
  const paymentCount = get(props, 'PaymentDashboard.paymentStats.totalCount', 0);
  const paymentPager = get(props, 'PaymentDashboard.paymentPager', {});
  const queryParams = get(props, 'location.query', {});
  const clientCount = get(props, 'ClientDashboard.clientStats.totalCount', 0);
  const orderCount = get(props, 'OrderDashboard.orderStats.totalCount', 0);
  const isLoadingGet = get(props, 'loadingEffects.PaymentDashboard/paymentSearch', true);

  const getSearchQuery = (mixin = {}) => {
    const query = { ...initialSearchQuery, ...queryParams, ...mixin };
    return omitBy(query, (a) => !a); // удалить пустые ключи
  };

  useEffect(() => {
    props.paymentGetStats();
    props.clientGetStats();
    props.orderGetStats();
    return () => {
      props.paymentReset();
    };
  }, []);

  // поиск в зависимости от изменения параметров
  useEffect(() => {
    search(getSearchQuery());
  }, [queryParams]);

  const search = (params: IPaymentQueryParams) => {
    props.paymentSearch(params);
  };

  const onFiltersChange = (values: null | IPaymentQueryParams) => {
    // обнулять pager при каждом новом поиске
    const query = getSearchQuery({ ...values, page: 1 });
    history.push({ query });
  };

  const onPagerChange = (page: number) => {
    const query = getSearchQuery({ page });
    history.push({ query });
  };

  if (isLoadingGet) return <Loader />;
  if (!paymentCount) return <PaymentLanding clientCount={clientCount} orderCount={orderCount} />;

  return (
    <div className="container">
      <div className="d-flex align-items-end justify-content-between mt-3 mb-2">
        <div>
          <div className="h4 mr-4">Payment dashboard</div>
          <PaymentFilterForm filters={getSearchQuery()} onChange={onFiltersChange} />
        </div>

        <div className="ml-auto-">
          <PaymentDashboardControls />
        </div>
      </div>

      <PaymentSearchList items={paymentList} />
      <Pager pager={paymentPager} onChange={onPagerChange} />
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  PaymentDashboard: state.PaymentDashboard,
  loadingEffects: state.loading.effects,
  ClientDashboard: state.ClientDashboard,
  OrderDashboard: state.OrderDashboard,
});

const mapDispatchToProps = (dispatch: any) => ({
  paymentSearch: (payload: IPaymentQueryParams) => dispatch({ type: 'PaymentDashboard/paymentSearch', payload }),
  paymentGetStats: () => dispatch({ type: 'PaymentDashboard/paymentGetStats' }),
  paymentReset: () => dispatch({ type: 'PaymentDashboard/reset' }),
  clientGetStats: () => dispatch({ type: 'ClientDashboard/getStats' }),
  orderGetStats: () => dispatch({ type: 'OrderDashboard/getStats' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(PaymentDashboard);
