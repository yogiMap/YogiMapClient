import React, { useEffect } from 'react';
import { connect } from 'umi';
import EventForm from '@/pages/event/form/EventForm';
import { IEvent } from '@/pages/event/types';
import { get } from 'lodash';
import { ILoadingEffects } from '@/types';
import ClassesForm from '@/pages/classes/form/ClassesForm';

interface IProps {
  create: (arg: IEvent) => void;
  loadingEffects: ILoadingEffects;
  styleSearch: () => void;
  teacherSearch: () => void;
}

const EventFormCreateWrapper = (props: IProps) => {
  const onFinish = (values: IEvent) => {
    props.create(values);
  };

  useEffect(() => {
    props.styleSearch();
    props.teacherSearch();
  }, []);

  const isLoading = get(props, 'loadingEffects.EventForm/create', false);
  const styleList = get(props, 'styleList', []);
  const teacherList = get(props, 'teacherList', []);

  return <EventForm
    onFinish={onFinish}
    submitButtonText="Create"
    isLoading={isLoading}
    styleList={styleList}
    teacherList={teacherList}
  />;
};

const mapStateToProps = (state: any) => ({
  loadingEffects: state.loading.effects,
  styleList: state.StyleForm.styleList,
  teacherList: state.TeacherForm.teacherList,
});

const mapDispatchToProps = (dispatch: any) => ({
  create: (payload: IEvent) => dispatch({ type: 'EventForm/create', payload }),
  styleSearch: () => dispatch({ type: 'StyleForm/styleSearch' }),
  teacherSearch: () => dispatch({ type: 'TeacherForm/teacherSearch' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventFormCreateWrapper);
