import React, { useEffect } from 'react';
import { connect } from 'umi';
import TeacherForm from '@/pages/teacher/form/TeacherForm';
import { ITeacher } from '@/pages/teacher/types';
import { get } from 'lodash';
import { ILoadingEffects } from '@/types';

interface IProps {
  create: (arg: ITeacher) => void;
  teacherTypeSearch: () => void;
  classesSearch: () => void;
  eventSearch: () => void;
  loadingEffects: ILoadingEffects;
}

const TeacherCreateWrapper = (props: IProps) => {
  const onFinish = (values: ITeacher) => {
    props.create(values);
  };

  useEffect(() => {
    props.teacherTypeSearch();
    props.classesSearch();
    props.eventSearch();
  }, []);

  const isLoading = get(props, 'loadingEffects.TeacherTypeForm/create loadingEffects.ClassesForm/create', false);
  const teacherTypeList = get(props, 'teacherTypeList', []);
  const classesList = get(props, 'classesList', []);
  const eventList = get(props, 'eventList', []);

  return (
    <TeacherForm
      onFinish={onFinish}
      submitButtonText="Create"
      isLoading={isLoading}
      teacherTypeList={teacherTypeList}
      classesList={classesList}
      eventList={eventList}
    />
  );
};

const mapStateToProps = (state: any) => ({
  loadingEffects: state.loading.effects,
  teacherTypeList: state.TeacherForm.teacherTypeList,
  classesList: state.ClassesForm.classesList,
  eventList: state.EventForm.eventList,
});

const mapDispatchToProps = (dispatch: any) => ({
  create: (payload: ITeacher) => dispatch({ type: 'TeacherTypeForm/create', payload }),
  teacherTypeSearch: () => dispatch({ type: 'TeacherForm/teacherTypeSearch' }),
  classesSearch: () => dispatch({ type: 'ClassesForm/classesSearch' }),
  eventSearch: () => dispatch({ type: 'EventForm/eventSearch' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(TeacherCreateWrapper);
