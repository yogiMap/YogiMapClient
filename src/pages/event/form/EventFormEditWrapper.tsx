import React, { useEffect } from 'react';
import { connect, withRouter } from 'umi';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { get, isEmpty } from 'lodash';
import EventForm from '@/pages/event/form/EventForm';
import { IEvent } from '@/pages/event/types';
import { ILoadingEffects } from '@/types';
import ClassesForm from '@/pages/classes/form/ClassesForm';

interface IProps {
  getById: (eventId: string) => void;
  reset: () => void;
  updateById: any;
  eventInfo: IEvent;
  loadingEffects: ILoadingEffects;
  styleSearch: () => void;
  teacherSearch: () => void;
}
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const EventFormEditWrapper = (props: IProps) => {
  const queryParams = get(props, 'location.query', {});
  const eventId: string = get(props, 'sidepanel.eventId', '');

  const isLoadingGet = get(props, 'loadingEffects.EventForm/getById', false);
  const isLoadingUpdate = get(props, 'loadingEffects.EventForm/updateById', false);

  useEffect(() => {
    props.getById(eventId);
    props.styleSearch();
    props.teacherSearch();
  }, []);

  const onFinish = (values: IEvent) => {
    props.updateById({ values, eventId, queryParams });
  };

  if (isLoadingGet) return <Spin indicator={antIcon} />;
  const styleList = get(props, 'styleList', []);
  const teacherList = get(props, 'teacherList', []);

  return (
    <EventForm
      onFinish={onFinish}
      initialValues={props.eventInfo}
      submitButtonText="Update"
      isLoading={isLoadingUpdate}
      styleList={styleList}
      teacherList={teacherList}
    />
  );
};

const mapStateToProps = (state: any) => ({
  sidepanel: state.Sidepanel,
  eventInfo: state.EventForm.eventInfo,
  loadingEffects: state.loading.effects,
  styleList: state.StyleForm.styleList,
  teacherList: state.TeacherForm.teacherList,
});

const mapDispatchToProps = (dispatch: any) => ({
  reset: () => dispatch({ type: 'EventForm/reset' }),
  updateById: (payload: IEvent) => dispatch({ type: 'EventForm/updateById', payload }),
  getById: (payload: string) => dispatch({ type: 'EventForm/getById', payload }),
  styleSearch: () => dispatch({ type: 'StyleForm/styleSearch' }),
  teacherSearch: () => dispatch({ type: 'TeacherForm/teacherSearch' }),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EventFormEditWrapper));
