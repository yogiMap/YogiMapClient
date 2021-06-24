import React, { useEffect } from 'react';
import { connect, history } from 'umi';
import { get, omitBy } from 'lodash';
import EventStats from '@/pages/event/dashboard/stats/EventStats';
import EventFilterForm from '@/pages/event/dashboard/search/EventFilterForm';
import Pager from '@/pages/utils/pager/Pager';
import { IEventQueryParams } from '@/pages/event/types';
import EventSearchList from '@/pages/event/dashboard/search/EventSearchList';
import EventDashboardControls from '@/pages/event/dashboard/controls/EventDashboardControls';
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
  eventSearch: (arg: IEventQueryParams) => void;
  eventReset: () => void;
  EventDashboard: IState;
}

const EventDashboard = (props: IProps) => {
  const eventStats = get(props, 'EventDashboard.eventStats', {});
  const eventList = get(props, 'EventDashboard.eventList', []);
  const eventPager = get(props, 'EventDashboard.eventPager', {});
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

  const onFiltersChange = (values: null | IEventQueryParams) => {
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
          <h1>Find Event</h1>
        </div>
      </div>

      <div className="row my-5 d-flex justify-content-center">
        <div className="col d-flex justify-content-center">
          <EventFilterForm filters={getSearchQuery()} onChange={onFiltersChange} />
        </div>
      </div>

      {/*<EventStats stats={eventStats} />*/}

      <div className="row my-3">
        <div className="col-flex justify-content-center">
          <EventSearchList items={eventList} />
          <Pager pager={eventPager} onChange={onPagerChange} />
        </div>
      </div>

      <div className="row my-3">
        <div className="col d-flex justify-content-end">
          <EventDashboardControls />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  EventDashboard: state.EventDashboard,
});

const mapDispatchToProps = (dispatch: any) => ({
  eventSearch: (payload: IEventQueryParams) => dispatch({ type: 'EventDashboard/eventSearch', payload }),
  eventGetStats: () => dispatch({ type: 'EventDashboard/eventGetStats' }),
  eventReset: () => dispatch({ type: 'EventDashboard/reset' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventDashboard);
