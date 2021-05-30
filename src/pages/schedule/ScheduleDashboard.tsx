import React, { useEffect, useState } from 'react';
import { connect, history } from 'umi';
import { get, omitBy } from 'lodash';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // needed for dayClick
import timelinePlugin from '@fullcalendar/timeline';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';

import { IClasses } from '@/pages/classes/types';
import { IClassesUpdate } from '@/pages/classes/form/ClassesFormEditWrapper';
import moment from 'moment-timezone';
import { ISidepanel } from '@/pages/utils/sidepanel/types';
import EventContent from '@/pages/schedule/EventContent';

interface IProps {
  scheduleGetStats: () => void;
  scheduleReset: () => void;
  ScheduleDashboard: any;
  scheduleSearch: (arg: any) => void;
  classesUpdateById: (arg: IClassesUpdate) => void;
  open: (arg: ISidepanel) => void;
}

const ScheduleDashboard = (props: IProps) => {
  const classesList: IClasses[] = get(props, 'ScheduleDashboard.classesList', []);
  const queryParams = get(props, 'location.query', {});
  const currentView = get(props, 'location.query.view', 'week');
  const timeZone = get(props, 'timeZone', '');

  const calendarRangeStart = get(props, 'location.query.start', ''); // начало рендерируемого диапазона дат, при обновлении страницы используем его как квери параметр тк если указать диапазон (начало и конец) то не работает
  const calendarRangeEnd = get(props, 'location.query.end', ''); // не нужен, пока)
  const calendarRangeStartForMonthView = moment.utc(calendarRangeStart).add(7, 'days').format('YYYY-MM-DDTHH:mm:ss'); //дата начала видимого диапазона, увеличенная на 7 дней, тк при виде month диапазон начинается с конца предыдущего месяца и показывает не то что нужно
  const goToDate = currentView === 'month' ? calendarRangeStartForMonthView : calendarRangeStart; // используем в useEffect'e нужную дату для перехода по квери параметру при обновлении страницы

  const [calendarWeekends, setCalendarWeekends] = useState(true); //убираем уикенды с текущего вида

  const calendarComponentRef = React.createRef(); //шайтан

  const events = classesList.map((el) => ({
    title: el.name,
    start: el.date,
    // end: el.classesEnd,
    resourceId: 'A',
    ...el,
  }));

  const getSearchQuery = (initialSearchQuery = {}, mixin = {}) => {
    const query = { ...initialSearchQuery, ...queryParams, ...mixin };
    return omitBy(query, (a) => !a); // удалить пустые ключи
  };

  useEffect(() => {
    props.scheduleGetStats();
    return () => {
      props.scheduleReset();
    };
  }, []);

  // поиск в зависимости от изменения параметров
  useEffect(() => {
    // @ts-ignore
    const calendarApi = calendarComponentRef.current.getApi();
    search(
      getSearchQuery({
        date: moment //  устанавливаем начало диапазона, здесь нужно чтоб время было везде по нулям, кроме даты - начинаем с 0 часов 0 минут без часовых поясов. Таким образом наши эвенты (classess) очень точно ищутся в монго
          .utc(calendarApi.currentDataManager.state.dateProfile.activeRange.start)
          .utcOffset(3) // календарь куда то тырит три часа, добавляем
          .format('YYYY-MM-DDTHH:mm:ss'),
        view: calendarApi.currentDataManager.state.currentViewType,
      }),
    );
    calendarApi.changeView(currentView, goToDate); //  дата начала видимого диапазона ( увеличенная на 7 дней, тк при виде month диапазон начинается с конца предыдущего месяца и все ломается)
  }, [queryParams]);

  const search = (params: any) => {
    props.scheduleSearch(params);
  };

  const eventResize = (e: any) => {
    // @ts-ignore
    const calendarApi = calendarComponentRef.current.getApi();
    const queryParams = {
      date: moment
        .utc(calendarApi.currentDataManager.state.dateProfile.activeRange.start)
        .utcOffset(3)
        .format('YYYY-MM-DDTHH:mm:ss'),
    };
    const classes = get(e, 'event.extendedProps', {});
    const classesId = get(classes, '_id');
    const values: { date: string; dateDelta: undefined } = {
      date: moment(classes.date)
        .add(get(e, 'startDelta.years', 0), 'years')
        .add(get(e, 'startDelta.month', 0), 'month')
        .add(get(e, 'startDelta.days', 0), 'days')
        .add(get(e, 'startDelta.milliseconds', 0), 'millisecond')
        .format(),
      dateDelta: get(e, 'dateDelta'),
    };
    props.classesUpdateById({ classesId, values, queryParams });
  };

  const eventDrop = (e: any) => {
    // @ts-ignore
    const calendarApi = calendarComponentRef.current.getApi();
    const queryParams = {
      date: moment(calendarApi.currentDataManager.state.dateProfile.activeRange.date)
        .utcOffset(3)
        .format('YYYY-MM-DDTHH:mm:ss'),
    };
    const classes = get(e, 'event.extendedProps', {});
    const classesId = get(classes, '_id');
    const values = {
      date: moment(classes.date)
        .add(get(e, 'delta.years', 0), 'years')
        .add(get(e, 'delta.month', 0), 'month')
        .add(get(e, 'delta.days', 0), 'days')
        .add(get(e, 'delta.milliseconds', 0), 'millisecond')
        .format(),
    };
    props.classesUpdateById({ classesId, values, queryParams });
  };

  const eventClassNames = (arg: any) => {
    const description = get(arg, 'event.extendedProps.description', {});
    // console.log('eventClassNames', arg);
    return description;
  };

  const clickPrev = (arg: any) => {
    // @ts-ignore
    const calendarApi = calendarComponentRef.current.getApi();
    calendarApi.prev();
    const query = getSearchQuery(
      {},
      {
        date: moment
          .utc(calendarApi.currentDataManager.state.dateProfile.activeRange.date)
          .utcOffset(3)
          .format('YYYY-MM-DDTHH:mm:ss'),
        view: calendarApi.currentDataManager.state.currentViewType,
      },
    );
    history.push({ query });
  };

  const clickNext = () => {
    // @ts-ignore
    const calendarApi = calendarComponentRef.current.getApi();
    calendarApi.next();
    const query = getSearchQuery(
      {},
      {
        date: moment
          .utc(calendarApi.currentDataManager.state.dateProfile.activeRange.date)
          .utcOffset(3)
          .format('YYYY-MM-DDTHH:mm:ss'),
        view: calendarApi.currentDataManager.state.currentViewType,
      },
    );
    history.push({ query });
  };

  const toggleView = (view: String) => {
    // @ts-ignore
    const calendarApi = calendarComponentRef.current.getApi();
    calendarApi.changeView(view, calendarRangeStart);
    const query = getSearchQuery(
      {},
      {
        date: moment
          .utc(calendarApi.currentDataManager.state.dateProfile.activeRange.date)
          .utcOffset(3)
          .format('YYYY-MM-DDTHH:mm:ss'),
        view: calendarApi.currentDataManager.state.currentViewType,
      },
    );
    history.push({ query });
  };

  const resetToCurrentDate = (view: String) => {
    // - функция возврата в "сегодня" в режиме текущего вида
    // @ts-ignore
    const calendarApi = calendarComponentRef.current.getApi();
    const today = moment.utc().toDate();
    calendarApi.changeView(view, moment.utc(today).tz(timeZone).format('YYYY-MM-DDTHH:mm:ss'));
    const query = getSearchQuery(
      {},
      {
        date: moment
          .utc(calendarApi.currentDataManager.state.dateProfile.activeRange.date)
          .utcOffset(3)
          .format('YYYY-MM-DDTHH:mm:ss'),
        view: calendarApi.currentDataManager.state.currentViewType,
      },
    );
    history.push({ query });
  };

  const toggleWeekends = () => setCalendarWeekends(!calendarWeekends);

  return (
    <div className="container">
      <h1 className="text-center my-4">Schedule dashboard</h1>

      <FullCalendar
        schedulerLicenseKey="CC-Attribution-NonCommercial-NoDerivatives"
        nowIndicator
        headerToolbar={{
          left: 'prev next weekends',
          center: 'title',
          right: 'today, dayView, weekView, monthView',
        }}
        customButtons={{
          prev: {
            text: '<',
            click: clickPrev,
          },
          next: {
            text: '>',
            click: clickNext,
          },
          weekends: {
            text: 'weekends',
            click: toggleWeekends,
          },
          dayView: {
            text: 'Day View',
            click: () => toggleView('day'),
          },
          weekView: {
            text: 'Week View',
            click: () => toggleView('week'),
          },
          monthView: {
            text: 'Month View',
            click: () => toggleView('month'),
          },
          today: {
            text: 'Reset',
            click: () => resetToCurrentDate(currentView), // - кнопка возврата в "сегодня" в режиме текущего вида
          },
        }}
        plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin, timelinePlugin, resourceTimelinePlugin]}
        views={{
          month: {
            type: 'dayGrid',
            duration: { month: 1 },
          },
          week: {
            type: 'timeGrid',
            duration: { week: 1 },
          },
          day: {
            type: 'timeGrid',
            duration: { day: 1 },
          },
        }}
        timeZone={timeZone}
        editable={true}
        ref={calendarComponentRef}
        weekends={calendarWeekends}
        eventResize={eventResize}
        eventDrop={eventDrop}
        events={events}
        eventContent={(arg) => <EventContent arg={arg} />}
        eventClassNames={eventClassNames}
        eventTextColor="#000000"
        eventBackgroundColor="rgba(216, 229, 248, 0.9)"
        resources={[
          {
            id: 'A',
            groupId: '1',
            title: 'Resource A',
          },
          {
            id: 'B',
            groupId: '1',
            title: 'Resource B',
          },
          {
            id: 'C',
            groupId: '2',
            title: 'Resource C',
          },
        ]}
      />
    </div>
  );
};
const mapStateToProps = (state: any) => ({
  ScheduleDashboard: state.ScheduleDashboard,
  timeZone: state.Account.timeZone,
});
const mapDispatchToProps = (dispatch: any) => ({
  scheduleSearch: (payload: any) => dispatch({ type: 'ScheduleDashboard/search', payload }),
  scheduleGetStats: () => dispatch({ type: 'ScheduleDashboard/getStats' }),
  scheduleReset: () => dispatch({ type: 'ScheduleDashboard/reset' }),
  classesUpdateById: (payload: IClassesUpdate) => dispatch({ type: 'ScheduleDashboard/updateById', payload }),
  open: (payload: ISidepanel) => dispatch({ type: 'Sidepanel/open', payload }),
});
export default connect(mapStateToProps, mapDispatchToProps)(ScheduleDashboard);
