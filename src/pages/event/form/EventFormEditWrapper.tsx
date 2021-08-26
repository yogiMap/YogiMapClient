import React, { useEffect } from 'react';
import { connect, withRouter } from 'umi';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { get, isEmpty } from 'lodash';
import EventForm from '@/pages/event/form/EventForm';
import { IEvent } from '@/pages/event/types';
import { ILoadingEffects } from '@/types';

interface IProps {
  getById: (eventId: string) => void;
  reset: () => void;
  updateById: any;
  eventInfo: IEvent;
  loadingEffects: ILoadingEffects;
  styleSearch: () => void;
  classTypeSearch: () => void;
  teacherAccountGetById: (teacherAccountId: string) => void;
}
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const EventFormEditWrapper = (props: IProps) => {
  const queryParams = get(props, 'location.query', {});
  const eventId: string = get(props, 'sidepanel.eventId', '');
  const styleList = get(props, 'styleList', []);
  const classTypeList = get(props, 'classTypeList', []);
  const teacherAccountInfo = get(props, 'teacherAccountInfo', []);
  const teacherAccountId = get(props, 'TeacherAccountId', '');

  const isLoadingGet = get(props, 'loadingEffects.EventForm/getById', false);
  const isLoadingUpdate = get(props, 'loadingEffects.EventForm/updateById', false);

  useEffect(() => {
    props.getById(eventId);
    props.teacherAccountGetById(teacherAccountId);
    props.styleSearch();
    props.classTypeSearch();
  }, []);

  const onFinish = (values: IEvent) => {
    props.updateById({ values, eventId, queryParams });
  };

  if (isLoadingGet) return <Spin indicator={antIcon} />;

  return (
    <EventForm
      onFinish={onFinish}
      // initialValues={props.eventInfo}
      submitButtonText="Update"
      isLoading={isLoadingUpdate}
      styleList={styleList}
      classTypeList={classTypeList}
      teacherAccountInfo={teacherAccountInfo}
    />
  );
};

const mapStateToProps = (state: any) => ({
  sidepanel: state.Sidepanel,
  eventInfo: state.EventForm.eventInfo,
  loadingEffects: state.loading.effects,
  styleList: state.EventForm.styleList,
  classTypeList: state.EventForm.classTypeList,
  teacherAccountInfo: state.EventForm.teacherAccountInfo,
  TeacherAccountId: state.User.teacherAccount,
});

const mapDispatchToProps = (dispatch: any) => ({
  reset: () => dispatch({ type: 'EventForm/reset' }),
  updateById: (payload: IEvent) => dispatch({ type: 'EventForm/updateById', payload }),
  getById: (payload: string) => dispatch({ type: 'EventForm/getById', payload }),
  styleSearch: () => dispatch({ type: 'EventForm/styleSearch' }),
  classTypeSearch: () => dispatch({ type: 'EventForm/classTypeSearch' }),
  teacherAccountGetById: (teacherAccountId: string) =>
    dispatch({ type: 'EventForm/teacherAccountGetById', payload: teacherAccountId }),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EventFormEditWrapper));
