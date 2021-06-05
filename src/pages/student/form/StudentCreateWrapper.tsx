import React, { useEffect } from 'react';
import { connect } from 'umi';
import { IStudent } from '@/pages/student/types';
import { get } from 'lodash';
import { ILoadingEffects } from '@/types';
import StudentForm from '@/pages/student/form/StudentForm';

interface IProps {
  create: (arg: IStudent) => void;
  classTypeSearch: () => void;
  classesSearch: () => void;
  eventSearch: () => void;
  styleSearch: () => void;
  loadingEffects: ILoadingEffects;
}

const studentCreateWrapper = (props: IProps) => {
  const onFinish = (values: IStudent) => {
    props.create(values);
  };

  useEffect(() => {
    props.classTypeSearch();
    props.classesSearch();
    props.eventSearch();
    props.styleSearch();
  }, []);

  const isLoading = get(props, 'loadingEffects.studentForm/create', false);
  const classTypeList = get(props, 'classTypeList', []);
  const classesList = get(props, 'classesList', []);
  const eventList = get(props, 'eventList', []);
  const styleList = get(props, 'styleList', []);

  return (
    <StudentForm
      onFinish={onFinish}
      submitButtonText="Create Student`s Account"
      isLoading={isLoading}
      classTypeList={classTypeList}
      classesList={classesList}
      eventList={eventList}
      styleList={styleList}
    />
  );
};

const mapStateToProps = (state: any) => ({
  loadingEffects: state.loading.effects,
  classTypeList: state.StudentForm.classTypeList,
  classesList: state.StudentForm.classesList,
  eventList: state.StudentForm.eventList,
  styleList: state.StudentForm.styleList,
});

const mapDispatchToProps = (dispatch: any) => ({
  create: (payload: IStudent) => dispatch({ type: 'StudentForm/create', payload }),
  classTypeSearch: () => dispatch({ type: 'StudentForm/classTypeSearch' }),
  classesSearch: () => dispatch({ type: 'StudentForm/classesSearch' }),
  eventSearch: () => dispatch({ type: 'StudentForm/eventSearch' }),
  styleSearch: () => dispatch({ type: 'StudentForm/styleSearch' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(studentCreateWrapper);
