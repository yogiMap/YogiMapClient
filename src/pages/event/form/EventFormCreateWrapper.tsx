import React, { useEffect } from 'react';
import { connect } from 'umi';
import EventForm from '@/pages/event/form/EventForm';
import { IEvent } from '@/pages/event/types';
import { get } from 'lodash';
import { ILoadingEffects } from '@/types';

interface IProps {
  create: (arg: IEvent) => void;
  loadingEffects: ILoadingEffects;
  styleSearch: () => void;
  teacherSearch: () => void;
  classTypeSearch: () => void;
}

const EventFormCreateWrapper = (props: IProps) => {
  const onFinish = (values: IEvent) => {
    props.create(values);
  };

  useEffect(() => {
    props.styleSearch();
    props.teacherSearch();
    props.classTypeSearch();
  }, []);

  const isLoading = get(props, 'loadingEffects.EventForm/create', false);
  const styleList = get(props, 'styleList', []);
  const teacherList = get(props, 'teacherList', []);
  const classTypeList = get(props, 'classTypeList', []);

  return <EventForm
    onFinish={onFinish}
    submitButtonText="Create"
    isLoading={isLoading}
    styleList={styleList}
    teacherList={teacherList}
    classTypeList={classTypeList}
  />;
};

const mapStateToProps = (state: any) => ({
  loadingEffects: state.loading.effects,
  styleList: state.EventForm.styleList,
  teacherList: state.EventForm.teacherList,
  classTypeList: state.EventForm.classTypeList,
});

const mapDispatchToProps = (dispatch: any) => ({
  create: (payload: IEvent) => dispatch({ type: 'EventForm/create', payload }),
  styleSearch: () => dispatch({ type: 'EventForm/styleSearch' }),
  teacherSearch: () => dispatch({ type: 'EventForm/teacherSearch' }),
  classTypeSearch: () => dispatch({ type: 'EventForm/classTypeSearch' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventFormCreateWrapper);
