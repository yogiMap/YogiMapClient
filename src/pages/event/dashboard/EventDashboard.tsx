import React, { useEffect } from 'react';
import { connect, history } from 'umi';
import { get, omitBy } from 'lodash';
import eventStats from '@/pages/event/dashboard/stats/eventStats';
import eventFilterForm from '@/pages/event/dashboard/search/eventFilterForm';
import Pager from '@/pages/utils/pager/Pager';
import { IeventQueryParams } from '@/pages/event/types';
import eventSearchList from '@/pages/event/dashboard/search/eventSearchList';
import eventDashboardControls from '@/pages/event/dashboard/controls/eventDashboardControls';
import { IState } from '@/pages/event/dashboard/model';

const initialSearchForm = {
  eventSearchParam1: '',
  eventSearchParam2: '',
};

const initialSearchQuery = {
  limit: 20,
  page: 1,
  ...initialSearchForm,
};

interface IProps {
  eventGetStats: () => void;
  eventSearch: (arg: IeventQueryParams) => void;
  eventReset: () => void;
  eventDashboard: IState;
}

const eventDashboard = (props: IProps) => {
  const eventStats = get(props, 'eventDashboard.eventStats', {});
  const eventList = get(props, 'eventDashboard.eventList', []);
  const eventPager = get(props, 'eventDashboard.eventPager', {});
  const queryParams = get(props, 'location.query', {});

  const getSearchQuery = (mixin = {}) => {
    const query = { ...initialSearchQuery, ...queryParams, ...mixin };
    return omitBy(query, (a) => !a); // удалить пустые ключи
  };

  useEffect(() => {
    props.eventGetStats();

    return () => {
      props.eventReset();
    };
  }, []);

  // поиск в зависимости от изменения параметров
  useEffect(() => {
    props.eventSearch(getSearchQuery());
  }, [queryParams]);

  const onFiltersChange = (values: null | IeventQueryParams) => {
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
          <div className="h4 mr-4">event dashboard</div>
          <eventFilterForm filters={getSearchQuery()} onChange={onFiltersChange} />
        </div>

        <eventStats stats={eventStats} />

        <div>
          <eventDashboardControls />
        </div>
      </div>

      <eventSearchList items={eventList} />
      <Pager pager={eventPager} onChange={onPagerChange} />
    </>
  );
};

const mapStateToProps = (state: any) => ({
  eventDashboard: state.eventDashboard,
});

const mapDispatchToProps = (dispatch: any) => ({
  eventSearch: (payload: IeventQueryParams) => dispatch({ type: 'eventDashboard/eventSearch', payload }),
  eventGetStats: () => dispatch({ type: 'eventDashboard/eventGetStats' }),
  eventReset: () => dispatch({ type: 'eventDashboard/reset' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(eventDashboard);
